"use server";

import { createClient } from "../utils/supabase/server";
import { submitFormSchema } from "../utils/types/schemas";

export type FormState = {
  message: string;
  success: boolean
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = submitFormSchema.safeParse(formData);
  const supabase = await createClient()

  console.log(data,'111111111')
  console.log(parsed,'parsed')
  console.log(parsed.error,'parsed')

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      success: false,
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { error, status, data: data1 } = await supabase.from("bookings").insert([
    {
      court_id: +parsed.data.court_id,
      booking_date: parsed.data.bookingDate,
      start_time: parsed.data.startHour,
      end_time: parsed.data.endHour,
      customer_name:parsed.data.name,
      customer_email: parsed.data.email,
      customer_phone: parsed.data.phone,
    },
  ]);

  console.log(error, status, data1,'errror');


  if(error){
    return {
      success: false,
      message:`somethign went wrong: ${error}`
    }
  }

  return {
    success: true,
    message:"success"
  }
}