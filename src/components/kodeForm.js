import "./kodeForm.css";
import "./kodeSong.css";
import { useEffect, useState} from "react";
import axios from 'axios';


function App() {
  const CLIENT_ID = "8ac9be97ab0a4fb8b02c48ceede77c6f"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "playlist-modify-private"
 

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [songSelected, setSongSelected] = useState([]);
  const [artists, setArtists] = useState([])
 
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
}

const handleSelected = (song) => {
    if (!songSelected.includes(song)) {
      setSongSelected([...songSelected, song]);
    } else {
      setSongSelected(songSelected.filter((elem) => elem !== song));
    }
  };

const renderArtists = () => {
    return artists.map(artist => (
 
    <div className="cards" key={artist.id}>
    <div className="kotak-img">
    {artist.images.length ? <img src={artist.images[0].url} alt="" />  : <div>No Image</div>}

    </div>
    <div className="kotak-main">
    <h5>{artist.name}</h5>

    </div>
 <div>
 {!songSelected.includes(artist.id) ? (
            <button
              className="kotak-btn"
              type="button"
              onClick={() => handleSelected(artist.id)}
            >
              select
            </button>
          ) : (
            <button
              className="kotak-btn"
              style={{ backgroundColor: "#FF0000" }}
              type="button"
              onClick={() => handleSelected(artist.id)}
            >
              deselect
            </button>
          )}
 </div>
 </div> 
    ))
}

return (
    <div className="App">
        <header className="App-header">     
        <div className="kotak">
        <div className="judul">
            <h1>SPOTIFY</h1>
            {token ?
                <form onSubmit={searchArtists}>
                    <input  type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button className="bot1" type={"submit"}>Search</button> 
                </form>

                : <p>Please login your accounts</p>
            }
            <br></br>
            {!token ? (
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                      </a> 
                      ) : (
                  <button className="bot2" onClick={logout}>Logout</button>)} 
     </div>
      </div>
            <div className="konten">
        <div className="KontenLagu">{renderArtists()}</div>
      </div>
        </header>
    </div>
);
}

export default App;
