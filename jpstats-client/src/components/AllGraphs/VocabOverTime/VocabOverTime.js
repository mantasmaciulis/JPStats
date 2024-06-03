import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getNewVocabOverTime } from '../../../apiJPStats';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);
const VocabOverTime = ({data}) => {
    const options = {
        chart: {
            type: 'area',
            zoomType: 'x',
            backgroundColor: '#1A1A1D',
            style: {
                fontFamily: 'Arial'
            }
        },
        title: {
            text: 'Total Words Known Over Time',
            align: 'left',
            style: {
                color: '#FFFFFF' 
            }
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
            align: 'left',
            style: {
                color: '#CCCCCC'
            }
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            },
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
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#A020F0'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0, y1: 0, x2: 0, y2: 1
                    },
                    stops: [
                        [0, Highcharts.color('#A020F0').setOpacity(0.5).get('rgba')],
                        [1, Highcharts.color('#A020F0').setOpacity(0.5).get('rgba')]                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            name: 'Total Words Known',
            data: data,
            color: '#A020F0'
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default VocabOverTime;
