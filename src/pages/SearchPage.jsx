import { Button, Col, Flex, Row, Input, Typography } from "antd";
import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import { fetchListPhotosAPI, searchPhotosAPI } from "../services/services.api";
import { PlusOutlined } from "@ant-design/icons";
import { MainContext } from "../context/context";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const { Search } = Input;
const SearchPage = () => {
    const [listCards, setlistCards] = useState([])
    const { setIsLoading } = useContext(MainContext)
    const [inputSearch, setInputSearch] = useState("")
    const navigate = useNavigate()
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
                createdAt: data.createdAt,
                likes: data.likes,
                views: 1999,
                username: data.user.name,
                profile_image: data.user.profile_image.small,
                urlPhoto: data.urls.full,
                text: data.alt_description
            })
        })
        setlistCards(listData)
    }
    const handleCreateCardYourseft = () => {
        navigate('/user')
    }
    const searchPhotos = async () => {
        if (inputSearch.trim() === "") return;
        try {
            setResult(inputSearch)
            setInputSearch("")
            // setIsLoading(true)
            setlistCards([])
            const res = await searchPhotosAPI(inputSearch)
            const data = res.data.results
            let listDataCards = []
            data.forEach((data) => {
                listDataCards.push({
                    id: data.id,
                    createdAt: data.createdAt,
                    likes: data.likes,
                    views: 1234,
                    username: data.user.name,
                    profile_image: data.user.profile_image.small,
                    urlPhoto: data.urls.full,
                    text: data.alt_description,
                    imgName: "",
                    status: "public",
                })
            })
            setlistCards(listDataCards)

        }
        catch (e) {
            setlistCards([])
        }

    }

    return (
        <>

            <Flex style={{ padding: "20px 4vw 20px 4vw" }} vertical gap="15px">
                <Flex justify={"space-between"} gap="10vw"
                    style={{ padding: "0 10px 0 10px" }}
                >
                    <Search placeholder="Search photos and Illustrations" onSearch={searchPhotos} value={inputSearch}
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
                    height: "100%",
                    margin: "0 auto",
                    pageBreakInside: "avoid",
                }}
                >
                    {
                        listCards.map((post, index) => {
                            return (<>
                                <Post post={post} key={post.id} />
                            </>)
                        })
                    }
                </div>

            </Flex >

        </>


    )
}

export default SearchPage;