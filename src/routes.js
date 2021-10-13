import { HomePage } from './pages/HomePage.jsx';
import { OrderPage } from './pages/OrderPage.jsx';
import { StayDetails } from './pages/StayDetails.jsx';
import { ExplorePage } from './pages/ExplorePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { AccountPage } from './pages/AccountPage.jsx';
import { HostPage } from './pages/HostPage.jsx';
import {AddStay} from './cmps/AddStay.jsx'
import { WishListPage } from './pages/WishListPage.jsx';
import { BecomeHost } from './pages/BecomeHost.jsx';
import { Notifications } from './cmps/Notifications.jsx';
// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: HomePage,
    label: 'Home',
  },
  {
    path: '/stay',
    component: HomePage,
    label: 'Stays',
  },
  {
    path: '/stay/:stayId',
    component: StayDetails,
    label: 'StayDetails',
  },
  {
    path: '/host',
    component: BecomeHost,
    label: 'Become a Host',
  },
  {
    path: '/host/:userId',
    component: HostPage,
    label: 'Dashboard',
  },
 
  {
    path: '/user/:userId',
    component: AccountPage,
    label: 'Account',
  },
  {
    path: '/notifications/:userId',
    component:Notifications,
    label: 'Notification',
  },
  {
    path: '/login',
    component: LoginPage,
    label: 'Login',
  },
  {
    path: '/orders',
    component: OrderPage,
    label: 'Order',
  },
  {
    path: '/explore',
    component: ExplorePage,
    label: 'Explore',
  },
  {
    path: '/wishlist',
    component: WishListPage,
    label: 'WishListPage',
  },
];

export default routes;
