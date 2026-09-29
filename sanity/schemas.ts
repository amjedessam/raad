export const post = {
  name: "post",
  title: "مقال",
  type: "document",
  fields: [
    { name: "title", title: "العنوان", type: "object", fields: [
      { name: "ar", type: "string", title: "عربي" },
      { name: "en", type: "string", title: "English" },
    ]},
    { name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } },
    { name: "excerpt", title: "مقتطف", type: "object", fields: [
      { name: "ar", type: "text" },
      { name: "en", type: "text" },
    ]},
    { name: "cover", title: "صورة الغلاف", type: "image" },
    { name: "body", title: "المحتوى", type: "object", fields: [
      { name: "ar", type: "array", of: [{ type: "block" }] },
      { name: "en", type: "array", of: [{ type: "block" }] },
    ]},
    { name: "publishedAt", title: "التاريخ", type: "datetime" },
  ],
};

export const project = {
  name: "project",
  title: "مشروع",
  type: "document",
  fields: [
    { name: "title", title: "العنوان", type: "object", fields: [
      { name: "ar", type: "string" },
      { name: "en", type: "string" },
    ]},
    { name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } },
    { name: "category", title: "التصنيف", type: "string", options: {
      list: ["architectural", "structural", "surveying", "permits", "interior", "quantities"],
    }},
    { name: "cover", title: "الغلاف", type: "image" },
    { name: "gallery", title: "المعرض", type: "array", of: [{ type: "image" }] },
    { name: "challenge", type: "object", fields: [{ name: "ar", type: "text" }, { name: "en", type: "text" }] },
    { name: "solution", type: "object", fields: [{ name: "ar", type: "text" }, { name: "en", type: "text" }] },
    { name: "result", type: "object", fields: [{ name: "ar", type: "text" }, { name: "en", type: "text" }] },
  ],
};

export const schemas = [post, project];
