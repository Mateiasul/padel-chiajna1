"use server";

import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
  success: boolean;
};

export async function accountCancelBooking(
  bookingId?: number
): Promise<FormState> {
  const supabase = await createClient();

  if (!bookingId) {
    return {
      success: false,
      message: "Nu s-a putut anula rezervarea. Vă rugăm să încercați din nou.",
    };
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      isActive: false,
    })
    .eq("id", bookingId);

  if (error) {
    console.log(error, "error");
    return {
      success: false,
      message: `somethign went wrong: ${error}`,
    };
  }

  // Invalidate the path where bookings are displayed
  revalidatePath("/account");

  return {
    success: true,
    message: "success",
  };
}
