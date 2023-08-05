import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
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
  },
});

export const { getAllUsers, postUser } = userSlice.actions;

export default userSlice.reducer;

