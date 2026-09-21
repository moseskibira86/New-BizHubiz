import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusinessProvider, useBusiness } from './context/BusinessContext';
import { LandingPage } from './components/public/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/auth/OnboardingWizard';
import { SubscriptionPlan } from './types';

const MainContent: React.FC = () => {
  const { user, isDemoMode } = useAuth();
  const { tenant, loadDemoTenant } = useBusiness();

  // Screen routing
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'dashboard'>('landing');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  const handleStartFree = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleExploreDemo = () => {
    loadDemoTenant();
    setCurrentScreen('dashboard');
  };

  const handleAuthSuccess = () => {
    if (authMode === 'signup') {
      setShowOnboarding(true);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleOnboardingFinish = () => {
    setShowOnboarding(false);
    setCurrentScreen('dashboard');
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    handleStartFree();
  };

  return (
    <>
      {currentScreen === 'landing' ? (
        <LandingPage
          onStartFree={handleStartFree}
          onOpenLogin={handleOpenLogin}
          onExploreDemo={handleExploreDemo}
          onSelectPlan={handleSelectPlan}
          onEnterDashboard={() => setCurrentScreen('dashboard')}
          isAuthenticated={!!user || tenant.isDemo}
        />
      ) : (
        <DashboardLayout
          onNavigatePublic={() => setCurrentScreen('landing')}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Post-Registration Onboarding Wizard (§8) */}
      {showOnboarding && (
        <OnboardingWizard onFinish={handleOnboardingFinish} />
      )}
    </>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <MainContent />
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
