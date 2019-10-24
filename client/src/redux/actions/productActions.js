// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { setLoadingOn, setLoadingOff } from './globalActions';

//UTILS
// Headers
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
// set body
const getBodyRequest = objToSend => {
    return JSON.stringify(objToSend);
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}
}
//END UTILS

// get an obj with all infos of a item from a specific id
export const getItem = (allProductsList, _id) => {
    const product = allProductsList.find(item => item._id === _id);
    return product;
}


//CRUD PATTERN
// create product
export const addProduct = product => async (dispatch, getState) => {
    const res = await axios.post('/api/products', product, tokenConfig(getState));
    try {
        dispatch({ type: 'ADD_PRODUCT', payload: res.data });
    } catch(err) {
        dispatch(returnErrors(err.response.data, err.response.status));
    }
};

// read / update product
export const getAllProducts = async (dispatch) => {
    // let didCancel = false; //n1
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/products');
        console.log("==GOT ALL PRODUCTS==");
        dispatch({ type: 'GET_ALL_PRODUCTS', payload: res.data });
        // setLoadingOff(dispatch);
        // if(!didCancel) {
        // }
    } catch (err) {
        console.log("getAllProductsError", err);
        dispatch(returnErrors(err.response.data, err.response.status))
        // if(!didCancel) {
        // }
    }
};

// update product
export const changeProduct = async (dispatch, bodyToSend, _idProduct) => {
    const body = getBodyRequest(bodyToSend);
    // Switching obj keys dynamically to update in Reducer
    const targetKey = Object.keys(bodyToSend)[0];
    const dataToUpdate = {
        _id:_idProduct,
        [`${targetKey}`]: bodyToSend[targetKey],
    }
    try {
        const res = axios.put(`/api/products/${_idProduct}`, body, config)
        console.log("==CHANGING PRODUCT==")
        console.log("==CHANGING PRODUCT DATA==", dataToUpdate)
        dispatch({ type: "CHANGE_PRODUCT", payload: dataToUpdate })
    } catch(e) {
        // statements
        console.log(e);
    }
}

// delete product
export const deleteProduct = async (dispatch, _idProduct) => {
    const res = await axios.delete(`/api/products/${_idProduct}`, config);
    try {
        dispatch({ type: 'DELETE_PRODUCT', payload: _idProduct });
    } catch(err) {
        dispatch(returnErrors(err.response.data, err.response.status));
    }
};
//END CRUD PATTERN

export const handleDetail = id => {
    // const product = this.getItem(id);
    // this.setState(() => {
    //     return { detailProduct: product };
    // });
};

export const addToCart = id => {
    const { products, cart } = this.state;
    let tempProducts = [...products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
        () => {
            return {
                products: tempProducts,
                cart: [...cart, product]
            };
        },
        () => {
            this.addTotals();
            this.countItems();
        }
    );
}



// NOTE:
// n1 : Every Effect Hook comes with a clean up function which runs when a component unmounts.
// The clean up function is the one function returned from the hook.
// In our case, we use a boolean flag called didCancel to let our data fetching logic know about the state (mounted/unmounted) of the component.
// If the component did unmount, the flag should be set to true which results in preventing to set the component state after the data fetching has been asynchronously resolved eventually.