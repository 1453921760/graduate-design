import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import { getElementError } from '@testing-library/dom';

// class Son1 extends React.Component{
//   constructor(props){
//     super(props)
//   }

//   render(){
//     const value = this.props.value;
//     console.log(this.props.value);
//     if(value === 0){
//       return(
//         <h1>value</h1>
//         )
//     } 
//     if(value === 123){
//       return(
//         <img src="https://seopic.699pic.com/photo/50047/4567.jpg_wh1200.jpg"></img>
//       )
//     }
    
//   }
// }

// class Son2 extends React.Component{
//   constructor(props){
//     super(props);
//     this.changes = this.changes.bind(this);
//   }

//   changes(){
    
//     this.props.changeStatus(123);
//     console.log("clicked");
//     console.log(this.props.value);

//   }
//   render(){
//     return(
//       <>
//       <form>
//         <input onChange = {this.changes}></input> 
//       </form>
//       <button onClick={()=>this.changes()} >click me</button>
//       </>
//     )
//   }

// }


// class Father extends React.Component{
//   constructor(props) {
//     super(props)
//     this.state = {value:0}
//     this.changeStatus = this.changeStatus.bind(this);
//   }
  
//   changeStatus(c){
//     this.setState({value:123});
//     //alert(this.status)
//   }

//   render(){
//     return(
//       <>
//       <Son1 value = {this.state.value}></Son1>
//       <Son2 changeStatus={this.changeStatus} value={this.state.value}></Son2>
      
//       </>
//     )
//   }

// }

// ReactDOM.render(
//   <Father></Father>,
//   document.getElementById('root')
// )















import { Layout, Menu, Breadcrumb, Image, Select, Space } from 'antd';
import {
  DownOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const {Option} = Select;


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3" onClick={()=>alert('点击tom')}>Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        {/* <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout> */}

      </Layout>
    );
  }
}


class MyMenu extends React.Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  constructor(props){
    super(props);
    this.func = this.func.bind(this);
  }

  func(v){
    //console.log(this.props.value);
    this.props.changeLocation(v);
  }
  

  render(){
    const { collapsed } = this.state;
    return(
      // <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={()=>this.func(0)}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>this.func(1)}>
              Option 2
              </Menu.Item>
          </Menu>
        </Sider>
    )
  }
}

class MyContent extends React.Component{
  constructor(props){
    super(props);
  }

  // 获取图片以及返回

  render(){
    if(this.props.location === 0){
      return(
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>     
        <p></p>
        <Test></Test>             
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      )
    }

    if(this.props.location === 1){
      return(
        <Layout className="site-layout">
         <Header className="site-layout-background" style={{ padding: 0 }} />
         <Content style={{ margin: '0 16px' }}>
          <p></p>
          <h1 style={{textAlign:'center', fontSize:'24px'}}>设备信息</h1>

         </Content>
         
         <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      )
    }
  }
}


class My extends React.Component{                              //myMenu是菜单, mycontent是页面, 下拉菜单放在content里面
  constructor(props){
    super(props);
    this.state = {location:0};
    this.changeLocation = this.changeLocation.bind(this);
    
  }

  changeLocation(v){
    this.setState({location:v});
    console.log(this.state.location);
  }

  render(){
    return(
      <Layout style={{ minHeight: '100vh'}}>
        <MyMenu changeLocation={this.changeLocation} ></MyMenu>
        <MyContent location={this.state.location}></MyContent>
      </Layout>
    )
  }

}



class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {deviceName:[],pic:[],index:1, result:[]};
    this.handleClick = this.handleClick.bind(this);
  }

  tick(){                                          //通过get获取从后端获取数据
    console.log("using the tick");
    fetch("http://localhost:8080/spring1/test/obtain").then((response)=>response.json()).then((response)=>{
      this.setState({deviceName:response.deviceName,pic:response.pic,result:response.result})
    });
    
  }

  componentDidMount(){                             //定时器
    this.timerID = setInterval(()=>this.tick(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  handleClick(value) {
    this.setState({index:this.state.deviceName.indexOf(value)});
  }
  
  render() {
    return(
      <Space direction="vertical" style={{margin:'50px'}}>
      {/* 选择设备, 需要设置一个state来变化图片 */}
      <p></p>
      <h3>请选择展示的设备：</h3>
      <Select defaultValue="选择设备" style={{ width: 120 }} onChange={this.handleClick}>           
        {this.state.deviceName.map((x)=>{
          //<Menu.Item> {x} </Menu.Item>
          return(<Option key={x} value={x} >{x}</Option>)
        })}
      </Select>
      <p></p>
      {/* 展示图片 */}
      <h3>设备{this.state.deviceName[this.state.index]}图片如下</h3>                         
      <p></p>
      <Image width={200} src={'data:image/jpeg;base64,' + this.state.pic[this.state.index]}/>
      <p></p>

      <p></p>
      <h2>识别结果为：</h2>
      <p style={{marginLeft:'50px', fontSize:'30px'}}> {this.state.result[this.state.index]}</p>
      </Space>
    )
  }
}


ReactDOM.render(<My />, document.getElementById('root'));