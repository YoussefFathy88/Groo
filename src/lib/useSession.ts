import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from './supabase';

export type SessionState = { status: 'loading' } | { status: 'signedOut' } | { status: 'signedIn'; session: Session };

/** Current sign-in state. Updates when the user signs in (email link) or out. */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({ status: 'loading' });

  useEffect(() => {
    const apply = (session: Session | null) =>
      setState(session ? { status: 'signedIn', session } : { status: 'signedOut' });

    void supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => apply(session));
    return () => data.subscription.unsubscribe();
  }, []);

  return state;
}
