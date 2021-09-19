function formatDate(iso_datestring, alternate_string) {
    let _date = new Date(iso_datestring);
    if(!isNaN(_date.getTime()) & _date.getFullYear() > 1970) {
        let _hourString = _date.getHour < 12 ? 'Morning' : (_date.getHour > 20 ? 'Evening' : 'Afternoon');
        return _hourString + ", " + _date.getFullYear() + "-" + _date.getMonth() + "-" + _date.getDate();
    } else {
        return alternate_string ? alternate_string : "Some time...";
    }
    
}

export { formatDate };