import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Logo = () => (
  <img src="/modelsuite-talents.png" alt="Task Pipeline Logo" className="w-80 h-auto object-contain mx-auto block" />
);

const inputCls = 'w-full bg-bg-input border border-border rounded-[10px] px-4 py-3 text-[15px] text-text-primary outline-none placeholder:text-[#4e4a6e] focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all font-sans';
const labelCls = 'text-[11px] font-semibold uppercase tracking-[0.6px] text-text-muted';

const LoginPage = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data);
      data.role === 'Admin' ? navigate('/admin/dashboard') : navigate('/talent/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[480px_1fr]">

      {/* ── Left: Form panel ── */}
      <div className="relative flex flex-col justify-center px-14 py-16 bg-bg-card border-r border-border overflow-hidden sidebar-glow">
        {/* Brand */}
        <div className="mb-10 relative z-10" style={{ filter: 'drop-shadow(0 4px 16px rgba(99,102,241,0.4))' }}>
          <Logo id="login-grad" />
        </div>

        <div className="mb-10 text-center relative z-10">
          <h1 className="text-[26px] font-bold tracking-tight text-text-primary mb-1.5">Task Pipeline</h1>
          <p className="text-sm text-text-muted">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="you@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} />
            
          </div>

          <button type="submit"
            className="mt-1.5 w-full py-3.5 rounded-[10px] text-[15px] font-semibold text-white cursor-pointer btn-gradient border-none">
            Sign In
          </button>
        </form>

        <p className="mt-7 text-sm text-text-muted text-center relative z-10">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:text-secondary hover:underline transition-colors">
            Create one
          </Link>
        </p>
      </div>

      {/* ── Right: Visual panel ── */}
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden p-16"
        style={{ background: 'linear-gradient(140deg, #050505 0%, #111111 50%, #000000 100%)' }}>
        <div className="auth-orb-1" />
        <div className="auth-orb-2" />
        <div className="relative z-10 max-w-[440px]">
          <h2 className="text-[42px] font-extrabold leading-[1.15] tracking-tight gradient-text mb-5">
            Manage Tasks,<br />Streamline Talent.
          </h2>
          <p className="text-base text-text-muted leading-relaxed mb-12">
            Assign, track, and complete tasks across your entire talent pool — all in one place.
          </p>
          <div className="flex gap-10">
            {[{ num: '98%', label: 'Task Completion' }, { num: '3x', label: 'Faster Onboarding' }, { num: '500+', label: 'Talents Managed' }]
              .map(({ num, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold text-text-primary tracking-tight">{num}</span>
                  <span className="text-[11px] text-text-muted uppercase tracking-[0.8px] font-medium">{label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
