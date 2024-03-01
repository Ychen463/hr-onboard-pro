/* eslint-disable import/no-extraneous-dependencies */
// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthGuard from "./components/AuthGuard.jsx";
import LoginGuard from "./components/LoginGuard.jsx";
import HomeGuard from "./components/HomeGuard.jsx";
import OnboardingGuard from "./components/OnboardingGuard.jsx";
import HomeLayout from "./components/HomeLayout.jsx";
import OnboardingLayout from "./components/OnboardingLayout.jsx";
import Registration from "./components/Registration.jsx";
import LoginForm from "./components/LoginForm.jsx";
import OnboardingStatusPage from "./pages/OnboardingStatusPage.jsx";
import OnboardingApplicationPage from "./pages/OnboardingApplicationFormPage.jsx";
import PersonalProfilePage from "./pages/PersonalProfilePage.jsx";
import VisaStatusMgtPage from "./pages/VisaStatusMgtPage.jsx";
import HousingPage from "./pages/HousingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<LoginGuard />}> */}
        <Route path="/login" element={<LoginForm />} />
        {/* </Route> */}
        <Route element={<AuthGuard />}>
          <Route element={<OnboardingGuard />}>
            <Route element={<OnboardingLayout />}>
              <Route
                path="/onboarding-status"
                element={<OnboardingStatusPage />}
              />
              <Route
                path="/onboarding-application"
                element={<OnboardingApplicationPage />}
              />
            </Route>
          </Route>
          <Route element={<HomeGuard />}>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<PersonalProfilePage />} />
              <Route path="/visa" element={<VisaStatusMgtPage />} />
              <Route path="/housing" element={<HousingPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
