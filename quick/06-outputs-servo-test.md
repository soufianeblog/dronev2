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

## H. Why the motors don't spin yet ([Step 7](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#prearm))

The Pixhawk refuses to arm while a *PreArm* check fails. Read the messages in QGC (**Fly** screen, top bar text).

- [x] `Hardware safety switch` → hold the red button (port **SWITCH**) 2 s until solid.
- [x] `QLand mode not armable` → Flight Mode 1/2 = QStabilize.
- [x] `QRTL mode not armable` → keep **SWB up** to arm.
- [x] `RC calibrating` → leave the **Radio** page.
- [ ] `Battery 1 low voltage failsafe` → Pixhawk reads < 10.5 V, charger says 12.48 V. Compare with QGC's battery icon.
- [ ] `Compass not calibrated` → outdoors, [Guide 03](03-orientation-calibration.md) part E.
- ESC beeping while disarmed = normal ("waiting for throttle").

## I. Still to do

- [ ] Battery reading matches the charger (12.6 V full)
- [ ] Compass calibration outdoors
- [ ] Arm test: SWA down, then left stick. Motors start slow, stop on disarm
- [ ] Throttle test: all 3 motors together (tail motor MAIN 8 did not spin at first)
- [ ] ESC calibration if needed
- [ ] Spin direction of each motor
- [ ] Tilt servo ends: read **Servo Outputs** in drone and airplane position, adjust `SERVO9`/`SERVO10`
- [ ] SWB down → flight mode shows QRTL

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

---
© 2026 bellocloud.com
