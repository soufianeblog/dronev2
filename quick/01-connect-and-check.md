# 01 · Connect and check ArduPlane

**English** · [Français](../fr/quick/01-connect-and-check.md) · [العربية](../ar/quick/01-connect-and-check.md)

[Index](README.md) · [Next: 02 →](02-update-firmware.md) · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-01_2026-10-17_0113_connect-and-check-arduplane.html)

**Goal:** see what's on the board and back it up. Nothing gets changed.
**You need:** Pixhawk, USB cable, QGroundControl 5.1.5.

## Steps

- [ ] **1. Connect.** Plug the Pixhawk into the Mac with USB and open QGC. Wait until the top bar shows **Not Ready**.
- [ ] **2. Read the start-up messages.** Click the **message icon** in the top bar and look for:
  - `ArduPlane V4.x.x`
  - `Pixhawk1`
  - `QuadPlane initialised, Frame: TRI`
- [ ] **3. Open the parameters.** **Q** → **Vehicle Configuration** → **Parameters** (bottom of the left list).
  - If a popup says *"Parameters are missing from firmware"*, click **Ok**. It's harmless.
- [ ] **4. Check four settings.** Type each name in the search box:

  | Parameter | Should be |
  |---|---|
  | `Q_ENABLE` | 1 |
  | `Q_FRAME_CLASS` | 7 (Tri) |
  | `Q_TILT_TYPE` | 2 (VectoredYaw) |
  | `Q_TILT_MASK` | 3 |

- [ ] **5. Back up.** **Tools** (top-right) → **Save to file…** → `backups/params-backup_<date>_before-guide02.params`

## ✅ Done when

- The messages show ArduPlane with QuadPlane TRI.
- The backup file is in `backups/`.

## Problems?

| You see | Do this |
|---|---|
| "Comms Lost" in the top bar | Unplug the USB, wait 3 s, plug it back in |
| Can't find Parameters | It's under **Vehicle Configuration**, at the bottom of the left list |

---
© 2026 bellocloud.com
