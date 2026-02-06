import { LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const roleBadge = {
  admin: { label: 'Admin', className: 'bg-stone-800 text-white' },
  host: { label: 'Hôte', className: 'bg-amber-700 text-white' },
  visitor: { label: 'Visiteur', className: 'bg-emerald-700 text-white' },
};

export default function Header() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const badge = roleBadge[user.role];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-stone-700" />
          <span className="font-serif font-bold text-stone-900 text-lg">Livret</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.className}`}>
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500 hidden sm:block">{user.name}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>
    </header>
  );
}
