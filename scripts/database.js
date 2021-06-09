/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/
const database = {
    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carets: 0.5, price: 405 },
        { id: 2, carets: 0.75, price: 782 },
        { id: 3, carets: 1, price: 1470 },
        { id: 4, carets: 1.5, price: 1997 },
        { id: 5, carets: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    customOrders: [
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            price: 3200.55,
            timestamp: 1614659931693
        }
    ],
    orderBuilder: {

    }
}


export const getStyles = () => {
    return database.styles.map(style => ({...style}))
}

export const getSizes = () => {
    return database.sizes.map(size => ({...size}))
}

export const getMetals = () => {
    return database.metals.map(metal => ({...metal}))
}

export const getOrders = () => {
    return database.customOrders.map(order => ({...order}))
}

export const getOrderBuilder = () => {
    return {...database.orderBuilder}
}

export const setMetal = (id) => {
    database.orderBuilder.metalId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const addCustomOrder = () => {
    const newOrder = {...database.orderBuilder}
    
    const lastIndex = database.customOrders.length - 1
    newOrder.id = database.customOrders[lastIndex].id + 1
    newOrder.timestamp = Date.now()

    newOrder.price = priceCalculator(newOrder)

    database.customOrders.push(newOrder)

    database.orderBuilder = {}

    document.dispatchEvent(new CustomEvent("stateChanged"))
}

const priceCalculator = (order) => {
    let totalPrice = 0

    const foundMetal = database.metals.find(metal => metal.id === order.metalId)
    totalPrice += foundMetal.price

    const foundSize = database.sizes.find(size => size.id === order.sizeId)
    totalPrice += foundSize.price

    const foundStyle = database.styles.find(style => style.id === order.styleId)
    totalPrice += foundStyle.price

    totalPrice *= priceMultiplier

    return totalPrice
}

let priceMultiplier = 1

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "jewelryType") {
            priceMultiplier = parseInt(event.target.value)
        }
    }
)

document.addEventListener(
    "stateChanged",
    (event) => {
        priceMultiplier = 1
    }
)
 