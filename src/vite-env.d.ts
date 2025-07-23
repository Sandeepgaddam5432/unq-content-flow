/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'react-router-dom' {
  export interface LinkProps {
    end?: boolean;
  }
}

// Ensure Lucide icons are properly typed
declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export const LayoutDashboard: FC<SVGProps<SVGSVGElement>>;
  export const Users: FC<SVGProps<SVGSVGElement>>;
  export const PlusCircle: FC<SVGProps<SVGSVGElement>>;
  export const Play: FC<SVGProps<SVGSVGElement>>;
  export const Calendar: FC<SVGProps<SVGSVGElement>>;
  export const BarChart3: FC<SVGProps<SVGSVGElement>>;
  export const Key: FC<SVGProps<SVGSVGElement>>;
  export const Settings: FC<SVGProps<SVGSVGElement>>;
  export const Youtube: FC<SVGProps<SVGSVGElement>>;
  export const Instagram: FC<SVGProps<SVGSVGElement>>;
  export const ChevronDown: FC<SVGProps<SVGSVGElement>>;
  export const Activity: FC<SVGProps<SVGSVGElement>>;
  export const TrendingUp: FC<SVGProps<SVGSVGElement>>;
  export const Bell: FC<SVGProps<SVGSVGElement>>;
  export const Search: FC<SVGProps<SVGSVGElement>>;
  export const LogOut: FC<SVGProps<SVGSVGElement>>;
  export const Moon: FC<SVGProps<SVGSVGElement>>;
  export const Sun: FC<SVGProps<SVGSVGElement>>;
  export const Monitor: FC<SVGProps<SVGSVGElement>>;
  export const Plus: FC<SVGProps<SVGSVGElement>>;
  export const Command: FC<SVGProps<SVGSVGElement>>;
  export const PanelLeft: FC<SVGProps<SVGSVGElement>>;
  export const Keyboard: FC<SVGProps<SVGSVGElement>>;
  export const PlusSquare: FC<SVGProps<SVGSVGElement>>;
  // Add any other icons you use
}
