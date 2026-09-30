"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "error" | "success";

const messages: Record<Exclude<Status, "idle">, string> = {
  error: "Please enter a valid email address.",
  success: "Thanks! You're subscribed to our newsletter.",
};

/** Newsletter signup with inline validation (UI only — no backend yet). */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    // TODO: connect to the newsletter provider.
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="flex w-full max-w-[504px] flex-col gap-6">
      <form noValidate onSubmit={handleSubmit} className="flex items-start gap-3 sm:gap-6">
        <div className="relative min-w-0 flex-1 xl:w-[376px] xl:flex-none">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            // 23px + 1px border = Figma's 24px inner padding (Figma strokes don't take space)
            className={cn(
              "h-[52px] w-full rounded-full border bg-white px-[23px] text-body-m text-ink transition-colors outline-none placeholder:text-ink focus:border-primary",
              status === "error" ? "border-danger" : "border-gray-200",
            )}
          />
          {/* Sits in the 24px gap below the field, so the layout never jumps */}
          <p
            id="newsletter-status"
            role="status"
            className={cn(
              "absolute top-full left-6 mt-0.5 text-[12px] leading-[19px]",
              status === "error" ? "text-danger" : "text-primary",
            )}
          >
            {status === "idle" ? "" : messages[status]}
          </p>
        </div>
        <Button type="submit">Subscribe</Button>
      </form>
      <p className="text-[12px] leading-[19px] text-ink">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our
        company.
      </p>
    </div>
  );
}
