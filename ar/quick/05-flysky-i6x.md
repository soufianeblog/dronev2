<div dir="rtl">

# 05 · إعداد جهاز الإرسال FlySky i6X

[English](../../quick/05-flysky-i6x.md) · [Français](../../fr/quick/05-flysky-i6x.md) · **العربية**


[← 03](03-orientation-calibration.md) · [الفهرس](README.md) · [التالي: 04 →](04-radio-modes-arming.md) · [الدليل الكامل](https://soufianeblog.github.io/dronev2/ar/guides/guide-05_2026-10-17_1421_flysky-i6x-transmitter-setup.html)

**الهدف:** جهاز إرسال نظيف. بدون خلط، SWA على Ch5، وSWC على Ch6.
**ما تحتاجه:** جهاز i6X، وجهاز الاستقبال يتغذى من Pixhawk عبر USB.

## الأزرار

| الإجراء | الزر |
|---|---|
| فتح القائمة | **اضغط مطولًا على OK** (ثانيتان) |
| التنقل / تغيير قيمة | **UP / DOWN** |
| فتح عنصر / الحقل التالي | **ضغطة قصيرة على OK** |
| الرجوع دون حفظ | **CANCEL** |
| الحفظ والرجوع | **اضغط مطولًا على CANCEL** (ثانيتان) |

> في الشاشات التي تحتوي على قائمة قنوات (Reverse، End points، Subtrim…): **ضغطة قصيرة على OK = القناة التالية**، **UP/DOWN = تغيير القيمة**. لا تتنقل باستخدام UP/DOWN هناك.

> ⚠️ **لا تفتح أبدًا RX setup → RF standard.** تغييره قد يقطع الاتصال بجهاز الاستقبال.

**شغّل الجهاز وجميع المفاتيح الأربعة للأعلى وعصا الخانق للأسفل.** وإلا سيستمر i6X في إصدار التنبيهات الصوتية.

## الخطوات

كل مسار يبدأ من الشاشة الرئيسية (*اضغط مطولًا على OK → القائمة*).

- [ ] **1.** الشاشة الرئيسية: أشرطة بطارية **TX** و**RX** ظاهرة، `SigS1: 10` → جهاز الاستقبال مرتبط
- [ ] **2.** System setup → **Type select** → **Airplane**
- [ ] **3.** System setup → **Sticks mode** → **2**
- [ ] **4.** System setup → **Aux switches** → الكل **On**، Ch **10**
- [ ] **5.** Functions setup → **V Tail**، **Elevon**، **Mixes** → الكل **Off** (يقوم Pixhawk بالخلط)
- [ ] **6.** Functions setup → **Throttle hold** → **Off**
- [ ] **7.** Functions setup → **Throttle curve** → 0 / 25 / 50 / 75 / 100
- [ ] **8.** Functions setup → **Dual rate/exp.** → Ch1، Ch2، Ch4: Rate **100**، Exp **0**
- [ ] **9.** Functions setup → **Assign switches** → الكل **None**
- [ ] **10.** Functions setup → **Reverse** → الكل **Nor**
- [ ] **11.** Functions setup → **End points** → الكل **100% / 100%**
- [ ] **12.** Functions setup → **Subtrim** → الكل **0** (قد تبدو القناة المظللة منحرفة ببكسل واحد؛ هذا طبيعي)
- [ ] **13.** **Trims:** استخدم المفاتيح الصغيرة الأربعة بجانب العصي → اضبط كل واحد في المنتصف (**صفارة أعلى** = المنتصف)
- [ ] **14.** Functions setup → **Aux. channels** → Channel 5 = **SwA**، Channel 6 = **SwC** → **اضغط مطولًا على CANCEL**
- [ ] **15.** System setup → **RX setup** → **Output mode** → **PWM** (Serial: i-BUS) → **اضغط مطولًا على CANCEL**
- [ ] **16.** Functions setup → **Display** → حرّك كل أداة تحكم وتحقق من أن شريطها وحده هو الذي يتحرك:

  | الحركة | الشريط |
  |---|---|
  | العصا اليمنى ←→ | Ch1 |
  | العصا اليمنى ↑↓ | Ch2 |
  | العصا اليسرى ↑↓ | Ch3 |
  | العصا اليسرى ←→ | Ch4 |
  | SWA | Ch5 |
  | SWC للأعلى / الوسط / للأسفل | Ch6 طرف / وسط / طرف |

## ✅ يكتمل عندما

كل أداة تحكم تحرّك شريطها فقط في شاشة Display.

## مشاكل؟

| ما تراه | ما تفعله |
|---|---|
| *"Turn off receiver first"* | افصل كابل USB عن Pixhawk، غيّر الإعداد، ثم أعد توصيله |
| *"This will change the AFHDS mode, are you sure?"* | اضغط **CANCEL** / **No** (لقد فتحت RF standard عن طريق الخطأ) |
| الخطوة 15: PWM أم PPM؟ | **PWM** إذا كانت لوحة مشفّر PPM موجودة بين جهاز الاستقبال وRC IN (إعدادنا). **PPM** فقط مع كابل مباشر من PPM/CH1 إلى RC IN. |

---
© 2026 bellocloud.com

</div>
