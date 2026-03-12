import React from 'react';

function WelcomeCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold mb-1 text-black">Welcome back!</h3>
      <p className="text-gray-600">
        Here's an overview of your hospital network
      </p>
    </div>
  );
}

export default WelcomeCard;