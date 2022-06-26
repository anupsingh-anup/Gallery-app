import React, { useState,useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { useLocation, useNavigate, useParams,Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./styles.css";
import MyPagination from "./MyPagination";

const unsplash = new Unsplash({
  accessKey: "omh_u5jyNWVO8CvU4hpvLkt_GwwKMZ7oZpILzVJm7Ss",
});


function SearchPage() {
  const [query, setQuery] = useState("");
  const [photo, setPhoto] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data,setData]=useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const queryParam=()=>{
    const path = location.pathname;
    if (path === "/search") {
      navigate("/search/photos?page=" + currentPage +"&query="+query);
    } 
    else {
      navigate("search/photos?page=" + currentPage+"&query="+query);
    }
  }

  const splashToGetPhotos=(search,page)=>{
    unsplash.search
      .photos(search,page)
      .then(toJson)
      // .then((result)=>console.log(result))
      .then((json) => {
        setPhoto(json.results);
        setTotalItems(json.total_pages);
        console.log(json);
        setData(json.total === 0?true:false)
        // console.log(false)
      });
  }

  const changePhoto = async (e) => {
    queryParam();
   e.preventDefault();
    splashToGetPhotos(query,currentPage);
  };

  // useEffect(() => {
  //   console.log("useffect1");
  //   const param1 = new URL(window.location.href).searchParams.get("query");
  //   const param2 = new URL(window.location.href).searchParams.get("page");
  //   if (param1) console.log(param1,param2);
  // }, [params]);

  

  useEffect(() => {
    const path = location.pathname;
    const param1 = new URL(window.location.href).searchParams.get("query");
    const param2 = new URL(window.location.href).searchParams.get("page");
    console.log(param1,param2);
     if(path === "/search"){
    unsplash.search
    .photos(0)
    .then(toJson)
    .then((json) => { 
      setPhoto(json.results);
  })}
}, [params]);

  useEffect(() => {
    if(query.length === 0){
       const param1 = new URL(window.location.href).searchParams.get("query");
    const param2 = new URL(window.location.href).searchParams.get("page");
    if(param1 && param2){
    splashToGetPhotos(param1,param2);
    navigate("/search/photos?page=" + param2 +"&query="+param1);
    }
  } else{
    splashToGetPhotos(query,currentPage);
    navigate("/search/photos?page=" + currentPage +"&query="+query);
  }}, [currentPage]);

  

  return (<><nav className="navbar fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand" href="/home">Gallery App</a>
        <form className="d-flex navbar-brand ">
          <input className="form-control me-2" type="search" name="query" placeholder="Search" aria-label="Search" value={query} onChange={(e) => {
            setQuery(e.target.value)
          }} />
          <Link to="/search" onClick={changePhoto}>
          <button className="btn btn-outline-success" type="submit">Search</button>
          </Link>
        </form>
      </div>
    </nav>
    <section className="gallery min-vh-100">
      <div className="container-lg">
        <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
          {data?<div >No data found</div>:
          photo.map((pic) => {
            return (
              <div className="col">
                <img src={pic.urls.small} className="gallery-item" alt={pic.alt_description} />
              </div>
            )
          })}
        </div></div></section>
        {data?<div ></div>:
        <Container>
     <MyPagination
     itemsCount={totalItems}
     itemsPerPage={10}
     currentPage={currentPage}
     setCurrentPage={setCurrentPage}
     alwaysShown={false}
   /></Container>}</>)
        
}

export default SearchPage;