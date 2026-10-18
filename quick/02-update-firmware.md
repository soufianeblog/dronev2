# 02 · Update to ArduPlane 4.7.2

**English** · [Français](../fr/quick/02-update-firmware.md) · [العربية](../ar/quick/02-update-firmware.md)



[← 01](01-connect-and-check.md) · [Index](README.md) · [Next: 03 →](03-orientation-calibration.md) · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-02_2026-10-17_0220_update-arduplane-4-7-2.html)

**Goal:** install the latest stable firmware and keep all old settings.
**You need:** the backup from 01, and a Mac on its charger.

> ⚠️ Never unplug the USB cable while the progress bar is running.

## Steps

- [ ] **1. Open the Firmware page.** **Q** → **Vehicle Configuration** → **Firmware**. The dropdown shows `Pixhawk1 [ArduPilot ChibiOS]`.
- [ ] **2. Click Flash.**
- [ ] **3. Unplug and replug.** When QGC says *"Now unplug your device and plug it back in"*: unplug the USB, wait 3 s, plug it back in.
- [ ] **4. Fill in the Firmware Setup popup:**
  - Choose **ArduPilot**.
  - Change the vehicle type from *Multi-Rotor* to **Plane**.
  - Pick **Pixhawk1 – 4.7.2** → **OK**.
- [ ] **5. Wait.** When it says **Upgrade complete**, the board reboots by itself.
- [ ] **6. Refresh.** Wait 30 s → **Parameters** → **Tools** → **Refresh**.
- [ ] **7. Check the version.** The messages must show `ArduPlane V4.7.2 (fb773567)`.
- [ ] **8. Back up.** **Tools** → **Save to file…** → `backups/params_after-guide02_4.7.2.params`

## ✅ Done when

- The version is 4.7.2.
- The backup has about **1,430** parameters. Old settings like `Q_FRAME_CLASS = 7` are still there.

## Problems?

| You see | Do this |
|---|---|
| *"Vehicle did not return the full parameter list"* | **Parameters → Tools → Refresh** |
| The popup offers Multi-Rotor | Change it to **Plane**. It's the most common mistake. |
| The flash failed | Click Flash again. The bootloader is safe, so the board can't be "bricked". |

---
© 2026 bellocloud.com
