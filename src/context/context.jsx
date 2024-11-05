import { createContext, useState, useEffect } from 'react';
export const MainContext = createContext(
    {
        username: "",
        email: "",
        accessToken: ""
    }
);

export const ContextWrapper = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)
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
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [friend, setFriend] = useState(JSON.parse(localStorage.getItem("friend")))
    const [listPersonalPost, setListPersonalPost] = useState([])
    const [listBoxChat, setListBoxChat] = useState([])
    const [isHiddenHeader, setIsHiddenHeader] = useState(false)
    const [listFriends, setListFriends] = useState([])
    const [isDisplayTags, setIsDisplayTags] = useState(false)
    useEffect(() => {
        const dataUser = JSON.stringify(user)
        localStorage.setItem('user', dataUser)
    }, [user])

    const reset = () => {
        setUser({
            id: "",
            username: "",
            email: "",
            accessToken: "",
            friends: [],
            avatarUrl: "",
            tags: []
        })
        setFriend({
            id: "",
            username: "",
            email: "",
            avatarUrl: "",
            tags: []
        })
        setListPersonalPost([])
        setListBoxChat([])
        localStorage.removeItem('user')
    }
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
            colorPrimary2, setColorPrimary2,
            listPersonalPost, setListPersonalPost,
            isLoadingSignUp, setIsLoadingSignUp,
            isLoadingLogin, setIsLoadingLogin,
            listBoxChat, setListBoxChat,
            reset, isHiddenHeader, setIsHiddenHeader,
            listFriends, setListFriends,
            isDisplayTags, setIsDisplayTags,
            friend, setFriend,
        }}>
            {props.children}
        </MainContext.Provider>
    )
}