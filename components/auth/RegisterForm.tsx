"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { FormStatus, type SubmitStatus } from "@/components/auth/FormStatus";
import { RiseIn } from "@/components/motion/RiseIn";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { collectErrors, validateEmail, validateName, validatePassword } from "@/lib/validation";

type Fields = { name: string; email: string; password: string };

/** "Welcome to ByteSpace" sign-up form. UI only: validates, then shows a demo success state. */
export function RegisterForm() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  const validate = (v: Fields) =>
    collectErrors({
      name: validateName(v.name),
      email: validateEmail(v.email),
      password: validatePassword(v.password),
    });

  function update(field: keyof Fields, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // After the first submit, re-validate as the user fixes things.
    if (submitted) setErrors(validate(next));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      event.currentTarget
        .querySelector<HTMLInputElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }
    setStatus({ state: "submitting" });
    // TODO: call the auth backend here.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const firstName = values.name.trim().split(/\s+/)[0];
    setStatus({
      state: "success",
      message: `Welcome to ByteSpace, ${firstName}! Your account is ready.`,
    });
  }

  return (
    <div className="flex flex-col gap-10 xl:gap-[122px]">
      <div className="flex flex-col gap-10">
        <AuthHeading eyebrow="Create an Account" title="Welcome to ByteSpace" />

        <form noValidate onSubmit={handleSubmit} className="flex flex-col items-end gap-6">
          <RiseIn delay={0.2} className="w-full">
            <TextField
              id="register-name"
              name="name"
              label="Full Name"
              autoComplete="name"
              placeholder="Jamie Davis"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
          </RiseIn>
          <RiseIn delay={0.25} className="w-full">
            <TextField
              id="register-email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              placeholder="designer@example.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />
          </RiseIn>
          <RiseIn delay={0.3} className="w-full">
            <TextField
              id="register-password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              placeholder="********"
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              error={errors.password}
            />
          </RiseIn>
          <RiseIn delay={0.35}>
            <Button type="submit" disabled={status.state === "submitting"}>
              {status.state === "submitting" ? "Creating account…" : "Continue"}
            </Button>
          </RiseIn>
          <FormStatus status={status} />
        </form>
      </div>

      <RiseIn delay={0.4}>
        <p className="text-center text-body-m">
          <span className="text-gray-700">Already have an account?</span>{" "}
          <Link href="/login" className="text-primary transition-opacity hover:opacity-70">
            Login
          </Link>
        </p>
      </RiseIn>
    </div>
  );
}
