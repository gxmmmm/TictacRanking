let roomId

function matching() {


    // refRoom.push({
    //     playerX: currentUser.uid
    // })
    // console.log('mee')
    // console.log(currentUser);
    // refRoom.once('value', (data) => {
    //     const dataState = data.val()
    //     console.log(dataState);
    //     let found = false
    //     for (const roomId in dataState) {
    //         console.log(roomId);
    //         console.log(dataState[roomId]);
    //         console.log(dataState.playerX);
    //         const room = dataState[roomId]
    //         if (!room['playerX']) {
    //             console.log('no X');
    //             refRoom.child(roomId).update({
    //                 playerX: currentUser.uid
    //             })
    //             found = true
    //             document.querySelector('#btn-match').disabled = true
    //             return
    //         } else if (!room['playerO']) {
    //             console.log('no O');
    //             refRoom.child(roomId).update({
    //                 playerO: ""
    //             })
    //             found = true
    //             document.querySelector('#btn-match').disabled = true
    //             return
    //         }
    //     }

    //         if (!found) {
    //             refRoom.push({
    //                 playerX: currentUser.uid
    //             })
    //             document.querySelector('#btn-match').disabled = true
    //         }
    //     })
}
//สร้างห้อง
async function handleCreateNewRoom() {
    const currentUser = firebase.auth().currentUser
    roomId = makeid(5)

    document.querySelector('#btn-match').disabled = true
    await update(currentUser)
    window.location.href = "/inmatch.html?roomId=" + roomId
    console.log(roomId);
}
async function update(user) {
    firebase.database().ref(`Room/${roomId}`).set({
        playerX: {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL
        },
        playerO: {}
    })
}
// สร้างID
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
//จอยห้อง
async function join(room_id) {
    const user = firebase.auth().currentUser
    console.log(user);
    if(room_id) {
        const room = firebase.database().ref(`Room/${room_id}`)
        room.once('value', (data) => {
            const dataState = data.val()
            console.log(data);
            if(dataState.playerX.uid == user.uid) {

                window.location.href = "/inmatch.html?roomId=" + room_id
            } else if(!dataState.playerO) {
                firebase.database().ref(`Room/${room_id}`).update({
                    playerO: {
                        uid: user.uid,
                        name: user.displayName,
                        photoURL: user.photoURL
                    },
                })
                window.location.href = "/inmatch.html?roomId=" + room_id
            }


        })


    } else {
        const room = firebase.database().ref(`Room`)
        room.once('value', (data) => {
            const dataState = data.val()
            for(const roomId in dataState) {
                console.log(dataState[roomId]);
                if(dataState[roomId].playerX == user.uid) {

                    continue
                }
                if(!dataState[roomId].playerO) {
                    firebase.database().ref(`Room/${roomId}`).update({
                        playerO: {
                            uid: user.uid,
                            name: user.displayName,
                            photoURL: user.photoURL
                        },
                    })
                    window.location.href = "/inmatch.html?roomId=" + roomId
                    return
                }
            }

        })
    }
}

function renderRoom() {
    const room = firebase.database().ref(`Room`)
    room.once('value', (data) => {
        const dataState = data.val()
        const roomDiv = document.createElement("div")
        let i = 1
        const user = firebase.auth().currentUser
        for(const roomId in dataState) {

            console.log(dataState[roomId]);
            const card = document.createElement("div")
            const cardBody = document.createElement("div")
            card.setAttribute("class", "card")
            cardBody.setAttribute("class", "card-body")

            const h5_1 = document.createElement("h5")
            const h5_2 = document.createElement("h5")
            const h5_3 = document.createElement("h5")
            h5_1.innerHTML = "#" + i
            h5_2.innerHTML = "X :" + (dataState[roomId].playerX ? dataState[roomId].playerX.name : "")
            h5_3.innerHTML = "O :" + (dataState[roomId].playerO ? dataState[roomId].playerO.name : "")
            const btn = document.createElement("button")
            if(dataState[roomId].playerO && dataState[roomId].playerX) {
                btn.setAttribute("class", "btn btn-danger")
                btn.innerHTML = "In Match"
            } else {
                btn.setAttribute("class", "btn btn-success")
                btn.innerHTML = "Join"
                btn.setAttribute("onclick", `join('${roomId}')`)

            }

            cardBody.appendChild(h5_1)
            cardBody.appendChild(h5_2)
            cardBody.appendChild(h5_3)
            cardBody.appendChild(btn)
            card.appendChild(cardBody)
            roomDiv.appendChild(card)
            i++




        }
        document.getElementById("allRoom").appendChild(roomDiv)

    })
}
document.addEventListener("DOMContentLoaded", renderRoom, false);