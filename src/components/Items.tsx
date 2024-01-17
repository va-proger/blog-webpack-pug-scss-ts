import data from "../posts.json";
import React, {useState} from "react";
function Items()
{
    const INITIATION_DATA = [
        ...data.response.items
    ]
    const [items, setItems] = useState(INITIATION_DATA);

    const formatDate = (numDate : number): string  => {
        let date : Date = new Date(numDate * 1000);
        return new Intl.DateTimeFormat('ru-Ru').format(date)
    };
    const filterItems = (item: object) => {
        return item.text.length > 0;
    }
    return (
        <>

            {items.filter(filterItems).map((item : object) => {
                return (
                    <li key={item.id}>
                        <a href={`https://vk.com/wall${item.owner_id}_${item.id}`}>
                            <div className="vk-post__date">{formatDate(item.date)}</div>
                            {item.text.slice(0, 150)}...
                            <span>Подробнее по ссылке</span>
                        </a>
                    </li>
                );
            })}
        </>
    );

}

export default Items;