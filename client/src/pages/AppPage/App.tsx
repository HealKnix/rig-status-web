import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import Header from '@/components/layouts/Header/Header';
import Main from '@/components/layouts/Main/Main';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import { useInitializeAuth } from '@/hooks/useInitializeAuth';

import Console from '../ConsolePage/Console';
import Login from '../LoginPage/Login';
import MachineVision from '../MachineVisionPage/MachineVision';
import Objects from '../ObjectsPage/Objects';
import ObjectStatistic from '../ObjectsPage/ObjectStatisticPage/ObjectStatistic';
import SignUp from '../SignUpPage/SignUp';

export default function App() {
  const { isAuthenticated, loading } = useInitializeAuth();

  const authorizedRoutes = (
    <div className="app__wrapper">
      <Sidebar />
      <div className="content__wrapper">
        <Header />
        <Main>
          <Routes>
            <Route path="*" element={<Navigate to="/console" replace />} />
            <Route path="/console" element={<Console />} />
            <Route path="/machine-vision" element={<MachineVision />} />
            <Route path="/signals" />
            <Route path="/objects" element={<Objects />} />
            <Route path="/objects/:id" element={<ObjectStatistic />} />
          </Routes>
        </Main>
      </div>
    </div>
  );

  const unAuthorizedRoutes = (
    <div className="login__wrapper">
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );

  if (loading) {
    return <span>Загрузка...</span>;
  }

  return isAuthenticated ? authorizedRoutes : unAuthorizedRoutes;
}
