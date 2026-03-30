import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X, AlertCircle, CheckCircle } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export default function PurchaseModal({ product, isOpen, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null

  const totalPrice = (product?.price || 0) * quantity;

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      onClose();
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("success");
        setTimeout(() => {
          onClose();
          navigate("/account");
        }, 2000);
      } else {
        const error = await response.json();
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E293B] border border-slate-700 rounded-lg max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Purchase Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Info */}
          {product && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">{product.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per unit:</span>
                  <span className="text-white font-semibold">
                    ${(product.price || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold">Purchase Successful!</p>
                <p className="text-green-400/80 text-sm">
                  Redirecting to your account...
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold">Purchase Failed</p>
                <p className="text-red-400/80 text-sm">
                  Please try again or contact support
                </p>
              </div>
            </div>
          )}

          {/* Quantity */}
          {!status && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg w-24">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-400 hover:text-white transition"
                >
                  −
                </button>
                <span className="text-white font-semibold flex-1 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-400 hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Total */}
          {!status && (
            <div className="p-4 bg-slate-800 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Login Note */}
          {!isAuthenticated && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
              <p className="text-blue-400 text-sm">
                You need to login to purchase. Click the button below to continue.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={loading || status === "success"}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : isAuthenticated
                ? "Complete Purchase"
                : "Login to Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}
