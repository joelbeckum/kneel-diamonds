import { getOrders, getMetals, getSizes, getStyles } from "./database.js"



const buildOrderListItem = (order) => {
    const cost = order.price

    const costString = cost.toLocaleString("en-US", {
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

