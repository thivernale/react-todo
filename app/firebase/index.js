import firebase from 'firebase';

try {
    var config = {
            apiKey: process.env.FIREBASE_API_KEY || '',
            authDomain: "thivernale-todo-app.firebaseapp.com",
            databaseURL: "https://thivernale-todo-app.firebaseio.com",
            projectId: "thivernale-todo-app",
            storageBucket: "thivernale-todo-app.appspot.com",
            messagingSenderId: "978186728580"
    };
    firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
// export the whole library as default so that other files only need to import this file
export default firebase;