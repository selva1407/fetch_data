import React from 'react';
import { useState } from 'react'
import "./Main.css"
import Table from "./Table"

const Main = () => {
  
  const API_URL = "https://jsonplaceholder.typicode.com/posts"
  
  const [data, setData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleData = async () => {
    setIsLoading(true)
    
    setTimeout(() => {
    ( async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Data not received")
      const apiData = await response.json();
      setData(apiData)
    } catch (error) {
      setFetchError(error.message)
    }finally {
      setIsLoading(false)
    }
    })()
    },2000
    )
  }
  
  return (
    <>
      <button
        onClick = {handleData}
      >Fetch Data</button>
      {isLoading && <p>Data Loading...</p>}
      {fetchError && <p>{`Error:${fetchError}`}</p>}
      {!isLoading && !fetchError &&
        <Table 
          data = {data}
        />
      }
    </>
  )
}
export default Main;