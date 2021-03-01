import React from 'react';
import classNames from 'classnames';
import Badge from "../Badge/Badge";

import removeSvg from "../../assets/img/remove.svg"

import './List.scss'


const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = () => {

    }

    return (
        <ul onClick={onClick} className="list">

            {
                items.map((item, i) => (
                    <li key={i} className={classNames(item.className, {'active': item.active})}>
                        <i>{item.icon ? item.icon  : <Badge color={item.color} />}</i>
                        <span  >{item.name}</span>
                        {isRemovable &&
                         <img
                            className="list__remove-icon"
                            src={removeSvg}
                            alt="Remove icon"
                            onClick={() => onRemove(item)}
                         />}
                    </li>))
            }

        </ul>
    );
};

export default List;
//