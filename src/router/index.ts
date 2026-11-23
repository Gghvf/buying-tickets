import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import FiltersPage from '../pages/FiltersPage.vue'
import MoviePage from '../pages/MoviePage.vue'
import SessionsPage from '../pages/SessionsPage.vue'
import SeatsPage from '../pages/SeatsPage.vue'
import OrderPage from '../pages/OrderPage.vue'
import PaymentPage from '../pages/PaymentPage.vue'
import CardPage from '../pages/CardPage.vue'
import SuccessPage from '../pages/SuccessPage.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ForgotPage from '../pages/ForgotPage.vue'
import ForgotSentPage from '../pages/ForgotSentPage.vue'
import NewPasswordPage from '../pages/NewPasswordPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import TicketPage from '../pages/TicketPage.vue'
import RefundPage from '../pages/RefundPage.vue'
import RefundDonePage from '../pages/RefundDonePage.vue'

export const router = createRouter({
  history:
    import.meta.env.MODE === 'ghpages'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainPage },
    { path: '/catalog', component: CatalogPage },
    { path: '/filters', component: FiltersPage },
    { path: '/movie/:id', component: MoviePage },
    { path: '/sessions/:id', component: SessionsPage },
    { path: '/seats', component: SeatsPage },
    { path: '/order', component: OrderPage },
    { path: '/payment', component: PaymentPage },
    { path: '/payment/card', component: CardPage },
    { path: '/success', component: SuccessPage },
    { path: '/error', component: ErrorPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/forgot', component: ForgotPage },
    { path: '/forgot/sent', component: ForgotSentPage },
    { path: '/forgot/new', component: NewPasswordPage },
    { path: '/profile', component: ProfilePage },
    { path: '/ticket', component: TicketPage },
    { path: '/refund', component: RefundPage },
    { path: '/refund/done', component: RefundDonePage },
  ],
})