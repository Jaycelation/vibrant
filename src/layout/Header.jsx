import { SunOutlined, MoonOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Switch, Flex } from 'antd';
import { useContext } from 'react';
import { MainContext } from '../context/context';
import Login from '../pages/Login';
import { message, Popconfirm, Typography } from 'antd';
const { Text } = Typography;

const Header = () => {
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
        setUser({
            name: "",
            password: ""
        })
    }
    const confirmLogOut = (e) => {
        handleLogOut()
        message.success('Logout Success');
    };
    return (

        <Flex
            style={{ padding: "0 20px 0 20px", height: "50px", backgroundColor: colorPrimary }} justify='space-between' align='center'
        >
            <Text style={{
                fontFamily: "cursive",
                fontSize: "30px",
                fontWeight: "600",
            }}
                level={4} align='center'>Vibrant</Text>
            <Flex gap="middle" justify='space-around' align='center'>
                {
                    user.name === "" && user.password === ""
                        ?
                        <UserOutlined
                            style={{ color: colorTextBase }}
                            onClick={() => handleOpenLoginModel()}
                        />
                        :
                        <Flex direction="vertical" align='center' gap={20}>
                            <Flex direction="vertical" align='center' gap={5}>
                                <span style={{ fontSize: "14px" }}>Welcome {user.name}</span>
                                <Avatar size="small" icon={<UserOutlined />} />
                            </Flex>
                            <Popconfirm
                                title="Log Out"
                                description="Are you sure to logout?"
                                onConfirm={confirmLogOut}
                                okText="Yes"
                                cancelText="No"
                            >
                                <LogoutOutlined style={{ color: colorTextBase }} />
                            </Popconfirm>

                        </Flex>
                }

                <HomeOutlined style={{ color: colorTextBase }} />
                <SettingOutlined style={{ color: colorTextBase }} />
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