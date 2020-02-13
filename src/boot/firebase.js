import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
	apiKey: "AIzaSyA13NJC8uIxuhs-N-kvwVJEjKk7X6QyGwU",
	authDomain: "vsrrollingmillsindia.firebaseapp.com",
	databaseURL: "https://vsrrollingmillsindia.firebaseio.com",
	projectId: "vsrrollingmillsindia",
	storageBucket: "vsrrollingmillsindia.appspot.com",
	messagingSenderId: "144118937993",
	appId: "1:144118937993:web:62a383a6b8fbea036c8958",
	measurementId: "G-0WR7XQRMBE"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();
let firebaseStorage = firebaseApp.firestore();
let firebaseImageStorage = firebaseApp.storage();
export
{
	firebaseAuth,
	firebaseDb,
	firebaseStorage,
	firebaseImageStorage
}
