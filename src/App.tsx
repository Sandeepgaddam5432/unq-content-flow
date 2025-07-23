import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Channels from "./pages/Channels";
import ContentCreation from "./pages/ContentCreation";
import VideoGeneration from "./pages/VideoGeneration";
import PublishingQueue from "./pages/PublishingQueue";
import Analytics from "./pages/Analytics";
import ApiManagement from "./pages/ApiManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/channels/youtube" element={<Channels />} />
            <Route path="/channels/instagram" element={<Channels />} />
            <Route path="/content-creation" element={<ContentCreation />} />
            <Route path="/generation" element={<VideoGeneration />} />
            <Route path="/publishing" element={<PublishingQueue />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/channels" element={<Analytics />} />
            <Route path="/analytics/content" element={<Analytics />} />
            <Route path="/api-management" element={<ApiManagement />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
