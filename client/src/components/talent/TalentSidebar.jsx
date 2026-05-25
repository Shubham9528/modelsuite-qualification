import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'My Dashboard', path: '/talent/dashboard', icon: '▦' },
  { label: 'My Tasks',     path: '/talent/tasks',     icon: '✓' },
];

const TalentSidebar = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-[220px] bg-bg-surface border-r border-border flex flex-col px-3.5 py-6 z-50">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-1.5 pb-6 border-b border-border mb-5">
        <svg viewBox="0 0 40 40" fill="none" className="w-[34px] h-[34px] shrink-0">
          <rect width="40" height="40" rx="10" fill="url(#ts-g)" />
          <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="ts-g" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#10b981" /><stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-bold text-[14px] tracking-tight text-text-primary">TaskPipeline</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-faint px-2.5 mb-1.5">Menu</p>
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg border-none font-medium text-[13px] font-sans cursor-pointer w-full text-left transition-all mb-0.5
              ${location.pathname === item.path ? 'nav-active' : 'text-text-muted bg-transparent hover:bg-bg-hover hover:text-text-primary'}`}>
            <span className="w-[18px] text-center shrink-0 text-[14px]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-[18px] border-t border-border">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-[30px] h-[30px] rounded-full avatar-talent flex items-center justify-center text-[12px] font-bold text-white shrink-0">
            {user?.name?.[0] ?? 'T'}
          </div>
          <div className="min-w-0">
            {/* Intentional gap: no title tooltip for truncated name */}
            <p className="text-[12px] font-semibold text-text-primary truncate max-w-[110px]">{user?.name}</p>
            <p className="text-[11px] text-text-faint">Talent</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} title="Logout"
          className="bg-transparent border-none text-text-muted text-base cursor-pointer px-1.5 py-1 rounded-md hover:text-danger hover:bg-danger/10 transition-all">
          ⏻
        </button>
      </div>
    </aside>
  );
};

export default TalentSidebar;
