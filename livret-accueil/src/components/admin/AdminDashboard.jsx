import { Building2, Users, ToggleLeft, ToggleRight, Trash2, Activity } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AdminDashboard() {
  const { establishments, toggleEstablishment, deleteEstablishment } = useData();

  const activeCount = establishments.filter((e) => e.active).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Dashboard Administrateur</h1>
        <p className="text-sm text-stone-500">Gestion globale de la plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Building2} label="Etablissements" value={establishments.length} />
        <StatCard icon={Activity} label="Actifs" value={activeCount} />
        <StatCard icon={Users} label="Hôtes inscrits" value={establishments.length} />
      </div>

      {/* Establishments List */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Etablissements</h2>
        </div>

        {establishments.length === 0 ? (
          <div className="p-8 text-center text-stone-400">
            Aucun établissement enregistré.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {establishments.map((est) => (
              <div key={est.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-stone-800 truncate">{est.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        est.active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {est.active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Hôte : {est.hostName} &middot; Créé le {est.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleEstablishment(est.id)}
                    className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    title={est.active ? 'Désactiver' : 'Activer'}
                  >
                    {est.active ? (
                      <ToggleRight className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-stone-400" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Supprimer "${est.name}" ? Cette action est irréversible.`)) {
                        deleteEstablishment(est.id);
                      }
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-stone-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-stone-900">{value}</div>
        <div className="text-xs text-stone-500">{label}</div>
      </div>
    </div>
  );
}
