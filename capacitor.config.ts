import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.bookswap', 
  appName: 'BookSwap',
  webDir: 'www', 
  server: {
    androidScheme: 'https'
  },
};
export default config;
