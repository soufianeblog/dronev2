# 06 · Outputs: plug in and test the servos (then the motors)

**English** · [Français](../fr/quick/06-outputs-servo-test.md) · [العربية](../ar/quick/06-outputs-servo-test.md)

[← 04](04-radio-modes-arming.md) · [Index](README.md) · Next: 07 ⏳ · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html)

**Goal:** every servo and ESC on the right output, switches set, every mode tested on the desk.
**You need:** [04](04-radio-modes-arming.md) done. **Propellers OFF** on all 3 motors. LiPo only when a step says so.

**Status now:** ✅ all outputs move · ✅ switches set · ✅ arms on the desk · ✅ ESCs calibrated · ✅ tilts correct in all 3 modes. ⏳ Tail motor keeps running in FBWA on the desk (under investigation) · motor-by-motor test · spin directions · compass again outdoors · SWB test outdoors.
💾 Latest backup: [`params_latest2.params`](../backups/params_latest2.params). The tilt fix (`SERVO9_REVERSED` 0, `SERVO10_REVERSED` 1) is not in it yet: save a new one.

## Where everything plugs in

| Output | Plug in | Range (µs) | Reversed |
|---|---|---|---|
| **MAIN 1** | Left aileron servo | 1100–1900 | off |
| **MAIN 2** | Right aileron servo | 1000–2000 | off |
| **MAIN 3** | Left tail wing servo | 1000–2000 | off |
| **MAIN 4** | Right tail wing servo | 1000–2000 | off |
| **MAIN 5** | ESC, front **right** motor (M1) | 1000–2000 | off |
| **MAIN 6** | ESC, front **left** motor (M2) | 1000–2000 | off |
| MAIN 7 | **Leave empty** | | |
| **MAIN 8** | ESC, tail motor (M4) | 1000–2000 | off |
| **AUX 1** | Tilt servo, front **left** | **800–1900** | **off** |
| **AUX 2** | Tilt servo, front **right** | **800–2000** | **on** |

Left/right = sitting in the plane, looking forward.

## A. Wiring ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#wiring))

- [ ] **1.** Unplug the **USB** and the **LiPo**.
- [ ] **2.** Each plug: **signal (orange/yellow) on top**, red in the middle, **brown/black at the bottom**.
- [ ] **3.** Plug everything as in the table.
- [ ] **4.** ESC red wire only on **MAIN 8** (tail). Pull it out of the MAIN 5 and 6 plugs and tape it.
- [ ] **5.** Servo rail power: tail ESC red wire, **or** PDB **5 V** to a free +/− pair. ⚠️ **Never 12 V.**

## B. Transmitter and switches ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#switches))

| Control | Does |
|---|---|
| **SWA** | Down = arm · up = disarm (only when flipped) |
| **SWB** | Down = return home as a drone (QRTL) · up = back to SWC mode |
| **SWC** | Up = **QStabilize** (drone, direct throttle) · middle = **QHover** (drone, holds height) · down = **FBWA** (airplane with a safety net) |
| Left stick ↓+→ 3 s / ↓+← 2 s | Arm / disarm |

- [ ] **1.** FlySky: hold **OK** → **Functions setup** → **Aux. channels** → **Channel 7** = **SwB** → hold **CANCEL**.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Radio** → *Channel Monitor*: bar 7 moves with SWB. Leave the page.
- [ ] **3.** **Q** → **Vehicle Configuration** → **Flight Modes**: slots 1–2 **QStabilize**, 3–4 **QHover**, 5–6 **FBWA**. No Manual, no QLand.
- [ ] **4.** Same page → *Switch Options* → **Channel option 7** = **RTL**.

## C. Settings to check ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#settings))

**Q** → **Vehicle Configuration** → **Parameters** (wait 30 s after power-up, **Tools** → **Refresh**). Search → click → type → **Save**.

| Parameter | Value | Means |
|---|---|---|
| `RC7_OPTION` | 4 | SWB = return home |
| `Q_RTL_MODE` | 3 | Return home as a drone |
| `FLTMODE1`…`6` | 17, 17, 18, 18, 5, 5 | SWC up / middle / down |
| `ARMING_RUDDER` | 2 | Stick arming on |
| `ARMING_SKIPCHK` | 16 | Skip GPS check indoors. **0 before flight** |
| `Q_ESC_CAL` | 0 | Normal (1 only for ESC calibration) |
| `Q_TILT_YAW_ANGLE` | 5 | Nose-turn tilt (±°) |
| `Q_A_RAT_YAW_P` / `I` / `D` | 0.18 / 0.018 / 0 | Nose-turn gains, ArduPilot defaults |
| `Q_ASSIST_SPEED` | 5 | Drone motors help below this airspeed (m/s) |
| `SERVO9_MIN` / `MAX` / `REVERSED` | 800 / 1900 / **0** | Front left tilt |
| `SERVO10_MIN` / `MAX` / `REVERSED` | 800 / 2000 / **1** | Front right tilt |
| `Q_M_THST_HOVER` | learned (0.51) | Hover throttle. ≈ **0.37** before the first hover |

- [ ] All values match.

## D. Calibrations ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#blockers))

- [ ] **1.** microSD: format **FAT32** (≤ 32 GB; bigger: exFAT), insert with the Pixhawk off.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Sensors** → **Compass** → **OK** → turn the plane every way until **Completed** → **Parameters** → **Tools** → **Reboot Vehicle**. Yellow = OK for the desk; redo outdoors for green.
- [ ] **3.** After every power-up: keep still **15 s** (until **ArduPilot Ready**).
- [ ] **4.** ESC calibration ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#esc-cal)): battery out, USB only, props off → `Q_ESC_CAL` = **1**, `ARMING_SKIPCHK` = **400** → SWC up, safety solid, SWA down (**Armed**) → left stick **full up** → plug battery (**2 beeps**) → within 2 s stick **full down** (**3 short + 1 long**) → SWA up → `Q_ESC_CAL` = **0**, `ARMING_SKIPCHK` = **16**.

## E. Arming checklist ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#arming))

- [ ] **1.** Transmitter **ON first** (switches up, throttle down). Receiver light solid red.
- [ ] **2.** Plug the plane. Keep still **15 s**.
- [ ] **3.** Safety button (port **SWITCH**): hold **3 s** until **solid** (blinking = locked; locks again after every reboot).
- [ ] **4.** QGC shows **Ready To Fly**. SWB up.
- [ ] **5.** SWA **down** → **Armed**.
- [ ] **6.** End: SWA up, unplug the plane first, then transmitter off.

## F. Test each mode, props off ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#modes))

| SWC | Top bar | Front motors | Throttle |
|---|---|---|---|
| Up | QStabilize | Straight up | Direct |
| Middle | QHover | Straight up | Holds height |
| Down | FBWA | Forward | On the desk: tilt follows throttle (up to 70°) |

- [ ] **1.** All 3 rows correct ✅. Wrong tilt way? **Servo Outputs** → flip **Reversed** on rows 9 and 10 (final: 9 off, 10 on).
- [ ] **2.** FBWA: right stick → right = left aileron down, right aileron up. Right stick back = both tail wings up. Left stick → right = right tail wing up, left down.
- [ ] **3.** Wrong surface way? **Servo Outputs** → tick **Reversed** on that row.
- [ ] **4.** Servo Outputs rows: 5, 6, 8 = motors; 9, 10 = tilts. Check the motors with your eyes: up in Q modes, forward in FBWA.

## G. Normal on the desk ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#desk))

| You see | Why |
|---|---|
| Armed: one motor fast, one almost stopped | Balancing a plane that can't move. Normal |
| Front motors tilt more at low throttle | Nose-turn tilt ×2 at low throttle. Normal |
| SWA already up does nothing | Armed by stick. Flip SWA down, then up |
| Motor twitches after disarm | 1000 µs "stop" still sent. Option: `Q_M_SAFE_DISARM` = 1 (pending) |
| Tail motor runs in FBWA | Transition can't finish indoors. ⏳ Under investigation |
| `Q_M_THST_HOVER` changes | Learned on the desk. ≈ 0.37 before the first hover |
| ESCs beep | Waiting for throttle. Normal |

## H. Pre-flight checklist ([details](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` back to **0**
- [ ] `Q_M_THST_HOVER` ≈ **0.37**
- [ ] `Q_ASSIST_SPEED` = **5**
- [ ] New backup with the tilt fix
- [ ] Tilts: SWC up = straight up, SWC down = forward
- [ ] Compass redone outdoors, **green**
- [ ] Transmitter **on first**, then the plane
- [ ] Plane still ~15 s (**ArduPilot Ready**)
- [ ] Safety button **solid**
- [ ] Props on the correct motors
- [ ] SWB tested outdoors (QRTL shown)

## ✅ Done when

- Every surface moves the right way in FBWA.
- Tilts point up in QStabilize/QHover, forward in FBWA.
- The Pixhawk arms and each motor spins the right way (props off).

## Problems

| You see | Do this |
|---|---|
| Nothing moves | No 5 V on the rail (part A) or safety button not solid |
| A servo twitches | Plug upside down: signal on top |
| Throttle does nothing | Not armed: read the PreArm message (**Fly** screen, top bar) |
| `Hardware safety switch` | Hold the safety button 3 s |
| `QLand mode not armable` | Slot 1/2 not QStabilize, or radio failsafe: SWC middle → up |
| `QRTL mode not armable` | SWB up |
| `RC calibrating` | Leave the Radio page |
| `Radio failsafe on` / `Throttle failsafe on` | Transmitter on first, then SWC middle → up |
| `Battery 1 low voltage failsafe` | Plug a charged LiPo |
| `Compass not calibrated` | Part D step 2 |
| `AHRS: not using configured AHRS type` | Outdoors: wait for GPS. Indoors: `ARMING_SKIPCHK` = 16 |
| `Logging failed` | Format the microSD (part D) |
| `Board (4.2v) out of range` | USB only: plug the LiPo |
| Motors spin by themselves / one seems dead | ESC calibration (part D) |
| Motors forward in QStabilize, rise in FBWA | Flip **Reversed** on rows 9 and 10 |
| Flight mode shows Manual | Fix the Flight Mode slots (part B) |

---
© 2026 bellocloud.com
