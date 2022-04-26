const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener('click', loginUser)

firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ', user);
    const userData = firebase.database().ref(`User/${user.uid}`)
    userData.once('value', (data) => {
            const dataState = data.val()
            console.log(dataState);
            if(!dataState) {
                userData.set({
                    coins: 500,
                    exp: 0,
                    name: user.displayName,
                    userProfile: user.photoURL
                })
            }
            setupUI(user, dataState)
        })
        // getList(user)

    // window.location.href = "/ingame.html"
})

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut()
    window.location.href = "/"
    console.log('Logout completed.');
})

function loginUser(event) {
    console.log('hh');
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            window.location.href = "/ingame.html"

            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(errorMessage);
        });

    // firebase.auth().signInWithRedirect(provider);
}