import { z } from "zod";

export const projectTypes = [
  "villa",
  "residential",
  "commercial",
  "interior",
  "survey",
  "permit",
  "government",
] as const;

export const quoteFormSchema = z.object({
  type: z.enum(projectTypes),
  area: z.string().min(1).refine((v) => Number(v) >= 50, { message: "area" }),
  city: z.string().min(2),
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  notes: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  message: z.string().min(8),
});

export const quoteSchema = quoteFormSchema.extend({
  kind: z.literal("quote"),
});

export const contactSchema = contactFormSchema.extend({
  kind: z.literal("contact"),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
