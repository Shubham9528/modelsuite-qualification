import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
  { label: 'Tasks',     path: '/admin/tasks',     icon: '✓' },
  { label: 'Talents',   path: '/admin/talents',   icon: '👤' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-bg-surface border-r border-border flex flex-col px-4 py-6 z-50">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-7 border-b border-border mb-6">
        <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 shrink-0">
          <rect width="40" height="40" rx="10" fill="url(#sb-g)" />
          <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="sb-g" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#6366f1" /><stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-bold text-[15px] tracking-tight text-text-primary">TaskPipeline</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-faint px-3 mb-2">Menu</p>
        {navItems.map((item) => (
          <button key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border-none font-medium text-[14px] font-sans cursor-pointer w-full text-left transition-all
              ${location.pathname === item.path ? 'nav-active' : 'text-text-muted bg-transparent hover:bg-bg-hover hover:text-text-primary'}`}>
            <span className="w-5 text-center shrink-0 text-[15px]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-5 border-t border-border">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-[13px] font-bold text-white shrink-0">
            {user?.name?.[0] ?? 'A'}
          </div>
          <div className="min-w-0">
            {/* Intentional gap: long names overflow — no truncation title attribute */}
            <p className="text-[13px] font-semibold text-text-primary truncate max-w-[120px]">{user?.name}</p>
            <p className="text-[11px] text-text-faint">Admin</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }}
          title="Logout"
          className="bg-transparent border-none text-text-muted text-lg cursor-pointer px-1.5 py-1 rounded-md hover:text-danger hover:bg-danger/10 transition-all">
          ⏻
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
