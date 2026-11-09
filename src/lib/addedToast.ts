import { useSyncExternalStore } from 'react';

// Tiny store for the "Added!" message on Today after saving a custom habit.
// Works the same on web and native, no route params needed.
let current: string | null = null;
const listeners = new Set<() => void>();

export function showAddedToast(name: string) {
  current = name;
  listeners.forEach((l) => l());
}

export function clearAddedToast() {
  current = null;
  listeners.forEach((l) => l());
}

export function useAddedToast(): string | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => null,
  );
}
