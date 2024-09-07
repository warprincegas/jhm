import { cartData } from "../Data/cartData.js";

export let totalPrice = 0;

export function calcuCartTotalPrice() {
  cartData.forEach((elem) => {
    totalPrice += elem.price;
  });
}
