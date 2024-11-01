import { useState, useEffect, useContext } from "react"
import { MainContext } from "../context/context"
import {
    colRefUser, getDocs,
    query, where,
} from '../firebase.config';
import { Button, Drawer } from 'antd';
import { Flex } from "antd";
import CardFriend from "./CardFriend";
const ListFriends = (props) => {
    const { user } = useContext(MainContext)
    const { isViewListFriends, setIsViewListFriends } = props
    const [listFriends, setListFriends] = useState([])
    useEffect(() => {
        loadDataFriend()
    }, [user])
    const loadDataFriend = async () => {
        const q = query(colRefUser, where("name", "==", user.name))
        const snapshot = await getDocs(q)
        console.log(snapshot.docs)
        if (snapshot.docs.length > 0) {
            let list = []
            snapshot.docs[0].data().friends.forEach((friend, index) => {
                list.push(
                    {
                        name: friend.name,
                        id: friend.id
                    }
                )
            })
            setListFriends(list)
        }
    }
    return (
        <Drawer title="List Friends" onClose={() => { setIsViewListFriends(false) }} open={isViewListFriends}>
            <Flex vertical
                gap="30px"
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