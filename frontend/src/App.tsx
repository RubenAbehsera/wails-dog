import './App.css';
import {SetStateAction, useEffect, useState} from "react";
import {GetBreedList, GetImageUrlsByBreed, GetRandomImageUrl} from "../wailsjs/go/main/App";


function App() {

    const [showRandomPhoto, setShowRandomPhoto] = useState(false)
    const [showBreedPhotos, setShowBreedPhotos] = useState(false)
    const [randomImageUrl, setRandomImageUrl] = useState("")
    const [breeds, setBreeds] = useState<string[]>([])
    const [photos, setPhotos] = useState<string[]>([])
    const [selectedBreed, setSelectedBreed] = useState("")

    useEffect(() => {
        getBreedList()
    }, [])

    function getRandomImageUrl() {
        setShowRandomPhoto(false)
        setShowBreedPhotos(false)
        GetRandomImageUrl().then((result) => (setRandomImageUrl(result)))
        setShowRandomPhoto(true)
    }

    function getBreedList() {
        GetBreedList().then((result) => (setBreeds(result)))
    }

    function getImageUrlsByBreed() {
        setShowRandomPhoto(false)
        setShowBreedPhotos(false)
        console.log(selectedBreed)
        GetImageUrlsByBreed(selectedBreed).then((result: string[]) => (setPhotos(result)))
        setShowBreedPhotos(true)
    }


    const ShowPhoto = (props: { show: boolean; }) => {
        if (props.show) {
            console.log(showRandomPhoto)
            return (
                <img id="random-photo" src={randomImageUrl} alt="No dog found" width="100px"/>
            )
        }
        return null
    }


    const ShowBreed = (props: { show: boolean , photos: string[]})  => {
        if (props.show) {

            return (
                <div>
                    {props.photos.map((photo,index)=>(
                       <img src={photo} key={index}/>
                    ))}
                </div>
            )

        }
        return null

    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedBreed(event.target.value)

    }


    // @ts-ignore
    return (
        <div id="App">
           <button className="btn" onClick={getRandomImageUrl}>
               Fet a dog randomly
           </button>
            Click on down arrow to select a breed
            <select name="breeds" value={selectedBreed} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {breeds.map(function (breed){
                    return (<option key={breed} value={breed}>{breed}</option>)
                })}
            </select>
            <button className="btn" onClick={getImageUrlsByBreed}>
                Fetch by this breed
            </button>
            <br/>
            <ShowPhoto show={showRandomPhoto}/>
            <ShowBreed show={showBreedPhotos} photos={photos}/>
        </div>
    )
}

export default App
