# 03 · Orientation et calibration

[English](../../quick/03-orientation-calibration.md) · **Français** · [العربية](../../ar/quick/03-orientation-calibration.md)



[← 02](02-update-firmware.md) · [Sommaire](README.md) · [Suivant : 05 →](05-flysky-i6x.md) · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-03_2026-10-17_0309_orientation-and-calibration.html)

**Objectif :** indiquer au Pixhawk comment il est monté, puis calibrer ses capteurs.
**Il vous faut :** le Pixhawk monté dans l'avion avec sa **flèche pointée vers le nez**, et une table plane.

> 🔄 **"Reboot Vehicle"** signifie redémarrer le Pixhawk : **Parameters → Tools → Reboot Vehicle**. Attendez ensuite 30 s.

## Étapes

- [ ] **1. Orientation.** **Parameters** → recherchez `AHRS_ORIENTATION` → **None (0)** → **Save** → **Reboot Vehicle**.
- [ ] **2. Accéléromètre.** **Vehicle Configuration** → **Sensors** → **Accelerometer** → **OK**. Placez l'avion dans chacune des 6 positions affichées par QGC (à plat, sur le flanc gauche, sur le flanc droit, nez en bas, nez en haut, à l'envers). Maintenez-le immobile et cliquez sur **Next** pour chacune.
- [ ] **3. Niveau.** **Sensors** → **Level Horizon** → avion à plat sur la table (calez-le à niveau si nécessaire) → **OK**.
- [ ] **4. Boussole.** ⏳ *À faire après le guide de câblage, en extérieur, loin de tout métal.* **Sensors** → **Compass** → **OK** → tournez lentement l'avion autour de chaque axe jusqu'à ce que la barre soit pleine → **Reboot Vehicle**.
- [ ] **5. Sauvegardez.** Refresh → **Tools** → **Save to file…** → `backups/params_after-guide03.params`

## ✅ Terminé quand

- `AHRS_ORIENTATION = 0`.
- Inclinez le nez vers le bas : l'horizon dans QGC affiche du **tangage**, pas du roulis.
- Après l'étape 4, *"PreArm: Compass not calibrated"* a disparu.

## Un problème ?

| Vous voyez | Faites ceci |
|---|---|
| Nez en bas affiche du roulis | L'orientation est fausse. Vérifiez le sens de la flèche et `AHRS_ORIENTATION`. |
| Impossible de trouver un bouton Gyro | Normal. QGC le masque pour les avions. |

---
© 2026 bellocloud.com
