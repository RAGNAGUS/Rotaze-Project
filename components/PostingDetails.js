import Morpheus from 'morpheus-image-resize';
import { useEffect, useState } from 'react';

export default function PostingDetails({ imgList }) {

    const [img, setImg] = useState('')

    useEffect(() => {
        console.log(imgList[0])

    }, [imgList])


    return (
        <>
            <div>PostingDetails</div>
            <img src={img} alt="awdwww" />
        </>
    )
}