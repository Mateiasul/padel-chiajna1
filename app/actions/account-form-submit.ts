"use server";

import { createClient } from "../utils/supabase/server";
import { accountFormSchema } from "../utils/types/schemas";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  errors?: Record<string, string[]>;
};

export async function accountFormSubmit(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!(formData instanceof FormData)) {
    return {
      message: "",
      success: false,
      errors: { error: ["Invalid Form Data"] },
    };
  }

  const formEntries = Object.fromEntries(formData);
  const parsed = accountFormSchema.safeParse(formEntries);
  const supabase = await createClient();

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

  const { error } = await supabase.auth.updateUser({
    data: { displayName: parsed.data.name },
  });

  if (error) {
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
