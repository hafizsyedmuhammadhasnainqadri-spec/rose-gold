import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Bespoke Order Assistance',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Required Fields Missing', 'Please fill in your name, email, and message.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Inquiry Transmitted', 'A client advisor will reach out to you within 4 hours.', 'success');
  };

  return (
    <div className="bg-[#080808] min-h-screen py-16 text-[#A6A6A6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2">
            Private Client Relations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight mb-4">
            Contact the Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
            Whether inquiring about bespoke leather choices, Cash on Delivery status, or international delivery arrangements, our advisors are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#302719] p-8 rounded-sm">
            <h2 className="font-serif text-xl text-[#F8F4EC] mb-6 pb-3 border-b border-[#302719]">
              Send an Atelier Inquiry
            </h2>

            {submitted ? (
              <div className="p-8 bg-[#161616] border border-[#D4AF66] text-center rounded-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border border-[#D4AF66] flex items-center justify-center text-[#D4AF66] mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#F8F4EC]">Inquiry Successfully Received</h3>
                <p className="text-xs text-[#A6A6A6] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#F8F4EC]">{formData.name}</strong>. A dedicated Rose & Gold concierge advisor will reply to <span className="text-[#E6C98E]">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', topic: 'Bespoke Order Assistance', message: '' });
                  }}
                  className="mt-4 text-xs text-[#D4AF66] underline uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    >
                      <option value="Bespoke Order Assistance">Bespoke Order & Bundle Advice</option>
                      <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                      <option value="Cash on Delivery Query">Cash on Delivery (COD) Inquiries</option>
                      <option value="VIP Client Appointments">Private Showroom Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, sizing questions, or specific handbag requirements..."
                    className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Channels & Showrooms (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#111111] border border-[#302719] p-6 rounded-sm space-y-4">
              <h3 className="font-serif text-lg text-[#F8F4EC] pb-2 border-b border-[#302719]">
                Direct Atelier Channels
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <Mail className="w-4 h-4 text-[#D4AF66] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F8F4EC] font-medium">Client Support Email</span>
                  <p className="text-[#A6A6A6]">concierge@roseandgold.luxury</p>
                  <p className="text-[11px] text-[#A6A6A6]/70">Response within 4 hours, 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Phone className="w-4 h-4 text-[#D4AF66] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F8F4EC] font-medium">Telephone & WhatsApp Concierge</span>
                  <p className="text-[#A6A6A6]">+92 42 3578 9900 (Pakistan Desk)</p>
                  <p className="text-[#A6A6A6]">+971 4 800 7673 (Gulf & International)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#D4AF66] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F8F4EC] font-medium">Concierge Operating Hours</span>
                  <p className="text-[#A6A6A6]">Monday – Saturday: 10:00 AM – 9:00 PM (PKT/GST)</p>
                </div>
              </div>
            </div>

            {/* Atelier Locations */}
            <div className="bg-[#111111] border border-[#302719] p-6 rounded-sm space-y-4">
              <h3 className="font-serif text-lg text-[#F8F4EC] pb-2 border-b border-[#302719]">
                Atelier Hubs & Showrooms
              </h3>

              <div className="text-xs space-y-1">
                <p className="text-[#F8F4EC] font-serif font-medium">Lahore Flagship Atelier</p>
                <p className="text-[#A6A6A6]">Gulberg III, MM Alam Boulevard, Lahore, Pakistan</p>
              </div>

              <div className="text-xs space-y-1 pt-3 border-t border-[#302719]/40">
                <p className="text-[#F8F4EC] font-serif font-medium">Dubai Private Salon</p>
                <p className="text-[#A6A6A6]">Fashion Avenue, Downtown Dubai, UAE</p>
              </div>

              <div className="text-xs space-y-1 pt-3 border-t border-[#302719]/40">
                <p className="text-[#F8F4EC] font-serif font-medium">London Client Office</p>
                <p className="text-[#A6A6A6]">Brompton Road, Knightsbridge, London SW3, UK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
