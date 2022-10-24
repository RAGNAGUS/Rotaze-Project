import { collection, getDocs, query } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { db } from "../../firebase/config"

function Discover() {

    const router = useRouter()

    const [isPending, setIsPending] = useState(false)
    const [documents, setDocuments] = useState([])

    useEffect(() => {

        const docRef = query(collection(db, "tags"))

        const getDoc = async () => {
            setIsPending(true)
            const querySnapshot = await getDocs(docRef);
            querySnapshot.forEach((doc) => {
                setDocuments(prev => [...prev, doc.data()])
            })
            setIsPending(false)
        }
        return () => {
            setDocuments([])
            getDoc()
        }
    }, [])

    // handle click image
    const handleClick = (value) => {
        router.push(`/discover/${value}`)
    }

    return (
        <div className="pt-[73px]  w-full min-h-screen">
            <div className="w-11/12 pt-10 mx-auto">
                <div className="space-y-3 columns-2xs">
                    {documents && documents.map((document, index) => (
                        <div key={index} onClick={() => handleClick(document.value)}>
                            {/* <div className="relative duration-500 ease-out cursor-pointer hover:scale-105">
                                <img
                                    className="bg-white border border-gray-300 rounded-md shadow-sm"
                                    src={document.cover}
                                    alt="" />
                                <div className="absolute bottom-0 w-full px-3 py-3 text-center text-white bg-gray-900 rounded opacity-80">
                                    {document.label}
                                </div>
                            </div> */}

                            <div className="relative max-w-sm overflow-hidden duration-500 ease-out rounded shadow-lg cursor-pointer hover:scale-105">
                                <img src={document.cover} alt="" className="object-cover w-full max-h-48" />
                                <div className="absolute bottom-0 w-full px-3 py-3 text-center text-white bg-gray-900 rounded opacity-80">
                                    {document.label}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Discover