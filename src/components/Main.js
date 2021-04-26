import React, { useEffect, useState } from 'react'
import Img from './Img';
import ImageURLs from "./ImageURLs";

const param = {
    key: '520a4a5fa805226624d8d1d1c4fc2eaa',
    secret: 'c38117d25ec1914a'
}

const Main = () => {

    const [data, setData] = useState([]) //fetched data
    const [page_num, setPage_num] = useState(1) //page number
    const [imgURLs, setImgURLs] = useState([]) // photo urls
    const [fetchURL, setFetchURL] = useState(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${param.key}&per_page=10&page=${page_num.toString()}'&format=json&nojsoncallback=1`) //fetch URL

    useEffect(() => { //Getting new URL after page change
        setFetchURL(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${param.key}&per_page=10&page=${page_num.toString()}'&format=json&nojsoncallback=1`)
    }, [page_num])

    useEffect(() => { //Fetching data after getting new fetch URL
        async function fetchData() {
            return await fetch(fetchURL)
        }

        fetchData()
            .then(response => response.json())
            .then(result => {
                    setData(result)
                })

    }, [fetchURL])

    useEffect(() => { //Getting URLs of images
        if(data.length !== 0){
            setImgURLs(ImageURLs(data))
        }
    },[data])

    return (
        <div>
            {
                imgURLs.map(img => {
                    return <Img url={img.path} key={img.id}/>
                })
            }
        </div>
    )
}

export default Main