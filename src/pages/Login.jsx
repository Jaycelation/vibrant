import { useState, useContext } from 'react';
import { Modal, Input, Flex, Typography, Spin, } from 'antd';
import { MainContext } from '../context/context';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { validate, isRequired } from '../validation';
import { useNavigate } from 'react-router-dom';
import {
    colRefUser, auth, getDocs,
    query, where,
    signInWithEmailAndPassword
} from '../firebase.config';
const { Text } = Typography;
const Login = (props) => {
    const { isLoginModelOpen, setIsLoginModalOpen } = props;
    const { setUser, isLoadingLogin, setIsLoadingLogin } = useContext(MainContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorLogin, setErrorLogin] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmitLogin = async () => {
        setIsLoadingLogin(true)
        // check input
        const nameError = validate(username, [isRequired]);
        const passwordError = validate(password, [isRequired]);
        setErrorNameMessage(nameError);
        setErrorPasswordMessage(passwordError);

        if (nameError === "" && passwordError === "") {
            const docRef = query(colRefUser, where("username", "==", username))
            const snapshot = await getDocs(docRef)
            if (snapshot && snapshot.docs && snapshot.docs.length > 0) {
                const emailSnapshot = snapshot.docs[0].data().email
                signInWithEmailAndPassword(auth, emailSnapshot, password)
                    .then((cred) => {
                        const dataUser = {
                            id: snapshot.docs[0].id,
                            username: username,
                            email: cred.user.email,
                            accessToken: cred.user.accessToken,
                            friends: snapshot.docs[0].data().friends,
                            avatarUrl: snapshot.docs[0].data().avatarUrl,
                            tags: snapshot.docs[0].data().tags
                        }
                        setUser(dataUser);
                        const stringUser = JSON.stringify(dataUser);
                        localStorage.setItem('user', stringUser);
                        resetForm();
                        setIsLoginModalOpen(false);
                    })
                    .catch(() => {
                        setErrorLogin("Password is incorrect")
                    })
            }
            else {
                setErrorLogin("Username is not valid")
            }
        }
        setTimeout(() => { setIsLoadingLogin(false) }, 1000)

    };
    const handleCancel = () => {
        setIsLoginModalOpen(false);
        resetForm()
    };
    const resetForm = () => {
        setUsername("");
        setPassword("");
        setErrorNameMessage("");
        setErrorPasswordMessage("");
        setErrorLogin("")
    }
    return (
        <>
            <Modal title="Login"
                open={isLoginModelOpen}
                onOk={handleSubmitLogin}
                onCancel={handleCancel}
                okButtonProps={{}}
                okText="Login"
                style={{ position: "relative" }}
            >
                <Flex vertical gap="15px" align="end" style={{ width: "100%", paddingTop: "20px" }}>
                    <Flex vertical gap="5px" style={{ width: "100%" }}>
                        <Input status={errorNameMessage !== "" ? "error" : ""} placeholder="User Name" prefix={<UserOutlined />}
                            value={username} onChange={(e) => {
                                setUsername(e.target.value)
                                setErrorNameMessage("")
                            }}
                        />
                        {errorNameMessage && <Text type="danger">{errorNameMessage}</Text>}

                    </Flex>
                    <Flex vertical gap="5px" style={{ width: "100%" }}>
                        <Input.Password status={errorPasswordMessage !== "" ? "error" : ""} placeholder="Password" prefix={<LockOutlined />}
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorPasswordMessage("")
                            }}
                        />
                        {errorPasswordMessage && <Text type="danger">{errorPasswordMessage}</Text>}
                    </Flex>
                </Flex>
                {errorLogin && <Text type="danger">{errorLogin}</Text>}

                <p style={{ width: "100%", textAlign: "right" }}>
                    Don’t have an account? <a onClick={() => {
                        setIsLoginModalOpen(false)
                        navigate("/signup")
                    }}>Sign up</a>
                </p>


            </Modal >
        </>
    );
};
export default Login;