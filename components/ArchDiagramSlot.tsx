import Image from "next/image";

interface Props {
  caption?: string;
  stack: string[];
  diagramSrc?: string;
}

export function ArchDiagramSlot({ caption, stack, diagramSrc }: Props) {
  if (diagramSrc) {
    return (
      <div className="rounded-xl border border-line-strong bg-bg-panel [overflow:clip]">
        {/*
         * The diagrams are intentionally wider than the article column. Wide
         * screens get a full-width render; narrow screens scroll instead of
         * crushing labels below legibility.
         */}
        <div className="overflow-x-auto p-3 sm:p-4">
          <Image
            src={diagramSrc}
            alt="Architecture diagram"
            width={960}
            height={560}
            className="block h-auto w-full min-w-[760px] rounded-lg"
            loading="lazy"
            unoptimized
          />
        </div>
        {caption && (
          <p className="px-5 py-3 text-tx-3 text-[12.5px] leading-relaxed border-t border-line">
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-line-strong bg-bg-panel/40 p-8">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4">
            Architecture
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-tx-5">
            diagram pending
          </div>
        </div>
        <p className="text-tx-3 text-[14px] leading-relaxed mb-6 max-w-[60ch]">
          {caption ?? "Architecture diagram will be added in a future revision."}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <div
              key={s}
              className="px-3 py-1.5 rounded-md border border-line-strong bg-bg-elev/50 text-tx-2 text-[12px] font-mono"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
