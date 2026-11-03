"use client";
import { useState } from "react";

// One letter a month: a new blend, a recipe, what is cooking. A Shopify customer who accepts email.
export default function Letters() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "");
    setState("sending");
    const r = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok && j.ok) setState("done"); else { setState("error"); setMsg(j.error || "That didn't work. Try again in a moment."); }
  }
  return (
    <section className="bg-[#D9A21B] text-ink">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-16 md:grid-cols-12 md:items-end md:px-10 md:py-20">
        <div className="md:col-span-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em]">Letters from the spice house</p>
          <p className="mt-4 font-display text-[36px] leading-[1.05] md:text-[52px]">One letter a month. <em>A new blend, a recipe, what&apos;s on the stove.</em></p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {state === "done" ? (
            <p className="font-display text-[30px] italic">You&apos;re on the list. Shukran.</p>
          ) : (
            <form onSubmit={submit} className="flex items-end gap-4">
              <label className="grid flex-1 gap-1">
                <span className="font-mono text-[12px] uppercase tracking-[0.16em]">Your email</span>
                <input name="email" type="email" required autoComplete="email" className="w-full border-0 border-b border-ink bg-transparent px-0 py-3 text-[19px] focus:outline-none" />
              </label>
              <button disabled={state === "sending"} className="bg-ink px-7 py-3.5 text-[15px] text-bone hover:bg-clay">{state === "sending" ? "One moment" : "Sign up"}</button>
            </form>
          )}
          {state === "error" && <p role="alert" className="mt-3 text-[15px]">{msg}</p>}
          <p className="mt-4 text-[14px]">Nothing else, and you can leave any time.</p>
        </div>
      </div>
    </section>
  );
}
