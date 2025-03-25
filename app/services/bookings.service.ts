import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const bookingSchema = z.object({
  booking_date: z.string(),
  court_id: z.number(),
  created_at: z.string(),
  customer_email: z.string(),
  customer_name: z.string(),
  customer_phone: z.string(),
  court_name: z.string(),
  end_time: z.string(),
  id: z.number(),
  start_time: z.string(),
  isActive: z.boolean().nullable(),
});

const getAllBookingsResponseSchema = z.array(bookingSchema);
export type GetAllBookingsResponse = z.infer<
  typeof getAllBookingsResponseSchema
>;

export const getAllBookings = async (
  date: Date
): Promise<GetAllBookingsResponse | undefined> => {
  const supabase = await createClient();
  const dateString = date.toISOString().split("T")[0];

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", dateString);

    if (error) {
      throw error;
    }

    const dataResult = getAllBookingsResponseSchema.safeParse(data);
    if (!dataResult.success) {
      console.error(dataResult.error, "Failed validation");
      return undefined;
    }

    return dataResult.data;
  } catch (error) {
    console.error("Eroare la încărcarea rezervărilor:", error);
  }
};

export const getBookingsByUser = async (): Promise<
  GetAllBookingsResponse | undefined
> => {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) {
    throw new Error("something went wrong");
  }
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error("something went wrong");
    }

    const dataResult = getAllBookingsResponseSchema.safeParse(data);
    if (!dataResult.success) {
      console.error(dataResult.error, "Failed validation");
      throw new Error("something went wrong");
    }

    return dataResult.data;
  } catch (error) {
    console.error("Eroare la încărcarea rezervărilor:", error);
  }
};
