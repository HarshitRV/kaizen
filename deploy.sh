#!/usr/bin/env bash
set -euo pipefail

APP_NAME="kaizen"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=3274
BUN="/home/harshitrvpi/.bun/bin/bun"

export PATH="$BUN:$PATH"

cd "$APP_DIR"

echo "═══════════════════════════════════════"
echo "  Deploying $APP_NAME (SSR)"
echo "═══════════════════════════════════════"

# ── 1. Pull latest code ──────────────────
echo ""
echo "→ Pulling latest changes..."
git pull

# ── 2. Install dependencies ──────────────
echo ""
echo "→ Installing dependencies..."
bun install

# ── 3. Build ─────────────────────────────
echo ""
echo "→ Building for production..."
bun run build

# ── 4. Start or restart PM2 ─────────────
echo ""
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  echo "→ Reloading $APP_NAME via PM2 (zero-downtime)..."
  pm2 reload "$APP_NAME"
else
  echo "→ Starting $APP_NAME via PM2 (first time)..."
  pm2 start ecosystem.config.cjs
  pm2 save
fi

# ── 5. Health check ──────────────────────
echo ""
echo "→ Waiting for server..."
sleep 3

if curl -sf http://localhost:$PORT > /dev/null 2>&1; then
  echo "✓ Server is up at http://localhost:$PORT"
else
  echo "✗ Server did not respond — check logs with: pm2 logs $APP_NAME"
  exit 1
fi

echo ""
echo "═══════════════════════════════════════"
echo "  ✓ Deploy complete!"
echo "═══════════════════════════════════════"
