import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CybernetDashboard, Toaster } from "./components";

const NotFound = () => (
  <div className="min-h-screen bg-cybernet-bg text-cybernet-text flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-cybernet-red">404</h1>
      <p className="text-cybernet-text-muted">الصفحة غير موجودة</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CybernetDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
