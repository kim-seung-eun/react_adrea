import './App.css';
import React, { Component } from 'react'
import Myheader from './component/Myheader';
import ReadArticle from './component/ReadArticle';
import MyNav from './component/MyNav';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';

class App extends Component {
  constructor(props){
    super(props);
    this.max_menu_id =3;
    this.state = {
      mode:'welcome', 
      selected_id:2,
      welcome:{
        title:'Welcome',
        desc:'Welcome to frontEnd!!'
      },
      subject : {
        title: "프론트엔드 개발자" ,
        desc: "기본언어인 html, css, javascript부터 학습합니다. ",
      },
      menus:[
        {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발'},
        {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다. '},
        {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}       
      ]
    }
  }
  getReadArticle(){
    let idx = this.state.menus.findIndex(item=>(item.id === this.state.selected_id));
    let data = this.state.menus[idx];
    return data;
  }
  getArticles(){
    let _title, _desc , _article= null;
    if(this.state.mode==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc ={_desc} mode ={this.state.mode} ></ReadArticle>        
    }else if(this.state.mode ==='read'){
      // let idx = this.state.menus.findIndex(item=>(item.id === this.state.selected_id));
      // let data = this.state.menus[idx];
      let _data = this.getReadArticle();

      _article = <ReadArticle title={_data.title} desc ={_data.desc} mode ={this.state.mode} 
                              onChangeMode={(_mode)=>
                                { 
                                  if(_mode ==='delete'){
                                    if(window.confirm('정말로 삭제할까요?')){
                                      let _menus = Array.from(this.state.menus);
                                      let idx = _menus.findIndex(item=> (item.id === this.state.selected_id));
                                      // 배열삭제
                                      _menus.splice(idx,1);

                                      this.setState({ 
                                        mode: 'welcome' ,
                                        menus: _menus
                                      })
                                    }
                                  }else{
                                    this.setState({ mode:_mode })
                                  }
                                  
                                }}> 
                  </ReadArticle>  
     /* let i =0 ;
      while(i< this.state.menus.length){
        // 반복할일
        let data = this.state.menus[i];
        if(data.id === this.state.selected_id){
          _title = data.title;
          _desc = data.desc;
        }
        i++;
      }
        */
      //_title = this.state.menus[0].title;
      //_desc = this.state.menus[0].desc;
    }else if(this.state.mode ==='create'){
      _article = <CreateArticle onSubmit={(_title, _desc)=>{
                    console.log(_title, _desc, this.state.menus.length);
                    this.max_menu_id ++;
                    //###### 1. push 사용시 원본과 변경된 값을 nav 에서 감지 못함
                    // this.state.menus.push(
                    //   //{id:this.max_menu_id, title:_title, desc: _desc}
                    //   {id:this.state.menus.length+1, title:_title, desc: _desc}
                    // );
                    // this.setState({
                    //   menus: this.state.menus
                    // })

                    // ##### 2. concat 했을때 복사본을 만들어 사용. 원본과 변경된 내용을 감지함
                    // let _menus = this.state.menus.concat(
                    //   {id:this.state.menus.length+1, title:_title, desc: _desc}
                    // )
                    // this.setState({
                    //   menus: _menus
                    // })

                    // ###### 3. array.from 복사본 만들어 사용. concat과 동일한 방식
                    let _menus = Array.from(this.state.menus);
                    _menus.push( {id:this.max_menu_id, title:_title, desc: _desc});
                    
                    this.setState({
                      menus: _menus,
                      mode:'read',
                      selected_id: this.max_menu_id
                    })
                }}> </CreateArticle>  
    }else if(this.state.mode ==='update'){
      
      let _content = this.getReadArticle();

      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc)=>{
                    console.log(_id, _title, _desc);
                    
                    let _menus = Array.from(this.state.menus);
                    _menus.forEach((item, index)=>{
                      if(item.id === _id){
                        _menus[index] = {id:_id, title:_title, desc:_desc}
                      }
                    })

                    this.setState({
                      menus: _menus,
                      mode: 'read'
                    })
                }}> </UpdateArticle>  
    }
    return _article;
  }
  render() {
    console.log('App 실행');
    return (
      <div className='App'>
        <Myheader 
          title={this.state.subject.title} 
          desc={this.state.subject.desc}
          onChangeMode = {()=>{
               this.setState({
                mode:'welcome'
              })
            }}>
        </Myheader>
        {/* <header>
        <h1 className="logo">
          <a href="/"
            onClick ={e=>{
              e.preventDefault();
              this.setState({
                mode:'welcome'
              })
            }}>{this.state.subject.title}</a></h1>
          <p>{this.state.subject.desc} </p>
        </header>  */}
        <MyNav 
          data={this.state.menus} 
          onChangePage={(id)=>{
            this.setState({
              mode:'read',
              selected_id: id
            })
          }}></MyNav>
        {/* <ReadArticle
          title={_title} 
          desc ={_desc}
          mode ={this.state.mode}
          onChangeMode={(_mode)=>{
            this.setState({
              mode:_mode
            })
          }}>            
        </ReadArticle> */}
        {/* {_article} */}
        {this.getArticles()}
        <hr/>
        <div className="menu">
          <button type="button" className="primary" onClick={()=>{
            this.setState({
              mode:'create'
            })
          }}>Create task</button>          
        </div>
      </div>
    )
  }
}


export default App;

