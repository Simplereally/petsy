"use client";

import Link from "next/link";
import { useState } from "react";

import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUp } from "@/lib/actions/user.actions";
import { cn, signUpFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = signUpFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      await signUp(data);
      router.push("/");
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <h1 className={cn("sidebar-logo !block")}>Petsy</h1>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold">Sign Up</h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="flex gap-4">
            <CustomInput id="firstName" control={form.control} name="firstName" label="First Name" />
            <CustomInput id="lastName" control={form.control} name="lastName" label="Last Name" />
          </div>
          <CustomInput id="address1" control={form.control} name="address1" label="Address" />
          <CustomInput id="city" control={form.control} name="city" label="City" />
          <div className="flex gap-4">
            <CustomInput id="state" control={form.control} name="state" label="State" />
            <CustomInput id="postalCode" control={form.control} name="postalCode" label="Postal Code" />
          </div>
          <CustomInput id="dateOfBirth" control={form.control} name="dateOfBirth" label="Date of Birth" />
          <CustomInput id="email" control={form.control} name="email" label="Email" />
          <CustomInput id="password" control={form.control} name="password" label="Password" />
          <CustomInput id="confirmPassword" control={form.control} name="confirmPassword" label="Confirm Password" />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 text-secondary-foreground">Already have an account?</p>
        <Link href="/login" className="form-link">
          Login
        </Link>
      </footer>
    </section>
  );
};

export default SignUpForm;
