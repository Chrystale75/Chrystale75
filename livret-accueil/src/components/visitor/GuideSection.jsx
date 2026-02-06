import { useState } from 'react';
import { ChevronDown, Coffee, Waves, Thermometer, Trash2 } from 'lucide-react';

const iconMap = { Coffee, Waves, Thermometer, Trash2 };

export default function GuideSection({ items }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">
        Guide de la maison
      </h2>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || Coffee;
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="border border-stone-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="flex-1 text-sm font-medium text-stone-800">{item.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
