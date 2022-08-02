import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Post() {

    const router = useRouter()
    const param = router.query.id

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const [documents, setDocuments] = useState()

    // useEffect for getting document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'posts', `${param}`);
        const getDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }
        getDocuments()
    }, [param])

    const handleClick = () => {
        if (documents.postType == 1) {
            console.log(documents.images)
            let text = documents.images[0]
            let pos = text.search('image_0')
            let link = text.substring(0, pos)
            console.log(link)
            console.log(pos);
        }
    }

    return (
        <div className="w-screen">
            <div className="pt-20">
                <button onClick={handleClick}>Click</button>
            </div>
            {documents && documents.images.map((image, index) => (
                <div key={index}>
                    <div>image</div>
                    <Image src={image} alt="" width="100%" height="100%" objectFit="contain" />
                </div>
            ))}
        </div>
    )
}