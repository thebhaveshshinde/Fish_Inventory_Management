// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "nuxt-vuefire",
  ],
  runtimeConfig: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    public: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL:
      process.env.ENVIRONMENT === "DEVELOPMENT"
      // process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/auth"
        : "https://fish-inventory-management.vercel.app/api/auth",
    provider: {
      type: "authjs",
    },
  },
  googleFonts: {
    families: {
      Roboto: {
        wght: "100..900",
      },
    },
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter var", "system-ui", "sans-serif"],
            lato: ["Lato", "sans-serif"],
          },
        },
      },
    },
  },
  vuefire: {
    enabled: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
});