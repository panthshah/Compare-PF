export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-[#FAFAFA] px-[128px] py-[48px]">
      <div className="flex items-center justify-between">
        <p
          className="text-[14px] font-bold text-zinc-900"
          style={{ fontFamily: "var(--font-sharp-sans)" }}
        >
          Samsung
        </p>
        <div className="flex gap-[32px]">
          <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Privacy</a>
          <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Terms</a>
          <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Accessibility</a>
          <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Contact Us</a>
        </div>
        <p
          className="text-[14px] text-zinc-400"
          style={{ fontFamily: "var(--font-samsung-one)" }}
        >
          © 2026 Samsung. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
