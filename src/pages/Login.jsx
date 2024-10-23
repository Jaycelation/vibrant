import { useState, useContext } from 'react';
import { Modal } from 'antd';
import { MainContext } from '../context/context';
const Login = (props) => {
    const { isLoginModelOpen, setIsLoginModalOpen } = props;
    const { setUser } = useContext(MainContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleOk = () => {
        setIsLoginModalOpen(false);
        setUser({
            name,
            password
        })
        setName("")
        setPassword("")
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
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{}}
                okText="Login"
            >
            </Modal >
        </>
    );
};
export default Login;