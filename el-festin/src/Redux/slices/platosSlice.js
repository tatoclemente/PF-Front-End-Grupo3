import { createSlice } from "@reduxjs/toolkit";

export const dishesSlice = createSlice({
  name: "dishes-bebidas",
  initialState: {
    dishes: [],
    dishesFilter: [],
    dishesTypes: [],
    filteredDishTypes: [],
    sortedDishes: [],
    dishCloud: [],
    recomendDishes:[]
  },
  reducers: {
    getAllDishes: (state, action) => {
      state.dishes = action.payload;
      state.filteredDishTypes = action.payload;
      state.sortedDishes = action.payload;
      state.dishesFilter = action.payload;
      state.dishCloud = action.payload
    },
    getAllBebidas: (state, action) => {
      state.bebidas = action.payload;
    },
    sortDishesByType: (state, action) => {
      let filteredD = action.payload === 'all' ? state.dishCloud : state.dishesFilter.filter((el) =>
        el.subtype.includes(action.payload));

      state.dishes = filteredD;
      state.sortedDishes = filteredD;
      state.filteredDishTypes = filteredD;
    },
    getAllDishesTypes: (state, action) => {
      state.dishesTypes = action.payload;
    },
    sortDishesByGluten: (state, action) => {
      if (action.payload === "all") {
        let gluten = state.filteredDishTypes;
        state.dishes = gluten;
      }
      if (action.payload === "gluten") {
        let glutene = [...state.dishes];
        let gluten = glutene.filter((el) => el.glutenfree === true);
        let glut =
          gluten.length === 0
            ? state.filteredDishTypes.filter((el) => el.glutenfree === true)
            : gluten;
        state.dishes = glut;
      }
      if (action.payload === "noGluten") {
        let glutene = [...state.dishes];
        let gluten = glutene.filter((el) => el.glutenfree === false);
        let glut =
          gluten.length === 0
            ? state.filteredDishTypes.filter((el) => el.glutenfree === false)
            : gluten;
        state.dishes = glut;
      }
    },
    sortDishesByVeggy: (state, action) => {
      if (action.payload === "all") {
        let veggy = state.sortedDishes;
        state.dishes = veggy;
      }
      if (action.payload === "veggy") {
        let veggie = [...state.dishes];
        let veggy = veggie.filter((el) => el.vegetarian === true);
        let vegg =
          veggy.length === 0
            ? state.sortedDishes.filter((el) => el.vegetarian === true)
            : veggy;
        state.dishes = vegg;
      }
      if (action.payload === "noVeggy") {
        let veggie = [...state.dishes];
        let veggy = veggie.filter((el) => el.vegetarian === false);
        let vegg =
          veggy.length === 0
            ? state.sortedDishes.filter((el) => el.vegetarian === false)
            : veggy;
        state.dishes = vegg;
      }
    },
    sortByCalories: (state, action) => {
      let asc = [...state.dishes];
      let ascSort =
        action.payload === "asc"
          ? asc.sort((a, b) => b.calories - a.calories)
          : asc.sort((a, b) => a.calories - b.calories);
      state.dishes = ascSort;
    },
    filterDishesByName: (state, { payload }) => {
      state.dishes = payload
     
    },
    recomenderDish: (state, action) => {
      state.recomendDishes = action.payload

    },
  },
});

export const {
  getAllBebidas,
  getAllDishes,
  getAllDishesTypes,
  sortDishesByType,
  sortDishesByGluten,
  sortDishesByVeggy,
  sortByPrice,
  sortByCalories,
  filterDishesByName,
  deleteDish,
  recomenderDish
} = dishesSlice.actions;

export default dishesSlice.reducer;
