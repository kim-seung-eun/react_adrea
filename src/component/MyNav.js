import React, { Component, useEffect , useState} from 'react'

const MyNav = ({data, onChangePage})=>{
    const[list, setList] = useState([]);
    let lists = [];
    const getList = () =>{
        data.forEach(item => {
            lists.push(
                <li key={item.id}>
                    <a href="/"                    
                    onClick={e=>{
                        e.preventDefault();
                        onChangePage(item.id);
                    }}>{item.title}</a>
                </li>
            ); 
        });
        setList(lists);
    }

    useEffect(()=>{
        getList();
        console.log('getList실행');
    }, [data]
    )

    return (
        <nav>
            <ul>
            {list}
            </ul>
        </nav>
    )
    
}

export default MyNav;