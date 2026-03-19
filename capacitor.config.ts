import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stratagemhero.app',
  appName: 'Stratagem Hero',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0a0c0c",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#facc15"
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0c0c'
    }
  }
};

export default config;