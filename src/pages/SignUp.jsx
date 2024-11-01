import { Flex, Typography, Input, Row, Col, Button } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundPhoto from "../assets/background.png";
import {
    validate, isEmail, isRequired
    , isConfirmed, minChar
} from '../validation';
import {
    getDocs, addDoc, colRefUser,
    createUserWithEmailAndPassword, auth, signInWithEmailAndPassword,
    query, where
} from '../firebase.config';
import { MainContext } from "../context/context";
const { Text } = Typography;

const SignUp = () => {
    const { setUser } = useContext(MainContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const [errorSignUp, setErrorSignUp] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("");
    let height = window.innerHeight;
    const handleSubmitSignUp = async () => {
        const nameError = validate(name, [isRequired]);
        const passwordError = validate(password, [isRequired, minChar], { min: 6 });
        setErrorNameMessage(nameError);
        setErrorPasswordMessage(passwordError);

        if (!isLogin) {
            const emailError = validate(email, [isRequired, isEmail, minChar], { min: 10 });
            const confirmPasswordError = validate(confirmPassword, [isRequired, isConfirmed], { valueConfirm: password });
            setErrorEmailMessage(emailError);
            setErrorConfirmPasswordMessage(confirmPasswordError);
            if (emailError !== "" || confirmPasswordError !== "") {
                return;
            }
        }
        if (nameError === "" && passwordError === "") {
            const docRef = query(colRefUser, where("name", "==", name))
            const snapshot = await getDocs(docRef)
            if (snapshot.docs.length > 0) {
                setErrorNameMessage('User name already exists');
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    cred.user.displayName = name
                    addDoc(colRefUser, {
                        name: cred.user.displayName,
                        email: cred.user.email,
                        friends: [],
                    })
                        .then((ref) => {
                            const dataUser = {
                                id: ref.id,
                                name: name,
                                email: cred.user.email,
                                accessToken: cred.user.accessToken,
                                friends: []
                            }
                            setUser(dataUser);
                            const stringUser = JSON.stringify(dataUser)
                            localStorage.setItem('user', stringUser)
                            navigate("/")
                        })
                })
                .catch((err) => {
                    setErrorSignUp(err.message)
                })
            return;
        }
    };
    const handleSubmitLogin = async () => {
        const nameError = validate(name, [isRequired]);
        const passwordError = validate(password, [isRequired]);
        setErrorNameMessage(nameError);
        setErrorPasswordMessage(passwordError);

        if (nameError === "" && passwordError === "") {
            const docRef = query(colRefUser, where("name", "==", name))
            const snapshot = await getDocs(docRef)
            if (snapshot && snapshot.docs && snapshot.docs.length > 0) {
                const emailSnapshot = snapshot.docs[0].data().email
                signInWithEmailAndPassword(auth, emailSnapshot, password)
                    .then((cred) => {
                        setUser({
                            id: snapshot.docs[0].id,
                            name: name,
                            email: cred.user.email,
                            accessToken: cred.user.accessToken,
                            friends: snapshot.docs[0].data().friends
                        });
                        setName("");
                        setPassword("");
                        setErrorNameMessage("");
                        setErrorPasswordMessage("");
                        navigate("/")
                    })
                    .catch(() => {
                        setErrorLogin("Password is incorrect")
                    })
            }
            else {
                setErrorLogin("Username is not valid")
            }
        }
    };
    const resetForm = () => {
        setName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setErrorNameMessage("");
        setErrorPasswordMessage("");
        setErrorEmailMessage("");
        setErrorConfirmPasswordMessage("");
        setErrorLogin("")
    }
    return (
        <Row style={{ display: "flex", alignItems: "center" }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}
                onClick={() => { navigate("/") }}
                style={{ cursor: "pointer" }}
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
                        Already have an account? <a onClick={() => {
                            setIsLogin(true)
                            resetForm()
                        }}>Login</a>
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
                                setErrorLogin("")
                            }}
                        />
                        {errorNameMessage && <Text type="danger">{errorNameMessage}</Text>}
                    </Flex>
                    <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }}>
                        <Text>Password <Text type="secondary">(at least 6 char)</Text></Text>
                        <Input.Password size="large" status={errorPasswordMessage !== "" ? "error" : ""} placeholder="Password"
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorPasswordMessage("")
                                setErrorLogin("")
                            }}
                        />
                        {errorPasswordMessage && <Text type="danger">{errorPasswordMessage}</Text>}
                    </Flex>
                    {!isLogin &&
                        <Flex vertical gap="5px" align="flex-start" style={{ width: "100%" }}>
                            <Text>Confirm Password </Text>
                            <Input.Password size="large" status={errorConfirmPasswordMessage !== "" ? "error" : ""} placeholder="Confirm Password"
                                visibilityToggle={{ visible: passwordConfirmVisible, onVisibleChange: setPasswordConfirmVisible }}
                                value={confirmPassword} onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setErrorConfirmPasswordMessage("")
                                }}
                            />
                            {errorConfirmPasswordMessage && <Text type="danger">{errorConfirmPasswordMessage}</Text>}
                        </Flex>}
                    {
                        errorLogin &&
                        <Text type="danger" style={{ alignSelf: "flex-start" }}>
                            {errorLogin}</Text>
                    }
                    {
                        errorSignUp &&
                        <Text type="danger" style={{ alignSelf: "flex-start" }}>
                            {errorSignUp}</Text>
                    }
                    {isLogin &&
                        <Text style={{ fontSize: "16px" }} >
                            Don't have an account? <a onClick={() => {
                                setIsLogin(false)
                                resetForm()
                            }}>Sign Up</a>
                        </Text>
                    }
                    <Button size="large " type="primary"
                        style={{ marginTop: "15px" }}
                        onClick={() => {
                            if (isLogin) handleSubmitLogin();
                            else handleSubmitSignUp();
                        }
                        }
                    >{isLogin ? "Login" : "Sign Up"}

                    </Button>
                </Flex>
            </Col>

        </Row >
    )
}

export default SignUp;