import { useEffect } from 'react';
import { useAppStore } from '../../lib/store';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { generateMockMetrics, generateMockGenerations, generateMockNotifications } from '../../lib/store';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { 
    setDashboardMetrics, 
    contentGenerations, 
    addContentGeneration,
    notifications,
    addNotification,
    theme 
  } = useAppStore();

  // Initialize mock data
  useEffect(() => {
    // Set dashboard metrics
    setDashboardMetrics(generateMockMetrics());

    // Add mock generations if none exist
    if (contentGenerations.length === 0) {
      const mockGenerations = generateMockGenerations();
      mockGenerations.forEach(gen => addContentGeneration(gen));
    }

    // Add mock notifications if none exist
    if (notifications.length === 0) {
      const mockNotifications = generateMockNotifications();
      mockNotifications.forEach(notif => addNotification(notif));
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}