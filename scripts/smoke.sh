#!/usr/bin/env bash
# Proves the Next.js dev server boots and renders the checkout page (no Gr4vy call happens until the browser asks).
set -euo pipefail
cd "$(dirname "$0")/.."
export NEXT_TELEMETRY_DISABLED=1
[ -d node_modules ] || npm ci
log=$(mktemp)
pid=
trap '[ -n "$pid" ] && kill -- -"$pid" 2>/dev/null; rm -f "$log"' EXIT
port=$(node -e 'const s=require("net").createServer().listen(0,()=>{console.log(s.address().port);s.close()})')
set -m
node_modules/.bin/next dev -p "$port" >"$log" 2>&1 &
pid=$!
for _ in $(seq 60); do
  curl -fs -o /dev/null "http://localhost:$port/" && exit 0
  sleep 1
done
cat "$log"
exit 1
