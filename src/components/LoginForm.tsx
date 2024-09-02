"use client";

import Link from "next/link";
import { useState } from "react";

import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signIn } from "@/lib/actions/user.actions";
import { cn, loginFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = loginFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response: SignInResponse = await signIn({
      email: data.email,
      password: data.password,
    });

    if (response.success) {
      router.push("/");
    } else {
      toast.error(response.error);
    }

    setIsLoading(false);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <h1 className={cn("sidebar-logo !block")}>Petsy</h1>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold">Login</h1>
          <p className="text-16 font-normal text-secondary-foreground">Please enter your details</p>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput id="email" control={form.control} name="email" label="Email" inputMode="email" />
          <CustomInput id="password" control={form.control} name="password" label="Password" />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 text-secondary-foreground">Dont have an account?</p>
        <Link href="/sign-up" className="form-link">
          Sign Up
        </Link>
      </footer>
    </section>
  );
};

export default LoginForm;
