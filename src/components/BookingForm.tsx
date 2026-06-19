import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarDays, User, Phone, MapPin, MessageSquare, Sofa, 
  Database, LogOut, ExternalLink, Lock, RefreshCw, CheckCircle, 
  Settings, CheckSquare, Clock, Mail
} from 'lucide-react';
import { 
  initAuth, googleSignIn, logout, getOrCreateSpreadsheet, 
  appendAppointment, fetchAppointmentsFromSheet, Appointment, getCachedAccessToken 
} from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export default function BookingForm() {
  // Tabs: 'customer' or 'admin'
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [showAdminTabOption, setShowAdminTabOption] = useState(false);
  const [lastBooking, setLastBooking] = useState<Appointment | null>(null);
  
  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sofaType, setSofaType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  // Statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeUser, setActiveUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(() => localStorage.getItem('kds_spreadsheet_id'));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Load appointments and handle hidden/hash-based admin access
  useEffect(() => {
    const checkHash = () => {
      const isHashAdmin = window.location.hash === '#admin';
      setShowAdminTabOption(isHashAdmin);
      if (isHashAdmin) {
        setActiveTab('admin');
      } else {
        setActiveTab('customer');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    
    // Listen to Firebase Auth state
    const unsubscribe = initAuth(
      (user, token) => {
        setActiveUser(user);
        setAccessToken(token);
        if (spreadsheetId) {
          loadAppointments(spreadsheetId, token);
        } else {
          loadLocalAppointments();
        }
      },
      () => {
        setActiveUser(null);
        setAccessToken(null);
        loadLocalAppointments();
      }
    );
    return () => {
      window.removeEventListener('hashchange', checkHash);
      unsubscribe();
    };
  }, [spreadsheetId]);

  const loadLocalAppointments = () => {
    const local = localStorage.getItem('kds_local_bookings');
    if (local) {
      try {
        setAppointments(JSON.parse(local));
      } catch (e) {
        setAppointments([]);
      }
    } else {
      // Default initial mock bookings for visual presentation
      const initialMocks: Appointment[] = [
        {
          id: 'APT-MOCK-1',
          name: 'Siddharth',
          phone: '9876543210',
          address: 'Sector 15, Chandigarh',
          sofaType: 'l-shape',
          date: '2026-06-25',
          message: 'Needs deep sanitization and stain removal on the chaise lounge.',
          createdAt: new Date(Date.now() - 3600000 * 4).toLocaleString(),
        },
        {
          id: 'APT-MOCK-2',
          name: 'Dhanlaxmi',
          phone: '9812345678',
          address: 'Phase 3B2, Mohali',
          sofaType: 'fabric',
          date: '2026-06-28',
          message: 'Eco-friendly cleaning solution requested.',
          createdAt: new Date(Date.now() - 3600000 * 24).toLocaleString(),
        }
      ];
      localStorage.setItem('kds_local_bookings', JSON.stringify(initialMocks));
      setAppointments(initialMocks);
    }
  };

  const loadAppointments = async (sheetId: string, token: string) => {
    setIsLoadingAppointments(true);
    setErrorText(null);
    try {
      const data = await fetchAppointmentsFromSheet(sheetId, token);
      if (data && data.length > 0) {
        setAppointments(data);
      } else {
        // If sheet is empty or newly created, display local/mock
        loadLocalAppointments();
      }
    } catch (err: any) {
      console.error('Failed to load sheet values:', err);
      setErrorText('Could not sync with Google Sheets metadata. Try re-connecting.');
      loadLocalAppointments();
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleAdminSignIn = async () => {
    setErrorText(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setActiveUser(result.user);
        setAccessToken(result.accessToken);
        
        // Auto retrieve or create Google Sheets for KDS Sofa Care
        const sheetId = await getOrCreateSpreadsheet(result.accessToken);
        setSpreadsheetId(sheetId);
        await loadAppointments(sheetId, result.accessToken);
      }
    } catch (err: any) {
      console.error('Auth or Sheets setup error:', err);
      setErrorText(err.message || 'Authentication with Google failed.');
    }
  };

  const handleAdminLogout = async () => {
    await logout();
    setActiveUser(null);
    setAccessToken(null);
    // Keep local bookings visible in UI
    loadLocalAppointments();
  };

  const handleManualSync = async () => {
    if (spreadsheetId && accessToken) {
      await loadAppointments(spreadsheetId, accessToken);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText(null);

    const bookingId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: bookingId,
      name,
      phone,
      address,
      sofaType,
      date: preferredDate,
      message: notes || 'No additional notes provided.',
      createdAt: new Date().toLocaleString()
    };

    try {
      let isSavedToSheets = false;
      
      // Save to Google Sheets if spreadsheet ID and access token are ready
      if (spreadsheetId && accessToken) {
        isSavedToSheets = await appendAppointment(spreadsheetId, newAppointment, accessToken);
      }

      // Always update local list so appointments appear immediately in the UI list
      const updatedList = [newAppointment, ...appointments];
      setAppointments(updatedList);
      localStorage.setItem('kds_local_bookings', JSON.stringify(updatedList));

      setIsSubmitting(false);
      setLastBooking(newAppointment);
      setIsSuccess(true);
      
      // Clear fields
      setName('');
      setPhone('');
      setAddress('');
      setSofaType('');
      setPreferredDate('');
      setNotes('');
    } catch (err) {
      console.error('Failed to register appointment:', err);
      setIsSubmitting(false);
      setErrorText('Local backup stored successfully, but Sheets sync failed.');
      setLastBooking(newAppointment);
      setIsSuccess(true);
    }
  };

  const getWhatsAppUrl = () => {
    if (!lastBooking) return '#';
    const text = `*New Upholstery Booking on KDS Sofa Care* 🛋️✨\n\n` +
                 `• *Booking ID:* ${lastBooking.id}\n` +
                 `• *Customer Name:* ${lastBooking.name}\n` +
                 `• *WhatsApp Phone:* ${lastBooking.phone}\n` +
                 `• *Full Address:* ${lastBooking.address}\n` +
                 `• *Sofa/Cleaning Type:* ${lastBooking.sofaType}\n` +
                 `• *Preferred Date:* ${lastBooking.date}\n` +
                 `• *Special Request:* ${lastBooking.message}\n\n` +
                 `Please confirm the booking schedule instantly!`;
    return `https://api.whatsapp.com/send?phone=916283893707&text=${encodeURIComponent(text)}`;
  };

  const getEmailUrl = () => {
    if (!lastBooking) return '#';
    const subject = `New KDS Sofa Care Booking Alert - ${lastBooking.name}`;
    const body = `Hello Kalidas & Dhanlaxmi,\n\n` +
                 `A new premium dry cleaning booking has been registered on KDS Sofa Care website.\n\n` +
                 `---------------------------------------\n` +
                 `APPOINTMENT ID : ${lastBooking.id}\n` +
                 `CUSTOMER NAME  : ${lastBooking.name}\n` +
                 `CONTACT PHONE  : ${lastBooking.phone}\n` +
                 `ADDRESS        : ${lastBooking.address}\n` +
                 `SOFA TYPE      : ${lastBooking.sofaType}\n` +
                 `PREFERRED DATE : ${lastBooking.date}\n` +
                 `SPECIAL NOTES  : ${lastBooking.message}\n` +
                 `CREATED AT     : ${lastBooking.createdAt}\n` +
                 `---------------------------------------\n\n` +
                 `Please verify spreadsheet entries and respond to the customer.\n\n` +
                 `Best Regards,\n` +
                 `KDS Sofa Care System`;
    return `mailto:sidvir03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!showAdminTabOption) {
    return null;
  }

  return (
    <section id="booking" className="py-20 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Toggle Controls */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold mb-3">CONVENIENT BOOKING INSTANTLY</span>
          <h2 className="text-3xl md:text-5xl font-poppins font-black text-center mb-6">
            Get Your Sofa <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">Renewed</span>
          </h2>
          
          {showAdminTabOption && (
            <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 flex items-center gap-1">
              <button 
                onClick={() => setActiveTab('customer')}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'customer' ? 'bg-brand-secondary text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Sofa className="w-4 h-4" />
                Book Appointment
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'admin' ? 'bg-brand-secondary text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Database className="w-4 h-4" />
                Admin Portal
              </button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            
            {activeTab === 'customer' && (
              <motion.div 
                key="customer-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/50 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-800 flex flex-col lg:flex-row shadow-2xl"
              >
                {/* Visual Details Bar */}
                <div className="lg:w-2/5 bg-gradient-to-br from-brand-primary via-slate-900 to-indigo-950 p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-poppins font-bold mb-4">Book A Sofa Spa Session</h3>
                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                      Just enter your basic details and address. Our team automatically links your details with our central Google Sheets spreadsheet to assign your closest professional dry cleaner instantly.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500/20 p-2.5 rounded-xl border border-blue-500/30">
                          <Phone className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-100">Direct Office helpline</h4>
                          <p className="text-sm text-slate-300">+91 6283893707</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-sky-500/20 p-2.5 rounded-xl border border-sky-500/30">
                          <MapPin className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-100">Service Area Locations</h4>
                          <p className="text-sm text-slate-300">Chandigarh, Mohali, Panchkula & Tri-city</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2.5 rounded-xl border border-indigo-500/30">
                          <Database className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-100">Live Sheets Sync Status</h4>
                          {spreadsheetId ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1">
                              ● Connected to Google Sheet
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-1">
                              ● Storing Locally (Demo Mode)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-700/50 pt-6 text-xs text-slate-400 relative z-10 flex justify-between items-center bg-slate-900/30 px-4 py-3 rounded-xl border border-slate-800">
                    <div>
                      <p className="font-semibold text-slate-300">Kalidas & Dhanlaxmi</p>
                      <p className="text-[10px] opacity-75">Siddharth Sofa Spa System Pro</p>
                    </div>
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Actual Form */}
                <div className="lg:w-3/5 p-8 sm:p-10 bg-slate-800/30">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-5 py-4"
                    >
                      <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-2">
                        <CheckCircle className="w-12 h-12 text-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                          Booking Registered Successfully!
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-sm">
                          Your appointment details have been secured. Please tap below to instantly send a message to our dry cleaning experts:
                        </p>
                      </div>

                      {/* Direct WhatsApp and Email Notification Buttons */}
                      <div className="flex flex-col gap-3 w-full max-w-md pt-2">
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 text-sm cursor-pointer"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45a9.8 9.8 0 0 0 9.8-9.8c0-2.6-1-5.1-2.9-7-1.9-1.9-4.4-2.9-7-2.9a9.8 9.8 0 0 0-9.8 9.8c0 2 .5 3.9 1.5 5.6l-.4 1.4.4-1.4-.4 1.4zM16.5 13.5c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.3-.7.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.4-.3-.6-.6-.5-.8-.5H7c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7 1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.5-.3z"/>
                          </svg>
                          <span>Send Details on WhatsApp</span>
                        </a>

                        <a
                          href={getEmailUrl()}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20 text-sm cursor-pointer"
                        >
                          <Mail className="w-5 h-5 text-white" />
                          <span>Send Booking via Email</span>
                        </a>

                        <button
                          onClick={() => setIsSuccess(false)}
                          className="w-full bg-slate-900 hover:bg-slate-950 border border-slate-800 text-slate-300 py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs mt-2 cursor-pointer hover:text-white"
                        >
                          <span>Book Another Sofa Cleaning Session</span>
                        </button>
                      </div>

                      <div className="bg-slate-900/45 border border-slate-800/80 p-4 rounded-xl text-xs text-slate-400 flex items-center gap-3 w-full max-w-md mt-1">
                        <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <div className="text-left font-sans">
                          <p className="font-semibold text-slate-300">Fast Response Guarantee</p>
                          <p className="mt-0.5">We will review your entry and coordinate with you on WhatsApp within 15 minutes.</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-400 animate-spin" />
                        Enter Booking Specifics
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                          <input 
                            required 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name" 
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm placeholder-slate-500 text-white" 
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                          <input 
                            required 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Mobile Number (WhatsApp)" 
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm placeholder-slate-500 text-white" 
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        <input 
                          required 
                          type="text" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Complete Address (Flat, Sector, City)" 
                          className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm placeholder-slate-500 text-white" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Sofa className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                          <select 
                            required 
                            value={sofaType}
                            onChange={(e) => setSofaType(e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm text-slate-300 appearance-none cursor-pointer"
                          >
                            <option value="">Select Sofa Type</option>
                            <option value="Fabric Sofa">Fabric Sofa Dry Cleaning</option>
                            <option value="Leather Sofa">Leather Sofa Cleaning & Polish</option>
                            <option value="L-Shape Sofa">L-Shape Luxury Sofa Cleaning</option>
                            <option value="Recliner">Recliner Deep Dry Cleaning</option>
                          </select>
                          <div className="absolute top-4 right-3 pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                          <input 
                            required 
                            type="date" 
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm text-slate-300 cursor-pointer" 
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        <textarea 
                          rows={3} 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="What stains do you want us to remove? (Tea, Ink, Dust, Pet Hair etc.)" 
                          className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all text-sm placeholder-slate-500 text-white resize-none"
                        ></textarea>
                      </div>

                      {errorText && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2 rounded-lg">
                          {errorText}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-brand-secondary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                            <span>Securely Submitting...</span>
                          </>
                        ) : (
                          <>
                            <CheckSquare className="w-5 h-5" />
                            <span>Confirm & Sync Appointment Booking</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div 
                key="admin-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl"
              >
                {/* Workspace integration overview */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-700/50">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                      <Database className="w-5 h-5 text-blue-400" />
                      Appointments Admin Portal
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Link with your Google Sheets account to let the system generate spreadsheets and fetch incoming customer bookings in live time.
                    </p>
                  </div>

                  <div>
                    {!activeUser ? (
                      <button 
                        onClick={handleAdminSignIn}
                        className="gsi-material-button text-sm flex items-center gap-2.5 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-all cursor-pointer shadow-md"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        <span>OAuth Connect with Google Sheets</span>
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 px-4 py-2 rounded-xl text-xs text-slate-300">
                          {activeUser.photoURL ? (
                            <img src={activeUser.photoURL} alt="user" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full" />
                          ) : (
                            <div className="w-5 h-5 bg-brand-secondary rounded-full flex items-center justify-center text-white">U</div>
                          )}
                          <span className="font-semibold">{activeUser.displayName || activeUser.email}</span>
                        </div>
                        
                        <button 
                          onClick={handleAdminLogout}
                          className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-700/60 hover:bg-slate-700/60 transition-all cursor-pointer"
                          title="Sign Out"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main sheets panel info */}
                {spreadsheetId && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Spreadsheet Active</p>
                        <p className="text-sm font-bold text-slate-100 truncate">KDS Sofa Care - Bookings</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Synced Appointments</p>
                        <p className="text-lg font-black text-slate-100">{appointments.length} Total Rows</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-2xl flex flex-col justify-center">
                      <div className="flex gap-2">
                        <a 
                          href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md group"
                          id="open-sheet-btn"
                        >
                          <span>Open Google Sheet</span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                        <button 
                          onClick={handleManualSync}
                          disabled={isLoadingAppointments}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition-all cursor-pointer"
                          title="Fetch Latest Rows"
                        >
                          <RefreshCw className={`w-4 h-4 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Connection helper alert if not logged in */}
                {!spreadsheetId && (
                  <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-200">Google Sheets Connection Status: Offline / Local</p>
                        <p className="text-xs text-slate-400">Owner can sign in with Google to enable automatic spreadsheet integration in real-time.</p>
                      </div>
                    </div>
                    {!activeUser && (
                      <button 
                        onClick={handleAdminSignIn}
                        className="bg-brand-secondary text-white hover:bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Connect Sheet Now</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Table list of bookings */}
                <div className="bg-slate-950/50 rounded-2xl border border-slate-850 overflow-hidden">
                  <div className="p-4 bg-slate-900/40 border-b border-slate-800 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-300">Live Intake Feed</h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Updates live upon submission</span>
                  </div>
                  
                  {isLoadingAppointments ? (
                    <div className="py-16 text-center space-y-3">
                      <span className="w-8 h-8 border-3 border-blue-500/35 border-t-blue-400 rounded-full animate-spin inline-block"></span>
                      <p className="text-slate-455 text-xs">Accessing Google Spreadsheet rows...</p>
                    </div>
                  ) : appointments.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                      No appointments booked yet. Try submitting the booking form first!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                            <th className="p-3.5 font-semibold">Appointment ID</th>
                            <th className="p-3.5 font-semibold">Customer Details</th>
                            <th className="p-3.5 font-semibold">Address</th>
                            <th className="p-3.5 font-semibold">Sofa Cleaning Service</th>
                            <th className="p-3.5 font-semibold">Scheduled Date</th>
                            <th className="p-3.5 font-semibold text-right">Added Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900/10">
                          {appointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-slate-800/25 transition-all group">
                              <td className="p-3.5 font-mono text-blue-400 font-bold">{apt.id}</td>
                              <td className="p-3.5 whitespace-nowrap">
                                <div className="font-bold text-slate-200">{apt.name}</div>
                                <div className="text-slate-400 text-[11px] mt-0.5">{apt.phone}</div>
                              </td>
                              <td className="p-3.5 text-slate-300 max-w-xs truncate" title={apt.address}>
                                {apt.address}
                              </td>
                              <td className="p-3.5">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/10 uppercase">
                                  {apt.sofaType}
                                </span>
                              </td>
                              <td className="p-3.5 text-sky-400 font-semibold">{apt.date}</td>
                              <td className="p-3.5 text-right text-slate-500 text-[10px] font-mono whitespace-nowrap">
                                {apt.createdAt}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
