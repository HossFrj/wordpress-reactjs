export const load = (state=false , action) =>{
    switch (action.type){
        case "LOADER":
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