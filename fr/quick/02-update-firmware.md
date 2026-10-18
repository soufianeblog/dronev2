# 02 · Mettre à jour vers ArduPlane 4.7.2

[English](../../quick/02-update-firmware.md) · **Français** · [العربية](../../ar/quick/02-update-firmware.md)



[← 01](01-connect-and-check.md) · [Sommaire](README.md) · [Suivant : 03 →](03-orientation-calibration.md) · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-02_2026-10-17_0220_update-arduplane-4-7-2.html)

**Objectif :** installer le dernier firmware stable en conservant tous les anciens réglages.
**Il vous faut :** la sauvegarde de l'étape 01, et un Mac branché sur son chargeur.

> ⚠️ Ne débranchez jamais le câble USB pendant que la barre de progression avance.

## Étapes

- [ ] **1. Ouvrez la page Firmware.** **Q** → **Vehicle Configuration** → **Firmware**. La liste déroulante affiche `Pixhawk1 [ArduPilot ChibiOS]`.
- [ ] **2. Cliquez sur Flash.**
- [ ] **3. Débranchez et rebranchez.** Quand QGC affiche *"Now unplug your device and plug it back in"* : débranchez l'USB, attendez 3 s, rebranchez-le.
- [ ] **4. Remplissez la fenêtre Firmware Setup :**
  - Choisissez **ArduPilot**.
  - Changez le type de véhicule de *Multi-Rotor* à **Plane**.
  - Sélectionnez **Pixhawk1 – 4.7.2** → **OK**.
- [ ] **5. Attendez.** Quand **Upgrade complete** s'affiche, la carte redémarre d'elle-même.
- [ ] **6. Refresh.** Attendez 30 s → **Parameters** → **Tools** → **Refresh**.
- [ ] **7. Vérifiez la version.** Les messages doivent afficher `ArduPlane V4.7.2 (fb773567)`.
- [ ] **8. Sauvegardez.** **Tools** → **Save to file…** → `backups/params_after-guide02_4.7.2.params`

## ✅ Terminé quand

- La version est 4.7.2.
- La sauvegarde contient environ **1 430** paramètres. Les anciens réglages comme `Q_FRAME_CLASS = 7` sont toujours là.

## Un problème ?

| Vous voyez | Faites ceci |
|---|---|
| *"Vehicle did not return the full parameter list"* | **Parameters → Tools → Refresh** |
| La fenêtre propose Multi-Rotor | Changez-le en **Plane**. C'est l'erreur la plus fréquente. |
| Le flashage a échoué | Cliquez à nouveau sur Flash. Le bootloader est protégé, la carte ne peut donc pas être « briquée ». |

---
© 2026 bellocloud.com
