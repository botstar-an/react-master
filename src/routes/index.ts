// export default {
//   home: '/',
//   login: '/login',
//   signUp: '/signUp'
// }

import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/Signup";
import Home from "../components/Home";
import Category from "../components/IndividualCategory";
import Photo from "../components/IndividualPhoto";

type AppRoute = {
  path: string;
  component: any; // what type here?;
  isProtected?: boolean;
  isAuthPage?: boolean;
}

const APP_ROUTES: AppRoute[] = [
  {
    path: '/',
    component: Home,
    isProtected: true
  },
  {
    path: '/login',
    component: Login,
    isAuthPage: true,
    isProtected: true
  },
  {
    path: '/signup',
    component: SignUp,
    isAuthPage: true,
    isProtected: true
  },
  {
    path: '/categories/:id',
    component: Category,
    isProtected: true
  },
  {
    path: '/categories/:id/photos/:photoId',
    component: Photo,
    isProtected: true
  },
];

export default APP_ROUTES;
