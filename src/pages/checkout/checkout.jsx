import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../redux/Slice/ordersApi";
import swal from 'sweetalert';

const initialState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  billing_same: false,
};

function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.newPrice, 0)
    .toFixed(2);
  const navigate=useNavigate()
  const [formData, setFormData] = useState(initialState);
  const { name, phone, country, address, city, state, zipcode, billing_same } = formData;
  const { currentUser } = useAuth();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      name,
      email: currentUser.email,
      phone,
      address: {
        city,
        state,
        zipcode,
        country,
      },
      ProductId: cartItems.map((item) => item._id),
      totalAmount
    };

    try {
      await createOrder(newOrder).unwrap();
      swal("Great!", "Order added Successfully!", "success");
    } catch (error) {
      swal("Order Failed");
    }
    navigate("/orders")
    console.log(newOrder);
    
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
        <p className="text-gray-500 mb-2">Total Price: ${totalAmount}</p>
        <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
          >
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    id="name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser?.email}
                    readOnly
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    id="phone"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="+123 456 7890"
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    id="address"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    id="city"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country">Country / Region</label>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    id="country"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={handleChange}
                    id="state"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    name="zipcode"
                    value={zipcode}
                    onChange={handleChange}
                    id="zipcode"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div className="md:col-span-5 mt-3">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      checked={billing_same}
                      onChange={handleChange}
                      id="billing_same"
                      className="form-checkbox"
                    />
                    <label htmlFor="billing_same" className="ml-2">
                      I agree to the{" "}
                      <Link className="underline text-blue-600">Terms & Conditions</Link>{" "}
                      and{" "}
                      <Link className="underline text-blue-600">Shopping Policy</Link>.
                    </label>
                  </div>
                </div>

                <div className="md:col-span-5 text-right">
                  <button
                    type="submit"
                    disabled={!billing_same || isLoading}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      !billing_same ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {isLoading ? "Placing Order..." : "Place an Order"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {error && (
            <p className="text-red-600 text-center mt-4">Failed to place order. Fill all details or Try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
