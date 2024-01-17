import React from 'react';
import Items from './Items.tsx'
import './App.scss';

 function App()
{


    return (
        <>
            <h2 className={'vk-post__title'}>Посты с ВК</h2>
            <ul className={'vk-post'}>
               <Items/>
            </ul>
        </>
    )

}
        export default App;