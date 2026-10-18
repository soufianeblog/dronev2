<div dir="rtl">

# 01 · الاتصال والتحقق من ArduPlane

[English](../../quick/01-connect-and-check.md) · [Français](../../fr/quick/01-connect-and-check.md) · **العربية**


[الفهرس](README.md) · [التالي: 02 →](02-update-firmware.md) · [الدليل الكامل](https://soufianeblog.github.io/dronev2/ar/guides/guide-01_2026-10-17_0113_connect-and-check-arduplane.html)

**الهدف:** معرفة ما هو موجود على اللوحة وأخذ نسخة احتياطية منه. لا يتم تغيير أي شيء.
**ما تحتاجه:** Pixhawk، كابل USB، QGroundControl 5.1.5.

## الخطوات

- [ ] **1. الاتصال.** وصّل Pixhawk بجهاز Mac عبر USB وافتح QGC. انتظر حتى يعرض الشريط العلوي **Not Ready**.
- [ ] **2. اقرأ رسائل بدء التشغيل.** انقر **أيقونة الرسائل** في الشريط العلوي وابحث عن:
  - `ArduPlane V4.x.x`
  - `Pixhawk1`
  - `QuadPlane initialised, Frame: TRI`
- [ ] **3. افتح المعاملات.** **Q** → **Vehicle Configuration** → **Parameters** (أسفل القائمة اليسرى).
  - إذا ظهرت نافذة منبثقة تقول *"Parameters are missing from firmware"*، انقر **Ok**. لا ضرر منها.
- [ ] **4. تحقق من أربعة إعدادات.** اكتب كل اسم في مربع البحث:

  | المعامل | يجب أن يكون |
  |---|---|
  | `Q_ENABLE` | 1 |
  | `Q_FRAME_CLASS` | 7 (Tri) |
  | `Q_TILT_TYPE` | 2 (VectoredYaw) |
  | `Q_TILT_MASK` | 3 |

- [ ] **5. خذ نسخة احتياطية.** **Tools** (أعلى اليمين) → **Save to file…** → `backups/params-backup_<date>_before-guide02.params`

## ✅ يكتمل عندما

- تعرض الرسائل ArduPlane مع QuadPlane TRI.
- يكون ملف النسخة الاحتياطية موجودًا في `backups/`.

## مشاكل؟

| ما تراه | ما تفعله |
|---|---|
| "Comms Lost" في الشريط العلوي | افصل كابل USB، انتظر 3 ثوانٍ، ثم أعد توصيله |
| لا تجد Parameters | إنها ضمن **Vehicle Configuration**، في أسفل القائمة اليسرى |

---
© 2026 bellocloud.com

</div>
