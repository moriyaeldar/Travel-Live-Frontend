import React from 'react';
import { Pie } from 'react-chartjs-2';



export const HostCharts = () => {

    const data = {
        labels: ['✭', '✭✭', '✭✭✭','✭✭✭✭','✭✭✭✭✭'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 5, 70, 50],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(55, 206, 86, 0.2)',
                    'rgba(155, 206, 86, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(55, 206, 86, 0.2)',
                    'rgba(155, 206, 86, 0.2)'

                ],
                borderWidth: 3
            },
        ],
    };


    return (
<div className='host-charts' style={{width:'100%'}} >

        <Pie data={data}/>
</div>
    )
};

