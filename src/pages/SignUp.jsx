import { Flex, Typography, Input, Row, Col, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundPhoto from "../assets/background.png";
import { validate, isEmail, isRequired } from '../validation';
const { Text } = Typography;

const SignUp = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("");
    let height = window.innerHeight;
    const handleSubmit = () => {
        // Xác thực các trường đầu vào và lưu vào biến cục bộ
        const emailError = validate(email, [isRequired, isEmail]);
        const nameError = validate(name, [isRequired]);
        const passwordError = validate(password, [isRequired]);
        const confirmPasswordError = validate(confirmPassword, [isRequired]);

        setErrorEmailMessage(emailError);
        setErrorNameMessage(nameError);
        setErrorPasswordMessage(passwordError);
        setErrorConfirmPasswordMessage(confirmPasswordError);

        if (emailError === "" && nameError === "" && passwordError === "" && confirmPasswordError === "") {
            console.log("done");
            // navigate("/")
            return;
        }

        console.log("error");
    };
    return (
        <Row style={{ display: "flex", alignItems: "center" }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}
            >
                <div
                    style={{
                        backgroundImage: `url(${backgroundPhoto})`,
                        height: `${height}px`,
                        backgroundPosition: "center",
                        backgrundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}>
                    <Flex vertical
                        style={{
                            padding: "2vw"
                        }}
                    >
                        <Text style={{ fontSize: "40px", fontWeight: "900", color: "white", fontFamily: "cursive", }}>
                            Vibrant</Text>
                        <Text style={{ fontSize: "40px", fontWeight: "900", color: "white", marginTop: "400px" }}>
                            Creation starts here</Text>
                        <Text style={{ fontSize: "20px", color: "white" }}>
                            Discover unique visuals that tell stories beyond imagination
                        </Text>
                    </Flex>

                </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "center" }}>
                <Text style={{ fontSize: "40px", fontWeight: "900" }} >{isLogin ? "Login" : "Sign Up"} Vibrant</Text>
                <br />
                {!isLogin &&
                    <Text style={{ fontSize: "16px" }} >
                        Already have an account? <a onClick={() => setIsLogin(true)}>Login</a>
                    </Text>
                }
                <Flex vertical gap="20px" style={{ width: "100%", marginTop: "40px" }}  >
                    {!isLogin &&
                        <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }} >
                            <Text>Email</Text>
                            <Input size="large" status={errorEmailMessage !== "" ? "error" : ""} placeholder="Email"
                                value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrorEmailMessage("")
                                }}
                            />
                            {errorEmailMessage && <Text type="danger">{errorEmailMessage}</Text>}
                        </Flex>
                    }
                    <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }} >
                        <Text>Username <Text type="secondary">(only letters, numbers)</Text></Text>
                        <Input size="large" status={errorNameMessage !== "" ? "error" : ""} placeholder="Username"
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                                setErrorNameMessage("")
                            }}
                        />
                        {errorNameMessage && <Text type="danger">{errorNameMessage}</Text>}
                    </Flex>
                    <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }}>
                        <Text>Password <Text type="secondary">(at least 8 char)</Text></Text>
                        <Input.Password size="large" status={errorPasswordMessage !== "" ? "error" : ""} placeholder="Password"
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorPasswordMessage("")
                            }}
                        />
                        {errorPasswordMessage && <Text type="danger">{errorPasswordMessage}</Text>}
                    </Flex>
                    {!isLogin &&
                        <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }}>
                            <Text>Confirm Password </Text>
                            <Input.Password size="large" status={errorConfirmPasswordMessage !== "" ? "error" : ""} placeholder="Confirm Password"
                                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setErrorConfirmPasswordMessage("")
                                }}
                            />
                            {errorConfirmPasswordMessage && <Text type="danger">{errorConfirmPasswordMessage}</Text>}
                        </Flex>}
                    {isLogin &&
                        <Text style={{ fontSize: "16px" }} >
                            Don't have an account? <a onClick={() => setIsLogin(false)}>Sign Up</a>
                        </Text>
                    }
                    <Button size="large " type="primary"
                        style={{ marginTop: "15px" }}
                        onClick={handleSubmit}
                    >{isLogin ? "Login" : "Sign Up"}

                    </Button>
                </Flex>
            </Col>

        </Row >
    )
}

export default SignUp;