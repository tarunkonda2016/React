import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyB1KtB9U83WpVinWmD4toh0PdgNceRjm5M",
    // authDomain: "XXXXX",
    databaseURL: "https://windzsystem-a01cc.firebaseio.com/",
    projectId: "windzsystem-a01cc",
    storageBucket: "windzsystem-a01cc.appspot.com",
    // messagingSenderId: "XXXX"
};
firebase.initializeApp(config);

export default firebase;