# 02 · التحديث إلى ArduPlane 4.7.2

🌐 [English](../../quick/02-update-firmware.md) · [Français](../../fr/quick/02-update-firmware.md) · **العربية**

[← 01](01-connect-and-check.md) · [الفهرس](README.md) · [التالي: 03 →](03-orientation-calibration.md) · [الدليل الكامل](https://soufianeblog.github.io/dronev2/ar/guides/guide-02_2026-10-17_0220_update-arduplane-4-7-2.html)

**الهدف:** تثبيت أحدث برنامج ثابت مستقر مع الاحتفاظ بجميع الإعدادات القديمة.
**ما تحتاجه:** النسخة الاحتياطية من 01، وجهاز Mac موصول بالشاحن.

> ⚠️ لا تفصل كابل USB أبدًا أثناء تقدّم شريط التحميل.

## الخطوات

- [ ] **1. افتح صفحة البرنامج الثابت.** **Q** → **Vehicle Configuration** → **Firmware**. تعرض القائمة المنسدلة `Pixhawk1 [ArduPilot ChibiOS]`.
- [ ] **2. انقر Flash.**
- [ ] **3. افصل وأعد التوصيل.** عندما يقول QGC *"Now unplug your device and plug it back in"*: افصل كابل USB، انتظر 3 ثوانٍ، ثم أعد توصيله.
- [ ] **4. املأ النافذة المنبثقة Firmware Setup:**
  - اختر **ArduPilot**.
  - غيّر نوع المركبة من *Multi-Rotor* إلى **Plane**.
  - اختر **Pixhawk1 – 4.7.2** → **OK**.
- [ ] **5. انتظر.** عندما تظهر **Upgrade complete**، تُعيد اللوحة التشغيل من تلقاء نفسها.
- [ ] **6. حدّث.** انتظر 30 ثانية → **Parameters** → **Tools** → **Refresh**.
- [ ] **7. تحقق من الإصدار.** يجب أن تعرض الرسائل `ArduPlane V4.7.2 (fb773567)`.
- [ ] **8. خذ نسخة احتياطية.** **Tools** → **Save to file…** → `backups/params_after-guide02_4.7.2.params`

## ✅ يكتمل عندما

- يكون الإصدار 4.7.2.
- تحتوي النسخة الاحتياطية على نحو **1,430** معاملًا. والإعدادات القديمة مثل `Q_FRAME_CLASS = 7` لا تزال موجودة.

## مشاكل؟

| ما تراه | ما تفعله |
|---|---|
| *"Vehicle did not return the full parameter list"* | **Parameters → Tools → Refresh** |
| النافذة المنبثقة تقترح Multi-Rotor | غيّرها إلى **Plane**. هذا هو الخطأ الأكثر شيوعًا. |
| فشلت عملية التحميل (Flash) | انقر Flash مرة أخرى. محمّل الإقلاع (bootloader) آمن، لذا لا يمكن أن تتلف اللوحة نهائيًا. |

---
© 2026 bellocloud.com
