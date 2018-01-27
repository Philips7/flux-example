import * as firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyB6TOjU7ONj8H8gr-T_Q7DEx0Q6DqgAxeQ",
    authDomain: "flux-example-313a5.firebaseapp.com",
    databaseURL: "https://flux-example-313a5.firebaseio.com",
    projectId: "flux-example-313a5",
    storageBucket: "flux-example-313a5.appspot.com",
    messagingSenderId: "1039029264559"
}

export const fb = firebase.initializeApp(config)
