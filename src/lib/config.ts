export const config = {
  // Backend API configuration
  api: {
    // Prefer Vite env when present; fallback to localhost in dev, relative in prod
    baseUrl: (import.meta as any).env?.VITE_API_BASE_URL
      || ((import.meta as any).env?.DEV ? 'http://localhost:3000' : ''),
  },
  
  // App configuration
  app: {
    name: 'Fitflix',
    version: '1.0.0',
  }
};
