import {createSlice} from "@reduxjs/toolkit";
import courseItems from "../courseItems";


const initialState = {
    cardItems: courseItems,
    quantity: 5,
    total:0
}

const cardSlice = createSlice({
    name:   "card",
    //kontrol edeceğim state, sonra reducer, 
    // reducerlar statele ilgili işlemleri yapacak
    //reducerların içinde arttırma azaltma gibi işlemler olcak
    initialState,
    reducers: {
        // clearcard a ulaşmak için önce dışarı açıp sonra dispatch edicem
        clearCard : (state) => {
            state.cardItems = [];
        },
        //aiağıda hem state i günceleyoruz hemde neyi silceğimi bilmem için id vericem dolayısıyla action ı da veriyorum
        removeItem : (state, action) => {
            // console.log(action.payload)
            // burda payload denilen biizm datamızdır payload bize id yi erir
            const itemId = action.payload;
            state.cardItems = state.cardItems.filter((item)=> item.id !== itemId)
        },
        increase : (state, action) => {
            //göndermiş old action.payload daki id değeri yle göderdiğim id değeri eşitse bunu değişkene atıyoum
           const cardItem= state.cardItems.find((item)=> item.id === action.payload)
            cardItem.quantity += 1;
        },
        decrease : (state, action) => {
           const cardItem= state.cardItems.find((item)=> item.id === action.payload)
            cardItem.quantity -= 1;
        },
        calculateTotal : (state) => {
            let total = 0;
            let quantity = 0;
           state.cardItems.forEach((item)=> {
            total += item.quantity*item.price;
            quantity += item.quantity; 
           });
           state.quantity = quantity;
           state.total = total;
        },
    },
});


export const {clearCard, removeItem, increase, decrease,calculateTotal} = cardSlice.actions;


export default cardSlice.reducer;