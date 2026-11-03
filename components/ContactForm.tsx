"use client";
import { useState } from "react";

const TOPICS = ["An order", "The blends", "Wholesale", "Gifts and weddings", "Press", "Something else"];
// House rule: fields are a single underline, transparent, ink at full strength.
const field = "w-full border-0 border-b border-ink bg-transparent px-0 py-3 text-[19px] text-ink placeholder:text-ink placeholder:italic focus:border-clay focus:outline-none";
const label = "font-mono text-[12px] uppercase tracking-[0.16em]";

export default function ContactForm({ initial }: { initial?: string }) {
  const [topic, setTopic] = useState(initial && TOPICS.includes(initial) ? initial : TOPICS[0]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, topic }) });
      const out = await res.json();
      if (res.ok && out.ok) setState("done");
      else { setState("error"); setError(out.error ?? "Something went wrong."); }
    } catch {
      setState("error"); setError("Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="border-t border-ink pt-8">
        <p className="font-display text-[44px] leading-[0.95] md:text-[60px]">Received. <em>Shukran.</em></p>
        <p className="mt-5 text-[18px]">We answer within a day, usually sooner. Keep an eye on your inbox, and the spam folder, just in case.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-10">
      <fieldset>
        <legend className={label}>What is it about?</legend>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {TOPICS.map((t) => (
            <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}
              className={`border-b pb-1 text-[18px] transition-colors ${topic === t ? "border-ink italic" : "border-transparent hover:border-ink"}`}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-10 sm:grid-cols-2">
        <label className="grid gap-1"><span className={label}>Your name</span><input name="name" required autoComplete="name" className={field} /></label>
        <label className="grid gap-1"><span className={label}>Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
      </div>
      {topic === "An order" && (
        <label className="grid gap-1"><span className={label}>Order number (if you have it)</span><input name="order" className={field} /></label>
      )}
      <label className="grid gap-1"><span className={label}>Your message</span><textarea name="message" required rows={5} className={`${field} resize-y`} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={state === "sending"} className="bg-ink px-10 py-4 text-[16px] text-bone transition-colors hover:bg-clay disabled:bg-paper disabled:text-ink">
          {state === "sending" ? "Sending" : "Send"}
        </button>
        {state === "error" && <p role="alert" className="text-[16px]">{error}</p>}
      </div>
    </form>
  );
}
