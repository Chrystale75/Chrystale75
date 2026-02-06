import { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

const DEFAULT_ESTABLISHMENTS = [
  {
    id: 'est-1',
    name: 'Domaine de Bellevue',
    hostId: 'host-1',
    hostName: 'Marie Dupont',
    active: true,
    createdAt: '2025-06-15',
    welcome: {
      title: 'Bienvenue au Domaine de Bellevue',
      subtitle: 'Votre havre de paix en Provence',
      message: 'Nous sommes ravis de vous accueillir dans notre propriété. Ce livret contient toutes les informations nécessaires pour un séjour inoubliable.',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    },
    wifi: {
      network: 'Bellevue-Guest',
      password: 'Provence2025!',
    },
    info: {
      address: '234 Chemin des Lavandes, 84220 Gordes, Provence',
      phone: '+33 4 90 72 00 00',
      checkIn: '15h00',
      checkOut: '11h00',
      parking: 'Parking privé disponible à l\'entrée de la propriété.',
    },
    guide: [
      {
        id: 'guide-1',
        title: 'Machine à café',
        content: 'La machine Nespresso se trouve dans la cuisine. Les capsules sont dans le tiroir de droite. Merci de vider le bac à capsules usagées régulièrement.',
        icon: 'Coffee',
      },
      {
        id: 'guide-2',
        title: 'Piscine',
        content: 'La piscine est accessible de 8h à 21h. Merci de doucher avant de vous baigner. Les serviettes de piscine sont dans le coffre en teck.',
        icon: 'Waves',
      },
      {
        id: 'guide-3',
        title: 'Chauffage & Climatisation',
        content: 'Le thermostat se trouve dans le couloir principal. En été, merci de fermer les fenêtres lorsque la climatisation est en marche.',
        icon: 'Thermometer',
      },
      {
        id: 'guide-4',
        title: 'Tri des déchets',
        content: 'Poubelle jaune : recyclables. Poubelle grise : ordures ménagères. Le compost est au fond du jardin. Conteneurs de collecte au bout du chemin.',
        icon: 'Trash2',
      },
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Restaurant L\'Étoile de Gordes',
        category: 'Restaurant',
        description: 'Cuisine provençale raffinée avec vue sur le Luberon. Réservation recommandée.',
        distance: '5 min en voiture',
        icon: 'UtensilsCrossed',
      },
      {
        id: 'rec-2',
        title: 'Marché de Gordes',
        category: 'Marché',
        description: 'Tous les mardis matin. Produits locaux, fromages, huile d\'olive, lavande.',
        distance: '10 min à pied',
        icon: 'ShoppingBag',
      },
      {
        id: 'rec-3',
        title: 'Abbaye de Sénanque',
        category: 'Culture',
        description: 'Abbaye cistercienne du XIIe siècle entourée de champs de lavande. Incontournable.',
        distance: '15 min en voiture',
        icon: 'Landmark',
      },
      {
        id: 'rec-4',
        title: 'Randonnée des Ocres de Roussillon',
        category: 'Nature',
        description: 'Sentier spectaculaire à travers les falaises d\'ocre. Prévoir des chaussures fermées.',
        distance: '20 min en voiture',
        icon: 'Mountain',
      },
    ],
    emergency: {
      samu: '15',
      pompiers: '18',
      police: '17',
      europeEmergency: '112',
      hospital: 'Centre Hospitalier d\'Apt — 04 90 04 33 00',
      pharmacy: 'Pharmacie de Gordes — 04 90 72 02 14',
      hostPhone: '+33 6 12 34 56 78',
    },
  },
];

export function DataProvider({ children }) {
  const [establishments, setEstablishments] = useState(DEFAULT_ESTABLISHMENTS);

  const getEstablishment = (id) => establishments.find((e) => e.id === id);

  const updateEstablishment = (id, updates) => {
    setEstablishments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const toggleEstablishment = (id) => {
    setEstablishments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    );
  };

  const deleteEstablishment = (id) => {
    setEstablishments((prev) => prev.filter((e) => e.id !== id));
  };

  // Guide CRUD
  const addGuideItem = (estId, item) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, guide: [...e.guide, { ...item, id: `guide-${Date.now()}` }] }
          : e
      )
    );
  };

  const updateGuideItem = (estId, itemId, updates) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, guide: e.guide.map((g) => (g.id === itemId ? { ...g, ...updates } : g)) }
          : e
      )
    );
  };

  const deleteGuideItem = (estId, itemId) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, guide: e.guide.filter((g) => g.id !== itemId) }
          : e
      )
    );
  };

  // Recommendation CRUD
  const addRecommendation = (estId, item) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, recommendations: [...e.recommendations, { ...item, id: `rec-${Date.now()}` }] }
          : e
      )
    );
  };

  const updateRecommendation = (estId, itemId, updates) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, recommendations: e.recommendations.map((r) => (r.id === itemId ? { ...r, ...updates } : r)) }
          : e
      )
    );
  };

  const deleteRecommendation = (estId, itemId) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === estId
          ? { ...e, recommendations: e.recommendations.filter((r) => r.id !== itemId) }
          : e
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        establishments,
        getEstablishment,
        updateEstablishment,
        toggleEstablishment,
        deleteEstablishment,
        addGuideItem,
        updateGuideItem,
        deleteGuideItem,
        addRecommendation,
        updateRecommendation,
        deleteRecommendation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
