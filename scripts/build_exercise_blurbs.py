#!/usr/bin/env python3
"""Build de/en/es info blurbs from the pose docs via the OpenAI API.

Reads docs/mobility-poses.md and docs/exercise-poses.md, asks for a short
coaching sentence in three languages, writes apps/web/src/data/exerciseBlurbs.json.
"""

from __future__ import annotations

import json
import os
import re
import time
import unicodedata
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "apps/web/src/data/exerciseBlurbs.json"
MODEL = "gpt-4o-mini"
BATCH = 12


def slug(name: str) -> str:
    text = unicodedata.normalize("NFKD", name)
    text = text.replace("'", "").replace("’", "")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def parse_doc(path: Path, kind: str) -> list[dict]:
    items: list[dict] = []
    current: dict | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^(\d+)\. (.+)$", line)
        if not match:
            continue
        rest = match.group(2).strip()
        if " · " in rest:
            title, _meta = rest.split(" · ", 1)
            title = title.strip()
            key = slug(_meta if kind == "mobility" else title)
            current = {
                "key": key,
                "kind": kind,
                "title": title,
                "steps": [],
            }
            items.append(current)
        elif current is not None:
            current["steps"].append(rest)
    return [item for item in items if item["steps"]]


def chat(payload: dict) -> dict:
    key = os.environ["OPENAI_API_KEY"]
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as res:
        return json.loads(res.read().decode())


def blurbs_for(batch: list[dict]) -> list[dict]:
    source = [
        {
            "key": item["key"],
            "title": item["title"],
            "steps": item["steps"],
        }
        for item in batch
    ]
    payload = {
        "model": MODEL,
        "temperature": 0.3,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": (
                    "You write short exercise info texts for a fitness app. Reply with JSON only. "
                    "For each item return one coaching sentence in German (du), "
                    "English, and Spanish (tú). Two sentences only if the movement "
                    "needs it. Concrete, calm, no numbering, no equipment shopping, "
                    "no medical claims. German uses ss instead of ß is NOT required; "
                    "use normal German including ß where natural, but the app also "
                    "accepts ss. Keep each language under 220 characters. "
                    'Return {"items":[{"key","de","en","es"}]} with every input key.'
                ),
            },
            {"role": "user", "content": json.dumps(source, ensure_ascii=False)},
        ],
    }
    for attempt in range(3):
        try:
            data = chat(payload)
            content = data["choices"][0]["message"]["content"]
            parsed = json.loads(content)
            rows = parsed["items"]
            by_key = {row["key"]: row for row in rows}
            missing = [item["key"] for item in batch if item["key"] not in by_key]
            if missing:
                raise RuntimeError(f"missing keys: {missing}")
            return [
                {
                    "key": item["key"],
                    "de": by_key[item["key"]]["de"].strip(),
                    "en": by_key[item["key"]]["en"].strip(),
                    "es": by_key[item["key"]]["es"].strip(),
                }
                for item in batch
            ]
        except urllib.error.HTTPError as err:
            detail = err.read().decode()[:500]
            if attempt == 2:
                raise RuntimeError(detail) from err
            print(f"retry {attempt + 1}: {detail}", flush=True)
            time.sleep(2 * (attempt + 1))
        except (urllib.error.URLError, TimeoutError, KeyError, json.JSONDecodeError, RuntimeError) as err:
            if attempt == 2:
                raise
            print(f"retry {attempt + 1}: {err}", flush=True)
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("unreachable")


def main() -> None:
    mobility = parse_doc(ROOT / "docs/mobility-poses.md", "mobility")
    training = parse_doc(ROOT / "docs/exercise-poses.md", "training")
    print(f"mobility {len(mobility)} training {len(training)}", flush=True)

    keys = [item["key"] for item in mobility + training]
    dupes = {key for key in keys if keys.count(key) > 1}
    if dupes:
        raise SystemExit(f"duplicate keys: {sorted(dupes)}")

    existing: dict = {}
    if OUT.exists():
        existing = json.loads(OUT.read_text(encoding="utf-8"))

    result: dict[str, dict] = {}
    pending: list[dict] = []
    for item in mobility + training:
        prev = existing.get(item["key"])
        if prev and all(prev.get(lang) for lang in ("de", "en", "es")):
            result[item["key"]] = {
                "kind": item["kind"],
                "de": prev["de"],
                "en": prev["en"],
                "es": prev["es"],
            }
        else:
            pending.append(item)

    print(f"cached {len(result)} pending {len(pending)}", flush=True)
    for start in range(0, len(pending), BATCH):
        batch = pending[start : start + BATCH]
        rows = blurbs_for(batch)
        by_key = {row["key"]: row for row in rows}
        for item in batch:
            row = by_key[item["key"]]
            result[item["key"]] = {
                "kind": item["kind"],
                "de": row["de"],
                "en": row["en"],
                "es": row["es"],
            }
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {len(result)}", flush=True)

    ordered = {}
    for item in mobility + training:
        ordered[item["key"]] = result[item["key"]]
    OUT.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"done {len(ordered)}", flush=True)


if __name__ == "__main__":
    main()
