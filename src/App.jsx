import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { PageAccentSetter } from '@/lib/pageAccent';
import Landing from '@/pages/Landing';
import Home from '@/pages/Home';
import GraduallyThenSuddenlySummary from '@/pages/GraduallyThenSuddenlySummary';
import Resources from '@/pages/Resources';
import Faq from '@/pages/Faq';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ThisWeekInBitcoin from '@/pages/ThisWeekInBitcoin';
import SocialCard from '@/pages/SocialCard';
import DiceEntropy from '@/pages/DiceEntropy';
import Passphrase from '@/pages/Passphrase';
import VideoEssays from '@/pages/VideoEssays';
import OogaBoogaLand from '@/pages/OogaBoogaLand';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Landing />} />
      <Route path="/literature" element={<Home />} />
      <Route path="/gradually-then-suddenly-summary" element={<GraduallyThenSuddenlySummary />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/this-week" element={<ThisWeekInBitcoin />} />
      <Route path="/social-card" element={<SocialCard />} />
      <Route path="/dice-entropy" element={<DiceEntropy />} />
      <Route path="/passphrase" element={<Passphrase />} />
      <Route path="/video-essays" element={<VideoEssays />} />
      <Route path="/oogabooga-land" element={<OogaBoogaLand />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <ThemeProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <PageAccentSetter />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App