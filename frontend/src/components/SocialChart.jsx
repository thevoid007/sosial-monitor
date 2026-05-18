import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function SocialChart({data}){

const chartData={

labels:data.map(item=>item.platform),

datasets:[

{
label:"Jumlah Monitoring",

data:data.map(item=>item.jumlah)

}

]

};

return(

<div style={{width:"700px"}}>

<Bar data={chartData}/>

</div>

)

}

export default SocialChart;