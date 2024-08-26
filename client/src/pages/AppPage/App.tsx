import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import Header from '@/components/layouts/Header/Header';
import Main from '@/components/layouts/Main/Main';
import Sidebar from '@/components/layouts/Sidebar/Sidebar';
import Loader from '@/components/Loader/Loader';
import { useInitializeAuth } from '@/hooks/useInitializeAuth';

import Login from '../LoginPage/Login';
import ObjectLayout from '../ObjectsPage/ObjectLayoutPage/ObjectLayout';
import ObjectRobot from '../ObjectsPage/ObjectLayoutPage/ObjectRobotPage/ObjectRobot';
import ObjectScreens from '../ObjectsPage/ObjectLayoutPage/ObjectScreensPage/ObjectScreens';
import ObjectWorkplace from '../ObjectsPage/ObjectLayoutPage/ObjectWorkplacePage/ObjectWorkplace';
import ObjectWorkProgress from '../ObjectsPage/ObjectLayoutPage/ObjectWorkProgressPage/ObjectWorkProgress';
import Objects from '../ObjectsPage/Objects';
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
            <Route path="/objects/:id" element={<ObjectLayout />}>
              <Route path="workplace" element={<ObjectWorkplace />} />
              <Route path="screens" element={<ObjectScreens />} />
              <Route path="robot" element={<ObjectRobot />} />
              <Route path="work-progress" element={<ObjectWorkProgress />} />
            </Route>
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
    return <Loader />;
  }

  return isAuthenticated ? authorizedRoutes : unAuthorizedRoutes;
}
