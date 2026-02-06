import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './components/LoginPage';
import Header from './components/shared/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import HostDashboard from './components/host/HostDashboard';
import VisitorView from './components/visitor/VisitorView';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [hostPreview, setHostPreview] = useState(false);

  if (!isAuthenticated) return <LoginPage />;

  // Host can toggle preview mode to see the visitor view
  if (user.role === 'host' && hostPreview) {
    return (
      <>
        <Header />
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-amber-700 font-medium">Mode apercu visiteur</span>
            <button
              onClick={() => setHostPreview(false)}
              className="text-xs px-3 py-1 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors cursor-pointer"
            >
              Retour editeur
            </button>
          </div>
        </div>
        <VisitorView />
      </>
    );
  }

  return (
    <>
      <Header />
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'host' && <HostDashboard onPreview={() => setHostPreview(true)} />}
      {user.role === 'visitor' && <VisitorView />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
