// lib/contact/actions.ts
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ── validation schema ─────────────────────────────────────────

const ContactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(64).trim(),
  company: z.string().max(100).trim().optional(),
  email:   z.email("Please enter a valid email").toLowerCase(),
  phone:   z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15)
    .regex(/^[+\d\s\-()]+$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  message: z.string().min(20, "Please tell us a bit more (min 20 characters)").max(2000),
  source:  z.string().optional(),
});

// ── types ─────────────────────────────────────────────────────

export type FormState =
  | { status: "idle"    }
  | { status: "success"; leadId: string }
  | { status: "error";   message: string; fields?: Record<string, string[]> };

// ── action ────────────────────────────────────────────────────

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {

  // 1. Extract fields
  const raw = {
    name:    formData.get("name"),
    company: formData.get("company") || undefined,
    email:   formData.get("email"),
    phone:   formData.get("phone"),
    service: formData.get("service"),
    website: formData.get("website") || undefined,
    message: formData.get("message"),
    source:  formData.get("source") || undefined,
  };

  // 2. Validate
  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fields: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // 3. Duplicate check — same email + service within 24h
  const recent = await prisma.lead.findFirst({
    where: {
      email:     data.email,
      service:   data.service,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  if (recent) {
    return {
      status: "error",
      message: "We already received your enquiry. Our team will be in touch within 4 hours.",
    };
  }

  // 4. Save to DB
  const lead = await prisma.lead.create({
    data: {
      name:    data.name,
      company: data.company ?? null,
      email:   data.email,
      phone:   data.phone,
      service: data.service,
      website: data.website ?? null,
      message: data.message,
      source:  data.source ?? null,
      status:  "NEW",
    },
  });

  // 5. TODO: Add email notification here later
  // await sendLeadEmail(lead);

  // 6. Revalidate admin leads page if you have one
  revalidatePath("/dashboard/leads");

  return { status: "success", leadId: lead.id };
}