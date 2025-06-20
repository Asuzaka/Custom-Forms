import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { Home } from "./pages";
import { SignUp } from "./pages/auth/signup";
import { SignIn } from "./pages/auth/singin";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export default function App() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {/* Your app here... */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* ... */}
      </Routes>
    </HeroUIProvider>
  );
}
