# 06 · Sorties : brancher et tester les servos (puis les moteurs)

[English](../../quick/06-outputs-servo-test.md) · **Français** · [العربية](../../ar/quick/06-outputs-servo-test.md)

[← 04](04-radio-modes-arming.md) · [Sommaire](README.md) · Suivant : 07 ⏳ · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html)

**Objectif :** chaque servo et chaque ESC sur la bonne sortie, interrupteurs réglés, chaque mode testé sur table.
**Il vous faut :** [04](04-radio-modes-arming.md) terminé. **Hélices RETIRÉES** sur les 3 moteurs. LiPo seulement quand une étape le demande.

**État actuel :** ✅ toutes les sorties bougent · ✅ interrupteurs réglés · ✅ s'arme sur table · ✅ ESC calibrés · ✅ basculement correct dans les 3 modes. ⏳ Le moteur arrière continue de tourner en FBWA sur table (en cours d'analyse) · test moteur par moteur · sens de rotation · boussole à refaire dehors · test de SWB dehors.
💾 Dernière sauvegarde : [`params_latest2.params`](../../backups/params_latest2.params). La correction du basculement (`SERVO9_REVERSED` 0, `SERVO10_REVERSED` 1) n'y est pas encore : enregistrez-en une nouvelle.

## Où tout se branche

| Sortie | Brancher | Plage (µs) | Reversed |
|---|---|---|---|
| **MAIN 1** | Servo d'aileron gauche | 1100–1900 | non |
| **MAIN 2** | Servo d'aileron droit | 1000–2000 | non |
| **MAIN 3** | Servo de l'empennage gauche | 1000–2000 | non |
| **MAIN 4** | Servo de l'empennage droit | 1000–2000 | non |
| **MAIN 5** | ESC, moteur avant **droit** (M1) | 1000–2000 | non |
| **MAIN 6** | ESC, moteur avant **gauche** (M2) | 1000–2000 | non |
| MAIN 7 | **Laisser vide** | | |
| **MAIN 8** | ESC, moteur arrière (M4) | 1000–2000 | non |
| **AUX 1** | Servo de basculement, avant **gauche** | **800–1900** | **non** |
| **AUX 2** | Servo de basculement, avant **droit** | **800–2000** | **oui** |

Gauche/droite = assis dans l'avion, en regardant vers l'avant.

## A. Câblage ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#wiring))

- [ ] **1.** Débranchez l'**USB** et la **LiPo**.
- [ ] **2.** Chaque prise : **signal (orange/jaune) en haut**, rouge au milieu, **marron/noir en bas**.
- [ ] **3.** Branchez tout comme dans le tableau.
- [ ] **4.** Fil rouge d'ESC seulement sur **MAIN 8** (arrière). Sortez-le des prises MAIN 5 et 6 et isolez-le.
- [ ] **5.** Alimentation du rail servo : fil rouge de l'ESC arrière, **ou** **5 V** de la PDB vers une paire +/− libre. ⚠️ **Jamais 12 V.**

## B. Émetteur et interrupteurs ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#switches))

| Commande | Fait |
|---|---|
| **SWA** | Bas = armer · haut = désarmer (seulement quand on le bascule) |
| **SWB** | Bas = retour au départ en drone (QRTL) · haut = retour au mode de SWC |
| **SWC** | Haut = **QStabilize** (drone, gaz directs) · milieu = **QHover** (drone, garde la hauteur) · bas = **FBWA** (avion avec filet de sécurité) |
| Manche gauche ↓+→ 3 s / ↓+← 2 s | Armer / désarmer |

- [ ] **1.** FlySky : maintenez **OK** → **Functions setup** → **Aux. channels** → **Channel 7** = **SwB** → maintenez **CANCEL**.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Radio** → *Channel Monitor* : la barre 7 bouge avec SWB. Quittez la page.
- [ ] **3.** **Q** → **Vehicle Configuration** → **Flight Modes** : emplacements 1–2 **QStabilize**, 3–4 **QHover**, 5–6 **FBWA**. Pas de Manual, pas de QLand.
- [ ] **4.** Même page → *Switch Options* → **Channel option 7** = **RTL**.

## C. Paramètres à vérifier ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#settings))

**Q** → **Vehicle Configuration** → **Parameters** (attendez 30 s après la mise sous tension, **Tools** → **Refresh**). Cherchez → cliquez → tapez → **Save**.

| Paramètre | Valeur | Signifie |
|---|---|---|
| `RC7_OPTION` | 4 | SWB = retour au départ |
| `Q_RTL_MODE` | 3 | Retour au départ en drone |
| `FLTMODE1`…`6` | 17, 17, 18, 18, 5, 5 | SWC haut / milieu / bas |
| `ARMING_RUDDER` | 2 | Armement au manche activé |
| `ARMING_SKIPCHK` | 16 | Saute le contrôle GPS en intérieur. **0 avant de voler** |
| `Q_ESC_CAL` | 0 | Normal (1 seulement pour la calibration des ESC) |
| `Q_TILT_YAW_ANGLE` | 5 | Basculement pour tourner le nez (±°) |
| `Q_A_RAT_YAW_P` / `I` / `D` | 0.18 / 0.018 / 0 | Gains de rotation du nez, défauts ArduPilot |
| `Q_ASSIST_SPEED` | 5 | Les moteurs drone aident sous cette vitesse air (m/s) |
| `SERVO9_MIN` / `MAX` / `REVERSED` | 800 / 1900 / **0** | Basculement avant gauche |
| `SERVO10_MIN` / `MAX` / `REVERSED` | 800 / 2000 / **1** | Basculement avant droit |
| `Q_M_THST_HOVER` | appris (0.51) | Gaz de vol stationnaire. ≈ **0.37** avant le premier vol stationnaire |

- [ ] Toutes les valeurs correspondent.

## D. Calibrations ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#blockers))

- [ ] **1.** microSD : formatez en **FAT32** (≤ 32 Go ; plus grande : exFAT), insérez-la Pixhawk éteint.
- [ ] **2.** **Q** → **Vehicle Configuration** → **Sensors** → **Compass** → **OK** → tournez l'avion dans tous les sens jusqu'à **Completed** → **Parameters** → **Tools** → **Reboot Vehicle**. Jaune = OK sur table ; refaire dehors pour le vert.
- [ ] **3.** Après chaque mise sous tension : immobile **15 s** (jusqu'à **ArduPilot Ready**).
- [ ] **4.** Calibration des ESC ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#esc-cal)) : batterie débranchée, USB seulement, hélices retirées → `Q_ESC_CAL` = **1**, `ARMING_SKIPCHK` = **400** → SWC en haut, sécurité fixe, SWA en bas (**Armed**) → manche gauche **tout en haut** → branchez la batterie (**2 bips**) → dans les 2 s manche **tout en bas** (**3 courts + 1 long**) → SWA en haut → `Q_ESC_CAL` = **0**, `ARMING_SKIPCHK` = **16**.

## E. Liste d'armement ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#arming))

- [ ] **1.** Émetteur **allumé en premier** (interrupteurs en haut, gaz en bas). Lumière du récepteur rouge fixe.
- [ ] **2.** Branchez l'avion. Immobile **15 s**.
- [ ] **3.** Bouton de sécurité (port **SWITCH**) : maintenez **3 s** jusqu'à **fixe** (clignotant = verrouillé ; se reverrouille à chaque redémarrage).
- [ ] **4.** QGC affiche **Ready To Fly**. SWB en haut.
- [ ] **5.** SWA en **bas** → **Armed**.
- [ ] **6.** Fin : SWA en haut, débranchez l'avion d'abord, puis éteignez l'émetteur.

## F. Tester chaque mode, hélices retirées ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#modes))

| SWC | Barre du haut | Moteurs avant | Gaz |
|---|---|---|---|
| Haut | QStabilize | Droit vers le haut | Directs |
| Milieu | QHover | Droit vers le haut | Garde la hauteur |
| Bas | FBWA | Vers l'avant | Sur table : le basculement suit les gaz (jusqu'à 70°) |

- [ ] **1.** Les 3 lignes sont correctes ✅. Basculement à l'envers ? **Servo Outputs** → inversez **Reversed** sur les lignes 9 et 10 (final : 9 décoché, 10 coché).
- [ ] **2.** FBWA : manche droit → droite = aileron gauche en bas, aileron droit en haut. Manche droit tiré = les deux empennages en haut. Manche gauche → droite = empennage droit en haut, gauche en bas.
- [ ] **3.** Gouverne dans le mauvais sens ? **Servo Outputs** → cochez **Reversed** sur sa ligne.
- [ ] **4.** Lignes de Servo Outputs : 5, 6, 8 = moteurs ; 9, 10 = basculements. Vérifiez les moteurs à l'œil : vers le haut en modes Q, vers l'avant en FBWA.

## G. Normal sur table ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#desk))

| Vous voyez | Pourquoi |
|---|---|
| Armé : un moteur rapide, un presque arrêté | Équilibre d'un avion qui ne peut pas bouger. Normal |
| Les moteurs avant basculent plus à gaz bas | Basculement du nez ×2 à gaz bas. Normal |
| SWA déjà en haut ne fait rien | Armé au manche. Basculez SWA en bas, puis en haut |
| Un moteur tressaute après le désarmement | 1000 µs « arrêt » encore envoyé. Option : `Q_M_SAFE_DISARM` = 1 (en attente) |
| Le moteur arrière tourne en FBWA | Le passage en avion ne peut pas se terminer en intérieur. ⏳ En cours d'analyse |
| `Q_M_THST_HOVER` change | Appris sur table. ≈ 0.37 avant le premier vol stationnaire |
| Les ESC bipent | En attente des gaz. Normal |

## H. Liste avant vol ([détails](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#preflight))

- [ ] `ARMING_SKIPCHK` remis à **0**
- [ ] `Q_M_THST_HOVER` ≈ **0.37**
- [ ] `Q_ASSIST_SPEED` = **5**
- [ ] Nouvelle sauvegarde avec la correction du basculement
- [ ] Basculement : SWC en haut = droit vers le haut, SWC en bas = vers l'avant
- [ ] Boussole refaite dehors, **verte**
- [ ] Émetteur **allumé en premier**, puis l'avion
- [ ] Avion immobile ~15 s (**ArduPilot Ready**)
- [ ] Bouton de sécurité **fixe**
- [ ] Hélices sur les bons moteurs
- [ ] SWB testé dehors (QRTL affiché)

## ✅ Terminé quand

- Chaque gouverne bouge dans le bon sens en FBWA.
- Le basculement pointe vers le haut en QStabilize/QHover, vers l'avant en FBWA.
- Le Pixhawk s'arme et chaque moteur tourne dans le bon sens (hélices retirées).

## Problèmes

| Vous voyez | Faites ceci |
|---|---|
| Rien ne bouge | Pas de 5 V sur le rail (partie A) ou bouton de sécurité pas fixe |
| Un servo tressaute | Prise à l'envers : signal en haut |
| Les gaz ne font rien | Pas armé : lisez le message PreArm (écran **Fly**, barre du haut) |
| `Hardware safety switch` | Maintenez le bouton de sécurité 3 s |
| `QLand mode not armable` | Emplacement 1/2 pas en QStabilize, ou failsafe radio : SWC milieu → haut |
| `QRTL mode not armable` | SWB en haut |
| `RC calibrating` | Quittez la page Radio |
| `Radio failsafe on` / `Throttle failsafe on` | Émetteur d'abord, puis SWC milieu → haut |
| `Battery 1 low voltage failsafe` | Branchez une LiPo chargée |
| `Compass not calibrated` | Partie D, étape 2 |
| `AHRS: not using configured AHRS type` | Dehors : attendez le GPS. Dedans : `ARMING_SKIPCHK` = 16 |
| `Logging failed` | Formatez la microSD (partie D) |
| `Board (4.2v) out of range` | USB seulement : branchez la LiPo |
| Les moteurs tournent seuls / un semble mort | Calibration des ESC (partie D) |
| Moteurs vers l'avant en QStabilize, se redressent en FBWA | Inversez **Reversed** sur les lignes 9 et 10 |
| Le mode de vol affiche Manual | Corrigez les emplacements Flight Mode (partie B) |

---
© 2026 bellocloud.com
