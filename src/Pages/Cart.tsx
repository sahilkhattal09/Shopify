import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartContainer from "../Components/UI/Containers/CartContainer";
import Header from "../Components/UI/Header/Header";
import Button from "../Components/UI/Button/Button";
import { RootState } from "../app/store/store";

export default function Cart() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const cartItems: any[] = [];

  return (
    <>
      <Header
        className="fixed top-0 left-0 right-0 z-10"
        showHamburger={isLoggedIn}
      />

      <div className="mt-32">
        <CartContainer>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow">
              <div className="text-xl font-semibold mb-3">Cart is Empty</div>
              <div className="text-gray-600 mb-4">
                {isLoggedIn
                  ? "You have no items in your cart."
                  : "Login to check your previously saved cart items."}
              </div>

              {!isLoggedIn && (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Login
                </button>
              )}
            </div>
          ) : (
            <div className="flex justify-evenly gap-4">
              <div className="w-2/3 p-4 bg-gray-100 rounded-lg shadow">
                <div className="text-2xl font-bold mb-4">Cart Items</div>
                {cartItems.map((item: any) => (
                  <div key={item.id} className="border-b py-2">
                    {item.name} - ${item.price}
                  </div>
                ))}
              </div>

              <div className="w-1/3 flex flex-col gap-4">
                <div className="p-4 bg-gray-200 rounded-lg shadow">
                  <div className="text-xl font-bold mb-2">Apply Coupons</div>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full p-2 border rounded"
                  />
                  <Button className="mt-3 w-full bg-blue-500 text-white p-2 rounded">
                    Apply
                  </Button>
                </div>

                <div className="p-4 bg-gray-300 rounded-lg shadow mt-6">
                  <div className="text-xl font-bold mb-2">Total Amount</div>
                  <div className="text-2xl font-semibold">
                    $
                    {cartItems
                      .reduce(
                        (total: number, item: any) => total + item.price,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CartContainer>
      </div>
    </>
  );
}
