import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId,measurementId} from  './firebase_config.json';
export const environment = {
  production: true,
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 firebaseConfig : {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
 }
};
