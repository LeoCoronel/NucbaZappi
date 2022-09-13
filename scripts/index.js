const listaProductos = document.querySelector(".lista-productos");
const filtros = document.querySelector(".filter-buttons");
const filtrosList = document.querySelectorAll(".filter-type");
const seeMore = document.querySelector("#see-more");
const buyBtn = document.querySelector(".buy");
const { log } = console;

const renderCard = (food) => {
    // Desestructuro cada comida que recibe
    const { id, nombre, image, precio } = food;

    return `
        <div class="producto">
            <img src="${image ? image : "https://voax.co/img/noitem.png"}" alt="">
            <p class="producto-title">${nombre}</p>
            <p class="producto-desc">Taco al pastor xd</p>
            <div class="buy-group">
                <p class="price">$${precio}</p>
                <button class="buy"
                data-id="${id}"
                data-name="${nombre}"
                data-price="${precio}"
                data-img="${image}">Agregar</button>
            </div>
        </div>
    `
}

const renderCards = (category, index) => {
    if(category === "all") {
        listaProductos.innerHTML += allFoods.foodList[index]
            .map(renderCard)
            .join("");
    }
    const filterFood = foods.filter((p) => p.type === category);
    listaProductos.innerHTML += filterFood.map(renderCard).join("");
}

const filterState = e => {
    const selectedCategory = e.target.dataset.category;
    const filters = [...filtrosList];
    filters.forEach(filter => {
        if(filter.dataset.category !== selectedCategory) {
            filter.classList.remove('active');
        } else {
            filter.classList.add('active');
        }
    });
    if (selectedCategory !== 'all') {
        seeMore.classList.add('hidden');
    } else {
        seeMore.classList.remove('hidden');
    }
}

const filterFoods = e => {
    if (!e.target.classList.contains('filter-type')) return;
    filterState(e);
    if (e.target.dataset.category.toLowerCase() === 'all') {
        listaProductos.innerHTML = '';
        renderCards('all', 0);
    } else {
        listaProductos.innerHTML = '';
        renderCards(e.target.dataset.category);
    }
}

const showMore = () => {
    renderCards('all', allFoods.next);
    allFoods.next++;
    if (allFoods.next === allFoods.limit) {
        seeMore.classList.add('hidden');
    }
};

const render = () => {
    // Cargar contenido en el dom
    document.addEventListener('DOMContentLoaded', renderCards("pizza", 0));
    filtros.addEventListener("click", filterFoods);
    seeMore.addEventListener("click", showMore);
} 

render();


//aca va lo mio xd atte nacho 


function dailyRec(quantity, list) {
  let rndProd = [];
  for (let i = 0; i <= quantity - 1; i++) {
    let r = Math.floor(Math.random() * list.length);
    if(!rndProd.find((p) => p.type == list[r].type) || rndProd.length == 0){
      rndProd.push(list[r]);

      let { id, image, nombre, precio , type} = list[r];
      let prodList = document.querySelector(".daily-container");
      prodList.innerHTML += `
          <div class="producto">
          <img src="${image}" alt="Product Image">
          <p class="producto-title">${nombre}</p>
          <p class="producto-desc">Descripción</p>
          <div class="buy-group">
          <p class="price">$${precio}</p>
          <button data-id=${id} class="buy">Add</button>
          </div>
          </div>`;
    }else if(rndProd.length == quantity){
      return
    } else quantity++;

  }
}
function openCart() {
  const cartButton = document.querySelector(".cartBtnContainer");
  const cartContainerO = document.querySelector(".cart");
  const closeBtn = document.querySelector(".closeCartBtn");
  function closeCart() {
    cartContainerO.setAttribute(
      "style",
      "animation-name: slide-right-out-cart;"
    );
    setTimeout(() => {
      cartContainerO.classList.add("hidden");
    }, 500);
  }
  cartButton.addEventListener("click", (e) => {
e.preventDefault();
    if (cartContainerO.classList.contains("hidden")) {
      cartContainerO.removeAttribute("style");
      return cartContainerO.classList.remove("hidden");
    } else {
      closeCart();
      return
    }
  });
  closeBtn.addEventListener("click", ()=> {
    closeCart();
  })

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

  const recoList = document.querySelector(".daily-container");
  const prodList = document.querySelector(".lista-productos");

  function addToCart(e) {
    const trg = e.target;
    if (trg.classList.contains("buy")) {
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
  }
  recoList.addEventListener("click", (e) => {
    addToCart(e);
  });
  prodList.addEventListener("click", (e) => {
    addToCart(e);
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
      const total = document.querySelector(".totalPrice");
      total.innerHTML = "";
    }
  })
}
//foods es el array de comidas.
window.addEventListener("load", () => {
  dailyRec(3, foods);
  cart();
  openCart();
});