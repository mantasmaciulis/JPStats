import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getNewVocabPerWeek } from '../../../apiJPStats';
import more from 'highcharts/highcharts-more';
import HC_more from 'highcharts/highcharts-more'; // In case you need extra features
HC_more(Highcharts);
const WeeklyNewVocab = ({data}) => {
const options = {
chart: {
    type: 'column',
    backgroundColor: '#1A1A1D',  // Dark background
            style: {
                fontFamily: 'Arial'
            }
},
title: {
    text: 'Weekly New Words',
    align: 'left',
    style: {
        color: '#FFFFFF'  // White text
    }
},
subtitle: {
    text:
        'Source: <a target="_blank" ' +
        'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
    align: 'left'
},
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
            color: '#A0A0A3'  // Grey text for axis labels
        }
    },
    lineColor: '#707073',  // Grey axis lines
    minorGridLineColor: '#505053',  // Darker grid lines
    tickColor: '#707073',  // Grey tick marks
},
yAxis: {
    title: {
        text: 'Total Words Known',
        style: {
            color: '#A0A0A3'  // Grey text
        }
    },
    gridLineColor: '#505053',  // Dark grid lines
    labels: {
        style: {
            color: '#E0E0E3'  // Light grey text for labels
        }
    }
},
legend: {
    enabled: false
},
tooltip: {
    valueSuffix: 'words',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',  // Dark tooltip background
            style: {
                color: '#A020F0'  // Bright text for tooltips
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
