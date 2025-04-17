import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";
import { system } from "./theme.ts";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider url="ws://localhost:8000/ws">
      <Provider>
        <App />
      </Provider>
    </SocketProvider>
  </StrictMode>
);
