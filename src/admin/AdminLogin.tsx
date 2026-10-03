import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin({ message = "" }: { message?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setLoading(false);
  }

  return (
    <main className="admin-auth-page">
      <form className="admin-login card" onSubmit={handleSubmit}>
        <a className="admin-brand" href="/">Amirul <span>Ichsandina</span></a>
        <p className="section-label">Admin panel</p>
        <h1 className="section-title">Sign in</h1>
        <p className="admin-muted">Masuk untuk mengelola konten portfolio.</p>
        {(error || message) && <p className="admin-alert admin-alert-error" role="alert">{error || message}</p>}
        <label className="admin-field">
          <span>Email</span>
          <input autoComplete="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn-primary admin-submit" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <a className="admin-back-link" href="/">← Back to portfolio</a>
      </form>
    </main>
  );
}
