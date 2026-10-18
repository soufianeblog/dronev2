# 06 · Outputs: plug in and test the servos (then the motors)

**English** · [Français](../fr/quick/06-outputs-servo-test.md) · [العربية](../ar/quick/06-outputs-servo-test.md)

[← 04](04-radio-modes-arming.md) · [Index](README.md) · Next: 07 ⏳ · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html)

**Goal:** every servo is on the right Pixhawk output and moves the right way. Motors come later, **props off**.
**You need:** [04](04-radio-modes-arming.md) done. **Propellers OFF** on all 3 motors. LiPo only when a step says so.

## A. Where everything plugs in

| Pixhawk output | Plug in |
|---|---|
| **MAIN 1** | Left aileron servo |
| **MAIN 2** | Right aileron servo |
| **MAIN 3** | Left tail wing servo |
| **MAIN 4** | Right tail wing servo |
| **MAIN 5** | ESC, front **right** motor (M1) |
| **MAIN 6** | ESC, front **left** motor (M2) |
| MAIN 7 | **Leave empty** |
| **MAIN 8** | ESC, tail motor (M4) |
| **AUX 1** | Tilt servo, front **left** motor |
| **AUX 2** | Tilt servo, front **right** motor |

Left/right = as seen sitting in the plane, looking forward. Nothing to re-assign: `SERVOn_FUNCTION` already matches.

## B. Plug in the servos (Pixhawk off)

- [ ] **1.** Unplug the **USB** and the **LiPo**.
- [ ] **2.** Each plug: **orange/yellow/white (signal) on top**, red (+) in the middle, **brown/black (−) at the bottom**, next to the board's base.
- [ ] **3.** Plug in the 4 surface servos (MAIN 1–4) and the 2 tilt servos (AUX 1–2) as in the table.
- [ ] **4.** Plug the 3 ESC leads: **MAIN 5** front right, **MAIN 6** front left, **MAIN 8** tail. Keep the red wire only on MAIN 8 (lift and tape it on MAIN 5 and 6). Props off.
- [ ] **5.** 📸 Take a photo of the pin row.

## C. Safe limits for the tilt servos

- [ ] **1.** USB in, wait 30 s → **Q** → **Vehicle Configuration** → **Parameters** → **Tools** → **Refresh**.
- [ ] **2.** Search each name → click it → type the value → **Save**:

  | Parameter | Now | Set to (temporary) |
  |---|---|---|
  | `SERVO9_MIN` | 800 | **1100** |
  | `SERVO9_MAX` | 1940 | **1900** |
  | `SERVO10_MIN` | 700 | **1100** |
  | `SERVO10_MAX` | 2100 | **1900** |

  Rev 4: final end points in part N (`SERVO9` 800–1900, `SERVO10` 800–2000).

## D. Power the servo rail (5 V)

The Pixhawk does **not** power the servo pins from USB or the power module. Pick one:

- [ ] **A. One ESC's BEC:** plug the tail ESC into **MAIN 8**. Only **one** ESC keeps its red wire; lift the red wire out of the other two plugs and tape it back.
- [ ] **B. PDB 5 V:** a lead from the PDB **5 V** pads to a free + / − pair on the rail (e.g. MAIN 7, signal pin empty). ⚠️ **Never 12 V.**

## E. Test wing and tail servos (FBWA)

- [ ] **1.** Props off. Transmitter on, switches up, throttle down.
- [ ] **2.** USB in, then the LiPo.
- [ ] **3.** Hold the red **safety button** (own cable, port **SWITCH**) 2 s until its light is **solid** (this does not arm).
- [ ] **4.** **SWC down** (FBWA).
- [ ] **5.** **Q** → **Vehicle Configuration** → **Servo Outputs**: watch the **Position** column.
- [ ] **6.** Move the sticks and check ([drawings](ref-stick-controls.md)):

  | Move | Must happen |
  |---|---|
  | Right stick → right | Left aileron **down**, right aileron **up** |
  | Right stick ↓ (pulled back) | Both tail wings **up** |
  | Left stick → right | Right tail wing **up**, left tail wing **down** |

- [ ] **7.** Wrong way? **Servo Outputs** → tick **Reversed** on that row → test again.
- [ ] **8.** Tilt the plane by hand: right wing down → right aileron **down**, left aileron **up**. Nose down → both tail wings **up**.

## F. Test the tilt servos

- [ ] **SWC middle** (QHOVER) → both front motors point **straight up**.
- [ ] **SWC down** (FBWA) → both tilt **forward** slowly (~25°/s).
- [ ] **SWC middle** again → back up (faster, ~80°/s).
- [ ] Listen for **buzzing** at an end: note which motor and which end.

## G. Switches and modes ([Step 6](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#switches)) ✅ done 2026-10-18

- [ ] **1.** **Q** → **Vehicle Configuration** → **Radio** → *Channel Monitor*: sticks 1–4, SWA 5, SWC 6.
- [ ] **2.** FlySky: hold **OK** → **Functions setup** → **Aux. channels** → **Channel 7** = **SwB** → hold **CANCEL**. Bar 7 now moves with SWB.
- [ ] **3.** **Flight Modes** → *Switch Options* → **Channel option 7** = **RTL** (`RC7_OPTION` = 4). SWB down = return home.
- [ ] **4.** **Parameters** → `Q_RTL_MODE` = **QRTL Always** (3): returns as a drone, lands vertically.
- [ ] **5.** **Flight Modes** → **Flight Mode 1** and **2** = **QStabilize** (17). Was QLand (can't arm there).
- [ ] **6.** **Parameters** → `ARMING_RUDDER` = **ArmOrDisarm** (2): left stick ↓+→ 3 s arms, ↓+← 2 s disarms.
- [ ] **7.** **Parameters** → **Tools** → **Refresh** → **Tools** → **Save to file** → `params_after-switches.params`.

Result: **SWA** down = arm · **SWB** down = return home · **SWC** up QStabilize / middle QHover / down FBWA.

## H. Why the motors didn't spin ([Step 7](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#prearm))

The Pixhawk refuses to arm while a *PreArm* check fails. Read the messages in QGC (**Fly** screen, top bar text).

- [x] `Hardware safety switch` → hold the red button (port **SWITCH**) 3 s until solid. Locks again after every reboot.
- [x] `QLand mode not armable` → Flight Mode 1/2 = QStabilize.
- [x] `QRTL mode not armable` → keep **SWB up** to arm.
- [x] `RC calibrating` → leave the **Radio** page.
- [x] `Battery 1 low voltage failsafe` → plug the LiPo.
- [x] `Compass not calibrated` → calibrated on the bench (part I).
- [x] `Logging failed` → microSD formatted FAT32 (part I).
- [x] `AHRS: not using configured AHRS type` → needs a GPS fix outdoors; bench: `ARMING_SKIPCHK` = 16 (part I).
- ESC beeping while disarmed = normal ("waiting for throttle").

## I. Clear the arming blockers, indoor bench ([Step 8](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#blockers)) ✅ done 2026-10-18

- [ ] **1.** microSD: format **FAT32** on the computer (≤ 32 GB; bigger: exFAT), put it back with the Pixhawk off → `Logging failed` gone.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Sensors** → **Compass** → **OK** → rotate the plane slowly in every direction until **Completed** → **Reboot Vehicle** → keep it still 30 s.
- [ ] **3.** Quality bar yellow = OK for the bench. Redo outdoors, away from metal, for green before the first flight.
- [ ] **4.** Indoors only: **Parameters** → `ARMING_SKIPCHK` → tick only **INS** (16) → **Save**. (`AHRS: not using configured AHRS type` = waiting for a GPS fix.)
- [ ] **5.** Plug the LiPo → low-voltage message gone.
- [ ] **6.** Safety button (port **SWITCH**): blinking = locked, solid = unlocked. Hold 3 s. Locks again after every reboot.
- [ ] **7.** QGC shows **Ready To Fly**.

> ⚠️ **Bench only:** set `ARMING_SKIPCHK` back to **0** before any flight.

## J. ESC calibration ([Step 9](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#esc-cal)) ✅ done 2026-10-18

Why: each ESC learns 1000 µs = stop, 2000 µs = full. Uncalibrated ESCs spin by themselves or seem dead.

- [ ] **1.** Battery **unplugged**, USB only, **props off**.
- [ ] **2.** **Parameters** → `Q_ESC_CAL` = **1** → **Save**.
- [ ] **3.** **Parameters** → `ARMING_SKIPCHK` = **400** (INS 16 + Board voltage 128 + Battery level 256) → **Save**.
- [ ] **4.** SWC **up** (QStabilize). Safety button until **solid**. SWA **down** → **Armed**.
- [ ] **5.** Left stick **full up**. Plug the battery → **2 beeps** (full saved).
- [ ] **6.** Within ~2 s: left stick **full down** → **3 short + 1 long beep** (stop saved).
- [ ] **7.** SWA **up**. Restore: `Q_ESC_CAL` = **0**, `ARMING_SKIPCHK` = **16**.

## K. Modes and tilt explained ([Step 10](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#modes))

| SWC | Mode | Flies as | Front motors |
|---|---|---|---|
| Up | **QStabilize** | Drone | 90° up |
| Middle | **QHover** | Drone | 90° up |
| Down | **FBWA** | Airplane | Tilt forward |

- FBWA on the bench: the switch to airplane mode (transition) starts (`Transition started airspeed 0.0`) but never completes without GPS/airspeed. The tilt follows the throttle (up to `Q_TILT_MAX` 70°) and the tail motor keeps running. Normal (part P). `Q_ASSIST_SPEED` is now **5** (was 10).
- Drone modes, armed: 90° plus small yaw tilts up to ±5° (`Q_TILT_YAW_ANGLE`, was ±10°, part N). Bigger at low throttle (×2), smaller at high (×0.5). Disarmed: still at 90°. Required for yaw.
- [ ] Hand test: armed, QStabilize, low throttle, props off. Turn the nose by hand → front motors tilt opposite each other.

## L. SWB return home ([Step 11](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#swb))

- **SWB down** → QRTL (`Q_RTL_MODE` = 3): climbs to `Q_RTL_ALT` 20 m, flies home as a drone to the arming point, lands vertically, disarms.
- **SWB up** → you take back control.
- Needs a GPS fix (outdoors). Radio-signal loss is separate: it lands where it is (QLand, part M).

## M. Radio failsafe at startup ([Step 12](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#rc-failsafe))

Seen: `Throttle failsafe on`, `RC Short/Long Failsafe: switched to QLand`, `Radio failsafe on`, `QLand mode not armable` = the transmitter was **OFF**.

- [ ] **1.** Transmitter **ON first** (switches up, throttle down), **then** plug the plane.
- [ ] **2.** Receiver light: **solid red** = linked, **blinking** = no link.
- [ ] **3.** At the end: unplug the plane **first**, **then** transmitter off.
- [ ] **4.** If it happened: radio back → `Throttle failsafe off` / `RC Long Failsafe Cleared` → **SWC middle**, then back **up** → QStabilize.

## N. Front tilt servos ([Step 13](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#tilt)) ✅ solved: they worked backwards

Changed earlier, saved in [`params_after-tilt-changes.params`](../backups/params_after-tilt-changes.params): `SERVO9_MAX` 1940 → **1900**, `SERVO10_MIN` 700 → **800**, `SERVO10_MAX` 2100 → **2000**, `Q_TILT_YAW_ANGLE` 10 → **5**, `Q_M_THST_HOVER` 0.479 → **0.37**.

- What the Pixhawk should do (ArduPilot 4.7.2 code): QStabilize/QHover = both tilts **vertical**, only the yaw steering tilt moves them (±`Q_TILT_YAW_ANGLE`, up to ×2 at low throttle). FBWA on the bench = transition never completes; tilt follows throttle up to `Q_TILT_MAX` 70°.
- **Cause (22:40):** both tilt servos worked backwards. QStabilize: "vertical" command (row 9 ≈ 1843, row 10 ≈ 852) but motors pointed forward. FBWA: motors rose toward vertical with throttle.

- [x] **1.** **Q** → **Vehicle Configuration** → **Servo Outputs**.
- [x] **2.** Row **9**: untick **Reversed** (`SERVO9_REVERSED` 1 → 0).
- [x] **3.** Row **10**: tick **Reversed** (`SERVO10_REVERSED` 0 → 1).
- [x] **4.** Check: SWC **up** and **middle** = motors straight up, SWC **down** = forward. ✅ confirmed.
- [ ] **5.** Optional: fine-tune the vertical and forward end points (~10 µs ≈ 1°).
- [ ] **6.** **Parameters** → **Tools** → **Refresh** → **Tools** → **Save to file** → new backup.

Yaw gains back to ArduPilot defaults (old ones far too high), saved in [`params_now.params`](../backups/params_now.params): `Q_A_RAT_YAW_P` 1.2 → **0.18**, `Q_A_RAT_YAW_I` 0.6 → **0.018**, `Q_A_RAT_YAW_D` 0.15 → **0**, FF stays 0.1. Tune later from flight logs.

💾 Backups: [`params_now.params`](../backups/params_now.params) (yaw defaults, valid gyro offsets) → [`params_latest1.params`](../backups/params_latest1.params) (had Manual slots, `Q_ASSIST_SPEED` 5) → [`params_latest2.params`](../backups/params_latest2.params) (slots fixed) = **latest**. Tilt reversal not in a backup yet.

## O. Flight-mode slots fixed ([Step 14](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#fltmodes)) ✅

In `params_latest1.params` Flight Mode 2, 3, 5 had become **Manual** (0), probably by accident. Manual = raw airplane mode, no stabilisation.

- [x] **Q** → **Vehicle Configuration** → **Flight Modes**:

  | Slot | CH6 PWM (µs) | Mode | SWC |
  |---|---|---|---|
  | 1 | 0–1230 | **QStabilize** | Up |
  | 2 | 1231–1360 | **QStabilize** | |
  | 3 | 1361–1490 | **QHover** | |
  | 4 | 1491–1620 | **QHover** | Middle |
  | 5 | 1621–1749 | **FBWA** | |
  | 6 | 1750+ | **FBWA** | Down |

- [x] Verified in `params_latest2.params`: SWC up / middle / down = slots 1 / 4 / 6.

## P. Desk-test behaviours explained ([Step 15](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#desk))

| You see | Why → what to do |
|---|---|
| a. Armed on the desk, one motor high, one almost stopped (rows 5/6/8 = 1835/1150/1664) | The Pixhawk tries to balance a plane that can't move. Normal. Judge motors one at a time later (motor test). |
| b. SWA already up does nothing | Armed by the left stick (`ARMING_RUDDER` = 2). SWA only acts when flipped: down, then up. Planned: `ARMING_RUDDER` → **0** (SWA only), your decision. |
| c. A motor twitches/creeps after disarm | Disarmed = 1000 µs "stop", an ESC can still twitch. Planned: `Q_M_SAFE_DISARM` → **1** (no signal; ESC may beep, harmless; servos unaffected). Pending. |
| d. Tail motor runs in FBWA on the desk | Transition only completes above minimum airspeed (GPS outdoors). Stops in real flight. `Q_ASSIST_SPEED` 10 → **5**. Bench check: disarm in a Q mode, switch to FBWA disarmed, arm in FBWA → tail should stay off. |
| e. Gyro offsets 0 in a backup | Plane moved at startup. Keep still ~15 s until **ArduPilot Ready**. |
| f. `Q_M_THST_HOVER` changes (0.32 → 0.57 → 0.51) | Learned on the desk. Set ≈ **0.37** just before the first hover. |

## Q. Still to do

- [ ] Save a new backup with the tilt fix (part N)
- [ ] Optional: fine-tune tilt end points
- [ ] Bench check: arm in FBWA → tail motor stays off (part P d)
- [ ] Decide `ARMING_RUDDER` = 0 (SWA only)
- [ ] `Q_M_SAFE_DISARM` = 1
- [ ] Motor test, one motor at a time (props off)
- [ ] Spin direction of each motor
- [ ] Redo the compass outdoors for green
- [ ] SWB check outdoors: flight mode shows QRTL
- [ ] `ARMING_SKIPCHK` = 0 before any flight
- [x] Tilt direction fixed (row 9 Reversed off, row 10 on)
- [x] Flight-mode slots fixed → `params_latest2.params`
- [x] Yaw gains at defaults → `params_now.params`

## R. Pre-flight checklist ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` back to **0**
- [ ] `Q_M_THST_HOVER` ≈ **0.37** before the first hover (the Pixhawk relearns it)
- [ ] `Q_ASSIST_SPEED` = **5**
- [ ] Tilts: SWC up = straight up, SWC down = forward
- [ ] Plane still ~15 s after power-up (**ArduPilot Ready**)
- [ ] Compass redone outdoors, **green**
- [ ] Transmitter **on first**, then the plane
- [ ] Safety button **solid**
- [ ] Props on the correct motors
- [ ] SWB tested outdoors (QRTL shown)

## ✅ Done when

- Every surface moves the right way in FBWA.
- Tilt servos point up in QHOVER, forward in FBWA, with no buzzing.
- The Pixhawk arms and all 3 motors spin together (props off).
- You have sent: pin-row photo, ESC plugs 3 or 2 wires, rail option A or B, results.

## Problems

| You see | Do this |
|---|---|
| Nothing moves, Position values change | No 5 V on the rail. Check part D. |
| Position values don't change | Safety button light not solid. Hold it again. |
| One surface goes the wrong way | **Servo Outputs** → tick **Reversed** on that row |
| A tilt servo buzzes at one end | It hits a stop. Leave the limits at 1100–1900 and report which motor and which end. |
| A servo twitches or jumps | Plug upside down? Signal (orange/yellow) must be on top. |
| Servos reset or brown out when moving together | Rail supply too weak. Use a 5–6 V UBEC of 3 A or more. |
| Throttle does nothing | Pixhawk not armed. Read the PreArm message (part H). |
| `QRTL mode not armable` | SWB is down. Put it up. |
| `Logging failed` | Format the microSD FAT32 (part I). |
| `AHRS: not using configured AHRS type` | Outdoors: wait for a GPS fix. Bench: `ARMING_SKIPCHK` = 16 (part I). |
| Motors spin by themselves or one seems dead | ESC calibration (part J). |
| Tilts move / tail motor runs in FBWA on the bench | Transition can't complete on the desk, normal (parts K, P). |
| Front motors wiggle in drone mode when armed | Yaw tilt, normal (part K). |
| `Radio failsafe on`, `QLand mode not armable` at power-up | Transmitter was off. Transmitter on first, then SWC middle → up (part M). |
| Motors point forward in QStabilize, rise in FBWA | Tilt servos backwards: flip **Reversed** on rows 9 and 10 (part N). |
| One motor high, one almost stopped, armed on the desk | Normal balancing (part P). |
| SWA up doesn't disarm | Armed by stick: flip SWA down then up (part P). |
| Flight mode shows Manual | Flight Mode slots wrong (part O). |

---
© 2026 bellocloud.com
