import React, { useState } from "react";
import {
  CreditCard,
  Landmark,
  Wallet,
  QrCode,
  ChevronRight,
  HandCoins,
} from "lucide-react";

const PaymentPage = () => {
  const [selected, setSelected] = useState("");

  const paymentOptions = [
    { id: "upi", label: "Pay by UPI ID", icon: <QrCode size={18} /> },
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: <CreditCard size={18} />,
    },
    { id: "wallet", label: "Wallets", icon: <Wallet size={18} /> },
    { id: "netbanking", label: "Net Banking", icon: <Landmark size={18} /> },
    { id: "cod", label: "Cash on Delivery", icon: <HandCoins size={18} /> },
  ];

  const renderPaymentFields = () => {
    switch (selected) {
      case "upi":
        return (
          <div className="space-y-3">
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select Wallet</option>
              <option>Paytm</option>
              <option>PhonePe</option>
              <option>Amazon Pay</option>
              <option>BHIM</option>
            </select>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg ">
              Verify & Pay
            </button>
          </div>
        );

      case "card":
        return (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full border rounded-lg px-4 py-2"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 border rounded-lg px-4 py-2"
              />
            </div>

            <button className="w-full bg-orange-500 text-white py-2 rounded-lg ">
              Pay Now
            </button>
          </div>
        );

      case "wallet":
        return (
          <div className="space-y-3">
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select Wallet</option>
              <option>Paytm</option>
              <option>PhonePe</option>
              <option>Amazon Pay</option>
            </select>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg ">
              Continue
            </button>
          </div>
        );

      case "netbanking":
        return (
          <div className="space-y-3">
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
              Proceed to Bank
            </button>
          </div>
        );

      case "cod":
        return (
          <div className="space-y-3">
            <p className="text-gray-600">
              You will pay in cash at the time of delivery.
            </p>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
              Confirm Order
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm border divide-y">
            {paymentOptions.map((option) => (
              <div key={option.id}>
                <div
                  onClick={() => setSelected(option.id)}
                  className={`flex items-center justify-between p-5 cursor-pointer transition ${
                    selected === option.id ? "" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-orange-400">{option.icon}</div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>

                {selected === option.id && (
                  <div className="px-5 pb-5">{renderPaymentFields()}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
