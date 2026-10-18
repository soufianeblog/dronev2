# Modifications de paramètres : avant → après

[English](../../quick/ref-parameter-changes.md) · **Français** · [العربية](../../ar/quick/ref-parameter-changes.md)


[Sommaire](README.md) · [Page complète](https://soufianeblog.github.io/dronev2/fr/guides/ref-parameter-changes.html)

Comparaison : `backups/params_after-guide02_4.7.2.params` (ancienne configuration, juste après la mise à jour du firmware) → `backups/params_after-guide04.params` (maintenant). **Gras** = modifié.

## Toutes les modifications

| Groupe | Paramètre | Avant | Après | Guide | À quoi il sert |
|---|---|---|---|---|---|
| Firmware | `ArduPlane version` | 4.7.1 (dbe79216) | **4.7.2** (fb773567) | 02 | Dernière version stable d'ArduPlane pour la cible Pixhawk1. Tous les anciens paramètres ont été conservés. |
| Orientation | `AHRS_ORIENTATION` | 2 (Yaw90) | **0 (None)** | 03 | Indique à ArduPlane comment le Pixhawk est monté. 0 = flèche pointée vers le nez, ce qui correspond à l'installation réelle. |
| Calibration | `INS_ACCOFFS_X/Y/Z, INS_ACCSCAL_X/Y/Z` | anciennes / 1.0 | nouvelles valeurs | 03 | Calibration de l'accéléromètre 1 (6 positions) : décalages et échelle pour que le Pixhawk mesure correctement l'inclinaison. |
| Calibration | `INS_ACC2OFFS_X/Y/Z, INS_ACC2SCAL_X/Y/Z` | anciennes / 1.0 | nouvelles valeurs | 03 | Idem pour le second accéléromètre. |
| Calibration | `INS_ACC1_CALTEMP, INS_ACC2_CALTEMP` | 38.9 / 41.0 °C | 47.3 / 49.8 °C | 03 | Température de la carte enregistrée pendant la calibration de l'accéléromètre. |
| Calibration | `AHRS_TRIM_X / AHRS_TRIM_Y` | 0 / 0 | **−0.016 / −0.006** rad | 03 | Level horizon : le petit décalage en roulis/tangage (environ −0.9° et −0.3°) pour que « à plat » soit vraiment à plat. |
| Radio | `RC1_MIN / MAX / TRIM` | 1139 / 1773 / 1517 | **1000 / 1999 / 1524** | 04 | Course et centre du manche de roulis, appris par la calibration radio. |
| Radio | `RC2_MIN / MAX / TRIM` | 1186 / 1833 / 1497 | **1000 / 1999 / 1500** | 04 | Course et centre du manche de tangage. (RC2_REVERSED = 1 conservé : correspond à la convention de tangage d'ArduPlane.) |
| Radio | `RC3_MIN / MAX / TRIM` | 1000 / 1995 / 1000 | 1000 / 1995 / 1000 | 04 | Course du manche des gaz ; déjà correcte, inchangée. TRIM = minimum car les gaz n'ont pas de centre. |
| Radio | `RC4_MIN / MAX / TRIM` | 1000 / 2006 / 1517 | **1000 / 2000 / 1524** | 04 | Course et centre du manche de lacet. |
| Radio | `RC5_MIN / MAX / TRIM` | 1000 / 1001 / 1000 | **1000 / 1999 / 1499** | 04 | Course de SWA. Avant, la voie 5 ne bougeait jamais (un potentiomètre y était affecté) ; maintenant toute la course de l'interrupteur est connue. |
| Radio | `RC6_MIN / MAX / TRIM` | 999 / 1999 / 1000 | **1000 / 2000 / 1500** | 04 | Course de SWC (3 positions). |
| Radio | `RC7, RC8 MIN / MAX / TRIM` | 1496–1505 / 999–1999 | 1000 / 2000 / 1500 | 04 | Voies inutilisées : la calibration a enregistré une plage neutre 1000–2000. |
| Radio | `RC9 … RC16 MIN / MAX / TRIM` | anciennes valeurs disparates | 1000 / 2000 / 1500 | 04 | Voies que le récepteur n'envoie pas (PPM = 8 voies) : remises aux valeurs neutres par défaut par la calibration. |
| Modes de vol | `FLTMODE_CH` | 8 | **6** | 04 | Voie qui sélectionne le mode de vol : désormais la voie 6 = SWC. |
| Modes de vol | `FLTMODE1 / FLTMODE2` | 17 QSTABILIZE / 19 QLOITER | **20 QLAND / 20 QLAND** | 04 | SWC en haut = QLAND : atterrissage vertical, les moteurs s'arrêtent après le toucher. Emplacement 2 = remplissage de sécurité. |
| Modes de vol | `FLTMODE3 / FLTMODE4` | 5 FBWA / 17 QSTABILIZE | **18 QHOVER / 18 QHOVER** | 04 | SWC au milieu = QHOVER : mode drone qui maintient l'altitude quand le manche des gaz est centré. Emplacement 3 = remplissage. |
| Modes de vol | `FLTMODE5 / FLTMODE6` | 11 RTL / 5 FBWA | **5 FBWA / 5 FBWA** | 04 | SWC en bas = FBWA : mode avion avec ailes stabilisées. Emplacement 5 = remplissage. |
| Interrupteurs | `RC5_OPTION` | 153 ArmDisarm | 153 ArmDisarm (conservé) | 04 | SWA en bas arme, en haut désarme immédiatement (même en vol !). |
| Interrupteurs | `RC6_OPTION` | 4 RTL | **0 Do Nothing** | 04 | La voie 6 est l'interrupteur de mode ; elle ne peut pas aussi déclencher le Return-To-Launch. |
| Interrupteurs | `RC9_OPTION` | 34 Relay2 | **0** | 04 | Ancienne fonction résiduelle supprimée. |
| Interrupteurs | `RC10_OPTION` | 162 FFT Tune | **0** | 04 | Ancienne fonction résiduelle supprimée. |
| Interrupteurs | `RC12_OPTION` | 28 Relay1 | **0** | 04 | Ancienne fonction résiduelle supprimée. |
| Interrupteurs | `RC13_OPTION` | 24 Auto mission reset | **0** | 04 | Ancienne fonction résiduelle supprimée. |
| Interrupteurs | `RC14_OPTION` | 16 AUTO mode | **0** | 04 | Ancienne fonction résiduelle supprimée. |
| Interrupteurs | `RC16_OPTION` | 154 ArmDisarm with AirMode | **0** | 04 | Ancienne fonction résiduelle supprimée (un second interrupteur d'armement sur une voie que le récepteur n'envoie pas). |
| Armement | `ARMING_RUDDER` | 2 ArmOrDisarm | **0 Disabled** | 04 | Plus d'armement avec les manches (gaz en bas + lacet à droite). SWA est le seul moyen d'armer. |
| GPS | `GPS1_TYPE` | 1 Auto | 1 Auto (confirmé) | 04 | GPS sur le port 1, détection automatique (u-blox M8N). Il a affiché 0 une fois car QGC avait chargé une liste incomplète ; réglé sur Auto et confirmé. |

## Réglages importants conservés de l'ancienne configuration

| Paramètre | Valeur | À quoi il sert |
|---|---|---|
| `Q_ENABLE` | 1 | QuadPlane (VTOL) activé |
| `Q_FRAME_CLASS` | 7 | Tricoptère : 3 moteurs de sustentation |
| `Q_TILT_ENABLE / Q_TILT_MASK` | 1 / 3 | Les moteurs 1 + 2 basculent |
| `Q_TILT_TYPE` | 2 | VectoredYaw : les servos de bascule gèrent aussi le lacet |
| `Q_TILT_MAX / Q_TILT_YAW_ANGLE` | 70 / 10° | Bascule max en modes VTOL / plage de bascule pour le lacet |
| `SERVO1/2_FUNCTION` | 4 Aileron | MAIN 1–2 : ailerons |
| `SERVO3/4_FUNCTION` | 79 / 80 VTailLeft/Right | MAIN 3–4 : empennage en V |
| `SERVO5/6/8_FUNCTION` | 33 / 34 / 36 Motor1/2/4 | MAIN 5, 6, 8 : ESC |
| `SERVO7_FUNCTION` | 39 | Affecté automatiquement par le châssis Tri (laisser MAIN 7 libre) |
| `SERVO9/10_FUNCTION` | 75 / 76 TiltMotorFrontLeft/Right | AUX 1–2 : servos de bascule |
| `BATT_MONITOR` | 4 | Module d'alimentation analogique (tension + courant) |
| `BRD_SAFETY_DEFLT` | 1 | Le bouton de sécurité doit être pressé avant d'armer |

## Valeurs qui changent d'elles-mêmes

| Paramètre | Pourquoi elle change |
|---|---|
| `INS_GYROFFS_*, INS_GYR2OFFS_*, INS_GYR*_CALTEMP` | Décalages des gyroscopes, remesurés automatiquement à chaque démarrage. |
| `BARO1_GND_PRESS` | Pression atmosphérique au sol, mesurée à chaque démarrage. |
| `STAT_*` | Statistiques : nombre de démarrages, temps de fonctionnement, temps de vol. |
| `BRD_SD_SLOWDOWN` | Réglage de vitesse de la carte SD ajusté par la carte. |

> 💡 Après un redémarrage, QGC peut n'afficher que ~1 276 des ~1 430 paramètres. Utilisez **Parameters → Tools → Refresh** avant d'enregistrer ou de comparer.

---
© 2026 bellocloud.com
