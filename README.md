# Flutter TLS Bypass Toolkit

A universal, one-click **Flutter TLS certificate pinning bypass toolkit**
built using **Frida**, designed for **authorized mobile application security testing**.

This project packages and extends existing open-source research into a
practical toolkit that works reliably across:
- Android emulators and real devices
- ARM, ARM64, x86, and x86_64 architectures
- Spawn and attach Frida workflows
- Flutter-only and hybrid (Flutter + native) applications

---

## Features

- Universal Flutter TLS pinning bypass (BoringSSL)
- Emulator-safe and architecture-independent
- Native Android TLS bypass support (OkHttp & TrustManager)
- One-click launcher scripts (Linux/macOS & Windows)
- Works with spawn (`-f`) and attach (`-n`) modes
- Minimal setup, no manual patching required

---

## How It Works (High-Level)

Flutter applications rely on **BoringSSL** for TLS operations.
This toolkit dynamically locates and patches the internal
`ssl_verify_peer_cert` function in memory to disable certificate
verification at runtime.

To handle hybrid applications and third-party SDKs, additional hooks
are included for:
- **OkHttp**
- **Custom X509TrustManager implementations**

All hooks are applied dynamically using Frida and do not modify
the application binary.

---

## Repository Structure

```text
flutter-tls-bypass-toolkit/
├── bypass/
│   ├── flutter_tls_universal.js     # Flutter (BoringSSL) TLS bypass
│   ├── okhttp_bypass.js             # OkHttp pinning bypass
│   └── trustmanager_bypass.js       # Generic TrustManager bypass
├── launcher/
│   ├── run-android.sh               # One-click launcher (Linux/macOS)
│   └── run-android.ps1              # One-click launcher (Windows)
├── LICENSE
├── README.md
└── VERSION
