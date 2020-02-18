import React from 'react';
import { Alert } from 'react-bootstrap';

/*
Check Varibla
*/
export const CheckVaribla = (value, cform = false) => {
    if (typeof (value) !== 'undefined' || value != null) {
        return value;
    } else {
        if (cform === false) {
            return '--';
        }
        return '';
    }
}

/*
Empty InitialContact
*/

const emptyValue = {
    address: '',
    email: '',
    first_name: '',
    id: '',
    last_name: '',
    phone: '',
}

const templetValue = {
    address: '27-59 55 Street Apt 5F Astoria, NY 11105',
    email: 'your@email.com',
    first_name: 'Jon',
    id: '',
    last_name: 'Jonson',
    phone: '(555) 5555-2525',
}

const emptyValue2 = {
    address: '',
    email: '',
    first_name: '',
    id: '',
    last_name: '',
    phone: {
        number: '',
        ext: ''
    },
}

const templetValue2 = {
    address: '27-59 55 Street Apt 5F Astoria, NY 11105',
    email: 'your@email.com',
    first_name: 'Jon',
    id: '',
    last_name: 'Jonson',
    phone: {
        number: '(555) 5555-2525',
        ext: ''
    }
}

export const InitialContact = (value = 'empty') => {
    if (value === 'templet') {
        return templetValue;
    } else {
        return emptyValue;
    }
}

export const InitialContact2 = (value = 'empty') => {
    if (value === 'templet') {
        return templetValue2;
    } else {
        return emptyValue2;
    }
}


export function formatPhoneforRead(contactdata = emptyValue2) {
    console.log(contactdata);
    
    let str = contactdata.phone;
    if (str === null || str === undefined)
        str = '';
    str = str.trim();
    var res = str.split(",");
    var phone = {
        number: res[0],
        ext: res.length > 1 ? res[1].replace(/([^0-9])\D+/g, "") : ''
    }
    let contactd = {
        id: contactdata.id,
        address: contactdata.address,
        email: contactdata.email,
        first_name: contactdata.first_name,
        last_name: contactdata.last_name,
        phone: phone,
    }

    return contactd;
}

/************************
 * 
 */
export const Message = (props) => {
    return <Alert variant={props.type}>{props.text}</Alert>;
}

/*******************************
 * 
 */

export function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
export var getParams = function (url) {
    if (url !== '' && url !== null && (typeof url === 'string' || url instanceof String)) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }
    return false
};
