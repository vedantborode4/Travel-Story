import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard.jsx'
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from './AddEditTravelStory.jsx'
import ViewTravelStory from './ViewTravelStory.jsx'
import EmptyCard from '../../components/Cards/EmptyCard.jsx'
import EmptyImage from "../../assets/images/EmptyImage.svg"
import { DayPicker } from 'react-day-picker'
import getEmptyCardMessage from '../../utils/getEmptyCardMessage.js'
import getEmptyCardImg from '../../utils/getEmptyCardImg.js'
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle.jsx"

function Home() {

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")

  const [dateRange, setDateRange] = useState({form: null, to: null})

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown:false,
    data: null
  })

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("api/v1/users/get-user")
      console.log(response)
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

  const handleEdit = async (data) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: data
    })
  }

  const handleViewStory = async (data) => {
    setOpenViewModal({ isShown: true , data})
  }

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

        if (filterType === "search" && searchQuery ){
          onSearchStory(searchQuery)
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange)
        } else {
        getAllTravelStories()
        }
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again")
    }
  }

  const deleteTravelStory = async (data) => {
    const storyId = data._id;
  
    try {
      const response = await axiosInstance.delete(`/delete-story/${storyId}`);
  
      if (response.data && !response.data.error) {
        toast.success("Story Deleted Successfully")
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTravelStories()
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.", error)
    }
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search",{
        params: {
          query
        }
      });

      if (response.data && response.data.stories) {
        setFilterType("search")
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.", error)
    }
  } 

  const handleClearSearch = async (query) => {
    setFilterType("")
    getAllTravelStories()
  }


  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;
  
      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: { startDate, endDate },
        });
  
        if (response.data?.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.", error)
    }
  };
  
  
  const handleDayClick = (day) => {
    setDateRange(day)
    filterStoriesByDate(day)
  }

  const resetFilter = (day) => {
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllTravelStories()
  }

  useEffect(() => {
    getUserInfo()
    getAllTravelStories()
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <Navbar 
        userInfo = {userInfo} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-10">

        <FilterInfoTitle
          filterType={filterType}
          filterDate={dateRange}
          onClick={() => {
            resetFilter()
          }}
        />

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
              <EmptyCard 
                imgSrc={getEmptyCardImg(filterType)} 
                message={getEmptyCardMessage(filterType)}
              />
            )}
          <div className="w-[350px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pageNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal 
        isOpen={openAddEditModal.isShown} 
        onRequestClose={() => {}}
        style={{
          overlay:{
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999
          }
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory 
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null
            })
          }}
        />
      </Modal>

      <Modal 
        isOpen={openViewModal.isShown} 
        onRequestClose={() => {}}
        style={{
          overlay:{
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999
          }
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenAddEditModal((prevState) => ({...prevState, isShown: false}))
          }}
          onEditClick={() => {
            setOpenAddEditModal((prevState) => ({...prevState, isShown: false}))  
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null)
          }}
        />
      </Modal>
      <button 
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null
          })
        }}
        // getAllTravelStories={getAllTravelStories}
      >
        <MdAdd className="text-[32px] text-white"/>
      </button>
      <ToastContainer/>
    </>
  )
}

export default Home