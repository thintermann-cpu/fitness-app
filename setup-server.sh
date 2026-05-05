#!/bin/bash
set -e

echo "=== CarveOut Server Setup ==="

apt-get update -y && apt-get upgrade -y
apt-get install -y nginx certbot python3-certbot-nginx ufw git curl

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

mkdir -p /var/www/carveout
chown -R www-data:www-data /var/www/carveout

mkdir -p /root/.ssh
ssh-keygen -t ed25519 -C "carveout-deploy" -f /root/.ssh/deploy_key -N ""

cat > /etc/nginx/sites-available/carveout << 'NGINX'
server {
    listen 80;
    server_name carveout.app www.carveout.app;
    root /var/www/carveout;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
NGINX

ln -sf /etc/nginx/sites-available/carveout /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
systemctl enable nginx

echo "=== SETUP COMPLETE ==="
echo "Deploy SSH Public Key:"
cat /root/.ssh/deploy_key.pub
echo ""
echo "Deploy SSH Private Key (for GitHub secret DEPLOY_SSH_KEY):"
cat /root/.ssh/deploy_key
