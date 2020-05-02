import React from "react";
import { Layout } from "antd";
import HeaderLayout from "./Header";
const { Content } = Layout;

const ContentLayout = props => {
  return (
    <Layout className="layout-full">
      <HeaderLayout {...props} />
      <Content style={{ marginTop: 50 }}>
        <props.viewLogged {...props} />
      </Content>
    </Layout>
  );
};

export default ContentLayout;
