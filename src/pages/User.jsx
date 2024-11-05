import { Avatar, Button, Divider, Flex, Typography, Empty, Tag } from "antd";
import PersonalPost from "../post/PersonalPost";
import { useState, useContext, useEffect } from "react";
import CreateNewPost from "../post/CreateNewPost";
import { onSnapshot, colRefPost, query, where, orderBy, getDocs, doc, getDoc, db, colRefTag } from '../firebase.config'
import { MainContext } from "../context/context";
import AddNewFriend from "../friend/AddNewFriend";
import { TagOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Profile from "../user/Profile";
const { Text } = Typography;

const User = () => {
    const { listPersonalPost, setListPersonalPost, user, isDisplayTags } = useContext(MainContext)
    const [isCreateNewPost, setIsCreateNewPost] = useState(false)
    const [isAddNewFriend, setIsAddNewFriend] = useState(false)
    const [isEditProfile, setIsEditProfile] = useState(false)
    const [listTags, setListTag] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        loadPersonalPost()
        onSnapshot(colRefPost, snapshot => {
            loadPersonalPost()
        })
        loadTags()
        onSnapshot(colRefTag, snapshot => {
            loadTags()
        })
    }, [user])
    const loadPersonalPost = async () => {
        setListPersonalPost([])
        const q = query(colRefPost, where("username", "==", user.username), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        let list = []
        snapshot.docs.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id })
        })
        setListPersonalPost(list)
    }
    const loadTags = () => {
        setListTag([])
        let list = []
        user.tags.forEach(async (tag_id) => {
            const tagRef = doc(db, 'tags', tag_id)
            const snapshot = await getDoc(tagRef)
            const data = { ...snapshot.data(), id: tag_id }
            list.push(data)
        })
        setListTag(list)
    }
    return (
        <Flex vertical justify="left" align="center" gap="5px" style={{ position: "relative", padding: "40px" }}>
            {
                isDisplayTags &&
                <div style={{
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    paddingTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <div
                        className="scroll-parent"
                    >
                        <div className="scroll-element primary" >
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                        <div className="scroll-element secondary">
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div
                        className="scroll-parent"
                    >
                        <div className="scroll-element-reverse primary" >
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                        <div className="scroll-element-reverse secondary">
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div
                        className="scroll-parent"
                    >
                        <div className="scroll-element primary" >
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                        <div className="scroll-element secondary">
                            {
                                listTags.map((tag, index) => {
                                    return (
                                        <span key={tag.id}>{tag.text}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            <Flex justify="left" align="center" gap="2vw" style={{ width: "100%" }}>
                {user.avatarUrl
                    ?
                    <Avatar size={96} style={{ flexShrink: "0" }} src={user.avatarUrl}></Avatar>
                    :
                    <Avatar size={96} style={{ flexShrink: "0" }}>{user.username !== "" ? user.username.slice(0, 1).toUpperCase() : ""}</Avatar>
                }

                <Flex vertical justify="left" style={{ width: "100%", }} gap="10px">
                    <Flex justify="left" align="center" gap="10px"
                    >
                        {user.username
                            &&
                            <>
                                <Text style={{ fontWeight: "600", fontSize: "30px" }}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</Text>
                                <Text type="secondary" style={{ fontSize: "24px" }}> {user.email}</Text>
                            </>
                        }
                    </Flex>
                    <Flex gap="10px">
                        <Button type="primary"
                            onClick={() => { setIsCreateNewPost(true) }}
                        >Create New</Button>
                        <Button
                            onClick={() => { setIsAddNewFriend(true) }}
                        > Add Friend</Button>
                        <Button type="dashed"
                            onClick={() => { setIsEditProfile(true) }}
                        > Edit profile</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Divider />

            {
                listPersonalPost.length > 0
                    ?
                    <div
                        style={{
                            columns: "4 300px",
                            height: "100%",
                            margin: "0 auto",
                            breakInside: "avoid",
                        }}
                    >
                        {listPersonalPost.map((post, index) => {
                            return (
                                <PersonalPost post={post} key={index} />
                            )
                        })}
                    </div>
                    :
                    <div>
                        <Empty description={false} />
                    </div>
            }

            <CreateNewPost
                isCreateNewPost={isCreateNewPost}
                setIsCreateNewPost={setIsCreateNewPost}
            />
            <AddNewFriend
                isAddNewFriend={isAddNewFriend}
                setIsAddNewFriend={setIsAddNewFriend}
            />
            <Profile
                listTags={listTags}
                setListTag={setListTag}
                isEditProfile={isEditProfile}
                setIsEditProfile={setIsEditProfile}
            />
        </Flex >
    )
}

export default User;