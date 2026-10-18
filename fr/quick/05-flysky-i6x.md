# 05 · Configuration de l'émetteur FlySky i6X

[English](../../quick/05-flysky-i6x.md) · **Français** · [العربية](../../ar/quick/05-flysky-i6x.md)


[← 03](03-orientation-calibration.md) · [Sommaire](README.md) · [Suivant : 04 →](04-radio-modes-arming.md) · [Guide complet](https://soufianeblog.github.io/dronev2/fr/guides/guide-05_2026-10-17_1421_flysky-i6x-transmitter-setup.html)

**Objectif :** un émetteur propre. Aucun mixage, SWA sur Ch5, SWC sur Ch6.
**Il vous faut :** l'i6X, et le récepteur alimenté par le Pixhawk via l'USB.

## Touches

| Action | Touche |
|---|---|
| Ouvrir le menu | **maintenir OK** (2 s) |
| Se déplacer / modifier une valeur | **UP / DOWN** |
| Ouvrir un élément / champ suivant | **appui court sur OK** |
| Revenir sans enregistrer | **CANCEL** |
| Enregistrer et revenir | **maintenir CANCEL** (2 s) |

> Sur les écrans avec une liste de voies (Reverse, End points, Subtrim…) : **appui court sur OK = voie suivante**, **UP/DOWN = modifier la valeur**. N'y faites pas défiler avec UP/DOWN.

> ⚠️ **N'ouvrez jamais RX setup → RF standard.** Le modifier peut rompre la liaison avec le récepteur.

**Allumez avec les 4 interrupteurs EN HAUT et le manche des gaz EN BAS.** Sinon l'i6X continue de biper.

## Étapes

Chaque chemin part de l'écran d'accueil (*maintenir OK → menu*).

- [ ] **1.** Écran d'accueil : barres de batterie **TX** et **RX** visibles, `SigS1: 10` → le récepteur est appairé
- [ ] **2.** System setup → **Type select** → **Airplane**
- [ ] **3.** System setup → **Sticks mode** → **2**
- [ ] **4.** System setup → **Aux switches** → tous sur **On**, Ch **10**
- [ ] **5.** Functions setup → **V Tail**, **Elevon**, **Mixes** → tous sur **Off** (le Pixhawk fait les mixages)
- [ ] **6.** Functions setup → **Throttle hold** → **Off**
- [ ] **7.** Functions setup → **Throttle curve** → 0 / 25 / 50 / 75 / 100
- [ ] **8.** Functions setup → **Dual rate/exp.** → Ch1, Ch2, Ch4 : Rate **100**, Exp **0**
- [ ] **9.** Functions setup → **Assign switches** → tous sur **None**
- [ ] **10.** Functions setup → **Reverse** → tous sur **Nor**
- [ ] **11.** Functions setup → **End points** → tous à **100% / 100%**
- [ ] **12.** Functions setup → **Subtrim** → tous à **0** (la voie surlignée peut sembler décalée d'1 px ; c'est normal)
- [ ] **13.** **Trims :** utilisez les 4 petits boutons à bascule à côté des manches → centrez chacun (un **bip plus aigu** = centre)
- [ ] **14.** Functions setup → **Aux. channels** → Channel 5 = **SwA**, Channel 6 = **SwC** → **maintenir CANCEL**
- [ ] **15.** System setup → **RX setup** → **Output mode** → **PWM** (Serial : i-BUS) → **maintenir CANCEL**
- [ ] **16.** Functions setup → **Display** → bougez chaque commande et vérifiez que seule sa propre barre bouge :

  | Mouvement | Barre |
  |---|---|
  | Manche droit ←→ | Ch1 |
  | Manche droit ↑↓ | Ch2 |
  | Manche gauche ↑↓ | Ch3 |
  | Manche gauche ←→ | Ch4 |
  | SWA | Ch5 |
  | SWC haut / milieu / bas | Ch6 butée / milieu / butée |

## ✅ Terminé quand

Chaque commande ne fait bouger que sa propre barre sur l'écran Display.

## Un problème ?

| Vous voyez | Faites ceci |
|---|---|
| *"Turn off receiver first"* | Débranchez l'USB du Pixhawk, modifiez le réglage, rebranchez-le |
| *"This will change the AFHDS mode, are you sure?"* | Appuyez sur **CANCEL** / **No** (vous avez ouvert RF standard par erreur) |
| Étape 15 : PWM ou PPM ? | **PWM** si une carte encodeur PPM se trouve entre le récepteur et RC IN (notre montage). **PPM** uniquement avec un câble direct de PPM/CH1 vers RC IN. |

---
© 2026 bellocloud.com
