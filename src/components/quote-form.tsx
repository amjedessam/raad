"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { projectTypes, quoteFormSchema, type QuoteFormValues } from "@/lib/inquiry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

const stepFields: (keyof QuoteFormValues)[][] = [
  ["type"],
  ["area"],
  ["city"],
  ["name", "phone", "email"],
];

export function QuoteForm() {
  const t = useTranslations("quote");
  const cta = useTranslations("cta");
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      type: "villa",
      area: "",
      city: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const type = watch("type");

  async function onNext() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(values: QuoteFormValues) {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "quote", ...values }),
    });
    setStatus(res.ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="card-elevated rounded-[1.75rem] bg-card p-10">
        <p className="text-2xl text-ink">{t("success")}</p>
      </div>
    );
  }

  const labels = [t("steps.type"), t("steps.area"), t("steps.location"), t("steps.contact")];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 3) void onNext();
        else void handleSubmit(onSubmit)(e);
      }}
      className="card-elevated rounded-[1.75rem] bg-card p-8 md:p-12"
    >
      <ol className="mb-10 flex gap-2">
        {labels.map((label, i) => (
          <li
            key={label}
            className={`flex-1 rounded-full py-2 text-center text-[11px] tracking-wide ${i <= step ? "bg-[#0F1B2D] text-white" : "bg-mist text-ink-muted"}`}
          >
            {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {projectTypes.map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setValue("type", key, { shouldValidate: true })}
              className={`rounded-2xl border px-4 py-4 text-start text-sm transition ${
                type === key
                  ? "border-copper bg-copper/5 text-ink"
                  : "border-line hover:border-copper/40"
              }`}
            >
              {t(`types.${key}`)}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <Label htmlFor="area">{t("areaLabel")}</Label>
          <Input id="area" type="number" min={50} {...register("area")} />
          {errors.area && <p className="mt-2 text-xs text-red-600">{t("error")}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <Label htmlFor="city">{t("city")}</Label>
          <Input id="city" placeholder="الرياض — النرجس" {...register("city")} />
          {errors.city && <p className="mt-2 text-xs text-red-600">{t("error")}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <div>
            <Label htmlFor="qname">{t("name")}</Label>
            <Input id="qname" {...register("name")} />
            {errors.name && <p className="mt-2 text-xs text-red-600">{t("error")}</p>}
          </div>
          <div>
            <Label htmlFor="qphone">{t("phone")}</Label>
            <Input id="qphone" {...register("phone")} />
            {errors.phone && <p className="mt-2 text-xs text-red-600">{t("error")}</p>}
          </div>
          <div>
            <Label htmlFor="qemail">{t("email")}</Label>
            <Input id="qemail" type="email" {...register("email")} />
            {errors.email && <p className="mt-2 text-xs text-red-600">{t("error")}</p>}
          </div>
          <div>
            <Label htmlFor="qnotes">{t("notes")}</Label>
            <Textarea id="qnotes" {...register("notes")} />
          </div>
        </div>
      )}

      {status === "err" && <p className="mt-4 text-sm text-red-600">{t("error")}</p>}

      <div className="mt-10 flex gap-3">
        {step > 0 && (
          <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
            {cta("back")}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {step === 3 ? cta("submit") : cta("next")}
        </Button>
      </div>
    </form>
  );
}
