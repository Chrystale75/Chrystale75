import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = {
  admin: { id: 'admin-1', name: 'Super Admin', role: 'admin', email: 'admin@livret.app' },
  host: { id: 'host-1', name: 'Marie Dupont', role: 'host', email: 'marie@domaine-bellevue.fr', establishmentId: 'est-1' },
  visitor: { id: 'visitor-1', name: 'Visiteur', role: 'visitor', establishmentId: 'est-1' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser(MOCK_USERS[role] || null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
