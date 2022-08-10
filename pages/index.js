import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { db } from "../firebase/config";

export default function Home() {

  const [documents, setDocuments] = useState([])
  const router = useRouter()

  useEffect(() => {
    const docRef = query(collection(db, "posts"));
    async function getDoc() {
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((doc) => {
        setDocuments(prev => [...prev, doc.data()])
      })
    }
    return () => {
      setDocuments([])
      getDoc()
    }
  }, [])

  const handleClick = (id) => {
    router.push(`/post/${id}`)
  }

  return (
    <div className="pt-[73px] w-screen">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-6">
          {documents && documents.map((doc, index) => (
            <div key={index} onClick={() => handleClick(doc.id)} className="cursor-pointer">
              <img src={doc.thumbnail} alt="" />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
