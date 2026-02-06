import { useData } from '../../contexts/DataContext';
import WelcomeSection from './WelcomeSection';
import WifiSection from './WifiSection';
import InfoSection from './InfoSection';
import GuideSection from './GuideSection';
import RecommendationsSection from './RecommendationsSection';
import EmergencySection from './EmergencySection';

export default function VisitorView() {
  const { getEstablishment } = useData();
  const est = getEstablishment('est-1');

  if (!est) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-stone-400">Aucun établissement trouvé.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-12">
      <WelcomeSection welcome={est.welcome} />
      <div className="px-4 space-y-6 mt-6">
        <WifiSection wifi={est.wifi} />
        <InfoSection info={est.info} />
        <GuideSection items={est.guide} />
        <RecommendationsSection items={est.recommendations} />
        <EmergencySection emergency={est.emergency} />
      </div>
    </div>
  );
}
