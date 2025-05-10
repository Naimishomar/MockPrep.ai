import React from 'react';

const plans = [
  {
    title: 'Monthly',
    price: '₹1',
    amount: 1,
    duration: 'per month',
    features: ['5 Mock per day', 'Basic Feedback', 'Email Support'],
    popular: false,
  },
  {
    title: 'Half-Yearly',
    price: '₹249',
    amount: 249,
    duration: 'every 6 months',
    features: ['10 Mocks per day', 'Detailed Feedback', 'Priority Support'],
    popular: true,
  },
  {
    title: 'Annually',
    price: '₹499',
    amount: 499,
    duration: 'per year',
    features: ['Unlimited Mocks', 'AI Feedback', '24/7 Support'],
    popular: false,
  },
];

export default function SubscriptionPlans() {

  const handlePayment = async (plan) => {
    try {
      const response = await fetch('http://localhost:8000/api/payment/create-order', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          amount: plan.amount,
          currency: 'INR',
          receipt: `receipt_${plan.title}_${Date.now()}`,
        }),
      });
      const data = await response.json();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'MockPrep',
        description: `${plan.title} Subscription`,
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await fetch('http://localhost:8000/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan.title,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert(`✅ Payment for ${plan.title} verified successfully!`);
          } else {
            alert('❌ Payment verification failed.');
          }
        },
        theme: {
          color: '#4f46e5',
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black py-10 px-4 mt-15">
      <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the plan that works best for your needs. Upgrade or downgrade at any time.
          </p>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className={`relative rounded-2xl shadow-lg p-6 bg-white hover:scale-105 transition-transform duration-300 ${plan.popular ? 'border-4 border-indigo-500' : ''}`}>
            {plan.popular && (
              <span className="absolute top-0 right-0 m-3 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button onClick={()=>handlePayment(plan)} className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
