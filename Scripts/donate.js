import { popMenu } from "../Utils/pop-menu.js";
import { donationData } from "../Data/dontationData.js";
import { cartData, saveCartToStorage } from "../Data/cartData.js";

popMenu();
updatePage();

function updatePage() {
  let totalPrice = 0;

  function calcuCartTotalPrice() {
    cartData.forEach((elem) => {
      totalPrice += elem.price;
    });
  }

  const price = [
    {
      price: 50,
      priceID: "sjssxss",
    },
    { price: 100, priceID: "jsxse" },
    { price: 250, priceID: "jsxscc" },
    { price: 500, priceID: "jisjhxs" },
  ];

  let selectedPrice = JSON.parse(localStorage.getItem("selectedp-rice")) || [
    { price: 50, productId: "istfuvhbsjksyiugxxsxsxsxs", priceID: "jisjhxs" },
  ];

  function saveSelectedPrice() {
    localStorage.setItem("selectedp-rice", JSON.stringify(selectedPrice));
  }

  // console.log(selectedPrice);

  document.querySelector(".products").innerHTML = donationData
    .map(({ id, image, text, title }) => {
      return ` 
      <div class="product" data-id=${id}>
        <img src="${image}" alt="" />
        <div class="product-details">
          <h1 class="product-title">${title}</h1>
          <div class="product-text">
            ${text}
          </div>
          <div class="price-button"> 
            <div class="product-price-type">
              ${price
                .map(({ priceID, price }) => {
                  return `<span data-priceid=${priceID} data-id=${id} class="price-${priceID}-${id}">$${price}</span>`;
                })
                .join("")}
            </div>
            <button class="add-button add-button-${id}">Add</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.querySelectorAll(".product-price-type span").forEach((elem) => {
    elem.addEventListener("click", () => {
      const priceID = elem.dataset.priceid;
      const productId = elem.dataset.id;
      selectPrice(priceID, productId);
      updatePage();
    });
  });
  updatePriceColor();

  function updatePriceColor() {
    // console.log(selectedPrice);

    document
      .querySelector(
        `.price-${selectedPrice[0].priceID}-${selectedPrice[0].productId}`
      )
      .classList.add("active-price");

    if (selectedPrice[0].productId)
      document.querySelector(
        `.add-button-${selectedPrice[0].productId}`
      ).style.opacity = 1;
  }

  function selectPrice(priceID, productId) {
    const priceElem = document.querySelector(
      `.price-${priceID}-${selectedPrice[0].productId}`
    );
    const btnEle = document.querySelector(`.add-button-${productId}`);
    const price = Number(priceElem.innerHTML.slice(1));

    selectedPrice = [];

    selectedPrice.push({
      price,
      productId,
      priceID,
    });
    saveSelectedPrice();
    console.log(selectPrice);
  }

  //   const bg = JSON.parse(localStorage.getItem('bg'))
  // function saveBgToStorage() {
  //   localStorage.setItem('bg', JSON.stringify(bg))
  // }
  document
    .querySelector(`.add-button-${selectedPrice[0].productId}`)
    .addEventListener("click", () => {
      // const bgBoolean = !bg;
      cartData.push({
        price: selectedPrice[0].price,
        priceId: selectedPrice[0].priceID,
        productId: selectedPrice[0].productId,
        cartId: selectedPrice[0].priceID + selectedPrice[0].productId,
        // class: bgBoolean,
      });
      saveCartToStorage();
      calcuCartTotalPrice();

      let productMatch;
      donationData.forEach((elem) => {
        if (elem.id === selectedPrice[0].productId) {
          productMatch = elem;
        }
      });

      const popMenu = document.querySelector(".popNoteCont");

      popMenu.innerHTML = ` <div class="pop-note">
      <div class="top">
        <div class="left">
          <img src="Images/green-check-mark.gif" alt="" class="sucess" />
          <div class="product-details">
            <div class="note-title"><em>Added to Cart...</em></div>
            <h2>${productMatch.title}</h2>
          </div>
        </div>
        <img src="${productMatch.image}" alt="" />
      </div>
      <div class="cart-details">
        <div class="cart-price">
          <h3>
            Cart subtotal <em><span>(${cartData.length} items):</span></em>
          </h3>
          <h2>$${totalPrice}</h2>
        </div>
        <a href="cart.html" class="cart-link">Cart</a>
      </div>
      <div class="pop-bottom">
        <a href="checkout.html" class="checkout-link">PROCEED TO CHECKOUT</a>
        <a href="donate.html"  class="shop-link">Continue Shopping</a>
      </div>
      </div>`;
      console.log(totalPrice);

      document.querySelector(".pop-note-cont").style.display = "flex";
      document.querySelector(".pop-note").style.display = "flex";
      updatePage();
    });

  document.querySelector(".hide").addEventListener("click", () => {
    document.querySelector(".pop-note-cont").style.display = "none";
    document.querySelector(".pop-note").style.display = "none";
  });

  // cartData.length = 0;

  // saveCartToStorage();
  // console.log(cartData);
}
