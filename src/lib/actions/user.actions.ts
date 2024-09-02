"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async ({ email, password }: SignInProps): Promise<SignInResponse> => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log(error);
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

export const getUser = async (): Promise<UserSession | null> => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  console.log("@@@@", user);

  if (!user.data.user?.email || !user?.data?.user?.user_metadata?.firstName || !user?.data?.user?.user_metadata?.lastName) return null;

  const userSession: UserSession = {
    email: user.data.user?.email,
    firstName: user.data.user?.user_metadata.firstName as string,
    lastName: user.data.user?.user_metadata.lastName as string,
  };

  return userSession;
};

export const logoutAccount = async (): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) redirect("/error");
  redirect("/");
};
