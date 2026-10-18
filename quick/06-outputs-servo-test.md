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

- FBWA on the bench: the tilts move because Q-Assist (`Q_ASSIST_SPEED` = 10 m/s) sees 0 airspeed (`Transition started airspeed 0.0`). Normal.
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

## N. Front tilt servos in drone mode ([Step 13](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#tilt)) ⚠️ open issue

Changed on the vehicle (**Q** → **Vehicle Configuration** → **Parameters**), saved in [`params_after-tilt-changes.params`](../backups/params_after-tilt-changes.params):

| Parameter | Old | New |
|---|---|---|
| `SERVO9_MAX` (front left, reversed) | 1940 | **1900** (MIN 800 unchanged) |
| `SERVO10_MIN` (front right) | 700 | **800** |
| `SERVO10_MAX` (front right) | 2100 | **2000** |
| `Q_TILT_YAW_ANGLE` | 10 | **5** (smaller steering tilt) |
| `Q_M_THST_HOVER` | 0.479 | **0.37** (bench-learned value reset) |

- [x] Disarmed, QStabilize: **Q** → **Vehicle Configuration** → **Servo Outputs** → row 9 = **1847**, row 10 = **857** = the Pixhawk's "vertical" command for both (mirror values). Both motors straight up.
- ~10 µs ≈ 1°. Front left "up" end = `SERVO9_MAX` (reversed). Front right "up" end = `SERVO10_MIN`.
- **Open issue:** armed in drone modes, low throttle → front motors not at 90°; high throttle → back to 90°. Expected: always 90°. Being researched (ArduPilot code + docs); the fix will be added here. Cause not confirmed.
- Known: in QStabilize/QHover the base tilt is commanded vertical (`Q_FWD_THR_USE` = 0). The vectored-yaw tilt is scaled by hover throttle ÷ throttle (×2 low, ×0.5 high): main suspect.

💾 Backup: [`params_after-esc-cal.params`](../backups/params_after-esc-cal.params). `Q_M_THST_HOVER` 0.369 → 0.479 was learned on the bench: watch it before the first hover. Newer backup with the part N changes: [`params_after-tilt-changes.params`](../backups/params_after-tilt-changes.params).

## O. Still to do

- [ ] Throttle test (props off): tail motor and second front motor behave like the others
- [ ] Spin direction of each motor
- [ ] Resolve the tilt-vs-throttle issue (part N)
- [x] Save a new backup after the tilt changes → `params_after-tilt-changes.params`
- [ ] Redo the compass outdoors for green
- [ ] `ARMING_SKIPCHK` = 0 before any flight
- [ ] SWB check outdoors: flight mode shows QRTL

## P. Pre-flight checklist ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` back to **0**
- [ ] `Q_M_THST_HOVER` ≈ **0.37** before the first hover (the Pixhawk relearns it)
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
| Tilts move in FBWA on the bench | Q-Assist, normal (part K). |
| Front motors wiggle in drone mode when armed | Yaw tilt, normal (part K). |
| `Radio failsafe on`, `QLand mode not armable` at power-up | Transmitter was off. Transmitter on first, then SWC middle → up (part M). |
| Front motors not at 90° at low throttle when armed | Open issue, being researched (part N). |

---
© 2026 bellocloud.com
