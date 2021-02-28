import React, {useState} from 'react';
import List from '../List/List';
import Badge from "../Badge/Badge";

import closeSvg from '../../assets/img/close.svg'

import './AddButtonList.scss';


const AddButtonList = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [seletedColor, selectColor] = useState(colors[0].id);
    console.log(seletedColor)

    return (
        <div className="add-list">
            <List onClick={() => setVisiblePopup(true)} items={[
                {
                    className: "list__add-button",
                    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="black" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M1 6H11" stroke="black" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>,
                    name: "Добавить список",
                }
            ]}
            />
            {visiblePopup && <div className="add-list__popup">
                <img onClick={() => {setVisiblePopup(false)}} src={closeSvg} alt="Close Button" className="add-list__popup-close-btn"/>
                <input className="field" type="text" placeholder="Название списка"/>
                <div className="add-list__popup-colors">

                    {
                        colors.map(color => (
                            <Badge
                                className={seletedColor === color.id && 'active'}
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                            />
                            ))
                    }
                </div>
                <button className="button">Добавить</button>
            </div>}
        </div>
    );
};

export default AddButtonList;
