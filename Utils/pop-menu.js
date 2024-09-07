export function popMenu() {
  document.querySelector(".menu").addEventListener("click", () => {
    document.querySelector(".pop-menu").classList.toggle("show");
  });

  document.addEventListener("scroll", () => {
    document.querySelector(".pop-menu").classList.remove("show");
  });
}
