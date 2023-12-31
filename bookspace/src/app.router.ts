import { RootRoute, Route, RoutePaths, Router } from "@tanstack/react-router";
import { App } from "./app";
import {
  emailConfirmationRoute,
  forgotPasswordRoute,
  loginRoute,
  resetPasswordRoute,
  signupRoute,
} from "./auth/auth.routes";
import { dashboardRoutes } from "./features/dashboard/dashboard.routes";
import { NotFound } from "./components/not_found";
import { anonBookingRoutes } from "./features/anon_booking/anon_booking.routes";

const rootRoute = new RootRoute();

const appIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const splatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "$",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  appIndex,
  splatRoute,
  loginRoute,
  signupRoute,
  emailConfirmationRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  dashboardRoutes,
  anonBookingRoutes,
]);

const router = new Router({ routeTree });

type AnonPaths = RoutePaths<typeof anonBookingRoutes>;
type DashboardPaths = RoutePaths<typeof dashboardRoutes>;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export { type AnonPaths, type DashboardPaths, rootRoute, router };
