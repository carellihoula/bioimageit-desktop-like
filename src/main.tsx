import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactFlowProvider } from "@xyflow/react";
import { SocketProvider } from "./context/SocketContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider url="ws://localhost:8000/ws">
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ReactFlowProvider>
            <App />
          </ReactFlowProvider>
        </QueryClientProvider>
      </Provider>
    </SocketProvider>
  </StrictMode>
);
