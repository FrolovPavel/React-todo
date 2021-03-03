import React, {useState, useEffect} from 'react';
import List from '../List/List';
import Badge from "../Badge/Badge";
import axios from 'axios';

import closeSvg from '../../assets/img/close.svg'

import './AddButtonList.scss';


const AddButtonList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [seletedColor, selectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(Array.isArray(colors)) {
            selectColor(colors[0].id)
        }

    }, [colors])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if(!inputValue){
            alert("Введите название списка")
            return;
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists',{"name": inputValue, colorId: seletedColor}).then(({ data }) => {
            const color = colors.filter(c => c.id === seletedColor)[0].name;
            const listObj = {...data, color: {name: color}};
            onAdd(listObj);
            onClose()

        })
            .finally(() => {
                setIsLoading(false);
            })

    }

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
                <img
                    onClick={onClose}
                    src={closeSvg}
                    alt="Close Button"
                    className="add-list__popup-close-btn"
                />

                <input
                    value={inputValue}
                    className="field"
                    type="text"
                    placeholder="Название списка"
                    onChange={e => setInputValue(e.target.value)}
                />

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
                <button onClick={addList} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    );
};

export default AddButtonList;
