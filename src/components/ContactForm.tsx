"use client";

import { useState, type FormEvent } from "react";

/**
 * Sitio estático: no hay servidor propio que procese el formulario. Dos modos:
 *  - NEXT_PUBLIC_CONTACT_ENDPOINT definido → POST JSON a ese endpoint (Formspree, API Gateway + Lambda/SES, etc.).
 *  - Sin endpoint → se abre el cliente de correo con el mensaje prellenado, dirigido a NEXT_PUBLIC_CONTACT_EMAIL.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const FALLBACK_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "secretario@cimas-masoneria.com";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "w-full rounded-xl border border-gray-300/80 bg-white/70 px-4 py-3.5 text-base text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-cimas-blue-aa focus:bg-white focus:ring-2 focus:ring-cimas-blue-aa/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // campo trampa para bots

    const nombre = String(data.get("nombre") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mensaje = String(data.get("mensaje") ?? "").trim();

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Mensaje desde cimas-masoneria.com – ${nombre}`);
      const body = encodeURIComponent(`${mensaje}\n\n—\n${nombre}\n${email}`);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="nombre" className="mb-2 block text-sm font-semibold text-gray-700">
          Nombre completo
        </label>
        <input id="nombre" name="nombre" type="text" placeholder="Ingrese su nombre" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
          Correo electrónico
        </label>
        <input id="email" name="email" type="email" placeholder="ejemplo@correo.com" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-2 block text-sm font-semibold text-gray-700">
          Mensaje
        </label>
        <textarea id="mensaje" name="mensaje" rows={5} placeholder="Escriba su mensaje aquí..." required className={`${field} resize-none`} />
      </div>

      {/* Campo trampa: invisible para personas, los bots suelen completarlo. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          No completar
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 w-full rounded-xl bg-cimas-blue-aa px-8 py-4 text-base font-semibold tracking-wide text-white shadow-md transition duration-300 ease-out-quint hover:-translate-y-0.5 hover:bg-cimas-blue-dark hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p role="status" aria-live="polite" className="mt-4 min-h-6 text-center text-sm font-medium">
          {status === "sent" && <span className="text-green-700">¡Gracias! Su mensaje fue enviado.</span>}
          {status === "mailto" && (
            <span className="text-gray-600">
              Se abrió su cliente de correo con el mensaje listo para enviar a {FALLBACK_EMAIL}.
            </span>
          )}
          {status === "error" && (
            <span className="text-red-700">
              No pudimos enviar su mensaje. Inténtelo de nuevo o escriba a {FALLBACK_EMAIL}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
