"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

const REPORT_TYPES = {
  "Basic Measurement": { base: 50, description: "Basic roof measurements" },
  "Detailed Report": {
    base: 100,
    description: "Comprehensive measurements with diagrams",
  },
  "Premium Analysis": {
    base: 150,
    description: "Detailed analysis with material estimates",
  },
};

const SERVICE_TIERS = {
  Standard: { multiplier: 1, turnaround: "3-5 business days" },
  Express: { multiplier: 1.5, turnaround: "1-2 business days" },
  Rush: { multiplier: 2, turnaround: "24 hours" },
};

export default function OrderPage() {
  const { data: user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    property_address: "",
    property_city: "",
    property_state: "",
    property_zip: "",
    report_type: "Basic Measurement",
    service_tier: "Standard",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);

          if (data.user?.user_type === "admin") {
            window.location.href = "/admin";
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchProfile();
    }
  }, [user, userLoading]);

  const calculatePrice = () => {
    const basePrice = REPORT_TYPES[formData.report_type].base;
    const multiplier = SERVICE_TIERS[formData.service_tier].multiplier;
    return (basePrice * multiplier).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const price = calculatePrice();

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(price),
          paypal_transaction_id: null, // Will be updated after PayPal payment
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // In a real implementation, you would redirect to PayPal here
        // For now, we'll just redirect to the client portal
        alert(
          "Order created successfully! In production, you would be redirected to PayPal for payment.",
        );
        window.location.href = "/client";
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-[#64748B]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/account/signin";
    }
    return null;
  }

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1E40AF] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1E293B]">
                  Remote Roofers
                </h1>
                <p className="text-sm text-[#64748B]">Create New Order</p>
              </div>
            </div>
            <a
              href="/client"
              className="text-[#64748B] hover:text-[#1E293B] font-medium text-sm"
            >
              ← Back to Portal
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6"
            >
              <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
                Order Details
              </h2>

              <div className="space-y-5">
                {/* Property Address */}
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">
                    Property Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.property_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_address: e.target.value,
                      })
                    }
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.property_city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          property_city: e.target.value,
                        })
                      }
                      placeholder="City"
                      className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.property_state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          property_state: e.target.value,
                        })
                      }
                      placeholder="State"
                      className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.property_zip}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          property_zip: e.target.value,
                        })
                      }
                      placeholder="12345"
                      className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B]"
                    />
                  </div>
                </div>

                {/* Report Type */}
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">
                    Report Type *
                  </label>
                  <div className="space-y-3">
                    {Object.entries(REPORT_TYPES).map(([type, details]) => (
                      <label
                        key={type}
                        className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-[#3B82F6] transition-colors"
                        style={{
                          borderColor:
                            formData.report_type === type
                              ? "#3B82F6"
                              : "#E2E8F0",
                        }}
                      >
                        <input
                          type="radio"
                          name="report_type"
                          value={type}
                          checked={formData.report_type === type}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              report_type: e.target.value,
                            })
                          }
                          className="mt-1 text-[#3B82F6] focus:ring-[#3B82F6]"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-[#1E293B]">
                            {type}
                          </div>
                          <div className="text-sm text-[#64748B]">
                            {details.description}
                          </div>
                          <div className="text-sm font-semibold text-[#3B82F6] mt-1">
                            ${details.base}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Tier */}
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">
                    Service Tier *
                  </label>
                  <div className="space-y-3">
                    {Object.entries(SERVICE_TIERS).map(([tier, details]) => (
                      <label
                        key={tier}
                        className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:border-[#3B82F6] transition-colors"
                        style={{
                          borderColor:
                            formData.service_tier === tier
                              ? "#3B82F6"
                              : "#E2E8F0",
                        }}
                      >
                        <input
                          type="radio"
                          name="service_tier"
                          value={tier}
                          checked={formData.service_tier === tier}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service_tier: e.target.value,
                            })
                          }
                          className="mt-1 text-[#3B82F6] focus:ring-[#3B82F6]"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-[#1E293B]">
                              {tier}
                            </div>
                            <div className="text-sm font-semibold text-[#3B82F6]">
                              {details.multiplier > 1
                                ? `${details.multiplier}x`
                                : "Base price"}
                            </div>
                          </div>
                          <div className="text-sm text-[#64748B]">
                            Turnaround: {details.turnaround}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6 sticky top-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Report Type:</span>
                  <span className="text-[#1E293B] font-medium">
                    {formData.report_type}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Service Tier:</span>
                  <span className="text-[#1E293B] font-medium">
                    {formData.service_tier}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Base Price:</span>
                  <span className="text-[#1E293B]">
                    ${REPORT_TYPES[formData.report_type].base}
                  </span>
                </div>
                {SERVICE_TIERS[formData.service_tier].multiplier > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Tier Multiplier:</span>
                    <span className="text-[#1E293B]">
                      {SERVICE_TIERS[formData.service_tier].multiplier}x
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#E2E8F0] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#1E293B]">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-[#1E40AF]">
                    ${price}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !formData.property_address}
                className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {submitting ? "Creating Order..." : "Proceed to Payment"}
              </button>

              <p className="text-xs text-center text-[#64748B]">
                By proceeding, you agree to our terms of service
              </p>

              <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                <p className="text-xs text-[#64748B] mb-2">We accept:</p>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs font-medium text-[#475569]">
                    PayPal
                  </div>
                  <div className="px-3 py-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs font-medium text-[#475569]">
                    Credit Card
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



