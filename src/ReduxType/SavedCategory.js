import {  FetchCategoryList } from "../Component/FetchData";

const SavedCategoryList = async (fetch) => {
  
  let Data = await FetchCategoryList()
  let categoryList = []

  if(fetch){
   categoryList.push(Data)
   return categoryList
  }
   
  return categoryList
};

export default SavedCategoryList;
