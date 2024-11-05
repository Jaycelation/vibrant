import { SunOutlined, MoonOutlined, UserOutlined, MessageOutlined, BellOutlined, SearchOutlined, MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { Avatar, Switch, Flex, Popover } from 'antd';
import { useContext, useState } from 'react';
import { MainContext } from '../context/context';
import Login from '../pages/Login';
import { message, Typography } from 'antd';
import {
    auth, signOut,
} from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import ListFriends from '../friend/ListFriends';


const Header = () => {
    const [open, setOpen] = useState(false);
    const [isViewListFriends, setIsViewListFriends] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate();
    const { user, reset,
        setTheme,
        colorPrimary, colorTextBase,
        isLoginModelOpen,
        setIsLoginModalOpen,
        isHiddenHeader,
    } = useContext(MainContext);
    const handleSwitchTheme = (checked) => {
        if (!checked) {
            localStorage.setItem("theme", "dark")
            setTheme("dark")
        }
        else {
            localStorage.setItem("theme", "light")
            setTheme("light")
        }
    }
    const handleOpenLoginModel = () => {
        setIsLoginModalOpen(true)
    }
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
                reset()
                setOpen(false);
                message.success('Logout Success');
            })
            .catch((error) => {
            })
    }

    // const confirmLogOut = (e) => {
    //     handleLogOut()
    //     message.success('Logout Success');
    // };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    return (

        <Flex
            style={{
                padding: "0 2vw 0 2vw",
                height: isHiddenHeader ? "0" : "50px",
                backgroundColor: colorPrimary,
                transition: "1s box-shadow,  300ms ease-in-out",
                position: "sticky",
                top: "0",
                left: "0",
                zIndex: "10",
                overflow: "hidden",
                boxShadow: isHover ? "0 2px 5px rgba(0,0,0,0.3)" : "none",
            }} justify='space-between' align='center'
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Typography.Text style={{
                fontFamily: "cursive",
                fontSize: "30px",
                fontWeight: "600",
                cursor: "pointer"
            }}
                level={4} align='center'
                onClick={() => { navigate("/") }}
            >Vibrant</Typography.Text>
            <Flex gap="15px" justify='space-between' align='center'>
                <SearchOutlined style={{ color: colorTextBase, cursor: "pointer" }}
                    onClick={() => { navigate("/search") }}
                />
                <Popover
                    content={
                        // <Popconfirm
                        //     title="Log Out"
                        //     description="Are you sure to logout?"
                        //     onConfirm={confirmLogOut}
                        //     okText="Yes"
                        //     cancelText="No"
                        // >
                        user.accessToken === ""
                            ?
                            <Typography.Text
                                style={{ cursor: "pointer" }}
                                onClick={() => { navigate('/signup') }}
                            >Sign Up</Typography.Text>
                            :
                            <Typography.Text
                                style={{ cursor: "pointer" }}
                                onClick={handleLogOut}
                            >Log Out</Typography.Text>
                        // </Popconfirm>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <MenuOutlined style={{ color: colorTextBase }} />

                </Popover>

                {
                    user.accessToken === ""
                        ?
                        <>
                            <UserOutlined
                                style={{ color: colorTextBase }}
                                onClick={() => handleOpenLoginModel()}
                            />
                        </>
                        :
                        <>
                            <HomeOutlined style={{ color: colorTextBase }}
                                onClick={() => { navigate('/homepage') }}
                            />
                            <MessageOutlined style={{ color: colorTextBase, position: "relative" }}
                                onClick={() => { setIsViewListFriends(true) }}
                            />

                            <ListFriends setIsViewListFriends={setIsViewListFriends}
                                isViewListFriends={isViewListFriends}
                            />
                            <BellOutlined style={{ color: colorTextBase, cursor: "pointer" }} />
                            {
                                user.avatarUrl === ""
                                    ?
                                    <Avatar size="small"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { navigate('/user') }}
                                    > {user.username.slice(0, 1).toUpperCase()}</Avatar>
                                    :
                                    <Avatar size="small"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { navigate('/user') }}
                                        src={user.avatarUrl}
                                    > </Avatar>
                            }


                        </>
                }
                <Switch
                    unCheckedChildren={<MoonOutlined style={{ color: colorTextBase }} />}
                    checkedChildren={<SunOutlined style={{ color: colorTextBase }} />}
                    defaultChecked={localStorage.getItem("theme") === "dark" ? false : true}
                    onChange={(checked) => handleSwitchTheme(checked)}
                />
            </Flex>
            <Login
                isLoginModelOpen={isLoginModelOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
            />
        </Flex >

    )
}

export default Header;