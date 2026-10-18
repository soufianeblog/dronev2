# 01 · Connecter et vérifier ArduPlane

[English](../../quick/01-connect-and-check.md) · **Français** · [العربية](../../ar/quick/01-connect-and-check.md)

[Sommaire](README.md) · [Suivant : 02 →](02-update-firmware.md) · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-01_2026-10-17_0113_connect-and-check-arduplane.html)

**Objectif :** voir ce qu'il y a sur la carte et le sauvegarder. Rien n'est modifié.
**Il vous faut :** le Pixhawk, un câble USB, QGroundControl 5.1.5.

## Étapes

- [ ] **1. Connectez.** Branchez le Pixhawk au Mac en USB et ouvrez QGC. Attendez que la barre du haut affiche **Not Ready**.
- [ ] **2. Lisez les messages de démarrage.** Cliquez sur l'**icône des messages** dans la barre du haut et cherchez :
  - `ArduPlane V4.x.x`
  - `Pixhawk1`
  - `QuadPlane initialised, Frame: TRI`
- [ ] **3. Ouvrez les paramètres.** **Q** → **Vehicle Configuration** → **Parameters** (en bas de la liste de gauche).
  - Si une fenêtre affiche *"Parameters are missing from firmware"*, cliquez sur **Ok**. C'est sans conséquence.
- [ ] **4. Vérifiez quatre réglages.** Tapez chaque nom dans le champ de recherche :

  | Paramètre | Valeur attendue |
  |---|---|
  | `Q_ENABLE` | 1 |
  | `Q_FRAME_CLASS` | 7 (Tri) |
  | `Q_TILT_TYPE` | 2 (VectoredYaw) |
  | `Q_TILT_MASK` | 3 |

- [ ] **5. Sauvegardez.** **Tools** (en haut à droite) → **Save to file…** → `backups/params-backup_<date>_before-guide02.params`

## ✅ Terminé quand

- Les messages affichent ArduPlane avec QuadPlane TRI.
- Le fichier de sauvegarde est dans `backups/`.

## Un problème ?

| Vous voyez | Faites ceci |
|---|---|
| "Comms Lost" dans la barre du haut | Débranchez l'USB, attendez 3 s, rebranchez-le |
| Impossible de trouver Parameters | C'est dans **Vehicle Configuration**, en bas de la liste de gauche |

---
© 2026 bellocloud.com
