<div dir="rtl">

# 04 · معايرة الراديو، أوضاع الطيران، مفتاح التسليح

[English](../../quick/04-radio-modes-arming.md) · [Français](../../fr/quick/04-radio-modes-arming.md) · **العربية**



[← 05](05-flysky-i6x.md) · [الفهرس](README.md) · [التالي: 06 ←](06-outputs-servo-test.md) · [الدليل الكامل](https://soufianeblog.github.io/dronev2/ar/guides/guide-04_2026-10-17_0345_flysky-switches-and-calibration.html)

**الهدف:** أن يقرأ Pixhawk إشارة الراديو. يختار SWC وضع الطيران، ويقوم SWA بالتسليح.
**ما تحتاجه:** إتمام [05](05-flysky-i6x.md). جهاز الإرسال قيد التشغيل، جميع المفاتيح **للأعلى**، عصا الخانق **للأسفل**. عبر USB فقط.

## A. تحقق من أن Pixhawk يرى الراديو

- [ ] **Q** → **Vehicle Configuration** → **Radio**. حرّك العصي: يجب أن تتحرك نقاط **Raw Channel Monitor**.
  - النقاط متجمدة؟ انتقل إلى [المشاكل](#المشاكل).

## B. المعايرة

- [ ] **1.** في صفحة Radio: القائمة المنسدلة **Mode 2**، وخانة **Centered Throttle** غير محددة.
- [ ] **2.** انقر **Calibrate** → **OK**.
- [ ] **3.** الخانق للأسفل، والعصي الأخرى في المنتصف → **Next**.
- [ ] **4.** يطلب QGC حركة عصا واحدة في كل مرة. ادفع كل عصا إلى الطرف الذي يعرضه و**أبقها هناك**؛ ينتقل QGC إلى الخطوة التالية من تلقاء نفسه:
  - الخانق للأعلى → للأسفل
  - الانعراج لليمين → لليسار
  - الدوران (roll) لليمين → لليسار
  - الانحدار (pitch) للأعلى → للأسفل
- [ ] **5.** *"Move all the transmitter switches…"*: حرّك كل مفتاح وأدر كلا المقبضين من طرف إلى طرف → **Next**.
- [ ] **6.** *"All settings have been captured…"* → **Next** (هذا يحفظ الإعدادات).
- [ ] **7.** تحقق:
  - العصا اليمنى لليمين → يتحرك شريط **Roll** لليمين
  - العصا اليسرى للأعلى → يرتفع شريط **Throttle**

## C. أوضاع الطيران على SWC

**Q** → **Vehicle Configuration** → **Flight Modes**

- [ ] **Flight mode channel:** **Channel 6**
- [ ] اضبط الأوضاع الستة:

  | Flight Mode | اضبطه على | SWC |
  |---|---|---|
  | 1 | **QLAND** | للأعلى |
  | 2 | QLAND | |
  | 3 | QHOVER | |
  | 4 | **QHOVER** | الوسط |
  | 5 | FBWA | |
  | 6 | **FBWA** | للأسفل |

- [ ] **Switch Options:** اضبط **Channel option 6 to 16** جميعها على **Do Nothing**
- [ ] حرّك SWC وتحقق من أي **تسمية "Flight Mode N" تتحول إلى اللون الأصفر**: للأعلى → 1، الوسط → 4، للأسفل → 6

## D. التسليح وGPS

**Parameters** → ابحث عن كل اسم → غيّره → **Save**

- [ ] `RC5_OPTION` = **153** (ArmDisarm). اتركه كما هو. → **SWA للأسفل = تسليح، للأعلى = إيقاف**
- [ ] `ARMING_RUDDER` = **Disabled (0)**. لا تسليح بالعصي.
- [ ] `GPS1_TYPE` = **Auto (1)** → **Tools → Reboot Vehicle**

## E. الاختبار

**Q** → **Fly**. راقب الشريط العلوي.

- [ ] SWC للأعلى / الوسط / للأسفل → يعرض الشريط العلوي **QLand / QHover / FBWA**
- [ ] SWC في الوسط، الخانق للأسفل، **SWA للأسفل** → يُرفض التسليح مع الرسالة *"Arm: Hardware safety switch"* (وهذا صحيح على الطاولة) → **أعد SWA للأعلى**

## F. النسخة الاحتياطية

- [ ] Refresh → **Tools** → **Save to file…** → `backups/params_after-guide04.params`

## ✅ يكتمل عندما

- تتبع الأوضاعُ المفتاحَ SWC.
- يحاول SWA التسليح، وترفضه فحوصات السلامة.
- تختفي الرسالة *"Radio failsafe on"* من الرسائل.

## المشاكل

| ما تراه | ما تفعله |
|---|---|
| Raw Channel Monitor متجمد، وقناة واحدة تهتز | مشفّر PPM + جهاز استقبال مضبوط على PPM. الحل: في i6X **Output mode → PWM** ([05](05-flysky-i6x.md)، الخطوة 15) |
| المعايرة: زر "Next" رمادي | هذا طبيعي. أبقِ العصا عند الطرف؛ يتابع QGC من تلقاء نفسه. |
| *"Throttle channel reversed"* | في i6X **Reverse → Ch3 → Rev**، ثم أعد المعايرة |
| "Channel option 6" يتحول أيضًا إلى الأصفر | هذا طبيعي. يعني فقط أن القناة 6 مرتفعة. لا يفعل شيئًا طالما هو مضبوط على Do Nothing. |
| رسائل على الطاولة: No GPS lock، Battery low، Safety switch | متوقعة داخل المبنى عبر USB |

---
© 2026 bellocloud.com

</div>
