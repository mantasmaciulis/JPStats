import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

const VocabByLevelArea = ({ data, type }) => {
    const options = {
        chart: {
            type: type,
            backgroundColor: '#1A1A1D',
            style: {
                fontFamily: 'Arial'
            }
        },
        title: {
            text: `Vocabulary Count by Memory Level`,
            align: 'left',
            style: {
                color: '#FFFFFF' 
            }
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Vocabulary Count',
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
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
        },
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
        series: data
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

export default VocabByLevelArea;
