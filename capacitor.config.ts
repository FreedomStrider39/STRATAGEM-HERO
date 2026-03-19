import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stratagemhero.app',
  appName: 'Stratagem Hero',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;