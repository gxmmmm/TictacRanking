const signupForm = document.querySelector("#signup-form");
const signupForm1 = document.querySelector("#signup-form_1");
if(signupForm) {
    signupForm.addEventListener("submit", createUser);
}

// signupForm.addEventListener("submit", () => { alert() });

function createUser(event) {
    const signupFeedback = document.querySelector("#feedback-msg-signup");
    const singupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));
    event.preventDefault();
    console.log('createUser');
    const name = signupForm['input-name-signup'].value
    const email = signupForm['input-email-signup'].value;
    const pwd = signupForm['input-password-signup'].value;
    firebase.auth().createUserWithEmailAndPassword(email, pwd)
        .then(() => {
            signupFeedback.style = `color:green`;
            signupFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Signup Complete.`;
            setTimeout(function() {
                singupModal.hide();
            }, 1000);
            const ref = firebase.database().ref("User")
            const currentUser = firebase.auth().currentUser;
            ref.child(currentUser.uid).update({
                coins: 500,
                exp: 0,
                name: name,
                userProfile: "/picture/logo.png"
            });
        })
        .catch((error) => {
            signupFeedback.style = `color:crimson`;
            signupFeedback.innerText = `${error.message}`;
            signupForm.reset();
        });
}

const loginForm = document.querySelector("#login-form");

if(loginForm) {
    loginForm.addEventListener("submit", loginUserEmail);
}

const loginFeedback = document.querySelector("#feedback-msg-login");
// const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));

function loginUserEmail(event) {
    event.preventDefault();
    const email = loginForm['input-email-login'].value;
    const pwd = loginForm['input-password-login'].value;
    firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then(() => {
            loginFeedback.style = `color:green`;
            loginFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> login Complete.`;
            // setTimeout(function() {
            //     // loginModal.hide();
            //     window.location.href = "./lobby.html"
            // }, 1000);
        })
        .catch((error) => {
            loginFeedback.style = `color:crimson`;
            loginFeedback.innerText = `${error.message}`;
            loginForm.reset();
        });
}

const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener('click', loginUser)

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
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
    } else {
        setupUI(user, null)
    }

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

function onLoad() {
    var myModal = document.getElementById('myModal')
    var myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', function() {
    //     myInput.focus()
    // })
}
document.addEventListener("DOMContentLoaded", onLoad, false);