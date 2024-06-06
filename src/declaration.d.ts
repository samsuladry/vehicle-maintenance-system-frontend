// // src/declarations.d.ts
// declare module '@material-tailwind/react';
// declare module '@heroicons/react/24/outline';

// src/declarations.d.ts
declare module '@material-tailwind/react' {
    // Add specific declarations if needed
    import * as React from 'react';
    export const Navbar: React.ComponentType<any>;
    export const Collapse: React.ComponentType<any>;
    export const Typography: React.ComponentType<any>;
    export const IconButton: React.ComponentType<any>;
    export const MobileNav: React.ComponentType<any>;
    export const Button: React.ComponentType<any>;
    // export const ThemeProvider: React.ComponentType<any>;
  }
  
  declare module '@heroicons/react/24/outline' {
    export const Bars3Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    export const XMarkIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
  