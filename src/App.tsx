import React from 'react';
import './App.css';
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import ListTasks from "./components/list-tasks/ListTasks";
import TagsList from "./components/tags-list/TagsList"


const App: React.FC = () => {
  return (
    <div className="App">
      <Layout className="layout">
        <Header className="header">
          <h1>Note</h1>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <ListTasks></ListTasks>
            <TagsList></TagsList>
          </div>
        </Content>
        <Footer className="footer">
          <p>Version 1.0</p>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
