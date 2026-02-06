import { MapPin, Phone, Clock, Car } from 'lucide-react';

export default function InfoSection({ info }) {
  const items = [
    { icon: MapPin, label: 'Adresse', value: info.address },
    { icon: Phone, label: 'Téléphone', value: info.phone },
    { icon: Clock, label: 'Arrivée', value: info.checkIn },
    { icon: Clock, label: 'Départ', value: info.checkOut },
    { icon: Car, label: 'Parking', value: info.parking },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">
        Informations pratiques
      </h2>
      <div className="space-y-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-3 text-sm">
            <Icon className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-stone-500">{label}</span>
              <p className="text-stone-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
