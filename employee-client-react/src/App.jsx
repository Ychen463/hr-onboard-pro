/* eslint-disable import/no-extraneous-dependencies */
// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Registration from "./components/Registration.jsx";
import OnboardingStatusPage from "./pages/OnboardingStatusPage.jsx";
import OnboardingApplicationPage from "./pages/OnboardingApplicationFormPage.jsx";
import PersonalProfilePage from "./pages/PersonalProfilePage.jsx";
import VisaStatusMgtPage from "./pages/VisaStatusMgtPage.jsx";
import HousingPage from "./pages/HousingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute component={PersonalProfilePage} checkOnboarding />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute component={PersonalProfilePage} checkOnboarding />
          }
        />
        <Route
          path="/visa"
          element={
            <ProtectedRoute component={VisaStatusMgtPage} checkOnboarding />
          }
        />
        <Route
          path="/housing"
          element={<ProtectedRoute component={HousingPage} checkOnboarding />}
        />
        <Route path="/onboarding-status" element={<OnboardingStatusPage />} />
        <Route
          path="/onboarding-application"
          element={<OnboardingApplicationPage />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
