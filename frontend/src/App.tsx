import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ROUTES from './Routes';
import FAQPage from './pages/FAQPage';
import MyGardensPage from './pages/MyGardensPage';
import EditAccountPage from './pages/EditAccountPage';
import CreateReportPage from './pages/CreateReportPage';
import PageLayout from './components/layout/PageLayout';
import ReportCreatedPage from './pages/ReportCreatedPage';
import SignPage from './pages/SignPage';
import LoginPage from './pages/LoginScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              path={`${ROUTES.GARDEN}:lotNr`}
              element={<PageLayout children={<SignPage/>}/>}
            />
            <Route
              key={ROUTES.REPORTCREATED}
              path={ROUTES.REPORTCREATED}
              element={<PageLayout children={<ReportCreatedPage/>}/>}
            />
            <Route
              key={ROUTES.REPORT}
              path={`${ROUTES.REPORT}:lotNr`}
              element={<PageLayout children={<CreateReportPage/>}/>}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
