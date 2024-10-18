const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
        return `Ooops! No story found matching your search.`;
    
    case "date":
        return `No story found in given date range.`;
  
    default:
        return `Start creating your first story! click the Add button to jot down your thoughts, ideas and  memories . Let's get started`;
  }
}

export default getEmptyCardMessage