# 03 · Orientation, accelerometer, level, compass

Pixhawk mounted in the plane, arrow pointing to the nose.

1. **Parameters** → search `AHRS_ORIENTATION` → **None (0)** → Save. Then **Tools → Reboot Vehicle**, wait 30 s.
2. **Vehicle Configuration → Sensors → Accelerometer** → OK → follow the 6 positions (level, left, right, nose down, nose up, back). Hold still, click **Next** for each.
3. **Sensors → Level Horizon** → plane flat on a table (shim it level) → OK.
4. **Compass** (⏳ after wiring, outdoors, away from metal): **Sensors → Compass** → OK → rotate the plane around all axes until done → **Reboot Vehicle**.
5. Refresh → **Tools → Save to file…** → `backups/params_after-guide03.params`.

**Result:** `AHRS_ORIENTATION = 0`, accel + level calibrated. "Compass not calibrated" stays until step 4.
