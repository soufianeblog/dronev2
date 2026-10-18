# 04 · Calibration radio, modes de vol, interrupteur d'armement

🌐 [English](../../quick/04-radio-modes-arming.md) · **Français** · [العربية](../../ar/quick/04-radio-modes-arming.md)

[← 05](05-flysky-i6x.md) · [Sommaire](README.md) · Suivant : 06 câblage ⏳ · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-04_2026-10-17_0345_flysky-switches-and-calibration.html)

**Objectif :** le Pixhawk lit la radio. SWC choisit le mode de vol, SWA arme.
**Il vous faut :** l'étape [05](05-flysky-i6x.md) terminée. Émetteur allumé, tous les interrupteurs **en HAUT**, manche des gaz **en BAS**. USB uniquement.

## A. Vérifier que le Pixhawk voit la radio

- [ ] **Q** → **Vehicle Configuration** → **Radio**. Bougez les manches : les points du **Raw Channel Monitor** doivent bouger.
  - Points figés ? Allez à [Problèmes](#problèmes).

## B. Calibrer

- [ ] **1.** Sur la page Radio : liste déroulante **Mode 2**, **Centered Throttle** décoché.
- [ ] **2.** Cliquez sur **Calibrate** → **OK**.
- [ ] **3.** Gaz en bas, autres manches au centre → **Next**.
- [ ] **4.** QGC demande un mouvement de manche à la fois. Poussez chaque manche jusqu'en butée du côté indiqué et **maintenez-le** ; QGC passe à la suite tout seul :
  - gaz haut → bas
  - lacet droite → gauche
  - roulis droite → gauche
  - tangage haut → bas
- [ ] **5.** *"Move all the transmitter switches…"* : basculez chaque interrupteur et tournez les deux potentiomètres d'une butée à l'autre → **Next**.
- [ ] **6.** *"All settings have been captured…"* → **Next** (cela enregistre).
- [ ] **7.** Vérifiez :
  - manche droit à droite → la barre **Roll** se déplace vers la droite
  - manche gauche en haut → la barre **Throttle** monte

## C. Modes de vol sur SWC

**Q** → **Vehicle Configuration** → **Flight Modes**

- [ ] **Flight mode channel :** **Channel 6**
- [ ] Réglez les 6 modes :

  | Flight Mode | Régler sur | SWC |
  |---|---|---|
  | 1 | **QLAND** | haut |
  | 2 | QLAND | |
  | 3 | QHOVER | |
  | 4 | **QHOVER** | milieu |
  | 5 | FBWA | |
  | 6 | **FBWA** | bas |

- [ ] **Switch Options :** réglez **Channel option 6 à 16** tous sur **Do Nothing**
- [ ] Basculez SWC et regardez quel **libellé "Flight Mode N" devient jaune** : haut → 1, milieu → 4, bas → 6

## D. Armement et GPS

**Parameters** → recherchez chaque nom → modifiez-le → **Save**

- [ ] `RC5_OPTION` = **153** (ArmDisarm). Laissez-le tel quel. → **SWA en bas = armé, en haut = désarmé**
- [ ] `ARMING_RUDDER` = **Disabled (0)**. Pas d'armement avec les manches.
- [ ] `GPS1_TYPE` = **Auto (1)** → **Tools → Reboot Vehicle**

## E. Test

**Q** → **Fly**. Surveillez la barre du haut.

- [ ] SWC haut / milieu / bas → la barre du haut affiche **QLand / QHover / FBWA**
- [ ] SWC au milieu, gaz en bas, **SWA en bas** → refusé avec *"Arm: Hardware safety switch"* (correct au banc) → **remettez SWA en haut**

## F. Sauvegarde

- [ ] Refresh → **Tools** → **Save to file…** → `backups/params_after-guide04.params`

## ✅ Terminé quand

- Les modes suivent SWC.
- SWA tente d'armer, et les vérifications de sécurité refusent.
- *"Radio failsafe on"* a disparu des messages.

## Problèmes

| Vous voyez | Faites ceci |
|---|---|
| Raw Channel Monitor figé, une voie tremble | Encodeur PPM + récepteur réglé en PPM. Solution : i6X **Output mode → PWM** ([05](05-flysky-i6x.md), étape 15) |
| Calibration : "Next" est grisé | Normal. Maintenez le manche en butée ; QGC continue tout seul. |
| *"Throttle channel reversed"* | i6X **Reverse → Ch3 → Rev**, puis recalibrez |
| "Channel option 6" devient aussi jaune | Normal. Cela signifie seulement que la voie 6 est haute. Elle ne fait rien tant qu'elle est réglée sur Do Nothing. |
| Messages au banc : No GPS lock, Battery low, Safety switch | Attendu en intérieur sur USB |

---
© 2026 bellocloud.com
