import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GuardedRoute from './components/Auth/GuardRoute';
import { useAuth } from './hooks/useAuth';
import Loading from './layouts/Loading';
import NavBar from './layouts/NavBar';
import APP_ROUTES from './routes';
import authService from './services/auth.service';

function App() {
  const { user, isProcessing, actions } = useAuth();

  useEffect(() => {
    async function retrieveUserInfo() {
      try {
        const u = await authService.retrieveUserInfo();
        console.log(u);
        actions.setUser(u);
      } catch (err) {
        actions.setUser(null);
      }
    }

    if (!user) {
      retrieveUserInfo();
    }
  }, [user]);

  return (
    <>
      {
        isProcessing ? (<Loading/>) : (
          <BrowserRouter>
            <NavBar/>
            <div className="body">
              <Routes>
                {
                  APP_ROUTES.map(route => {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          route.isProtected ? (
                          <GuardedRoute isAuthPage={route.isAuthPage}>
                            <route.component/>
                          </GuardedRoute>
                          ) : (
                            <route.component/>
                          )
                        }
                      />
                    );
                  })
                }
              </Routes>
            </div>
          </BrowserRouter>
        )
      }
    </>
  );
}

export default App;
