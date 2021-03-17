import React from 'react';
import classes from "./CounterItem.module.css";

const CounterItem = ({ item, activePage, onClickPageNumber }) => {

    return (
        <div
            className={ activePage === item ? classes.page_number_active : classes.page_number }
            onClick={ () => onClickPageNumber(item) }
        >
            { item }
        </div>
    )
};

export default CounterItem;