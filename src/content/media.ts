const n = (i: number) => `/images/${String(i).padStart(2, "0")}.jpg`;

export const ALL_IMAGES = Array.from({ length: 39 }, (_, i) => n(i + 1));

export const MEDIA = {
  hero: n(1),
  about: n(34),
  services: {
    architectural: n(1),
    structural: n(13),
    surveying: n(12),
    permits: n(29),
    interior: n(17),
    quantities: n(20),
  },
  projects: {
    "north-riyadh-villa": { cover: n(1), gallery: [n(4), n(33), n(34)] },
    "olaya-commercial": { cover: n(13), gallery: [n(14), n(22), n(23)] },
    "najd-majlis": { cover: n(17), gallery: [n(18), n(19), n(35)] },
    "plot-subdivision": { cover: n(12), gallery: [n(11), n(21)] },
  },
  posts: {
    "quantity-takeoff-2026": n(20),
    "building-permit-riyadh": n(29),
    "certified-survey": n(12),
    "choose-architect-riyadh": n(34),
  },
  featured: [n(1), n(13), n(22), n(33), n(34), n(38)],
} as const;
