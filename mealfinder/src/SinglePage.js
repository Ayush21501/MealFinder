import React, { useRef, useState, useEffect } from "react";
import "./singlepage.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function SinglePage() {
    const searchFood = useRef();
    const [foodList, setFood] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [recepieData, setData] = useState({});
    const [categorylist, setCategorylist] = useState([]);
    const [arealist, setArealist] = useState([]);
  
    // Search food by search bar
    const searchHandle = async (e) => {
      // console.log(searchFood.current.value)
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFood.current.value}`)
        .then((res) => res.json())
        .then((data) => setFood(data.meals));
    };
  
    // Pop-Up Box for datails
    const detailsRecipe = async (e) => {
      console.log(e.target.parentElement.children[0].innerText);
      var getRecipe = e.target.parentElement.children[0].innerText;
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getRecipe}`)
        .then((res) => res.json())
        .then((data) => setData(data.meals[0]));
      setIsOpen(!isOpen);
      console.log(recepieData);
    };
  
    // fetch all category and area
    useEffect(() => {
      const fetchData = async () => {
        await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
          .then((res) => res.json())
          .then((data) => setCategorylist(data.meals));
        await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
          .then((res) => res.json())
          .then((data) => setArealist(data.meals));
      };
      fetchData();
    }, []);
  
    // search by categery
    const searchCategery = async (e) => {
      var getMeal = e.target.innerText;
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${getMeal}`)
        .then((res) => res.json())
        .then((data) => setFood(data.meals));
    };
  
    // search by area
    const searchArea = async (e) => {
      var getMeal = e.target.innerText;
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${getMeal}`)
        .then((res) => res.json())
        .then((data) => setFood(data.meals));
    };
  

  return (
    <div className="container">
      <div className="meal-wrapper">
        <div className="meal-search">
          <h2 className="title">Find Meals For Your Ingredients</h2>
          <blockquote>
            Real food doesn't have ingredients, real food is ingredients.
            <br />
            <cite>- Jamie Oliver</cite>
          </blockquote>
          <div className="meal-search-box">
            <input
              type="text"
              ref={searchFood}
              className="search-control"
              placeholder="Enter an ingredient"
              id="search-input"
            />
            <button
              type="submit"
              onClick={searchHandle}
              className="search-btn btn"
              id="search-btn"
            >
               <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      {/* SEARCH BY */}
      <hr />
      <div className="searchby">
            <DropdownButton id="dropdown-basic-button" title="Search By Area">
              {arealist.map((index, category) => {
                return (
                  <div key={arealist[category].strArea}>
                    <Dropdown.Item onClick={searchArea}>
                      {arealist[category].strArea}
                    </Dropdown.Item>
                  </div>
                );
              })}
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" title="Search By Category ">
              {categorylist.map((index, category) => {
                return (
                  <div key={categorylist[category].strCategory}>
                    <Dropdown.Item onClick={searchCategery}>
                      {categorylist[category].strCategory}
                    </Dropdown.Item>
                  </div>
                );
              })}
            </DropdownButton>
      </div>


      <hr />
      <div className="meal-result">
        <h2 className="title">Your Search Results</h2>

        <div className="meal-container">
          {foodList == null ? (
            <div className="notFound">No Ingredients Found</div>
          ) : (
            foodList.map((f, index) => {
              return (
                <div
                  key={index}
                  id="meal"
                  style={{ width: "250px", margin: "10px" }}
                >
                  <div className="meal-item">
                    <div className="meal-img">
                      <img src={f.strMealThumb} alt="food" />
                    </div>
                    <div style={{ hight: "100px" }} className="meal-name">
                      <h3>{f.strMeal}</h3>
                      <button
                        className="recipe-btn"
                        onClick={detailsRecipe}
                      >
                        Get Recipe
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isOpen && (
            <div className="meal-details">
              <button
                type="button"
                onClick={detailsRecipe}
                className="btn recipe-close-btn"
                id="recipe-close-btn"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="meal-details-content">
                <h2 className="recipe-title">{recepieData.strMeal}</h2>
                <p className="recipe-category">{recepieData.strCategory}</p>
                <div className="recipe-instruct">
                  <h3>Instructions:</h3>
                  <p>{recepieData.strInstructions}</p>
                </div>
                <div className="recipe-meal-img">
                  <img src={recepieData.strMealThumb} alt="" />
                </div>
                <div className="recipe-link">
                  <a href={recepieData.strYoutube} target="_blank">
                    Watch Video
                  </a>
                </div>
              </div>
            </div>
          )}
    </div>
     


   
  );
}

export default SinglePage;
