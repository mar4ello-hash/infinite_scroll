export default function ImageURLs(data){

    const images = data.photos.photo

        let array = []

        images.map(img => {

            let path = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`
            array.push(path)
        })

    return array
}