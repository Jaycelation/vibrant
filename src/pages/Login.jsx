import { useState, useContext } from 'react';
import { Modal, Input, Flex, Typography } from 'antd';
import { MainContext } from '../context/context';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate, isEmail, isRequired } from '../validation';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
const Login = (props) => {
    const { isLoginModelOpen, setIsLoginModalOpen } = props;
    const { setUser } = useContext(MainContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
        const nameError = validate(name, [isRequired]);
        const passwordError = validate(password, [isRequired]);

        setErrorNameMessage(nameError);
        setErrorPasswordMessage(passwordError);

        if (nameError === "" && passwordError === "") {
            setUser({
                name,
                password
            });
            setIsLoginModalOpen(false)
            setName("");
            setPassword("");
            setErrorNameMessage("");
            setErrorPasswordMessage("");
        }


    };
    const handleCancel = () => {
        setIsLoginModalOpen(false);
        setName("")
        setPassword("")
    };
    return (
        <>
            <Modal title="Login"
                open={isLoginModelOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okButtonProps={{}}
                okText="Login"
            >
                <Flex vertical gap="15px" align="end" style={{ width: "100%", paddingTop: "20px" }}>
                    <Flex vertical gap="5px" style={{ width: "100%" }}>
                        <Input status={errorNameMessage !== "" ? "error" : ""} placeholder="User Name" prefix={<UserOutlined />}
                            value={name} onChange={(e) => {
                                setName(e.target.value)
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