import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import Header from '@/components/layouts/Header/Header';
import Main from '@/components/layouts/Main/Main';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import { useInitializeAuth } from '@/hooks/useInitializeAuth';

import Login from '../LoginPage/Login';
import ObjectRobot from '../ObjectsPage/ObjectRobotPage/ObjectRobot';
import Objects from '../ObjectsPage/Objects';
import ObjectScreens from '../ObjectsPage/ObjectScreensPage/ObjectScreens';
import ObjectWorkplace from '../ObjectsPage/ObjectWorkplacePage/ObjectWorkplace';
import ObjectWorkProgress from '../ObjectsPage/ObjectWorkProgressPage/ObjectWorkProgress';
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
            <Route path="*" element={<Navigate to="/objects" replace />} />
            <Route path="/objects" element={<Objects />} />
            <Route
              path="/objects/:id"
              element={<Navigate to="workplace" replace />}
            />
            <Route
              path="/objects/:id/workplace"
              element={<ObjectWorkplace />}
            />
            <Route path="/objects/:id/screens" element={<ObjectScreens />} />
            <Route path="/objects/:id/robot" element={<ObjectRobot />} />
            <Route
              path="/objects/:id/work-progress"
              element={<ObjectWorkProgress />}
            />
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
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );

  if (loading) {
    return <span>Загрузка...</span>;
  }

  return isAuthenticated ? authorizedRoutes : unAuthorizedRoutes;
}
