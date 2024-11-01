import { SunOutlined, MoonOutlined, SettingOutlined, UserOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons';
import { Avatar, Switch, Flex, Popover, Dropdown } from 'antd';
import { useContext, useState } from 'react';
import { MainContext } from '../context/context';
import Login from '../pages/Login';
import { message, Typography } from 'antd';
import {
    auth, signOut,
} from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import ListFriends from '../friend/ListFriends';

const { Text } = Typography;

const Header = () => {
    const [open, setOpen] = useState(false);
    const [isViewListFriends, setIsViewListFriends] = useState(false)
    const navigate = useNavigate();
    const { user, setUser,
        setTheme,
        colorPrimary, colorTextBase,
        isLoginModelOpen,
        setIsLoginModalOpen } = useContext(MainContext);
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
                setUser({
                    id: "",
                    name: "",
                    email: "",
                    accessToken: "",
                    friends: []
                })
                localStorage.setItem('user', JSON.stringify(
                    {
                        id: "",
                        name: "",
                        email: "",
                        accessToken: "",
                        friends: [],
                    }
                ))
                navigate("/")
            })
            .catch((error) => {
                console.log(error.message)
            })
        setOpen(false);
        message.success('Logout Success');
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
            style={{ padding: "0 20px 0 20px", height: "50px", backgroundColor: colorPrimary }} justify='space-between' align='center'
        >
            <Text style={{
                fontFamily: "cursive",
                fontSize: "30px",
                fontWeight: "600",
                cursor: "pointer"
            }}
                level={4} align='center'
                onClick={() => { navigate("/") }}
            >Vibrant</Text>
            <Flex gap="middle" justify='space-around' align='center'>
                {
                    user.accessToken === ""
                        ?
                        <UserOutlined
                            style={{ color: colorTextBase }}
                            onClick={() => handleOpenLoginModel()}
                        />
                        :
                        <Flex direction="vertical" align='center' gap={20}
                            style={{ cursor: "pointer" }}
                        >
                            <Flex direction="vertical" align='center' gap={5}
                                onClick={() => { navigate("/user") }}
                            >
                                <span style={{ fontSize: "14px" }}>Welcome {user.name}</span>
                                <Avatar size="small" icon={<UserOutlined />} />
                            </Flex>

                            <MessageOutlined style={{ color: colorTextBase, position: "relative" }}
                                onClick={() => { setIsViewListFriends(true) }}
                            />

                            <ListFriends setIsViewListFriends={setIsViewListFriends}
                                isViewListFriends={isViewListFriends}
                            />
                            <BellOutlined style={{ color: colorTextBase }} />
                        </Flex>
                }

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
                            <p
                                style={{ cursor: "pointer" }}
                                onClick={() => { navigate('/signup') }}
                            >Sign Up</p>
                            :
                            <p
                                style={{ cursor: "pointer" }}
                                onClick={handleLogOut}
                            >Log Out</p>
                        // </Popconfirm>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <SettingOutlined style={{ color: colorTextBase }} />
                </Popover>
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