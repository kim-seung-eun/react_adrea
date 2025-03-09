import React, { Component } from 'react'

class MyNav extends Component {
    shouldComponentUpdate(newProps, newState){
        console.log('shouldComponentUpdate 작동', 
            newProps.data, // 변경된 값
            this.props.data // 변경전 값
            );
        if(newProps.data === this.props.data){
            return false;
        }
        
        return true;        
        
    }
    render() {
        console.log('MyNav 실행');
        let lists = [];
        //console.log(this.props.data);
        let data = this.props.data;
        /*
        ## 1. while 문 사용 
        let i=0;
        while(i < data.length){
            lists.push(
                <li key={data[i].id}><a href="/">{data[i].title}</a></li>
            );
            i++;
        }

        //  ## 2. forEach 문 사용 
        data.forEach(function (item, idx){
            lists.push(
                <li key={item.id}><a href="/">{item.title}</a></li>
            ); 
        });
        */

        //##  3. forEach 문 사용 
        data.forEach(item => {
            lists.push(
                <li key={item.id}>
                    <a href="/"                    
                    onClick={e=>{
                        e.preventDefault();
                        this.props.onChangePage(item.id);
                    }}>{item.title}</a>
                </li>
            ); 
        });

        return (
        <nav>
            <ul>
            {lists}
            </ul>
        </nav>      
        )
    }
}

export default MyNav;