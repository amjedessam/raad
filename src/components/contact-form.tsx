"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/inquiry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ContactForm() {
  const t = useTranslations("contact");
  const cta = useTranslations("cta");
  const q = useTranslations("quote");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "contact", ...values }),
    });
    setStatus(res.ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <p className="card-elevated rounded-2xl bg-card p-8 text-ink">{t("success")}</p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-elevated space-y-5 rounded-[1.5rem] bg-card p-8"
    >
      <h3 className="text-xl">{t("formTitle")}</h3>
      <div>
        <Label htmlFor="name">{q("name")}</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-2 text-xs text-red-600">{q("error")}</p>}
      </div>
      <div>
        <Label htmlFor="phone">{q("phone")}</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && <p className="mt-2 text-xs text-red-600">{q("error")}</p>}
      </div>
      <div>
        <Label htmlFor="email">{q("email")}</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="mt-2 text-xs text-red-600">{q("error")}</p>}
      </div>
      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" {...register("message")} />
        {errors.message && <p className="mt-2 text-xs text-red-600">{q("error")}</p>}
      </div>
      {status === "err" && <p className="text-sm text-red-600">{q("error")}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {cta("send")}
      </Button>
    </form>
  );
}
