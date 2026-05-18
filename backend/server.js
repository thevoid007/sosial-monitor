require("dotenv").config();

const {google}=require("googleapis");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/social", (req,res)=>{

res.json([

{
platform:"Facebook",
status:"Aktif",
post:120
},

{
platform:"X",
status:"Aktif",
post:87
},

{
platform:"Instagram",
status:"Aktif",
post:213
},

{
platform:"YouTube",
status:"Aktif",
post:54
},

{
platform:"TikTok",
status:"Aktif",
post:178
}

])

});
app.get("/api/search", (req, res) => {

const keyword=req.query.keyword || "";

const data=[

{
platform:"Facebook",
jumlah:12
},

{
platform:"X",
jumlah:24
},

{
platform:"Instagram",
jumlah:8
},

{
platform:"YouTube",
jumlah:5
},

{
platform:"TikTok",
jumlah:17
}

];

res.json({

keyword:keyword,
hasil:data,
waktu:new Date()

});

});

const youtube=google.youtube({

version:"v3",
auth:process.env.YOUTUBE_API

});

app.get("/api/youtube",async(req,res)=>{

try{

const keyword=req.query.keyword;

const response=
await youtube.search.list({

part:"snippet",
q:keyword,
maxResults:10

});

const hasil=
response.data.items.map(item=>({

judul:item.snippet.title,
channel:item.snippet.channelTitle,
tanggal:item.snippet.publishTime

}));

res.json(hasil);

}

catch(err){

console.log(err);

res.status(500).json({
error:"Gagal mengambil YouTube"
});

}

});
app.listen(PORT,()=>{

console.log(`Server berjalan di port ${PORT}`)

});