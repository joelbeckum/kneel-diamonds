import { getOrders, getMetals, getSizes, getStyles } from "./database.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()
    const sizes = getSizes()
    const styles = getStyles()

    let totalCost = 0

    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    totalCost += foundMetal.price

    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    totalCost += foundSize.price

    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    totalCost += foundStyle.price

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })



    return `<li>
        Order #${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString()} for a total cost of ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

