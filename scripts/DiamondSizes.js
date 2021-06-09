import { getSizes, setSize, getOrderBuilder } from "./database.js"

const sizes = getSizes()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
        }
    }
)

const checkPendingSize = (size) => {
    const pendingOrder = getOrderBuilder()
    if (size.id === pendingOrder.sizeId) {
        return "checked"
    }

    return ""
}

export const DiamondSizes = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItems = sizes.map(size => {
        return `<li>
            <input type="radio" name="size" value="${size.id}" ${checkPendingSize(size)} /> ${size.carets}
        </li>`
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

