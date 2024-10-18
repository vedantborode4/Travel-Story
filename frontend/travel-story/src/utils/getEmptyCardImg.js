import addStoryImg from "../assets/images/EmptyImage.svg"
import nodataImg from "../assets/images/nodata.svg"
import nodateImg from "../assets/images/nodateimg.svg"

const getEmptyCardImg = (filterType) => {
  switch (filterType) {
    case "search":
        return nodataImg
    
    case "date":
        return nodateImg

    default:
        return addStoryImg
  }
}

export default getEmptyCardImg