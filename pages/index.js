/* eslint-disable @next/next/no-img-element */
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { db } from "../firebase/config";

export default function Home() {

  const [isPending, setIsPending] = useState(false)
  const [documents, setDocuments] = useState([])
  const [filterPostType, setFilterPostType] = useState(3)
  const router = useRouter()

  useEffect(() => {

    const docRef = query(collection(db, "posts"))

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
  }, [filterPostType])

  // click each image
  const handleClick = (id) => {
    router.push(`/post/${id}`)
  }

  //filter handle click
  const handleFilter = (filter) => {
    switch (filter) {
      case "All":
        setFilterPostType(3)
        break;
      case "Image":
        setFilterPostType(0)
        break;
      case "360 View":
        setFilterPostType(1)
        break;
      case "GIF":
        setFilterPostType(2)
        break;
      default:
        break;
    }
  }


  return (
    <div className="pt-[75px] w-full min-h-screen">
      <div className="w-11/12 mx-auto ">
        {/* post type filter */}
        <div className="flex space-x-3">

          <div
            onClick={() => handleFilter("All")}
            className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 3 ? "bg-gray-600 text-white" : ""}`}
          >All</div>
          <div
            onClick={() => handleFilter("Image")}
            className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 0 ? "bg-gray-600 text-white" : ""}`}
          >Image</div>
          <div
            onClick={() => handleFilter("360 View")}
            className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 1 ? "bg-gray-600 text-white" : ""}`}
          >360 View</div>
          <div
            onClick={() => handleFilter("GIF")}
            className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 2 ? "bg-gray-600 text-white" : ""}`}
          >GIF</div>

        </div>
        {/* image gallery */}
        <div className="columns-3xs">
          {/* show filter card */}

          {documents && filterPostType != 3 && documents.filter(documents => documents.postType == filterPostType).map((doc, index) => (
            <div
              onClick={() => handleClick(doc.id)}
              key={index}
              className="relative my-3 [break-inside:avoid] cursor-pointer hover:scale-105 duration-300 ease-out hover:z-10">

              {/* 360 logo */}
              {doc.postType == 1 && (
                <div className="absolute flex items-center justify-center w-full h-full">
                  <img src="https://firebasestorage.googleapis.com/v0/b/prototype-e8461.appspot.com/o/360logo%2F360-logo.png?alt=media&token=a7317a86-d04d-424c-afe2-92c2ee18c1a9" alt="360 logo" className="w-[30%] opacity-80" />
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

          {/* show all card */}
          <div>
            {documents && filterPostType == 3 && documents.map((doc, index) => (
              <div
                onClick={() => handleClick(doc.id)}
                key={index}
                className="relative my-3 [break-inside:avoid] cursor-pointer hover:scale-105 duration-300 ease-out hover:z-10">

                {/* 360 logo */}
                {doc.postType == 1 && (
                  <div className="absolute flex items-center justify-center w-full h-full">
                    <img src="https://firebasestorage.googleapis.com/v0/b/prototype-e8461.appspot.com/o/360logo%2F360-logo.png?alt=media&token=a7317a86-d04d-424c-afe2-92c2ee18c1a9" alt="360 logo" className="w-[30%] opacity-80" />
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
          {/* if is pending */}
          <div>
            {isPending && (
              <div>
                Loading
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
