import React,{useEffect,useState} from 'react'
import {BsSearch} from 'react-icons/bs';
import { fetchTabDate } from '../service';

function RecipeLists({setLoader}) {
    const [searchedTearm, setSearchedTearm] = useState('')
    const [query, setQuery] = useState('pizza')
    const [data, setData] = useState('')
    const [prevSearchResult,setPrevSearchResult] = useState('pizza')
    
    const searchRecipe = (searchQuery)=>{
        if(searchQuery===''){
            searchQuery = prevSearchResult
        }
        setPrevSearchResult(searchQuery)
        fetchTabDate(searchQuery).then((res)=>{
            setData(res)
            setLoader(false)
            console.log(res)
        })
    }

    useEffect(()=>{
        fetchTabDate(query).then((res)=>{
            setData(res)
            setLoader(false)
        })
    },[])
    return (
    <div className='container'>
        <div className='heading-line'>
            <strong>Search Recipes</strong>
            <div className='input-wrapper' >
                <input onChange={(e)=>setSearchedTearm(e.target.value)} value={searchedTearm} type="text" placeholder='Search your recipe' />
                <button onClick={()=>(searchRecipe(searchedTearm),setLoader(true))} ><BsSearch /></button>
            </div> 
        </div>
        <div className='flexbox'>
            { 
                data && data.hits.map((item,index)=>(
                <div key={index} className='flexItem'>
                        <div className='img-wrapper'>
                            <img src={item.recipe.image} alt={item.recipe.label} />
                        </div>
                        <p> {item.recipe.label}</p>
                </div>
                ))
            }
            { 
                data.hits?.length===0 && <div className='no-data'>ops!! Result Not Found</div>
            }
        
        </div>
    </div>
  )
}

export default RecipeLists