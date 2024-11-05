import Header from './layout/Header';
import Footer from './layout/Footer';
import { Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { MainContext } from './context/context';
import { ConfigProvider } from 'antd';
import ListFriends from './friend/ListFriends';
import ListBoxChat from './friend/ListBoxChat';

const App = () => {
  const { theme, colorPrimary, setColorPrimary,
    colorSuccess, setColorSuccess,
    colorWarning, setColorWarning,
    colorError, setColorError, colorPrimary2,
    colorLink, setColorLink,
    colorTextBase, setTextBase,
    colorBgBase, setBgBase,
    setColorPrimary2, isHiddenHeader, setIsHiddenHeader
  } = useContext(MainContext);
  useEffect(() => {
    if (theme === "dark") {
      setColorPrimary("#731fb4")
      setColorPrimary2("#ffa500")
      setColorSuccess("#52c41a")
      setColorWarning("#faad14")
      setColorError("#ff4d4f")
      setColorLink("#cdaaff")
      setTextBase("#ffffff")
      setBgBase("#15001e")
    }
    else {
      setColorPrimary("#ffa500")
      setColorPrimary2("#731fb4")
      setColorSuccess("#52c41a")
      setColorWarning("#faad14")
      setColorError("#ff4d4f")
      setColorLink("#fa8c16")
      setTextBase("#000000")
      setBgBase("#ffffff")
    }
  }, [theme])
  document.body.style.backgroundColor = colorBgBase;
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 10,
          colorPrimary: colorPrimary,
          colorSuccess: colorSuccess,
          colorWarning: colorWarning,
          colorError: colorError,
          colorLink: colorLink,
          colorTextBase: colorTextBase,
          colorBgBase: colorBgBase,
          colorBorder: colorTextBase
        },
        components: {
          Modal: {
            titleColor: colorTextBase,
            contentBg: colorBgBase,
            headerBg: colorBgBase,
            footerBg: colorBgBase,
          },
          Button: {
            primaryShadow: "none",

          },
          Switch: {
            colorPrimary: colorBgBase,
          },
          Input: {
            colorPrimary: colorPrimary,

          },
          Dropdown: {
            paddingBlock: 10,
            colorBgElevated: colorPrimary,
            controlItemBgHover: "none",
          },
          Divider: {
            colorSplit: colorPrimary,
          }
        },
      }}
    >
      <div onWheel={(e) => {
        if (e.deltaY > 0) { setIsHiddenHeader(true) }
        else { setIsHiddenHeader(false) }
      }}
        style={{ "--bg-color-1": `${colorPrimary}`, "--bg-color-2": `${colorPrimary2}` }}
      >
        <Outlet />
      </div>
      <ListBoxChat />
    </ConfigProvider >
  );
}

export default App;
