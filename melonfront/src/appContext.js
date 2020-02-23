import React from 'react';


export const appsetup = {
    number : 0,
    login: false
}

// const getMelondata = () =>{
//    if (localStorage.getItem('melondata') !== null) {
//        return localStorage.getItem('melondata');
//    }else{
//        return null;
//    }
// }

export const AppContext = React.createContext({
    number : 0,
    login: false,
    loginErrors: '',
    melondata: localStorage.getItem('melondata')
});
