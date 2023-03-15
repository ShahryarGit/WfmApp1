// import Timeline from 'react-native-timeline-flatlist'
// import Timeline from "react-native-beautiful-timeline";
import React, { useState, useEffect } from 'react';
// import moment from "react-moment";
import moment from "moment";
import {
  View, TextInput, TouchableOpacity,
  Text
} from 'react-native';
const Schedule = () => {
    //   const data= [
    //     {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    //     {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    //     {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    //     {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    //     {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    //   ]
    const data = [
        {
          "date": 1574342522000,
          "data": [
            {
              "title": "React Native Beautiful Timeline",
              "subtitle": "Sed at justo eros. Phasellus.",
              "date": 1574342522000
            },
            {
              "title": "React Native",
              "subtitle": "Sed viverra. Nam sagittis.",
              "date": 1574342501000
            }
          ]
        },
        {
          "date": 1574248261000,
          "data": [
            {
              "title": "Timeline",
              "subtitle": "Morbi magna orci, consequat in.",
              "date": 1574248261000
            }
          ]
        },
        {
          "date": 1574125621000,
          "data": [
            {
              "title": "Beauty Timeline",
              "subtitle": "Nulla a eleifend urna. Morbi. Praesent.",
              "date": 1574125621000
            }
          ]
        }
      ]

    // const [date] = useState(new Date());

    // /**
    //  * If you would like to have multiple columns (e.g. from Monday to Sunday),
    //  * you can specify range of dates. Each day of said range will have its own column.
    //  *
    //  * 'from' and 'till', just like 'date', can be instances of Date or an ISO strings.
    //  *
    //  * It is safe to keep 'from' and 'till' in separate states if you need to
    //  * because Timetable only check if 'from' or 'till' had changed and
    //  * not the object that contains them.
    //  */
    // const [from] = useState(moment().subtract(3, 'days').toDate());
    // const [till] = useState(moment().add(3, 'days').toISOString());
    // const range = { from, till };

    // const [items] = useState([
    //     {
    //         title: 'Some event',
    //         startDate: moment().subtract(1, 'hour').toDate(),
    //         endDate: moment().add(1, 'hour').toDate(),
    //     },
    // ]);
    return (
      <Text>Test1</Text>
        // <Timeline
        //       data={data}
        // />
        // <ScrollView>
        //     <Timetable
        //         // these two are required
        //         items={items}
        //         cardComponent={MyItemCard}

        //         // provide only one of these if you need to
        //         date={date} // optional
        //         range={range} // optional
        //     />
        // </ScrollView>
    );
};

export default Schedule;
