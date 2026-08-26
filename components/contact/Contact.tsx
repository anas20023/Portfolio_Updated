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
import { profile } from '@/data/profile';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Add a short subject'),
  message: z.string().min(10, 'Tell me a little more'),
});

type FormValues = z.infer<typeof schema>;

const contactItems = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/anas20023',
    href: profile.github,
    Icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/anasibelal004',
    href: profile.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: 'Location',
    value: profile.location,
    href: undefined,
    Icon: MapPin,
  },
];

/**
 * TextField hands `onChange` a string rather than an event, so react-hook-form's
 * `register()` is incompatible and `Controller` is required. React Aria earns
 * that cost: it wires id / aria-labelledby / aria-describedby / aria-invalid
 * across Label, Input and FieldError, so the validation message is actually
 * announced. The markup this replaced rendered bare <p> errors with no id and
 * no aria-describedby, leaving screen readers with aria-invalid and no reason.
 */
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
          // RAC defaults to `native` inside a <form>, which races the browser's
          // own validation bubbles against the Zod messages.
          validationBehavior="aria"
          type={rows ? undefined : type}
          className="flex flex-col gap-2"
        >
          <Label>{label}</Label>
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

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // RAC reads `value={undefined}` as uncontrolled: a controlled/uncontrolled
    // warning, and a field that won't clear on reset().
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 max-w-2xl"
        >
          <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent">
            11 — Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Let&apos;s build something
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Have a project, role, or idea in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-3"
          >
            {contactItems.map(({ label, value, href, Icon }) => {
              const inner = (
                <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {label}
                    </p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
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
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <ContactField
                control={control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
              <ContactField
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="mt-5 flex flex-col gap-5">
              <ContactField
                control={control}
                name="subject"
                label="Subject"
                placeholder="What's this about?"
              />
              <ContactField
                control={control}
                name="message"
                label="Message"
                rows={5}
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isDisabled={isSubmitting}
                className="gap-2"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-success"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Thanks! I&apos;ll be in touch soon.
                </motion.p>
              )}
            </div>
            <p className="mt-4 text-xs text-muted">
              This is a demo form — messages aren&apos;t sent yet.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
