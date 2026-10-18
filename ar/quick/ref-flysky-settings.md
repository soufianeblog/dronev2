<div dir="rtl">

# FlySky i6X: كل الإعدادات في لمحة

[English](../../quick/ref-flysky-settings.md) · [Français](../../fr/quick/ref-flysky-settings.md) · **العربية**




[الفهرس](README.md) · [الصفحة الكاملة](https://soufianeblog.github.io/dronev2/ar/guides/ref-flysky-settings.html)

تم **تغيير إعدادين فقط**. وتم فحص 9 شاشات أخرى وكانت صحيحة أصلًا.

## الأزرار

| الإجراء | الزر |
|---|---|
| فتح القائمة | **اضغط مطولًا على OK** (ثانيتان) |
| التنقل / تغيير قيمة | **UP / DOWN** |
| فتح عنصر · الحقل أو القناة التالية | **ضغطة قصيرة على OK** |
| الرجوع دون حفظ | **CANCEL** |
| الحفظ والرجوع | **اضغط مطولًا على CANCEL** (ثانيتان) |

## ما تم تغييره (2)

### Functions setup → Aux. channels

![Functions setup → Aux. channels](../../assets/drawings/i6x-aux-channels.svg)

| قبل | بعد |
|---|---|
| Channel 5 = VrA · Channel 6 = VrB · Channel 7 = لا شيء | Channel 5 = **SwA** · Channel 6 = **SwC** · Channel 7 = **SwB** |

أصبح SWA الآن يقوم بالتسليح/فك التسليح (في Pixhawk `RC5_OPTION=153`). وأصبح SWC يختار وضع الطيران (في Pixhawk `FLTMODE_CH=6`). و<bdi>SWB</bdi> (القناة 7، أُضيف في 2026-10-18، الدليل 06) = العودة إلى نقطة الإقلاع (في Pixhawk `RC7_OPTION=4`). لم يعد المقبضان VrA/VrB مستخدمين.

### System setup → RX setup → Output mode

![System setup → RX setup → Output mode](../../assets/drawings/i6x-output-mode.svg)

| قبل | بعد |
|---|---|
| PPM | **PWM** (Serial: i-BUS) |

توجد لوحة مشفّر PPM بين جهاز الاستقبال ومدخل RC IN في Pixhawk. تحتاج هذه اللوحة إلى إشارة PWM واحدة لكل قناة، وتبني إشارة PPM بنفسها. مع PPM كان Pixhawk يرى قيمًا متجمدة؛ ومع PWM يعمل كل شيء.

## ما تم فحصه وتُرك كما هو

| الشاشة | القيمة | السبب |
|---|---|---|
| System setup → Type select | Airplane | قنوات بسيطة، بدون خلط خاص بالمروحيات |
| System setup → Sticks mode | 2 | اليسرى: الخانق ↑↓، الانعراج ←→ · اليمنى: الانحدار ↑↓، الدوران (roll) ←→ |
| System setup → Aux switches | All on · Ch 10 | المفاتيح قابلة للاستخدام، وعدد القنوات المرسلة كافٍ |
| Functions setup → V Tail · Elevon · Mixes · Throttle hold | All Off | يقوم Pixhawk بكل الخلط؛ الخلط المزدوج سيُفسد الانحدار/الانعراج |
| Functions setup → Throttle curve | 0 / 25 / 50 / 75 / 100 % | خط مستقيم: يرى Pixhawk الموضع الحقيقي للعصا |
| Functions setup → Dual rate/exp. | Ch1, Ch2, Ch4: 100 / 0 | المدى الكامل، بدون تنعيم (ضروري للمعايرة) |
| Functions setup → Assign switches | All None | لا يشغّل SWA/SWC أي وظيفة في جهاز الإرسال |
| Functions setup → Reverse · End points · Subtrim | Nor · 100/100 % · 0 | لا قنوات معكوسة، مدى حركة كامل، منتصف حقيقي |
| Functions setup → Display (اختبار) | كل أداة تحكم تحرّك شريطها فقط | يثبت أن جانب جهاز الإرسال صحيح |

## النتيجة: خريطة القنوات

| القناة | أداة التحكم | يستخدمها Pixhawk لـ |
|---|---|---|
| Ch1 | العصا اليمنى ←→ | الدوران (Roll) |
| Ch2 | العصا اليمنى ↑↓ | الانحدار (Pitch) |
| Ch3 | العصا اليسرى ↑↓ | الخانق (Throttle) |
| Ch4 | العصا اليسرى ←→ | الانعراج (Yaw) |
| Ch5 | SWA | تسليح (للأسفل) / فك التسليح (للأعلى) |
| Ch6 | SWC | QSTABILIZE (للأعلى) · QHOVER (الوسط) · FBWA (للأسفل) |
| Ch7 | SWB | العودة إلى نقطة الإقلاع، QRTL (للأسفل) / الرجوع إلى وضع SWC (للأعلى) |

> ⚠️ **لا تفتح أبدًا RX setup → RF standard.** تغييره قد يقطع الاتصال بجهاز الاستقبال.

---
© 2026 bellocloud.com

</div>
