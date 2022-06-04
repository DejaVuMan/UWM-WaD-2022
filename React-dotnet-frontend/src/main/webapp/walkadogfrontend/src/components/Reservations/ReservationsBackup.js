import React from 'react';
import { Datepicker, Page, getJson, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

setOptions({
    theme: 'material',
    themeVariant: 'dark'
});

function ReservationsBackup() {
    const min = '2022-06-04T00:00';
    const max = '2022-12-04T00:00';
    const [datetimeLabels, setDatetimeLabels] = React.useState([]);
    const [datetimeInvalid, setDatetimeInvalid] = React.useState([]);
    
    const onPageLoadingDatetime = React.useCallback((event, inst) => {
        getDatetimes(event.firstDay, (bookings) => {
            setDatetimeLabels(bookings.labels);
            setDatetimeInvalid(bookings.invalid);
        });
    }, []);
    
    const getDatetimes = (d, callback) => {
        let invalid = [];
        let labels = [];

        getJson('https://trial.mobiscroll.com/getbookingtime/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (let i = 0; i < bookings.length; ++i) {
                const booking = bookings[i];
                const bDate = new Date(booking.d);

                if (booking.nr > 0) {
                    labels.push({
                        start: bDate,
                        title: booking.nr + ' SPOTS',
                        textColor: '#e1528f'
                    });
                    invalid = [...invalid, ...booking.invalid];
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels: labels, invalid: invalid });
        }, 'jsonp');
    }

    return (
        <Page className="md-calendar-booking">
            <div className="mbsc-form-group">
                <Datepicker 
                    display="center"
                    controls={['calendar', 'timegrid']}
                    min={min}
                    max={max}
                    minTime="08:00"
                    maxTime="19:59"
                    stepMinute={60}
                    width={null}
                    labels={datetimeLabels}
                    invalid={datetimeInvalid}
                    onPageLoading={onPageLoadingDatetime}
                    cssClass="booking-datetime"
                />
            </div>
        </Page>
    );
}
 
export default ReservationsBackup;