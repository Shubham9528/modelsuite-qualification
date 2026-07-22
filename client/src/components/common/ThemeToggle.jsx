import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
      className={`relative flex items-center w-11 h-6 rounded-full border transition-colors duration-300 shrink-0 cursor-pointer p-0 ${
        isDark
          ? 'border-white/12 bg-white/[0.06]'
          : 'border-slate-900/15 bg-slate-900/[0.08]'
      }`}
    >
      {/* Sliding handle */}
      <span
        className={`absolute top-[2px] w-[18px] h-[18px] rounded-full flex items-center justify-center text-white transition-all duration-300 ${
          isDark
            ? 'left-[2px] bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-[0_0_8px_rgba(59,130,246,0.5)]'
            : 'left-[20px] bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-[0_0_8px_rgba(245,158,11,0.5)]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Sun/Moon Icon */}
        <span
          className={`flex items-center transition-transform duration-400 ${
            isDark ? 'rotate-0' : 'rotate-180'
          }`}
        >
          {isDark ? <HiMoon size={11} /> : <HiSun size={13} />}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
