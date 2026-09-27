#!/usr/bin/env bash
# Starts the ecommerce_platform backend and frontend together.
# Installs dependencies first if node_modules is missing in either folder.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

check_and_install() {
  local dir="$1"
  local name="$2"
  if [ ! -d "$dir/node_modules" ]; then
    echo "[$name] node_modules not found, running npm install..."
    (cd "$dir" && npm install)
  else
    echo "[$name] node_modules found, skipping install."
  fi
}

check_and_install "$BACKEND_DIR" "backend"
check_and_install "$FRONTEND_DIR" "frontend"

pids=()

cleanup() {
  echo ""
  echo "Stopping servers..."
  for pid in "${pids[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "Starting backend (npm run dev)..."
(cd "$BACKEND_DIR" && npm run dev) &
pids+=($!)

echo "Starting frontend (npm run dev)..."
(cd "$FRONTEND_DIR" && npm run dev) &
pids+=($!)

wait
