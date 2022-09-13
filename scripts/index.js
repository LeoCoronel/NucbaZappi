import { foods } from "./foods.js";

function dailyRec(quantity, list) {
  let rndProd = [];
  for (let i = 0; i <= quantity - 1; i++) {
    let r = Math.floor(Math.random() * list.length);
    if(!rndProd.find((p) => p.type == list[r].type) || rndProd.length == 0){
      rndProd.push(list[r]);

      let { id, image, nombre, precio , type} = list[r];
      let prodList = document.querySelector(".products-container");
      prodList.innerHTML += `
          <div class="product">
          <img src="${image}" alt="Product Image">
          <h3>${nombre}</h3>
          <p>${precio}</p>
          <button data-id=${id} class="addButton">Add</button>
          </div>`;
    }else if(rndProd.length == quantity){
      return
    } else quantity++;

  }
}
function openCart() {
  const cartButton = document.querySelector(".cartButton");
  const cartContainerO = document.querySelector(".cart");
  cartButton.addEventListener("click", () => {

    if (cartContainerO.classList.contains("hidden")) {
      cartContainerO.removeAttribute("style");
      return cartContainerO.classList.remove("hidden");
    } else {
      cartContainerO.setAttribute(
        "style",
        "animation-name: slide-right-out-cart;"
      );
      setTimeout(() => {
        cartContainerO.classList.add("hidden");
      }, 500);
    }
  });
}

function cart() {
  function getLocal() {
    return JSON.parse(localStorage.getItem("zappiCart"));
  }
  function setLocal(value) {
    return localStorage.setItem("zappiCart", JSON.stringify(value));
  }

  let cart = getLocal();
  let totalQ = 0;
  function updateCartTotal(){
    if (cart.length != 0) {
      let totalQty = 0;
      let totalPrice = 0;
      for(let k = 0 ; k < getLocal().length ; k++){
        totalQty += getLocal()[k].quantity;
        totalPrice += getLocal()[k].quantity * foods.find((e) => e.id == getLocal()[k].id).precio;
      }
      const total = document.querySelector(".totalPrice");
      total.innerHTML = "$" + totalPrice;
      if(document.querySelector(".cartButtonCounter")){
        document.querySelector(".cartButtonCounter").classList.remove("hidden")
        document.querySelector(".cartButtonCounter").textContent = totalQty;
      }else {
        document.querySelector(
          ".cartBtnContainer"
        ).innerHTML += `<p class="cartButtonCounter">${totalQty}</p>`;
      }

    return totalQty
    }

  }
  updateCartTotal();
  function createProduct(idProduct) {
    if (cart.length != 0) {
      if (idProduct) {
        cart.map((e) => {
          if (e.id == idProduct) {
            var { id, quantity } = e;

            const product = foods.find((ev) => {
              return ev.id == id;
            });
            var { id, image, nombre, precio } = product;
            const cart = document.querySelector(".product-cart-list");
            cart.innerHTML += `
          <div class="cartProduct">
          <div class="cartProdInfo">
              <img src="${image}" class="cartProdImg"></img>
              <div class="cartProdText">
                  <h3>${nombre}</h3>
                  <p>$${precio}</p>
              </div>
          </div>
          <div class="cartProductQty">
              <div class="qtyButtons">
                  <button class="minusQty" data-id=${id}>-</button>
                  <p data-id=${id}>${quantity}</p>
                  <button class="plusQty" data-id=${id}>+</button>
              </div>
              <div class="qtyTotal">
                  <span data-id=${id}>$${precio * quantity}</span>
              </div>
          </div>
      </div>
          `;
          }
        });
      } else {
        cart.map((e) => {
          var { id, quantity } = e;
          totalQ += e.quantity;
          const product = foods.find((ev) => {
            return ev.id == id;
          });
          var { id, image, nombre, precio } = product;
          const cart = document.querySelector(".product-cart-list");
          cart.innerHTML += `
        <div class="cartProduct">
        <div class="cartProdInfo">
        <img src="${image}" class="cartProdImg"></img>
        <div class="cartProdText">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
        </div>
        </div>
        <div class="cartProductQty">
        <div class="qtyButtons">
            <button class="minusQty" data-id=${id}>-</button>
            <p data-id=${id}>${quantity}</p>
            <button class="plusQty" data-id=${id}>+</button>
        </div>
        <div class="qtyTotal">
            <span data-id=${id}>$${precio * quantity}</span>
        </div>
        </div>
        </div>
    `;
        });

      }


    } else return;
  }
  createProduct();

  const cartContainer = document.querySelector(".product-cart-list");
  cartContainer.addEventListener("click", (e) => {
    const trg = e.target;
    if (trg.classList.contains("plusQty")) {
      const cart = getLocal();
      cart.map((e, i) => {
        if (e.id == trg.getAttribute("data-id")) {
          e.quantity++;
          setLocal(cart);

          let qtyDisplay = document.querySelector(
            `p[data-id=${JSON.stringify(getLocal()[i].id)}]`
          );
          let productTotal = document.querySelector(
            `span[data-id=${JSON.stringify(getLocal()[i].id)}]`
          );
          qtyDisplay.textContent = e.quantity;
          updateCartTotal();
          for (let j = 0; j < foods.length; j++) {
            if (foods[j].id == e.id) {
              productTotal.textContent =
                "$" + foods[j].precio * getLocal()[i].quantity;
              return;
            }
          }

          return;
        } else;
      });

      for (
        let i = 0;
        i < document.querySelectorAll("cartProduct").length;
        i++
      ) {
        if (document.querySelectorAll("cartProduct")[i]) {
        }
      }
    } else if (trg.classList.contains("minusQty")) {
      const cart = getLocal();
      cart.map((e, i) => {
        if (e.id == trg.getAttribute("data-id")) {
          e.quantity--;
          setLocal(cart);

          let qtyDisplay = document.querySelector(
            `p[data-id=${JSON.stringify(getLocal()[i].id)}]`
          );
          let productTotal = document.querySelector(
            `span[data-id=${JSON.stringify(getLocal()[i].id)}]`
          );
          qtyDisplay.textContent = e.quantity;
          updateCartTotal();
          for (let j = 0; j < foods.length; j++) {
            if (foods[j].id == e.id) {
              productTotal.textContent =
                "$" + foods[j].precio * getLocal()[i].quantity;
              return;
            }
          }

          return;
        } else;
      });

      for (
        let i = 0;
        i < document.querySelectorAll("cartProduct").length;
        i++
      ) {
        if (document.querySelectorAll("cartProduct")[i]) {
        }
      }
    }
  });

  const prodList = document.querySelector(".products-container");
  prodList.addEventListener("click", (e) => {
    const trg = e.target;
    if (trg.classList.contains("addButton")) {
      let id = trg.getAttribute("data-id");
      if (cart.length == 0) {
        cart = [{ id: id, quantity: 1 }];
        totalQ++;
        setLocal(cart);
        createProduct(id);
        updateCartTotal();
      } else {
        let status = false;
        cart.map((e, i) => {
          if (e.id == id) {

            cart[i].quantity++;
            setLocal(cart);
            totalQ++;
            let qtyDisplay = document.querySelector(
              `p[data-id=${JSON.stringify(getLocal()[i].id)}]`
            );
            let productTotal = document.querySelector(
              `span[data-id=${JSON.stringify(getLocal()[i].id)}]`
            );
            if(qtyDisplay)
            qtyDisplay.textContent = e.quantity;
              updateCartTotal();
              status = true
            for (let j = 0; j < foods.length; j++) {
              if (foods[j].id == e.id && productTotal) {
                productTotal.textContent =
                  "$" + foods[j].precio * getLocal()[i].quantity;
                return;
              }
            }

          } else if (status == false && cart.length - 1 == i) {

            cart.push({ id: id, quantity: 1 });
            setLocal(cart);
            createProduct(id);
            totalQ++;
            let qtyDisplay = document.querySelector(
              `p[data-id=${JSON.stringify(getLocal()[i].id)}]`
            );
            let productTotal = document.querySelector(
              `span[data-id=${JSON.stringify(getLocal()[i].id)}]`
            );
            if(qtyDisplay)
            qtyDisplay.textContent = e.quantity;
            updateCartTotal();
            for (let j = 0; j < foods.length; j++) {
              if (foods[j].id == e.id && productTotal) {
                productTotal.textContent =
                  "$" + foods[j].precio * getLocal()[i].quantity;
                return;
              }
            }

            return;
          }

          if(status == true)return;
        });
      }
    }
  });

  const bottomCart = document.querySelector(".bottomCart");
  bottomCart.addEventListener ("click", (e) => {
    let trg = e.target;
    if(trg.classList.contains("buyCartBtn")){
      alert("Inserte Modal acá :P")
    }
    if(trg.classList.contains("cleanCartBtn")){
      const prods = document.querySelector(".product-cart-list");
      setLocal([])
      cart = [];
      prods.innerHTML = "";
      if(document.querySelector(".cartButtonCounter"))
        document.querySelector(".cartButtonCounter").classList.add("hidden");
      
    }
  })
}
//foods es el array de comidas.
window.addEventListener("load", () => {
  dailyRec(3, foods);
  cart();
  openCart();
});
