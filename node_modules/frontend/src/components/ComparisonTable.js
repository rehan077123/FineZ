import React from 'react';
import { Check, X, Star } from 'lucide-react';

const ComparisonTable = ({ products }) => {
  // Mock products for comparison if none provided
  const comparisonProducts = products || [
    {
      name: "Standard AI Tool",
      price: "$29/mo",
      features: {
        "GPT-4 Access": true,
        "Image Gen": true,
        "API Access": false,
        "Custom Models": false,
        "Priority Support": false
      },
      rating: 4.2
    },
    {
      name: "FineZ Pro Suite",
      price: "$49/mo",
      features: {
        "GPT-4 Access": true,
        "Image Gen": true,
        "API Access": true,
        "Custom Models": true,
        "Priority Support": true
      },
      rating: 4.9,
      recommended: true
    },
    {
      name: "Enterprise Hub",
      price: "$199/mo",
      features: {
        "GPT-4 Access": true,
        "Image Gen": true,
        "API Access": true,
        "Custom Models": true,
        "Priority Support": true
      },
      rating: 4.7
    }
  ];

  const featureKeys = Object.keys(comparisonProducts[0].features);

  return (
    <div className="my-16 overflow-x-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Detailed Comparison</h2>
        <p className="text-gray-400">See how our featured tools stack up against the competition.</p>
      </div>

      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="p-4 bg-white/5 border-b border-white/10 text-left text-gray-400 font-semibold min-w-[200px]">Features</th>
            {comparisonProducts.map((p, i) => (
              <th key={i} className={`p-6 border-b border-white/10 min-w-[200px] ${p.recommended ? 'bg-blue-600/10' : 'bg-white/5'}`}>
                {p.recommended && (
                  <span className="block text-[10px] font-bold text-blue-400 uppercase mb-2">Best Value</span>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-blue-400 font-bold">{p.price}</p>
                <div className="flex items-center justify-center mt-2 text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs ml-1 font-semibold">{p.rating}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureKeys.map((feature, i) => (
            <tr key={i} className="group hover:bg-white/5 transition-colors">
              <td className="p-4 border-b border-white/5 text-left text-gray-300 font-medium">{feature}</td>
              {comparisonProducts.map((p, j) => (
                <td key={j} className={`p-4 border-b border-white/5 ${p.recommended ? 'bg-blue-600/5' : ''}`}>
                  {p.features[feature] ? (
                    <Check className="mx-auto text-green-500" size={20} />
                  ) : (
                    <X className="mx-auto text-red-500/50" size={20} />
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-6"></td>
            {comparisonProducts.map((p, i) => (
              <td key={i} className={`p-6 ${p.recommended ? 'bg-blue-600/10' : 'bg-white/5'}`}>
                <button className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${
                  p.recommended 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  {p.recommended ? 'Get Started Pro' : 'Choose Plan'}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
