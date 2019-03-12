import firebase from 'firebase';

//Initialize Firebase
var config = {
  apiKey: "AIzaSyAgjyFdvLqmMBtq67NRGkVBGflrZx5uQpQ",
  authDomain: "thivernale-todo-app.firebaseapp.com",
  databaseURL: "https://thivernale-todo-app.firebaseio.com",
  projectId: "thivernale-todo-app",
  storageBucket: "thivernale-todo-app.appspot.com",
  messagingSenderId: "978186728580"
};
firebase.initializeApp(config);

// get a reference to the db object
// set completely updates the date at the current reference
// set method return a promise
var firebaseRef = firebase.database().ref();

firebaseRef.set({
    app: {
        name:'TODO App',
        version: '0.5'
    },
    isRunning: true,
    user: {
        name: "Any",
        age: 23
    }
}).then(() => {
    console.log("Set worked!");
}, (e) => {
    console.log("Set failed!");
});

// access a nested reference
firebaseRef.child('user').set({
    name: "Mike"
});

firebaseRef.child('app').set({
    name: 'Todo Application'
});

// update updates only the first level of elements
// or multi-path updates can be used
firebaseRef.update({
    isRunning: false,
    'app/version' : '1.0.0'
});

firebaseRef.child('app').update({
    name: 'Todo Application 2'
}).then(() => {
    console.log("Update worked!");
}, (e) => {
    console.log("Update failed!");
});

firebaseRef.update({
    'app/name': "App Name Update",
    'user/name': "User Name Update"
});

// remove the whole db
//firebaseRef.remove();
// remove a nested ref
firebaseRef.child('app/name').remove();

// or delete data by setting it to null
firebaseRef.child('app').update({
    name: null,
    version: '2.0.0'
});

firebaseRef.update({
    isRunning: null
});
firebaseRef.child('user/age').remove();

// trigger and listen for an event
// this tells firebase to fetch all of the data available at the current reference
firebaseRef.child('app').once('value').then((snapshot) => {
    console.log('Got entire database', snapshot.key, snapshot.val());
}, (e) => {
    console.log('Unable to fetch value', e);
});

// listen for changes in firebase db
// attach a callback function as a listener; it gets called with the snapshot when the data changes
firebaseRef.on('value', (snapshot) => {
    console.log('Got value', snapshot.val());
});

// remove the listener on the same reference
firebaseRef.off();

firebaseRef.update({
    isRunning: false
});

// or remove a specific listener by passing it as a function to both on and off
var fn = (snapshot) => {
    console.log('User ref changed', snapshot.val());
};
firebaseRef.child('user').on('value', fn);
firebaseRef.update({
    'app/name': 'Change the app name',
    'user/name': 'Change the user name'
});
firebaseRef.child('user').off();

// arrays
var notesRef = firebaseRef.child('notes');
// create a new item and return reference to it
// or skip set and directly pass argument to set
var newNoteRef = notesRef.push({
    text: 'Walk the dog'
});
console.log('Todo id', newNoteRef.key);

// listen to change: new items added/changed/removed
notesRef.on('child_added', (snapshot) => {
    console.log('child_added', snapshot.key, snapshot.val());
});
notesRef.on('child_changed', (snapshot) => {
    console.log('child_changed', snapshot.key, snapshot.val());
});
notesRef.on('child_removed', (snapshot) => {
    console.log('child_removed', snapshot.key, snapshot.val());
});


var todosRef = firebaseRef.child('todos');
todosRef.on('child_added', (snapshot) => {
    console.log('child_added', snapshot.key, snapshot.val());
});

todosRef.push({
    text: 'Note 1'
});
todosRef.push({
    text: 'Note too'
});


