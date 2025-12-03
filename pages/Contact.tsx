import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

interface PageProps {
  lang: Language;
}

const Contact: React.FC<PageProps> = ({ lang }) => {
  const { addContactMessage } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await addContactMessage(formData);
      setFormData({ name: '', email: '', message: '' });
      setFeedback({
        type: 'success',
        text: lang === Language.EN
          ? 'Thank you! Your message has been sent.'
          : 'ありがとうございます。メッセージを送信しました。'
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setFeedback({
        type: 'error',
        text: lang === Language.EN
          ? 'Something went wrong. Please try again.'
          : '送信中にエラーが発生しました。もう一度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-32 mandala-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-serif font-bold text-center text-red-950 mb-4">{TEXTS.contact[lang.toLowerCase()]}</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="bg-red-950 text-white p-10 rounded-2xl shadow-2xl h-full relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zM1 5h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zM1 9h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM1 13h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM1 17h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z\' fill=\'%23fbbf24\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-10 font-serif text-amber-500 border-b border-amber-500/30 pb-4">
                {lang === Language.EN ? "Get in Touch" : "ご連絡ください"}
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-amber-600/20 p-4 rounded-full border border-amber-600/50 group-hover:bg-amber-600 transition-colors">
                    <MapPin className="text-amber-400 group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-amber-100 mb-1">{TEXTS.address[lang.toLowerCase()]}</h3>
                    <p className="text-amber-200/70">
                      {lang === Language.EN ? "Tamai Bldg 1F, 3-34-11 Minamicho" : "群馬県前橋市南町3-34-11"}<br />
                      {lang === Language.EN ? "Maebashi, Gunma" : "玉井ビル 1F"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-amber-600/20 p-4 rounded-full border border-amber-600/50 group-hover:bg-amber-600 transition-colors">
                    <Phone className="text-amber-400 group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-amber-100 mb-1">{TEXTS.phone[lang.toLowerCase()]}</h3>
                    <p className="text-amber-200/70">027-212-3622</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-amber-600/20 p-4 rounded-full border border-amber-600/50 group-hover:bg-amber-600 transition-colors">
                    <Clock className="text-amber-400 group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-amber-100 mb-1">{TEXTS.hours[lang.toLowerCase()]}</h3>
                    <p className="text-amber-200/70">
                      {lang === Language.EN ? "Mon-Sat: 11:00 - 20:00" : "月〜土: 11:00 - 20:00"} <br />
                      <span className="text-sm">{lang === Language.EN ? "(Closed on Sundays)" : "(定休日: 日曜日)"}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              {/* Map Embed */}
              <div className="mt-12 w-full h-64 rounded-lg overflow-hidden shadow-lg border border-amber-600/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.1182023174497!2d139.06984117581922!3d36.38213247236927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ef313c22eb6b7%3A0x6eb63c78ee5bf98d!2zQ2FmZSBNYWVtaSDliY3mqYvjgqTjg7Pjg4njgqvjg6zjg7w!5e0!3m2!1sen!2sjp!4v1764306189663!5m2!1sen!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Maemi Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-amber-100">
            <h2 className="text-3xl font-bold mb-8 font-serif text-red-950">
              {lang === Language.EN ? "Send a Message" : "メッセージを送る"}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">{TEXTS.name[lang.toLowerCase()]}</label>
                  <input
                    type="text"
                    className="w-full bg-orange-50 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent p-4 border transition-all outline-none"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">{TEXTS.email[lang.toLowerCase()]}</label>
                  <input
                    type="email"
                    className="w-full bg-orange-50 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent p-4 border transition-all outline-none"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">{TEXTS.message[lang.toLowerCase()]}</label>
                <textarea
                  rows={6}
                  className="w-full bg-orange-50 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent p-4 border transition-all outline-none"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                ></textarea>
              </div>
              {feedback && (
                <div
                  className={`p-3 rounded-md text-sm font-semibold ${
                    feedback.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {feedback.text}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-md hover:from-amber-700 hover:to-amber-800 transition duration-300 shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <span>{isSubmitting ? (lang === Language.EN ? 'Sending...' : '送信中...') : TEXTS.sendMessage[lang.toLowerCase()]}</span>
                <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;