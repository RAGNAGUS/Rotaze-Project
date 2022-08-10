/* eslint-disable @next/next/no-img-element */
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { db } from "../firebase/config";

const postTypeList = ['All', 'Image', '360 View', 'GIF']

export default function Home() {

  const [isPending, setIsPending] = useState(false)
  const [documents, setDocuments] = useState([])
  const router = useRouter()

  useEffect(() => {

    const docRef = query(collection(db, "posts"));
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

  // click each image
  const handleClick = (id) => {
    router.push(`/post/${id}`)
  }

  return (
    <div className="pt-[75px] w-full min-h-screen">
      <div className="w-11/12 mx-auto ">
        {/* post type filter */}
        <div className="flex space-x-3">
          {postTypeList.map((postType, index) => (
            <div
              key={index}
              className="px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer"
            >{postType}</div>
          ))}
        </div>
        {/* image gallery */}
        <div className="columns-3xs">
          {/* card */}
          <div>
            {documents && documents.map((doc, index) => (
              <div
                onClick={() => handleClick(doc.id)}
                key={index}
                className="relative my-3 [break-inside:avoid] cursor-pointer hover:scale-105 duration-300 ease-out hover:z-10">

                {/* 360 logo */}
                {doc.postType == 1 && (
                  <div className="absolute flex items-center justify-center w-full h-full">
                    <img src="/360-logo.png" alt="360 logo" className="w-[30%] opacity-80" />
                  </div>
                )}

                {/* image */}
                <div>
                  <img
                    className="bg-white border border-gray-300 rounded-md shadow-sm"
                    src={doc.thumbnail}
                    alt="" />
                  {/* details */}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
