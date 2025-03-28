"use server";

import { createClient } from "../utils/supabase/server";
import { submitFormSchema } from "../utils/types/schemas";

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(formData: FormData): Promise<FormState> {
  const formEntries = Object.fromEntries(formData);
  const parsed = submitFormSchema.safeParse(formEntries);
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formEntries[key].toString();
    }
    return {
      message: "Invalid form data",
      success: false,
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { error } = await supabase.from("bookings").insert([
    {
      court_id: +parsed.data.court_id,
      booking_date: parsed.data.bookingDate,
      start_time: parsed.data.startHour,
      court_name: parsed.data.court_name,
      end_time: parsed.data.endHour,
      customer_name: parsed.data.name,
      customer_email: parsed.data.email,
      customer_phone: parsed.data.phone,
      isActive: true,
      user_id: data.user?.id,
    },
  ]);

  if (error) {
    console.log(error, "error");
    return {
      success: false,
      message: `somethign went wrong: ${error}`,
    };
  }

  return {
    success: true,
    message: "success",
  };
}
