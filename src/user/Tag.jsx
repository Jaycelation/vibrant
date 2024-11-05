import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Flex, Input, Switch, Typography } from "antd";
import { useContext, useState } from "react";
import { MainContext } from "../context/context";
import {
    serverTimestamp, ref, colRefPost,
    addDoc, uploadBytes, storage, getDownloadURL,
    query,
    colRefUser,
    where, arrayRemove,
    getDocs,
    updateDoc, colRefTag,
    arrayUnion,
    doc,
    db, getDoc,
    onSnapshot,
    deleteDoc
} from '../firebase.config'
const Tag = (props) => {
    const { tag } = props;
    const [isHover, setIsHover] = useState(false)
    const { colorPrimary, user, setUser } = useContext(MainContext)
    const handleDeleteTags = async () => {
        //delete tag
        await deleteDoc(doc(db, "tags", tag.id));
        //delete tag in user tags
        const q = query(colRefUser, where("username", "==", user.username))
        const snapshot = await getDocs(q)
        updateDoc(snapshot.docs[0].ref, {
            tags: arrayRemove(tag.id)
        })
        // setUser 
        let listTagCurrent = user.tags
        listTagCurrent = listTagCurrent.filter(id => id !== tag.id)
        setUser({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: user.accessToken,
            friends: user.friends,
            avatarUrl: user.avatarUrl,
            tags: listTagCurrent
        })



    }
    return (
        <>
            <div
                style={{
                    display: "inline-flex",
                    gap: "10px",
                    alignContent: "center",
                    justifyContent: "center",
                    opacity: isHover ? "1" : "0.4",
                    backgroundColor: `${colorPrimary}80`,
                    transition: "all 1s",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: isHover ? "600" : "normal",
                    letterSpacing: isHover ? "0.2em" : "0.1em",
                    padding: "5px 15px"
                }}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <Typography.Text>#{tag.text}</Typography.Text>
                <CloseOutlined
                    onClick={handleDeleteTags}
                />
            </div>
        </>


    )
}

export default Tag;