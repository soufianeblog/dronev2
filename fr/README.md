# VTOL Y3 : un drone qui vole comme un avion

🌐 [English](../README.md) · **Français** · [العربية](../ar/README.md)

Un **VTOL tricoptère** à rotors basculants. Il décolle et atterrit comme un drone et vole comme un avion. Il tourne sous **ArduPlane 4.7.2** (QuadPlane) sur un **Pixhawk 2.4.8**, configuré avec **QGroundControl 5.1.5** et une radio **FlySky i6X**.

> **Commencez ici**
> - 🌐 **Guides complets dans le navigateur :** https://soufianeblog.github.io/dronev2/ (hors ligne : ouvrez `index.html`)
> - ✅ **Listes de tâches courtes :** [`quick/`](quick/README.md)
> - 💾 **Sauvegardes des paramètres :** [`backups/`](../backups/) (la plus récente : `params_after-guide04.params`)

## L'appareil

```
                    ▲ nez
      (M2)──────────┼──────────(M1)        moteurs avant, chacun sur un servo de bascule
 ═════════════════ AILE PRINCIPALE ══════════
   [aileron G]      │      [aileron D]     1 servo chacun
                    │
                  (M4)                      moteur arrière, fixe
           ╲═ queue G ═╪═ queue D ═╱        empennage en V, 1 servo chacun
```

| Élément | Rôle |
|---|---|
| 2 moteurs avant (M1, M2) + 2 servos de bascule | Pointés vers le **haut** en mode drone, basculés vers l'**avant** en mode avion. Ils gèrent aussi le lacet en mode drone. |
| 1 moteur arrière (M4) | Portance en mode drone uniquement, **arrêté** en mode avion |
| 2 ailerons | Roulis en mode avion |
| 2 gouvernes de queue (empennage en V) | Tangage = elles bougent ensemble, lacet = elles bougent en sens opposé |

## Commandes (FlySky i6X, Mode 2)

| Commande | Action |
|---|---|
| **SWA** (CH5) | **Bas = armé** (moteurs actifs) · **haut = désarmé** |
| **SWC** (CH6) | **Haut = QLAND** (atterrissage / ralenti) · **milieu = QHOVER** (drone) · **bas = FBWA** (avion) |
| Manche gauche | ↑↓ gaz · ←→ lacet |
| Manche droit | ↑↓ tangage · ←→ roulis |

Le Pixhawk s'occupe de tous les mixages. En mode drone, les gouvernes de l'aile et de la queue s'effacent automatiquement à basse vitesse.

## Avancement

| # | Étape | Guide complet | Liste de tâches | Statut |
|---|---|---|---|---|
| 01 | Connecter et vérifier ArduPlane | [HTML](https://soufianeblog.github.io/dronev2/fr/guides/guide-01_2026-10-17_0113_connect-and-check-arduplane.html) | [MD](quick/01-connect-and-check.md) | ✅ |
| 02 | Mettre à jour vers ArduPlane 4.7.2 | [HTML](https://soufianeblog.github.io/dronev2/fr/guides/guide-02_2026-10-17_0220_update-arduplane-4-7-2.html) | [MD](quick/02-update-firmware.md) | ✅ |
| 03 | Orientation et calibration | [HTML](https://soufianeblog.github.io/dronev2/fr/guides/guide-03_2026-10-17_0309_orientation-and-calibration.html) | [MD](quick/03-orientation-calibration.md) | 🟡 boussole après le câblage |
| 05 | Configuration de l'émetteur FlySky i6X | [HTML](https://soufianeblog.github.io/dronev2/fr/guides/guide-05_2026-10-17_1421_flysky-i6x-transmitter-setup.html) | [MD](quick/05-flysky-i6x.md) | ✅ |
| 04 | Calibration radio, modes de vol, interrupteur d'armement | [HTML](https://soufianeblog.github.io/dronev2/fr/guides/guide-04_2026-10-17_0345_flysky-switches-and-calibration.html) | [MD](quick/04-radio-modes-arming.md) | ✅ |
| 06 | Câblage (ESC, servos, alimentation) | | | ⏳ prochaine étape |
| 07 | Failsafe radio | | | ⏳ |
| 08 | Sorties : moteurs, servos de bascule, gouvernes, sens | | | ⏳ |
| 09 | Calibration des ESC, sens de rotation des moteurs | | | ⏳ |
| 10 | Test de transition au banc, failsafe batterie | | | ⏳ |
| 11 | Check-list avant vol, premier vol stationnaire | | | ⏳ |

## Référence

| Page | HTML | Markdown |
|---|---|---|
| Manches et interrupteurs : comment l'appareil bouge (dessins) | [ouvrir](https://soufianeblog.github.io/dronev2/fr/guides/ref-stick-controls.html) | [MD](quick/ref-stick-controls.md) |
| FlySky i6X : chaque réglage modifié et vérifié | [ouvrir](https://soufianeblog.github.io/dronev2/fr/guides/ref-flysky-settings.html) | [MD](quick/ref-flysky-settings.md) |
| Modifications de paramètres : avant → après → pourquoi | [ouvrir](https://soufianeblog.github.io/dronev2/fr/guides/ref-parameter-changes.html) | [MD](quick/ref-parameter-changes.md) |

![Roulis à droite en mode avion](../assets/drawings/air-roll-right.svg)

## Matériel

| Qté | Élément |
|---|---|
| 1 | Pixhawk 2.4.8 combo (GPS M8N + boussole, module d'alimentation, buzzer, interrupteur de sécurité) |
| 3 | Moteurs A2212/13T 1000 KV + ESC 30 A |
| 6 | Servos EMAX ES08MA II (2 bascule, 2 ailerons, 2 queue) |
| 1 | PDB avec BEC 5 V / 12 V |
| 1 | LiPo 3S 3000 mAh 60C (XT60) |
| 1 | FlySky FS-i6X + récepteur FS-iA10B, relié à RC IN via un encodeur PPM (sortie du récepteur : PWM) |

## Sécurité

Le travail au banc se fait **en USB uniquement : pas de LiPo, pas d'hélices**, jusqu'à ce qu'un guide dise explicitement le contraire. Ne désactivez jamais les vérifications d'armement.

## Dépôt

| Chemin | Contenu |
|---|---|
| `index.html` | Page d'accueil des guides (GitHub Pages ou hors ligne) |
| `guides/` | Guides HTML complets, avec captures d'écran et journaux dans `guideN_screenshots/` |
| `quick/` | Listes de tâches courtes en Markdown |
| `backups/` | Sauvegardes des paramètres QGroundControl |
| `docs/project-notes.md` | Notes de travail : faits vérifiés, plan des sorties, journal complet d'avancement, questions ouvertes |
| `fr/`, `ar/` | Versions française et arabe de tout le contenu (même organisation) |
| `assets/drawings/` | Dessins (SVG) utilisés par les guides |
| `LICENSE` | © 2026 bellocloud.com |

---
© 2026 bellocloud.com. All rights reserved.
