# 05 · FlySky i6X transmitter setup

**English** · [Français](../fr/quick/05-flysky-i6x.md) · [العربية](../ar/quick/05-flysky-i6x.md)

[← 03](03-orientation-calibration.md) · [Index](README.md) · [Next: 04 →](04-radio-modes-arming.md) · [Full guide](https://soufianeblog.github.io/dronev2/guides/guide-05_2026-10-17_1421_flysky-i6x-transmitter-setup.html)

**Goal:** a clean transmitter. No mixing, SWA on Ch5, SWC on Ch6.
**You need:** the i6X, and the receiver powered by the Pixhawk over USB.

## Keys

| Action | Key |
|---|---|
| Open the menu | **hold OK** (2 s) |
| Move / change a value | **UP / DOWN** |
| Open an item / next field | **short OK** |
| Back without saving | **CANCEL** |
| Save and back | **hold CANCEL** (2 s) |

> On screens with a channel list (Reverse, End points, Subtrim…): **short OK = next channel**, **UP/DOWN = change the value**. Don't scroll with UP/DOWN there.

> ⚠️ **Never open RX setup → RF standard.** Changing it can break the link to the receiver.

**Power on with all 4 switches UP and the throttle stick DOWN.** Otherwise the i6X keeps beeping.

## Steps

Each path starts from the home screen (*hold OK → menu*).

- [ ] **1.** Home screen: **TX** and **RX** battery bars visible, `SigS1: 10` → the receiver is linked
- [ ] **2.** System setup → **Type select** → **Airplane**
- [ ] **3.** System setup → **Sticks mode** → **2**
- [ ] **4.** System setup → **Aux switches** → all **On**, Ch **10**
- [ ] **5.** Functions setup → **V Tail**, **Elevon**, **Mixes** → all **Off** (the Pixhawk does the mixing)
- [ ] **6.** Functions setup → **Throttle hold** → **Off**
- [ ] **7.** Functions setup → **Throttle curve** → 0 / 25 / 50 / 75 / 100
- [ ] **8.** Functions setup → **Dual rate/exp.** → Ch1, Ch2, Ch4: Rate **100**, Exp **0**
- [ ] **9.** Functions setup → **Assign switches** → all **None**
- [ ] **10.** Functions setup → **Reverse** → all **Nor**
- [ ] **11.** Functions setup → **End points** → all **100% / 100%**
- [ ] **12.** Functions setup → **Subtrim** → all **0** (the highlighted channel can look 1 px off; that's normal)
- [ ] **13.** **Trims:** use the 4 small rockers next to the sticks → centre each one (a **higher beep** = centre)
- [ ] **14.** Functions setup → **Aux. channels** → Channel 5 = **SwA**, Channel 6 = **SwC** → **hold CANCEL**
- [ ] **15.** System setup → **RX setup** → **Output mode** → **PWM** (Serial: i-BUS) → **hold CANCEL**
- [ ] **16.** Functions setup → **Display** → move each control and check that only its own bar moves:

  | Move | Bar |
  |---|---|
  | Right stick ←→ | Ch1 |
  | Right stick ↑↓ | Ch2 |
  | Left stick ↑↓ | Ch3 |
  | Left stick ←→ | Ch4 |
  | SWA | Ch5 |
  | SWC up / middle / down | Ch6 end / middle / end |

## ✅ Done when

Every control moves only its own bar on the Display screen.

## Problems?

| You see | Do this |
|---|---|
| *"Turn off receiver first"* | Unplug the Pixhawk USB, change the setting, plug it back in |
| *"This will change the AFHDS mode, are you sure?"* | Press **CANCEL** / **No** (you opened RF standard by mistake) |
| Step 15: PWM or PPM? | **PWM** if a PPM encoder board sits between the receiver and RC IN (our setup). **PPM** only with a direct cable from PPM/CH1 to RC IN. |

---
© 2026 bellocloud.com
