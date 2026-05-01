import { useState } from "react";
import { DroneLogo } from "./DroneLogo";
import { ArrowRight, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export function AuthScreen() {
  type AuthMode = "signin" | "register" | "forgot_password" | "welcome";
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isLogin = mode === "signin";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot_password";
  const isWelcome = mode === "welcome";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (isForgot) {
      if (!email) {
        setError("Email is required");
        return;
      }
      setLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        if (error) throw error;
        setSuccessMessage("Password reset instructions have been sent to your email.");
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (email && password) {
      if (isRegister && !name) {
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
        } else if (isRegister) {
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
          setMode("welcome");
        }
      } catch (err: any) {
        if (err.message === "User already registered") {
          setError("An account with this email already exists. Please sign in.");
        } else {
          setError(err.message || "An error occurred during authentication");
        }
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
          {isWelcome ? (
            <div className="text-center">
               <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Mail className="w-10 h-10 text-brand-red" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">You're almost there!</h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                 Welcome aboard, <strong>{name}</strong>! We've sent a verification link to <strong className="text-gray-900">{email}</strong>. 
                 Please check your inbox and confirm your email to activate your account.
               </p>
               <button
                 type="button"
                 onClick={() => { setMode("signin"); setSuccessMessage(null); setError(null); }}
                 className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-sm hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
               >
                 Back to Sign In
               </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {isForgot ? "Reset Password" : isLogin ? "Sign In to Your Account" : "Create New Account"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl p-3 text-center">
                    {successMessage}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-xl p-3 text-center">
                    {error}
                  </div>
                )}
                {isRegister && (
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isRegister}
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
                {!isForgot && (
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
                )}

                {isLogin && (
                  <div className="flex justify-end -mt-2">
                    <button 
                      type="button" 
                      onClick={() => { setMode("forgot_password"); setError(null); setSuccessMessage(null); }}
                      className="text-xs font-semibold text-brand-red hover:underline focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !!successMessage}
                  className="w-full mt-4 bg-brand-red text-white rounded-xl py-4 font-bold text-sm hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isForgot ? "Send Reset Link" : isLogin ? "Sign In" : "Register"} 
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-6 text-center text-sm font-medium text-gray-500">
                {isLogin || isForgot ? (
                  <>
                    Don't have an account?{" "}
                    <button type="button" onClick={() => { setMode("register"); setSuccessMessage(null); setError(null); }} className="text-brand-red hover:underline focus:outline-none">
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button type="button" onClick={() => { setMode("signin"); setSuccessMessage(null); setError(null); }} className="text-brand-red hover:underline focus:outline-none">
                      Sign in here
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
