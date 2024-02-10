import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const initialState = {
  cartProducts: 0,
};

export const getCartsAsync = (dispatch) => async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userId = user.uid;
      // console.log(userId);
      const userDocRef = doc(collection(db, "user"), userId);
      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const cartCollection = collection(userDocRef, "cart");
          const cartQuerySnapshot = await getDocs(cartCollection);

          // Extract cart items from the query snapshot
          const cartData = cartQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(cartData);
          const totalAmount = cartData.reduce(
            (acc, curr) => acc + curr.amount,
            0
          );
          dispatch(setCartProducts(totalAmount));
          console.log("cartrendere ");
        } else {
          console.log("User document doesn't exist.");
          return [];
        }
      } catch (error) {
        console.error("Error getting user cart data:", error);
        return [];
      }
    } else {
      console.log("User not logged in");
    }
  });
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export const { setCartProducts } = cartslice.actions;

export default cartslice.reducer;
