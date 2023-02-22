import React, { useEffect, useState } from "react";
import { CiPizza } from "react-icons/ci";
import { GiFruitBowl, GiNoodles, GiCheckMark } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import {fetchDate} from '../service'
function Tabs({setLoader}) {
  const [active, setActive] = useState('Pizza')
  const [tabData, setTabData] = useState('')
  const [tabLabel,setTabLabel] = useState([
    {
      name:'Pizza',
      icons: <CiPizza />,
      id: 'c0a7bcf3e996adbf1b3c31d74e07f2f1'
    },
    {
      name:'Noddles',
      icons: <GiFruitBowl />,
      id: 'c035215ad57091ce079a21ea7f2bb6c3'
    },
    {
      name:'Desert',
      icons: <GiNoodles />,
      id: 'adfa272d18ff7e099568a63eb1ba4fff'
    },
    {
      name:'Ice cream',
      icons: <MdOutlineIcecream />,
      id: '36dd00a24a9ae47ce257617daebc5bc4'
    },
  ])

  const handleClickActive =(name, id)=>{
    setActive(name)
    fetchDate(id).then((response)=>{
      setTabData(response)
      setLoader(false)
    })
  }

  useEffect(()=>{
    fetchDate(tabLabel[0].id).then((res)=>{
      setTabData(res)
      setLoader(false)

    })
  },[])
  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {tabLabel.map((item, index)=>(
          <div key={index} onClick={()=>(handleClickActive(item.name, item.id),setLoader(true))} className={`tablist ${active ===item.name ? 'active' : ''}`}>
            {item.icons}
            <span>{item.name}</span>
          </div>

        ))}
      </div>
      <div className="recipe_banner">
        {tabData !== '' && <>
          <div className="left-col">
            <span className="badge">{tabData.recipe?.cuisineType[0]?.toUpperCase()}</span>
            <h1>{tabData.recipe?.label}</h1>
            <p>
              <strong>Recipe by:</strong>
              <small>{tabData.recipe?.source}</small>
            </p>
            <h3>Ingredients</h3>
            <div className="ingredients">
              <ul>
                {tabData.recipe.ingredientLines.map((list,index)=>(
                  <li key={index}>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    &nbsp;<span>{list}</span>
                  </li>
                ))}                               
              </ul>
            </div>
          </div>
          <div className="right-col">
            <div className="image-wrapper">
              <img
                src={tabData.recipe.image}
                alt={tabData.recipe.label}
              />
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}

export default Tabs;
