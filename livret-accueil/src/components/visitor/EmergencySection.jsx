import { AlertTriangle, Phone } from 'lucide-react';

export default function EmergencySection({ emergency }) {
  const numbers = [
    { label: 'SAMU', value: emergency.samu },
    { label: 'Pompiers', value: emergency.pompiers },
    { label: 'Police', value: emergency.police },
    { label: 'Urgences EU', value: emergency.europeEmergency },
  ];

  return (
    <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="font-serif text-lg font-semibold text-red-900">Urgences</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {numbers.map(({ label, value }) => (
          <a
            key={label}
            href={`tel:${value}`}
            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-red-100 hover:border-red-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-red-500" />
            <div>
              <div className="text-xs text-stone-500">{label}</div>
              <div className="font-semibold text-red-800 text-sm">{value}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-sm text-stone-600 space-y-1">
        <p>{emergency.hospital}</p>
        <p>{emergency.pharmacy}</p>
        <p className="font-medium text-stone-800">
          Votre hôte : {emergency.hostPhone}
        </p>
      </div>
    </div>
  );
}
