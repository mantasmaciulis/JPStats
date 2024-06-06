import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

// Utility function to calculate rolling average
const calculateRollingAverage = (data, windowSize) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const windowStart = Math.max(0, i - windowSize + 1);
        const windowEnd = i + 1;
        const windowData = data.slice(windowStart, windowEnd);
        const windowAverage = windowData.reduce((sum, value) => sum + value[1], 0) / windowData.length;
        result.push([data[i][0], windowAverage]);
    }
    return result;
};

const Retention = ({ data }) => {
    const windowSize = 7;
    const smoothedData = data.map(series => ({
        ...series,
        data: calculateRollingAverage(series.data, windowSize)
    }));

    const options = {
        chart: {
            type: "line",
            backgroundColor: '#1A1A1D',
            style: {
                fontFamily: 'Arial'
            }
        },
        title: {
            text: `Retention Rate`,
            align: 'left',
            style: {
                color: '#FFFFFF'
            }
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Retention %',
                style: {
                    color: '#A0A0A3'
                }
            },
            gridLineColor: '#505053',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
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
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b><br/>'        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            },
            line: {
                marker: {
                    enabled: false
                }
            }
        },
        series: smoothedData
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

export default Retention;
