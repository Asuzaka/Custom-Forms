import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Layout } from "./pages/layout";

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
        <Layout />
        {/* Your app here...
        <Routes>
          <Route index element={<Home />}></Route>
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
        {/* </Routes> */}
      </HeroUIProvider>
    </Provider>
  );
}
