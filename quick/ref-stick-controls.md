# Sticks and switches: how the VTOL Y3 moves

**English** · [Français](../fr/quick/ref-stick-controls.md) · [العربية](../ar/quick/ref-stick-controls.md)


[Index](README.md) · [Full page](https://soufianeblog.github.io/dronev2/guides/ref-stick-controls.html)

**Legend:** red circle = what you move · red line = what it acts on · orange = aileron / faster motor · green = V-tail · blue = spinning propeller · arrows = direction.

## Airplane mode (SWC down, FBWA)

### Roll right

![Roll right](../assets/drawings/air-roll-right.svg)

**Move:** Right stick → **right**  
Left aileron goes **down**, right aileron goes **up**. The plane banks right. Stick left = the opposite.

### Nose up

![Nose up](../assets/drawings/air-pitch-up.svg)

**Move:** Right stick ↓ **pulled back**  
Both tail wings go **up** together. The nose rises.

### Nose down

![Nose down](../assets/drawings/air-pitch-down.svg)

**Move:** Right stick ↑ **pushed forward**  
Both tail wings go **down** together. The nose drops.

### Yaw right

![Yaw right](../assets/drawings/air-yaw-right.svg)

**Move:** Left stick → **right**  
Right tail wing goes **up**, left tail wing goes **down** (V-tail). The nose turns right.

### Faster

![Faster](../assets/drawings/air-throttle.svg)

**Move:** Left stick ↑ **up**  
The two front motors (tilted forward) spin faster. The tail motor stays off.

## Drone mode (SWC middle, QHOVER)

> The wing and tail surfaces barely move in drone mode: ArduPlane fades them out at low speed. Motors and tilt servos steer.

### Climb

![Climb](../assets/drawings/drone-throttle.svg)

**Move:** Left stick ↑ **up**  
All 3 motors speed up. The aircraft rises. In QHOVER, stick in the middle = hold height.

### Roll right

![Roll right](../assets/drawings/drone-roll-right.svg)

**Move:** Right stick → **right**  
The **left** front motor speeds up, the right one slows down. The aircraft tilts and moves right.

### Forward

![Forward](../assets/drawings/drone-pitch-forward.svg)

**Move:** Right stick ↑ **pushed forward**  
The **tail** motor speeds up, the front motors slow down. The nose dips and the aircraft moves forward.

### Turn right

![Turn right](../assets/drawings/drone-yaw-right.svg)

**Move:** Left stick → **right**  
The tilt servos lean the **left** motor forward and the **right** motor back. The aircraft turns right on the spot.

## Switches

### Arm

![Arm](../assets/drawings/arm-swa.svg)

**Move:** SWA ↓ **down**  
Motors armed (only if all safety checks pass). **SWA up = motors off immediately.**

### Drone mode

![Drone mode](../assets/drawings/mode-drone.svg)

**Move:** SWC **middle** = QHOVER  
Front motors point up, all 3 motors lift. (SWC up = QLAND: lands and stops the motors.)

### Airplane mode

![Airplane mode](../assets/drawings/mode-airplane.svg)

**Move:** SWC ↓ **down** = FBWA  
The front motors tilt forward, the tail motor stops, ailerons and V-tail steer.

> ⚠️ Every direction is checked on the real aircraft, props off, in Guide 08 (outputs) before the first flight.

---
© 2026 bellocloud.com
