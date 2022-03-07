import React, { useCallback } from "react";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu} from "antd";
import { history, useModel } from "umi";
import { stringify } from "querystring";
import HeaderDropdown from "../HeaderDropdown";

import styles from "./index.less";
// import useUser from "@/hooks/useUser";

import type { MenuInfo } from "rc-menu/lib/interface";
import useUser from "@/hooks/useUser";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState } = useModel("@@initialState");
  const {logout} = useUser();

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      /**
       * 退出登录，并且将当前的 url 保存
       */
      const loginOut = async () => {
        const { query = {}, search, pathname } = history.location;
        const { redirect } = query;
        if (window.location.pathname !== "/user/login" && !redirect) {
          logout();
          history.replace({
            pathname: "/user/login",
            search: stringify({
              redirect: pathname + search,
            }),
          });
        }
      };

      const { key } = event;
      if (key === "logout") {
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const currentUser = initialState?.currentUser;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser?.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser?.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
