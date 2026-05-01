import { useState, useEffect } from "react";
import { DesktopDashboard } from "./components/DesktopDashboard";
import { AuthScreen } from "./components/AuthScreen";
import { supabase } from "./lib/supabase";

export type User = {
  id: string;
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="w-full h-dvh overflow-hidden bg-slate-950 font-sans relative">
      <DesktopDashboard user={user} onLogout={() => supabase.auth.signOut()} />
    </div>
  );
}

