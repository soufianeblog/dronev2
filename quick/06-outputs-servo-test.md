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
- [ ] **4.** Leave the ESC plugs **out** for now.
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
- [ ] **3.** Press and hold the **safety button** until its light is **solid** (this does not arm).
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

## ✅ Done when

- Every surface moves the right way in FBWA.
- Tilt servos point up in QHOVER, forward in FBWA, with no buzzing.
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

---
© 2026 bellocloud.com
