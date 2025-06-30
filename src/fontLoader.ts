// src/fontLoader.ts
import WebFont from 'webfontloader';

export const loadFonts = () => {
  WebFont.load({
    google: {
      families: [
        'Bellota:400,700',
        'Bitter:400,700',
        'Nunito:400,700,900,1000',
        'Instrument Sans:400,700,900',
        'Delius Swash Caps:400,700',
        'Inter Tight:400,700',
        'Poppins:500,600,700,800',
        'Pacifico:400',
        'Playwright Hrvatska:400',
        'Merienda:400,700',
        'Open Sans:300,400,600,700',
         'Inter:300,400,500,600,700',
         'Roboto:300,400,500,700'
      ],
    },
  });
};
