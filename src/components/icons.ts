// Stroke icon paths (24x24 viewBox), shared by nav and habits. Matches the design canvas.
export const ICONS = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  person: 'M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8M4 21c1-4 4.5-6 8-6s7 2 8 6',
  mosque: 'M3 21h18M5 21v-6a7 7 0 0 1 14 0v6M12 4v4M10 21v-3a2 2 0 0 1 4 0v3M12 4l1.5-1.5',
  book: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19M9 7.5h6M9 11h4',
  dumbbell: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
  mail: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3.5 6l8.5 7 8.5-7',
  logout: 'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10',
  check: 'M20 6L9 17l-5-5',
  sprout: 'M12 21v-9M12 12c0-4 3-7 8-7 0 5-3 8-8 7zM12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 6.5 7 5.5z',
  // Habit icons (Add habit canvas).
  read: 'M2 5.5c3-1 6.5-1 10 1.5 3.5-2.5 7-2.5 10-1.5v13c-3-1-6.5-1-10 1.5-3.5-2.5-7-2.5-10-1.5zM12 7v13',
  walk: 'M13.5 5.5a1.5 1.5 0 1 0 0-.01M9 21l2.5-6.5 3 3V21M8 12l2-4h4l2.5 3 2.5.5M11.5 14.5L13 8',
  moon: 'M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  sun: 'M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  pen: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  leaf: 'M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8',
  // UI icons.
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  close: 'M6 6l12 12M18 6L6 18',
  // Points to the start side in LTR; flip with scaleX(-1) in RTL.
  back: 'M15 5l-7 7 7 7',
} as const;

export type IconName = keyof typeof ICONS;
