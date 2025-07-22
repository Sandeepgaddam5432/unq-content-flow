import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Channels from "./pages/Channels";
import ContentCreation from "./pages/ContentCreation";
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
            <Route path="/generation" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Video Generation</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/publishing" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Publishing Queue</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/analytics" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Analytics & Insights</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/analytics/channels" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Channel Analytics</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/analytics/content" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Content Analytics</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/api-management" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">API Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/settings" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
