# VTOL Y3: quick task lists

Short, do-this-then-that versions of the guides. Full explanations, logs and screenshots are in the HTML guides (`../guides/`, or `../index.html`).

| # | Task list | Status |
|---|---|---|
| 01 | [Connect and check ArduPlane](01-connect-and-check.md) | ✅ |
| 02 | [Update to ArduPlane 4.7.2](02-update-firmware.md) | ✅ |
| 03 | [Orientation, accelerometer, level, compass](03-orientation-calibration.md) | 🟡 compass after wiring |
| 04 | [Radio: calibration, flight modes, arm switch](04-radio-modes-arming.md) | ✅ |
| 05 | [FlySky i6X transmitter setup](05-flysky-i6x.md) | ✅ |
| 06 | Wiring | ⏳ |

**Setup:** ArduPlane 4.7.2 (QuadPlane, Tri, tilt-rotor VectoredYaw, V-tail) · Pixhawk 2.4.8 (`Pixhawk1`) · QGroundControl 5.1.5 (macOS) · FlySky i6X + iA10B → PPM encoder → RC IN · M8N GPS.

**Rules:** USB only, **no LiPo, no props** until a guide says otherwise. Save a parameter backup before and after each guide. After every reboot/connect: wait 30 s → **Parameters → Tools → Refresh** before editing or saving.
