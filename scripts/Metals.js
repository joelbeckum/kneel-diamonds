import { getMetals, setMetal, getOrderBuilder } from "./database.js"

const metals = getMetals()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value))
        }
    }
)

const checkPendingMetal = (metal) => {
    const pendingOrder = getOrderBuilder()
    if (metal.id === pendingOrder.metalId) {
        return "checked"
    }

    return ""
}

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        html += `<li>
            <input type="radio" name="metal" value="${metal.id}" ${checkPendingMetal(metal)} /> ${metal.metal}
        </li>`
    }

    html += "</ul>"
    return html
}

