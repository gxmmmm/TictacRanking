const ref = firebase.database().ref("userList");
console.log(document.querySelector('.navbar-brand img').src)


const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user, dataState) {
    if(user) {
        document.querySelector("#profile-image").innerHTML = `<img src='${user.photoURL}' width='40px' height='40px' style="border-radius: 50%" referrerpolicy="no-referrer">`
        profileName = document.querySelector("#profile-name").innerHTML = user.displayName
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