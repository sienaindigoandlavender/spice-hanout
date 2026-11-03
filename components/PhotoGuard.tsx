"use client";
import { useEffect } from "react";
// House rule: images can't be saved (no right-click, drag or long-press save on images).
export default function PhotoGuard() {
  useEffect(() => {
    const stop = (e: Event) => { if ((e.target as HTMLElement)?.tagName === "IMG") e.preventDefault(); };
    document.addEventListener("contextmenu", stop);
    document.addEventListener("dragstart", stop);
    return () => { document.removeEventListener("contextmenu", stop); document.removeEventListener("dragstart", stop); };
  }, []);
  return null;
}
