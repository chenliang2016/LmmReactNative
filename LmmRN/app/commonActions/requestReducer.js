import {REQUEST_END,REQUEST_START}  from './constants'

const initState = {
    loading:false,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_START:
        return Object.assign({},state,{loading:true});
    case REQUEST_END:
        return Object.assign({},state,{loading:false});
    default:
        return state;
  }
};

export default reducer;