import { Avatar, Button, Flex, Input, Modal, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/context';
import {
    doc, updateDoc,
    query,
    colRefUser,
    where,
    getDocs,
    db, arrayUnion,
    addDoc,
    colRefBoxChat
} from '../firebase.config'

const { Text } = Typography;
const AddNewFriend = (props) => {
    const { isAddNewFriend, setIsAddNewFriend } = props;
    const { user, setUser } = useContext(MainContext)
    const [listResult, setListResult] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    useEffect(() => {
        loadDataFriend()
    }, [inputSearch])
    const handleAddFriend = async (friend) => {
        setInputSearch("")
        setListResult([])
        let listFriendCurrent = [...user.friends, {
            username: friend.username,
            id: friend.id
        }];
        setUser({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: user.accessToken,
            friends: listFriendCurrent,
            avatarUrl: user.avatarUrl,
            tags: user.tags,
        })
        // add friend for user
        const userRef = doc(db, 'users', user.id)
        await updateDoc(userRef, {
            friends: arrayUnion({
                username: friend.username,
                id: friend.id
            })
        });
        // add friend for friend
        const friendRef = doc(db, 'users', friend.id)
        await updateDoc(friendRef, {
            friends: arrayUnion({
                username: user.username,
                id: user.id
            })
        });
        // create a box chat
        addDoc(colRefBoxChat, {
            members: [friend.id, user.id],
        })

    }
    const loadDataFriend = async () => {
        setListResult([])
        const q = query(colRefUser, where("username", "==", inputSearch), where("username", "!=", user.username))
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                username: doc.data().username
            }
            if (!user.friends.some(friend => friend.id === data.id))
                list.push(data)
        });
        setListResult(list)
    }
    return (
        <Modal
            title="Looking for your friends"
            open={isAddNewFriend} onCancel={() => {
                setIsAddNewFriend(false)
                setInputSearch("")
                setListResult([])
            }}
            footer={[

            ]}
        >
            <Input
                value={inputSearch}
                onChange={(e) => { setInputSearch(e.target.value) }}
                placeholder='Search your friend name'></Input>
            <Flex
                vertical
                gap="20px"
                style={{ marginTop: "20px" }}
            >
                {
                    listResult.map((friend, index) => {
                        return (
                            <Flex justify='space-between' align='center'>
                                <Flex gap="10px" align='center'>
                                    <Avatar style={{
                                        verticalAlign: 'middle',
                                    }}>{friend.username.slice(0, 1).toUpperCase()}</Avatar>
                                    <Text strong>{friend.username}</Text>
                                </Flex>
                                <Button type="primary"
                                    onClick={() => {
                                        handleAddFriend(friend)
                                    }}
                                >Add</Button>
                            </Flex>
                        )
                    })
                }

            </Flex>

        </Modal>
    )
}

export default AddNewFriend;