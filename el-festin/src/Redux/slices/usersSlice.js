import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersOrdersRejected: [],
    usersOrdersPending: [],
    usersOrdersAccepted:[]
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    postUser: (state, action) => {


    // Obtener el token JWT personalizado desde la respuesta del servidor
    const customToken = action.payload.token;
    // console.log("____CUSTOM TOKEN____", customToken);

    // Guardar el token JWT personalizado en el almacenamiento local o en una cookie
    localStorage.setItem('customToken', customToken); 
      
      state.users.push(action.payload.newUser);

    }
  ,  setAccepted: (state, action) =>{
      state.usersOrdersAccepted = action.payload;
      state.usersOrdersPending = action.payload
    }, ordersPending:(state, action ) =>{
      if(action.payload === 'Aprobado'){
        let orders = [...state.usersOrdersAccepted]
      let orderACC = orders.filter((e) => e.status.includes('Aprobado'))
      state.usersOrdersPending = orderACC;
      }
      if(action.payload === 'Acepted'){
        let orders = [...state.usersOrdersAccepted]
      let orderACC = orders.filter((e) => e.status.includes('Completo')) 
      state.usersOrdersPending = orderACC;
      }
      if(action.payload === 'Entregado'){
        let orders = [...state.usersOrdersAccepted]
      let orderACC = orders.filter((e) => e.status.includes('Entregado')) 
      state.usersOrdersPending = orderACC;
      }if(action.payload === 'En proceso'){
        let orders = [...state.usersOrdersAccepted]
      let orderACC = orders.filter((e) => e.status.includes('En proceso')) 
      state.usersOrdersPending = orderACC;
      }
      
    }, setCompOrder: (state, action) => {
      state.usersOrdersAccepted = action.payload;
      state.usersOrdersPending = action.payload
    }

  },

});

export const { getAllUsers, postUser, setAccepted, ordersPending, setCompOrder } = userSlice.actions;

export default userSlice.reducer;

