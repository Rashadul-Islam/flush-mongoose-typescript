import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { OrdersRoutes } from '../modules/order/order.route';
import { ReviewsRoutes } from '../modules/reviews/review.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
