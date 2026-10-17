# 04 · Radio: calibration, flight modes, arm switch

Needs 05 done first. Transmitter on, all switches **up**, throttle **down**.

## Receiver signal
- Wiring: iA10B → **PPM encoder** board → Pixhawk **RC IN**.
- i6X: **hold OK → System setup → RX setup → Output mode → PWM** → hold CANCEL. (The encoder needs PWM. Direct cable without encoder = PPM.)
- Check: **Vehicle Configuration → Radio** → the Raw Channel Monitor follows the sticks.

## Calibrate
1. **Radio**: dropdown **Mode 2**, **Centered Throttle** unticked → **Calibrate** → OK.
2. Throttle down → **Next**. Then throttle up/down, yaw R/L, roll R/L, pitch up/down. Hold each at its end; QGC continues by itself.
3. Move all switches and knobs end to end → **Next** → **Next** (writes the values).
4. Check: right stick right → Roll right, left stick up → Throttle up.

## Flight modes (Vehicle Configuration → Flight Modes)
| Setting | Value |
|---|---|
| Flight mode channel | **Channel 6** |
| Flight Mode 1 / 2 | QLAND / QLAND |
| Flight Mode 3 / 4 | QHOVER / QHOVER |
| Flight Mode 5 / 6 | FBWA / FBWA |
| Channel option 6–16 | **Do Nothing** |

SWC up = QLAND · middle = QHOVER · down = FBWA (the active "Flight Mode N" label turns yellow).

## Arming
- `RC5_OPTION = 153` (ArmDisarm) stays: **SWA down = arm, up = off**.
- **Parameters** → `ARMING_RUDDER` → **Disabled** (no stick arming).
- `GPS1_TYPE` → **Auto (1)** → Reboot Vehicle.

## Test (Fly view: Q icon → Fly)
- Flip SWC: top bar shows QLand / QHover / FBWA.
- SWC middle, throttle down, SWA down: refused with "Arm: Hardware safety switch" (expected on the bench). SWA back up.

Refresh → **Tools → Save to file…** → `backups/params_after-guide04.params`.
