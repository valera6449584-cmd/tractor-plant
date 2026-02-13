import React from "react";

export default function VideoHero({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full min-h-[72vh] overflow-hidden rounded-3xl border border-white/10 bg-black sm:min-h-[85vh]">
      {/* video */}
      <video
        className="
          absolute inset-0 h-full w-full object-cover
          blur-[3px] scale-[1.03] opacity-90
          motion-reduce:hidden
        "
        src="/videos/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1622]/75 via-[#0b1220]/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,160,200,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/25" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
        {children}
      </div>

      {/* transition: fade + glass */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        {/* fade */}
        <div className="h-36 w-full bg-gradient-to-b from-transparent to-[#0b1220]" />
        {/* glass bridge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl">
        </div>
      </div>
    </section>
  );
}
