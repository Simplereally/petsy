"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const SESSION_EXPIRY_HOURS = 12;

export const signIn = async ({ email, password }: SignInProps): Promise<SignInResponse> => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.status === 400) errorMessage = "Invalid email or password.";

      return { success: false, error: errorMessage };
    }

    // Optionally, you can revalidate paths or perform other server-side actions
    // await revalidatePath("/account");

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong. Please try again.");
  }
};

export const signUp = async ({ ...userData }: SignUpParams) => {
  console.log("Sign up action called with data: ", userData);
  const supabase = createClient();

  // Supabase takes care of hashing the password internally
  const { error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        // Add other metadata fields as necessary
      },
    },
  });

  console.log("Sign up action error? ", error);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  // Optionally, you can revalidate paths or perform other server-side actions
  // await revalidatePath("/");

  return { success: true };
};

export const logoutAccount = async (): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) redirect("/error");

  revalidatePath("/", "layout");
  redirect("/");
};
