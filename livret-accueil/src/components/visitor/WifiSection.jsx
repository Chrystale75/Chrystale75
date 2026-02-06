import { Wifi, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function WifiSection({ wifi }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for insecure contexts
      const ta = document.createElement('textarea');
      ta.value = wifi.password;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
          <Wifi className="w-5 h-5 text-stone-600" />
        </div>
        <h2 className="font-serif text-lg font-semibold text-stone-900">Wi-Fi</h2>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">Réseau</span>
          <span className="font-medium text-stone-800">{wifi.network}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-stone-500">Mot de passe</span>
          <div className="flex items-center gap-2">
            <code className="bg-stone-100 px-2 py-1 rounded text-stone-800 font-mono text-sm">
              {wifi.password}
            </code>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              title="Copier le mot de passe"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-stone-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
