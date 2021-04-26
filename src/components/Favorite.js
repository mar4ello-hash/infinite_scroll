import React, {useEffect, useState} from 'react'
import './Main.css'

const Favorite = () => {

    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        const data = localStorage.getItem('favorites')
        if (data) {
            setFavorite(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorite))
    })

    const handleClick = img => () => {

    }

    return (

        <div className='main'>
            <div className='grid'>
                {
                    favorite.map((img, index) => {

                        // return <img ref={lastImageElementRef} key={img} src={img} alt=""/>
                        return (
                            <div key={index} className='container'>
                                <img key={img} src={img} alt=""/>
                                <div className='middle'>
                                    <button onClick={handleClick(img)} className='btn'>Remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Favorite