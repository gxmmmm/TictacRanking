var currentUserData

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
let gameStatus = "playing"
let playerX
let playerO

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

    if(roundWon) {
        gameStatus = "win"
    }

    if(roundDraw) {
        gameStatus = "draw"
    }

    if(!updateCheck) {
        if(!roundWon && !roundDraw) {
            handlePlayerChange();
        }
        await update()
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        // gameActive = false;
        gameStatus = "win"
        return "win"
    }

    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        // gameActive = false;
        gameStatus = "draw"
        return "draw"
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

async function handleRestartGame(player) {
    if(player == "X") {
        playerX.clearCard = playerX.clearCard - 1
    } else if(player == "O") {
        playerO.clearCard = playerO.clearCard - 1
    }
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus = "playing"

    statusDisplay.innerHTML = currentPlayerTurn();
    // document.querySelectorAll("#cell").forEach((cell) => (cell.innerHTML = ""));
    for(let i = 0; i < gameState.length; i++) {
        handleCellChange(gameState[i], i)
    }

    document.getElementById("page-game").style.display = "block"
    document.getElementById("page-wait").style.display = "none"
    document.getElementById("page-win").style.display = "none"
    document.getElementById("page-lose").style.display = "none"

    await update()
}

async function matching() {
    var user
    firebase.auth().onAuthStateChanged((user_) => {
        user = user_
        currentUserData = user_
    })

    var url_string = window.location.href;

    var url = new URL(url_string);
    var roomId = url.searchParams.get("roomId");
    const room = firebase.database().ref(`Room/${roomId}`)

    await room.once('value', (data) => {
        const dataState = data.val()
        if((dataState.playerX.uid != currentUserData.uid) && !dataState.playerO) {
            join(roomId)
        } else if(dataState.playerX && dataState.playerO) {

        }
    })

    let playerCheck = 0
    room.on('value', function(snapshot) {
        const data = snapshot.val()
        if(data) {
            console.log(data.playerX.uid);
            refUser.child(data.playerX.uid).once("value", (d) => {
                d = d.val()
                    // console.log("player", data.playerX);
                document.getElementById("img-player-st").innerHTML = `<img src='${d.userProfile}' width='40px' height='40px' style="border-radius: 50%">`
                document.getElementById("name-player-st").innerHTML = d.name
            })
            document.getElementById("scoreX").innerHTML = data.playerX.win
            playerX = data.playerX
            if(user.uid == data.playerX.uid) {
                userPlayer = "X"
            }
            if(data.playerO) {
                playerCheck++
                document.getElementById("img-player-nd").innerHTML = `<img src='${data.playerO.photoURL}' width='40px' height='40px' style="border-radius: 50%">`
                document.getElementById("name-player-nd").innerHTML = data.playerO.name
                document.getElementById("scoreO").innerHTML = data.playerO.win
                playerO = data.playerO
                if(user.uid == data.playerO.uid) {
                    userPlayer = "O"
                }
                // console.log(data.gameStatus);
                if((playerCheck == 1) && (data.gameStatus == "buyPhase")) {
                    console.log(playerCheck);
                    if(userPlayer == "X") {
                        buyPhase(data.playerX)
                    }
                    if(userPlayer == "O") {
                        buyPhase(data.playerO)
                    }
                } else {
                    if(data.gameStatus == "playing") {
                        if(userPlayer == "X") {
                            inPhase(data.playerX)
                        }
                        if(userPlayer == "O") {
                            inPhase(data.playerO)
                        }
                    } else {
                        if(data.gameStatus != "buyPhase") {
                            clearAll()
                            if((data.gameStatus == "win") || (data.gameStatus == "gameOver")) {
                                gameOver("win", data)
                            } else if((data.gameStatus == "draw") || (data.gameStatus == "gameOver")) {
                                gameOver("draw", data)
                            }
                        }
                    }
                }

            } else {
                document.getElementById("name-player-nd").innerHTML = "waiting for player "
            }
            if(data.gameState) {
                gameState = data.gameState
                gameStatus = data.gameStatus
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
                        photoURL: user.photoURL,
                        swapCard: 0,
                        clearCard: 0,
                        win: 0
                    },
                    gameStatus: "buyPhase"
                })
            }
        })
        console.log("return");
        return
    }
}

function gameOver(status, dataRoom) {
    console.log("gameOver", status, currentPlayer, dataRoom.playerX.uid == currentUserData.uid);
    clearAll()
    document.getElementById("countdown").innerHTML = ""
    document.getElementById("page-game").style.display = "none"
    document.getElementById("page-wait").style.display = "none"
    document.getElementById("page-card").style.display = "none"

    const room = firebase.database().ref(`Room/${roomId}`)

    if((status == "win")) {
        document.getElementById("player-data").style.display = "none"
            // document.getElementById("card1").style.height = "0";
            // document.getElementById("card2").style.height = "0";

        console.log(currentPlayer, " WIN");
        document.getElementById("box-main").className = "box-win";
        document.getElementById("back-btn").src = "picture/back.png";

        playerX = dataRoom.playerX
        playerO = dataRoom.playerO

        playerX.win = currentPlayer == "X" ? dataRoom.playerX.win + 1 : dataRoom.playerX.win
        playerO.win = currentPlayer == "O" ? dataRoom.playerO.win + 1 : dataRoom.playerO.win

        if(currentPlayer == "X") {
            const userData = firebase.database().ref(`User/${dataRoom.playerX.uid}`)

            userData.once('value', (data) => {
                const dataState = data.val()

                if(dataRoom.playerX.uid == currentUserData.uid) {
                    document.getElementById("page-win").style.display = "block"

                    if(dataRoom.gameStatus != "gameOver") {
                        userData.update({
                            exp: dataState.exp + 150,
                            coins: dataState.coins + 50,
                        })
                        document.querySelector("#profile-coins").innerHTML = dataState.coins + 50
                    }

                } else {
                    document.getElementById("page-lose").style.display = "block"

                    if(dataRoom.gameStatus != "gameOver") {
                        const userDataLose = firebase.database().ref(`User/${dataRoom.playerO.uid}`)
                        userDataLose.once('value', (dataLose) => {
                            const dataStateLose = dataLose.val()
                            userDataLose.update({
                                coins: dataStateLose.coins + 20,
                            })

                            document.querySelector("#profile-coins").innerHTML = dataStateLose.coins + 20
                        })

                    }
                }
            })
        }

        if(currentPlayer == "O") {
            const userData = firebase.database().ref(`User/${dataRoom.playerO.uid}`)

            userData.once('value', (data) => {
                const dataState = data.val()

                if(dataRoom.playerO.uid == currentUserData.uid) {
                    document.getElementById("page-win").style.display = "block"

                    if(dataRoom.gameStatus != "gameOver") {
                        userData.update({
                            exp: dataState.exp + 150,
                            coins: dataState.coins + 50,
                        })


                        document.querySelector("#profile-coins").innerHTML = dataState.coins + 50
                    }

                } else {
                    document.getElementById("page-lose").style.display = "block"

                    if(dataRoom.gameStatus != "gameOver") {
                        const userDataLose = firebase.database().ref(`User/${dataRoom.playerX.uid}`)
                        userDataLose.once('value', (dataLose) => {
                            const dataStateLose = dataLose.val()
                            userDataLose.update({
                                coins: dataStateLose.coins + 20,
                            })

                            document.querySelector("#profile-coins").innerHTML = dataStateLose.coins + 20
                        })
                    }
                }
            })
        }

        room.update({
            gameStatus: "gameOver"
        })

    } else {
        console.log("DRAW");
        document.getElementById("page-draw").style.display = "block"
        document.getElementById("player-data").style.display = "none"
            // document.getElementById("page-card").style.display = "none"
            // document.getElementById("card1").style.height = "0";
            // document.getElementById("card2").style.height = "0";
        document.getElementById("box-main").className = "box-win";
        document.getElementById("back-btn").src = "picture/back.png";
    }
}

function clearAll() {
    console.log("clearAll")
    for(i = 0; i < 1000; i++) {
        window.clearInterval(i);
        window.clearTimeout(i);
    }
}

function inPhase(data) {
    console.log("inPhase")
    clearAll()
    timer(10);
    setTimeout(changePlayer, 10 * 1000)
    playState(data)

}

async function changePlayer(player) {
    if(player == "X") {
        playerX.swapCard = playerX.swapCard - 1
    } else if(player == "O") {
        playerO.swapCard = playerO.swapCard - 1
    }
    clearAll()
    handlePlayerChange()
    await update()
}

async function swapPlayer(player) {
    if(player == "X") {
        playerX.swapCard = playerX.swapCard - 1
    } else if(player == "O") {
        playerO.swapCard = playerO.swapCard - 1
    }

    [playerX, playerO] = [playerO, playerX];
    clearAll()
    await update()
}

function buyPhase(data) {
    document.getElementById("page-wait").style.display = "none"
    document.getElementById("page-buyPhase").style.display = "block"
    timer(10)
        // setTimeout(playState, 11 * 1000)
    setTimeout(function() {
        playState(data);
    }, 11 * 1000)
    setTimeout(function() {
        update()
    }, 11 * 1000)
}

function playState(data) {
    console.log("playState");
    document.getElementById("box-main").className = "box";
    document.getElementById("page-wait").style.display = "none"
    document.getElementById("page-buyPhase").style.display = "none"
    document.getElementById("page-win").style.display = "none"
    document.getElementById("page-lose").style.display = "none"
    document.getElementById("page-draw").style.display = "none"
    document.getElementById("player-data").style.display = "flex"
    document.getElementById("page-game").style.display = "block"
    document.getElementById("page-card").style.display = "block"

    // document.getElementById("card1").style.height = null;
    // document.getElementById("card2").style.height = null;
    document.getElementById("back-btn").src = "/picture/Frame.png";
    renderCard(data)
}

function timer(timeleft) {
    var downloadTimer = setInterval(function() {
        if(timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = ""
        } else {
            document.getElementById("countdown").innerHTML = timeleft + "";
        }
        timeleft -= 1;
    }, 1000);
    return downloadTimer
}

function renderCard(dataPlayer) {
    console.log("render page-card", dataPlayer);
    const box = document.getElementById("page-card-body")
    box.innerHTML = ""
    const card = []
    let number = 1

    for(let i = 1; i < Number(dataPlayer.swapCard) + 1; i++) {
        let swapCard = document.createElement('div')
        swapCard.setAttribute("class", "product-card" + number + " swapCard player" + userPlayer)
        swapCard.setAttribute("onclick", `swapPlayer('${userPlayer}')`)
        card.push(swapCard)
        number++
    }

    for(let i = 1; i < Number(dataPlayer.clearCard) + 1; i++) {
        let clearCard = document.createElement('div')
        clearCard.setAttribute("class", "product-card" + number + " clearCard player" + userPlayer)
        clearCard.setAttribute("onclick", `handleRestartGame('${userPlayer}')`)
        card.push(clearCard)
        number++
    }
    card.forEach(elment => {
        box.appendChild(elment)
    })
}

async function update() {
    console.log("Update", playerO);
    if(playerX && playerO) {
        firebase.database().ref(`Room/${roomId}`).update({
            currentPlayer: currentPlayer,
            gameState: gameState,
            gameStatus: gameStatus,
            gameActive: gameActive,
            playerX: {...playerX },
            playerO: {...playerO },
        })
    } else {
        firebase.database().ref(`Room/${roomId}`).update({
            currentPlayer: currentPlayer,
            gameState: gameState,
            gameStatus: gameStatus,
            gameActive: gameActive
        })
    }
    // firebase.database().ref(`Room/${roomId}`).update({
    //     currentPlayer: currentPlayer,
    //     gameState: gameState,
    //     gameStatus: gameStatus,
    //     gameActive: gameActive
    // })

    console.log(gameState);
    console.log(currentPlayer);
}

document.addEventListener("DOMContentLoaded", matching, false);
document
    .querySelectorAll("#cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));

// document
//   .querySelector("#restart")
//   .addEventListener("click", handleRestartGame);