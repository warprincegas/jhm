export let cartData = JSON.parse(localStorage.getItem("cart-Data")) || [];

export function saveCartToStorage() {
  localStorage.setItem("cart-Data", JSON.stringify(cartData));
}

export function removeFromCart(cartID) {
  let newCart = cartData.filter((cart) => cart.cartId !== cartID);
  cartData = newCart;
  saveCartToStorage();
}

// let newCart = [];
// cartData.forEach((cart) => {
//   if (cartID !== cart.cartId) {
//     newCart.push(cart);
//   }
// });
