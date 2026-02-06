import { useState } from 'react';
import { Settings, BookOpen, Map, Link, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import InfoEditor from './InfoEditor';
import GuideEditor from './GuideEditor';
import RecommendationEditor from './RecommendationEditor';

const tabs = [
  { key: 'info', label: 'Informations', icon: Settings },
  { key: 'guide', label: 'Guide Maison', icon: BookOpen },
  { key: 'reco', label: 'Recommandations', icon: Map },
];

export default function HostDashboard({ onPreview }) {
  const { user } = useAuth();
  const { getEstablishment } = useData();
  const [activeTab, setActiveTab] = useState('info');

  const est = getEstablishment(user.establishmentId);
  if (!est) return <p className="p-8 text-stone-400">Aucun établissement lié.</p>;

  const visitorLink = `https://livret.app/v/${est.id}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">{est.name}</h1>
          <p className="text-sm text-stone-500">Éditeur de livret d'accueil</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-stone-800 text-white rounded-xl hover:bg-stone-900 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Aperçu Visiteur
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(visitorLink);
              alert('Lien copié : ' + visitorLink);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Link className="w-4 h-4" />
            Lien Visiteur
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-stone-100 rounded-xl p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        {activeTab === 'info' && <InfoEditor establishment={est} />}
        {activeTab === 'guide' && <GuideEditor establishment={est} />}
        {activeTab === 'reco' && <RecommendationEditor establishment={est} />}
      </div>
    </div>
  );
}
