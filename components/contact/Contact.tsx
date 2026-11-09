'use client';

import { useState } from 'react';
import { Controller, useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from '@heroui/react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/BrandIcons';
import { profile as staticProfile } from '@/data/profile';
import type { Profile } from '@/data/types';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Add a short subject'),
  message: z.string().min(10, 'Tell me a little more'),
});

type FormValues = z.infer<typeof schema>;

function ContactField({
  control,
  name,
  label,
  placeholder,
  type,
  rows,
}: {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
  rows?: number;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={fieldState.invalid}
          validationBehavior="aria"
          type={rows ? undefined : type}
          className="flex flex-col gap-1.5"
        >
          <Label className="text-xs font-medium text-foreground">{label}</Label>
          {rows ? (
            <TextArea ref={field.ref} rows={rows} placeholder={placeholder} />
          ) : (
            <Input ref={field.ref} placeholder={placeholder} />
          )}
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}

export function Contact({ profile = staticProfile }: { profile?: Profile }) {
  const contactItems = [
    {
      label: 'Direct Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
      hint: 'Preferred for opportunities',
    },
    {
      label: 'GitHub Profile',
      value: profile.github.replace('https://', ''),
      href: profile.github,
      Icon: GithubIcon,
      hint: 'Repositories & code samples',
    },
    {
      label: 'LinkedIn',
      value: profile.linkedin.replace('https://', ''),
      href: profile.linkedin,
      Icon: LinkedinIcon,
      hint: 'Professional network',
    },
    {
      label: 'Base Location',
      value: profile.location,
      href: undefined,
      Icon: MapPin,
      hint: 'Available remotely or hybrid',
    },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMsg(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to send message');
      }
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2.5 text-xs font-semibold tracking-wide text-accent">
            Communication
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Let&apos;s start a conversation
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-muted">
            Whether you&apos;re hiring for a software engineering position, discussing full-stack projects, or exploring algorithmic collaboration, I&apos;d love to connect.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Direct Channels */}
          <div className="flex flex-col gap-3">
            {contactItems.map(({ label, value, href, Icon, hint }) => {
              const inner = (
                <div className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/50">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted">{label}</p>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {value}
                      </p>
                      <p className="text-[11px] text-muted">{hint}</p>
                    </div>
                  </div>
                  {href && (
                    <ArrowUpRight className="h-4 w-4 text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  )}
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactField
                control={control}
                name="name"
                label="Your Name"
                placeholder="Jane Doe"
              />
              <ContactField
                control={control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
              />
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <ContactField
                control={control}
                name="subject"
                label="Subject"
                placeholder="Software Engineering Role / Project Inquiry"
              />
              <ContactField
                control={control}
                name="message"
                label="Message"
                rows={4}
                placeholder="Tell me about what you have in mind..."
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isDisabled={isSubmitting}
                className="gap-2 bg-accent text-accent-foreground font-semibold px-5 py-2.5 rounded-lg"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Message sent. I will get back to you shortly!
                </motion.p>
              )}
              {errorMsg && (
                <p className="text-xs font-medium text-rose-500">{errorMsg}</p>
              )}
            </div>
            <p className="mt-4 text-[11px] text-muted">
              Inquiries are tracked in CRM — or email me directly at {profile.email}.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
