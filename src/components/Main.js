import React, {useEffect, useState, useRef, useCallback} from 'react'
import ImageURLs from "./ImageURLs";
import './Main.css'

const param = {
    key: '520a4a5fa805226624d8d1d1c4fc2eaa',
    secret: 'c38117d25ec1914a'
}

const Main = () => {

    const [data, setData] = useState([]) //fetched data
    const [favorite, setFavorite] = useState([]) //favorites
    const [page_num, setPage_num] = useState(1) //page number
    const [hasMore, setHasMore] = useState(false) //check if there is more photos
    const [loading, setLoading] = useState(true) //check if data is loading
    const [imgURLs, setImgURLs] = useState([]) // photo urls
    const [fetchURL, setFetchURL] = useState(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${param.key}&per_page=10&page=${page_num.toString()}'&format=json&nojsoncallback=1`) //fetch URL

    useEffect(()=> {
        const data = localStorage.getItem('favorites')
        if(data){
            setFavorite(JSON.parse(data))
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('favorites', JSON.stringify(favorite))
    })

    useEffect(() => { //Getting new URL after page change
        setFetchURL(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${param.key}&per_page=10&page=${page_num.toString()}'&format=json&nojsoncallback=1`)
    }, [page_num])

    useEffect(() => { //Fetching data after getting new fetch URL
        setLoading(true)
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
        if (data.length !== 0) {

            let arr = ImageURLs(data)
            arr.forEach(el => {

                setImgURLs(prevImgURLs => {
                    return [...new Set([...prevImgURLs, el])] //returns new and old urls without duplicates
                })
            })
            setHasMore(data.photos.photo.length > 0)
            setLoading(false)
        }
    }, [data])

    const observer = useRef()
    const lastImageElementRef = useCallback(node => {
        if(loading) return
        if(observer.current){
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPage_num(prevPage_num => prevPage_num + 1)
            }
        })
        if(node){
            observer.current.observe(node)
        }
    }, [loading, hasMore])

    const handleClick = img => () => {
        setFavorite(prevFavorite => {
            return [...new Set([...prevFavorite, img])] //adding favorite URLs to the array
        })
    }

    return (
        <div className='main'>
            <div className='grid'>
                {
                    imgURLs.map((img, index) => {

                        if(imgURLs.length === index + 1){
                            // return <img ref={lastImageElementRef} key={img} src={img} alt=""/>
                            return(
                                <div key={index} className='container'>
                                    <img ref={lastImageElementRef} key={img} src={img} alt=""/>
                                    <div className='middle'>
                                        <button onClick={handleClick(img)} className='btn'>Favorite</button>
                                    </div>
                                </div>
                            )
                        } else {
                            // return <img key={img} src={img} alt=""/>
                            return(
                                <div key={index} className='container'>
                                    <img key={img} src={img} alt=""/>
                                    <div className='middle'>
                                        <button onClick={handleClick(img)} className='btn'>Favorite</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                <div className='load'>{loading && 'Loading...'}</div>
            </div>
        </div>

    )
}

export default Main
