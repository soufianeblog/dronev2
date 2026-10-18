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

- FBWA sur table : les moteurs basculants bougent car Q-Assist (`Q_ASSIST_SPEED` = 10 m/s) voit une vitesse air de 0 (`Transition started airspeed 0.0`). Normal.
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

## N. Servos de basculement avant en mode drone ([étape 13](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#tilt)) ⚠️ problème ouvert

Modifié sur l'appareil (**Q** → **Vehicle Configuration** → **Parameters**), enregistré dans [`params_after-tilt-changes.params`](../../backups/params_after-tilt-changes.params) :

| Paramètre | Ancien | Nouveau |
|---|---|---|
| `SERVO9_MAX` (avant gauche, inversé) | 1940 | **1900** (MIN 800 inchangé) |
| `SERVO10_MIN` (avant droit) | 700 | **800** |
| `SERVO10_MAX` (avant droit) | 2100 | **2000** |
| `Q_TILT_YAW_ANGLE` | 10 | **5** (basculement de direction plus petit) |
| `Q_M_THST_HOVER` | 0,479 | **0,37** (valeur apprise sur table remise à zéro) |

- [x] Désarmé, QStabilize : **Q** → **Vehicle Configuration** → **Servo Outputs** → ligne 9 = **1847**, ligne 10 = **857** = la commande « verticale » du Pixhawk pour les deux (valeurs en miroir). Les deux moteurs bien droits.
- ~10 µs ≈ 1°. Extrémité « haut » de l'avant gauche = `SERVO9_MAX` (inversé). Extrémité « haut » de l'avant droit = `SERVO10_MIN`.
- **Problème ouvert :** armé en mode drone, gaz bas → moteurs avant pas à 90° ; gaz élevés → retour à 90°. Attendu : toujours 90°. En cours de recherche (code et documentation ArduPilot) ; la correction sera ajoutée ici. Cause non confirmée.
- Certain : en QStabilize/QHover le basculement de base est commandé vertical (`Q_FWD_THR_USE` = 0). Le basculement de lacet (vectored yaw) est multiplié par gaz de vol stationnaire ÷ gaz (×2 bas, ×0,5 haut) : principal suspect.

💾 Sauvegarde : [`params_after-esc-cal.params`](../../backups/params_after-esc-cal.params). `Q_M_THST_HOVER` 0,369 → 0,479 a été appris sur table : à surveiller avant le premier vol stationnaire. Sauvegarde plus récente avec les modifications de la partie N : [`params_after-tilt-changes.params`](../../backups/params_after-tilt-changes.params).

## O. Reste à faire

- [ ] Test des gaz (hélices retirées) : moteur arrière et deuxième moteur avant se comportent comme les autres
- [ ] Sens de rotation de chaque moteur
- [ ] Résoudre le problème basculement/gaz (partie N)
- [x] Enregistrer une nouvelle sauvegarde après les modifications de basculement → `params_after-tilt-changes.params`
- [ ] Refaire la boussole dehors pour le vert
- [ ] `ARMING_SKIPCHK` = 0 avant tout vol
- [ ] Vérification de SWB dehors : le mode de vol affiche QRTL

## P. Liste de vérification avant vol ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` remis à **0**
- [ ] `Q_M_THST_HOVER` ≈ **0,37** avant le premier vol stationnaire (le Pixhawk le réapprend)
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
| Les moteurs basculants bougent en FBWA sur table | Q-Assist, normal (partie K). |
| Les moteurs avant remuent en mode drone, armé | Basculement de lacet, normal (partie K). |
| `Radio failsafe on`, `QLand mode not armable` à la mise sous tension | L'émetteur était éteint. Émetteur allumé en premier, puis SWC milieu → haut (partie M). |
| Moteurs avant pas à 90° à gaz bas, armé | Problème ouvert, en cours de recherche (partie N). |

---
© 2026 bellocloud.com
