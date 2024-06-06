import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getNewVocabPerWeek } from '../../../apiJPStats';
import more from 'highcharts/highcharts-more';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);
const WeeklyNewVocab = ({data}) => {
const options = {
chart: {
    type: 'column',
    backgroundColor: '#1A1A1D',
            style: {
                fontFamily: 'Arial'
            }
},
title: {
    text: 'Vocabulary Learned per Week',
    align: 'left',
    style: {
        color: '#FFFFFF'
    }
},
//TODO: would be cool if this linked to an explanation or somethign.
// subtitle: {
//     text:
//         'Source: <a target="_blank" ' +
//         'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
//     align: 'left'
// },
xAxis: {
    type: 'datetime',
    title: {
        text: 'week'
    },
    units: [
        ['month', [1, 4]],
        ['year', [1]]
    ],
    labels: {
        style: {
            color: '#A0A0A3'
        }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
},
yAxis: {
    title: {
        text: 'Total Words Known',
        style: {
            color: '#A0A0A3'
        }
    },
    gridLineColor: '#505053',
    labels: {
        style: {
            color: '#E0E0E3'
        }
    }
},
legend: {
    enabled: false
},
tooltip: {
    valueSuffix: 'words',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#A020F0'
            }
},
plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0,
        color: Highcharts.color('#A020F0').setOpacity(0.5).get('rgba')
        
    }
},
series: [
    {
        name: 'New Words',
        data: data,
        color: '#A020F0'

    }
]
};
console.log(data)
return (
    <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
);
};

export default WeeklyNewVocab;
