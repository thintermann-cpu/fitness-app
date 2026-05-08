#!/usr/bin/env python3
"""
CarveOut Hetzner Server Setup Script
Connects via SSH using paramiko and runs all setup steps.
"""

import paramiko
import time
import sys

HOST = "178.105.63.185"
USER = "root"
PASSWORD = "q1Poianh2HJ1!"
PORT = 22


def run_command(client, command, timeout=120, ignore_errors=False):
    """Execute a command via SSH and print output in real time."""
    print(f"\n>>> {command[:80]}{'...' if len(command) > 80 else ''}")
    stdin, stdout, stderr = client.exec_command(command, timeout=timeout)
    stdin.close()

    out = stdout.read().decode("utf-8", errors="replace").strip()
    err = stderr.read().decode("utf-8", errors="replace").strip()
    exit_code = stdout.channel.recv_exit_status()

    if out:
        print(out)
    if err:
        print(f"[stderr] {err}")

    if exit_code != 0 and not ignore_errors:
        print(f"[WARN] Exit code {exit_code}")

    return exit_code, out, err


def connect():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {HOST}...")
    client.connect(HOST, port=PORT, username=USER, password=PASSWORD, timeout=30)
    print("Connected.\n")
    return client


def main():
    results = {}

    try:
        client = connect()
    except Exception as e:
        print(f"[FATAL] SSH connection failed: {e}")
        sys.exit(1)

    # ── 1. System update ──────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 1: System update")
    print("=" * 60)
    rc, _, _ = run_command(
        client,
        "DEBIAN_FRONTEND=noninteractive apt update && "
        "DEBIAN_FRONTEND=noninteractive apt upgrade -y",
        timeout=300,
    )
    results["1_system_update"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 2. Base tools ─────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 2: Install base tools")
    print("=" * 60)
    rc, _, _ = run_command(
        client,
        "DEBIAN_FRONTEND=noninteractive apt install -y "
        "ufw curl git nginx certbot python3-certbot-nginx",
        timeout=120,
    )
    results["2_base_tools"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 3. Node.js 20 ─────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 3: Install Node.js 20")
    print("=" * 60)
    rc, _, _ = run_command(
        client,
        "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -",
        timeout=120,
    )
    if rc == 0:
        rc, _, _ = run_command(
            client,
            "DEBIAN_FRONTEND=noninteractive apt install -y nodejs",
            timeout=120,
        )
    results["3_nodejs"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 4. Firewall ───────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 4: Configure UFW firewall")
    print("=" * 60)
    for cmd in [
        "ufw allow OpenSSH",
        "ufw allow 'Nginx Full'",
        "ufw --force enable",
    ]:
        rc, _, _ = run_command(client, cmd)
    results["4_firewall"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 5. SSH key for GitHub Actions ─────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 5: Generate SSH deploy key")
    print("=" * 60)
    run_command(client, "rm -f /root/.ssh/github_deploy /root/.ssh/github_deploy.pub")
    rc, _, _ = run_command(
        client,
        'ssh-keygen -t ed25519 -C "github-actions-carveout" '
        '-f /root/.ssh/github_deploy -N ""',
    )
    if rc == 0:
        run_command(
            client,
            "cat /root/.ssh/github_deploy.pub >> /root/.ssh/authorized_keys",
        )
    results["5_ssh_key"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # Read private key for output
    _, private_key, _ = run_command(client, "cat /root/.ssh/github_deploy")

    # ── 6. Deploy directory ───────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 6: Create deploy directory")
    print("=" * 60)
    rc, _, _ = run_command(client, "mkdir -p /var/www/carveout")
    run_command(client, "chown -R www-data:www-data /var/www/carveout")
    results["6_deploy_dir"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 7. Nginx config ───────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 7: Configure Nginx")
    print("=" * 60)
    nginx_config = r"""server {
    listen 80;
    server_name carveout.app www.carveout.app;
    root /var/www/carveout;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}"""
    # Write config via heredoc
    rc, _, _ = run_command(
        client,
        f"cat > /etc/nginx/sites-available/carveout << 'NGINXEOF'\n{nginx_config}\nNGINXEOF",
    )
    run_command(
        client,
        "ln -sf /etc/nginx/sites-available/carveout /etc/nginx/sites-enabled/carveout",
    )
    run_command(client, "rm -f /etc/nginx/sites-enabled/default")
    run_command(client, "nginx -t")
    rc, _, _ = run_command(client, "systemctl restart nginx")
    results["7_nginx"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    # ── 8. Disable password auth ──────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 8: Disable SSH password authentication")
    print("=" * 60)
    run_command(
        client,
        r"sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config",
    )
    run_command(
        client,
        r"sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config",
    )
    rc, _, _ = run_command(client, "systemctl restart sshd", ignore_errors=True)
    results["8_disable_pw_auth"] = "OK" if rc == 0 else f"FAILED (rc={rc})"

    client.close()

    # ── 9. GitHub Actions workflow ────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("STEP 9: Write GitHub Actions workflow")
    print("=" * 60)

    import os

    workflow_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), ".github", "workflows"
    )
    os.makedirs(workflow_dir, exist_ok=True)
    workflow_path = os.path.join(workflow_dir, "deploy.yml")

    workflow_content = """\
name: Deploy to Hetzner
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Build
        run: |
          cd app
          npm install
          npm run build
      - name: Copy build to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: 178.105.63.185
          username: root
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          source: "app/dist/*"
          target: "/var/www/carveout"
          strip_components: 2
      - name: Reload Nginx
        uses: appleboy/ssh-action@v1
        with:
          host: 178.105.63.185
          username: root
          key: ${{ secrets.DEPLOY_SSH_KEY }}
          script: systemctl reload nginx
"""
    with open(workflow_path, "w") as f:
        f.write(workflow_content)
    results["9_github_workflow"] = f"OK — written to {workflow_path}"
    print(f"Written: {workflow_path}")

    # ── Summary ───────────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("SETUP SUMMARY")
    print("=" * 60)
    for step, status in results.items():
        icon = "[OK]" if status == "OK" or status.startswith("OK") else "[!!]"
        print(f"  {icon}  {step}: {status}")

    print("\n" + "=" * 60)
    print("PRIVATE SSH KEY (GitHub Secret: DEPLOY_SSH_KEY)")
    print("=" * 60)
    print(private_key)

    print("\n" + "=" * 60)
    print("NEXT STEPS")
    print("=" * 60)
    print("""
1. Add the private key above as GitHub Secret:
   Settings → Secrets and variables → Actions → New repository secret
   Name: DEPLOY_SSH_KEY

2. Point DNS for carveout.app → 178.105.63.185
   (A record for @ and www)

3. Once DNS has propagated, get SSL certificate:
   ssh root@178.105.63.185
   certbot --nginx -d carveout.app -d www.carveout.app
""")


if __name__ == "__main__":
    main()
