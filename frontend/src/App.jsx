import { useState } from "react";
import axios from "axios";
import SocialChart from "./components/SocialChart";

function App(){

const [keyword,setKeyword]=useState("");
const [hasil,setHasil]=useState(null);
const [youtube,setYoutube]=useState([]);

const cariData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search?keyword=${keyword}`);
    setHasil(response.data);
  } catch (err) {
    console.log(err);
  }
};

const cariYoutube = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/youtube?keyword=${keyword}`);
    setYoutube(response.data);
  } catch (err) {
    console.log(err);
  }
};

const handleCari = () => {
  cariData();
  cariYoutube();
};

return (

<div style={{padding:"20px"}}>

<h1>📊 Social Media Monitoring</h1>

<input
type="text"
placeholder="Masukkan keyword..."
value={keyword}
onChange={(e)=>setKeyword(e.target.value)}
/>

<button onClick={handleCari}>
Cari
</button>

{hasil && (

<div>

<h2>
Keyword: {hasil.keyword}
</h2>

{hasil.hasil.map((item,index)=>(

<div
key={index}
style={{
border:"1px solid gray",
padding:"10px",
margin:"10px"
}}
>

<h3>{item.platform}</h3>

<p>Jumlah: {item.jumlah}</p>

</div>

))}

<SocialChart data={hasil.hasil} />

<p>
Update:
{new Date(hasil.waktu).toLocaleString()}
</p>

</div>

)}

      <h2>Video YouTube</h2>

      {youtube.map((video,index)=>(

        <div
          key={index}
          style={{
            border:"1px solid gray",
            padding:"10px",
            margin:"10px"
          }}
        >

          <h4>{video.judul}</h4>

          <p>{video.channel}</p>

          <p>{video.tanggal}</p>

        </div>

      ))}

    </div>
  )
}

export default App;