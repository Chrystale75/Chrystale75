import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function GuideEditor({ establishment }) {
  const { addGuideItem, updateGuideItem, deleteGuideItem } = useData();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', icon: 'Coffee' });
  const [isAdding, setIsAdding] = useState(false);

  const icons = ['Coffee', 'Waves', 'Thermometer', 'Trash2'];

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, content: item.content, icon: item.icon });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ title: '', content: '', icon: 'Coffee' });
  };

  const saveEdit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    if (isAdding) {
      addGuideItem(establishment.id, form);
    } else {
      updateGuideItem(establishment.id, editingId, form);
    }
    cancelEdit();
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId('new');
    setForm({ title: '', content: '', icon: 'Coffee' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-semibold text-stone-900">Guide de la maison</h3>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {establishment.guide.map((item) =>
          editingId === item.id ? (
            <FormCard
              key={item.id}
              form={form}
              setForm={setForm}
              icons={icons}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          ) : (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 p-4 rounded-xl border border-stone-200"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 font-mono">{item.icon}</span>
                  <h4 className="text-sm font-semibold text-stone-800">{item.title}</h4>
                </div>
                <p className="text-sm text-stone-500 mt-1">{item.content}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => deleteGuideItem(establishment.id, item.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          )
        )}

        {isAdding && (
          <FormCard
            form={form}
            setForm={setForm}
            icons={icons}
            onSave={saveEdit}
            onCancel={cancelEdit}
          />
        )}
      </div>
    </div>
  );
}

function FormCard({ form, setForm, icons, onSave, onCancel }) {
  return (
    <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50 space-y-3">
      <input
        type="text"
        placeholder="Titre"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
      />
      <textarea
        placeholder="Description"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        rows={3}
        className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white resize-none"
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-stone-500">Icône :</span>
        {icons.map((ic) => (
          <button
            key={ic}
            onClick={() => setForm({ ...form, icon: ic })}
            className={`px-2 py-1 text-xs rounded-lg border cursor-pointer ${
              form.icon === ic
                ? 'border-amber-500 bg-amber-100 text-amber-800'
                : 'border-stone-200 text-stone-500 hover:bg-stone-50'
            }`}
          >
            {ic}
          </button>
        ))}
      </div>
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
