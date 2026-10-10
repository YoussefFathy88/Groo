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
} as const;

export type IconName = keyof typeof ICONS;
