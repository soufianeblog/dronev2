<div dir="rtl">

# 03 · الاتجاه والمعايرة

[English](../../quick/03-orientation-calibration.md) · [Français](../../fr/quick/03-orientation-calibration.md) · **العربية**



[← 02](02-update-firmware.md) · [الفهرس](README.md) · [التالي: 05 →](05-flysky-i6x.md) · [الدليل الكامل](https://soufianeblog.github.io/dronev2/ar/guides/guide-03_2026-10-17_0309_orientation-and-calibration.html)

**الهدف:** إخبار Pixhawk بطريقة تركيبه، ثم معايرة حساساته.
**ما تحتاجه:** Pixhawk مركّب في الطائرة مع **سهمه متجهًا نحو المقدمة**، وطاولة مستوية.

> 🔄 **"Reboot Vehicle"** تعني إعادة تشغيل Pixhawk: **Parameters → Tools → Reboot Vehicle**. ثم انتظر 30 ثانية.

## الخطوات

- [ ] **1. الاتجاه.** **Parameters** → ابحث عن `AHRS_ORIENTATION` → **None (0)** → **Save** → **Reboot Vehicle**.
- [ ] **2. مقياس التسارع.** **Vehicle Configuration** → **Sensors** → **Accelerometer** → **OK**. ضع الطائرة في كل وضع من الأوضاع الستة التي يعرضها QGC (مستوية، على الجانب الأيسر، على الجانب الأيمن، المقدمة للأسفل، المقدمة للأعلى، مقلوبة). أبقها ثابتة وانقر **Next** لكل وضع.
- [ ] **3. الاستواء.** **Sensors** → **Level Horizon** → الطائرة مستوية على الطاولة (ضع رقائق تحتها لتسويتها إذا لزم الأمر) → **OK**.
- [ ] **4. البوصلة.** ⏳ *نفّذ هذا بعد دليل التوصيلات، في الخارج، بعيدًا عن المعادن.* **Sensors** → **Compass** → **OK** → أدر الطائرة ببطء حول كل محور حتى يمتلئ الشريط → **Reboot Vehicle**.
- [ ] **5. خذ نسخة احتياطية.** Refresh → **Tools** → **Save to file…** → `backups/params_after-guide03.params`

## ✅ يكتمل عندما

- `AHRS_ORIENTATION = 0`.
- أمِل المقدمة للأسفل: يعرض الأفق في QGC **انحدارًا (pitch)**، وليس دورانًا (roll).
- بعد الخطوة 4، تختفي الرسالة *"PreArm: Compass not calibrated"*.

## مشاكل؟

| ما تراه | ما تفعله |
|---|---|
| إمالة المقدمة للأسفل تُظهر دورانًا (roll) | الاتجاه خاطئ. تحقق من اتجاه السهم ومن `AHRS_ORIENTATION`. |
| لا تجد زر Gyro | هذا طبيعي. يخفيه QGC للطائرات. |

---
© 2026 bellocloud.com

</div>
