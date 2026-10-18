# Parameter changes: before → after

**English** · [Français](../fr/quick/ref-parameter-changes.md) · [العربية](../ar/quick/ref-parameter-changes.md)

[Index](README.md) · [Full page](https://soufianeblog.github.io/dronev2/guides/ref-parameter-changes.html)

Compared: `backups/params_after-guide02_4.7.2.params` (old setup, right after the firmware update) → `backups/params_latest2.params` (latest, Guide 06 rev 5). **Bold** = changed.

## Every change

| Group | Parameter | Before | After | Guide | What it is for |
|---|---|---|---|---|---|
| Firmware | `ArduPlane version` | 4.7.1 (dbe79216) | **4.7.2** (fb773567) | 02 | Latest stable ArduPlane for the Pixhawk1 target. All old parameters were kept. |
| Orientation | `AHRS_ORIENTATION` | 2 (Yaw90) | **0 (None)** | 03 | Tells ArduPlane how the Pixhawk is mounted. 0 = arrow pointing to the nose, which matches the real installation. |
| Calibration | `INS_ACCOFFS_X/Y/Z, INS_ACCSCAL_X/Y/Z` | old / 1.0 | new values | 03 | Accelerometer 1 calibration (6 positions): offsets and scale so the Pixhawk measures tilt correctly. |
| Calibration | `INS_ACC2OFFS_X/Y/Z, INS_ACC2SCAL_X/Y/Z` | old / 1.0 | new values | 03 | Same for the second accelerometer. |
| Calibration | `INS_ACC1_CALTEMP, INS_ACC2_CALTEMP` | 38.9 / 41.0 °C | 47.3 / 49.8 °C | 03 | Board temperature recorded during the accelerometer calibration. |
| Calibration | `AHRS_TRIM_X / AHRS_TRIM_Y` | 0 / 0 | **−0.016 / −0.006** rad | 03 | Level horizon: the small roll/pitch offset (about −0.9° and −0.3°) so 'level' really is level. |
| Radio | `RC1_MIN / MAX / TRIM` | 1139 / 1773 / 1517 | **1000 / 1999 / 1524** | 04 | Roll stick range and centre, learned by the radio calibration. |
| Radio | `RC2_MIN / MAX / TRIM` | 1186 / 1833 / 1497 | **1000 / 1999 / 1500** | 04 | Pitch stick range and centre. (RC2_REVERSED = 1 kept: matches ArduPlane's pitch convention.) |
| Radio | `RC3_MIN / MAX / TRIM` | 1000 / 1995 / 1000 | 1000 / 1995 / 1000 | 04 | Throttle stick range; already matched, unchanged. TRIM = minimum because throttle has no centre. |
| Radio | `RC4_MIN / MAX / TRIM` | 1000 / 2006 / 1517 | **1000 / 2000 / 1524** | 04 | Yaw stick range and centre. |
| Radio | `RC5_MIN / MAX / TRIM` | 1000 / 1001 / 1000 | **1000 / 1999 / 1499** | 04 | SWA range. Before, channel 5 never moved (knob was assigned); now the full switch travel is known. |
| Radio | `RC6_MIN / MAX / TRIM` | 999 / 1999 / 1000 | **1000 / 2000 / 1500** | 04 | SWC range (3 positions). |
| Radio | `RC7, RC8 MIN / MAX / TRIM` | 1496–1505 / 999–1999 | 1000 / 2000 / 1500 | 04 | Unused channels: calibration stored a neutral 1000–2000 range. |
| Radio | `RC9 … RC16 MIN / MAX / TRIM` | mixed old values | 1000 / 2000 / 1500 | 04 | Channels the receiver doesn't send (PPM = 8 channels): reset to neutral defaults by the calibration. |
| Flight modes | `FLTMODE_CH` | 8 | **6** | 04 | Which channel selects the flight mode: now channel 6 = SWC. |
| Flight modes | `FLTMODE1 / FLTMODE2` | 17 QSTABILIZE / 19 QLOITER | **20 QLAND / 20 QLAND** | 04 | SWC up = QLAND: vertical landing, motors stop after touchdown. Slot 2 = safety filler. |
| Flight modes | `FLTMODE3 / FLTMODE4` | 5 FBWA / 17 QSTABILIZE | **18 QHOVER / 18 QHOVER** | 04 | SWC middle = QHOVER: drone mode that holds height when the throttle is centred. Slot 3 = filler. |
| Flight modes | `FLTMODE5 / FLTMODE6` | 11 RTL / 5 FBWA | **5 FBWA / 5 FBWA** | 04 | SWC down = FBWA: airplane mode with stabilised wings. Slot 5 = filler. |
| Switches | `RC5_OPTION` | 153 ArmDisarm | 153 ArmDisarm (kept) | 04 | SWA down arms, up disarms immediately (also in the air!). |
| Switches | `RC6_OPTION` | 4 RTL | **0 Do Nothing** | 04 | Channel 6 is the mode switch; it can't also trigger Return-To-Launch. |
| Switches | `RC9_OPTION` | 34 Relay2 | **0** | 04 | Old leftover job removed. |
| Switches | `RC10_OPTION` | 162 FFT Tune | **0** | 04 | Old leftover job removed. |
| Switches | `RC12_OPTION` | 28 Relay1 | **0** | 04 | Old leftover job removed. |
| Switches | `RC13_OPTION` | 24 Auto mission reset | **0** | 04 | Old leftover job removed. |
| Switches | `RC14_OPTION` | 16 AUTO mode | **0** | 04 | Old leftover job removed. |
| Switches | `RC16_OPTION` | 154 ArmDisarm with AirMode | **0** | 04 | Old leftover job removed (a second arm switch on a channel the receiver doesn't send). |
| Arming | `ARMING_RUDDER` | 2 ArmOrDisarm | **0 Disabled** | 04 | No more arming with the sticks (throttle down + yaw right). SWA is the only way to arm. (Stick arming turned back on in Guide 06, see below.) |
| Switches & modes | `RC7_OPTION` | 0 Do Nothing | **4 RTL** | 06 | SWB (channel 7) down = return home; up = back to the SWC mode. |
| Switches & modes | `Q_RTL_MODE` | 2 VTOL approach | **3 QRTL Always** | 06 | Return home as a drone and land vertically (was: fly home as an airplane, then land vertically). |
| Switches & modes | `FLTMODE1 / FLTMODE2` | 20 QLAND / 20 QLAND | **17 QSTABILIZE / 17 QSTABILIZE** | 06 | SWC up = QStabilize: drone with direct throttle. The Pixhawk can't arm in QLand and ignored the throttle there. |
| Switches & modes | `ARMING_RUDDER` | 0 Disabled | **2 ArmOrDisarm** | 06 | Left stick down + right 3 s arms, down + left 2 s disarms. Works together with SWA. |
| Bench & calibration | `ARMING_SKIPCHK` | 0 | **16** (INS) | 06 | Skips the INS/AHRS check so it arms indoors without a GPS fix. Bench only: set back to **0** before any flight. |
| Bench & calibration | `COMPASS_OFS_*, COMPASS_DIA_*, COMPASS_ODI_*, COMPASS_SCALE` | old values | new values | 06 | Compass offsets recalibrated (external HMC5883, quality yellow). Redo outdoors for green before the first flight. |
| Bench & calibration | `Q_ESC_CAL` | 0 | 0 → **1** → 0 | 06 | ESC calibration done (each ESC learned 1000 = stop, 2000 = full), then set back to 0. |
| Tilt servos | `SERVO9_MAX` | 1940 | **1900** | 06 | Front left tilt (AUX 1, reversed): its 'up' end is MAX. `SERVO9_MIN` 800 unchanged. |
| Tilt servos | `SERVO10_MIN` | 700 | **800** | 06 | Front right tilt (AUX 2): its 'up' end is MIN. |
| Tilt servos | `SERVO10_MAX` | 2100 | **2000** | 06 | Front right tilt: 'forward' end. |
| Tilt servos | `Q_TILT_YAW_ANGLE` | 10° | **5°** | 06 | Smaller steering tilt (VectoredYaw) in drone modes. |
| Tilt servos | `Q_M_THST_HOVER` | 0.479 | **0.37** | 06 | Hover throttle: the value learned on the bench was reset; the Pixhawk relearns it in flight. |
| Tilt servos | `SERVO9_REVERSED / SERVO10_REVERSED` | 1 / 0 | **0 / 1** (not yet in a backup) | 06 | Tilt direction fix: both tilt servos worked backwards (motors forward in QStabilize, rising in FBWA). Row 9 Reversed unticked, row 10 ticked; all 3 modes confirmed correct. Next backup will include it. |
| Yaw gains | `Q_A_RAT_YAW_P / I / D` | 1.2 / 0.6 / 0.15 | **0.18 / 0.018 / 0** | 06 | Yaw rate gains back to ArduPilot defaults (old values far too high). `Q_A_RAT_YAW_FF` stays 0.1. Tune later from flight logs. |
| Switches & modes | `Q_ASSIST_SPEED` | 10 m/s | **5 m/s** | 06 | Speed below which the VTOL motors help in airplane modes. ArduPilot advice without an airspeed sensor: 5 m/s below minimum airspeed. |
| Switches & modes | `FLTMODE2 / FLTMODE3 / FLTMODE5` | 17 / 18 / 5 | 0 Manual → **17 / 18 / 5** (restored) | 06 | Slots 2, 3, 5 had become Manual (raw airplane, no stabilisation) by accident in `params_latest1`; restored in `params_latest2`. SWC up / middle / down = slots 1 / 4 / 6. |
| GPS | `GPS1_TYPE` | 1 Auto | 1 Auto (confirmed) | 04 | GPS on port 1, auto-detect (u-blox M8N). It showed 0 once because QGC had loaded an incomplete list; set to Auto and confirmed. |

## Important settings kept from the old setup

| Parameter | Value | What it is for |
|---|---|---|
| `Q_ENABLE` | 1 | QuadPlane (VTOL) on |
| `Q_FRAME_CLASS` | 7 | Tricopter: 3 lift motors |
| `Q_TILT_ENABLE / Q_TILT_MASK` | 1 / 3 | Motors 1 + 2 tilt |
| `Q_TILT_TYPE` | 2 | VectoredYaw: tilt servos also steer yaw |
| `Q_TILT_MAX` | 70 | Max tilt in VTOL modes |
| `SERVO1/2_FUNCTION` | 4 Aileron | MAIN 1–2: ailerons |
| `SERVO3/4_FUNCTION` | 79 / 80 VTailLeft/Right | MAIN 3–4: V-tail |
| `SERVO5/6/8_FUNCTION` | 33 / 34 / 36 Motor1/2/4 | MAIN 5, 6, 8: ESCs |
| `SERVO7_FUNCTION` | 39 | Auto-assigned by the Tri frame (keep MAIN 7 empty) |
| `SERVO9/10_FUNCTION` | 75 / 76 TiltMotorFrontLeft/Right | AUX 1–2: tilt servos |
| `BATT_MONITOR` | 4 | Analog power module (voltage + current) |
| `BRD_SAFETY_DEFLT` | 1 | Safety button must be pressed before arming |

## Values that change by themselves

| Parameter | Why it changes |
|---|---|
| `INS_GYROFFS_*, INS_GYR2OFFS_*, INS_GYR*_CALTEMP` | Gyro offsets, re-measured automatically at every boot. |
| `BARO1_GND_PRESS` | Ground air pressure, measured at every boot. |
| `STAT_*` | Statistics: boot count, run time, flight time. |
| `BRD_SD_SLOWDOWN` | SD-card speed setting adjusted by the board. |
| `Q_M_THST_HOVER` | Hover throttle, learned automatically while armed (0.369 → 0.479 on the bench, reset by hand to 0.37 in Guide 06, relearned since: 0.32 → 0.57 → 0.51 now). Set ≈ 0.37 just before the first hover. |

> 💡 After a reboot, QGC may list only ~1,276 of the ~1,430 parameters. Use **Parameters → Tools → Refresh** before saving or comparing.

---
© 2026 bellocloud.com
