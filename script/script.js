const menu = document.querySelector("#menu");
const btnHamburger = document.querySelector("#hamburger");
const btnMenuClose = document.querySelector("#btnMenuClose");
const cart = document.getElementById("cart");
const btnCart = document.getElementById("btnCart");
const btnPlus = document.getElementById("btnPlus");
const btnMinus = document.getElementById("btnMinus");
const counter = document.getElementById("counter");
const gallery = document.querySelectorAll(".pic");
const hero = document.getElementById("hero");
const btnPrev = document.getElementById("previous");
const btnNext = document.getElementById("next");
const btnAddToCart = document.getElementById("btn");
const cartCount = document.getElementById("cartCount");
const productInShoppingCart = document.getElementById("productsInCart");
const msgEmpty = document.getElementById("msg-empty");
const checkout = document.getElementById("checkout");
const overlay = document.getElementById("overlay");
const lightBox = document.getElementById("lightbox");

let productCounter = 0;
let productsInCart = 0;
let price = 250.0;
let discount = 0.5;

const onHamburgerClick = () => {
  menu.classList.remove("hidden");
};

const onBtnMenuCloseClick = () => {
  menu.classList.add("hidden");
};

const openCart = () => {
  cart.classList.toggle("hidden");
};

const productCounterPlus = () => {
  setProductCounter(1);
};

const productCounterMinus = () => {
  setProductCounter(-1);
};

const setProductCounter = (val) => {
  if (productCounter + val > 0) {
    productCounter += val;
    counter.innerHTML = productCounter;
  }
};

const onThumbClick = (event) => {
  gallery.forEach((img) => {
    img.classList.remove("active");
  });

  event.target.parentElement.classList.add("active");
  hero.src = event.target.src.replace("-thumbnail", "");
};

gallery.forEach((img) => {
  img.addEventListener("click", onThumbClick);
});

const handleBtnClickNext = () => {
  let imageIndex = getCurrentImageIndex();
  imageIndex++;
  if (imageIndex > 4) {
    imageIndex = 1;
  }

  setHeroImage(imageIndex);
};

const handleBtnClickPrev = () => {
  let imageIndex = getCurrentImageIndex();
  imageIndex--;
  if (imageIndex < 1) {
    imageIndex = 4;
  }

  setHeroImage(imageIndex);
};

const getCurrentImageIndex = () => {
  const imageIndex = parseInt(
    hero.src
      .split("\\")
      .pop()
      .split("/")
      .pop()
      .replace(".jpg", "")
      .replace("image-product-", "")
  );
  return imageIndex;
};

const setHeroImage = (index) => {
  hero.src = `./images/image-product-${index}.jpg`;

  //syncing image
  gallery.forEach((img) => {
    img.classList.remove("active");
  });

  gallery[index - 1].classList.add("active");
};

const onBtnDeleteClick = () => {
  productsInCart--;
  updateCart();

  const el = document.querySelector(".count");
  console.log(el);
  const totalAmount = document.querySelector(".total-amount");
  console.log(totalAmount);
  el.innerHTML = productsInCart;
  totalAmount.innerHTML = `$${(price * discount * productsInCart).toFixed(2)}`;

  if (productsInCart === 0) {
    productInShoppingCart.innerHTML = "";
  }
};

const addToCart = () => {
  productsInCart += productCounter;

  const productHTMLElement = `
<div class="item">
              <img
                class="products-image"
                src="./images/image-product-1-thumbnail.jpg"
                alt="product one thump"
              />
              <div class="details">
                <div class="product-name">Autumn Limited Edition...</div>
                <div class="price-group">
                  <div class="price">$${(price * discount).toFixed(2)}</div>
                  x
                  <div class="count">${productsInCart}</div>
                  <div class="total-amount">$${(
                    price *
                    discount *
                    productsInCart
                  ).toFixed(2)}</div>
                </div>
              </div>
              <img
                id="btnDelete"
                class="btnDelete"
                src="./images/icon-delete.svg"
                alt="icon delete"
              />
            </div>
`;

  productInShoppingCart.innerHTML = productHTMLElement;

  updateCart();

  const btnDelete = document.getElementById("btnDelete");
  console.log(btnDelete);
  btnDelete.addEventListener("click", onBtnDeleteClick);
  // console.log(productsInCart);
};

const updateCart = () => {
  updateCartIcon();
  updateMsgEmpty();
  updateCheckOutBtn();
};

const updateCartIcon = () => {
  cartCount.textContent = productsInCart;

  if (productsInCart === 0) {
    if (!cartCount.classList.contains("hidden")) {
      cartCount.classList.add("hidden");
    }
  } else {
    cartCount.classList.remove("hidden");
  }
};

const updateMsgEmpty = () => {
  if (productsInCart === 0) {
    if (msgEmpty.classList.contains("hidden")) {
      msgEmpty.classList.remove("hidden");
    }
  } else {
    if (!msgEmpty.classList.contains("hidden")) {
      msgEmpty.classList.add("hidden");
    }
  }
};

const updateCheckOutBtn = () => {
  if (productsInCart === 0) {
    if (!checkout.classList.contains("hidden")) {
      checkout.classList.add("hidden");
    }
  } else {
    checkout.classList.remove("hidden");
  }
};

const onBtnOverlayClose = () => {
  overlay.classList.add("hidden");
};

const onThumbClickLightBox = (event) => {
  lightBoxGallery.forEach((img) => {
    img.classList.remove("active");
  });

  event.target.parentElement.classList.add("active");
  lightBoxHero.src = event.target.src.replace("-thumbnail", "");
};

const handleBtnClickNextOverlay = () => {
  let imageIndex = getOverlayCurrentImageIndex();
  imageIndex++;
  if (imageIndex > 4) {
    imageIndex = 1;
  }

  setOverlayHeroImage(imageIndex);
};

const handleBtnClickPrevOverlay = () => {
  let imageIndex = getOverlayCurrentImageIndex();
  imageIndex--;
  if (imageIndex < 1) {
    imageIndex = 4;
  }

  setOverlayHeroImage(imageIndex);
};

const getOverlayCurrentImageIndex = () => {
  const imageIndex = parseInt(
    lightBoxHero.src
      .split("\\")
      .pop()
      .split("/")
      .pop()
      .replace(".jpg", "")
      .replace("image-product-", "")
  );
  return imageIndex;
};

const setOverlayHeroImage = (index) => {
  lightBoxHero.src = `./images/image-product-${index}.jpg`;

  //syncing image
  lightBoxGallery.forEach((img) => {
    img.classList.remove("active");
  });

  lightBoxGallery[index - 1].classList.add("active");
};

const onHeroImgClick = () => {
  if (window.innerWidth >= 1440) {
    overlay.classList.remove("hidden");
    if (overlay.childElementCount == 1) {
      const newNode = lightBox.cloneNode(true);
      overlay.appendChild(newNode);

      const btnOverlayClose = document.getElementById("btnOverlayClose");
      btnOverlayClose.addEventListener("click", onBtnOverlayClose);

      lightBoxGallery = overlay.querySelectorAll(".pic");
      lightBoxHero = overlay.querySelector("#hero");

      lightBoxGallery.forEach((img) => {
        img.addEventListener("click", onThumbClickLightBox);
      });
      const btnOverlayNext = overlay.querySelector(".next");
      const btnOverlayPrevious = overlay.querySelector(".previous");

      btnOverlayNext.addEventListener("click", handleBtnClickNextOverlay);
      btnOverlayPrevious.addEventListener("click", handleBtnClickPrevOverlay);
    }
  }
};

// event listeners
btnAddToCart.addEventListener("click", addToCart);
btnHamburger.addEventListener("click", onHamburgerClick);
btnMenuClose.addEventListener("click", onBtnMenuCloseClick);
btnCart.addEventListener("click", openCart);
btnPlus.addEventListener("click", productCounterPlus);
btnMinus.addEventListener("click", productCounterMinus);
btnNext.addEventListener("click", handleBtnClickNext);
btnPrev.addEventListener("click", handleBtnClickPrev);
hero.addEventListener("click", onHeroImgClick);
