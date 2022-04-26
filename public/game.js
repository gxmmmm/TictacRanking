// const refGame = firebase.database().ref("Game")
// const refScore = firebase.database().ref("Scores")

// refGame.on("value", snapshot => {
//     getGameInfo(snapshot)
// })

// refScore.on("value", snapshot => {
//     data = snapshot.val()
//     const currentUser = firebase.auth().currentUser

//     console.log(currentUser.email);
//     if (currentUser) {
//         // if (data[currentUser.uid]) {
//         //     document.querySelector("#user-score").innerHTML = `(${data[currentUser.uid]})`
//         // } else {
//         //     document.querySelector("#user-score").innerHTML = "(0)"
//         // }
//         console.log(currentUser);
//     }
// })

// function getGameInfo(snapshot) {
//     const currentUser = firebase.auth().currentUser

//     document.getElementById('inputPlayer-x').value = ''
//     document.getElementById('inputPlayer-o').value = ''

//     document.querySelector('#btnJoin-x').disabled = false;
//     document.querySelector('#btnJoin-o').disabled = false;

//     document.querySelector("#waiting-text").innerHTML = "Waiting for players..."

//     snapshot.forEach((data) => {
//         const gameInfos = data.val()
//         Object.keys(gameInfos).forEach(key => {
//             switch (key) {
//                 case 'user-x-email':
//                     playerX = gameInfos[key]
//                     document.getElementById('inputPlayer-x').value = playerX
//                     document.querySelector('#btnJoin-x').disabled = true;
//                     break
//                 case 'user-o-email':
//                     playerO = gameInfos[key]
//                     document.getElementById('inputPlayer-o').value = playerO
//                     document.querySelector('#btnJoin-o').disabled = true;
//                     break
//             }

//             if (currentUser.email == gameInfos[key]) {
//                 document.querySelector('#btnJoin-x').disabled = true;
//                 document.querySelector('#btnJoin-o').disabled = true;
//             }
//         })

//         if (gameInfos["user-x-email"] && gameInfos["user-o-email"]) {
//             document.querySelector("#btnStartGame").disabled = false
//             document.querySelector("#waiting-text").innerHTML = "Click START GAME"
//         } else {
//             document.querySelector("#btnStartGame").disabled = true
//             document.querySelector("#waiting-text").innerHTML = "Waiting for players..."
//         }

//         if (gameInfos.status === "start") {
//             checkWinner()
//             document.querySelector("#btnStartGame").disabled = true
//             document.querySelector("#btnCancel-x").disabled = true
//             document.querySelector("#btnCancel-o").disabled = true
//             const boxes = document.querySelectorAll(".table-col")
//             boxes.forEach(box => { box.addEventListener("click", inputBox) })
//         } else if (gameInfos.status === "finish") {
//             document.querySelector("#btnStartGame").disabled = true
//             document.querySelector("#btnCancel-x").disabled = true
//             document.querySelector("#btnCancel-o").disabled = true
//             const boxes = document.querySelectorAll(".table-col")
//             boxes.forEach(box => { box.removeEventListener("click", inputBox) })
//         } else {
//             document.querySelector("#btnCancel-x").disabled = false
//             document.querySelector("#btnCancel-o").disabled = false
//             const boxes = document.querySelectorAll(".table-col")
//             boxes.forEach(box => { box.removeEventListener("click", inputBox) })
//         }

//         if (gameInfos.turn) {
//             document.querySelector("#waiting-text").innerHTML = `Turn: ${gameInfos.turn}`
//         }

//         if (gameInfos.tables) {
//             for (const box in gameInfos.tables) {
//                 document.querySelector(`#${box} p`).innerHTML = gameInfos.tables[box]
//             }
//         } else {
//             const boxes = document.querySelectorAll(".table-col p")
//             boxes.forEach(box => { box.innerHTML = "" })
//         }

//         if (gameInfos.winner == "draw") {
//             document.querySelector("#waiting-text").innerHTML = `GAME DRAW`
//         } else if (gameInfos.winner) {
//             document.querySelector("#waiting-text").innerHTML = `Winner: ${gameInfos.winner}`
//         }
//     })
// }

// const btnJoins = document.querySelectorAll(".btn-join")
// btnJoins.forEach(btnJoin => btnJoin.addEventListener('click', joinGame))

// function joinGame(event) {
//     const currentUser = firebase.auth().currentUser
//     console.log("[Join] Current user:", currentUser);
//     if (currentUser) {
//         const btnJoinID = event.currentTarget.getAttribute("id")
//         const player = btnJoinID[btnJoinID.length - 1]

//         const playerForm = document.getElementById(`inputPlayer-${player}`);
//         if (playerForm.value == "") {
//             let tmpID = `user-${player}-id`
//             let tmpEmail = `user-${player}-email`
//             refGame.child('game-1').update({
//                 [tmpID]: currentUser.uid,
//                 [tmpEmail]: currentUser.email
//             })
//             console.log(currentUser.email + " added.");
//             event.currentTarget.disabled = true;
//         }
//     }
// }

// const btnCancels = document.querySelectorAll(".btn-cancel-join-game");
// btnCancels.forEach(btnCancel => { btnCancel.addEventListener('click', cancelJoin) })

// function cancelJoin(event) {
//     const currentUser = firebase.auth().currentUser;
//     console.log('[Cancel] Current user:', currentUser);
//     if (currentUser) {
//         const btnCancelID = event.currentTarget.getAttribute("id");
//         const player = btnCancelID[btnCancelID.length - 1];

//         const playerForm = document.getElementById(`inputPlayer-${player}`)
//         console.log(playerForm);
//         if (playerForm.value && playerForm.value === currentUser.email) {
//             let tmpID = `user-${player}-id`
//             let tmpEmail = `user-${player}-email`
//             refGame.child('game-1').child(tmpID).remove()
//             refGame.child('game-1').child(tmpEmail).remove()
//             console.log(`delete on id: ${currentUser.uid}`);
//             document.querySelector(`#btnJoin-${player}`).disabled = false
//         }
//     }
// }

// const btnStartGame = document.querySelector(".btn-join");
// btnStartGame.addEventListener("click", startGame)

// function startGame(event) {
//     refGame.child("game-1").update({
//         status: "start",
//         turn: "X",
//         tables: ""
//     })
// }

// const btnTerminateGame = document.querySelector("#btnTerminateGame");
// btnTerminateGame.addEventListener("click", terminateGame)

// function terminateGame(event) {
//     refGame.child("game-1").child("status").remove()
//     refGame.child("game-1").child("turn").remove()
//     refGame.child("game-1").child("tables").remove()
//     refGame.child("game-1").child("winner").remove()
// }

// function inputBox(event) {
//     refGame.child("game-1").once("value", snapshot => {
//         data = snapshot.val()
//         currentUser = firebase.auth().currentUser
//         id = event.currentTarget.id
//         if (data.turn === "X" && data["user-x-email"] === currentUser.email && !data["tables"][id]) {
//             refGame.child("game-1").child("tables").update({
//                 [id]: data.turn
//             })
//             refGame.child("game-1").update({
//                 turn: "O"
//             })
//         } else if (data.turn === "O" && data["user-o-email"] === currentUser.email && !data["tables"][id]) {
//             refGame.child("game-1").child("tables").update({
//                 [id]: data.turn
//             })
//             refGame.child("game-1").update({
//                 turn: "X"
//             })
//         }
//     })
// }

// function checkWinner() {
//     refGame.child("game-1").once("value", snapshot => {
//         data = snapshot.val()
//         currentUser = firebase.auth().currentUser
//         turns = ["X", "O"]

//         if (data.winner) {
//             return
//         }

//         for (const turn of turns) {
//             win1 = data["tables"]["row-1-col-1"] == turn && data["tables"]["row-1-col-2"] == turn && data["tables"]["row-1-col-3"] == turn
//             win2 = data["tables"]["row-2-col-1"] == turn && data["tables"]["row-2-col-2"] == turn && data["tables"]["row-2-col-3"] == turn
//             win3 = data["tables"]["row-3-col-1"] == turn && data["tables"]["row-3-col-2"] == turn && data["tables"]["row-3-col-3"] == turn
//             win4 = data["tables"]["row-1-col-1"] == turn && data["tables"]["row-2-col-1"] == turn && data["tables"]["row-3-col-1"] == turn
//             win5 = data["tables"]["row-1-col-2"] == turn && data["tables"]["row-2-col-2"] == turn && data["tables"]["row-3-col-2"] == turn
//             win6 = data["tables"]["row-1-col-3"] == turn && data["tables"]["row-2-col-3"] == turn && data["tables"]["row-3-col-3"] == turn
//             win7 = data["tables"]["row-1-col-1"] == turn && data["tables"]["row-2-col-2"] == turn && data["tables"]["row-3-col-3"] == turn
//             win8 = data["tables"]["row-1-col-3"] == turn && data["tables"]["row-2-col-2"] == turn && data["tables"]["row-3-col-1"] == turn

//             if (win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8) {
//                 refGame.child("game-1").update({
//                     status: "finish",
//                     winner: turn
//                 })
//                 id = data[`user-${turn.toLowerCase()}-id`]
//                 refScore.once("value", snapshot => {
//                     scores = snapshot.val()
//                     if (!scores || !scores[id]) {
//                         refScore.update({
//                             [id]: 1
//                         })
//                     } else {
//                         score = scores[id]
//                         refScore.update({
//                             [id]: parseInt(score) + 1
//                         })
//                     }
//                 })

//                 return
//             }

//             if (data["tables"]["row-1-col-1"] && data["tables"]["row-1-col-2"] && data["tables"]["row-1-col-3"] && data["tables"]["row-2-col-1"] && data["tables"]["row-2-col-2"] && data["tables"]["row-3-col-1"] && data["tables"]["row-3-col-2"] && data["tables"]["row-3-col-3"]) {
//                 refGame.child("game-1").update({
//                     status: "finish",
//                     winner: "draw"
//                 })

//                 id1 = data[`user-x-id`]
//                 id2 = data[`user-o-id`]

//                 refScore.once("value", snapshot => {
//                     scores = snapshot.val()
//                     if (!scores || !scores[id1]) {
//                         refScore.update({
//                             [id1]: 1
//                         })
//                     } else {
//                         score = scores[id1]
//                         refScore.update({
//                             [id1]: parseInt(score) + 1
//                         })
//                     }

//                     if (!scores || !scores[id2]) {
//                         refScore.update({
//                             [id2]: 1
//                         })
//                     } else {
//                         score = scores[id2]
//                         refScore.update({
//                             [id2]: parseInt(score) + 1
//                         })
//                     }
//                     return
//                 })
//             }
//         }
//     })
// }

//ระบบเล่นเกม,ต้องมีid=cell
var url_string = window.location.href;

var url = new URL(url_string);
var roomId = url.searchParams.get("roomId");
var userPlayer

function enable1() {
    console.log('work with game js');
}
const statusDisplay = document.querySelector(".status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} win!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(player, clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = player;
    clickedCell.innerHTML = player;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

async function handleResultValidation(updateCheck) {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a === "" || b === "" || c === "") {
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    let roundDraw = !gameState.includes("");
    if(!updateCheck) {
        if(!roundWon && !roundDraw) {
            handlePlayerChange();
        }
        await update()
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return 'win'
    }


    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return 'Draw'
    }

}

function handleCellClick(clickedCellEvent) {
    if(currentPlayer == userPlayer) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute("data-cell-index")
        );

        if(gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        handleCellPlayed(currentPlayer, clickedCell, clickedCellIndex);
        handleResultValidation(false);
    }

}
async function handleCellChange(player, clickedCellIndex) {

    const clickedCell = document.querySelectorAll(`[data-cell-index="${clickedCellIndex}"]`)[0];

    handleCellPlayed(player, clickedCell, clickedCellIndex);
    const status = await handleResultValidation(true);
    if(!status) {
        statusDisplay.innerHTML = currentPlayerTurn();
    }
}


function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll("#cell").forEach((cell) => (cell.innerHTML = ""));
}
async function update() {
    firebase.database().ref(`Room/${roomId}`).update({
        currentPlayer: currentPlayer,
        gameState: gameState
    })
    console.log(gameState);
    console.log(currentPlayer);
}

async function matching() {
    var user
    firebase.auth().onAuthStateChanged((user_) => {
        user = user_
    })
    var url_string = window.location.href;

    var url = new URL(url_string);
    var roomId = url.searchParams.get("roomId");
    const room = firebase.database().ref(`Room/${roomId}`)

    await room.once('value', (data) => {
        const dataState = data.val()
        if(dataState.playerX.uid != user.uid) {
            join(roomId)
        }
    })


    room.on('value', function(snapshot) {
        const data = snapshot.val()
        if(data) {
            console.log(data);
            document.getElementById("img-player-st").innerHTML = `<img src='${data.playerX.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
            document.getElementById("name-player-st").innerHTML = data.playerX.name
            if(user.uid == data.playerX.uid) {
                userPlayer = "X"
            }
            if(data.playerO) {
                document.getElementById("img-player-nd").innerHTML = `<img src='${data.playerO.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
                document.getElementById("name-player-nd").innerHTML = data.playerO.name
                buyPhase()
                if(user.uid == data.playerO.uid) {
                    userPlayer = "O"
                }
            } else {
                document.getElementById("name-player-nd").innerHTML = "waiting for player "
            }
            if(data.gameState) {
                gameState = data.gameState
                currentPlayer = data.currentPlayer
                for(let i = 0; i < gameState.length; i++) {
                    handleCellChange(gameState[i], i)
                }
            }

        }
    });
}
async function join(room_id) {
    var user
    firebase.auth().onAuthStateChanged((user_) => {
        user = user_
    })
    console.log("join", user);
    if(room_id) {
        const room = firebase.database().ref(`Room/${room_id}`)
        await room.once('value', (data) => {
            const dataState = data.val()
            console.log("data", data);
            if(!dataState.playerO) {
                firebase.database().ref(`Room/${room_id}`).update({
                    playerO: {
                        uid: user.uid,
                        name: user.displayName,
                        photoURL: user.photoURL
                    },
                })
            }
        })
        console.log("return");
        return
    }
}

function buyPhase() {
    document.getElementById("page-wait").style.display = "none"
    document.getElementById("page-buyPhase").style.display = "block"
    timer(10)
    setTimeout(playState, 11 * 1000)
}

function playState() {
    console.log("playState");
    document.getElementById("page-game").style.display = "block"
    document.getElementById("page-buyPhase").style.display = "none"

}

function timer(timeleft) {
    var downloadTimer = setInterval(function() {
        if(timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
        console.log(timeleft);
    }, 1000);
}



document.addEventListener("DOMContentLoaded", matching, false);
document
    .querySelectorAll("#cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));

// document
//   .querySelector("#restart")
//   .addEventListener("click", handleRestartGame);