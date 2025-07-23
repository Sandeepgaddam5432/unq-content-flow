import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({
  className,
  children,
  ...props
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white/30 dark:bg-black/30 backdrop-blur-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] hover:border-primary/50 active:scale-[0.97]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md p-2 transition-all duration-200 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface AnimatedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedIcon({
  className,
  children,
  ...props
}: AnimatedIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-90",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedLink({
  className,
  children,
  ...props
}: AnimatedLinkProps) {
  return (
    <a
      className={cn(
        "text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
} 