# تسلسل الفكرة — الموقع الرسمي

مكتب هندسي في الرياض. الهوية البصرية مثبتة في الوثيقة التنفيذية `docs/EXECUTIVE.md`.

## تشغيل محلي

```bash
npm install
cp .env.example .env.local
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) للعربية، و `/en` للإنجليزية.

## البريد (Resend)

ضع `RESEND_API_KEY` في `.env.local`. بدون المفتاح تُسجَّل الطلبات في طرف الخادم حتى لا يتعطل النموذج أثناء التطوير.

## Sanity

المحتوى الحالي يعمل من `src/content/site.ts`. عند جاهزية مشروع Sanity عبّئ `NEXT_PUBLIC_SANITY_PROJECT_ID` واستخدم المخططات في `sanity/schemas.ts`.

## الصور

لا تُستخدم صور مولَّدة. كل موضع يحمل اسم `placeholder-...` واضحًا لاستبداله بشعاركم وأرشيف المشاريع.
