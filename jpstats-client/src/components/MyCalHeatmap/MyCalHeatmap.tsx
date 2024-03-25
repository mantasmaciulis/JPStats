import React, {useEffect, useRef, useState} from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';
import LegendLite from "cal-heatmap/plugins/LegendLite";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en";

dayjs.extend(localeData);
dayjs.locale("en");

export default function MyCalHeatmap({timestamps, isAllReviews}) {
    const calRef = useRef<CalHeatmap | null>(null);
    const [sideLength, setSideLength] = useState(0);
    const gutterSize = 4;
    const months = 12; 

    //Cal-Heatmap custom subdomain - so there exist no gaps between days in year.
    //Also, for visuals we round each year to 364 days so each grid is the same
    //size.
    const sameRowDayTemplate = function (DateHelper) {
      return {
        name: 'day_in_year_no_gap',
        parent: 'day',
        rowsCount() {
          return 7
        },
        columnsCount() {
          return 52
        },
        mapping: (startDate, endDate, defaultValues) => {
          const startOfYear = DateHelper.date(new Date(startDate)).startOf('year');
          const dayIntervals = DateHelper.intervals('day', startOfYear, DateHelper.date(endDate));
          
          return dayIntervals.map((timestamp) => {
            const day = DateHelper.date(timestamp);
            const dayOfYear = day.dayOfYear();
            const weekOfYear = Math.ceil(dayOfYear / 7);
            const firstDayOfYear = startOfYear.day();
            const dayOfWeek = (day.day() - firstDayOfYear + 7) % 7;
            
            return {
              t: timestamp, 
              x: weekOfYear - 1,
              y: dayOfWeek, 
              ...defaultValues,
            };
          });
        },
        extractUnit: (timestamp) => {
          return DateHelper.date(timestamp).startOf('day').valueOf();
        },
      };
    };
    

    const updateDimensions = () => {
        const parentDiv = document.getElementById("heatmap");
        const numberOfRows = 7; //7 days in a week
        const numberOfColumns = Math.ceil((months * 30.5) / numberOfRows); 

        const totalGutterWidth = gutterSize * (numberOfColumns - 1);
        if(parentDiv){
            const parentWidth = parentDiv?.offsetWidth;
            const newSideLength = (parentWidth - totalGutterWidth) / numberOfColumns; 
            setSideLength(newSideLength);
        }
    };

    useEffect(() =>{
        updateDimensions();
    },[]);

    useEffect(() => {
        const options = {
          data: { 
            theme: "light",
            defaultValue: null,
            source: timestamps, x: "date", y: "value" },
            verticalOrientation: true,
            range:5,
            animationDuration:0, 
            date: {start: new Date('2020-01-01')},
            scale: {
              color: {
                type: "threshold",
                range: [
                  "#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"
                ],
                domain: [5,20,50,100,200,300,500],
              },
            },
            domain: {
                type: 'year',
                gutter: gutterSize, 
                label: {text: 'YYYY', textAlign: 'middle', position: 'top', height:60},
                padding: [0,0,30,0],
                sort: 'desc'
            },
            //Ths is where our custom domain gets used
            subDomain: {type: 'day_in_year_no_gap', radius: 2, width: sideLength, height: sideLength, gutter: gutterSize},
            legendColors: {
              empty: "#ffffff"
          },
        }


        
        //only create/paint the calendar if the side length has been calculated        
        if(sideLength > 0){
            window.addEventListener('resize', updateDimensions);

            if(calRef.current){
                document.getElementById('cal-heatmap').innerHTML = '';
            }

            const cal = new CalHeatmap();
            cal.addTemplates(sameRowDayTemplate);
            cal.paint(
                options,
                [
                  [
                    Tooltip, {
                      text: function (date, value, dayjsDate) {
                        // Check if value is falsy or exactly 404040404 to display "No"
                        const displayText = (!value) ? "No" : value.toString();
                        return (
                          displayText + " reviews on " + dayjsDate.format("dddd, MMMM D, YYYY")
                        );
                      },
                    },
                  ],
                  [
                    LegendLite,
                    {
                      itemSelector: "#ex-ghDay-legend",
                      radius: 2,
                      width: 15,
                      height: 15,
                      gutter: 4,
                    },
                  ],
                ]
            );
            calRef.current = cal;
    
            //remove event listener when the component unmounts
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, [sideLength, isAllReviews, timestamps]);

    return <div id='cal-heatmap'></div>;
}