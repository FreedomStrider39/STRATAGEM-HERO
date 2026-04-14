import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { AnimatePresence } from "framer-motion";
import Game from "./pages/Game";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Index from "./pages/Index";
import Encyclopedia from "./pages/Encyclopedia";
import OpeningScreen from "./components/OpeningScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showOpening, setShowOpening] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence>
            {showOpening && (
              <OpeningScreen onComplete={() => setShowOpening(false)} />
            )}
          </AnimatePresence>

          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/game" element={<Game />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/intel" element={<Encyclopedia />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;