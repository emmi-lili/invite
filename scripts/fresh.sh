#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORTS=(3000 3001 3002)

echo "→ Liberando puertos ${PORTS[*]}..."
for port in "${PORTS[@]}"; do
  pids=$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "${pids:-}" ]; then
    echo "  matando :$port → $pids"
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
  fi
done

echo "→ Limpiando .next..."
rm -rf .next

echo "→ Arrancando next dev..."
exec npm run dev
