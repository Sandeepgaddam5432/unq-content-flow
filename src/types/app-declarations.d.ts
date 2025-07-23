// This file contains app-specific type declarations

import 'react';

// Augment BadgeProps to ensure variant is recognized
declare module '@/components/ui/badge' {
  interface BadgeProps {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children?: React.ReactNode;
    className?: string;
  }
}

// Declare NavLink props used in the app
declare module 'react-router-dom' {
  interface NavLinkProps {
    to: string;
    end?: boolean;
    className?: string | (({ isActive }: { isActive: boolean }) => string);
    children: React.ReactNode;
  }

  export const NavLink: React.FC<NavLinkProps>;
  export function useLocation(): { pathname: string };
}

// Declare Shadcn UI component props
declare namespace ShadcnUI {
  interface CollapsibleProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }
  
  interface CollapsibleTriggerProps {
    asChild?: boolean;
    children: React.ReactNode;
  }
  
  interface CollapsibleContentProps {
    children: React.ReactNode;
  }
}

// Ensure CommandDialog recognizes children prop
declare module '@/components/ui/command' {
  interface CommandDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }
} 