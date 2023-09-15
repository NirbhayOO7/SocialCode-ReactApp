export * from './constants';

export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Can not store in LS')
    }

    const valueToStore = typeof (value) !== 'string' ? JSON.stringify(value) : value;
    // console.log('key: ', key, 'value: ', valueToStore);
    localStorage.setItem(key, valueToStore);
}

export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not get token from LS')
    }

    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can not get token from LS')
    }

    return localStorage.removeItem(key);
}

export const getFormBody = (params) => {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property);        // this function will encoded the key of object params for eg. 'user name' input field in login form to 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); // similarly as above the value of input filed 'user name' will be encoded for eg. 'nirhhay OO7' = 'nirbhay%2020OO7'

        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join('&');  //'user%20name=nirbhay%2020OO7&password=dfd39ruf930'
};