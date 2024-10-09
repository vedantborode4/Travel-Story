import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

function Home() {

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([])

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
    </>
  )
}

export default Home