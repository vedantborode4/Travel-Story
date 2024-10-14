import React, { useEffect, useRef, useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'

const ImageSelector = ({image, setImage, handleDeleteImg}) => {

    const inputRef = useRef(null)
    const [previewURL, setPreviewURL] = useState(null)
    
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    const onChooseFile = () => {
        inputRef.current.click()
    }

    const handleRemoveImage = () => {
        setImage(null);
        handleDeleteImg()
    }

    useEffect(() => {
      
      if(typeof image === "string") {
        setPreviewURL(image)
      }else if (image) {
        setPreviewURL(URL.createObjectURL(image))
      }else{
        setPreviewURL(null)
      }
    
      return () => {
        if (previewURL && typeof previewURL === "string" && !image) {
            URL.revokeObjectURL(previewURL)
        }
      }
    }, [image])
    

  return (
    <div>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (<button 
            className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50  "
            onClick={() => onChooseFile()}
        >
            <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100  ">
                <FaRegFileImage className="text-xl text-cyan-500"/>
            </div>

            <p className="text-sm text-slate-500 ">Browse Image file to upload</p>
        </button>)
        :
        
        (<div className="w-full relative">
            <img 
              src={previewURL} 
              alt="Selected"
              className="w-full h-[300px] object-cover rounded-lg" 
            />

            <button 
                className="btn-small btn-delete absolute top-2 right-2"
                onClick={handleRemoveImage}
            >
                <MdDeleteOutline className="text-lg"
            </button>

        </div>)
        
        }
    </div>
  )
}

export default ImageSelector