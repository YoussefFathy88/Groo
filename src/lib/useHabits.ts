import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Habit, HabitInsert } from './habits';
import { supabase } from './supabase';

export const HABITS_KEY = ['habits'] as const;

const COLUMNS = 'id, name, icon, daily_target, category_key, rest_days_per_week, created_at';

/** The signed-in user's active habits, oldest first. RLS limits rows to the owner. */
export function useHabits() {
  return useQuery({
    queryKey: HABITS_KEY,
    queryFn: async (): Promise<Habit[]> => {
      const { data, error } = await supabase
        .from('habits')
        .select(COLUMNS)
        .is('archived_at', null)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

/** Add a habit. Shows it at once (optimistic) and rolls back if the save fails. */
export function useAddHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: HabitInsert): Promise<Habit> => {
      const { data, error } = await supabase.from('habits').insert(input).select(COLUMNS).single();
      if (error) throw error;
      return data;
    },
    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: HABITS_KEY });
      const previous = qc.getQueryData<Habit[]>(HABITS_KEY);
      const temp: Habit = {
        ...input,
        id: `temp-${Date.now()}`,
        rest_days_per_week: 1,
        created_at: new Date().toISOString(),
      };
      qc.setQueryData<Habit[]>(HABITS_KEY, (old) => [...(old ?? []), temp]);
      return { previous };
    },
    onError: (_err, _input, ctx) => {
      qc.setQueryData(HABITS_KEY, ctx?.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}

export type SaveErrorKey = 'addHabit.errors.offline' | 'addHabit.errors.generic';

/** Friendly i18n key for a failed save. Never shows raw server text. */
export function saveErrorKey(error: unknown): SaveErrorKey {
  const msg = error instanceof Error ? error.message : '';
  return /fetch|network/i.test(msg) ? 'addHabit.errors.offline' : 'addHabit.errors.generic';
}
