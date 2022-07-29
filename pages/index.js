import { FcLike } from 'react-icons/fc'
import { FaRegCommentDots } from 'react-icons/fa'
import { ImEye } from 'react-icons/im'

export default function Home() {

  let data = [
    { image: 'https://media.giphy.com/media/q217GUnfKAmJlFcjBX/giphy.gif' },
    { image: 'https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif' },
    { image: 'https://media.giphy.com/media/jdFm2bcWlj4EUVCpc0/giphy.gif' },
    { image: 'https://media.giphy.com/media/wkW0maGDN1eSc/giphy.gif' },
    { image: 'https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif' },
    { image: 'https://media.giphy.com/media/yALcFbrKshfoY/giphy.gif' },
    { image: 'https://media.giphy.com/media/f4V2mqvv0wT9m/giphy.gif' },
    { image: 'https://media.giphy.com/media/jt7bAtEijhurm/giphy.gif' },
    { image: 'https://media.giphy.com/media/eR7OEDQDyA7Cg/giphy.gif' },
    { image: 'https://media.giphy.com/media/12nMEydAAgCxYA/giphy.gif' },
    { image: 'https://media.giphy.com/media/2y98KScHKeaQM/giphy.gif' },
    { image: 'https://media.giphy.com/media/13Z5kstwARnPna/giphy.gif' },
    { image: 'https://media.giphy.com/media/8OTxSsEKzMs2A/giphy.gif' },

  ]

  return (
    <div>
      <div className="w-10/12 mx-auto py-36">

        <div className='grid grid-cols-6 gap-3'>

          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 grid-row">
            {data.map(data => (
              <div key={data} className="flex flex-col mb-auto bg-white border shadow-xl">

                <img className='' src={data.image} />
                <span className="text-xl font-bold text-center">Image Name</span>
                <span className="text-center">Lorem ipsum dolor sit amet.</span>
                <div className='flex justify-center py-3 space-x-6 text-sm'>
                  <div className='flex items-center space-x-1'>
                    <FcLike />
                    <span>125K</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <FaRegCommentDots />
                    <span>2,564</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <ImEye />
                    <span>1.8M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
