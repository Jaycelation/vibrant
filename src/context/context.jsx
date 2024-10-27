import { createContext, useState, useEffect } from 'react';

export const MainContext = createContext(
    {
        name: "",
        email: "",
        accessToken: ""
    }
);

export const ContextWrapper = (props) => {
    const [theme, setTheme] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [isLoginModelOpen, setIsLoginModalOpen] = useState(false);
    const [colorPrimary, setColorPrimary] = useState("#ffa500");
    const [colorPrimary2, setColorPrimary2] = useState("#731fb4");
    const [colorSuccess, setColorSuccess] = useState("#52c41a");
    const [colorWarning, setColorWarning] = useState("#faad14");
    const [colorError, setColorError] = useState("#ff4d4f");
    const [colorLink, setColorLink] = useState("2781ff");
    const [colorTextBase, setTextBase] = useState("#360081");
    const [colorBgBase, setBgBase] = useState("#ffffff");
    const [colorTextGray, setColorTextGray] = useState("#919191");
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            accessToken: ""
        }
    )
    useEffect(() => {
        const themeLocal = localStorage.getItem("theme");
        setTheme(themeLocal)
    }, [])

    return (
        <MainContext.Provider value={{
            theme, setTheme,
            user, setUser,
            colorPrimary, setColorPrimary,
            colorSuccess, setColorSuccess,
            colorWarning, setColorWarning,
            colorError, setColorError,
            colorLink, setColorLink,
            colorTextBase, setTextBase,
            colorBgBase, setBgBase,
            colorTextGray, setColorTextGray,
            isLoginModelOpen, setIsLoginModalOpen,
            isLoading, setIsLoading,
            colorPrimary2, setColorPrimary2

        }}>
            {props.children}
        </MainContext.Provider>
    )
}