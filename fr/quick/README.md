# VTOL Y3 · Listes de tâches rapides

🌐 [English](../../quick/README.md) · **Français** · [العربية](../../ar/quick/README.md)

Des check-lists étape par étape pour configurer le VTOL Y3. Chacune se lit en quelques minutes.
Vous voulez aussi les explications, les captures d'écran et les journaux ? Ouvrez les **[guides complets dans le navigateur](https://soufianeblog.github.io/dronev2/fr/)**.

## L'appareil

| | |
|---|---|
| Cellule | VTOL tricoptère à rotors basculants : 2 moteurs avant basculants, 1 moteur arrière fixe, ailerons, empennage en V |
| Contrôleur de vol | Pixhawk 2.4.8 (cible firmware `Pixhawk1`) sous **ArduPlane 4.7.2** (QuadPlane) |
| Station sol | QGroundControl 5.1.5 sous macOS |
| Radio | FlySky i6X → récepteur iA10B → encodeur PPM → Pixhawk **RC IN** |
| GPS | M8N avec boussole |

## Listes de tâches, dans l'ordre

| # | Liste de tâches | Durée | Statut |
|---|---|---|---|
| 01 | [Connecter et vérifier ArduPlane](01-connect-and-check.md) | 15 min | ✅ Fait |
| 02 | [Mettre à jour vers ArduPlane 4.7.2](02-update-firmware.md) | 15 min | ✅ Fait |
| 03 | [Orientation et calibration](03-orientation-calibration.md) | 20 min | 🟡 Reste la boussole (après le câblage) |
| 05 | [Configuration de l'émetteur FlySky i6X](05-flysky-i6x.md) | 25 min | ✅ Fait |
| 04 | [Calibration radio, modes de vol, interrupteur d'armement](04-radio-modes-arming.md) | 30 min | ✅ Fait |
| 06 | Câblage | | ⏳ Prochaine étape |

## Pages de référence

| Page | Contenu |
|---|---|
| [Manches et interrupteurs](ref-stick-controls.md) | Dessins : comment chaque manche et chaque interrupteur fait bouger l'appareil |
| [Réglages FlySky i6X](ref-flysky-settings.md) | Chaque réglage de l'émetteur, modifié et vérifié |
| [Modifications de paramètres](ref-parameter-changes.md) | Chaque paramètre ArduPlane modifié : avant → après → pourquoi |

> Faites **05 avant 04** : l'émetteur doit être configuré avant que le Pixhawk puisse le calibrer.

## Règles pour chaque liste de tâches

- 🔌 **USB uniquement :** pas de LiPo, pas d'hélices, sauf si une liste dit le contraire.
- 💾 **Sauvegarde avant et après :** *Parameters → Tools → Save to file…* dans `backups/`.
- 🔄 **Refresh après chaque redémarrage :** attendez 30 s, puis *Parameters → Tools → Refresh*, avant de modifier ou d'enregistrer quoi que ce soit. Sinon, environ 144 réglages VTOL manquent dans la liste.
- 🧭 **Où trouver les choses dans QGC 5.1.5 :**
  - **Pages de configuration :** cliquez sur l'icône violette **Q** (en haut à gauche) → **Vehicle Configuration**.
  - **Écran carte principal :** icône **Q** → **Fly**.
  - **Messages :** l'icône des messages dans la barre du haut.

---
© 2026 bellocloud.com
