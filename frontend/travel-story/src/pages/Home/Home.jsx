import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard.jsx'
import { MdAdd } from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([])

  cosnt [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        navigate("/login")
      }
    }
  }

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("api/v1/story/")
      if (response.data && response.data.stories){
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again")
    }
  }

  const handleEdit = async () => {}

  const handleViewStory = async () => {}

  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._Id

    try {
      const response = await axiosInstance.put(
        "/update-is-favourite/" + storyId,
        {
          isFavourite: !storyData.isFavourite
        }
      );
      
      if(response.data && response.data.story){
        toast.success("Story updated succesfully")
        getAllTravelStories()
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again")
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllTravelStories()
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <Navbar userInfo = {userInfo}/>

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1"></div>
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item.id}
                      imgURL={item.imageURL}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavourite}
                      onEdit={() => {handleEdit(item)}}
                      onClick={() => {handleViewStory(item)}}
                      onFavouriteClick={() => {updateIsFavourite(item)}}
                    />
                  )
                })}
              </div>
            ) : (
              <>Empty card here</>
            )}
          <div className="w-[320px]"></div>
        </div>
      </div>
      
      <button 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null
          })
        }}
      >
        <MdAdd className="text-[32px] text-white"/>
      </button>
      <ToastContainer/>
    </>
  )
}

export default Home