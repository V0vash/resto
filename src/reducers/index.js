
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items:[],
    totalPrice: 0,
    sended: false,
}


const reducer = (state = initialState, action) => {
    console.log(state);
    switch(action.type){
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            }
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            }
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true
            }
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            
            const itemIdx = state.items.findIndex(item => item.id === id);
            if(itemIdx >= 0){
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    quantity: ++itemInState.quantity
                };
                return{
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIdx),
                        newItem,
                        ...state.items.slice(itemIdx+1)
                    ],
                    totalPrice: state.totalPrice + newItem.price,
                }
            }
            //first order
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                quantity: 1
            };
            return{
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price,
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return{
                ...state,
                items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex+1)
                ],
                totalPrice: state.totalPrice - state.items[itemIndex].price * state.items[itemIndex].quantity
            }
        case 'CLEAR_CART':
            return{
                ...state,
                items: [],
                totalPrice: 0,
                sended: true
            }
        default:
            return state;
    }
}

export default reducer;