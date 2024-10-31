import { useContext } from 'react'
import { Link } from "react-router-dom";
import { Button, Result } from 'antd';
import { MainContext } from '../context/context';
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

        )
    }

}
export default PrivateRoute;