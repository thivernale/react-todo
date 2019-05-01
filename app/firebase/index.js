import firebase from 'firebase';

try {
    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef = firebase.database().ref();
// export the whole library as default so that other files only need to import this file
export default firebase;
