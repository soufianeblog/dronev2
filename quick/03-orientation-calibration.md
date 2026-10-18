# 03 · Orientation and calibration

**English** · [Français](../fr/quick/03-orientation-calibration.md) · [العربية](../ar/quick/03-orientation-calibration.md)

[← 02](02-update-firmware.md) · [Index](README.md) · [Next: 05 →](05-flysky-i6x.md) · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-03_2026-10-17_0309_orientation-and-calibration.html)

**Goal:** tell the Pixhawk how it's mounted, then calibrate its sensors.
**You need:** the Pixhawk mounted in the plane with its **arrow pointing to the nose**, and a flat table.

> 🔄 **"Reboot Vehicle"** means restarting the Pixhawk: **Parameters → Tools → Reboot Vehicle**. Then wait 30 s.

## Steps

- [ ] **1. Orientation.** **Parameters** → search `AHRS_ORIENTATION` → **None (0)** → **Save** → **Reboot Vehicle**.
- [ ] **2. Accelerometer.** **Vehicle Configuration** → **Sensors** → **Accelerometer** → **OK**. Put the plane in each of the 6 positions QGC shows (level, left side, right side, nose down, nose up, upside down). Hold it still and click **Next** for each.
- [ ] **3. Level.** **Sensors** → **Level Horizon** → plane flat on the table (shim it level if needed) → **OK**.
- [ ] **4. Compass.** ⏳ *Do this after the wiring guide, outdoors, away from metal.* **Sensors** → **Compass** → **OK** → turn the plane slowly around every axis until the bar is full → **Reboot Vehicle**.
- [ ] **5. Back up.** Refresh → **Tools** → **Save to file…** → `backups/params_after-guide03.params`

## ✅ Done when

- `AHRS_ORIENTATION = 0`.
- Tilt the nose down: the horizon in QGC shows **pitch**, not roll.
- After step 4, *"PreArm: Compass not calibrated"* is gone.

## Problems?

| You see | Do this |
|---|---|
| Nose down shows roll | The orientation is wrong. Check the arrow direction and `AHRS_ORIENTATION`. |
| Can't find a Gyro button | Normal. QGC hides it for planes. |

---
© 2026 bellocloud.com
