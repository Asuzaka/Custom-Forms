import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { Dashboard, Home } from "./pages";
import { SignUp, SignIn } from "./pages/";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Protected } from "./shared/components/Protected";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        {/* Your app here... */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          {/* ... */}
        </Routes>
      </HeroUIProvider>
    </Provider>
  );
}
