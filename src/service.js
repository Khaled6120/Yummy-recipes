const queryString = {
  app_id: process.env.REACT_APP_APP_ID,
  app_key: process.env.REACT_APP_APP_KEY,
};
//https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=d6fb65c7&app_key=44a5cb3f5c2407c9a16bab5aac18576c

export const fetchTabDate = async (defaultQuery) => {
  const { app_id, app_key } = queryString;
  try {
    const data =await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}`)
    const response = await data.json()
    console.log(response)

    return response

  } catch (error) {
    console.log(error, 'something went wrong')
    return error
  }
};

export const fetchDate = async (defaultQuery) => {
  const { app_id, app_key } = queryString;
  try {
    const data =await fetch(`https://api.edamam.com/api/recipes/v2/${defaultQuery}?type=public&app_id=${app_id}&app_key=${app_key}`)
    const response = await data.json()
    console.log(response)

    return response

  } catch (error) {
    console.log(error, 'something went wrong')
    return error
  }
};




