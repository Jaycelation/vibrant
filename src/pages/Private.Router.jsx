import { useContext } from 'react'
import { Link } from "react-router-dom";
import { Button, Flex, Result } from 'antd';
import { MainContext } from '../context/context';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
const PrivateRoute = (props) => {
    const { user } = useContext(MainContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    else {
        return (
            <>
                <Header />
                <Result
                    status="403"
                    title="Unauthorize"
                    subTitle="Login to unlock this Feature"
                    extra={<Button type="primary"><Link to="/">
                        <span>
                            Back to Homepage
                        </span>
                    </Link></Button>}
                />
                <Footer />
            </>


        )
    }

}
export default PrivateRoute;