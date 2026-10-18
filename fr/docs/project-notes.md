# Notes du projet (fichier de travail)

[English](../../docs/project-notes.md) · **Français** · [العربية](../../ar/docs/project-notes.md)


Notes internes de ce projet : notre méthode de travail, les faits vérifiés, le journal complet d'avancement et les questions ouvertes.
La présentation publique est le [README](../README.md).

**Sommaire :** [Règles de travail](#règles-de-travail) · [Faits connus](#faits-connus-vérifiés-sur-le-matériel-réel) · [Feuille de route](#feuille-de-route-guides-prévus--peut-évoluer-au-fil-de-lapprentissage) · [Journal d'avancement](#journal-davancement) · [Questions ouvertes](#questions-ouvertes)

## Firmwares cibles

- **ArduPilot ArduPlane** : déjà utilisé sur ce projet auparavant (avec Mission Planner). Pas ArduCopter, pas PX4.
- **"QuadPlane"** est le nom donné par ArduPlane à sa **fonction VTOL**. Cela ne signifie **pas** 4 moteurs. Cela ajoute le décollage et l'atterrissage verticaux avec des moteurs de sustentation dans n'importe quelle disposition, y compris **tricoptère** et **rotors basculants**.
- Notre configuration est un **QuadPlane tricoptère à rotors basculants**. Valeurs cibles ci-dessous ; elles sont réglées dans les guides suivants :

| Paramètre | Cible | Signification |
|---|---|---|
| `Q_ENABLE` | 1 | Activer le VTOL (QuadPlane) |
| `Q_FRAME_CLASS` | 7 | Tricoptère (3 moteurs de sustentation) |
| `Q_TILT_ENABLE` | 1 | Certains moteurs basculent |
| `Q_TILT_MASK` | 3 | Les moteurs 1 + 2 (les deux moteurs avant) basculent |
| `Q_TILT_TYPE` | **2 = VectoredYaw** ✅ (réglé) | Les servos de bascule gauche et droit bougent séparément pour contrôler le lacet |

## Logiciels

- ~~Mission Planner 1.3.83~~ — **abandonné** (il servait auparavant à configurer ArduPlane)
- **QGroundControl 5.1.5 sous macOS** — on repart de zéro
- **Firmware :** **ArduPlane 4.7.2** (git fb773567), mis à jour dans le Guide 02 en conservant les anciens paramètres.

## État actuel (au 2026-10-17)

- Branché sur le Pixhawk (photos 2026-10-17 02:17) : **USB, POWER (module d'alimentation), GPS + I2C (GPS M8N avec boussole), BUZZER, SWITCH (interrupteur de sécurité), RC IN** → **récepteur FlySky iA10B** via une carte **encodeur PPM** (confirmé à 19:27 ; i6X Output mode PWM). **Les sorties MAIN/AUX sont vides** (pas encore d'ESC ni de servos). La carte est à plat, LED vers le haut, sur une plaque de test.
- L'appareil n'a **jamais volé** avec l'ancienne configuration.
- QGroundControl est installé et s'ouvre. Les préférences sont réglées sur Firmware = ArduPilot, Vehicle = VTOL, unités métriques.
- Le FlySky i6X a été configuré à l'aide de [cette vidéo](https://www.youtube.com/watch?v=nyLM1hCG9Q8).
- **Problème principal :** nous ne savons pas comment câbler correctement l'ensemble au Pixhawk.

## Objectifs

1. Configurer correctement QGroundControl.
2. Choisir, installer et vérifier le **bon firmware** pour cette cellule.
3. Savoir **tout câbler** (alimentation, ESC, servos, récepteur, GPS, buzzer, interrupteur de sécurité).
4. Brancher le **FlySky i6X / iA10B**, le calibrer et le tester.
5. Comprendre les **connexions** du Pixhawk (USB vers le Mac, télémétrie, ports).
6. Obtenir une configuration fonctionnelle à travers la calibration, les modes, la transition drone-avion et les failsafes, puis les tests au banc et un premier vol stationnaire.

---

## Règles de travail

### 1. Une étape à la fois, un guide HTML par étape
- Chaque étape est un **fichier HTML séparé** dans `guides/`.
- Nom de fichier : `guide-NN_YYYY-MM-DD_HHMM_short-topic.html` (par exemple `guide-01_2026-10-17_0113_connect-and-check-arduplane.html`). Si un guide est révisé, il garde son numéro et affiche une date/heure **Rev N**.
- Chaque guide affiche son **numéro de guide** et sa **date/heure de création** en haut.
- Ouvrez un guide en double-cliquant dessus (il s'ouvre dans Safari ou Chrome). Les guides fonctionnent hors ligne.

### 2. Vous faites le travail, les guides expliquent
- Les guides **ne modifient jamais automatiquement votre matériel, votre firmware ou vos paramètres** : pas de scripts, pas de connexion MAVLink, pas de fermeture de QGC. Chaque modification est rédigée sous forme d'instruction et c'est vous qui l'appliquez (confirmé par l'utilisateur le 2026-10-17).
- Chaque guide se termine par une section **"Report back"** qui liste exactement ce qu'il faut envoyer.
- **Privilégier les fichiers aux questions :** le Pixhawk en direct ne peut être lu que via QGC, donc au lieu de valeurs isolées on utilise un **fichier de paramètres** (Parameters → Tools → Save to file → `backups/`) ainsi que les **Vehicle Messages**, et on lit tout à partir de ceux-ci.
- Le guide suivant n'est rédigé **qu'après** votre retour, afin que chaque guide s'appuie sur ce qui s'est réellement passé.

### 3. Les faits d'abord
- Les instructions s'appuient sur la **documentation officielle** (ardupilot.org, docs.qgroundcontrol.com, manuels FlySky) et sont recoupées avec des sources communautaires (forum ArduPilot, RCGroups) si nécessaire.
- Chaque guide comporte une section **Sources** avec des liens.
- Quand quelque chose est incertain (par exemple des différences entre cartes clones), le guide le dit et inclut une vérification pour le confirmer.

### 4. La sécurité n'est pas négociable
- **Hélices RETIRÉES** pour toute la configuration et les tests au banc jusqu'au guide qui dit le contraire.
- **Aucune LiPo branchée** sauf si le guide le demande.
- Chaque guide commence par un court encadré de sécurité.

### 4b. Des mots simples : chaque action est détaillée
- Chaque guide donne le **chemin de clic exact** (p. ex. *Q icon → Vehicle Configuration → Sensors → Accelerometer*). Aucune étape ne dit seulement « allez dans X ».
- **Reboot** signifie toujours *redémarrer le Pixhawk* : le bouton **Reboot Vehicle** (page Sensors, ou Parameters → Tools → Reboot Vehicle), ou débrancher/rebrancher l'USB, puis 30 s sans bouger l'avion. Chaque guide renvoie vers cette explication.

### 5. Format des guides
1. En-tête : numéro du guide, date/heure, objectif de l'étape, durée estimée
2. Encadré de sécurité
3. Ce qu'il vous faut (pièces et outils)
4. Étapes numérotées, avec le résultat attendu après chaque étape (« vous devriez voir… »)
5. Dépannage (« si vous voyez X, faites Y »)
6. Check-list de retour (Report back)
7. Sources

### 6. Mémoire du projet : toujours à jour
- **Chaque fois que vous signalez quelque chose** (une capture d'écran, des messages, une valeur, une correction), les fichiers du projet sont mis à jour : **les deux** :
  1. **Ce fichier de notes** (`docs/project-notes.md`) : le tableau **Faits connus**, le statut de la **Feuille de route**, le **Journal d'avancement** (avec date/heure) et les **Questions ouvertes**. Le [README](../README.md) public ne conserve que la présentation et le tableau d'état.
  2. **Le guide en cours** : une nouvelle **Rev N** avec date/heure, une pastille de statut (quelles étapes sont faites), un encadré ✅ sur les étapes terminées, une section **Results** expliquant ce qui a été constaté, et la liste **Report back** (éléments faits barrés, nouvelles questions ajoutées).
- Les guides qui parcourent les menus d'un appareil tiennent un **tableau de suivi des réglages** (réglage → résultat → modifié ? → signification), mis à jour après chaque étape.
- Les erreurs dans le texte des guides précédents sont **corrigées ouvertement** (marquées « Correction »), jamais supprimées en silence.
- Ce fichier de notes est la **source de vérité unique** pour les faits et l'historique. Le README est la présentation publique épurée. Les guides contiennent les résultats détaillés étape par étape, et `quick/` contient les listes de tâches courtes.
- Les captures d'écran et journaux que vous partagez vont dans `guides/guideN_screenshots/` (résultats du guide N), renommés en `what_YYYY-MM-DD_HHMM.png`. Les journaux texte collés y sont enregistrés en `.txt`.

---

## Faits connus (vérifiés sur le matériel réel)

| Élément | Valeur | Source / quand |
|---|---|---|
| Firmware | **ArduPlane V4.7.2** (fb773567), ChibiOS d103983f (était 4.7.1 dbe79216) | Messages de démarrage, 2026-10-17 02:44 |
| Dernière version stable | **ArduPlane 4.7.2**, git `fb773567` = installée ✅ | Fenêtre QGC + vérification sur le serveur ArduPilot, 02:25 |
| Cible de la carte | **`Pixhawk1`** : build complet 2 MB, **pas de limite de flash à 1 MB** | Message de démarrage `Pixhawk1 00200035 3238510A 32373737` |
| Processeur IO | Fonctionne (`IOMCU: 420 1001 411FC231`), pilote MAIN OUT | Messages de démarrage |
| Sorties | `RCOut: PWM:1-14` : MAIN 1–8 + AUX 1–6 toutes en PWM | Messages de démarrage |
| VTOL | QuadPlane **activé**, Frame **TRI** (`Q_ENABLE=1`, `Q_FRAME_CLASS=7`), hérité de l'ancienne configuration | `QuadPlane initialised, Frame: TRI` |
| Config de bascule | `Q_TILT_ENABLE=1`, `Q_TILT_MASK=3`, `Q_TILT_TYPE=2` (**VectoredYaw**), `Q_TILT_YAW_ANGLE=10`, `Q_TILT_MAX=70`, vitesse montée/descente 80/25 °/s, `Q_TILT_FIX_ANGLE=10`, `Q_TILT_FIX_GAIN=0.6` | Paramètres, 02:01 |
| Queue | **Comportement d'empennage en V confirmé** (tangage = ensemble, lacet = opposé) = `SERVO3=VTailLeft`, `SERVO4=VTailRight` ✅ | Paramètres 02:02 + utilisateur 19:46 |
| Orientation de la carte | ✅ `AHRS_ORIENTATION=0` (flèche → nez), modifié depuis l'ancien 2 (Yaw90) dans le Guide 03 ; accéléromètre + niveau calibrés | Sauvegardes 03:32 → 20:34 |
| Modes de vol | ✅ `FLTMODE_CH=6` (SWC) : QLAND · QLAND · QHOVER · QHOVER · FBWA · FBWA | Guide 04 E, 20:17 |
| Entrée RC (en direct) | ✅ **Fonctionne** (19:3x) : les manches + interrupteurs font bouger le Raw Channel Monitor de QGC. Chemin : iA10B (i6X Output mode **PWM**) → **carte encodeur PPM** (PWM → PPM) → Pixhawk **RC IN** (`decoding PPM`, 8 voies) | Guide 04 C5, 19:32 |
| Récepteur (ancien) | ⚠️ `SERIAL2_PROTOCOL=23` (entrée RC sur TELEM2), mais **TELEM2 est vide**, c'est donc un reliquat. Câblage réel : récepteur → **encodeur PPM (confirmé, photo 19:27)** → **RC IN**. `RC_PROTOCOLS=1` (tous) | Fichier de sauvegarde + photo |
| Interrupteurs RC | `RC5_OPTION=153` armer/désarmer, ~~`RC6_OPTION=4` RTL~~ → 0 (20:25), options RC9–16 effacées, `ARMING_RUDDER=0` (20:28) | Fichier de sauvegarde |
| Surveillance batterie | `BATT_MONITOR=4` (module d'alimentation analogique), 3000 mAh, `BATT_LOW_VOLT=10.5` → RTL | Fichier de sauvegarde |
| Interrupteur de sécurité | `BRD_SAFETY_DEFLT=1` (obligatoire) | Fichier de sauvegarde |
| Boussoles | Principale `466441` = **externe** (`COMPASS_EXTERNAL=1`, `COMPASS_ORIENT=0` None), le M8N sur I2C ; seconde `131594` interne, **désactivée** (`COMPASS_USE2=0`, `USE3=0`) | Sauvegarde 4.7.2 |
| Sauvegardes | `backups/params-backup_2026-10-17_before-guide02.params` (1 276 paramètres, 4.7.1) · `backups/params_after-guide02_4.7.2.params` (1 430, 4.7.2) · `backups/params_after-radio-cal_full.params` (1 430, après calibration radio + GPS activé) · **`backups/params_after-guide04.params` (1 430, après le Guide 04) = référence actuelle** | 02:10 / 02:47 |

### Plan des sorties (ancienne configuration ; Pixhawk MAIN 1–8 = SERVO1–8, AUX 1–6 = SERVO9–14)

| Broche | Fonction | Se branche sur | Plage (µs) |
|---|---|---|---|
| MAIN 1 | Aileron | Servo d'aileron | 1100–1900 |
| MAIN 2 | Aileron | Servo d'aileron | 1000–2000 (⚠️ diffère de MAIN 1) |
| MAIN 3 | VTailLeft | Servo de la gouverne de queue gauche | 1000–2000 |
| MAIN 4 | VTailRight | Servo de la gouverne de queue droite | 1000–2000 |
| MAIN 5 | Motor1 | ESC, moteur **avant droit** | 1000–2000 |
| MAIN 6 | Motor2 | ESC, moteur **avant gauche** | 1000–2000 |
| MAIN 7 | — | vide | |
| MAIN 8 | Motor4 | ESC, moteur **arrière** | 1000–2000 |
| AUX 1 | TiltMotorFrontLeft | Servo de bascule, avant gauche | 800–1940, **inversé** |
| AUX 2 | TiltMotorFrontRight | Servo de bascule, avant droit | 700–2100 (⚠️ large, vérifier qu'il ne force pas) |
| AUX 3–6 | — | vide | |
| GPS | **Module GPS M8N avec boussole** : u-blox détecté (HW 00070000, SW 1.00). Port GPS + port I2C. "Bad fix" car en intérieur. | Messages de démarrage + utilisateur + photo 02:17 |
| Boussole | MAG0 (M8N externe) utilisée, **non calibrée** (PreArm). À calibrer en extérieur **après le câblage** (Guide 06+) | PreArm 20:07 |
| Capteur de vitesse air | **Aucun** (`No airspeed sensor`) | Messages de démarrage |
| Capteurs | Gyroscope, accéléromètre, magnétomètre, baromètre, journalisation : **Normal** | Sensor Status, 01:50 |
| QGroundControl | **5.1.5** (macOS) ; l'écran Parameters se trouve dans Q icon → Vehicle Configuration | Utilisateur 02:17 |
| Ports utilisés | USB, POWER, GPS, I2C, BUZZER, SWITCH, RC IN (via encodeur PPM, confirmé). TELEM1/2, SERIAL4/5, SPKT, CAN, MAIN, AUX : vides | Photos 02:17 |
| Montage | **Installé dans l'avion** ✅, à plat, LED vers le haut, flèche → nez (`AHRS_ORIENTATION=0`) | Utilisateur 02:17 / 03:16, Guide 03 |
| Historique de vol | **Jamais volé** : les anciens paramètres n'ont pas été testés | Utilisateur 02:17 |
| Liaison USB (Mac) | **Stable** après rebranchement, QGC affiche "Not Ready" | Guide 01 étape 3c, 01:47 |
| Action du failsafe RC | Passe en **QLAND** en l'absence de radio, ce qui est correct | Messages de démarrage |
| Point à surveiller | `PreArm: Gyros inconsistent` vu **une fois** juste après le démarrage, puis disparu | 01:47:35 |

### Erreurs PreArm actuelles (attendues ; rien n'est encore câblé ni calibré)

| PreArm | Cause actuelle | Corrigé dans |
|---|---|---|
| Hardware safety switch | Bouton de sécurité non pressé (il est branché sur SWITCH) | Appuyer avant d'armer (guide ultérieur) |
| Compass not calibrated | Pas de calibration récente | En extérieur, après le câblage |
| GPS 1: Bad fix | En intérieur | En extérieur |
| AHRS: not using configured AHRS type | EKF3 attend un fix GPS + la boussole (repli DCM actif) | En extérieur, après la calibration de la boussole |
| Battery 1 low voltage failsafe | Alimentation USB uniquement (~0 V sur la surveillance batterie) | LiPo branchée (Guide 06+) |
| ~~Radio failsafe on~~ | ✅ Disparu (20:07) : radio réparée + calibrée | fait |
| QLand mode not armable | Effet secondaire du failsafe radio / QLAND ne peut pas être armé par conception | Guide 04 |

---

## Feuille de route (guides prévus ; peut évoluer au fil de l'apprentissage)

| # | Guide | Statut |
|---|-------|--------|
| 01 | Connexion USB, confirmer ArduPlane + QuadPlane TRI, obtenir une liaison stable, lire les paramètres Q_ hérités, sauvegarder les paramètres | ✅ Terminé (rev 8, 02:20) |
| 02 | Mise à jour vers ArduPlane 4.7.2 (build **`Pixhawk1`**) **en conservant les paramètres**, vérification, nouvelle sauvegarde | ✅ Terminé (rev 7, 03:09) |
| 03 | Vérification du montage + orientation de la carte (`AHRS_ORIENTATION`), calibration de l'accéléromètre + du niveau, boussole (en extérieur) | 🟡 A ✅ B ✅ D ✅ · C + confirmation boussole via fichier de paramètres (Guide 04 Part 0) |
| 04 | **FlySky i6X** : interrupteur d'armement SWA, modes sur SWC (QLand/QHover/FBWA sur CH6), manches standard, calibration radio, nettoyage + dessins | ✅ Terminé (20:34) |
| 05 | **Configuration de l'émetteur FlySky i6X** (manuel officiel ; fw 1.0 2022) : mixages désactivés, SwA→CH5, SwC→CH6, test Display ; Output mode **PWM** (encodeur conservé) | ✅ Terminé (rev 4) |
| 06 | Plan de câblage : schéma complet (module d'alimentation → PDB → ESC, alimentation du rail servo, plan des sorties MAIN/AUX) | ⏳ |
| 07 | Failsafe radio (émetteur éteint / hors de portée), comportement du récepteur + de l'encodeur en cas de perte de signal | ⏳ |
| 08 | Configuration des sorties : moteurs, servos de bascule, gouvernes, sens et fins de course (hélices retirées) ; revue de MAIN 7 / SERVO7=39 | ⏳ |
| 09 | Calibration des ESC et vérification du sens de rotation des moteurs (hélices retirées) | ⏳ |
| 10 | Test de transition de bascule au banc, failsafe batterie, geofence | ⏳ |
| 11 | Check-list avant vol, test de vol stationnaire captif, bases du réglage PID | ⏳ |

## Journal d'avancement

- **2026-10-17 01:13** — Cahier des charges renommé en README.md et règles de travail ajoutées. Guide 01 rédigé.
- **2026-10-17 01:36** — Confirmé : le projet utilise **ArduPlane** (configuré auparavant avec Mission Planner). Ajout d'une explication de QuadPlane, des paramètres Q_ cibles, d'un tableau des phases et d'un tableau des rôles des servos. Guide 01 rev 2 : confirmer ArduPlane, lire les paramètres Q_ hérités, sauvegarder les paramètres.
- **2026-10-17 01:39** — Cellule corrigée : la queue comporte **2 petites gouvernes, chacune avec son propre servo** (gauche et droite). Mise à jour du schéma et du tableau des servos du README, ainsi que du schéma du Guide 01 (rev 3).
- **2026-10-17 01:44** — Résultat de l'étape 3 du Guide 01 (captures dans `guides/guide1_screenshots/`) : les Vehicle Messages affichent **"QuadPlane initialised, Frame: TRI"**, ce qui confirme **ArduPlane**, et que `Q_ENABLE = 1` et `Q_FRAME_CLASS = 7` sont déjà réglés depuis l'ancienne configuration. La barre du haut de QGC affichait **"Comms Lost"**, la liaison USB doit donc être vérifiée (étape 3c). Le Guide 01 rev 4 a réécrit l'étape 3.
- **2026-10-17 01:53** — Étape 3c faite : après rebranchement, la liaison est **stable ("Not Ready")**. Avec QGC ouvert pendant le démarrage, la bannière de démarrage **est bien** apparue : **ArduPlane V4.7.1, carte `Pixhawk1`** (build complet 2 MB, pas de problème de 1 MB), IOMCU OK, PWM sur les sorties 1–14, pas de capteur de vitesse air, **GPS u-blox détecté** (inattendu, puisque « rien n'est câblé »). Les 7 erreurs PreArm sont toutes attendues à ce stade (voir le tableau ci-dessus). Sensor Status : capteurs principaux Normal. **Correction :** la rev 4 affirmait à tort que QGC n'affiche jamais la bannière ; il l'affiche quand QGC est ouvert pendant le démarrage. Le Guide 01 rev 5 ajoute une section Results. Journaux dans `guides/guide1_screenshots/`.
- **2026-10-17 01:55** — En ouvrant Parameters, QGC a affiché la fenêtre **"Parameters are missing from firmware: FS_OPTIONS, FS_GCS_TIMEOUT, FS_GCS_ENABLE"** (`guides/guide1_screenshots/missing-params-popup_2026-10-17_0153.png`). Ce sont des noms de style ArduCopter ; ArduPlane utilise p. ex. `FS_GCS_ENABL`. C'est une **différence de nommage QGC ↔ ArduPlane sans conséquence** : cliquez sur Ok. L'utilisateur ne trouvait pas l'écran Parameters, le Guide 01 rev 6 a donc réécrit l'étape 4 avec le chemin exact pour les QGC récents : **icône Q violette → Select Tool → Vehicle Configuration → faire défiler la liste de gauche jusqu'en bas → Parameters** (cela s'appelle "Vehicle Configuration", pas "Vehicle Setup").
- **2026-10-17 02:00** — L'utilisateur a atteint **Vehicle Configuration → Parameters** ✅. Maintenant à l'étape 4c : rechercher `Q_TILT` et `_FUNCTION` et faire une capture des deux, puis l'étape 5 (Tools → Save to file).
- **2026-10-17 02:11** — Étapes 4–5 faites. Captures de `Q_TILT`, `_FUNCTION`, `Q_ENABLE` et `Q_FRAME_CLASS` (`guides/guide1_screenshots/params-*.png`), et sauvegarde enregistrée, puis déplacée dans `backups/`. **L'ancienne configuration est une config Y3 complète et cohérente :** Tri + bascule VectoredYaw sur les moteurs 1+2, empennage en V, ailerons, 3 ESC et 2 servos de bascule tous affectés (voir le Plan des sorties ci-dessus). Également constaté : orientation de la carte Yaw90, modes de vol sur CH8, entrée RC sur TELEM2 (SERIAL2=23), surveillance batterie réglée pour une 3S 3000 mAh, interrupteur de sécurité obligatoire. **Recommandation pour le Guide 02 :** conserver les paramètres, mettre à jour vers 4.7.2, et vérifier chaque élément dans les Guides 03–07. Guide 01 rev 7.

- **2026-10-17 02:20** — Réponses à l'étape 6 du Guide 01 : carte à plat, LED vers le haut ; **jamais volé** ; décision **conserver et corriger les paramètres actuels** ; QGC **5.1.5** ; **GPS M8N avec boussole** branché (GPS + I2C). Les photos (`guides/guide1_screenshots/board-*.jpg`) montrent USB, POWER, GPS, I2C, BUZZER, SWITCH et RC IN utilisés, via une petite carte (probablement un **encodeur PPM**) vers le récepteur ; TELEM2 est vide, donc `SERIAL2_PROTOCOL=23` est un reliquat. **Guide 01 terminé (rev 8).** Vérification sur le serveur ArduPilot : `Plane/stable/Pixhawk1` = **4.7.2** (compilé le 2026-10-13). **Guide 02 rédigé :** mise à jour vers 4.7.2 en conservant les paramètres, vérification, nouvelle sauvegarde.

- **2026-10-17 02:25** — L'utilisateur a demandé si c'est vraiment la 4.7.2. **Vérifié sur le serveur ArduPilot :** `Plane/stable/Pixhawk1/firmware-version.txt` = `4.7.2-FIRMWARE_VERSION_TYPE_OFFICIAL` ; git `fb773567` "Plane: version to 4.7.2" (2026-10-11) ; en-tête `.apj` = Pixhawk1, board_id 9, 1.56/2.08 MB ; les dossiers stable-4.7.0/4.7.1/4.7.2 existent. Le build installé est `dbe79216` (4.7.1), donc après la mise à jour le message de démarrage doit indiquer **V4.7.2 (fb773567)**. Guide 02 rev 2.

- **2026-10-17 02:27** — L'utilisateur a confirmé que **RC IN est relié au récepteur FlySky iA10B 10CH** (l'élément avec les antennes). Reste à confirmer dans le Guide 05 : le mode de sortie du récepteur (PPM ou i-BUS) et si la petite carte noire fait partie de cette liaison. Prochaine action : **faire le Guide 02**.

- **2026-10-17 02:33** — Guide 02 étape 1 : l'utilisateur a ouvert la page Firmware (QGC 5.1.5 affiche la liste déroulante `Pixhawk1 [ArduPilot ChibiOS]` + le bouton **Flash** ; capture dans `guides/guide2_screenshots/`). La rev 2 décrivait un ancien déroulement de QGC, je l'ai donc **corrigée à partir du code source de QGC v5.1.5** (`FirmwareUpgrade.qml`) : cliquer sur **Flash** → débrancher/rebrancher → fenêtre **Firmware Setup** → ArduPilot / ChibiOS / **le type de véhicule est Multi-Rotor par défaut et doit être changé en Plane** / la liste des cartes doit indiquer **`Pixhawk1 - 4.7.2`** (le manifeste liste aussi -1M, -bdshot, fmuv2/3, Cube… pour le board ID 9). Guide 02 rev 3.

- **2026-10-17 02:37** — Guide 02 étape 2 : clic sur **Flash**. Le journal affichait `Found device: ArduPilot ChibiOS (cu.usbmodem101)`. C'est la **première détection de la carte tournant encore sous ArduPlane**, ce qui est normal (code source de QGC 5.1.5 : le bootloader n'est contacté qu'à la seconde détection, après le rebranchement). Pas encore de ligne "Device disconnected", l'utilisateur doit donc encore débrancher et rebrancher. Port USB du Mac = `/dev/cu.usbmodem101`. Guide 02 rev 4.

- **2026-10-17 02:39** — **Firmware flashé ✅.** Fenêtre : ArduPilot / ChibiOS / **Plane** / **Pixhawk1 - 4.7.2** (QGC a présélectionné correctement ; la liste affichait aussi CubePurple, Pixhawk1-1M(-bdshot), Pixhawk1-bdshot, CubeBlack, mRo X2.1, fmuv3, CUAV-Pixhack-v3). Bootloader : version 5, **Board ID 255** (inhabituel ; le fichier est pour l'ID 9, mais le flashage a été accepté et vérifié), taille de flash 2080768. Journal : téléchargement de `Plane/stable/Pixhawk1/arduplane.apj` → effacement → programmation → vérification → redémarrage. "Missing parameter_xml_size/airframe_xml_size key" = sans conséquence (clés propres à PX4). Après le redémarrage, QGC a affiché **"Vehicle did not return the full parameter list"** alors que la carte démarrait encore (calibration INS), la solution est donc un débranchement/rebranchement propre et une attente de 30 s (étape 5b). Pas encore confirmé : message de démarrage V4.7.2 + paramètres intacts (étapes 6–7). Guide 02 rev 5.

- **2026-10-17 03:01** — **ArduPlane 4.7.2 confirmé :** le démarrage affiche `ArduPlane V4.7.2 (fb773567)`, `Pixhawk1`, `QuadPlane initialised, Frame: TRI`. Paramètres clés inchangés (Q_TILT_TYPE VectoredYaw, Q_FRAME_CLASS Tri, SERVO9=75, SERVO3=79, AHRS_ORIENTATION=2). Nouvelle sauvegarde `backups/params_after-guide02_4.7.2.params`. **Comparaison complète :** 0 paramètre perdu ; 1 276 → 1 430 (+154 : groupes Q_A_*, Q_P_*, Q_M_*, Q_LOIT_*, Q_WP_*, Q_WVANE_*, GPS1_*, tous par défaut ; on ne sait pas pourquoi l'ancienne sauvegarde ne les contenait pas) ; **SERVO7_FUNCTION 0 → 39** (servo de lacet de queue Tri, affecté automatiquement ; MAIN 7 doit rester vide avec VectoredYaw) ; GPS1_TYPE 0 → 1 ; RC1–4_DZ 0 → 30 ; EK3_CHECK_SCALE 150 → 100 ; BRD_SD_SLOWDOWN 1 → 2. **Nouveau problème :** `PreArm: Internal errors 0x100000 l:1375 flow_of_ctrl`, décodé depuis le code source = `AP_HAL_ChibiOS/RCOutput.cpp:1375` `RCOutput::push()` appelé sans `cork()` (contrôle de séquencement du pilote de sortie, pas matériel). Absent en 4.7.1 ; aucun code Plane lié aux sorties n'a changé entre 4.7.1 et 4.7.2, donc probablement lié à la configuration (SERVO7=39 est une hypothèse). Il **bloque l'armement**. Suite : Guide 02 étape 8 (redémarrage propre : revient-il ?). Guide 02 rev 6.

- **2026-10-17 03:09** — Guide 02 étape 8 : redémarrage propre, **pas d'erreur interne** (démarrage 03:04 + 6 cycles PreArm). Conclusion : un événement ponctuel au premier démarrage après le flashage (le même démarrage qui a réglé automatiquement SERVO7=39 et créé les nouveaux paramètres Q_ ; déclencheur non prouvé). Simple point à surveiller. **Bonus :** `Debug: RCInput: decoding PPM (IOMCU)`, donc le Pixhawk reçoit du **PPM sur RC IN** (le chemin du récepteur fonctionne électriquement ; "Radio failsafe on" reste à résoudre dans le Guide 05). **Guide 02 terminé (rev 7).** Guide 03 rédigé : montage/orientation + accéléromètre + niveau (+ boussole en extérieur).

- **2026-10-17 03:16** — Réponses au Guide 03 : **A : le Pixhawk est monté dans l'avion.** B : l'utilisateur dit que l'horizon semble correct avec l'avion au repos. Cela ne teste pas l'orientation en lacet (un avion à plat paraît de niveau quel que soit le réglage de lacet), donc un **test d'inclinaison** a été ajouté (nez en bas doit afficher du tangage, pas du roulis), ainsi que des questions : valeur actuelle de `AHRS_ORIENTATION` et sens de la flèche. C/D : l'utilisateur ne savait pas où se trouve Accelerometer ni ce que signifie « redémarrer », j'ai donc ajouté un **encadré d'explication « Reboot »** (reboot = redémarrer le Pixhawk : bouton "Reboot Vehicle" de la page Sensors, ou Parameters → Tools → Reboot Vehicle, ou débrancher/rebrancher l'USB ; attendre 30 s sans bouger) et les chemins de clic exacts (Vehicle Configuration → Sensors → Accelerometer = premier bouton). Correction : le bouton Gyro est masqué pour les avions dans QGC 5.1.5. E : l'utilisateur pense que la boussole fonctionne, mais « fonctionne » ≠ « calibrée », il faut donc vérifier si `PreArm: Compass not calibrated` a disparu. Guide 03 rev 2.

- **2026-10-17 03:21** — Guide 03 : **B ✅** L'utilisateur a modifié `AHRS_ORIENTATION` et dit qu'incliner selon les deux axes fait bouger l'horizon correctement (valeur exacte à confirmer avec le fichier de paramètres de l'étape F). **E :** le cap correspond à la boussole du téléphone (bon signe) ; savoir si ArduPilot la considère comme calibrée se vérifie dans le fichier et les messages de l'étape F. L'utilisateur a demandé si « redémarrer » désigne l'application : **non, uniquement le Pixhawk** (bouton Reboot Vehicle ou débrancher/rebrancher l'USB). Nouvelle règle : **demander un fichier de paramètres + les messages au lieu de demander des valeurs isolées** (étape F ajoutée). Suite : C (accéléromètre) → redémarrage → D (niveau) → redémarrage → F (enregistrer `backups/params_after-guide03.params` + messages). Guide 03 rev 3.

- **2026-10-17 03:27** — L'utilisateur a demandé ce que signifie « de niveau » pour Level Horizon. Réponse : l'avion posé normalement sur une table plane s'il repose à plat, ailes de niveau gauche/droite et fuselage horizontal avant/arrière (caler le côté bas si le train d'atterrissage l'incline ; vérifier avec une application de niveau sur téléphone, ~0° ±1–2°). Ajouté au Guide 03 Part D.

- **2026-10-17 03:28** — Guide 03 Part D : **Level Horizon "Successfully completed"** ✅. Suite : redémarrer le Pixhawk, puis Part F (fichier de paramètres + messages) pour confirmer l'accéléromètre (C), l'orientation et la boussole.

- **2026-10-17 03:33** — L'utilisateur a demandé si les anciens réglages 4.7.1 ont été conservés en 4.7.2. Réponse : oui, confirmé par la comparaison complète des sauvegardes à 03:01 (0 perdu, tous les réglages Y3 identiques ; voir Guide 02 Results). Les modifications depuis sont intentionnelles (orientation + calibrations du Guide 03).

- **2026-10-17 03:46** — L'utilisateur a demandé de faire la radio FlySky ensuite, donc **Guide 04 = FlySky** (le câblage passe au Guide 05). Le plan de commandes de l'utilisateur, transposé dans ArduPlane : **SWA = armer/désarmer** (`RC5_OPTION=153`, déjà réglé ; bas = désarmement immédiat, donc en vol c'est un coupe-moteurs) ; **SWC = modes de vol sur CH6** : haut QLAND (« ralenti » : atterrit en sécurité + désarme automatiquement ; impossible d'armer dans ce mode) / milieu QHOVER (drone, 3 moteurs) / bas FBWA (avion, le moteur arrière s'arrête après la transition) ; `FLTMODE_CH` 8 → 6, emplacements 1–2 QLand, 3–4 QHover, 5–6 FBWA (SWC ≈1000/1500/2000 → emplacements 1/4/6) ; `RC6_OPTION` RTL → 0. **Manche gauche = gaz.** L'utilisateur voulait le roulis sur le **potentiomètre VrB** et le lacet sur le manche droit : **fortement déconseillé** (un potentiomètre ne revient pas au centre ; le roulis est l'axe le plus corrigé) ; le guide utilise le **Mode 2 standard** (manche gauche G/D lacet, manche droit G/D roulis), en attendant la décision de l'utilisateur. Nettoyage : RC9/10/12/13/14/16_OPTION → 0 (RC16=154 était un second interrupteur d'armement), `ARMING_RUDDER` 2 → 0. L'utilisateur voulait aussi **SWD pour activer/désactiver les servos de queue** : **déconseillé** (l'empennage en V = seul contrôle du tangage/lacet en mode avion ; aucune option ArduPlane standard) ; demandé quel était l'objectif sous-jacent. Précisé : l'empennage en V gère tangage + lacet, les ailerons gèrent le roulis ; en vol stationnaire les moteurs gèrent roulis/tangage et les servos de bascule le lacet.

- **2026-10-17 03:53** — **Plan radio décidé :** manches Mode 2 standard (l'utilisateur est d'accord : pas de roulis sur VrB). Les servos de l'aile + de l'empennage en V ne sont actifs qu'en mode avion, ce qu'ArduPlane 4.7.2 fait automatiquement (les modes VTOL réduisent le mouvement des gouvernes à ~0 à basse vitesse air, `ArduPlane/Attitude.cpp`), donc **pas d'interrupteur SWD** ; SWB/SWD/VrA/VrB inutilisés. L'utilisateur m'a demandé d'appliquer les modifications ; j'ai commencé à préparer un outil MAVLink, puis l'utilisateur a décidé : **aucune modification programmatique, guide uniquement**. Rien n'a été écrit sur la carte (l'outil avait seulement été installé dans le dossier temporaire et a été supprimé). Guide 04 rev 2 : dessins de la radiocommande, du mode drone et du mode avion ; décisions consignées ; l'utilisateur applique les Parts 0 → H.

- **2026-10-17 03:56** — L'i6X a bipé à l'allumage. C'est l'avertissement de sécurité au démarrage de FlySky : tous les interrupteurs doivent être EN HAUT et les gaz (manche gauche) complètement EN BAS. Ajouté au Guide 04 Part B1.

- **2026-10-17 04:03** — Guide 04 Part C : l'iA10B est sur RC IN avec une **LED rouge fixe** (appairé), mais les barres Radio de QGC **ne bougent pas**, et à l'étape 2 de Calibrate, Next est grisé. C'est voulu : QGC attend de détecter un mouvement de manche (code source de QGC 5.1.5), donc **les données des manches n'atteignent pas le Pixhawk** même si le démarrage indiquait `decoding PPM`. Vérification C2 ajoutée : MAVLink Inspector RC_CHANNELS, photo de i6X RX setup → Output mode, photo des connecteurs du récepteur (direct ou petite carte noire / encodeur PPM ?).

- **2026-10-17 04:03** — Capture Radio : le **Raw Channel Monitor affiche les voies 1–8 avec des valeurs** (1/2/4 centrées, 3 basse = gaz en bas, 5–8 au milieu ; 9–18 vides = PPM 8 voies), donc la **liaison récepteur → Pixhawk fonctionne**. Bloqué car (1) la case de mode de calibration était sur **Mode 1** (gaz sur le manche droit) alors que l'i6X est en **Mode 2**, et (2) aux étapes de manche, Next est grisé par conception : QGC avance quand il détecte le manche maintenu en butée. Solution : Cancel → Mode 2 → Calibrate → pousser le manche gauche complètement en haut et le maintenir. Vérifications C2 uniquement si aucun point brut ne bouge. Remarque : ch5/ch6 ≈ milieu suggère que l'i6X a toujours ses VrA/VrB par défaut sur CH5/6, la Part B1 (SwA/SwC) reste donc nécessaire.

- **2026-10-17 04:07** — L'utilisateur a essayé les Modes de calibration 1–4 : **les points des voies brutes ne bougent pas**. Le Pixhawk reçoit donc du PPM avec des **valeurs par défaut figées** (schéma centre/gaz en bas) : un signal PPM est présent mais ne transporte pas les manches. Probablement le mode de sortie de l'i6X est PWM, et/ou le chemin passe par la petite carte noire (encodeur PPM) sans entrée valide. Guide 04 **C3** : vérifier la LED (TX éteint = clignote, allumé = fixe), photographier le câblage, régler l'i6X **RX setup → Output mode → PPM**, brancher le connecteur **PPM/CH1** de l'iA10B **directement** sur le RC IN du Pixhawk (−/+/S respectés, carte retirée du chemin), redémarrer, tester.

- **2026-10-17 04:10** — L'utilisateur dit que la LED du récepteur est fixe (état avec TX éteint encore à confirmer) et a demandé comment vérifier PPM ou PWM sur l'i6X. Chemin exact ajouté au Guide 04 C3 : maintenir OK → System setup → RX setup → Output mode → PPM (ligne du haut) → maintenir CANCEL pour enregistrer. Le récepteur doit être alimenté (USB du Pixhawk) et le TX allumé. Choisir **PPM** (PPM/CH1 direct → RC IN).

- **2026-10-17 04:16** — Ligne du bas d'Output mode (Serial i-BUS / S.BUS) : laisser **i-BUS** (par défaut). Elle ne pilote que le connecteur série du récepteur, qui n'est pas utilisé ; elle n'affecte pas le PPM sur PPM/CH1.

- **2026-10-17 04:21** — Calibration bloquée à "Move the Yaw stick right" : la voie brute ch4 reste centrée alors que le manche est maintenu à droite ; ch3 toujours basse. Les gaz que QGC avait « mappés » étaient une voie qui tremblait, pas le vrai manche. J'ai dit à l'utilisateur de faire **Cancel** (rien n'est enregistré). Les manches n'atteignent toujours pas le Pixhawk, il faut donc d'abord terminer C3. En attente : PPM enregistré ? câble direct depuis PPM/CH1 ? USB rebranché ? LED avec TX éteint ? Photos du récepteur + de l'écran Output mode.

- **2026-10-17 04:26** — Réponses : PPM enregistré, câble direct depuis PPM/CH1, USB rebranché ; **LED du récepteur fixe même avec le TX ÉTEINT** ; dans QGC, seul le roulis tremble aléatoirement. Diagnostic : **probablement aucune vraie liaison radio** (récepteur non appairé à cet i6X/modèle). Guide 04 **C4** : vérifier sur l'écran principal de l'i6X la tension RX (télémétrie = appairé), puis **réappairer** (prise de bind dans B/VCC → LED clignote rapidement → maintenir BIND en allumant l'i6X → retirer la prise → couper/rallumer), revérifier Output mode = PPM, tester les points bruts.

- **2026-10-17 04:28** — Correction : avec le TX éteint, la LED du récepteur **clignote**, il **est donc appairé** ; C4 (réappairage) ignorée. Nouveau diagnostic : la **petite carte noire = encodeur PPM est en ligne** entre le récepteur et RC IN. Avec le récepteur en mode PPM, l'encodeur ne reçoit pas d'entrées PWM valides et sort ses valeurs par défaut (gaz en bas, le reste centré = le schéma figé), et son entrée 1 voit le train d'impulsions PPM comme du bruit (= « roulis » aléatoire). Solution C5-A (recommandée) : retirer l'encodeur, câble servo de PPM/CH1 de l'iA10B → RC IN, garder PPM. Option B : Output mode PWM + voies CH1–CH8 du récepteur dans l'encodeur. Photo demandée pour confirmer.

- **2026-10-17 14:21** — L'utilisateur a donné les versions de l'i6X : **firmware 1.0 (09-Feb-2022), matériel V1.0**. Lecture du **manuel d'instructions officiel du FS-i6X** et rédaction du **Guide 05 : configuration de l'émetteur i6X** : actions des touches (maintenir OK = menu, maintenir CANCEL = enregistrer), barre de batterie RX = appairé, Model select/name, Type = Airplane, Sticks mode 2, **Aux switches** (activer SwA/SwC, nombre de voies ≥6), **mixages de l'émetteur DÉSACTIVÉS** (V Tail, Elevon, Mixes, Throttle hold ; courbe des gaz linéaire ; dual rate 100/exp 0), Reverse Nor, End points 100%, Subtrim 0, trims centrés (bip aigu), **Aux. channels Ch5=SwA, Ch6=SwC** (par défaut VrA/VrB), RX setup : RF standard AFHDS 2A, **Output mode PPM**, failsafe plus tard. Test sur Functions setup → **Display** (vérification côté TX) avant le Pixhawk. Note du manuel : par défaut potentiomètres = CH5/6, interrupteurs = CH7–10 ; l'iA10B gère 6–10 voies.

- **2026-10-17 14:29** — Guide 05 étape 1 ✅ : l'écran d'accueil de l'i6X affiche les barres TX et RX ; télémétrie TX.V 5.14 V, récepteur IntV1 4.52 V, **SigS1 10** (max), donc **liaison TX ↔ RX confirmée**. Maintenant dans System setup.

- **2026-10-17 14:48** — Guide 05 étapes 2–3 (en cours) : Type = Airplane (l'i6X a demandé d'éteindre le récepteur, USB débranché), Sticks mode 2 confirmé, Aux switches tous activés avec Ch = 10, **V Tail Off** (Ch2<=Ch2, Ch4<=Ch4). Le récepteur peut être rebranché (sans risque : USB uniquement, MAIN/AUX vides). Suite : Elevon, Mixes, Throttle hold, courbe, D/R.

- **2026-10-17 14:57** — Guide 05 : **Elevon Off** (Ch1<=Ch1, Ch2<=Ch2). Ajout d'un **tableau de suivi des réglages** au Guide 05 (chaque réglage, résultat, modifié ?, signification en langage simple), comme l'utilisateur l'a demandé. Règle : le mettre à jour après chaque étape.

- **2026-10-17 14:58** — Guide 05 : Mixes #1–#3 tous Off ✅.

- **2026-10-17 15:00** — Guide 05 : Throttle hold Off ✅ (Value 50% affichée mais inactive).

- **2026-10-17 15:09** — Guide 05 : Throttle curve linéaire (L0/25/50/75/H100) ✅.

- 2026-10-17 16:13 — Alertes vocales de QGC (PreArm/batterie) gênantes au banc → les couper via Q icon → Application Settings → General → décocher la case du volume (réglage QGC `audioMuted`). Seule la voix est coupée ; les avertissements s'affichent toujours dans Vehicle Messages. La surveillance batterie/le failsafe seront configurés correctement dans un guide ultérieur (07/10), pas désactivés.

- 2026-10-17 16:34 — Guide 05 : Dual rate/exp. Ch1/Ch2/Ch4 = Rate 100, Exp 0 ✅ (aucune modification). Suite : Assign switches.

- 2026-10-17 16:36 — Guide 05 : Assign switches tous None ✅ → Étape 3 terminée (tous les mixages désactivés, rien de modifié). Guide 05 rev 3 : tableau de suivi des réglages raccourci à des significations d'une ligne, check-list « Où on en est » ajoutée, le tableau de l'Étape 3 a une colonne ✅. Suite : Étape 4 Reverse.

- 2026-10-17 16:58 — Guide 05 rev 4 : Étape 4 réécrite en 4.1 Reverse / 4.2 End points / 4.3 Subtrim / 4.4 Trims, chacune partant de l'écran d'accueil. Correction : sur ces écrans de l'i6X, appui court sur OK = voie suivante et UP/DOWN = modifier la valeur (j'avais dit l'inverse dans le chat).

- 2026-10-17 16:59 — Guide 05 Étape 4.1 : Reverse tous Nor ✅ (aucune modification). Suite : 4.2 End points.

- 2026-10-17 17:10 — Guide 05 Étape 4.2 : End points tous à 100%/100% ✅ (aucune modification). Suite : 4.3 Subtrim.

- 2026-10-17 17:14 — Guide 05 Étape 4.3 : Subtrim tous centrés ✅ (le « 1 px à gauche » de Ch1 n'était que le surlignage de sélection). Suite : 4.4 Trims.

- 2026-10-17 18:21 — Guide 05 Étape 4.4 : disposition des barres de trim sur l'écran d'accueil recherchée (photo réelle d'un i6X, guides Perth Radio Sailing + AMYA). Barre latérale gauche = trim des gaz Ch3, en bas à gauche = lacet Ch4, côté droit = tangage Ch2, en bas à droite = roulis Ch1. Schéma annoté ajouté au guide.

- 2026-10-17 18:31 — Guide 05 Étape 4.4 : la photo de l'écran d'accueil (`guides/guide5_screenshots/i6x-home-screen_1825.jpeg`) montre les 4 repères de trim centrés ✅. Télémétrie TX.V1 4.94 V, IntV1 4.47 V, SigS1 10. Étape 4 terminée, rien de modifié. Suite : Étape 5 Aux. channels (Ch5 SwA, Ch6 SwC).

- 2026-10-17 18:38 — Guide 05 Étape 5 (**modifié**) : Aux. channels Ch5 VrA → SwA (armement), Ch6 VrB → SwC (modes de vol). Enregistré et revérifié. Suite : Étape 6 RX setup → Output mode PPM.

- 2026-10-17 18:48 — Guide 05 Étape 6 : l'utilisateur a ouvert RF standard par erreur (ma formulation « vérifier » manquait de clarté) → demande de changement de mode AFHDS → annulée. L'écran d'accueil affiche toujours AFHDS2A ✅. Le guide indique désormais de ne jamais ouvrir RF standard. Suite : Output mode → PPM.

- 2026-10-17 18:51 — Guide 05 Étape 6 : Output mode = PPM, Serial = i-BUS (déjà réglé) ✅. Suite : Étape 7 test Display.

- 2026-10-17 19:10 — **Guide 05 terminé** ✅. Test Display de l'i6X : Ch1 roulis, Ch2 tangage, Ch3 gaz, Ch4 lacet, Ch5 SWA, Ch6 SWC (3 pos.) tous corrects. Seule modification : Aux. channels Ch5 → SwA, Ch6 → SwC. Le côté émetteur est validé ; ensuite vient le chemin récepteur → Pixhawk (vérification radio du Guide 04 / C5).

- 2026-10-17 19:26 — Après le Guide 05 : le Raw Channel Monitor de la page Radio de QGC est toujours figé avec le TX allumé. TX et RX sont validés, donc le défaut se situe sur le chemin RX → Pixhawk (encodeur PPM en ligne). Suite : Guide 04 C5 (retirer l'encodeur, câble direct PPM/CH1 → RC IN).

- 2026-10-17 19:28 — C5.1 : la photo `guides/guide4_screenshots/rcin-to-ppm-encoder_1927.jpeg` confirme Pixhawk RC IN ← carte encodeur PPM ← récepteur. Diagnostic confirmé. Suite : test rapide avec i6X Output mode → PWM (option B, sans recâblage), puis décider pour A (retirer l'encodeur).

- 2026-10-17 19:32 — **Entrée radio réparée** ✅ (Guide 04 C5 option B) : i6X System setup → RX setup → Output mode **PPM → PWM**, enregistré. L'encodeur reçoit maintenant des voies séparées et construit le PPM pour RC IN. Le Raw Channel Monitor de QGC suit les manches et les interrupteurs. Encodeur conservé (option A facultative plus tard). Suite : **Guide 04 Part D, calibration radio (Mode 2)**.

- 2026-10-17 19:46 — L'utilisateur a décrit les gouvernes : manche droit ←→ = ailerons en opposition ; manche droit ↑↓ = les deux gouvernes de queue ensemble ; manche gauche ←→ = gouvernes de queue en opposition. Correspond à la config Aileron + VTailLeft/Right d'ArduPlane ✅ ; ajout d'un tableau « Comment les manches font bouger les gouvernes ». La calibration (Guide 04 D) n'apprend que les courses des manches et n'est pas concernée.

- 2026-10-17 19:48 — Guides 04 + 05 mis à jour avec le tableau manche → gouverne (description de l'utilisateur). Guide 04 Part D réécrite à partir du code source de QGC 5.1.5 (RemoteControlCalibrationController) : ordre = départ gaz en bas → gaz haut/bas → lacet D/G → roulis D/G → tangage haut/bas → interrupteurs/potentiomètres → Next écrit les paramètres ; Mode 2, "Centered Throttle" décoché. Début de la Part D avec l'utilisateur maintenant.

- 2026-10-17 19:56 — **Guide 04 Part D : calibration radio faite** ✅ (Mode 2, écrite sur la carte). Les 4 manches bougent dans le bon sens. Capture `guides/guide4_screenshots/radio-after-calibration_1955.png` : interrupteurs en haut donne ch5 basse (SWA en haut = désarmé ✅) et ch6 basse (SWC en haut = Flight Mode 1 = QLand ✅) ; ch7/8 au milieu, 9–18 aucune. Suite : sauvegarde, puis Part E.

- 2026-10-17 19:59 — Sauvegarde `backups/params_after-radio-cal.params` vérifiée : AHRS_ORIENTATION=0 ✅, accéléromètre + niveau calibrés ✅, RC1–8 calibrées ✅ (RC2_REVERSED=1, comme avant ; sens à vérifier lors du test des servos). ⚠️ Seulement **1 276 paramètres** contre 1 430 dans les sauvegardes 4.7.2 : 144 paramètres de réglage Q_ (Q_A_/Q_P_/Q_M_/Q_WP_/Q_LOIT_/Q_WVANE_) et 10 GPS1_* manquants, GPS1_TYPE=0, SERVO7_FUNCTION=0, EK3_CHECK_SCALE=150 (le même schéma que la sauvegarde 4.7.1). Hypothèse : QGC a récupéré la liste avant que QuadPlane/GPS aient fini de s'initialiser. Suite : Parameters → Tools → Refresh, puis réenregistrer en `params_after-radio-cal_refresh.params`, et chercher 'QuadPlane initialised' dans Vehicle Messages. Aucune modification de paramètre tant que ce n'est pas clair.

- 2026-10-17 20:03 — L'utilisateur veut d'abord activer le GPS : Guide 04 étape D2 = Parameters → GPS1_TYPE → Auto (1) → Save → Tools → Reboot Vehicle → attendre 60 s → Refresh → enregistrer `params_after-radio-cal_refresh.params`.

- 2026-10-17 20:03 — **Modifié :** `GPS1_TYPE` 0 → **1 (Auto)** par l'utilisateur dans QGC Parameters. Redémarrage en attente.

- 2026-10-17 20:06 — Sauvegarde après Refresh `params_after-radio-cal_refresh.params` (1,286 ; le fichier avait une espace au début de son nom, renommé) : GPS1_TYPE=1 ✅ et GPS1_* de retour. ⚠️ **Les groupes de réglage Q_ manquent toujours après redémarrage + Refresh** et SERVO7_FUNCTION=0, donc QuadPlane::setup() ne se termine pas (code source 4.7.2 : il s'arrête sur une config_error telle que 'Not enough memory for quadplane' ou une erreur d'allocation). Cela fonctionnait lors des démarrages de 02:47–03:54. Demande des Vehicle Messages d'un démarrage à froid.

- 2026-10-17 20:09 — Messages du démarrage de 20:07 (`guides/guide4_screenshots/boot-messages_2007.txt`) : **QuadPlane initialised, Frame: TRI**, aucune erreur de config ✅ ; GPS u-blox détecté ✅ ; **'Radio failsafe on' disparu, récepteur RC Normal** ✅. PreArm restants : batterie (USB), GPS bad fix (intérieur), boussole non calibrée, AHRS (EKF en attente), interrupteur de sécurité. Ouvert : la liste de QGC n'a pas les groupes de réglage Q_ alors que QuadPlane démarre (code source : invalidate_count() est appelé après setup). Test : rechercher Q_A_RAT_RLL_P.

- 2026-10-17 20:11 — **Résolu :** Q_A_RAT_RLL_P absent dans QGC jusqu'à Tools → Refresh, puis 0.45 (inchangé). QGC télécharge les paramètres à la connexion, avant que QuadPlane::setup() n'ajoute ses groupes (~2 s après le démarrage). Rien d'anormal sur la carte. **Règle :** après chaque redémarrage/connexion, attendre ~30 s et faire Refresh avant de modifier/enregistrer des paramètres. (La sauvegarde 4.7.1 et celle de 19:57 étaient incomplètes de la même manière.) Suite : enregistrer la sauvegarde complète `params_after-radio-cal_full.params`.

- 2026-10-17 20:12 — **Sauvegarde complète** `backups/params_after-radio-cal_full.params` : **1 430 paramètres** ✅ (même ensemble que les sauvegardes du Guide 03). Valeurs revenues à la normale : SERVO7_FUNCTION=39, EK3_CHECK_SCALE=100, RC1_DZ=30, donc les valeurs étranges étaient des artefacts du téléchargement anticipé. C'est maintenant la sauvegarde de **référence actuelle**. Actuel : FLTMODE_CH=8, modes 17/19/5/17/11/5, RC5_OPTION=153, RC6_OPTION=4 (RTL), reliquats RC9=34, RC10=162, RC12=28, RC13=24, RC14=16, RC16=154, ARMING_RUDDER=2. Suite : Part E modes de vol.

- 2026-10-17 20:17 — **Modifié (Part E1) :** FLTMODE_CH 8 → **6** ; Flight Modes 1–6 = QLAND, QLAND, QHOVER, QHOVER, FBWA, FBWA (étaient QSTABILIZE, QLOITER, FBWA, QSTABILIZE, RTL, FBWA). SWC en haut allume Flight Mode 1 ✅. Capture `flight-modes-set_2015.png`. Suite : vérifier milieu/bas, puis Channel option 6 RTL → Do Nothing.

- 2026-10-17 20:25 — **Modifié (Part E2) :** RC6_OPTION 4 (RTL) → **0 (Do Nothing)**. SWC haut/milieu/bas → Flight Mode 1/4/6 ✅. Remarque : dans QGC, un 'Channel option N' jaune signifie seulement que la voie N > 1800 µs (code source), pas qu'une option est active. Suite : reliquats de la Part F (RC9/10/12/13/14/16_OPTION → Do Nothing, ARMING_RUDDER → 0).

- 2026-10-17 20:28 — **Modifié (Part F1) :** RC9/10/12/13/14/16_OPTION → 0 (Do Nothing). Channel options 6–16 toutes sur Do Nothing (capture `switch-options-cleared_2027.png`). RC5_OPTION=153 conservé. Suite : ARMING_RUDDER 2 → 0.

- 2026-10-17 20:28 — **Modifié (Part F2) :** ARMING_RUDDER 2 → **0 (Disabled)**. Armement uniquement via SWA. Part F terminée.

- 2026-10-17 20:32 — **Guide 04 Part G** ✅ : la vue Fly affiche QLand / QHover / FBWA pour SWC haut/milieu/bas. SWA en bas → tentative d'armement refusée avec 'Arm: Hardware safety switch' (+ batterie, pas de fix GPS), donc SWA en bas = armer, en haut = désarmer ✅. Interrupteurs laissés en haut. Suite : Part H sauvegarde `params_after-guide04.params`.

- 2026-10-17 20:34 — **Guide 04 terminé** ✅. La sauvegarde `backups/params_after-guide04.params` (1 430) diffère de `params_after-radio-cal_full` exactement par les modifications voulues : FLTMODE_CH 8→6, FLTMODE1–5 → 20/20/18/18/5 (6 déjà à 5), RC6/9/10/12/13/14/16_OPTION → 0, ARMING_RUDDER 2→0. C'est maintenant la référence actuelle. Suite : Guide 06 câblage.

- 2026-10-17 20:42 — **Audit des guides** (demande de l'utilisateur) : ajout d'un encadré « État actuel » en haut des Guides 01–04 listant ce qui a changé ensuite. Pastille de statut du Guide 03 : A–D ✅, F ✅, E boussole après le câblage. Guide 04 : C3 et B2 'PPM' marqués *Superseded* (vraie solution : Output mode PWM à cause de l'encodeur) ; ancre du résumé final ; rev 3. Guide 05 : introduction/Étape 6/statut corrigés en PWM + terminé. **Dessins refaits** (une vue de dessus commune) : les gouvernes de l'empennage en V sont maintenant sur les bords de fuite des gouvernes de queue, servos de bascule représentés, moteurs en mode avion orientés vers l'avant (▲ poussée, au lieu d'une flèche → latérale), encart vue arrière de l'empennage en V dans le Guide 01 ; dessin de la radiocommande élargi (le texte SWC était coupé) et libellé SWA 'down = ON · up = OFF'. Tableau des faits du README actualisé (orientation, montage, Q_TILT_TYPE, colonne PreArm « corrigé dans »).

- 2026-10-17 20:51 — **Préparation GitHub :** `.gitignore` (fichiers parasites macOS/éditeur), suppression de `guides/.DS_Store`, renommage des 2 captures à la racine en noms ASCII (elles contenaient une espace cachée U+202F) : `screenshots/qgc-firmware-update-popup_2026-10-17_0101.png`, `screenshots/qgc-first-screenshot_2026-10-17_0030.png`. Nouvelle page d'accueil `index.html` et une section « Organisation du dépôt ». Vérifié : pas de GPS EXIF dans les photos, pas de chemins/e-mails personnels dans les fichiers. ⚠️ Note de confidentialité pour l'utilisateur : `guides/guide4_screenshots/arm-test-safety-switch_2032.png` (et légèrement `sensor-status_2008.png`) montrent la carte satellite de QGC autour de la position de l'utilisateur.

- 2026-10-17 20:53 — Ajout de `quick/` (listes de tâches courtes en Markdown pour les Guides 01–05), d'une ligne « Commencez ici » en haut de ce README, de `.nojekyll` (GitHub Pages sert les fichiers tels quels, les liens fonctionnent donc de la même façon en ligne et hors ligne), et de liens depuis `index.html`. Dépôt : https://github.com/soufianeblog/dronev2 (public, l'utilisateur accepte les captures de carte).

- 2026-10-17 21:46 — `quick/` réécrit dans un format convivial : la même mise en page dans chaque fichier (navigation ← Sommaire →, lien vers le guide complet, Objectif / Il vous faut, étapes à cocher ☐, ✅ Terminé quand, tableau Problèmes), plus un quick/README avec un résumé de l'appareil, la liste ordonnée (05 avant 04), les durées et les règles. Rendu vérifié avec l'API Markdown de GitHub (tableaux + 52 cases à cocher). README : ligne Sommaire.

- 2026-10-17 21:48 — **Séparation du README** (utilisateur : le README contenait des informations internes inutiles) : README.md est maintenant une courte présentation publique (appareil, commandes, tableau d'avancement avec liens HTML + MD, matériel, sécurité, organisation du dépôt). Tout ce qui est interne (règles de travail, faits connus, plan des sorties, tableau PreArm, détails de la feuille de route, journal d'avancement, questions ouvertes) a été déplacé ici dans `docs/project-notes.md`, qui est désormais la source de vérité pour les faits et l'historique.

### Questions ouvertes
- ✅ Paramètres Q_ : simplement le téléchargement anticipé de QGC. Toujours faire Refresh ~30 s après le démarrage avant de modifier/enregistrer.
- ✅ Entrée radio résolue (option B : i6X Output mode PWM, encodeur conservé). Facultatif plus tard : option A (retirer l'encodeur, PPM/CH1 direct → RC IN) pour moins de fils/points de défaillance.
- ✅ Guide 03 F : `params_after-guide03.params` (03:32) et `params_after-guide03_2.params` (03:54) existent (orientation 0, accéléromètre + niveau calibrés).
- Point à surveiller : `Internal errors 0x100000 l:1375 flow_of_ctrl` vu **une fois** (premier démarrage après le flashage), disparu après redémarrage. Le signaler s'il réapparaît.
- Après la calibration : `PreArm: Radio failsafe on` disparaît-il avec le TX allumé ? → Guide 04 D
- `SERVO7_FUNCTION=39` (servo de lacet Tri affecté automatiquement) sur un Y3 VectoredYaw : laisser MAIN 7 vide ; à revoir dans le Guide 07.
- ✅ RC IN ← encodeur PPM ← FlySky iA10B (Output mode PWM). L'ordre des fils de l'encodeur vers les voies CH1–8 du récepteur semblait correct (les voies bougent correctement) ; vérification complète des sens dans le Guide 04 D.
- Le Pixhawk est-il déjà **installé dans l'avion** ? Sa **flèche pointe-t-elle vers le nez** ? (Ancien `AHRS_ORIENTATION=2` = Yaw90.) → Guide 03
- ✅ Queue = comportement d'empennage en V (utilisateur 19:46).
- Ajouter un **capteur de vitesse air** plus tard ? (Recommandé pour les transitions VTOL, non obligatoire)

---
© 2026 bellocloud.com
