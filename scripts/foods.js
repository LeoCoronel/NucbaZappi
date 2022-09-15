let foods = [
        {
            id: 1,
            nombre: "mozzarella",
            image: "https://i.ibb.co/Rz8yBqb/mozzarella.jpg",
            ventas: 98,
            precio: 500,
            type: "pizza"
        },
        {
            id: 2,
            nombre: "fugazzeta",
            image: "https://i.ibb.co/bH2XTL5/fugazzeta.jpg",
            ventas: 36,
            precio: 600,
            type: "pizza"
        },
        {
            id: 3,
            nombre: "especial",
            image: "https://i.ibb.co/Ct12zMH/especial.jpg",
            ventas: 85,
            precio: 550,
            type: "pizza"
        },
        {
            id: 4,
            nombre: "roquefort",
            image: "https://i.ibb.co/R95tnxP/roquefort.webp",
            ventas: 62,
            precio: 700,
            type: "pizza"
        },
        {
            id: 5,
            nombre: "calabresa",
            image: "https://i.ibb.co/71x7J25/calabresa.jpg",
            ventas: 79,
            precio: 650,
            type: "pizza"
        },
        {
            id: 6,
            nombre: "jamon con huevo",
            image: "https://i.ibb.co/09MvnHw/jamonconhuevo.jpg",
            ventas: 80,
            precio: 600,
            type: "pizza"
        },
        {
            id: 7,
            nombre: "Tacos al pastor",
            image: "https://www.comedera.com/wp-content/uploads/2017/08/tacos-al-pastor-receta.jpg",
            ventas: 0,
            precio: 350,
            type: "taco"
        },
        {
            id: 8,
            nombre: "Tacos de canasta",
            image: "https://www.comedera.com/wp-content/uploads/2021/03/shutterstock_710462986-tacos-de-canasta-1-500x500.jpg",
            ventas: 0,
            precio: 350,
            type: "taco"
        },
        {
            id: 9,
            nombre: "Tacos de carnitas",
            image: "https://www.recetas360.com/wp-content/uploads/2022/06/como-hacer-tacos-de-carnitas-mexicanos.webp",
            ventas: 0,
            precio: 350,
            type: "taco"
        },
        {
            id: 10,
            nombre: "Tacos de guisado",
            image: "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/02/tacos-de-guisado2.jpg",
            ventas: 0,
            precio: 350,
            type: "taco"
        },
        {
            id: 11,
            nombre: "Tacos de pescado",
            image: "https://mexico.didiglobal.com/wp-content/uploads/sites/5/2022/03/tacos-de-pescado-980x653.jpg",
            ventas: 0,
            precio: 350,
            type: "taco"
        },
        {
            id: 12,
            nombre: "Batido de arandanos",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-arandanos.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 13,
            nombre: "Batido de grosella",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-grosella.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 14,
            nombre: "Batido de cacao y banana",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-cacao-y-platano.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 15,
            nombre: "Batido de mango",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-mango.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 16,
            nombre: "Batido de dátiles",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-datiles.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 17,
            nombre: "Batido de palta y piña",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-aguacate-y-pina.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 18,
            nombre: "Batido de frutas tropicales",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-frutas-tropicales.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 19,
            nombre: "Batido de mandarina y mango",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-mandarina-y-mango.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 20,
            nombre: "Batido de frutilla",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-fresas.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        },
        {
            id: 21,
            nombre: "Batido de granada",
            image: "https://recetinas.com/wp-content/uploads/2022/05/batido-de-granada.jpg",
            ventas: 0,
            precio: 350,
            type: "batido"
        }
];

const splitFoods = (size) => {
    let chunk = [];
    for(let i = 0; i < foods.length; i+= size) {
        chunk.push(foods.slice(i, i + size));
    }

    return chunk;
}

const allFoods = {
    foodList: splitFoods(8),
    next: 1,
    limit: splitFoods(8).length
};
