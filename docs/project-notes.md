# Project notes (working file)

**English** · [Français](../fr/docs/project-notes.md) · [العربية](../ar/docs/project-notes.md)

Internal notes for this project: how we work, verified facts, the full progress log and open questions.
The public overview is the [README](../README.md).

**Contents:** [Working rules](#working-rules) · [Known facts](#known-facts-verified-on-the-real-hardware) · [Roadmap](#roadmap-planned-guides-may-change-as-we-learn) · [Progress log](#progress-log) · [Open questions](#open-questions)

## Firmware targets

- **ArduPilot ArduPlane**: already used on this project before (with Mission Planner). Not ArduCopter, not PX4.
- **"QuadPlane"** is ArduPlane's name for its **VTOL feature**. It does **not** mean 4 motors. It adds vertical takeoff and landing with lift motors in any layout, including **tricopter** and **tilt-rotor**.
- Our configuration is a **tilt-rotor tricopter QuadPlane**. Target values below; they get set in later guides:

| Parameter | Target | Meaning |
|---|---|---|
| `Q_ENABLE` | 1 | Turn on VTOL (QuadPlane) |
| `Q_FRAME_CLASS` | 7 | Tricopter (3 lift motors) |
| `Q_TILT_ENABLE` | 1 | Some motors tilt |
| `Q_TILT_MASK` | 3 | Motors 1 + 2 (the two front motors) tilt |
| `Q_TILT_TYPE` | **2 = VectoredYaw** ✅ (set) | Left and right tilt servos move separately to control yaw |

## Software

- ~~Mission Planner 1.3.83~~ — **dropped** (it was used before to set up ArduPlane)
- **QGroundControl 5.1.5 on macOS** — starting from scratch
- **Firmware:** **ArduPlane 4.7.2** (git fb773567), updated in Guide 02 with the old parameters kept.

## Current state (as of 2026-10-17)

- Plugged into the Pixhawk (photos 2026-10-17 02:17): **USB, POWER (power module), GPS + I2C (M8N GPS with compass), BUZZER, SWITCH (safety switch), RC IN** → **FlySky iA10B receiver** via a **PPM encoder** board (confirmed 19:27; i6X Output mode PWM). **MAIN/AUX outputs are empty** (no ESCs or servos yet). The board is flat, LEDs up, on a test plate.
- The aircraft has **never flown** with the old setup.
- QGroundControl is installed and opens. Preferences are set to Firmware = ArduPilot, Vehicle = VTOL, metric units.
- The FlySky i6X was set up using [this video](https://www.youtube.com/watch?v=nyLM1hCG9Q8).
- **Main problem:** we don't know how to wire everything to the Pixhawk correctly.

## Goals

1. Configure QGroundControl correctly.
2. Choose, install and verify the **correct firmware** for this airframe.
3. Know how to **wire everything** (power, ESCs, servos, receiver, GPS, buzzer, safety switch).
4. Wire up the **FlySky i6X / iA10B**, calibrate it and test it.
5. Understand the Pixhawk's **connections** (USB to the Mac, telemetry, ports).
6. Get a working setup through calibration, modes, the drone-to-airplane transition and failsafes, then bench tests and a first hover.

---

## Working rules

### 1. One step at a time, one HTML guide per step
- Each step is a **separate HTML file** in `guides/`.
- File name: `guide-NN_YYYY-MM-DD_HHMM_short-topic.html` (for example `guide-01_2026-10-17_0113_connect-and-check-arduplane.html`). If a guide is revised, it keeps its number and shows a **Rev N** date/time.
- Each guide shows its **guide number** and **creation date/time** at the top.
- Open a guide by double-clicking it (it opens in Safari or Chrome). Guides work offline.

### 2. You do the work, the guides explain
- The guides **never change your hardware, firmware or parameters automatically**: no scripts, no MAVLink connection, no closing QGC. Every change is written as an instruction and you carry it out (confirmed by the user 2026-10-17).
- Each guide ends with a **"Report back"** section listing exactly what to send.
- **Prefer files over questions:** the live Pixhawk can only be read through QGC, so instead of single values we use a **parameter file** (Parameters → Tools → Save to file → `backups/`) plus the **Vehicle Messages**, and reads everything from those.
- The next guide is written **only after** you report back, so each guide builds on what actually happened.

### 3. Facts first
- Instructions are based on **official documentation** (ardupilot.org, docs.qgroundcontrol.com, FlySky manuals) and cross-checked with community sources (ArduPilot forum, RCGroups) when needed.
- Each guide has a **Sources** section with links.
- When something is uncertain (for example clone-board differences), the guide says so and includes a check to confirm it.

### 4. Safety is non-negotiable
- **Propellers OFF** for all setup and bench testing until the guide that says otherwise.
- **No LiPo plugged in** unless the guide asks for it.
- Each guide starts with a short safety box.

### 4b. Plain words: every action is spelled out
- Every guide gives the **exact click path** (e.g. *Q icon → Vehicle Configuration → Sensors → Accelerometer*). No step says only "go to X".
- **Reboot** always means *restart the Pixhawk*: the **Reboot Vehicle** button (Sensors page, or Parameters → Tools → Reboot Vehicle), or unplug/replug the USB, then 30 s without moving the plane. Each guide links to this explanation.

### 5. Guide format
1. Header: guide number, date/time, goal of the step, estimated time
2. Safety box
3. What you need (parts and tools)
4. Numbered steps, with expected result after each step ("you should see…")
5. Troubleshooting ("if you see X, do Y")
6. Report back checklist
7. Sources

### 6. Project memory: always kept up to date
- **Every time you report something** (a screenshot, messages, a value, a correction), the project files are updated: **both**:
  1. **This notes file** (`docs/project-notes.md`): the **Known facts** table, the **Roadmap** status, the **Progress log** (with date/time), and **Open questions**. The public [README](../README.md) keeps only the overview and the status table.
  2. **The current guide**: a new **Rev N** with date/time, a status pill (which steps are done), a ✅ box on finished steps, a **Results** section explaining what was found, and the **Report back** list (done items crossed out, new questions added).
- Guides that walk through device menus keep a **settings log table** (setting → result → changed? → what it means), updated after every step.
- Mistakes in earlier guide text are **corrected openly** (marked "Correction"), never silently removed.
- This notes file is the **single source of truth** for facts and history. The README is the clean public overview. Guides hold the detailed step-by-step results, and `quick/` holds the short task lists.
- Screenshots and logs you share go in `guides/guideN_screenshots/` (results for guide N), renamed to `what_YYYY-MM-DD_HHMM.png`. Pasted text logs are saved there as `.txt`.

---

## Known facts (verified on the real hardware)

| Item | Value | Source / when |
|---|---|---|
| Firmware | **ArduPlane V4.7.2** (fb773567), ChibiOS d103983f (was 4.7.1 dbe79216) | Boot messages, 2026-10-17 02:44 |
| Latest stable | **ArduPlane 4.7.2**, git `fb773567` = installed ✅ | QGC popup + ArduPilot server check, 02:25 |
| Board target | **`Pixhawk1`**: full 2 MB build, **no 1 MB flash limit** | Boot msg `Pixhawk1 00200035 3238510A 32373737` |
| IO processor | Working (`IOMCU: 420 1001 411FC231`), drives MAIN OUT | Boot messages |
| Outputs | `RCOut: PWM:1-14`: MAIN 1–8 + AUX 1–6 all PWM | Boot messages |
| VTOL | QuadPlane **on**, Frame **TRI** (`Q_ENABLE=1`, `Q_FRAME_CLASS=7`), left over from the old setup | `QuadPlane initialised, Frame: TRI` |
| Tilt config | `Q_TILT_ENABLE=1`, `Q_TILT_MASK=3`, `Q_TILT_TYPE=2` (**VectoredYaw**), `Q_TILT_YAW_ANGLE=10`, `Q_TILT_MAX=70`, rate up/down 80/25 °/s, `Q_TILT_FIX_ANGLE=10`, `Q_TILT_FIX_GAIN=0.6` | Params, 02:01 |
| Tail | **V-tail behaviour confirmed** (pitch = together, yaw = opposite) = `SERVO3=VTailLeft`, `SERVO4=VTailRight` ✅ | Params 02:02 + user 19:46 |
| Board orientation | ✅ `AHRS_ORIENTATION=0` (arrow → nose), changed from the old 2 (Yaw90) in Guide 03; accel + level calibrated | Backups 03:32 → 20:34 |
| Flight modes | ✅ `FLTMODE_CH=6` (SWC): QLAND · QLAND · QHOVER · QHOVER · FBWA · FBWA | Guide 04 E, 20:17 |
| RC input (live) | ✅ **Working** (19:3x): sticks + switches move the QGC Raw Channel Monitor. Path: iA10B (i6X Output mode **PWM**) → **PPM encoder board** (PWM → PPM) → Pixhawk **RC IN** (`decoding PPM`, 8 ch) | Guide 04 C5, 19:32 |
| Receiver (old) | ⚠️ `SERIAL2_PROTOCOL=23` (RC input on TELEM2), but **TELEM2 is empty**, so it's a leftover. Real wiring: receiver → **PPM encoder (confirmed, photo 19:27)** → **RC IN**. `RC_PROTOCOLS=1` (all) | Backup file + photo |
| RC switches | `RC5_OPTION=153` arm/disarm, ~~`RC6_OPTION=4` RTL~~ → 0 (20:25), RC9–16 options cleared, `ARMING_RUDDER=0` (20:28) | Backup file |
| Battery monitor | `BATT_MONITOR=4` (analog power module), 3000 mAh, `BATT_LOW_VOLT=10.5` → RTL | Backup file |
| Safety switch | `BRD_SAFETY_DEFLT=1` (required) | Backup file |
| Compasses | Primary `466441` = **external** (`COMPASS_EXTERNAL=1`, `COMPASS_ORIENT=0` None), the M8N on I2C; second `131594` internal, **disabled** (`COMPASS_USE2=0`, `USE3=0`) | Backup 4.7.2 |
| Backups | `backups/params-backup_2026-10-17_before-guide02.params` (1,276 params, 4.7.1) · `backups/params_after-guide02_4.7.2.params` (1,430, 4.7.2) · `backups/params_after-radio-cal_full.params` (1,430, after radio cal + GPS on) · **`backups/params_after-guide04.params` (1,430, after Guide 04) = current reference** | 02:10 / 02:47 |

### Output map (old setup; Pixhawk MAIN 1–8 = SERVO1–8, AUX 1–6 = SERVO9–14)

| Pin | Function | Connects to | Range (µs) |
|---|---|---|---|
| MAIN 1 | Aileron | Aileron servo | 1100–1900 |
| MAIN 2 | Aileron | Aileron servo | 1000–2000 (⚠️ differs from MAIN 1) |
| MAIN 3 | VTailLeft | Left tail wing servo | 1000–2000 |
| MAIN 4 | VTailRight | Right tail wing servo | 1000–2000 |
| MAIN 5 | Motor1 | ESC, **front right** motor | 1000–2000 |
| MAIN 6 | Motor2 | ESC, **front left** motor | 1000–2000 |
| MAIN 7 | — | empty | |
| MAIN 8 | Motor4 | ESC, **tail** motor | 1000–2000 |
| AUX 1 | TiltMotorFrontLeft | Tilt servo, front left | 800–1940, **reversed** |
| AUX 2 | TiltMotorFrontRight | Tilt servo, front right | 700–2100 (⚠️ wide, check for strain) |
| AUX 3–6 | — | empty | |
| GPS | **M8N GPS module with compass**: u-blox detected (HW 00070000, SW 1.00). GPS port + I2C port. "Bad fix" because indoors. | Boot messages + user + photo 02:17 |
| Compass | MAG0 (external M8N) in use, **not calibrated** (PreArm). Calibrate outdoors **after wiring** (Guide 06+) | PreArm 20:07 |
| Airspeed sensor | **None** (`No airspeed sensor`) | Boot messages |
| Sensors | Gyro, accel, magnetometer, baro, logging: **Normal** | Sensor Status, 01:50 |
| QGroundControl | **5.1.5** (macOS); the Parameters screen is under Q icon → Vehicle Configuration | User 02:17 |
| Ports in use | USB, POWER, GPS, I2C, BUZZER, SWITCH, RC IN (via PPM encoder, confirmed). TELEM1/2, SERIAL4/5, SPKT, CAN, MAIN, AUX: empty | Photos 02:17 |
| Mounting | **Installed in the plane** ✅, flat, LEDs up, arrow → nose (`AHRS_ORIENTATION=0`) | User 02:17 / 03:16, Guide 03 |
| Flight history | **Never flown**: old params are untested | User 02:17 |
| USB link (Mac) | **Stable** after replug, QGC shows "Not Ready" | Guide 01 step 3c, 01:47 |
| RC failsafe action | Switches to **QLAND** when there's no radio, which is correct | Boot messages |
| Watch item | `PreArm: Gyros inconsistent` seen **once** just after boot, then gone | 01:47:35 |

### Current PreArm errors (expected; nothing is wired or calibrated yet)

| PreArm | Cause now | Fixed in |
|---|---|---|
| Hardware safety switch | Safety button not pressed (it's plugged into SWITCH) | Press before arming (later guide) |
| Compass not calibrated | No fresh calibration | Outdoors, after wiring |
| GPS 1: Bad fix | Indoors | Outdoors |
| AHRS: not using configured AHRS type | EKF3 waits for GPS fix + compass (DCM fallback active) | Outdoors, after compass cal |
| Battery 1 low voltage failsafe | USB power only (~0 V on battery monitor) | LiPo connected (Guide 06+) |
| ~~Radio failsafe on~~ | ✅ Gone (20:07): radio fixed + calibrated | done |
| QLand mode not armable | Side effect of the radio failsafe / QLAND can't be armed by design | Guide 04 |

---

## Roadmap (planned guides; may change as we learn)

| # | Guide | Status |
|---|-------|--------|
| 01 | Connect via USB, confirm ArduPlane + QuadPlane TRI, get a stable link, read leftover Q_ params, back up the parameters | ✅ Complete (rev 8, 02:20) |
| 02 | Update to ArduPlane 4.7.2 (**`Pixhawk1`** build) **keeping the parameters**, verify, new backup | ✅ Complete (rev 7, 03:09) |
| 03 | Mount check + board orientation (`AHRS_ORIENTATION`), accelerometer + level calibration, compass (outdoors) | 🟡 A ✅ B ✅ D ✅ · C + compass confirm via param file (Guide 04 Part 0) |
| 04 | **FlySky i6X**: SWA arm switch, SWC modes (QLand/QHover/FBWA on CH6), standard sticks, radio calibration, cleanup + drawings | ✅ Complete (20:34) |
| 05 | **FlySky i6X transmitter setup** (official manual; fw 1.0 2022): mixing off, SwA→CH5, SwC→CH6, Display test; Output mode **PWM** (encoder kept) | ✅ Complete (rev 4) |
| 06 | Wiring plan: full diagram (power module → PDB → ESCs, servo rail power, MAIN/AUX output map) | ⏳ |
| 07 | Radio failsafe (transmitter off / out of range), receiver + encoder behaviour on signal loss | ⏳ |
| 08 | Output setup: motors, tilt servos, control surfaces, directions and endpoints (props off); MAIN 7 / SERVO7=39 review | ⏳ |
| 09 | ESC calibration and motor spin direction check (props off) | ⏳ |
| 10 | Tilt transition bench test, battery failsafe, geofence | ⏳ |
| 11 | Pre-flight checklist, tethered hover test, PID tuning basics | ⏳ |

## Progress log

- **2026-10-17 01:13** — Spec renamed to README.md and working rules added. Guide 01 written.
- **2026-10-17 01:36** — Confirmed: the project uses **ArduPlane** (previously set up with Mission Planner). Added a QuadPlane explanation, target Q_ parameters, a phase table and a servo roles table. Guide 01 rev 2: confirm ArduPlane, read leftover Q_ params, back up the parameters.
- **2026-10-17 01:39** — Corrected the airframe: the tail has **2 small tail wings, each with its own servo** (left and right). Updated the README diagram and servo table, and the Guide 01 diagram (rev 3).
- **2026-10-17 01:44** — Guide 01 step 3 result (screenshots in `guides/guide1_screenshots/`): Vehicle Messages show **"QuadPlane initialised, Frame: TRI"**, which confirms **ArduPlane**, `Q_ENABLE = 1` and `Q_FRAME_CLASS = 7` already set from the old setup. The QGC top bar showed **"Comms Lost"**, so the USB link needs checking (step 3c). Guide 01 rev 4 rewrote step 3.
- **2026-10-17 01:53** — Step 3c done: after replugging, the link is **stable ("Not Ready")**. With QGC open during boot, the boot banner **did** appear: **ArduPlane V4.7.1, board `Pixhawk1`** (full 2 MB build, no 1 MB issue), IOMCU OK, PWM on outputs 1–14, no airspeed sensor, **u-blox GPS detected** (unexpected, since "nothing wired"). The 7 PreArm errors are all expected at this stage (see the table above). Sensor Status: core sensors Normal. **Correction:** rev 4 wrongly said QGC never shows the banner; it shows it when QGC is open during boot. Guide 01 rev 5 adds a Results section. Logs in `guides/guide1_screenshots/`.
- **2026-10-17 01:55** — While opening Parameters, QGC showed the popup **"Parameters are missing from firmware: FS_OPTIONS, FS_GCS_TIMEOUT, FS_GCS_ENABLE"** (`guides/guide1_screenshots/missing-params-popup_2026-10-17_0153.png`). These are ArduCopter-style names; ArduPlane uses e.g. `FS_GCS_ENABL`. It's a **harmless QGC ↔ ArduPlane naming mismatch**: click Ok. The user couldn't find the Parameters screen, so Guide 01 rev 6 rewrote step 4 with the exact path for newer QGC: **purple Q icon → Select Tool → Vehicle Configuration → scroll the left list to the bottom → Parameters** (it's called "Vehicle Configuration", not "Vehicle Setup").
- **2026-10-17 02:00** — The user reached **Vehicle Configuration → Parameters** ✅. Now on step 4c: search `Q_TILT` and `_FUNCTION` and screenshot both, then step 5 (Tools → Save to file).
- **2026-10-17 02:11** — Steps 4–5 done. Screenshots of `Q_TILT`, `_FUNCTION`, `Q_ENABLE` and `Q_FRAME_CLASS` (`guides/guide1_screenshots/params-*.png`), and the backup saved, then moved to `backups/`. **The old setup is a complete, coherent Y3 config:** Tri + VectoredYaw tilt on motors 1+2, V-tail, ailerons, 3 ESCs and 2 tilt servos all mapped (see the Output map above). Also found: board orientation Yaw90, flight modes on CH8, RC input on TELEM2 (SERIAL2=23), battery monitor set for 3S 3000 mAh, safety switch required. **Recommendation for Guide 02:** keep the parameters, update to 4.7.2, and verify each item in Guides 03–07. Guide 01 rev 7.

- **2026-10-17 02:20** — Guide 01 step 6 answers: board flat, LEDs up; **never flown**; decision **keep and fix the current params**; QGC **5.1.5**; **M8N GPS with compass** plugged in (GPS + I2C). Photos (`guides/guide1_screenshots/board-*.jpg`) show USB, POWER, GPS, I2C, BUZZER, SWITCH and RC IN in use, via a small board (probable **PPM encoder**) to the receiver; TELEM2 is empty, so `SERIAL2_PROTOCOL=23` is a leftover. **Guide 01 complete (rev 8).** Checked the ArduPilot server: `Plane/stable/Pixhawk1` = **4.7.2** (built 2026-10-13). **Guide 02 written:** update to 4.7.2 keeping the params, verify, save a new backup.

- **2026-10-17 02:25** — The user asked whether it's really 4.7.2. **Verified on the ArduPilot server:** `Plane/stable/Pixhawk1/firmware-version.txt` = `4.7.2-FIRMWARE_VERSION_TYPE_OFFICIAL`; git `fb773567` "Plane: version to 4.7.2" (2026-10-11); `.apj` header = Pixhawk1, board_id 9, 1.56/2.08 MB; folders stable-4.7.0/4.7.1/4.7.2 exist. Installed build is `dbe79216` (4.7.1), so after the update the boot message must read **V4.7.2 (fb773567)**. Guide 02 rev 2.

- **2026-10-17 02:27** — The user confirmed that **RC IN connects to the FlySky iA10B 10CH receiver** (the part with the antennas). Still to confirm in Guide 05: the receiver's output mode (PPM or i-BUS) and whether the small black board is part of that link. Next action: **do Guide 02**.

- **2026-10-17 02:33** — Guide 02 step 1: the user opened the Firmware page (QGC 5.1.5 shows dropdown `Pixhawk1 [ArduPilot ChibiOS]` + **Flash** button; screenshot in `guides/guide2_screenshots/`). Rev 2 described an older QGC flow, so I **corrected it from the QGC v5.1.5 source** (`FirmwareUpgrade.qml`): click **Flash** → unplug/replug → **Firmware Setup** popup → ArduPilot / ChibiOS / **vehicle type defaults to Multi-Rotor and must be changed to Plane** / board list must be **`Pixhawk1 - 4.7.2`** (the manifest also lists -1M, -bdshot, fmuv2/3, Cube… for board ID 9). Guide 02 rev 3.

- **2026-10-17 02:37** — Guide 02 step 2: clicked **Flash**. The log showed `Found device: ArduPilot ChibiOS (cu.usbmodem101)`. That's the **first detection of the board still running ArduPlane**, which is normal (QGC 5.1.5 source: the bootloader is only contacted on the second detection after the replug). No "Device disconnected" line yet, so the user still needs to unplug and replug. Mac USB port = `/dev/cu.usbmodem101`. Guide 02 rev 4.

- **2026-10-17 02:39** — **Firmware flashed ✅.** Popup: ArduPilot / ChibiOS / **Plane** / **Pixhawk1 - 4.7.2** (QGC preselected correctly; list also showed CubePurple, Pixhawk1-1M(-bdshot), Pixhawk1-bdshot, CubeBlack, mRo X2.1, fmuv3, CUAV-Pixhack-v3). Bootloader: version 5, **Board ID 255** (unusual; the file is for ID 9, but the flash was accepted and verified), flash size 2080768. Log: downloaded `Plane/stable/Pixhawk1/arduplane.apj` → erase → program → verify → reboot. "Missing parameter_xml_size/airframe_xml_size key" = harmless (PX4-only keys). After the reboot QGC showed **"Vehicle did not return the full parameter list"** while the board was still booting (INS calibration), so the fix is a clean unplug/replug and a 30 s wait (step 5b). Not yet confirmed: V4.7.2 boot message + params intact (steps 6–7). Guide 02 rev 5.

- **2026-10-17 03:01** — **ArduPlane 4.7.2 confirmed:** boot shows `ArduPlane V4.7.2 (fb773567)`, `Pixhawk1`, `QuadPlane initialised, Frame: TRI`. Key params unchanged (Q_TILT_TYPE VectoredYaw, Q_FRAME_CLASS Tri, SERVO9=75, SERVO3=79, AHRS_ORIENTATION=2). New backup `backups/params_after-guide02_4.7.2.params`. **Full diff:** 0 params lost; 1,276 → 1,430 (+154: Q_A_*, Q_P_*, Q_M_*, Q_LOIT_*, Q_WP_*, Q_WVANE_*, GPS1_* groups, all default; unclear why the old backup lacked them); **SERVO7_FUNCTION 0 → 39** (Tri tail-yaw servo, auto-assigned; MAIN 7 must stay empty with VectoredYaw); GPS1_TYPE 0 → 1; RC1–4_DZ 0 → 30; EK3_CHECK_SCALE 150 → 100; BRD_SD_SLOWDOWN 1 → 2. **New issue:** `PreArm: Internal errors 0x100000 l:1375 flow_of_ctrl`, decoded from source = `AP_HAL_ChibiOS/RCOutput.cpp:1375` `RCOutput::push()` called without `cork()` (output-driver sequencing check, not hardware). Not present on 4.7.1; no output-related Plane code changed 4.7.1→4.7.2, so likely config-related (SERVO7=39 is a hypothesis). It **blocks arming**. Next: Guide 02 step 8 (clean reboot: does it come back?). Guide 02 rev 6.

- **2026-10-17 03:09** — Guide 02 step 8: clean reboot, **no internal error** (03:04 boot + 6 PreArm cycles). Conclusion: a one-time event on the first boot after flashing (same boot that auto-set SERVO7=39 and created the new Q_ params; trigger not proven). Watch item only. **Bonus:** `Debug: RCInput: decoding PPM (IOMCU)`, so the Pixhawk receives **PPM on RC IN** (receiver path works electrically; "Radio failsafe on" still to solve in Guide 05). **Guide 02 complete (rev 7).** Guide 03 written: mount/orientation + accelerometer + level (+ compass outdoors).

- **2026-10-17 03:16** — Guide 03 answers: **A: Pixhawk is mounted in the plane.** B: the user says the horizon looks correct with the plane resting. That doesn't test the yaw orientation (a flat plane looks level at any yaw setting), so a **tilt test** was added (nose down must show pitch, not roll), plus questions: current `AHRS_ORIENTATION` value and arrow direction. C/D: the user didn't know where Accelerometer is or what "restart" means, so I added a **"Reboot" explanation box** (reboot = restart the Pixhawk: Sensors page "Reboot Vehicle" button, or Parameters → Tools → Reboot Vehicle, or unplug/replug USB; wait 30 s still) and exact click paths (Vehicle Configuration → Sensors → Accelerometer = first button). Correction: the Gyro button is hidden for planes in QGC 5.1.5. E: the user thinks the compass works, but "working" ≠ "calibrated", so check whether `PreArm: Compass not calibrated` is gone. Guide 03 rev 2.

- **2026-10-17 03:21** — Guide 03: **B ✅** The user changed `AHRS_ORIENTATION` and says tilting both axes moves the horizon correctly (exact value to be confirmed from the step F param file). **E:** the heading matches the phone compass (good sign); whether ArduPilot counts it as calibrated gets checked in the step F file and messages. The user asked whether "restart" means the app: **no, only the Pixhawk** (Reboot Vehicle button or unplug/replug USB). New rule: **ask for a param file + messages instead of asking for individual values** (step F added). Next: C (accelerometer) → reboot → D (level) → reboot → F (save `backups/params_after-guide03.params` + messages). Guide 03 rev 3.

- **2026-10-17 03:27** — The user asked what "level" means for Level Horizon. Answer: the plane normally on a flat table if it sits flat, with wings level left/right and fuselage horizontal front/back (shim the low end if the landing gear tilts it; check with a phone level app, ~0° ±1–2°). Added to Guide 03 Part D.

- **2026-10-17 03:28** — Guide 03 Part D: **Level Horizon "Successfully completed"** ✅. Next: reboot the Pixhawk, then Part F (param file + messages) to confirm the accelerometer (C), orientation and compass.

- **2026-10-17 03:33** — The user asked whether the old 4.7.1 settings carried over to 4.7.2. Answer: yes, confirmed by the full backup diff at 03:01 (0 lost, all Y3 settings identical; see Guide 02 Results). Changes since then are intentional (Guide 03 orientation + calibrations).

- **2026-10-17 03:46** — The user asked to do the FlySky radio next, so **Guide 04 = FlySky** (wiring moves to Guide 05). The user's control plan, mapped to ArduPlane: **SWA = arm/disarm** (`RC5_OPTION=153`, already set; low = immediate disarm, so in the air it's a kill switch); **SWC = flight modes on CH6**: up QLAND ("idle": lands safely + auto-disarms; can't arm in it) / middle QHOVER (drone, 3 motors) / down FBWA (airplane, tail motor stops after the transition); `FLTMODE_CH` 8 → 6, slots 1–2 QLand, 3–4 QHover, 5–6 FBWA (SWC ≈1000/1500/2000 → slots 1/4/6); `RC6_OPTION` RTL → 0. **Left stick = throttle.** The user wanted roll on the **VrB knob** and yaw on the right stick: **strongly advised against** (a knob doesn't self-centre; roll is the most-corrected axis); the guide uses **standard Mode 2** (left stick L/R yaw, right stick L/R roll), pending the user's decision. Cleanup: RC9/10/12/13/14/16_OPTION → 0 (RC16=154 was a second arm switch), `ARMING_RUDDER` 2 → 0. The user also wants **SWD to enable/disable the tail servos**: **advised against** (V-tail = only pitch/yaw control in airplane mode; no standard ArduPlane option); asked for the underlying goal. Clarified: V-tail does pitch + yaw, ailerons do roll; in hover the motors do roll/pitch and the tilt servos do yaw.

- **2026-10-17 03:53** — **Radio plan decided:** standard Mode 2 sticks (the user agreed: no roll on VrB). Wing + V-tail servos are active only in airplane mode, which ArduPlane 4.7.2 does automatically (VTOL modes scale surface movement to ~0 at low airspeed, `ArduPlane/Attitude.cpp`), so **no SWD switch**; SWB/SWD/VrA/VrB unused. The user asked me to implement changes; I started preparing a MAVLink tool, then the user decided: **no programmatic changes, guide only**. Nothing was written to the board (the tool was only installed in the scratch folder and has been removed). Guide 04 rev 2: drawings of the controller, drone mode and airplane mode; decisions recorded; the user applies Parts 0 → H.

- **2026-10-17 03:56** — The i6X beeped at power-on. That's FlySky's startup safety warning: all switches must be UP and throttle (left stick) fully DOWN. Added to Guide 04 Part B1.

- **2026-10-17 04:03** — Guide 04 Part C: the iA10B is on RC IN with a **solid red LED** (bound), but the QGC Radio bars **don't move**, and in Calibrate step 2 Next is grey. That's by design: QGC waits to detect stick movement (QGC 5.1.5 source), so **stick data isn't reaching the Pixhawk** even though boot said `decoding PPM`. Added check C2: MAVLink Inspector RC_CHANNELS, i6X RX setup → Output mode photo, photo of receiver sockets (direct vs small black board / PPM encoder?).

- **2026-10-17 04:03** — Radio screenshot: the **Raw Channel Monitor shows channels 1–8 with values** (1/2/4 centred, 3 low = throttle down, 5–8 mid; 9–18 empty = PPM 8 ch), so the **receiver → Pixhawk link works**. Stuck because (1) the calibration mode box was **Mode 1** (throttle on the right stick) while the i6X is **Mode 2**, and (2) on stick steps Next is grey by design: QGC advances when it detects the stick held at the end. Fix: Cancel → Mode 2 → Calibrate → push the left stick fully up and hold. C2 checks only if no raw dot moves. Note: ch5/ch6 ≈ middle suggests the i6X still has its default VrA/VrB on CH5/6, so Part B1 (SwA/SwC) is still needed.

- **2026-10-17 04:07** — The user tried calibration Modes 1–4: **raw channel dots don't move**. So the Pixhawk gets PPM with **frozen default values** (centre/throttle-low pattern): a PPM signal is present but doesn't carry the sticks. Likely the i6X output mode is PWM, and/or the path goes through the small black board (PPM encoder) with no valid input. Guide 04 **C3**: check the LED (TX off = blink, on = solid), photo the wiring, set i6X **RX setup → Output mode → PPM**, connect the iA10B **PPM/CH1** socket **directly** to Pixhawk RC IN (−/+/S matched, board out of the path), reboot, test.

- **2026-10-17 04:10** — The user says the receiver LED is solid (state with TX off still to confirm) and asked how to check PPM vs PWM on the i6X. Added the exact path to Guide 04 C3: hold OK → System setup → RX setup → Output mode → PPM (top line) → hold CANCEL to save. Receiver must be powered (Pixhawk USB) and TX on. Choose **PPM** (direct PPM/CH1 → RC IN).

- **2026-10-17 04:16** — Output mode bottom line (Serial i-BUS / S.BUS): leave **i-BUS** (default). It only drives the receiver's serial socket, which isn't used; it doesn't affect PPM on PPM/CH1.

- **2026-10-17 04:21** — Calibration stuck at "Move the Yaw stick right": raw ch4 stays centred while the stick is held right; ch3 still low. The throttle QGC "mapped" was a jittering channel, not the real stick. Told the user to **Cancel** (nothing saved). The sticks still aren't reaching the Pixhawk, so finish C3 first. Pending: was PPM saved, cable from PPM/CH1 direct, USB replugged? LED with TX off? Photos of the receiver + Output mode screen.

- **2026-10-17 04:26** — Answers: PPM saved, cable direct from PPM/CH1, USB replugged; **receiver LED solid even with TX OFF**; in QGC only roll jitters randomly. Diagnosis: **probably no real radio link** (receiver not bound to this i6X/model). Guide 04 **C4**: check the i6X main screen for the RX voltage (telemetry = linked), then **rebind** (bind plug in B/VCC → LED fast flash → hold BIND while powering the i6X → remove plug → power cycle), re-check Output mode = PPM, test the raw dots.

- **2026-10-17 04:28** — Correction: with TX off the receiver LED **blinks**, so it **is bound**; C4 (rebind) skipped. New diagnosis: the **small black board = PPM encoder is inline** between receiver and RC IN. With the receiver in PPM mode, the encoder gets no valid PWM inputs and outputs its defaults (throttle low, rest centred = the frozen pattern), and its input 1 sees the PPM pulse train as jitter (= random "roll"). Fix C5-A (recommended): remove the encoder, servo lead from iA10B PPM/CH1 → RC IN, keep PPM. Option B: Output mode PWM + receiver CH1–CH8 into the encoder. Photo requested to confirm.

- **2026-10-17 14:21** — The user gave the i6X versions: **firmware 1.0 (09-Feb-2022), hardware V1.0**. Read the **official FS-i6X Instruction Manual** and wrote **Guide 05: i6X transmitter setup**: key actions (hold OK = menu, hold CANCEL = save), RX battery bar = linked, Model select/name, Type = Airplane, Sticks mode 2, **Aux switches** (activate SwA/SwC, channel count ≥6), **transmitter mixing OFF** (V Tail, Elevon, Mixes, Throttle hold; linear throttle curve; dual rate 100/exp 0), Reverse Nor, End points 100%, Subtrim 0, trims centred (high beep), **Aux. channels Ch5=SwA, Ch6=SwC** (defaults VrA/VrB), RX setup: RF standard AFHDS 2A, **Output mode PPM**, failsafe later. Test on Functions setup → **Display** (TX-side check) before the Pixhawk. Manual note: by default knobs = CH5/6, switches = CH7–10; iA10B supports 6–10 ch.

- **2026-10-17 14:29** — Guide 05 step 1 ✅: i6X home screen shows TX and RX bars; telemetry TX.V 5.14 V, receiver IntV1 4.52 V, **SigS1 10** (max), so **TX ↔ RX link confirmed**. Now in System setup.

- **2026-10-17 14:48** — Guide 05 steps 2–3 (in progress): Type = Airplane (the i6X prompted to switch the receiver off, USB unplugged), Sticks mode 2 confirmed, Aux switches all on with Ch = 10, **V Tail Off** (Ch2<=Ch2, Ch4<=Ch4). Receiver may be plugged back in (safe: USB only, MAIN/AUX empty). Next: Elevon, Mixes, Throttle hold, curve, D/R.

- **2026-10-17 14:57** — Guide 05: **Elevon Off** (Ch1<=Ch1, Ch2<=Ch2). Added a **settings log table** to Guide 05 (each setting, result, changed?, plain-language meaning), as the user asked. Rule: keep it updated after every step.

- **2026-10-17 14:58** — Guide 05: Mixes #1–#3 all Off ✅.

- **2026-10-17 15:00** — Guide 05: Throttle hold Off ✅ (Value 50% shown but inactive).

- **2026-10-17 15:09** — Guide 05: Throttle curve linear (L0/25/50/75/H100) ✅.

- 2026-10-17 16:13 — QGC voice alerts (PreArm/battery) annoying on the bench → mute via Q icon → Application Settings → General → untick the volume checkbox (QGC setting `audioMuted`). Only the voice is muted; warnings still show in Vehicle Messages. Battery monitor/failsafe will be set up properly in a later guide (07/10), not disabled.

- 2026-10-17 16:34 — Guide 05: Dual rate/exp. Ch1/Ch2/Ch4 = Rate 100, Exp 0 ✅ (no change). Next: Assign switches.

- 2026-10-17 16:36 — Guide 05: Assign switches all None ✅ → Step 3 complete (all mixing off, nothing changed). Guide 05 rev 3: settings log shortened to 1-line meanings, "Where we are" checklist added, Step 3 table has ✅ column. Next: Step 4 Reverse.

- 2026-10-17 16:58 — Guide 05 rev 4: Step 4 rewritten as 4.1 Reverse / 4.2 End points / 4.3 Subtrim / 4.4 Trims, each starting from the home screen. Correction: on these i6X screens short OK = next channel and UP/DOWN = change the value (I'd said the opposite in chat).

- 2026-10-17 16:59 — Guide 05 Step 4.1: Reverse all Nor ✅ (no change). Next: 4.2 End points.

- 2026-10-17 17:10 — Guide 05 Step 4.2: End points all 100%/100% ✅ (no change). Next: 4.3 Subtrim.

- 2026-10-17 17:14 — Guide 05 Step 4.3: Subtrim all centred ✅ (Ch1 '1 px left' was just the selection highlight). Next: 4.4 Trims.

- 2026-10-17 18:21 — Guide 05 Step 4.4: home-screen trim bar layout researched (real i6X photo, Perth Radio Sailing + AMYA guides). Left side bar = Ch3 throttle trim, bottom-left = Ch4 yaw, right side = Ch2 pitch, bottom-right = Ch1 roll. Added a labelled diagram to the guide.

- 2026-10-17 18:31 — Guide 05 Step 4.4: home-screen photo (`guides/guide5_screenshots/i6x-home-screen_1825.jpeg`) shows all 4 trim markers centred ✅. Telemetry TX.V1 4.94 V, IntV1 4.47 V, SigS1 10. Step 4 complete, nothing changed. Next: Step 5 Aux. channels (Ch5 SwA, Ch6 SwC).

- 2026-10-17 18:38 — Guide 05 Step 5 (**changed**): Aux. channels Ch5 VrA → SwA (arm), Ch6 VrB → SwC (flight modes). Saved and re-checked. Next: Step 6 RX setup → Output mode PPM.

- 2026-10-17 18:48 — Guide 05 Step 6: user opened RF standard by mistake (my unclear "check" wording) → AFHDS mode change prompt → cancelled. Home screen still AFHDS2A ✅. Guide now says never open RF standard. Next: Output mode → PPM.

- 2026-10-17 18:51 — Guide 05 Step 6: Output mode = PPM, Serial = i-BUS (already set) ✅. Next: Step 7 Display test.

- 2026-10-17 19:10 — **Guide 05 complete** ✅. i6X Display test: Ch1 roll, Ch2 pitch, Ch3 throttle, Ch4 yaw, Ch5 SWA, Ch6 SWC (3 pos) all correct. Only change: Aux. channels Ch5 → SwA, Ch6 → SwC. Transmitter side is proven; next is the receiver → Pixhawk path (Guide 04 radio check / C5).

- 2026-10-17 19:26 — After Guide 05: QGC Radio Raw Channel Monitor still frozen with the TX on. TX and RX are proven OK, so the fault is the RX → Pixhawk path (inline PPM encoder). Next: Guide 04 C5 (remove encoder, direct PPM/CH1 → RC IN lead).

- 2026-10-17 19:28 — C5.1: photo `guides/guide4_screenshots/rcin-to-ppm-encoder_1927.jpeg` confirms Pixhawk RC IN ← PPM encoder board ← receiver. Diagnosis confirmed. Next: quick test with i6X Output mode → PWM (option B, no rewiring), then decide on A (remove encoder).

- 2026-10-17 19:32 — **Radio input fixed** ✅ (Guide 04 C5 option B): i6X System setup → RX setup → Output mode **PPM → PWM**, saved. The encoder now gets separate channels and builds PPM for RC IN. QGC Raw Channel Monitor follows the sticks and switches. Encoder kept (option A optional later). Next: **Guide 04 Part D, Radio calibration (Mode 2)**.

- 2026-10-17 19:46 — User described the surfaces: right stick ←→ = ailerons opposite; right stick ↑↓ = both tail wings together; left stick ←→ = tail wings opposite. Matches ArduPlane's Aileron + VTailLeft/Right config ✅; added a "How the sticks move the surfaces" table. Calibration (Guide 04 D) only teaches the stick ranges and is unaffected.

- 2026-10-17 19:48 — Guides 04 + 05 updated with the stick → surface table (user's description). Guide 04 Part D rewritten from the QGC 5.1.5 source (RemoteControlCalibrationController): order = throttle-down start → throttle up/down → yaw R/L → roll R/L → pitch up/down → switches/dials → Next writes params; Mode 2, "Centered Throttle" unticked. Starting Part D with the user now.

- 2026-10-17 19:56 — **Guide 04 Part D: radio calibration done** ✅ (Mode 2, written to the board). All 4 sticks move the right way. Screenshot `guides/guide4_screenshots/radio-after-calibration_1955.png`: switches up gives ch5 low (SWA up = disarmed ✅) and ch6 low (SWC up = Flight Mode 1 = QLand ✅); ch7/8 mid, 9–18 none. Next: backup, then Part E.

- 2026-10-17 19:59 — Backup `backups/params_after-radio-cal.params` checked: AHRS_ORIENTATION=0 ✅, accel + level calibrated ✅, RC1–8 calibrated ✅ (RC2_REVERSED=1, same as before; direction to verify in the servo test). ⚠️ Only **1,276 params** vs 1,430 in the 4.7.2 backups: 144 Q_ tuning params (Q_A_/Q_P_/Q_M_/Q_WP_/Q_LOIT_/Q_WVANE_) and 10 GPS1_* missing, GPS1_TYPE=0, SERVO7_FUNCTION=0, EK3_CHECK_SCALE=150 (the same pattern as the 4.7.1 backup). Hypothesis: QGC fetched the list before QuadPlane/GPS finished initialising. Next: Parameters → Tools → Refresh, then re-save as `params_after-radio-cal_refresh.params`, and check Vehicle Messages for 'QuadPlane initialised'. No param changes until clear.

- 2026-10-17 20:03 — The user wants the GPS on first: Guide 04 step D2 = Parameters → GPS1_TYPE → Auto (1) → Save → Tools → Reboot Vehicle → wait 60 s → Refresh → save `params_after-radio-cal_refresh.params`.

- 2026-10-17 20:03 — **Changed:** `GPS1_TYPE` 0 → **1 (Auto)** by the user in QGC Parameters. Reboot pending.

- 2026-10-17 20:06 — Refresh backup `params_after-radio-cal_refresh.params` (1,286; file had a leading space in its name, renamed): GPS1_TYPE=1 ✅ and GPS1_* back. ⚠️ **Q_ tuning groups still missing after reboot + refresh** and SERVO7_FUNCTION=0, so QuadPlane::setup() isn't completing (4.7.2 source: it stops at a config_error such as 'Not enough memory for quadplane' or an allocation error). It worked in the 02:47–03:54 boots. Asked for the Vehicle Messages from a fresh boot.

- 2026-10-17 20:09 — Boot 20:07 messages (`guides/guide4_screenshots/boot-messages_2007.txt`): **QuadPlane initialised, Frame: TRI**, no config error ✅; GPS u-blox detected ✅; **'Radio failsafe on' gone, RC receiver Normal** ✅. Remaining PreArm: battery (USB), GPS bad fix (indoors), compass not calibrated, AHRS (EKF waiting), safety switch. Open: QGC list lacks the Q_ tuning groups even though QuadPlane starts (source: invalidate_count() is called after setup). Test: search Q_A_RAT_RLL_P.

- 2026-10-17 20:11 — **Solved:** Q_A_RAT_RLL_P missing in QGC until Tools → Refresh, then 0.45 (unchanged). QGC downloads params at connect, before QuadPlane::setup() adds its groups (~2 s into boot). Nothing is wrong on the board. **Rule:** after every reboot/connect wait ~30 s and Refresh before editing/saving params. (The 4.7.1 backup and the 19:57 backup were incomplete the same way.) Next: save the full backup `params_after-radio-cal_full.params`.

- 2026-10-17 20:12 — **Full backup** `backups/params_after-radio-cal_full.params`: **1,430 params** ✅ (same set as the Guide 03 backups). Values back to normal: SERVO7_FUNCTION=39, EK3_CHECK_SCALE=100, RC1_DZ=30, so the odd values were early-download artifacts. Now the **current reference** backup. Current: FLTMODE_CH=8, modes 17/19/5/17/11/5, RC5_OPTION=153, RC6_OPTION=4 (RTL), leftovers RC9=34, RC10=162, RC12=28, RC13=24, RC14=16, RC16=154, ARMING_RUDDER=2. Next: Part E flight modes.

- 2026-10-17 20:17 — **Changed (Part E1):** FLTMODE_CH 8 → **6**; Flight Modes 1–6 = QLAND, QLAND, QHOVER, QHOVER, FBWA, FBWA (were QSTABILIZE, QLOITER, FBWA, QSTABILIZE, RTL, FBWA). SWC up lights Flight Mode 1 ✅. Screenshot `flight-modes-set_2015.png`. Next: check middle/down, then Channel option 6 RTL → Do Nothing.

- 2026-10-17 20:25 — **Changed (Part E2):** RC6_OPTION 4 (RTL) → **0 (Do Nothing)**. SWC up/middle/down → Flight Mode 1/4/6 ✅. Note: in QGC a yellow 'Channel option N' only means channel N > 1800 µs (source), not that an option is active. Next: Part F leftovers (RC9/10/12/13/14/16_OPTION → Do Nothing, ARMING_RUDDER → 0).

- 2026-10-17 20:28 — **Changed (Part F1):** RC9/10/12/13/14/16_OPTION → 0 (Do Nothing). Channel options 6–16 all Do Nothing (screenshot `switch-options-cleared_2027.png`). RC5_OPTION=153 kept. Next: ARMING_RUDDER 2 → 0.

- 2026-10-17 20:28 — **Changed (Part F2):** ARMING_RUDDER 2 → **0 (Disabled)**. Arming only via SWA. Part F complete.

- 2026-10-17 20:32 — **Guide 04 Part G** ✅: Fly view shows QLand / QHover / FBWA for SWC up/middle/down. SWA down → arm attempt refused with 'Arm: Hardware safety switch' (+ battery, no GPS lock), so SWA down = arm, up = disarm ✅. Switches left up. Next: Part H backup `params_after-guide04.params`.

- 2026-10-17 20:34 — **Guide 04 complete** ✅. Backup `backups/params_after-guide04.params` (1,430) differs from `params_after-radio-cal_full` by exactly the intended changes: FLTMODE_CH 8→6, FLTMODE1–5 → 20/20/18/18/5 (6 already 5), RC6/9/10/12/13/14/16_OPTION → 0, ARMING_RUDDER 2→0. Now the current reference. Next: Guide 06 wiring.

- 2026-10-17 20:42 — **Guide audit** (user request): added a 'Status now' box at the top of Guides 01–04 listing what changed later. Guide 03 status pill: A–D ✅, F ✅, E compass after wiring. Guide 04: C3 and B2 'PPM' marked *Superseded* (real fix: Output mode PWM because of the encoder); final summary anchor; rev 3. Guide 05: lead/Step 6/status corrected to PWM + complete. **Drawings redrawn** (one shared top view): V-tail surfaces now sit on the tail-wing trailing edges, tilt servos shown, airplane-mode motors point forward (▲ thrust, was a sideways →), V-tail rear-view inset in Guide 01; controller drawing widened (SWC text was clipped) and SWA label 'down = ON · up = OFF'. README facts table refreshed (orientation, mounting, Q_TILT_TYPE, PreArm 'fixed in' column).

- 2026-10-17 20:51 — **GitHub prep:** `.gitignore` (macOS/editor junk), deleted `guides/.DS_Store`, renamed the 2 root screenshots to ASCII names (they had a hidden U+202F space): `screenshots/qgc-firmware-update-popup_2026-10-17_0101.png`, `screenshots/qgc-first-screenshot_2026-10-17_0030.png`. New `index.html` start page and a 'Repository layout' section. Checked: no EXIF GPS in photos, no personal paths/emails in the files. ⚠️ Privacy note for the user: `guides/guide4_screenshots/arm-test-safety-switch_2032.png` (and faintly `sensor-status_2008.png`) show the QGC satellite map around the user's location.

- 2026-10-17 20:53 — Added `quick/` (short Markdown task lists for Guides 01–05), a 'Start here' line at the top of this README, `.nojekyll` (GitHub Pages serves files as they are, so links work the same online and offline), and links from `index.html`. Repo: https://github.com/soufianeblog/dronev2 (public, user OK with the map screenshots).

- 2026-10-17 21:46 — `quick/` rewritten in a user-friendly format: the same layout in every file (navigation ← Index →, link to the full guide, Goal / You need, ☐ checkbox steps, ✅ Done when, Problems table), plus a quick/README with an aircraft summary, ordered list (05 before 04), times and rules. Rendering checked with the GitHub Markdown API (tables + 52 checkboxes). README: Contents line.

- 2026-10-17 21:48 — **README split** (user: README had unnecessary internal info): README.md is now a short public overview (aircraft, controls, progress table with HTML + MD links, hardware, safety, repo layout). Everything internal (working rules, known facts, output map, PreArm table, roadmap details, progress log, open questions) moved here to `docs/project-notes.md`, which is now the source of truth for facts and history.

- 2026-10-18 00:52 — **Reference pages + 3 languages:** new `guides/ref-stick-controls.html` (12 CoreWing-style 3/4 drawings: plane + transmitter, highlighted stick/switch, red line to the surface/motor; airplane + drone mode + switches), `guides/ref-flysky-settings.html` (2 changes + 9 checked screens as i6X LCD drawings, channel map), `guides/ref-parameter-changes.html` (every param change before→after→what for, kept settings, auto-changing values), each with an MD version in `quick/`. Drawings in `assets/drawings/`. Everything translated to French (`fr/`) and Arabic (`ar/`, RTL) with a language switcher on every page (big buttons on the start pages). © 2026 bellocloud.com footers + LICENSE. Commit history rewritten to remove AI co-author trailers. 489 relative links checked: 0 broken.

- 2026-10-18 02:11 — **Guide 06 started (outputs + servo test).** Component photos (10) saved to `guides/guide6_screenshots/component_*.jpg` (resized, metadata stripped). Output map confirmed with the user: MAIN 1/2 ailerons (L/R), MAIN 3/4 V-tail (L/R), MAIN 5/6/8 ESCs (M1 front-right, M2 front-left, M4 tail), AUX 1/2 tilt servos (front-left/right) = matches SERVOn_FUNCTION. Before first power: narrow SERVO9/10 to 1100–1900 (were 800–1940 / 700–2100). Servo rail needs 5 V from one ESC BEC or the PDB 5 V BEC (never 12 V). Open: do the ESC leads carry 5 V (3 wires)?

- 2026-10-18 02:16 — The user plugs the ESCs too (MAIN 5 front-right, 6 front-left, 8 tail) to test everything in one go. Guide 06 step 1 updated: props off; if ESC leads have a red 5 V wire, keep it only on the tail ESC (MAIN 8) to power the servo rail and pull it out of MAIN 5/6 plugs. Order: servo test → single-motor test (low throttle, direction) → ESC calibration.

- 2026-10-18: Audit of params_after-guide04 vs user's wishes. OK: SERVO5/6/8 = Motor1/2/4 (33/34/36), RC5_OPTION=153 (SWA arm), logging already full (LOG_BACKEND_TYPE=1, LOG_BITMASK=65535, LOG_DISARMED=1; needs microSD). Found: SWC up = QLAND → arming refused in QLAND and throttle ignored (explains "throttle does nothing"). Plan: FLTMODE1/2 → QSTABILIZE (17); SWB → RTL (RC7_OPTION=4, after checking which channel SWB drives); Q_RTL_MODE 2 → 3 (QRTL always) for the hover-testing phase; ARMING_RUDDER 0 → 2 (stick arm right 3 s / disarm left 2 s, works alongside SWA). Motors spinning on their own: diagnosis pending (idle spin Q_M_SPIN_ARM=0.1 after arming is normal; otherwise ESC calibration via Q_ESC_CAL).

- 2026-10-18: User applied (verified in backups/params_after-switches.params): FlySky Aux channels Channel 7 = SwB; RC7_OPTION=4 (SWB down = RTL); Q_RTL_MODE=3 (QRTL always); FLTMODE1/2=17 (SWC up = QSTABILIZE, arming allowed, direct throttle); ARMING_RUDDER=2 (left stick down+right 3 s arms, down+left 2 s disarms). SERVO9/10 safe tilt limits not yet changed.

- 2026-10-18: Bench test reports: front motors spun once, tail motor (MAIN8) never; after battery re-plug none spin; throttle and stick arming do nothing (likely not armed: safety switch / PreArm). Open: does the kit's red safety switch exist on the SWITCH port (BRD_SAFETY_DEFLT=1 locks outputs without it)? Front tilt ranges differ (SERVO9 800–1940 rev, SERVO10 700–2100); user sees one tilt off by a few degrees, software not hardware (swap test). Waiting for PreArm messages + which side/position is off.

- 2026-10-18 18:50: Arming blockers cleared step by step: microSD formatted (FAT32) → "Logging failed" gone; compass calibrated (external HMC5883, quality yellow → redo outdoors for green before first flight) + reboot → "Compass not calibrated" gone; ARMING_SKIPCHK=16 (skip INS/AHRS check, indoor bench only, set back to 0 before flight) → "AHRS: not using configured AHRS type" skipped; battery plugged → low-voltage gone. Only "Hardware safety switch" left. Next: ESC calibration (Q_ESC_CAL=1) because some motors spin while disarmed and others don't.

- 2026-10-18 19:10: ESC calibration done with Q_ESC_CAL=1 (battery unplugged, USB only, props off; ARMING_SKIPCHK=400 temporarily = INS 16 + Board voltage 128 + Battery level 256; SWC up QStabilize, safety solid, SWA down = Armed, left stick full up, plug battery → 2 beeps, stick full down within ~2 s → 3 short + 1 long). Restored Q_ESC_CAL=0 and ARMING_SKIPCHK=16. Motors now mostly consistent; tail / second front motor still to confirm with a throttle test.

- 2026-10-18 19:20: Explained: tilts move in FBWA on the bench because Q-Assist (Q_ASSIST_SPEED=10 m/s) sees 0 airspeed and brings the VTOL motors in ("Transition started airspeed 0.0"), normal. Drone modes armed: motors at 90° + yaw tilt up to ±10° (Q_TILT_YAW_ANGLE, VectoredYaw), scaled by hover_throttle/throttle (×2 at low throttle, ×0.5 at high) so it looks big on the bench; disarmed = still at 90°. Hand test: rotate nose → front motors tilt opposite.

- 2026-10-18 19:30: Explained SWB: down = QRTL (Q_RTL_MODE=3): climb to Q_RTL_ALT 20 m, fly home as a drone to the arming point, land vertically, disarm; up = take back control. Needs GPS fix. Radio failsafe separate (currently QLand where it is).

- 2026-10-18 19:40: Backup backups/params_after-esc-cal.params saved and diffed vs params_after-switches: ARMING_SKIPCHK 0→16, new compass calibration (COMPASS_OFS/DIA/ODI/SCALE), gyro offsets, Q_M_THST_HOVER 0.369→0.479 (learned on the bench while armed; watch it, may need ~0.37 before first hover), Q_ESC_CAL confirmed 0. Guide 06 rev 3 written (Steps 8–11).

### Open questions
- ✅ Q_ params: just QGC's early download. Always Refresh ~30 s after boot before editing/saving.
- ✅ Radio input solved (option B: i6X Output mode PWM, encoder kept). Optional later: option A (remove encoder, direct PPM/CH1 → RC IN) for fewer wires/failure points.
- ✅ Guide 03 F: `params_after-guide03.params` (03:32) and `params_after-guide03_2.params` (03:54) exist (orientation 0, accel + level calibrated).
- Watch item: `Internal errors 0x100000 l:1375 flow_of_ctrl` seen **once** (first boot after flashing), gone after reboot. Report if it ever returns.
- After calibration: does `PreArm: Radio failsafe on` disappear with the TX on? → Guide 04 D
- `SERVO7_FUNCTION=39` (auto-assigned Tri yaw servo) on a VectoredYaw Y3: keep MAIN 7 empty; review in Guide 07.
- ✅ RC IN ← PPM encoder ← FlySky iA10B (Output mode PWM). Encoder wire order to receiver CH1–8 looked right (channels move correctly); full direction check in Guide 04 D.
- Is the Pixhawk **installed in the plane** yet? Does its **arrow point to the nose**? (Old `AHRS_ORIENTATION=2` = Yaw90.) → Guide 03
- ✅ Tail = V-tail behaviour (user 19:46).
- Add an **airspeed sensor** later? (Recommended for VTOL transitions, not required)

---
© 2026 bellocloud.com
