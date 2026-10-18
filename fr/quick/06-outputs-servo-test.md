# 06 · Sorties : brancher et tester les servos (puis les moteurs)

[English](../../quick/06-outputs-servo-test.md) · **Français** · [العربية](../../ar/quick/06-outputs-servo-test.md)

[← 04](04-radio-modes-arming.md) · [Sommaire](README.md) · Suivant : 07 ⏳ · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html)

**Objectif :** chaque servo est sur la bonne sortie du Pixhawk et bouge dans le bon sens. Les moteurs viennent plus tard, **hélices retirées**.
**Il vous faut :** l'étape [04](04-radio-modes-arming.md) terminée. **Hélices RETIRÉES** sur les 3 moteurs. La LiPo uniquement quand une étape le demande.

## A. Où tout se branche

| Sortie Pixhawk | Brancher |
|---|---|
| **MAIN 1** | Servo d'aileron gauche |
| **MAIN 2** | Servo d'aileron droit |
| **MAIN 3** | Servo de l'empennage gauche |
| **MAIN 4** | Servo de l'empennage droit |
| **MAIN 5** | ESC, moteur avant **droit** (M1) |
| **MAIN 6** | ESC, moteur avant **gauche** (M2) |
| MAIN 7 | **Laisser vide** |
| **MAIN 8** | ESC, moteur arrière (M4) |
| **AUX 1** | Servo de basculement, moteur avant **gauche** |
| **AUX 2** | Servo de basculement, moteur avant **droit** |

Gauche/droite = vu assis dans l'avion, en regardant vers l'avant. Rien à réattribuer : `SERVOn_FUNCTION` correspond déjà.

## B. Brancher les servos (Pixhawk éteint)

- [ ] **1.** Débranchez l'**USB** et la **LiPo**.
- [ ] **2.** Chaque prise : **orange/jaune/blanc (signal) en haut**, rouge (+) au milieu, **marron/noir (−) en bas**, près de la base de la carte.
- [ ] **3.** Branchez les 4 servos de gouvernes (MAIN 1–4) et les 2 servos de basculement (AUX 1–2) selon le tableau.
- [ ] **4.** Branchez les 3 câbles des ESC : **MAIN 5** avant droit, **MAIN 6** avant gauche, **MAIN 8** arrière. Gardez le fil rouge seulement sur MAIN 8 (sortez-le et scotchez-le sur MAIN 5 et 6). Hélices retirées.
- [ ] **5.** 📸 Prenez une photo de la rangée de broches.

## C. Limites sûres pour les servos de basculement

- [ ] **1.** USB branché, attendez 30 s → **Q** → **Vehicle Configuration** → **Parameters** → **Tools** → **Refresh**.
- [ ] **2.** Recherchez chaque nom → cliquez dessus → tapez la valeur → **Save** :

  | Paramètre | Actuel | Régler à (provisoire) |
  |---|---|---|
  | `SERVO9_MIN` | 800 | **1100** |
  | `SERVO9_MAX` | 1940 | **1900** |
  | `SERVO10_MIN` | 700 | **1100** |
  | `SERVO10_MAX` | 2100 | **1900** |

  Rév. 4 : butées définitives dans la partie N (`SERVO9` 800–1900, `SERVO10` 800–2000).

## D. Alimenter le rail servo (5 V)

Le Pixhawk n'alimente **pas** les broches servo depuis l'USB ni depuis le module d'alimentation. Choisissez une option :

- [ ] **A. Le BEC d'un ESC :** branchez l'ESC arrière sur **MAIN 8**. Un **seul** ESC garde son fil rouge ; sortez le fil rouge des deux autres prises et scotchez-le en arrière.
- [ ] **B. 5 V de la PDB :** un câble depuis les pastilles **5 V** de la PDB vers une paire + / − libre du rail (ex. MAIN 7, broche signal vide). ⚠️ **Jamais le 12 V.**

## E. Tester les servos des ailes et de la queue (FBWA)

- [ ] **1.** Hélices retirées. Émetteur allumé, interrupteurs en haut, gaz en bas.
- [ ] **2.** USB branché, puis la LiPo.
- [ ] **3.** Maintenez le **bouton de sécurité** rouge (câble séparé, port **SWITCH**) 2 s jusqu'à ce que son voyant soit **fixe** (cela n'arme rien).
- [ ] **4.** **SWC en bas** (FBWA).
- [ ] **5.** **Q** → **Vehicle Configuration** → **Servo Outputs** : surveillez la colonne **Position**.
- [ ] **6.** Bougez les manches et vérifiez ([schémas](ref-stick-controls.md)) :

  | Mouvement | Ce qui doit se passer |
  |---|---|
  | Manche droit → droite | Aileron gauche vers le **bas**, aileron droit vers le **haut** |
  | Manche droit ↓ (tiré vers vous) | Les deux empennages vers le **haut** |
  | Manche gauche → droite | Empennage droit vers le **haut**, empennage gauche vers le **bas** |

- [ ] **7.** Mauvais sens ? **Servo Outputs** → cochez **Reversed** sur cette ligne → testez à nouveau.
- [ ] **8.** Inclinez l'avion à la main : aile droite vers le bas → aileron droit vers le **bas**, aileron gauche vers le **haut**. Nez vers le bas → les deux empennages vers le **haut**.

## F. Tester les servos de basculement

- [ ] **SWC au milieu** (QHOVER) → les deux moteurs avant pointent **droit vers le haut**.
- [ ] **SWC en bas** (FBWA) → les deux basculent **vers l'avant** lentement (~25°/s).
- [ ] **SWC au milieu** à nouveau → ils remontent (plus vite, ~80°/s).
- [ ] Guettez un **bourdonnement** en butée : notez quel moteur et quelle extrémité.

## G. Interrupteurs et modes ([étape 6](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#switches)) ✅ fait le 2026-10-18

- [ ] **1.** **Q** → **Vehicle Configuration** → **Radio** → *Channel Monitor* : manches 1–4, SWA 5, SWC 6.
- [ ] **2.** FlySky : maintenez **OK** → **Functions setup** → **Aux. channels** → **Channel 7** = **SwB** → maintenez **CANCEL**. La barre 7 bouge maintenant avec SWB.
- [ ] **3.** **Flight Modes** → *Switch Options* → **Channel option 7** = **RTL** (`RC7_OPTION` = 4). SWB en bas = retour au point de départ.
- [ ] **4.** **Parameters** → `Q_RTL_MODE` = **QRTL Always** (3) : rentre en drone, atterrit à la verticale.
- [ ] **5.** **Flight Modes** → **Flight Mode 1** et **2** = **QStabilize** (17). Valait QLand (impossible d'armer).
- [ ] **6.** **Parameters** → `ARMING_RUDDER` = **ArmOrDisarm** (2) : manche gauche ↓+→ 3 s arme, ↓+← 2 s désarme.
- [ ] **7.** **Parameters** → **Tools** → **Refresh** → **Tools** → **Save to file** → `params_after-switches.params`.

Résultat : **SWA** en bas = armer · **SWB** en bas = retour au point de départ · **SWC** haut QStabilize / milieu QHover / bas FBWA.

## H. Pourquoi les moteurs ne tournaient pas ([étape 7](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#prearm))

Le Pixhawk refuse de s'armer tant qu'une vérification *PreArm* échoue. Lisez les messages dans QGC (écran **Fly**, texte de la barre du haut).

- [x] `Hardware safety switch` → maintenez le bouton rouge (port **SWITCH**) 3 s jusqu'à voyant fixe. Se reverrouille à chaque redémarrage.
- [x] `QLand mode not armable` → Flight Mode 1/2 = QStabilize.
- [x] `QRTL mode not armable` → gardez **SWB en haut** pour armer.
- [x] `RC calibrating` → quittez la page **Radio**.
- [x] `Battery 1 low voltage failsafe` → branchez la LiPo.
- [x] `Compass not calibrated` → calibrée sur table (partie I).
- [x] `Logging failed` → microSD formatée en FAT32 (partie I).
- [x] `AHRS: not using configured AHRS type` → fix GPS nécessaire dehors ; sur table : `ARMING_SKIPCHK` = 16 (partie I).
- Bips des ESC quand désarmé = normal (« en attente des gaz »).

## I. Lever les blocages d'armement, sur table ([Étape 8](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#blockers)) ✅ fait le 2026-10-18

- [ ] **1.** microSD : formatez-la en **FAT32** sur l'ordinateur (≤ 32 Go ; au-delà : exFAT), remettez-la Pixhawk éteint → `Logging failed` disparaît.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Sensors** → **Compass** → **OK** → tournez l'avion lentement dans tous les sens jusqu'à **Completed** → **Reboot Vehicle** → gardez-le immobile 30 s.
- [ ] **3.** Barre de qualité jaune = OK sur table. À refaire dehors, loin du métal, pour le vert avant le premier vol.
- [ ] **4.** À l'intérieur seulement : **Parameters** → `ARMING_SKIPCHK` → cochez seulement **INS** (16) → **Save**. (`AHRS: not using configured AHRS type` = attente d'un fix GPS.)
- [ ] **5.** Branchez la LiPo → le message de tension basse disparaît.
- [ ] **6.** Bouton de sécurité (port **SWITCH**) : clignotant = verrouillé, fixe = déverrouillé. Maintenez 3 s. Se reverrouille à chaque redémarrage.
- [ ] **7.** QGC affiche **Ready To Fly**.

> ⚠️ **Sur table uniquement :** remettez `ARMING_SKIPCHK` à **0** avant tout vol.

## J. Calibration des ESC ([Étape 9](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#esc-cal)) ✅ fait le 2026-10-18

Pourquoi : chaque ESC apprend 1000 µs = arrêt, 2000 µs = plein gaz. Des ESC non calibrés tournent tout seuls ou semblent morts.

- [ ] **1.** Batterie **débranchée**, USB seul, **hélices retirées**.
- [ ] **2.** **Parameters** → `Q_ESC_CAL` = **1** → **Save**.
- [ ] **3.** **Parameters** → `ARMING_SKIPCHK` = **400** (INS 16 + Board voltage 128 + Battery level 256) → **Save**.
- [ ] **4.** SWC **en haut** (QStabilize). Bouton de sécurité jusqu'à voyant **fixe**. SWA **en bas** → **Armed**.
- [ ] **5.** Manche gauche **tout en haut**. Branchez la batterie → **2 bips** (plein gaz enregistré).
- [ ] **6.** Dans les ~2 s : manche gauche **tout en bas** → **3 bips courts + 1 long** (arrêt enregistré).
- [ ] **7.** SWA **en haut**. Rétablir : `Q_ESC_CAL` = **0**, `ARMING_SKIPCHK` = **16**.

## K. Modes et basculement expliqués ([Étape 10](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#modes))

| SWC | Mode | Vole comme | Moteurs avant |
|---|---|---|---|
| En haut | **QStabilize** | Drone | 90° vers le haut |
| Milieu | **QHover** | Drone | 90° vers le haut |
| En bas | **FBWA** | Avion | Basculent vers l'avant |

- FBWA sur table : le passage en mode avion (transition) commence (`Transition started airspeed 0.0`) mais ne se termine jamais sans GPS/vitesse air. Le basculement suit les gaz (jusqu'à `Q_TILT_MAX` 70°) et le moteur arrière continue de tourner. Normal (partie P). `Q_ASSIST_SPEED` vaut maintenant **5** (avant 10).
- Modes drone, armé : 90° plus de petits basculements de lacet jusqu'à ±5° (`Q_TILT_YAW_ANGLE`, avant ±10°, partie N). Plus grands à bas régime (×2), plus petits à haut régime (×0,5). Désarmé : immobiles à 90°. Indispensable pour le lacet.
- [ ] Test à la main : armé, QStabilize, gaz bas, hélices retirées. Tournez le nez à la main → les moteurs avant basculent en sens opposés.

## L. Retour au point de départ avec SWB ([Étape 11](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#swb))

- **SWB en bas** → QRTL (`Q_RTL_MODE` = 3) : monte à `Q_RTL_ALT` 20 m, rentre en drone au point d'armement, atterrit verticalement, se désarme.
- **SWB en haut** → vous reprenez la main.
- Nécessite un fix GPS (dehors). La perte du signal radio est séparée : il atterrit sur place (QLand, partie M).

## M. Failsafe radio au démarrage ([étape 12](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#rc-failsafe))

Vu : `Throttle failsafe on`, `RC Short/Long Failsafe: switched to QLand`, `Radio failsafe on`, `QLand mode not armable` = l'émetteur était **ÉTEINT**.

- [ ] **1.** Émetteur **ALLUMÉ en premier** (interrupteurs en haut, gaz en bas), **puis** branchez l'avion.
- [ ] **2.** Voyant du récepteur : **rouge fixe** = lié, **clignotant** = pas de liaison.
- [ ] **3.** À la fin : débranchez l'avion **d'abord**, **puis** éteignez l'émetteur.
- [ ] **4.** Si c'est arrivé : radio revenue → `Throttle failsafe off` / `RC Long Failsafe Cleared` → **SWC au milieu**, puis de nouveau **en haut** → QStabilize.

## N. Servos de basculement avant ([étape 13](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#tilt)) ✅ résolu : ils fonctionnaient à l'envers

Modifié plus tôt, enregistré dans [`params_after-tilt-changes.params`](../../backups/params_after-tilt-changes.params) : `SERVO9_MAX` 1940 → **1900**, `SERVO10_MIN` 700 → **800**, `SERVO10_MAX` 2100 → **2000**, `Q_TILT_YAW_ANGLE` 10 → **5**, `Q_M_THST_HOVER` 0,479 → **0,37**.

- Ce que le Pixhawk doit faire (code ArduPilot 4.7.2) : QStabilize/QHover = les deux basculements **verticaux**, seul le basculement de lacet les bouge (±`Q_TILT_YAW_ANGLE`, jusqu'à ×2 à gaz bas). FBWA sur table = la transition ne se termine jamais ; le basculement suit les gaz jusqu'à `Q_TILT_MAX` 70°.
- **Cause (22:40) :** les deux servos de basculement fonctionnaient à l'envers. QStabilize : commande « verticale » (ligne 9 ≈ 1843, ligne 10 ≈ 852) mais moteurs vers l'avant. FBWA : moteurs qui se redressaient vers la verticale avec les gaz.

- [x] **1.** **Q** → **Vehicle Configuration** → **Servo Outputs**.
- [x] **2.** Ligne **9** : décochez **Reversed** (`SERVO9_REVERSED` 1 → 0).
- [x] **3.** Ligne **10** : cochez **Reversed** (`SERVO10_REVERSED` 0 → 1).
- [x] **4.** Vérifiez : SWC **en haut** et **au milieu** = moteurs droits, SWC **en bas** = vers l'avant. ✅ confirmé.
- [ ] **5.** Facultatif : affinez les butées verticale et avant (~10 µs ≈ 1°).
- [ ] **6.** **Parameters** → **Tools** → **Refresh** → **Tools** → **Save to file** → nouvelle sauvegarde.

Gains de lacet remis aux valeurs par défaut d'ArduPilot (anciens beaucoup trop élevés), enregistrés dans [`params_now.params`](../../backups/params_now.params) : `Q_A_RAT_YAW_P` 1,2 → **0,18**, `Q_A_RAT_YAW_I` 0,6 → **0,018**, `Q_A_RAT_YAW_D` 0,15 → **0**, FF reste 0,1. Réglage fin plus tard à partir des journaux de vol.

💾 Sauvegardes : [`params_now.params`](../../backups/params_now.params) (lacet par défaut, gyroscopes valides) → [`params_latest1.params`](../../backups/params_latest1.params) (emplacements Manual, `Q_ASSIST_SPEED` 5) → [`params_latest2.params`](../../backups/params_latest2.params) (emplacements corrigés) = **la plus récente**. Inversion du basculement pas encore sauvegardée.

## O. Emplacements de modes de vol corrigés ([étape 14](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#fltmodes)) ✅

Dans `params_latest1.params`, les Flight Mode 2, 3, 5 étaient devenus **Manual** (0), probablement par accident. Manual = mode avion brut, sans stabilisation.

- [x] **Q** → **Vehicle Configuration** → **Flight Modes** :

  | Emplacement | PWM CH6 (µs) | Mode | SWC |
  |---|---|---|---|
  | 1 | 0–1230 | **QStabilize** | En haut |
  | 2 | 1231–1360 | **QStabilize** | |
  | 3 | 1361–1490 | **QHover** | |
  | 4 | 1491–1620 | **QHover** | Milieu |
  | 5 | 1621–1749 | **FBWA** | |
  | 6 | 1750+ | **FBWA** | En bas |

- [x] Vérifié dans `params_latest2.params` : SWC en haut / milieu / en bas = emplacements 1 / 4 / 6.

## P. Comportements du test sur table expliqués ([étape 15](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#desk))

| Vous voyez | Pourquoi → à faire |
|---|---|
| a. Armé sur table, un moteur fort, un autre presque arrêté (lignes 5/6/8 = 1835/1150/1664) | Le Pixhawk essaie d'équilibrer un avion immobile. Normal. Jugez les moteurs un par un plus tard (test moteur). |
| b. SWA déjà en haut ne fait rien | Armé au manche gauche (`ARMING_RUDDER` = 2). SWA n'agit que quand on le bascule : en bas, puis en haut. Prévu : `ARMING_RUDDER` → **0** (SWA seul), votre décision. |
| c. Un moteur tressaute/tourne lentement après désarmement | Désarmé = 1000 µs « stop », un ESC peut encore tressauter. Prévu : `Q_M_SAFE_DISARM` → **1** (aucun signal ; l'ESC peut biper, sans danger ; servos non concernés). En attente. |
| d. Moteur arrière qui tourne en FBWA sur table | La transition ne se termine qu'au-dessus de la vitesse air minimale (GPS dehors). S'arrête en vrai vol. `Q_ASSIST_SPEED` 10 → **5**. Vérification : désarmez dans un mode Q, passez en FBWA désarmé, armez en FBWA → le moteur arrière devrait rester arrêté. |
| e. Gyroscopes à 0 dans une sauvegarde | L'avion a bougé au démarrage. Immobile ~15 s jusqu'à **ArduPilot Ready**. |
| f. `Q_M_THST_HOVER` change (0,32 → 0,57 → 0,51) | Appris sur table. Mettez ≈ **0,37** juste avant le premier vol stationnaire. |

## Q. Reste à faire

- [ ] Enregistrer une nouvelle sauvegarde avec la correction du basculement (partie N)
- [ ] Facultatif : affiner les butées de basculement
- [ ] Vérification sur table : armer en FBWA → moteur arrière arrêté (partie P d)
- [ ] Décider `ARMING_RUDDER` = 0 (SWA seul)
- [ ] `Q_M_SAFE_DISARM` = 1
- [ ] Test moteur, un moteur à la fois (hélices retirées)
- [ ] Sens de rotation de chaque moteur
- [ ] Refaire la boussole dehors pour le vert
- [ ] Vérification de SWB dehors : le mode de vol affiche QRTL
- [ ] `ARMING_SKIPCHK` = 0 avant tout vol
- [x] Sens du basculement corrigé (ligne 9 Reversed décoché, ligne 10 coché)
- [x] Emplacements de modes de vol corrigés → `params_latest2.params`
- [x] Gains de lacet par défaut → `params_now.params`

## R. Liste de vérification avant vol ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` remis à **0**
- [ ] `Q_M_THST_HOVER` ≈ **0,37** avant le premier vol stationnaire (le Pixhawk le réapprend)
- [ ] `Q_ASSIST_SPEED` = **5**
- [ ] Basculement : SWC en haut = droits, SWC en bas = vers l'avant
- [ ] Avion immobile ~15 s après la mise sous tension (**ArduPilot Ready**)
- [ ] Boussole refaite dehors, **verte**
- [ ] Émetteur **allumé en premier**, puis l'avion
- [ ] Bouton de sécurité **fixe**
- [ ] Hélices sur les bons moteurs
- [ ] SWB testé dehors (QRTL affiché)

## ✅ Terminé quand

- Chaque gouverne bouge dans le bon sens en FBWA.
- Les servos de basculement pointent vers le haut en QHOVER, vers l'avant en FBWA, sans bourdonnement.
- Le Pixhawk s'arme et les 3 moteurs tournent ensemble (hélices retirées).
- Vous avez envoyé : photo de la rangée de broches, prises ESC à 3 ou 2 fils, option A ou B pour le rail, résultats.

## Problèmes

| Vous voyez | À faire |
|---|---|
| Rien ne bouge, mais les valeurs Position changent | Pas de 5 V sur le rail. Vérifiez la partie D. |
| Les valeurs Position ne changent pas | Voyant du bouton de sécurité pas fixe. Maintenez-le de nouveau. |
| Une gouverne va dans le mauvais sens | **Servo Outputs** → cochez **Reversed** sur cette ligne |
| Un servo de basculement bourdonne à une extrémité | Il touche une butée. Laissez les limites à 1100–1900 et indiquez quel moteur et quelle extrémité. |
| Un servo tressaute ou saute | Prise à l'envers ? Le signal (orange/jaune) doit être en haut. |
| Les servos se réinitialisent ou faiblissent quand ils bougent ensemble | Alimentation du rail trop faible. Utilisez un UBEC 5–6 V de 3 A ou plus. |
| Les gaz ne font rien | Pixhawk non armé. Lisez le message PreArm (partie H). |
| `QRTL mode not armable` | SWB est en bas. Remontez-le. |
| `Logging failed` | Formatez la microSD en FAT32 (partie I). |
| `AHRS: not using configured AHRS type` | Dehors : attendez un fix GPS. Sur table : `ARMING_SKIPCHK` = 16 (partie I). |
| Les moteurs tournent tout seuls ou l'un semble mort | Calibration des ESC (partie J). |
| Basculement qui bouge / moteur arrière qui tourne en FBWA sur table | La transition ne peut pas se terminer sur table, normal (parties K, P). |
| Les moteurs avant remuent en mode drone, armé | Basculement de lacet, normal (partie K). |
| `Radio failsafe on`, `QLand mode not armable` à la mise sous tension | L'émetteur était éteint. Émetteur allumé en premier, puis SWC milieu → haut (partie M). |
| Moteurs vers l'avant en QStabilize, qui se redressent en FBWA | Servos de basculement à l'envers : inversez **Reversed** sur les lignes 9 et 10 (partie N). |
| Un moteur fort, un autre presque arrêté, armé sur table | Équilibrage normal (partie P). |
| SWA en haut ne désarme pas | Armé au manche : basculez SWA en bas puis en haut (partie P). |
| Le mode de vol affiche Manual | Emplacements Flight Mode faux (partie O). |

---
© 2026 bellocloud.com
