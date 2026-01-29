#!/bin/bash
#
# One-click launcher for Flutter TLS Bypass Toolkit (Android)
#
# Usage:
#   ./run-android.sh <package-name>
#
# Example:
#   ./run-android.sh com.target.app
#

if [ -z "$1" ]; then
    echo "[!] Usage: ./run-android.sh <package-name>"
    exit 1
fi

PKG="$1"

echo "[*] Flutter TLS Bypass Toolkit"
echo "[*] Target package: $PKG"
echo "[*] Starting Frida..."

frida -U -f "$PKG" \
    -l bypass/flutter_tls_universal.js \
    -l bypass/okhttp_bypass.js \
    -l bypass/trustmanager_bypass.js \
    --no-pause
