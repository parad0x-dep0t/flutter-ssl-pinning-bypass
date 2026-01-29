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
## Usage

### Prerequisites
- Frida installed on the host system
- Frida server running on the Android device or emulator
- USB debugging enabled on the target device

---

### Linux / macOS

```bash
chmod +x launcher/run-android.sh
./launcher/run-android.sh com.target.app
.\launcher\run-android.ps1 com.target.app


---

## Attribution

```md
## Attribution & Credits

This project is based on and inspired by the following open-source research:

- **NVISO Security – disable-flutter-tls-verification**  
  https://github.com/NVISOsecurity/disable-flutter-tls-verification

The original work has been significantly modified and extended, including:
- Universal architecture-independent memory scanning
- Emulator-safe execution
- Support for hybrid Flutter and native Android networking
- Integration of OkHttp and TrustManager bypasses
- One-click launcher scripts for streamlined usage


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

## Disclaimer

This project is intended solely for **authorized security testing,
research, and educational purposes**.

Do not use this toolkit against applications, systems, or networks
without explicit permission from the owner.

The author assumes no responsibility or liability for any misuse,
damage, or legal consequences resulting from the use of this project.

