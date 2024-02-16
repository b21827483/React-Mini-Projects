import {useDispatch, useSelector} from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import {Fragment, useEffect} from "react";
import Notification from "./components/UI/Notifications";
import {fetchCartData, putCartData} from "./store/cart-slice";

let isStarted = true;

function App() {
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector(state => state.ui.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData())
    }, []);

    useEffect(() => {

        if (isStarted) {
            isStarted = false;
            return;
        }

        if (cart.changed) {
            dispatch(putCartData(cart));
        }

    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification &&
            <Notification status={notification.status} message={notification.message} title={notification.title}/>}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </ Fragment>
    );
}

export default App;
