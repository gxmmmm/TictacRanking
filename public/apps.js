const ref = firebase.database().ref("userList");
console.log(document.querySelector('.navbar-brand img').src)


const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user) {
    if (user) {
        document.querySelector("#profile-image").innerHTML = `<img src='${user.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
        profileName = document.querySelector("#profile-name").innerHTML = user.displayName
        loginItems.forEach((item) => {
            item.style.display = 'inline-block'
        })
        logoutItems.forEach((item) => {
            item.style.display = 'none'
        })
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