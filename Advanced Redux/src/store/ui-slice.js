import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {showCart: false, notification: null},
    reducers: {
        toggle(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            state.notification = {status: action.payload.status, message: action.payload.message, title: action.payload.title};
        }

    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;

