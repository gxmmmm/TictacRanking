// num = document.querySelector(`.stock_swap`).innerHTML
// console.log(num)
var roomId
const plusFunction = () => {
    let stockElement = document.querySelector(`.stock_swap`)
    let priceElement = document.querySelector(`#card_swap`)
    num = stockElement.innerHTML
    num++
    if(num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

const deleteFunction = () => {
    let stockElement = document.querySelector(`.stock_swap`)
    let priceElement = document.querySelector(`#card_swap`)
    num = stockElement.innerHTML
    num--
    if(num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

// num = document.querySelector(`.stock_clear`).innerHTML
// console.log(num)

const plusFunction2 = () => {
    let stockElement = document.querySelector(`.stock_clear`)
    let priceElement = document.querySelector(`#card_clear`)
    num = stockElement.innerHTML
    num++
    if(num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

const deleteFunction2 = () => {
    let stockElement = document.querySelector(`.stock_clear`)
    let priceElement = document.querySelector(`#card_clear`)
    num = stockElement.innerHTML
    num--
    if(num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}
const buyCard1 = (card, stock) => {
    let priceElement = document.querySelector(`#${card}`)
    const price1 = priceElement.innerHTML

    let stockElement = document.querySelector(`.${stock}`)
    const stock1 = stockElement.innerHTML
    buyItem(price1, stock1, card)
}

const buyItem = (price, stock, card) => {
    var user = firebase.auth().currentUser
    const userData = firebase.database().ref(`User/${user.uid}`)
    userData.once('value', (data) => {
        const dataState = data.val()

        if(dataState) {
            var userCoin = dataState.coins
            var coinLeft = userCoin - price
            if(coinLeft >= 0) {
                document.querySelector("#profile-coins").innerHTML = coinLeft
                userData.update({
                    coins: coinLeft
                })
                updateRoom(user, card, stock)
            } else {
                console.log('mai por');
            }

        }
    })
}

function updateRoom(user, card, stock) {
    const room = firebase.database().ref(`Room/${roomId}`)
    room.once('value', (data) => {
        const dataRoom = data.val()

        if(dataRoom.playerX.uid == user.uid) {
            room.update({
                swapCard: card == "card_swap" ? stock : (dataRoom.playerX.swapCard || 0),
                clearCard: card == "card_clear" ? stock : (dataRoom.playerX.clearCard || 0),
            })
        }

        if(dataRoom.playerO.uid == user.uid) {
            room.update({
                swapCard: card == "card_swap" ? stock : (dataRoom.playerX.swapCard || 0),
                clearCard: card == "card_clear" ? stock : (dataRoom.playerX.clearCard || 0),
            })
        }
    })
}

function init() {

    var url_string = window.location.href;

    var url = new URL(url_string);
    roomId = url.searchParams.get("roomId");
}

document.addEventListener("DOMContentLoaded", init, false);