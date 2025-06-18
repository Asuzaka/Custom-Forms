import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export default function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {/* Your app here... */}
      <Routes>
        <Route path="/" element={<div>{t("hello")}</div>} />
        {/* ... */}
      </Routes>
    </HeroUIProvider>
  );
}
