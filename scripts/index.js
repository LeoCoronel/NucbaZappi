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