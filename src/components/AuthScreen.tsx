import { useState } from "react";
import { DroneLogo } from "./DroneLogo";
import { ArrowRight, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email && password) {
      if (!isLogin && !name) {
        setError("Name is required");
        return;
      }
      setLoading(true);
      try {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name
              }
            }
          });
          if (error) throw error;
        }
      } catch (err: any) {
        setError(err.message || "An error occurred during authentication");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50 text-gray-900 overflow-hidden pointer-events-auto font-sans">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #E60000 0%, transparent 60%)' }} />
      
      <div className="relative z-10 w-full max-w-[400px] px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
            <DroneLogo className="w-10 h-10 text-brand-red" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-red">FlaSHip</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Next-gen drone delivery.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="flex gap-4 mb-8">
            <button 
              type="button" 
              className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${isLogin ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${!isLogin ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-xl p-3 text-center">
                {error}
              </div>
            )}
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-brand-red text-white rounded-xl py-4 font-bold text-sm hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? "Sign In" : "Register"} 
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
