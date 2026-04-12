import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RadioPlayerProvider } from "@/contexts/RadioPlayerContext";
import '@/i18n';
import Index from "./pages/Index";
import CountryPage from "./pages/CountryPage";
import GenrePage from "./pages/GenrePage";
import WhoWeAre from "./pages/WhoWeAre";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RadioPlayerProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/countries" element={<CountryPage />} />
            <Route path="/countries/:countryCode" element={<CountryPage />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/genres/:genreSlug" element={<GenrePage />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RadioPlayerProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
