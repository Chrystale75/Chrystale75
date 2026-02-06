import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const categories = ['Restaurant', 'Marché', 'Culture', 'Nature'];
const iconOptions = ['UtensilsCrossed', 'ShoppingBag', 'Landmark', 'Mountain'];

export default function RecommendationEditor({ establishment }) {
  const { addRecommendation, updateRecommendation, deleteRecommendation } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'Restaurant', description: '', distance: '', icon: 'UtensilsCrossed',
  });

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      distance: item.distance,
      icon: item.icon,
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ title: '', category: 'Restaurant', description: '', distance: '', icon: 'UtensilsCrossed' });
  };

  const saveEdit = () => {
    if (!form.title.trim()) return;
    if (isAdding) {
      addRecommendation(establishment.id, form);
    } else {
      updateRecommendation(establishment.id, editingId, form);
    }
    cancelEdit();
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId('new');
    setForm({ title: '', category: 'Restaurant', description: '', distance: '', icon: 'UtensilsCrossed' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-semibold text-stone-900">Recommandations</h3>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {establishment.recommendations.map((item) =>
          editingId === item.id ? (
            <RecoForm key={item.id} form={form} setForm={setForm} onSave={saveEdit} onCancel={cancelEdit} />
          ) : (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 p-4 rounded-xl border border-stone-200"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-stone-800">{item.title}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mt-1">{item.description}</p>
                <p className="text-xs text-stone-400 mt-1">{item.distance}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => deleteRecommendation(establishment.id, item.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          )
        )}

        {isAdding && (
          <RecoForm form={form} setForm={setForm} onSave={saveEdit} onCancel={cancelEdit} />
        )}
      </div>
    </div>
  );
}

function RecoForm({ form, setForm, onSave, onCancel }) {
  return (
    <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50 space-y-3">
      <input
        type="text"
        placeholder="Nom du lieu"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <div className="grid grid-cols-2 gap-3">
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {iconOptions.map((ic) => (
            <option key={ic} value={ic}>{ic}</option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
      />
      <input
        type="text"
        placeholder="Distance (ex: 10 min en voiture)"
        value={form.distance}
        onChange={(e) => setForm({ ...form, distance: e.target.value })}
        className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" /> Annuler
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors cursor-pointer"
        >
          <Check className="w-4 h-4" /> Enregistrer
        </button>
      </div>
    </div>
  );
}
