
import { DiamondSizes } from "./DiamondSizes.js"
import { Metals } from "./Metals.js"
import { JewelryStyles } from "./JewelryStyles.js"
import { Orders } from "./Orders.js"
import { addCustomOrder } from "./database.js"

document.addEventListener(
    "click",
    (event) => {
        const buttonClicked = event.target
        if (buttonClicked.id === "orderButton") {
            addCustomOrder()
        }
    }
)

export const KneelDiamonds = () => {
    return `
        <h1>Kneel Diamonds</h1>

        <article class="choices">
            <section class="choices__metals options">
                <h2>Metals</h2>
                ${Metals()}
            </section>
            <section class="choices__sizes options">
                <h2>Sizes</h2>
                ${DiamondSizes()}
            </section>
            <section class="choices__styles options">
                <h2>Styles</h2>
                ${JewelryStyles()}
            </section>
        </article>

        <article>
            <input id="ringType" type="radio" name="jewelryType" value="1" checked />Ring
            <input id="earringType" type="radio" name="jewelryType" value="2" />Earring
            <input id="necklaceType" type="radio" name="jewelryType" value="4" />Necklace
        </article>

        <article class="types">
            <button id="orderButton">Create Custom Order</button>
        </article>

        <article class="customOrders">
            <h2>Custom Jewelry Orders</h2>
            ${Orders()}
        </article>
    `
}

