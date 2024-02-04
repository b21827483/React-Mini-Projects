import React from "react";
import mealsImg from "../../assets/zt7wmz5s9iba1.png"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderButton";


const Header = props => {

    return <React.Fragment>
        <header className={classes.header}>
            <h1>YourMangas</h1>
            <HeaderCartButton onClick={props.onShowCart} /> 
        </header>
        <div className={classes["main-image"]}>
            <img src={mealsImg} />
        </div>
    </React.Fragment>
}

export default Header