<p align="center">
  <img src="src-tauri/icons/icon.png" alt="MicFloat Logo" width="128" height="128">
</p>

# MicFloat

MicFloat is a fast, lightweight, open-source Speech-to-Text desktop application built with Tauri, React, and TailwindCSS. It sits quietly in the background and pops up an overlay right when you need it, letting you dictate text anywhere on your computer and immediately copying it to your clipboard.

It uses the [Speechmatics API](https://www.speechmatics.com/) for incredibly fast and accurate transcriptions.

## 🚀 Getting Started (For End Users)

You don't need to be a developer to use MicFloat. Just download, set your API key, and start talking!

### 1. Download & Install

Currently, MicFloat is compiled and automatically released for **Linux**.

- Head over to the [Releases page](/releases).
- Download either the `.deb` file (for Debian/Ubuntu-based systems) or the `.AppImage` (works on almost all Linux distributions).
- Install or run the downloaded file.

#### DEB (Ubuntu, Debian)

```bash
sudo apt install ./micfloat_0.1.0_amd64.deb
```

#### RPM (Fedora, RHEL, openSUSE)

```bash
sudo dnf install ./micfloat-0.1.0-1.x86_64.rpm
```

#### AppImage (any Linux)

```bash
chmod +x micfloat_0.1.0_amd64.AppImage
./micfloat_0.1.0_amd64.AppImage
```

### 2. Setup your API Key

Because MicFloat is a bring-your-own-key application, you need to provide an API key from Speechmatics.

1. Create a free account at [Speechmatics](https://portal.speechmatics.com/)(8 hours/month).
2. Generate an API Key in your dashboard.
3. Open the **MicFloat main application window**.
4. Paste your API key into the Settings page and save it.

### 3. Usage & The Magic `--overlay` Flag

You can open the overlay by clicking "Open Overlay" in the main window, speaking, and hitting `Enter`. The transcribed text will instantly be copied to your clipboard, and the overlay will hide itself.

**The real magic happens when you set up a global keyboard shortcut.**

MicFloat supports a special command-line flag: `--overlay`. When you launch the app with this flag, it skips the main window and instantly pops up the recording overlay. When it's done copying the text to your clipboard, it cleanly shuts itself down.

**How to set this up on Linux (GNOME/KDE):**

1. Open your system's **Keyboard Shortcuts** settings.
2. Add a new Custom Shortcut.
3. Name: `MicFloat Overlay` (or whatever you prefer).
4. Command: `micfloat --overlay` (or the absolute path to your AppImage, like `/home/user/Downloads/micfloat.AppImage --overlay`).
5. Shortcut: Pick a hotkey (e.g., `Super + m` or `Ctrl + Shift + M`).

Now, no matter what application you are in, you can press your hotkey, speak your text, press Enter, and hit `Ctrl+V` to paste the transcription perfectly!

---

## 🛠️ Building from Source (For Developers)

Want to contribute, tinker, or build for another OS (like Windows or macOS)?

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Bun](https://bun.sh/)
- System dependencies for Tauri (on Linux, you'll need `libwebkit2gtk-4.1-dev`, `build-essential`, etc. See [Tauri's Linux setup guide](https://tauri.app/v1/guides/getting-started/prerequisites#linux)).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zougari47/micfloat.git
   cd micfloat
   ```
2. Install frontend dependencies:
   ```bash
   bun install
   ```
3. Run the development server (with hot-reloading!):
   ```bash
   bun run tauri dev
   ```
4. Build the release binaries:
   ```bash
   bun run tauri build
   ```
