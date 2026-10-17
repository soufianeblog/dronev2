# 02 · Update to ArduPlane 4.7.2

1. Backup first (see 01, step 5).
2. **Q icon → Vehicle Configuration → Firmware**. The dropdown shows `Pixhawk1 [ArduPilot ChibiOS]` → click **Flash**.
3. When it says *"Now unplug your device and plug it back in"*: unplug the USB, wait 3 s, plug it back in.
4. In the **Firmware Setup** popup: choose **ArduPilot**, change vehicle type from Multi-Rotor to **Plane**, select **Pixhawk1 – 4.7.2** → **OK**.
5. Wait for "Upgrade complete". The board reboots by itself.
6. Wait 30 s → **Parameters → Tools → Refresh**.
7. **Vehicle Messages**: must show `ArduPlane V4.7.2 (fb773567)`.
8. **Tools → Save to file…** → `backups/params_after-guide02_4.7.2.params`.

**Result:** 4.7.2 installed, old parameters kept (about 1,430 params after Refresh).
