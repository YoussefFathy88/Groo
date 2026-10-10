// Stroke icon paths (24x24 viewBox), shared by nav and habits. Matches the design canvas.
export const ICONS = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  person: 'M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8M4 21c1-4 4.5-6 8-6s7 2 8 6',
  sprout: 'M12 21v-9M12 12c0-4 3-7 8-7 0 5-3 8-8 7zM12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 6.5 7 5.5z',
} as const;

export type IconName = keyof typeof ICONS;
