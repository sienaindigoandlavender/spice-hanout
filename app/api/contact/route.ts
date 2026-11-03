import { NextResponse } from "next/server";
import { COMPANY } from "@/lib/company";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["An order", "The blends", "Wholesale", "Gifts and weddings", "Press", "Something else"];
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** The contact form → one email to CONTACT_TO, reply-to the sender, sent with Resend (RESEND_API_KEY, CONTACT_FROM). */
export async function POST(req: Request) {
  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot
  const name = String(b.name ?? "").trim().slice(0, 120);
  const email = String(b.email ?? "").trim().slice(0, 254);
  const topic = TOPICS.includes(String(b.topic)) ? String(b.topic) : "Something else";
  const order = String(b.order ?? "").trim().slice(0, 40);
  const message = String(b.message ?? "").trim().slice(0, 5000);
  if (!name || !EMAIL.test(email) || message.length < 2) {
    return NextResponse.json({ error: "Please add your name, a working email and a message." }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || COMPANY.email;
  const from = process.env.CONTACT_FROM || "Spice Hanout <onboarding@resend.dev>";
  const rows = [["Name", name], ["Email", email], ["About", topic], order && ["Order", order]].filter(Boolean) as string[][];
  const html = `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${esc(message)}</p>`;
  if (!key) {
    console.log("[contact]", JSON.stringify({ name, email, topic, order, message }));
    return NextResponse.json({ ok: true });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Spice Hanout · ${topic} · ${name}`, html }),
  });
  if (!res.ok) {
    console.error("[contact] resend failed", res.status, await res.text());
    return NextResponse.json({ error: "Your message did not go through. Please try again in a moment." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
