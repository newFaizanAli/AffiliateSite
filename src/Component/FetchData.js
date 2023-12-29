import { useNavigate } from "react-router-dom";

function Fetchdata(method, url, body) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return res.json();
    })
    .catch((err) => {
      // throw err;
      alert(err)
    });
}

let FetchCategoryList = async () => {
  const response = await Fetchdata("GET", "http://localhost:8080/categorylist");
  if (response) {
    return response;
  }
};


let FetchUserList = async () => {
  const response = await Fetchdata("GET", "http://localhost:8080/registeruserlist");
  if (response) {
    return response;
  }
};

let FetchBrandsList = async() => {
  const response = await Fetchdata("GET", "http://localhost:8080/brandslist");
  if (response) {
    return response;
  }
}

let FetchCoupanList = async() => {
  const response = await Fetchdata("GET", "http://localhost:8080/registercoupanlist");
  if (response) {
    return response;
  }
}

let DeleteItems = async (ID, URL) => {
  const response = await Fetchdata(
      "POST",
      URL,
      { ID }
    );
    if (response) {
      alert(response.mes);
    }
}

let FormDataFetch = async(url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    }).then(res => res.json(res))
    
    return response
    
  } catch (e) {
    alert(e);
  }
}








export default Fetchdata;
export { FetchCategoryList, FetchUserList, FetchBrandsList, FetchCoupanList, DeleteItems, FormDataFetch };
