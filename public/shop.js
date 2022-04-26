num = document.querySelector(`.stock`).innerHTML
console.log(num)

const plusFunction = () => {
    let stockElement = document.querySelector(`.stock`)
    let priceElement = document.querySelector(`#card_price1`)
    num = stockElement.innerHTML
    num++
    if(num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

const deleteFunction = () => {
    let stockElement = document.querySelector(`.stock`)
    let priceElement = document.querySelector(`#card_price1`)
    num = stockElement.innerHTML
    num--
    if(num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

num = document.querySelector(`.stock2`).innerHTML
console.log(num)

const plusFunction2 = () => {
    let stockElement = document.querySelector(`.stock2`)
    let priceElement = document.querySelector(`#card_price2`)
    num = stockElement.innerHTML
    num++
    if(num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}

const deleteFunction2 = () => {
    let stockElement = document.querySelector(`.stock2`)
    let priceElement = document.querySelector(`#card_price2`)
    num = stockElement.innerHTML
    num--
    if(num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
    priceElement.innerHTML = 300 * num
}
const buyCard1 = (card) => {
    let priceElement = document.querySelector(`#${card}`)
    const price1 = priceElement.innerHTML
    buyItem(price1)
}

const buyItem = (price) => {
    var user = firebase.auth().currentUser
    const userData = firebase.database().ref(`User/${user.uid}`)
    userData.once('value', (data) => {
        const dataState = data.val()

        if(dataState) {
            var userCoin = dataState.coins
            var coinLeft = userCoin - price
            if(coinLeft >= 0) {
                console.log("success");
                document.querySelector("#profile-coins").innerHTML = coinLeft
                userData.update({
                    coins: coinLeft
                })
            } else {
                console.log('mai por');
            }

        }
    })
}