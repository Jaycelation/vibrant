import { Button, Col, Flex, Row, Input, Typography } from "antd";
import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import { fetchListPhotosAPI, searchPhotosAPI } from "../services/services.api";
import { PlusOutlined } from "@ant-design/icons";
import { MainContext } from "../context/context";
const { Text } = Typography;
const { Search } = Input;
const Main = () => {
    const [listCards, setlistCards] = useState([])
    const { setIsLoading } = useContext(MainContext)
    const [inputSearch, setInputSearch] = useState("")
    const [result, setResult] = useState("")
    useEffect(() => {
        initialPhotos();
    }, [])
    const initialPhotos = async () => {
        const res = await fetchListPhotosAPI()
        const data = res.data
        let listData = []
        data.forEach((data) => {
            listData.push({
                id: data.id,
                createAt: data.createAt,
                likes: data.likes,
                views: data.views,
                username: data.user.name,
                profile_image: data.user.profile_image.small,
                urlPhoto: data.urls.full,
                text: data.alt_description
            })
        })
        setlistCards(listData)
    }
    const handleCreateCardYourseft = () => {
    }
    const searchPhotos = async () => {
        if (inputSearch.trim() === "") return;
        try {
            setResult(inputSearch)
            setInputSearch("")
            setIsLoading(true)
            setlistCards([])
            const res = await searchPhotosAPI(inputSearch)
            setlistCards([])
            const data = res.data.results
            let listData = []
            data.forEach((data) => {
                listData.push({
                    id: data.id,
                    createAt: data.createAt,
                    likes: data.likes,
                    views: data.views,
                    username: data.user.name,
                    profile_image: data.user.profile_image.small,
                    urlPhoto: data.urls.full,
                    text: data.alt_description
                })
            })
            setlistCards(listData)

        }
        catch {
            setlistCards([])
        }

    }

    return (
        <>

            <Flex style={{ padding: "20px 5vw 20px 5vw" }} vertical gap="15px">
                <Flex justify={"space-between"} gap="10vw">
                    <Search placeholder="Search photos and Illustrations " onSearch={searchPhotos} value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <Row style={{ flexShrink: "0" }}>
                        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Button type="primary" onClick={() => handleCreateCardYourseft()} ><PlusOutlined /></Button>
                        </Col>
                        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <Button type="primary" onClick={() => handleCreateCardYourseft()} >Create Yourself</Button>
                        </Col>
                    </Row>
                </Flex>
                {result && <Text strong style={{
                    fontSize: "20px",
                    textTransform: "capitalize"
                }}>{result}</Text>}
                <div style={{
                    columns: "4 300px",
                    height: "auto",
                    margin: "0 auto",
                    breakInside: "avoid",
                }}>
                    {
                        listCards.map((post, index) => {
                            return (<>
                                <Post post={post} key={index * index} />
                            </>)
                        })
                    }
                </div>

            </Flex >

        </>


    )
}

export default Main;