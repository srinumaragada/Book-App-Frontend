import React from 'react';
import { useGetBookByEmailQuery } from '../redux/Slice/ordersApi';
import { useAuth } from '../../context/AuthContext';

function Orders() {
  const { currentUser } = useAuth();

  const { data = {}, isLoading, error } = useGetBookByEmailQuery(currentUser?.email);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading orders.</h1>;
  }

  const orders = data.order || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div>No Orders Found</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-medium mb-2">Order #{index + 1}</h3>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <div>
                <strong>Address:</strong>
                <ul className="ml-4">
                  <li>City: {order.address.city}</li>
                  <li>State: {order.address.state}</li>
                  <li>Country: {order.address.country}</li>
                  <li>Zipcode: {order.address.zipcode}</li>
                </ul>
              </div>
              <div className="mt-3">
                <strong>Product IDs:</strong>
                <ul className="ml-4 list-disc">
                  {order.ProductId.map((productId, idx) => (
                    <li key={idx}>{productId}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
