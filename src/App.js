import './App.css';
import React, { Component, useState } from 'react'
import Myheader from './component/Myheader';
import ReadArticle from './component/ReadArticle';
import MyNav from './component/MyNav';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';

const App = ()=>{
  let max_menu_id =3;   // 초기값 변경 없는 경우 let
  let welcome = {
    title:'Welcome',
    desc:'Welcome to frontEnd!!'
  };
  let subject ={
    title: "프론트엔드 개발자 adrea" ,
    desc: "기본언어인 html, css, javascript부터 학습합니다. "
  };

  const [mode,setMode] = useState('welcome');  // 초기값 변경되는 경우 const
  const [selected_id,setSelectedId] = useState(2);
  const [menus,setMenus] = useState(
    [
      {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발'},
      {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다. '},
      {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}       
    ]);
  // 함수명 만들기
  const getReadArticle =()=>{
    let idx = menus.findIndex(item=>(item.id === selected_id));
    let data = menus[idx];
    return data;
  }

  const getArticles=()=>{
    let _title, _desc , _article= null;
    if(mode==='welcome'){
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc ={_desc} mode ={mode} ></ReadArticle>        
    }else if(mode ==='read'){
      let _data = getReadArticle();

      _article = <ReadArticle title={_data.title} desc ={_data.desc} mode ={mode} 
                              onChangeMode={(_mode)=>
                                { 
                                  if(_mode ==='delete'){
                                    if(window.confirm('정말로 삭제할까요?')){
                                      let _menus = Array.from(menus);
                                      let idx = _menus.findIndex(item=> (item.id === selected_id));
                                      // 배열삭제
                                      _menus.splice(idx,1);
                                      
                                      setMenus(_menus);
                                      setMode('welcome');
                                      
                                    }
                                  }else{
                                    setMode(_mode);                                    
                                  }
                                  
                                }}> 
                  </ReadArticle>  
     
    }else if(mode ==='create'){
      _article = <CreateArticle onSubmit={(_title, _desc)=>{
                  debugger;
                    max_menu_id +=1;
                  console.log(max_menu_id);
                    // ###### 3. array.from 복사본 만들어 사용. concat과 동일한 방식
                    let _menus = Array.from(menus);
                    _menus.push( {id:max_menu_id, title:_title, desc: _desc});
                    
                    setMenus(_menus);
                    setMode('read');
                    setSelectedId(max_menu_id);
                    
                }}> </CreateArticle>  
    }else if(mode ==='update'){
      
      let _content = getReadArticle();

      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc)=>{
                    
                    let _menus = Array.from(menus);
                    _menus.forEach((item, index)=>{
                      if(item.id === _id){
                        _menus[index] = {id:_id, title:_title, desc:_desc}
                      }
                    })

                    setMenus(_menus);
                    setMode('read');
                  
                }}> </UpdateArticle>  
    }
    return _article;
  }
  return(
    <div className='App'>
     <Myheader 
          title={subject.title} 
          desc={subject.desc}
          onChangeMode = {()=>{
            setMode('welcome');             
            }}>
      </Myheader>
      <MyNav 
          data={menus} 
          onChangePage={(id)=>{
            setMode('read');  
            setSelectedId(id);
           
          }}></MyNav>
      {getArticles() }
      <hr/>
        <div className="menu">
          <button type="button" className="primary" onClick={()=>{
            setMode('create');  
            
          }}>Create task</button>          
        </div>
    </div>

  )    
}


export default App;

