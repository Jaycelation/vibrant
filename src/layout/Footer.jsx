import { Typography } from "antd";
import { useContext } from "react";
import { MainContext } from "../context/context";
const { Title } = Typography;
const Footer = () => {
    const { colorPrimary, colorPrimary2 } = useContext(MainContext)
    return (
        <Title level={4}
            style={{
                background: `linear-gradient(90deg, ${colorPrimary} 0%, ${colorPrimary2} 100%)`,
                padding: "60px", textAlign: "center", margin: "0", color: "White",
                fontFamily: "revert",
                // position: "absolute",
                // bottom: "0",
                // left: "0",
                width: "100%"
            }}>
            Made by <a href="https://www.facebook.com/profile.php?id=100014501298819" style={{ fontWeight: "bold" }}>@NavThe</a>
        </Title>
    )
}

export default Footer;