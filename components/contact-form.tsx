'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: 'idle', message: '' });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const payload = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setStatus({
        type: 'error',
        message: payload.error ?? 'No fue posible enviar el mensaje.',
      });
      setIsSending(false);
      return;
    }

    setStatus({
      type: 'success',
      message: payload.message ?? 'Mensaje enviado. Te contactaremos pronto.',
    });
    setForm(initialState);
    setIsSending(false);
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <form className="border border-white/7 bg-surface p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-400">Nombre</span>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full border border-white/10 bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-accent"
            placeholder="Tu nombre"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-400">Correo</span>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full border border-white/10 bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-accent"
            placeholder="tu@empresa.com"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-gray-400">Empresa o proyecto</span>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="w-full border border-white/10 bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-accent"
            placeholder="Nombre de tu empresa"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-gray-400">Mensaje</span>
          <textarea
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="w-full resize-none border border-white/10 bg-ink px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-accent"
            placeholder="Cuéntanos qué necesitas, tus objetivos y si tienes plazos o referencias."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-gray-500">La información se envía directamente a Resend y llega a hola@vantmx.com.mx.</p>
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center justify-center bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#f09a80] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSending ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </div>

      {status.type !== 'idle' ? (
        <p
          className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}