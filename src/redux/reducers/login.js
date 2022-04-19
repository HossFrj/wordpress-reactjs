export const login = (state=false , action) =>{
    switch (action.type){
        case "LOGIN":
            // without payload
            // state = !state
            // with payload
            state = action.payload
            // console.log(state , 'is load reducer !')
            return state;
        default:
            return state;
    }
}  