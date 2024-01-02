import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ROUTES from './Routes';
import LandingPage from './pages/LandingPage';
import FAQPage from './pages/FAQPage';
import MyGardensPage from './pages/MyGardensPage';
import EditAccountPage from './pages/EditAccountPage';
import CreateReportPage from './pages/CreateReportPage';
import PageLayout from './components/layout/PageLayout';
import ReportCreatedPage from './pages/ReportCreatedPage';
import SignPage from './pages/SignPage';
import LoginPage from './pages/LoginScreen';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route
            key={ROUTES.LANDING}
            path={ROUTES.LANDING}
            element={<LoginPage/>}
          />
          <Route
            key={ROUTES.FAQ}
            path={ROUTES.FAQ}
            element={<PageLayout children={<FAQPage/>}/>}
          />
          <Route
            key={ROUTES.GARDENS}
            path={ROUTES.GARDENS}
            element={<PageLayout children={<MyGardensPage/>}/>}
          />
          <Route
            key={ROUTES.ACCOUNT}
            path={ROUTES.ACCOUNT}
            element={<PageLayout children={<EditAccountPage/>}/>}
          />
          <Route
            key={ROUTES.GARDEN}
            path={`${ROUTES.GARDEN}:id`}
            element={<PageLayout children={<SignPage/>}/>}
          />
          <Route
            key={ROUTES.REPORTCREATED}
            path={ROUTES.REPORTCREATED}
            element={<PageLayout children={<ReportCreatedPage/>}/>}
          />
          <Route
            key={ROUTES.REPORT}
            path={`${ROUTES.REPORT}:id`}
            element={<PageLayout children={<CreateReportPage/>}/>}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
