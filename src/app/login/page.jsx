"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

import { FcGoogle } from "react-icons/fc";

import {
  FiMail,
  FiLock,
  FiLogIn,
} from "react-icons/fi";

import {
  Card,
  Separator,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const LoginPage = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  // Email Login
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      console.log({ data, error });

      // Success
      if (data) {
        toast.success("Login successful 🎉", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });

        e.target.reset();

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      }

      // Error
      if (error) {
        toast.error(error.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsPending(false);
    }
  };

  // Google Login
  const handleGoogleSignin = async () => {
    try {
      setGooglePending(true);

      await authClient.signIn.social({
        provider: "google",
      });

      toast.success("Connecting with Google...", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);

      toast.error("Google sign in failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setGooglePending(false);
    }
  };

  return (
    <div className="relative flex  items-center justify-center overflow-hidden bg-[#f4f8fb] px-4 py-10">
      {/* Background Blur */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10">
            <FiLogIn className="text-cyan-500" size={36} />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Continue your journey with Wanderlust ✈️
          </p>
        </div>

        {/* Form */}
        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
        >
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-2 font-medium text-gray-700">
              Email Address
            </Label>

            <div className="relative">
              <FiMail
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                placeholder="john@example.com"
                className="rounded-md w-full pl-10"
              />
            </div>

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="mb-2 font-medium text-gray-700">
              Password
            </Label>

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                type="password"
                placeholder="Enter your password"
                className="rounded-md w-full pl-10"
              />
            </div>

            <Description className="mt-1 text-xs text-gray-500">
              Must contain at least 8 characters, 1 uppercase
              letter and 1 number.
            </Description>

            <FieldError />
          </TextField>

          {/* Login Button */}
          <Button
            type="submit"
            isDisabled={isPending}
            className="mt-3 h-14 w-full rounded-md bg-cyan-500 text-base font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-500/30"
          >
            {isPending
              ? "Logging In..."
              : "Login"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3">
          <Separator className="flex-1" />

          <span className="whitespace-nowrap text-sm text-gray-500">
            Or continue with
          </span>

          <Separator className="flex-1" />
        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleSignin}
          isDisabled={googlePending}
          variant="outline"
          className="h-14 w-full rounded-md border border-gray-200 bg-white text-base font-medium transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
        >
          <FcGoogle size={24} />

          {googlePending
            ? "Connecting..."
            : "Continue with Google"}
        </Button>

        {/* Signup Link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-cyan-500 transition hover:text-cyan-600"
          >
            Create Account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;