import React, {
  ComponentType,
  LazyExoticComponent,
  PropsWithChildren,
  lazy,
} from "react";
import { Route, Routes } from "react-router-dom";

// mui
import { LinearProgress } from "@mui/material";
import Header from "./components/Header";

type LazyComponentType = LazyExoticComponent<ComponentType<any>>;

function withSuspense<T extends object>(
  Component: LazyComponentType
): ComponentType<PropsWithChildren<T>> {
  return (props: PropsWithChildren<T>) => (
    <React.Suspense fallback={<LinearProgress />}>
      <Component {...props} />
    </React.Suspense>
  );
}

const ListComponent = withSuspense(lazy(() => import("./pages/List")));

const RegistrationComponent = withSuspense(
  lazy(() => import("./pages/Registration"))
);
const LoginComponent = withSuspense( lazy(() => import("./pages/LoginForm")));
function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<RegistrationComponent />} />
        <Route path="/list" element={<ListComponent />} />
        <Route path="/login" element={<LoginComponent/>} />
      </Route>
    </Routes>
  );
}

export default App;
