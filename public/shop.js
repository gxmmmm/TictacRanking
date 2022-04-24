num = document.querySelector(`.stock`).innerHTML
console.log(num)

const plusFunction = () => {
    let stockElement = document.querySelector(`.stock`)
    num = stockElement.innerHTML
    num++
    if (num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
}

const deleteFunction = () => {
    let stockElement = document.querySelector(`.stock`)
    num = stockElement.innerHTML
    num--
    if (num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
}

num = document.querySelector(`.stock2`).innerHTML
console.log(num)

const plusFunction2 = () => {
    let stockElement = document.querySelector(`.stock2`)
    num = stockElement.innerHTML
    num++
    if (num >= 2) {
        num = 2
    }
    stockElement.innerHTML = num
}

const deleteFunction2 = () => {
    let stockElement = document.querySelector(`.stock2`)
    num = stockElement.innerHTML
    num--
    if (num <= 1) {
        num = 1
    }
    stockElement.innerHTML = num
}

