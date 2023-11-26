import { signal } from "@preact/signals";
import { supabase } from "../supabase";
import { useEffect } from "react";

export const authenticated = signal(false);

export async function checkAuthenticated(): Promise<boolean> {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    return false;
  }

  authenticated.value = true;
  return true;
}
export function useAuthenticated() {
  useEffect(() => {
    supabase.auth.getSession().then((session) =>
      authenticated.value = !!session.data
    );
  }, []);
}
