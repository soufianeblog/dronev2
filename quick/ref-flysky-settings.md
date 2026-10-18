# FlySky i6X: every setting at a glance

🌐 **English** · [Français](../fr/quick/ref-flysky-settings.md) · [العربية](../ar/quick/ref-flysky-settings.md)

[Index](README.md) · [Full page](https://soufianeblog.github.io/dronev2/guides/ref-flysky-settings.html)

Only **2 settings were changed**. 9 more screens were checked and were already correct.

## Keys

| Action | Key |
|---|---|
| Open the menu | **hold OK** (2 s) |
| Move / change a value | **UP / DOWN** |
| Open an item · next field or channel | **short OK** |
| Back without saving | **CANCEL** |
| Save and back | **hold CANCEL** (2 s) |

## Changed (2)

### Functions setup → Aux. channels

![Functions setup → Aux. channels](../assets/drawings/i6x-aux-channels.svg)

| Before | After |
|---|---|
| Channel 5 = VrA · Channel 6 = VrB | Channel 5 = **SwA** · Channel 6 = **SwC** |

SWA now arms/disarms (Pixhawk `RC5_OPTION=153`). SWC now picks the flight mode (Pixhawk `FLTMODE_CH=6`). The knobs VrA/VrB are no longer used.

### System setup → RX setup → Output mode

![System setup → RX setup → Output mode](../assets/drawings/i6x-output-mode.svg)

| Before | After |
|---|---|
| PPM | **PWM** (Serial: i-BUS) |

A PPM encoder board sits between the receiver and the Pixhawk RC IN. It needs one PWM signal per channel and builds the PPM itself. With PPM the Pixhawk saw frozen values; with PWM everything works.

## Checked, left as they were

| Screen | Value | Why |
|---|---|---|
| System setup → Type select | Airplane | Plain channels, no helicopter mixing |
| System setup → Sticks mode | 2 | Left: throttle ↑↓, yaw ←→ · Right: pitch ↑↓, roll ←→ |
| System setup → Aux switches | All on · Ch 10 | Switches usable, enough channels sent |
| Functions setup → V Tail · Elevon · Mixes · Throttle hold | All Off | The Pixhawk does all mixing; double mixing would break pitch/yaw |
| Functions setup → Throttle curve | 0 / 25 / 50 / 75 / 100 % | Straight line: the Pixhawk sees the real stick |
| Functions setup → Dual rate/exp. | Ch1, Ch2, Ch4: 100 / 0 | Full range, no softening (needed for calibration) |
| Functions setup → Assign switches | All None | SWA/SWC trigger no transmitter feature |
| Functions setup → Reverse · End points · Subtrim | Nor · 100/100 % · 0 | No flipped channels, full travel, true centre |
| Functions setup → Display (test) | Each control moves only its bar | Proves the transmitter side is correct |

## Result: channel map

| Channel | Control | Pixhawk uses it for |
|---|---|---|
| Ch1 | Right stick ←→ | Roll |
| Ch2 | Right stick ↑↓ | Pitch |
| Ch3 | Left stick ↑↓ | Throttle |
| Ch4 | Left stick ←→ | Yaw |
| Ch5 | SWA | Arm (down) / disarm (up) |
| Ch6 | SWC | QLAND (up) · QHOVER (middle) · FBWA (down) |

> ⚠️ **Never open RX setup → RF standard.** Changing it can break the link to the receiver.

---
© 2026 bellocloud.com
