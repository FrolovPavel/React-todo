import React from 'react';

const List = ({ items }) => {
    return (
        <ul className="todo__list">

            {
                items.map(item => (
                    <li className="active">
                    <i>{item.icon ? item.icon : <i className={item.color}></i>}</i>
                    <span>{item.name}</span>
                </li>))
            }

        </ul>
    );
};

export default List;
