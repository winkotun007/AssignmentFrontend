import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
