const ref = firebase.database().ref("userList");
console.log(document.querySelector('.navbar-brand img').src)


const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

const refUser = firebase.database().ref("User");

function setupUI(user, dataState) {
    if(user) {

        refUser.child(user.uid).once("value", (data) => {
            data = data.val()
            document.querySelector("#profile-image").innerHTML = `<img src='${data.userProfile}' width='40px' height='40px' style="border-radius: 50%" referrerpolicy="no-referrer">`
            profileName = document.querySelector("#profile-name").innerHTML = data.name
        })

        loginItems.forEach((item) => {
            item.style.display = 'inline-block'
        })
        logoutItems.forEach((item) => {
            item.style.display = 'none'
        })
        document.querySelector("#profile-coins").innerHTML = dataState.coins || 500
    } else {
        loginItems.forEach((item) => {
            item.style.display = 'none'
        })
        logoutItems.forEach((item) => {
            item.style.display = 'inline-block'
        })
    }
    return

}

const btnScore = document.querySelector("#btnScore")
if(btnScore) {
    btnScore.addEventListener("click", showScore)
}

function showScore() {
    document.querySelector(".right").classList.add("show")
}


const btnClose = document.querySelector("#btnClose")
if(btnClose) {
    btnClose.addEventListener("click", closeScore)
}

function closeScore() {
    document.querySelector(".right").classList.remove("show")
}