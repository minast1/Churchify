import { initializeApp, cert, applicationDefault, getApps, getApp} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
 
let app; 
try {
    if (process.env.NODE_ENV === 'development') {
        app = getApps().length === 0 ?
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // replace `\` and `n` character pairs w/ single `\n` character
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        
                }),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            }) : getApp();
    } else {
        app = getApps().length === 0 ?
            initializeApp({
                credential: applicationDefault(),
            }) : getApp();
        }
        
    } catch (error) {
        console.log("Failed to initialize App: " + error)
    } 


const bucket = getStorage().bucket();
export { bucket, app};

//initializeApp();