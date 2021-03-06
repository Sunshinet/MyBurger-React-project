import * as actionTypes from '../actions/actionsTypes';
const initialSate = {
    orders: [],
    loading: false
}
const reducer = (state= initialSate, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        return {
            ...state, 
            loading: false,
            orders: state.orders.concat(newOrder)
        };
        case actionTypes.PURCHASE_BURGER_FAIL:
        return {
            ...state,
            loading: false
        };
        default:
        return state;
    }
}

export default reducer;