import { useParams } from "react-router-dom"

function MovieDetails() {
    const { id }= useParams()    
    console.log(id)

    return (
        <p>hi</p>
    )
}

export default MovieDetails