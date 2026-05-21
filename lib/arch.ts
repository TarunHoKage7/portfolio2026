/**
 * Maps project IDs to their architecture diagram paths (relative to /public).
 * Diagrams are SVGs stored in public/arch/ and served as static assets.
 */
export const ARCH_DIAGRAMS: Record<string, string> = {
  peopleops: "/arch/peopleops.svg",
  designprep: "/arch/designprep.svg",
  phonecloud: "/arch/phonecloud.svg",
  itr: "/arch/itr.svg",
  ytstudio: "/arch/ytstudio.svg",
  jobprep: "/arch/jobprep.svg",
  bountybrain: "/arch/bountybrain.svg",
};
