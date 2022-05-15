const header = document.getElementById("header");
const sticky = header.offsetTop;

window.onscroll = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};


const toggleClass = (node, className) => {
  if (node.classList.contains(className)) {
    node.classList.remove(className);
    return;
  }

  node.classList.add(className);
};

const menuList = document.querySelector("#header nav")

document
  .getElementById('menu_icon')
  .addEventListener("click", () => {
    toggleClass(menuList, 'open-js')
  })

document
  .getElementById('menu_icon_close')
  .addEventListener("click", () => {
    toggleClass(menuList, 'open-js')
  })