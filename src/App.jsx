import Header from './layout/Header';
import Footer from './layout/Footer';
import { Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { MainContext } from './context/context';
import { ConfigProvider } from 'antd';
const App = () => {
  const { theme, colorPrimary, setColorPrimary,
    colorSuccess, setColorSuccess,
    colorWarning, setColorWarning,
    colorError, setColorError,
    colorLink, setColorLink,
    colorTextBase, setTextBase,
    colorBgBase, setBgBase,
    setColorPrimary2
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
            primaryShadow: "none"
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

        },
      }}
    >
      <>
        <Outlet />
      </>

    </ConfigProvider >
  );
}

export default App;
