#!/bin/bash
set -e

echo "=== WordPress Infrastructure Setup ==="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running"
    exit 1
fi

# Create caddy network if it doesn't exist
if ! docker network inspect caddy > /dev/null 2>&1; then
    echo "Creating caddy network..."
    docker network create caddy
else
    echo "Caddy network already exists"
fi

# Start Caddy
cd "$(dirname "$0")/caddy"

if [ ! -f .env ]; then
    cp .env.template .env
    echo "Created caddy/.env - please edit ACME_EMAIL before continuing"
    echo "Run: nano $(pwd)/.env"
    exit 1
fi

echo "Starting Caddy reverse proxy..."
docker compose up -d

echo ""
echo "=== Setup Complete ==="
echo "Caddy is running. Add sites with: ./dock-website.sh sitename domain.com"