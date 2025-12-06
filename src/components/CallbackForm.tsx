"use client";

import React, { useState } from "react";
import { Phone, User, MapPin, X, Loader2 } from "lucide-react";
import { leadService, LeadSubmission } from "@/lib/services/leadService";

interface CallbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  prefillLocation?: string;
  gymId?: number;
}

export default function CallbackForm({
  isOpen,
  onClose,
  prefillLocation,
  gymId,
}: CallbackFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    preferredLocation: prefillLocation || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const gymLocations = [
    "Electronic City, Bengaluru",
    "Marathahalli, Bengaluru",
    "Brookefield, Bengaluru",
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const submissionData: LeadSubmission = {
        name: formData.name,
        phone: formData.phoneNumber,
        location: formData.preferredLocation,
        source: "callback-form",
        interest: `Gym membership inquiry for ${formData.preferredLocation}`,
        gymId: gymId ?? null,
      };

      const result = await leadService.submitLead(submissionData);

      if (result.success) {
        setSubmitMessage("Thank you! We'll call you back within 24 hours.");
        setFormData({
          name: "",
          phoneNumber: "",
          preferredLocation: prefillLocation || "",
        });

        setTimeout(() => {
          onClose();
          setSubmitMessage("");
        }, 1400);
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-semibold">Request Callback</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-sm text-slate-600 mb-4">
            Fill out the form below and we'll call you back within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  required
                  disabled={isSubmitting}
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Location *</label>
              {prefillLocation ? (
                <div className="p-3 bg-slate-50 border rounded">
                  <p className="text-sm font-medium text-teal-600">{prefillLocation}</p>
                  <p className="text-xs text-slate-500">Location auto-selected from gym profile</p>
                </div>
              ) : (
                <select
                  value={formData.preferredLocation}
                  onChange={(e) => handleInputChange("preferredLocation", e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select preferred gym location</option>
                  {gymLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border rounded px-3 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!formData.name || !formData.phoneNumber || !formData.preferredLocation || isSubmitting}
                className="flex-1 bg-teal-600 text-white rounded px-3 py-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
                {isSubmitting ? "Submitting..." : "Request Callback"}
              </button>
            </div>

            {/* Message */}
            {submitMessage && (
              <p className={`text-center text-sm ${submitMessage.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
