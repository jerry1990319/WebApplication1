import { createBrowserHistory } from 'history';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
export const history = createBrowserHistory();

export const routes = [
  {
    path:'/',
    component: Login
  },
  {
    path:'/home',
    component: Home
  }
  
]