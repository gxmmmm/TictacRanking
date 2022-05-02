// num = document.querySelector(`.stock_swap`).innerHTML
// console.log(num)
var roomId
let stock1
let stock2
const plusFunction = () => {
    let stockElement1 = document.querySelector(`.stock_swap`)
    let stockElement2 = document.querySelector(`.stock_clear`)
    let priceElement = document.querySelector(`#card_swap`)
    stock1 = Number(stockElement1.innerHTML)
    stock2 = Number(stockElement2.innerHTML)

    if(stock1 + stock2 < 2) {
        stock1++
    }
    if(stock1 >= 2) {
        stock1 = 2
    }
    stockElement1.innerHTML = stock1
    priceElement.innerHTML = 300 * stock1
}

const deleteFunction = () => {
    let stockElement = document.querySelector(`.stock_swap`)
    let priceElement = document.querySelector(`#card_swap`)
    num = stockElement.innerHTML
    num--
    if(num <= 0) {
        num = 0
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

// num = document.querySelector(`.stock_clear`).innerHTML
// console.log(num)

const plusFunction2 = () => {
    let stockElement1 = document.querySelector(`.stock_swap`)
    let stockElement2 = document.querySelector(`.stock_clear`)
    let priceElement = document.querySelector(`#card_clear`)
    stock1 = Number(stockElement1.innerHTML)
    stock2 = Number(stockElement2.innerHTML)
    console.log(stock1, stock2, stock1 + stock2);
    if(stock1 + stock2 < 2) {
        stock2++
    }
    if(stock2 >= 2) {
        stock2 = 2
    }
    stockElement2.innerHTML = stock2
    priceElement.innerHTML = 300 * stock2
}

const deleteFunction2 = () => {
    let stockElement = document.querySelector(`.stock_clear`)
    let priceElement = document.querySelector(`#card_clear`)
    num = stockElement.innerHTML
    num--
    if(num <= 0) {
        num = 0
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}
const buyCard1 = (card, stock) => {
    let priceElement = document.querySelector(`#${card}`)
    const price1 = priceElement.innerHTML

    let stockElement = document.querySelector(`.${stock}`)
    const stock1 = stockElement.innerHTML
    if(stock1 != 0) {
        buyItem(price1, stock1, card)
    }
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
            console.log("updateRoom", card, stock, card == "card_swap" ? stock : (dataRoom.playerX.swapCard || 0));

            room.update({
                playerX: {
                    ...dataRoom.playerX,
                    swapCard: card == "card_swap" ? stock : (dataRoom.playerX.swapCard || 0),
                    clearCard: card == "card_clear" ? stock : (dataRoom.playerX.clearCard || 0),
                }
            })
        }

        if(dataRoom.playerO.uid == user.uid) {
            room.update({
                playerO: {
                    ...dataRoom.playerO,
                    swapCard: card == "card_swap" ? stock : (dataRoom.playerO.swapCard || 0),
                    clearCard: card == "card_clear" ? stock : (dataRoom.playerO.clearCard || 0),
                }
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