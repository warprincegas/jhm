import {
  cartData,
  removeFromCart,
  saveCartToStorage,
} from "../Data/cartData.js";
import { donationData } from "../Data/dontationData.js";
import { popMenu } from "../Utils/pop-menu.js";

popMenu();
updatePage();

function updatePage() {
  let totalPrice = 0;

  calcuCartTotalPrice();
  function calcuCartTotalPrice() {
    cartData.forEach((elem) => {
      totalPrice += elem.price;
    });
  }

  document.querySelector(".cart-products").innerHTML = cartData
    .map((cart) => {
      let productMatch;
      donationData.forEach((elem) => {
        if (elem.id === cart.productId) {
          productMatch = elem;
        }
      });

      return ` <div class="cart-product cont-${productMatch.id}-${cart.priceId}">
      <div class="left-section">
        <img
          src="${productMatch.image}"
          alt=""
          class="cart-product-image"
        />
        <div class="name-remove">
          <div class="cart-product-name">
            ${productMatch.title}
          </div>
          <div class="remove" data-productid=${productMatch.id}  data-priceid=${cart.priceId} data-both=${cart.cartId}>Remove</div>
        </div>
      </div>
      <div class="right-section">
        <div class="change-amount-cont">
          <div class="change-amount" data-both=${cart.cartId}>Change the donation amount</div>
          <div class="update-amount-cont update-amount-cont-${cart.cartId}"> 
            <form data-both=${cart.cartId}>
              <input class="input-${cart.cartId}"/>
              <button>Update</button>
            </form>
          </div>
        </div>
        <div class="cart-product-price">$${cart.price}</div>
      </div>
    </div>
  `;
    })
    .join("");

  if (cartData.length === 1) {
    document.querySelector(".cart-top h1").innerHTML = `1 Item in your cart`;
  } else if (cartData.length > 1) {
    document.querySelector(
      ".cart-top h1"
    ).innerHTML = `${cartData.length} Items in your cart`;
  } else if (cartData.length === 0) {
    document.querySelector(".cart-top h1").innerHTML = `You have no cart`;
    document
      .querySelectorAll(
        ".cart-products, .cart-total-price, .cart-checkout-link, .cart-cont-top"
      )
      .forEach((elem) => {
        elem.style.display = "none";
      });
  }

  document.querySelectorAll(".remove").forEach((elem) => {
    elem.addEventListener("click", () => {
      const priceID = elem.dataset.priceid;
      const productID = elem.dataset.productid;
      const cartID = elem.dataset.both;
      const productElem = document.querySelector(
        `.cont-${productID}-${priceID}`
      );

      removeFromCart(cartID);
      productElem.remove();
      calcuCartTotalPrice();
      updatePage();
    });
  });

  document.querySelector(
    ".cart-total-price"
  ).innerHTML = `  <div class="subtotal">
          <h5>Subtotal:</h5>
          <h5>$${totalPrice.toFixed(2)}</h5>
        </div>
        <div class="total">
          <h5>Total:</h5>
          <h4>$${totalPrice.toFixed(2)}</h4>
        </div>`;

  document.querySelectorAll(".change-amount").forEach((elem) =>
    elem.addEventListener("click", () => {
      const cartID = elem.dataset.both;

      document
        .querySelector(`.update-amount-cont-${cartID}`)
        .classList.toggle("show-update-amount-cont");

      document.querySelector(`.input-${cartID}`).focus();
    })
  );

  document.querySelectorAll("form").forEach((elem) => {
    elem.addEventListener("submit", (e) => {
      e.preventDefault();
      const cartID = elem.dataset.both;
      const inputElem = document.querySelector(`.input-${cartID}`);

      let matchdata;
      cartData.forEach((elem) => {
        if (elem.cartId === cartID) {
          matchdata = elem;
        }
      });

      if (inputElem.value) matchdata.price = Number(inputElem.value);
      else {
        inputElem.focus();
        inputElem.style.borderColor = "red";
        return;
      }
      saveCartToStorage();
      updatePage();
    });
  });
}
