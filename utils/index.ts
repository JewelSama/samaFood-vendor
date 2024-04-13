import dayjs from "dayjs";

export function numberWithCommas(x = 0){
    return x === null ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isEmpty(x = ''){
    return x?.length < 1;
}

export function dateFormatter(x = ''){
    return x === null ? '' : dayjs(x).format('dddd DD MMMM YYYY');
}

export function dateTimeFormatter(x = ''){
    return x === null ? '' : dayjs(x).format('dddd DD MMMM YYYY @ hh:mm A');
}