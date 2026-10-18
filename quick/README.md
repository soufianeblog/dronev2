# VTOL Y3 · Quick task lists

**English** · [Français](../fr/quick/README.md) · [العربية](../ar/quick/README.md)

Do-this-then-that checklists for setting up the VTOL Y3. Each one takes a few minutes to read.
Want the reasons, screenshots and logs too? Open the **[full guides in the browser](https://soufianeblog.github.io/dronev2/)**.

## The aircraft

| | |
|---|---|
| Airframe | Tilt-rotor tricopter VTOL: 2 tilting front motors, 1 fixed tail motor, ailerons, V-tail |
| Flight controller | Pixhawk 2.4.8 (firmware target `Pixhawk1`) running **ArduPlane 4.7.2** (QuadPlane) |
| Ground station | QGroundControl 5.1.5 on macOS |
| Radio | FlySky i6X → iA10B receiver → PPM encoder → Pixhawk **RC IN** |
| GPS | M8N with compass |

## Task lists, in order

| # | Task list | Time | Status |
|---|---|---|---|
| 01 | [Connect and check ArduPlane](01-connect-and-check.md) | 15 min | ✅ Done |
| 02 | [Update to ArduPlane 4.7.2](02-update-firmware.md) | 15 min | ✅ Done |
| 03 | [Orientation and calibration](03-orientation-calibration.md) | 20 min | 🟡 Compass left (after wiring) |
| 05 | [FlySky i6X transmitter setup](05-flysky-i6x.md) | 25 min | ✅ Done |
| 04 | [Radio calibration, flight modes, arm switch](04-radio-modes-arming.md) | 30 min | ✅ Done |
| 06 | [Outputs: plug in and test servos, then motors](06-outputs-servo-test.md) | 45 min | 🟡 In progress |

## Reference pages

| Page | What it shows |
|---|---|
| [Sticks and switches](ref-stick-controls.md) | Drawings: how each stick and switch moves the aircraft |
| [FlySky i6X settings](ref-flysky-settings.md) | Every transmitter setting, changed and checked |
| [Parameter changes](ref-parameter-changes.md) | Every ArduPlane parameter changed: before → after → why |

> Do **05 before 04**: the transmitter must be set up before the Pixhawk can calibrate it.

## Rules for every task list

- 🔌 **USB only:** no LiPo, no propellers, unless a list says otherwise.
- 💾 **Backup before and after:** *Parameters → Tools → Save to file…* into `backups/`.
- 🔄 **Refresh after every reboot:** wait 30 s, then *Parameters → Tools → Refresh*, before you change or save anything. Otherwise ~144 VTOL settings are missing from the list.
- 🧭 **Where things are in QGC 5.1.5:**
  - **Setup pages:** click the purple **Q** icon (top-left) → **Vehicle Configuration**.
  - **Main map screen:** **Q** icon → **Fly**.
  - **Messages:** the message icon in the top bar.

---
© 2026 bellocloud.com
