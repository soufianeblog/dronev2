# 01 · Connect and check ArduPlane

1. Plug the Pixhawk into the Mac by USB. Open QGroundControl 5.1.5 and wait for "Not Ready" in the top bar.
2. **Vehicle Messages** (message icon in the top bar): check for `ArduPlane V4.x`, `Pixhawk1`, `QuadPlane initialised, Frame: TRI`.
3. **Q icon → Vehicle Configuration → Parameters**. If a "Parameters are missing" popup appears (FS_OPTIONS…), click **Ok** (harmless).
4. Check these parameters: `Q_ENABLE = 1`, `Q_FRAME_CLASS = 7` (Tri), `Q_TILT_TYPE = 2` (VectoredYaw), `Q_TILT_MASK = 3`.
5. **Tools → Save to file…** → `backups/params-backup_<date>_before-guide02.params`.

**Result:** board runs ArduPlane with QuadPlane Tri. Old setup backed up.
