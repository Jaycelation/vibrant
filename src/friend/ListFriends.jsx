import { useEffect, useContext } from "react"
import { MainContext } from "../context/context"
import {
    colRefUser, getDocs,
    onSnapshot,
    query, where,
} from '../firebase.config';
import { Drawer } from 'antd';
import { Flex } from "antd";
import CardFriend from "./CardFriend";
const ListFriends = (props) => {
    const { user, listFriends, setListFriends } = useContext(MainContext)
    const { isViewListFriends, setIsViewListFriends } = props
    useEffect(() => {
        onSnapshot(colRefUser, snapshot => {
            loadDataFriend()
        })
    }, [])
    const loadDataFriend = async () => {
        try {
            const q = query(colRefUser, where("username", "==", user.username))
            const snapshot = await getDocs(q)
            if (snapshot.docs.length > 0) {
                let list = []
                snapshot.docs[0].data().friends.forEach(async (friend, index) => {
                    const q2 = query(colRefUser, where("username", '==', friend.username))
                    const snapshot2 = await getDocs(q2);
                    const url = snapshot2.docs[0].data().avatarUrl;
                    list.push(
                        {
                            username: friend.username,
                            id: friend.id,
                            avatarUrl: url
                        }
                    )
                })
                setListFriends(list)
            }
        }
        catch (e) { }
    }
    return (
        <Drawer title="List Friends" onClose={() => { setIsViewListFriends(false) }} open={isViewListFriends}>
            <Flex vertical
            >
                {
                    listFriends.map((friend, index) => {
                        return (
                            <CardFriend friend={friend} key={index} />
                        )
                    })
                }
            </Flex>
        </Drawer>

    )
}

export default ListFriends;