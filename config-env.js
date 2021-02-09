const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

function getEnvironmentVariable(key, _default = '') { return process.env[key] || _default; }

function createEnvironementFile() {
  return `export const environment = {
  production: true,
  oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
  oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
  imageCompressionBaseUrl: '${getEnvironmentVariable('IMAGE_COMPRESSION_BASE_URL')}',
  serviceUrl: '${getEnvironmentVariable('SERVICE_URL')}',
  storageApplicationId: '${getEnvironmentVariable('STORAGE_APPLICATION_ID', 'accounts-avatar')}',
  storageBaseUrl: '${getEnvironmentVariable('STORAGE_URL', 'https://s3.tareffaapp.com.br:55325')}',
  storageAccountingId: '${getEnvironmentVariable('STORAGE_ACCOUNTING_ID', 'ottimizza')}',
  applicationId: '${getEnvironmentVariable('APPLICATION_ID', 'ottimizza')}',
  portalBaseUrl: '${getEnvironmentVariable('PORTAL_BASE_URL', 'https:///accounts.ottimizza.com.br')}',
  defaultColor: '${getEnvironmentVariable('DEFAULT_COLOR', '#004ecb')}',
  supportUrl: '${getEnvironmentVariable('SUPPORT_URL', 'https://suporte.ottimizza.com.br')}',
  messagingBaseUrl: '${getEnvironmentVariable('MESSAGING_BASE_URL', 'https://ottimizza-notification-service.herokuapp.com')}',
  topic: {
    id: 0,
    name: '${getEnvironmentVariable('TOPIC')}'
  },
  firebase: {
    apiKey: '${getEnvironmentVariable('FIREBASE_API_KEY')}',
    authDomain: '${getEnvironmentVariable('FIREBASE_AUTH_DOMAIN')}',
    databaseUrl: '${getEnvironmentVariable('FIREBASE_DATABASE_URL')}',
    projectId: '${getEnvironmentVariable('FIREBASE_PROJECT_ID')}',
    storageBucket: '${getEnvironmentVariable('FIREBASE_STORAGE_BUCKET')}',
    messagingSenderId: '${getEnvironmentVariable('FIREBASE_MESSAGING_SENDER_ID')}',
    appId: '${getEnvironmentVariable('FIREBASE_APP_ID')}',
    measurementId: '${getEnvironmentVariable('FIREBASE_MEASUREMENT_ID')}'
  }
};
`;
}

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();

console.log(`
  ENVIRONMENT -> ${environment}
  ---
  ${environmentFile}
`);

fs.writeFile(`./src/environments/environment.prod.ts`, environmentFile, (err) => {
  if (err) {
    console.log(err);
  }
});
