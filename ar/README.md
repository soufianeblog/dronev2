<div dir="rtl">

# VTOL Y3: طائرة مسيّرة تطير مثل الطائرة

🌐 [English](../README.md) · [Français](../fr/README.md) · **العربية**

طائرة **VTOL ثلاثية المراوح** بمراوح قابلة للإمالة. تقلع وتهبط مثل الطائرة المسيّرة (الدرون) وتطير مثل الطائرة ذات الأجنحة. تعمل بنظام **ArduPlane 4.7.2** (QuadPlane) على **Pixhawk 2.4.8**، ويتم إعدادها باستخدام **QGroundControl 5.1.5** وجهاز الإرسال **FlySky i6X**.

> **ابدأ من هنا**
> - 🌐 **الأدلة الكاملة في المتصفح:** https://soufianeblog.github.io/dronev2/ (دون اتصال: افتح `index.html`)
> - ✅ **قوائم مهام مختصرة:** [`quick/`](quick/README.md)
> - 💾 **النسخ الاحتياطية للمعاملات:** [`backups/`](../backups/) (الأحدث: `params_after-guide04.params`)

## الطائرة

```
                    ▲ nose
      (M2)──────────┼──────────(M1)        front motors, each on a tilt servo
 ═════════════════ MAIN WING ═════════════════
   [aileron L]      │      [aileron R]     1 servo each
                    │
                  (M4)                      tail motor, fixed
           ╲═ tail L ═╪═ tail R ═╱          V-tail, 1 servo each
```

| الجزء | الوظيفة |
|---|---|
| محركان أماميان (M1، M2) + محركا سيرفو للإمالة | يتجهان **للأعلى** في وضع الدرون، ويميلان **للأمام** في وضع الطائرة. ويتحكمان أيضًا في الانعراج (yaw) في وضع الدرون. |
| محرك خلفي واحد (M4) | للرفع في وضع الدرون فقط، و**متوقف** في وضع الطائرة |
| جنيحان | للدوران حول المحور الطولي (roll) في وضع الطائرة |
| جناحا الذيل (الذيل على شكل V) | الانحدار (pitch) = يتحركان معًا، الانعراج (yaw) = يتحركان بشكل متعاكس |

## أدوات التحكم (FlySky i6X، الوضع Mode 2)

| أداة التحكم | الوظيفة |
|---|---|
| **SWA** (CH5) | **للأسفل = تسليح** (المحركات تعمل) · **للأعلى = إيقاف** |
| **SWC** (CH6) | **للأعلى = QLAND** (هبوط / خمول) · **الوسط = QHOVER** (درون) · **للأسفل = FBWA** (طائرة) |
| العصا اليسرى | ↑↓ الخانق · ←→ الانعراج |
| العصا اليمنى | ↑↓ الانحدار · ←→ الدوران (roll) |

يقوم Pixhawk بكل عمليات الخلط. في وضع الدرون، يتلاشى تأثير أسطح الجناح والذيل تلقائيًا عند السرعات المنخفضة.

## التقدم

| # | الخطوة | الدليل الكامل | قائمة المهام | الحالة |
|---|---|---|---|---|
| 01 | الاتصال والتحقق من ArduPlane | [HTML](https://soufianeblog.github.io/dronev2/ar/guides/guide-01_2026-10-17_0113_connect-and-check-arduplane.html) | [MD](quick/01-connect-and-check.md) | ✅ |
| 02 | التحديث إلى ArduPlane 4.7.2 | [HTML](https://soufianeblog.github.io/dronev2/ar/guides/guide-02_2026-10-17_0220_update-arduplane-4-7-2.html) | [MD](quick/02-update-firmware.md) | ✅ |
| 03 | الاتجاه والمعايرة | [HTML](https://soufianeblog.github.io/dronev2/ar/guides/guide-03_2026-10-17_0309_orientation-and-calibration.html) | [MD](quick/03-orientation-calibration.md) | 🟡 البوصلة بعد التوصيلات |
| 05 | إعداد جهاز الإرسال FlySky i6X | [HTML](https://soufianeblog.github.io/dronev2/ar/guides/guide-05_2026-10-17_1421_flysky-i6x-transmitter-setup.html) | [MD](quick/05-flysky-i6x.md) | ✅ |
| 04 | معايرة الراديو، أوضاع الطيران، مفتاح التسليح | [HTML](https://soufianeblog.github.io/dronev2/ar/guides/guide-04_2026-10-17_0345_flysky-switches-and-calibration.html) | [MD](quick/04-radio-modes-arming.md) | ✅ |
| 06 | التوصيلات (ESC، السيرفوهات، الطاقة) | | | ⏳ التالي |
| 07 | الحماية عند فقدان إشارة الراديو (failsafe) | | | ⏳ |
| 08 | المخرجات: المحركات، سيرفوهات الإمالة، الأسطح، الاتجاهات | | | ⏳ |
| 09 | معايرة ESC، اتجاه دوران المحركات | | | ⏳ |
| 10 | اختبار الانتقال على الطاولة، الحماية عند انخفاض البطارية | | | ⏳ |
| 11 | قائمة الفحص قبل الطيران، أول تحويم | | | ⏳ |

## المراجع

| الصفحة | HTML | Markdown |
|---|---|---|
| العصي والمفاتيح: كيف تتحرك الطائرة (رسومات) | [فتح](https://soufianeblog.github.io/dronev2/ar/guides/ref-stick-controls.html) | [MD](quick/ref-stick-controls.md) |
| FlySky i6X: كل إعداد تم تغييره والتحقق منه | [فتح](https://soufianeblog.github.io/dronev2/ar/guides/ref-flysky-settings.html) | [MD](quick/ref-flysky-settings.md) |
| تغييرات المعاملات: قبل → بعد → الغرض | [فتح](https://soufianeblog.github.io/dronev2/ar/guides/ref-parameter-changes.html) | [MD](quick/ref-parameter-changes.md) |

![الدوران لليمين في وضع الطائرة](../assets/drawings/air-roll-right.svg)

## العتاد

| الكمية | القطعة |
|---|---|
| 1 | مجموعة Pixhawk 2.4.8 (GPS M8N + بوصلة، وحدة طاقة، صفارة، مفتاح أمان) |
| 3 | محركات A2212/13T 1000 KV + وحدات ESC بقدرة 30 A |
| 6 | سيرفوهات EMAX ES08MA II (2 للإمالة، 2 للجنيحات، 2 للذيل) |
| 1 | لوحة توزيع طاقة (PDB) مع BEC بجهد 5 V / 12 V |
| 1 | بطارية LiPo 3S 3000 mAh 60C (XT60) |
| 1 | جهاز الإرسال FlySky FS-i6X + جهاز الاستقبال FS-iA10B، موصول بمدخل RC IN عبر مشفّر PPM (مخرج جهاز الاستقبال: PWM) |

## السلامة

العمل على الطاولة يكون **عبر USB فقط: بدون بطارية LiPo وبدون مراوح**، إلى أن يذكر دليلٌ خلاف ذلك صراحةً. لا تعطّل أبدًا فحوصات التسليح.

## المستودع

| المسار | المحتوى |
|---|---|
| `index.html` | صفحة البداية للأدلة (GitHub Pages أو دون اتصال) |
| `guides/` | أدلة HTML كاملة، مع لقطات الشاشة والسجلات في `guideN_screenshots/` |
| `quick/` | قوائم مهام مختصرة بصيغة Markdown |
| `backups/` | نسخ احتياطية لمعاملات QGroundControl |
| `docs/project-notes.md` | ملاحظات العمل: حقائق مؤكدة، خريطة المخرجات، سجل التقدم الكامل، أسئلة مفتوحة |
| `fr/`, `ar/` | النسختان الفرنسية والعربية من كل المحتوى (بنفس التنظيم) |
| `assets/drawings/` | الرسومات (SVG) المستخدمة في الأدلة |
| `LICENSE` | © 2026 bellocloud.com |

---
© 2026 bellocloud.com. All rights reserved.

</div>
