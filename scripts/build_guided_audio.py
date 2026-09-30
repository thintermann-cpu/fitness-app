#!/usr/bin/env python3
"""Write German and English guided-meditation scripts, then synthesize MP3s.

Uses OPENAI_API_KEY. Outputs:
  apps/web/public/audio/sessions/{de,en}/{id}.mp3
  apps/web/public/audio/sessions/sessions.json
  scripts/meditation-scripts/{de,en}/{id}.txt
"""

from __future__ import annotations

import json
import os
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_ROOT = ROOT / "scripts" / "meditation-scripts"
AUDIO_ROOT = ROOT / "apps" / "web" / "public" / "audio" / "sessions"
MODEL_TEXT = "gpt-4o-mini"
MODEL_TTS = "gpt-4o-mini-tts"
CHUNK = 3200

SESSIONS = [
    {
        "id": "body-scan-5",
        "minutes": 5,
        "type": "body_scan",
        "title": {"de": "Körper-Scan", "en": "Body Scan"},
        "brief": {
            "de": "Kurzer Körper-Scan im Liegen: Füsse, Beine, Becken, Bauch, Brust, Hände, Arme, Schultern, Gesicht. Spannung wahrnehmen und mit der Ausatmung lassen.",
            "en": "A short body scan lying down: feet, legs, pelvis, belly, chest, hands, arms, shoulders, face. Notice tension and let it leave on the exhale.",
        },
    },
    {
        "id": "body-scan-10",
        "minutes": 10,
        "type": "body_scan",
        "title": {"de": "Tiefer Körper-Scan", "en": "Deep Body Scan"},
        "brief": {
            "de": "Längerer Scan von den Fußsohlen bis zum Scheitel. Bei jeder Region innehalten: Wärme, Kälte, Kribbeln, Schwere. Besonders Rücken, Nacken und Kiefer.",
            "en": "A longer scan from the soles to the crown. Pause at each region: warmth, coolness, tingling, heaviness. Extra time for the back, neck, and jaw.",
        },
    },
    {
        "id": "breathing-5",
        "minutes": 5,
        "type": "breathing",
        "title": {"de": "Atemmeditation", "en": "Breath Meditation"},
        "brief": {
            "de": "Sitz oder Liegen. Aufmerksamkeit auf den natürlichen Atem, ohne ihn zu verändern. Wenn Gedanken kommen, freundlich zum Atem zurück.",
            "en": "Sit or lie down. Attention on the natural breath without changing it. When thoughts come, return kindly to the breath.",
        },
    },
    {
        "id": "focus-10",
        "minutes": 10,
        "type": "focus",
        "title": {"de": "Fokus-Meditation", "en": "Focus Meditation"},
        "brief": {
            "de": "Aufrechte Sitzhaltung. Zuerst der Atem an der Nasenspitze, dann ein ruhiger Fokuspunkt. Abschweifen bemerken und ohne Urteil zurückkehren.",
            "en": "Upright seat. First the breath at the nostrils, then one quiet point of focus. Notice drifting and return without judgment.",
        },
    },
    {
        "id": "sleep-15",
        "minutes": 15,
        "type": "sleep",
        "title": {"de": "Einschlaf-Meditation", "en": "Sleep Meditation"},
        "brief": {
            "de": "Im Bett, zugedeckt. Körper wird schwerer. Einatmen bis 4, ausatmen bis 6. Gedanken mit dem Satz lassen: Nicht jetzt, es ist Zeit zu schlafen. Stimme wird zum Ende leiser und langsamer.",
            "en": "In bed, covered. The body grows heavier. Inhale to 4, exhale to 6. Let thoughts go with: not now, it is time to sleep. The voice becomes quieter and slower toward the end.",
        },
    },
    {
        "id": "morning-10",
        "minutes": 10,
        "type": "morning",
        "title": {"de": "Morgen-Achtsamkeit", "en": "Morning Mindfulness"},
        "brief": {
            "de": "Nach dem Aufwachen, noch sitzend oder liegend. Drei tiefe Atemzüge, Körper spüren, eine Absicht für den Tag in einem kurzen Satz, dann zurück zum Atem.",
            "en": "After waking, still sitting or lying down. Three deep breaths, feel the body, set one short intention for the day, then return to the breath.",
        },
    },
    {
        "id": "stress-10",
        "minutes": 10,
        "type": "stress_relief",
        "title": {"de": "Stressabbau", "en": "Stress Relief"},
        "brief": {
            "de": "Schultern, Kiefer und Hände bewusst lösen. Längere Ausatmung. Ein belastender Gedanke darf da sein und weiterziehen wie eine Wolke.",
            "en": "Consciously release shoulders, jaw, and hands. Longer exhales. One stressful thought may be here and can pass like a cloud.",
        },
    },
]


def post(url: str, payload: dict, accept: str | None = None) -> bytes:
    headers = {
        "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}",
        "Content-Type": "application/json",
    }
    if accept:
        headers["Accept"] = accept
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=180) as res:
        return res.read()


def write_script(session: dict, lang: str) -> str:
    words = session["minutes"] * 165
    path = TEXT_ROOT / lang / f"{session['id']}.txt"
    audio = AUDIO_ROOT / lang / f"{session['id']}.mp3"
    if path.exists() and audio.exists() and audio.stat().st_size > 50_000:
        return path.read_text(encoding="utf-8")
    if path.exists() and len(path.read_text(encoding="utf-8").split()) >= int(words * 0.9):
        return path.read_text(encoding="utf-8")
    language = "German" if lang == "de" else "English"
    address = "du" if lang == "de" else "you"
    ending = (
        " For sleep meditations, never tell the listener to open their eyes or get up. Let the voice fade into silence."
        if session["type"] == "sleep"
        else " Close by inviting a slow return, without a long pep talk."
    )
    payload = {
        "model": MODEL_TEXT,
        "temperature": 0.6,
        "messages": [
            {
                "role": "system",
                "content": (
                    f"You write a spoken {language} meditation script. "
                    f"It MUST contain at least {words} words. If you are short, add more slow breath cycles and sensory detail until you pass {words} words. "
                    f"Address the listener as {address}. Calm, concrete, no medical claims, no music cues, "
                    "no stage directions in brackets. Short paragraphs. Use ellipses sparingly for breaths. "
                    "The script is read aloud at about 150 words per minute and must fill the requested time. "
                    f"Open with settling in.{ending} Return only the script."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Title: {session['title'][lang]}\n"
                    f"Length: {session['minutes']} minutes\n"
                    f"Theme: {session['brief'][lang]}"
                ),
            },
        ],
    }
    raw = json.loads(post("https://api.openai.com/v1/chat/completions", payload))
    text = raw["choices"][0]["message"]["content"].strip()
    target = int(words * 0.9)
    for _ in range(2):
        if len(text.split()) >= target:
            break
        extra = json.loads(post("https://api.openai.com/v1/chat/completions", {
            "model": MODEL_TEXT,
            "temperature": 0.6,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        f"Continue this {language} meditation in the same voice. "
                        f"Add about {words - len(text.split())} more words of slow practice. "
                        "Do not repeat the opening. Do not add a title. Return only the continuation."
                    ),
                },
                {"role": "user", "content": text[-1500:]},
            ],
        }))
        text = f"{text}\n\n{extra['choices'][0]['message']['content'].strip()}"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text + "\n", encoding="utf-8")
    print(f"script {lang}/{session['id']} words={len(text.split())}", flush=True)
    return text


def chunks(text: str) -> list[str]:
    parts: list[str] = []
    buf = ""
    for para in text.split("\n"):
        piece = para.strip()
        if not piece:
            continue
        if buf and len(buf) + len(piece) + 1 > CHUNK:
            parts.append(buf)
            buf = piece
        else:
            buf = f"{buf} {piece}".strip()
    if buf:
        parts.append(buf)
    return parts


def synthesize(session: dict, lang: str, text: str) -> None:
    out = AUDIO_ROOT / lang / f"{session['id']}.mp3"
    if out.exists() and out.stat().st_size > 50_000:
        print(f"audio exists {out.name}", flush=True)
        return
    tmp = Path("/tmp/guided") / lang / session["id"]
    tmp.mkdir(parents=True, exist_ok=True)
    files = []
    for index, part in enumerate(chunks(text), start=1):
        dest = tmp / f"{index:02d}.mp3"
        if not dest.exists() or dest.stat().st_size < 1000:
            audio = post(
                "https://api.openai.com/v1/audio/speech",
                {
                    "model": MODEL_TTS,
                    "voice": "nova",
                    "input": part,
                    "instructions": "Speak slowly and warmly, like a meditation teacher. Soft volume, clear diction, gentle pauses between sentences.",
                },
            )
            dest.write_bytes(audio)
        files.append(dest)
        print(f"tts {lang}/{session['id']} part {index}/{len(chunks(text))}", flush=True)
    list_path = tmp / "list.txt"
    list_path.write_text("".join(f"file '{path}'\n" for path in files), encoding="utf-8")
    out.parent.mkdir(parents=True, exist_ok=True)
    import subprocess
    subprocess.run(
        [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
            "-ac", "1", "-ar", "24000", "-c:a", "libmp3lame", "-b:a", "64k", str(out),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    print(f"wrote {out} bytes={out.stat().st_size}", flush=True)


def write_manifest() -> None:
    rows = []
    for session in SESSIONS:
        files = {}
        available = True
        for lang in ("de", "en"):
            rel = f"{lang}/{session['id']}.mp3"
            path = AUDIO_ROOT / rel
            if not path.exists() or path.stat().st_size < 50_000:
                available = False
            files[lang] = rel
        rows.append({
            "id": session["id"],
            "title": session["title"],
            "duration": session["minutes"],
            "type": session["type"],
            "files": files,
            "available": available,
        })
    (AUDIO_ROOT / "sessions.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("manifest", sum(1 for row in rows if row["available"]), "/", len(rows), flush=True)


def main() -> None:
    for session in SESSIONS:
        for lang in ("de", "en"):
            text = write_script(session, lang)
            synthesize(session, lang, text)
        write_manifest()
    write_manifest()


if __name__ == "__main__":
    main()
