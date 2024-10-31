import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
const ErrorPage = () => {
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to="/">
            <span>
                Back to Homepage
            </span>
        </Link></Button>}
    />
}

export default ErrorPage;