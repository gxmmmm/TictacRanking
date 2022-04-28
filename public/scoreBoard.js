function subscribe() {
    // subscribe Leaderboard
    const userAll = firebase.database().ref(`User`)
    userAll.on('value', (data) => {
        const userAllData = data.val()
        let i = 1
        const userBoard = document.createElement("div")

        // userAllData.sort((firstItem, secondItem) => firstItem.exp - secondItem.exp);
        const userArray = []
        for(const userId in userAllData) {
            userArray.push(userAllData[userId])
        }
        userArray.sort((firstItem, secondItem) => secondItem.exp - firstItem.exp);

        for(const userData of userArray) {
            // const userData = userAllData[userId]
            console.log(userData);

            const userBox = document.createElement("tr")
            const userH3 = document.createElement("th")
            const userImgBox = document.createElement("td")
            const userImg = document.createElement("img")
            const userName = document.createElement("td")
            const userScore = document.createElement("td")

            userH3.setAttribute("scope", "row")
            userImg.setAttribute("referrerpolicy", "no-referrer")

            userH3.innerHTML = i
                // userH3.style = "width: 7%"
            userImg.src = userData.userProfile
            userImg.style = "width: 30px; height: 30px; border-radius: 50%; margin-right: .5rem"
            userName.innerHTML = userData.name
            userScore.innerHTML = userData.exp

            userImgBox.appendChild(userImg)

            userBox.appendChild(userH3)
            userBox.appendChild(userImgBox)
            userBox.appendChild(userName)
            userBox.appendChild(userScore)

            userBoard.appendChild(userBox)

            // console.log(userData);
            i++
        }
        document.getElementById("show-player-score").innerHTML = userBoard.innerHTML
    })
}

document.addEventListener("DOMContentLoaded", subscribe, false);