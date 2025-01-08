import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import { MainLayout } from '@components/layout/MainLayout'
import { ErrorBoundary } from '@components/layout/ErrorBoundary'
import { ROUTES } from '@routes/paths'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} errorElement={<ErrorBoundary />}>
      <Route path={ROUTES.HOME} lazy={() => import('@pages/HomePage').then(module => ({ Component: module.default }))} />
      <Route path={ROUTES.SETS} lazy={() => import('@pages/sets/SetsPage').then(module => ({ Component: module.default }))} />
      <Route path={ROUTES.SET_DETAIL} lazy={() => import('@pages/sets/SetDetailPage').then(module => ({ Component: module.default }))} />
      <Route path={ROUTES.CARDS} lazy={() => import('@pages/cards/CardsPage').then(module => ({ Component: module.default }))} />
      <Route path={ROUTES.CARD_DETAIL} lazy={() => import('@pages/cards/CardDetailPage').then(module => ({ Component: module.default }))} />
    </Route>
  )
)

export { router }