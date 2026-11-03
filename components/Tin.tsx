import type { Blend } from "@/lib/blends";
import Label from "./Label";

// A tin seen from the front: a brushed lid, the label, a thin base. Square, as the house likes it.
export default function Tin({ b, size = "card", uid = "" }: { b: Blend; size?: "card" | "large"; uid?: string }) {
  return (
    <div className="relative">
      <div className="h-[5%] min-h-[10px] w-full bg-[linear-gradient(90deg,#8d877c,#d8d2c6_22%,#a7a194_48%,#ece7dc_70%,#8f897e)]" />
      <div className="h-[3px] w-full bg-[#5e5a52]" />
      <Label b={b} size={size} uid={uid} />
      <div className="h-[6px] w-full bg-[linear-gradient(90deg,#8d877c,#d8d2c6_30%,#a7a194_60%,#8f897e)]" />
    </div>
  );
}
