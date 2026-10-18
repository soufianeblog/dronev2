# 04 · Radio calibration, flight modes, arm switch

**English** · [Français](../fr/quick/04-radio-modes-arming.md) · [العربية](../ar/quick/04-radio-modes-arming.md)

[← 05](05-flysky-i6x.md) · [Index](README.md) · [Next: 06 →](06-outputs-servo-test.md) · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-04_2026-10-17_0345_flysky-switches-and-calibration.html)

**Goal:** the Pixhawk reads the radio. SWC picks the flight mode, SWA arms.
**You need:** [05](05-flysky-i6x.md) done. Transmitter on, all switches **UP**, throttle **DOWN**. USB only.

## A. Check that the Pixhawk sees the radio

- [ ] **Q** → **Vehicle Configuration** → **Radio**. Move the sticks: the **Raw Channel Monitor** dots must move.
  - Dots frozen? Go to [Problems](#problems).

## B. Calibrate

- [ ] **1.** On the Radio page: dropdown **Mode 2**, **Centered Throttle** unticked.
- [ ] **2.** Click **Calibrate** → **OK**.
- [ ] **3.** Throttle down, other sticks centred → **Next**.
- [ ] **4.** QGC asks for one stick move at a time. Push each stick to the end it shows and **hold it**; QGC moves on by itself:
  - throttle up → down
  - yaw right → left
  - roll right → left
  - pitch up → down
- [ ] **5.** *"Move all the transmitter switches…"*: flip every switch and turn both knobs end to end → **Next**.
- [ ] **6.** *"All settings have been captured…"* → **Next** (this saves).
- [ ] **7.** Check:
  - right stick right → the **Roll** bar moves right
  - left stick up → the **Throttle** bar goes up

## C. Flight modes on SWC

**Q** → **Vehicle Configuration** → **Flight Modes**

- [ ] **Flight mode channel:** **Channel 6**
- [ ] Set the 6 modes:

  | Flight Mode | Set to | SWC |
  |---|---|---|
  | 1 | **QLAND** | up |
  | 2 | QLAND | |
  | 3 | QHOVER | |
  | 4 | **QHOVER** | middle |
  | 5 | FBWA | |
  | 6 | **FBWA** | down |

- [ ] **Switch Options:** set **Channel option 6 to 16** all to **Do Nothing**
- [ ] Flip SWC and check which **"Flight Mode N" label turns yellow**: up → 1, middle → 4, down → 6

## D. Arming and GPS

**Parameters** → search each name → change it → **Save**

- [ ] `RC5_OPTION` = **153** (ArmDisarm). Leave it. → **SWA down = arm, up = off**
- [ ] `ARMING_RUDDER` = **Disabled (0)**. No arming with the sticks.
- [ ] `GPS1_TYPE` = **Auto (1)** → **Tools → Reboot Vehicle**

## E. Test

**Q** → **Fly**. Watch the top bar.

- [ ] SWC up / middle / down → the top bar shows **QLand / QHover / FBWA**
- [ ] SWC middle, throttle down, **SWA down** → refused with *"Arm: Hardware safety switch"* (correct on the bench) → **SWA back up**

## F. Back up

- [ ] Refresh → **Tools** → **Save to file…** → `backups/params_after-guide04.params`

## ✅ Done when

- The modes follow SWC.
- SWA tries to arm, and the safety checks refuse.
- *"Radio failsafe on"* is gone from the messages.

## Problems

| You see | Do this |
|---|---|
| Raw Channel Monitor frozen, one channel jitters | PPM encoder + receiver set to PPM. Fix: i6X **Output mode → PWM** ([05](05-flysky-i6x.md), step 15) |
| Calibration: "Next" is grey | Normal. Hold the stick at the end; QGC continues by itself. |
| *"Throttle channel reversed"* | i6X **Reverse → Ch3 → Rev**, then calibrate again |
| "Channel option 6" also turns yellow | Normal. It only means channel 6 is high. It does nothing while set to Do Nothing. |
| Bench messages: No GPS lock, Battery low, Safety switch | Expected indoors on USB |

---
© 2026 bellocloud.com
