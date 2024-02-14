import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context";
import AppRouting from "./pages/AppRouting";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouting></AppRouting>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
