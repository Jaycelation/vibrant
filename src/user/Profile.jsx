import { Divider, Flex, Typography, Row, Col, Input, Button, Empty, Modal, Checkbox } from "antd";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/context";
import { FileImageOutlined, PlusOutlined, SettingFilled } from "@ant-design/icons";
import Tag from "./Tag";
import {
    serverTimestamp, ref,
    addDoc, uploadBytes, storage, getDownloadURL,
    query,
    colRefUser,
    where,
    getDocs,
    updateDoc, colRefTag,
    arrayUnion,
} from '../firebase.config'
const Profile = (props) => {
    const { isEditProfile, setIsEditProfile, listTags, setListTag } = props
    const { user, setUser, colorPrimary,
        colorTextBase, setIsDisplayTags
    } = useContext(MainContext)
    const [imgUrl, setImgUrl] = useState("")
    const [imgFile, setImgFile] = useState("")
    const [isHoverAvatar, setIsHoverAvatar] = useState(false)
    const [isCreateNewTag, setIsCreateNewTag] = useState(false)
    const [contentTag, setContenTag] = useState("")

    const handleOk = async () => {
        const storageRef = ref(storage, `${user.id}/avatar/${imgFile.name}`)
        await uploadBytes(storageRef, imgFile)
        const url = await getDownloadURL(storageRef)
        const q = query(colRefUser, where("username", "==", user.username))
        const snapshot = await getDocs(q)
        updateDoc(snapshot.docs[0].ref, {
            avatarUrl: url
        })
        const dataUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: user.accessToken,
            friends: user.friends,
            avatarUrl: url,
            tags: user.tags
        }
        setUser(dataUser)
        localStorage.setItem('user', JSON.stringify(dataUser))
        setIsEditProfile(false);
        setImgUrl("")
        setImgFile("")
    };
    const handleCancel = () => {
        setIsEditProfile(false);
        setImgUrl("")
        setImgFile("")
    };
    const handleCreateTag = async () => {
        // create doc tag
        if (contentTag.trim() === "") return;
        addDoc(colRefTag, {
            text: contentTag,
            createdAt: serverTimestamp(),
        })
            .then(async (doc) => {
                // update user
                const q = query(colRefUser, where("username", "==", user.username))
                const snapshot = await getDocs(q)
                updateDoc(snapshot.docs[0].ref, {
                    tags: arrayUnion(doc.id)
                })
                setContenTag("")
                setIsCreateNewTag(false)

                // setUser 
                const listTagCurrent = user.tags
                listTagCurrent.push(doc.id)
                setUser({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    accessToken: user.accessToken,
                    friends: user.friends,
                    avatarUrl: user.avatarUrl,
                    tags: listTagCurrent
                })
            })
            .catch((e) => {
            })
    }
    return (
        <Modal title="Edit your Profile"
            open={isEditProfile}
            onOk={handleOk} onCancel={handleCancel}
            style={{ minWidth: "70%" }}
        >
            <Row justify='space-between' style={{ padding: "40px 10px 20px 10px" }} >
                <Col xs={24} sm={24} md={24} lg={24} xl={8}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="inputImg">
                        {user.avatarUrl === "" && imgUrl === ""
                            ?
                            <a
                                style={{
                                    width: "300px", height: "300px", display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px",
                                    borderStyle: "dashed",
                                    cursor: "pointer",
                                    borderRadius: "1000px",
                                    transition: "all 1s"
                                }}
                            >
                                <FileImageOutlined style={{ fontSize: "45px" }} />
                                <p>Add your Avatar</p>
                            </a>
                            :
                            <div style={{
                                position: "relative"
                            }}
                                onMouseOver={() => setIsHoverAvatar(true)}
                                onMouseLeave={() => setIsHoverAvatar(false)}
                            >
                                <img src={imgUrl === "" ? user.avatarUrl : imgUrl} alt="loading"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        borderRadius: "1000px",
                                        objectFit: "cover"
                                    }} />
                                {
                                    isHoverAvatar &&
                                    <div style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        width: "300px",
                                        height: "300px",
                                        borderRadius: "1000px",
                                        backgroundColor: "black",
                                        opacity: "0.6",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "white",
                                        flexDirection: "column",
                                    }}>
                                        <FileImageOutlined style={{ fontSize: "45px" }} />
                                        <p>Update your Avatar</p>
                                    </div>
                                }
                            </div>

                        }
                    </label>
                    <input type='file'
                        onChange={(e) => {
                            const file = e.target.files[0]
                            setImgFile(file)
                            if (file) {
                                const url = URL.createObjectURL(file)
                                setImgUrl(url)
                            }
                        }}
                        id="inputImg"
                        style={{ display: "none" }}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={16}
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: "30px",
                        padding: "10px",
                    }}
                >
                    <Flex gap="20px" wrap="wrap" style={{ padding: "10px" }}>
                        <Input
                            style={{ width: "150px" }}
                            disabled placeholder={`Email: ${user.email}`} />
                        <Input
                            style={{ width: "150px" }}
                            disabled placeholder={`Username: ${user.username}`} />
                        <Flex align="center" gap="10px">
                            <Input.Password
                                style={{ width: "150px" }}
                                disabled
                                value={12345678} />
                            <SettingFilled
                                style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    color: colorPrimary
                                }}
                            />
                        </Flex>
                        <Divider
                            style={{
                                padding: "0",
                                margin: "0"
                            }}
                        />
                        <Flex vertical gap="10px">
                            <Checkbox onChange={(e) => {
                                setIsDisplayTags(e.target.checked)
                            }}
                                disabled={listTags.length < 7 ? true : false}
                            >Display Tags on Your Profile (Only you have more 7 tags)</Checkbox>
                            <div style={{
                                display: "inline-flex",
                                gap: "10px",
                                flexWrap: "wrap"
                            }}>

                                {
                                    listTags.map((tag, index) => {
                                        return (
                                            <Tag tag={tag} key={tag.id} />
                                        )
                                    })
                                }
                                <a
                                    style={{
                                        display: "inline-flex",
                                        border: "dashed",
                                        transition: "width 1s",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        padding: "5px 15px",
                                        width: isCreateNewTag ? "130px" : "100px",
                                        overflow: "hidden"
                                    }}
                                    onClick={() => setIsCreateNewTag(true)}
                                    onBlur={() => {
                                        setIsCreateNewTag(false)
                                    }}
                                >
                                    <Flex gap="20px">
                                        <input
                                            style={{
                                                width: "100px",
                                                background: "none",
                                                border: "none",
                                                outline: "none",
                                                color: colorTextBase,
                                                padding: "0",
                                                transition: "width 1s",
                                            }}
                                            value={contentTag}
                                            onChange={(e) => setContenTag(e.target.value)}
                                            placeholder="Create New Tag"
                                        ></input>
                                        <PlusOutlined
                                            onClick={handleCreateTag}
                                        />
                                    </Flex>
                                </a>
                            </div>
                        </Flex>

                    </Flex>

                </Col>
            </Row>

        </Modal>

    )
}

export default Profile;