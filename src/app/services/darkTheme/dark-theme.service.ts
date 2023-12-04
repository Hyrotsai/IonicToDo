// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DarkThemeService {
//   themeToggle: boolean = false;

//   constructor() {}

//   init() {
//     console.log('Inicio');
//     // Use matchMedia to check the user preference
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

//     // Initialize the dark theme based on the initial
//     // value of the prefers-color-scheme media query
//     this.initializeDarkTheme(prefersDark.matches);

//     // Listen for changes to the prefers-color-scheme media query
//     prefersDark.addEventListener('change', (mediaQuery) =>
//       this.initializeDarkTheme(mediaQuery.matches)
//     );
//   }

//   // Check/uncheck the toggle and update the theme based on isDark
//   initializeDarkTheme(isDark: any) {
//     this.themeToggle = isDark;
//     this.toggleDarkTheme(isDark);
//   }

//   // Add or remove the "dark" class on the document body
//   toggleDarkTheme(shouldAdd: any) {
//     document.body.classList.toggle('dark', shouldAdd);
//   }
// }
