import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"),
  email: z.string().email("Adresa de email invalidă"),
  phone: z.string(),
});

export const submitFormSchema = bookingFormSchema.extend({
  court_id: z.string(),
  bookingDate: z.string(),
  startHour: z.string(),
  endHour: z.string(),
});
