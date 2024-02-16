import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalAmount: 0,
        isChanged: false
    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        addItemToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            const item = state.items.find((item) => item.id === newItem.id);
            state.totalAmount++;
            if (item) {
                item.amount += 1;
                item.totalPrice += item.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.title,
                    amount: 1,
                    price: newItem.price,
                    totalPrice: newItem.price,
                });
            }
        },

        removeItemFromCart(state, action) {
            state.changed = true;
            const itemId = action.payload;
            const item = state.items.find(item => item.id === itemId)
            state.totalAmount--;
            if (item.amount === 1) {
                state.items = state.items.filter((item) => item.id !== itemId);
            } else {
                item.amount -= 1;
                item.totalPrice -= item.price;
            }
        },
    },
});

export const putCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'Waiting...',
            title: 'Sending Data',
            message: 'Sending Cart Data'
        }));

        const putRequest = async () => {
            const response = await fetch("https://custom-hook-ea362-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify({items: cart.items || [], totalAmount: cart.totalAmount}),
            });
            if (!response.ok) {
                throw new Error('Something went wrong while sending data.');
            }
        };

        try {
            await putRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Data successfully sent.'
            }));
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Something went wrong while sending data.'
            }));
        }
    }
};

export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchRequest = async () => {
            const response = await fetch("https://custom-hook-ea362-default-rtdb.firebaseio.com/cart.json", {method: 'GET'});

            if (!response.ok) {
                throw new Error('Problem occurred during fetching data.');
            }

            return await response.json();
        };

        try {
            const cartData = await fetchRequest();
            dispatch(cartActions.replaceCart({items: cartData.items || [], totalAmount: cartData.totalAmount}));

        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Something went wrong while sending data.'
            }));
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;