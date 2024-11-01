import { useContext, useState } from 'react';
import { Input, Modal, Flex } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import {
    serverTimestamp, ref, colRefPost,
    addDoc, uploadBytes, storage, getDownloadURL
} from '../firebase.config'
import { MainContext } from '../context/context';
const { TextArea } = Input;

const CreateNewPost = (props) => {
    const { user } = useContext(MainContext)
    const { isCreateNewPost, setIsCreateNewPost } = props;
    const [imgUrl, setImgUrl] = useState("")
    const [imgFile, setImgFile] = useState("")
    const [captionInput, setCaptionInput] = useState("")
    const handleCreateNewPost = async () => {
        const storageRef = ref(storage, `${user.id}/${imgFile.name}`)
        await uploadBytes(storageRef, imgFile)
        const url = await getDownloadURL(storageRef)
        addDoc(colRefPost, {
            createdAt: serverTimestamp(),
            likes: 0,
            views: 0,
            username: user.name,
            profile_image: null,
            urlPhoto: url,
            text: captionInput,
            imgName: imgFile.name,
            status: "public",
        })
        setImgUrl("")
        setCaptionInput("")
        setIsCreateNewPost(false)
    }
    return (
        <Modal
            title="Create New Post"
            height={"400px"}
            style={{ minWidth: "50%" }}
            open={isCreateNewPost}
            onOk={handleCreateNewPost}
            onCancel={() => {
                setImgUrl("")
                setCaptionInput("")
                setIsCreateNewPost(false)
            }}
        >
            <Flex gap="40px" justify='center' style={{ paddingTop: "20px" }} vertical>
                <TextArea
                    showCount
                    maxLength={100}
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="Add your Caption"
                    style={{
                        height: 60,
                        resize: 'none',
                    }}
                />

                <label htmlFor="inputImg">
                    {imgUrl === ""
                        ?
                        <a
                            style={{
                                width: "100%", height: "300px", display: "flex",
                                flexDirection: "column",
                                justifyContent: "center", alignItems: "center",
                                borderRadius: "10px",
                                borderStyle: "dashed",
                                cursor: "pointer"
                            }}
                        >
                            <FileImageOutlined style={{ fontSize: "45px" }} />
                            <p>Add your Image</p>
                        </a>
                        :
                        <img src={imgUrl} alt="loading"
                            style={{ width: "100%", borderRadius: "10px" }} />
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
            </Flex>
        </Modal >
    )
}

export default CreateNewPost;