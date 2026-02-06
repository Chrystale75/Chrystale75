import { UtensilsCrossed, ShoppingBag, Landmark, Mountain } from 'lucide-react';

const iconMap = { UtensilsCrossed, ShoppingBag, Landmark, Mountain };

const categoryColor = {
  Restaurant: 'bg-amber-50 text-amber-700',
  Marché: 'bg-emerald-50 text-emerald-700',
  Culture: 'bg-violet-50 text-violet-700',
  Nature: 'bg-sky-50 text-sky-700',
};

export default function RecommendationsSection({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">
        Conciergerie & Recommandations
      </h2>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || UtensilsCrossed;
          const catClass = categoryColor[item.category] || 'bg-stone-100 text-stone-600';

          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-stone-600" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-stone-800">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catClass}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mt-1 leading-relaxed">{item.description}</p>
                <p className="text-xs text-stone-400 mt-1">{item.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
