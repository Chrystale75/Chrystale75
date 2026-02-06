import { useData } from '../../contexts/DataContext';

export default function InfoEditor({ establishment }) {
  const { updateEstablishment } = useData();
  const est = establishment;

  const updateField = (section, field, value) => {
    updateEstablishment(est.id, {
      [section]: { ...est[section], [field]: value },
    });
  };

  const updateWelcome = (field, value) => updateField('welcome', field, value);
  const updateWifi = (field, value) => updateField('wifi', field, value);
  const updateInfo = (field, value) => updateField('info', field, value);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Accueil</h3>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-sm text-stone-600">Titre</span>
            <input
              type="text"
              value={est.welcome.title}
              onChange={(e) => updateWelcome('title', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">Sous-titre</span>
            <input
              type="text"
              value={est.welcome.subtitle}
              onChange={(e) => updateWelcome('subtitle', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">Message d'accueil</span>
            <textarea
              value={est.welcome.message}
              onChange={(e) => updateWelcome('message', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </label>
        </div>
      </section>

      {/* Wifi */}
      <section>
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Wi-Fi</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-stone-600">Nom du réseau</span>
            <input
              type="text"
              value={est.wifi.network}
              onChange={(e) => updateWifi('network', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">Mot de passe</span>
            <input
              type="text"
              value={est.wifi.password}
              onChange={(e) => updateWifi('password', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
        </div>
      </section>

      {/* Practical Info */}
      <section>
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Informations pratiques</h3>
        <div className="grid gap-4">
          <label className="block">
            <span className="text-sm text-stone-600">Adresse</span>
            <input
              type="text"
              value={est.info.address}
              onChange={(e) => updateInfo('address', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">Téléphone</span>
            <input
              type="text"
              value={est.info.phone}
              onChange={(e) => updateInfo('phone', e.target.value)}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-stone-600">Heure d'arrivée (Check-in)</span>
              <input
                type="text"
                value={est.info.checkIn}
                onChange={(e) => updateInfo('checkIn', e.target.value)}
                className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </label>
            <label className="block">
              <span className="text-sm text-stone-600">Heure de départ (Check-out)</span>
              <input
                type="text"
                value={est.info.checkOut}
                onChange={(e) => updateInfo('checkOut', e.target.value)}
                className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-stone-600">Parking</span>
            <textarea
              value={est.info.parking}
              onChange={(e) => updateInfo('parking', e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </label>
        </div>
      </section>

      <p className="text-xs text-stone-400 text-center">
        Les modifications sont enregistrées en temps réel et visibles immédiatement pour les visiteurs.
      </p>
    </div>
  );
}
