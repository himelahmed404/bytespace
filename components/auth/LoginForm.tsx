"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { FormStatus, type SubmitStatus } from "@/components/auth/FormStatus";
import { RiseIn } from "@/components/motion/RiseIn";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { collectErrors, validateEmail, validatePassword } from "@/lib/validation";

type Fields = { email: string; password: string };

const socials = [
  { name: "Facebook", icon: "/images/icons/social/facebook.svg" },
  { name: "Google", icon: "/images/icons/social/google.svg" },
];

/** "Welcome Back" sign-in form. UI only: validates, then shows a demo success state. */
export function LoginForm() {
  const [values, setValues] = useState<Fields>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  const validate = (v: Fields) =>
    collectErrors({ email: validateEmail(v.email), password: validatePassword(v.password) });

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
    setStatus({ state: "success", message: `Welcome back! You're signed in as ${values.email}.` });
  }

  function handleSocial(name: string) {
    setStatus({ state: "info", message: `${name} sign-in isn't connected in this demo yet.` });
  }

  return (
    <div className="flex flex-col gap-10 xl:h-[683px] xl:justify-between xl:gap-0">
      <div className="flex flex-col gap-10">
        <AuthHeading eyebrow="Sign In" title="Welcome Back" />

        <form noValidate onSubmit={handleSubmit} className="flex flex-col items-end gap-6">
          <RiseIn delay={0.2} className="w-full">
            <TextField
              id="login-email"
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
          <RiseIn delay={0.25} className="w-full">
            <TextField
              id="login-password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              placeholder="********"
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              error={errors.password}
            />
          </RiseIn>
          <RiseIn delay={0.3}>
            <Button type="submit" disabled={status.state === "submitting"}>
              {status.state === "submitting" ? "Signing in…" : "Sign In"}
            </Button>
          </RiseIn>
          <FormStatus status={status} />
        </form>
      </div>

      <RiseIn delay={0.35} className="flex flex-col items-center gap-10">
        <div className="flex w-full items-center gap-[11px]">
          <span className="h-px flex-1 bg-black-200 xl:w-[200px] xl:flex-none" />
          <span className="text-body-l text-gray-400">or</span>
          <span className="h-px flex-1 bg-black-200 xl:w-[200px] xl:flex-none" />
        </div>
        <div className="flex gap-4">
          {socials.map((s) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Continue with ${s.name}`}
              onClick={() => handleSocial(s.name)}
              className="grid size-[72px] place-items-center rounded-xl border border-black-200 transition duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              <Image src={s.icon} alt="" width={40} height={40} />
            </button>
          ))}
        </div>
      </RiseIn>

      <RiseIn delay={0.4}>
        <p className="text-center text-body-m">
          <span className="text-gray-400">New user?</span>{" "}
          <Link href="/register" className="text-primary transition-opacity hover:opacity-70">
            Create an account
          </Link>
        </p>
      </RiseIn>
    </div>
  );
}
