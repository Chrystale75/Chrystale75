import { Shield, Home, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const roles = [
  {
    key: 'admin',
    label: 'Administrateur',
    description: 'Dashboard global, gestion des hôtes',
    icon: Shield,
    color: 'bg-stone-800 hover:bg-stone-900',
  },
  {
    key: 'host',
    label: 'Hôte / Propriétaire',
    description: 'Éditeur CMS, personnalisation du livret',
    icon: Home,
    color: 'bg-amber-700 hover:bg-amber-800',
  },
  {
    key: 'visitor',
    label: 'Visiteur',
    description: 'Consultation du livret d\'accueil',
    icon: Eye,
    color: 'bg-emerald-700 hover:bg-emerald-800',
  },
];

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">
            Livret d'Accueil
          </h1>
          <p className="text-stone-500 text-lg">
            Plateforme de gestion hôtelière
          </p>
          <div className="mt-4 h-px w-24 bg-stone-300 mx-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <p className="text-sm text-stone-500 text-center mb-6">
            Choisissez un rôle pour accéder à l'application
          </p>

          {roles.map(({ key, label, description, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => login(key)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-white transition-all ${color} cursor-pointer`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-base">{label}</div>
                <div className="text-sm opacity-80">{description}</div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          Mode démonstration — Authentification simulée
        </p>
      </div>
    </div>
  );
}
