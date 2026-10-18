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

## H. Pourquoi les moteurs ne tournent pas encore ([étape 7](../guides/guide-06_2026-10-18_0210_outputs-and-servo-test.html#prearm))

Le Pixhawk refuse de s'armer tant qu'une vérification *PreArm* échoue. Lisez les messages dans QGC (écran **Fly**, texte de la barre du haut).

- [x] `Hardware safety switch` → maintenez le bouton rouge (port **SWITCH**) 2 s jusqu'à voyant fixe.
- [x] `QLand mode not armable` → Flight Mode 1/2 = QStabilize.
- [x] `QRTL mode not armable` → gardez **SWB en haut** pour armer.
- [x] `RC calibrating` → quittez la page **Radio**.
- [ ] `Battery 1 low voltage failsafe` → le Pixhawk lit < 10,5 V, le chargeur indique 12,48 V. Comparez avec l'icône batterie de QGC.
- [ ] `Compass not calibrated` → en extérieur, [Guide 03](03-orientation-calibration.md) partie E.
- Bips des ESC quand désarmé = normal (« en attente des gaz »).

## I. Reste à faire

- [ ] La lecture batterie correspond au chargeur (12,6 V pleine)
- [ ] Calibration de la boussole en extérieur
- [ ] Test d'armement : SWA en bas, puis manche gauche. Les moteurs démarrent lentement, s'arrêtent au désarmement
- [ ] Test des gaz : les 3 moteurs ensemble (le moteur arrière MAIN 8 n'a pas tourné au début)
- [ ] Calibration des ESC si besoin
- [ ] Sens de rotation de chaque moteur
- [ ] Butées des servos de basculement : lisez **Servo Outputs** en position drone et avion, ajustez `SERVO9`/`SERVO10`
- [ ] SWB en bas → le mode de vol affiche QRTL

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

---
© 2026 bellocloud.com
