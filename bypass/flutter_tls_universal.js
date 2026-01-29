// Placeholder – will be replaced with universal Flutter TLS bypass
/*
 * Universal Flutter TLS Pinning Bypass Toolkit
 *
 * This script is based on original research and implementation by:
 * NVISO Security – disable-flutter-tls-verification
 * https://github.com/NVISOsecurity/disable-flutter-tls-verification
 *
 * Modifications and extensions by Parad0x include:
 * - Universal architecture-independent scanning
 * - Emulator-safe execution (x86 / x86_64)
 * - Module-agnostic memory scanning
 * - Reliable spawn and attach support
 * - Toolkit-ready design for mobile pentesting
 *
 * License: MIT
 *
 * Intended for authorized security testing and research only.
 */

'use strict';

console.log('[+] Universal Flutter TLS Bypass loaded');
console.log('[+] Architecture:', Process.arch);
console.log('[+] Platform:', Process.platform);

let patched = false;
let attempts = 0;
const MAX_ATTEMPTS = 15;
const INTERVAL = 1000;

/*
 * BoringSSL ssl_verify_peer_cert patterns
 * Used by Flutter engine across platforms
 */
const PATTERNS = {
    arm64: [
        'F? 0F 1C F8 F? 5? 01 A9 F? 5? 02 A9 F? ?? 03 A9 ?? ?? ?? ?? 68 1A 40 F9',
        'FF 43 01 D1 FE 67 01 A9 F8 5F 02 A9 F6 57 03 A9'
    ],
    arm: [
        '2D E9 F? 4? D0 F8 00 80 81 46'
    ],
    x64: [
        '55 41 57 41 56 41 55 41 54 53 48 83 EC',
        '55 41 57 41 56 41 55 41 54 53 50 49 89'
    ],
    x86: [
        '55 89 E5 53 57 56 83 E4 F0'
    ]
};

function scanAndPatch() {
    if (patched) return;

    attempts++;
    console.log(`[ ] Scanning for ssl_verify_peer_cert (${attempts}/${MAX_ATTEMPTS})`);

    const patterns = PATTERNS[Process.arch];
    if (!patterns) {
        console.error('[!] Unsupported architecture:', Process.arch);
        return;
    }

    const ranges = Process.enumerateRanges({
        protection: 'r-x',
        coalesce: true
    });

    for (const range of ranges) {
        for (const pattern of patterns) {
            let matches = [];
            try {
                matches = Memory.scanSync(range.base, range.size, pattern);
            } catch (e) {
                continue;
            }

            for (const match of matches) {
                if (patched) return;

                const sym = DebugSymbol.fromAddress(match.address);

                console.log('[+] ssl_verify_peer_cert located');
                console.log('    Address:', match.address);
                console.log('    Module :', sym.moduleName || 'unknown');

                patch(match.address);
                patched = true;

                console.log('[+] TLS certificate verification bypassed successfully');
                return;
            }
        }
    }

    if (attempts < MAX_ATTEMPTS) {
        setTimeout(scanAndPatch, INTERVAL);
    } else {
        console.error('[!] Failed to locate ssl_verify_peer_cert');
        console.error('[!] App may not use Flutter or uses a newer engine build');
    }
}

function patch(address) {
    Interceptor.replace(
        address,
        new NativeCallback(() => {
            return 0; // SSL_VERIFY_OK
        }, 'int', ['pointer', 'int'])
    );
}

setTimeout(scanAndPatch, 0);
