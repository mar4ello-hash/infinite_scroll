export default function ImageURLs(data){

    const images = data.photos.photo

        let array = []

        images.map(img => {

            let img_info = {
                id : img.id,
                path : `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`
            }

            array.push(img_info)
        })

    return array
}