import React, { useRef, useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa6'

const ImageSelector = ({image, setImage}) => {

    const inputRef = useRef(null)
    const [previewURL, setPreviewURL] = useState(null)
    
    const handleImageChange = () => {}

    const onChooseFile = () => {
        inputRef.current.click()
    }

  return (
    <div>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        <button 
            className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50  "
            onClick={() => onChooseFile()}
        >
            <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100  ">
                <FaRegFileImage className="text-xl text-cyan-500"/>
            </div>

            <p className="text-sm text-slate-500 ">Browse Image file to upload</p>
        </button>
    </div>
  )
}

export default ImageSelector