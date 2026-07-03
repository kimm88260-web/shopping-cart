
import { HashRouter as BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SearchProvider from "./context/SearchContext.tsx";
import ShoppingCartProvider from "./context/ShoppingCartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ShoppingCartProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ShoppingCartProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
