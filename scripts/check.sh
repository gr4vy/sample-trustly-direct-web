#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export NEXT_TELEMETRY_DISABLED=1
npm ci
npx next build
