import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const courtsSchema = z.object({
  court_number: z.number(),
  created_at: z.string(),
  description: z.string(),
  id: z.number(),
  name: z.string(),
});

const getAllCourtsResponseSchema = z.array(courtsSchema);

export type GetAllCourtsResponse = z.infer<typeof getAllCourtsResponseSchema>;

export const getAllCourts = async (): Promise<
  GetAllCourtsResponse | undefined
> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("padel_courts")
      .select("*")
      .order("court_number");

    if (error) {
      throw error;
    }

    const dataResult = getAllCourtsResponseSchema.safeParse(data);
    if (!dataResult.success) {
      console.error(dataResult.error, "Failed validation");
      return undefined;
    }

    return dataResult.data;
  } catch (error) {
    console.error("Eroare la încărcarea terenurilor:", error);
  }
};
