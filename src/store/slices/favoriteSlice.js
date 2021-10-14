import {createSlice} from "@reduxjs/toolkit";


export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite:[],
    },
    reducers: {
        changeFav: (state, action) => {
            state.link = action.payload.link;
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.categoryId = action.payload.categoryId;
            state.open = false;
            state.currentPlayingPosition = action.payload.currentPlayingPosition;

            if (state.favorite.find((item) => item.id === action.payload.id)){
                let a=state.favorite.filter((item) => item.id !== action.payload.id)
                // console.log("!!!!!!!!!!!!!!!!!!!",a)
                state.favorite = a
                return
            }

            else {
                state.favorite.push({
                    link: action.payload.link,
                    name: action.payload.name,
                    id: action.payload.id,
                    image: action.payload.image,
                    categoryId: action.payload.categoryId,
                });
            }
        },
    },
    
});

export const { changeFav } = favoriteSlice.actions;

export default favoriteSlice.reducer;