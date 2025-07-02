import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Layout } from "./pages/layout";

export default function App() {
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ToastProvider />
        <Layout />
      </HeroUIProvider>
    </Provider>
  );
}
