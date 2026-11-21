import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Mail, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const BACKEND_URL = 'http://localhost:5000';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1); // 1: Email/Name, 2: OTP Entry
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = [
    useRef(null), useRef(null), useRef(null), 
    useRef(null), useRef(null), useRef(null)
  ];

  useEffect(() => {
    setMode(initialMode);
    setStep(1);
    setErrorMsg('');
    setInfoMsg('');
  }, [initialMode, isOpen]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  if (!isOpen) return null;

  // STEP 1: Send OTP Email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!contact.trim() || !contact.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (mode === 'signup' && !fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setErrorMsg('');
    setInfoMsg('');
    setIsSendingOtp(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contact, name: fullName })
      });

      const data = await response.json();
      setIsSendingOtp(false);

      if (data.success) {
        setStep(2);
        setTimer(30);
        setIsTimerActive(true);
        setInfoMsg(`Verification code sent to ${contact}. Please check your inbox (and spam folder).`);
        setTimeout(() => inputRefs[0].current?.focus(), 150);
      } else {
        setErrorMsg(data.message || 'Failed to send verification code. Please check your email.');
      }
    } catch (err) {
      setIsSendingOtp(false);
      setErrorMsg('Unable to connect to authentication server. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);
    setErrorMsg('');

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      inputRefs[5].current?.focus();
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('');
    
    if (enteredCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contact, otp: enteredCode, name: fullName })
      });

      const data = await response.json();
      setIsVerifying(false);

      if (data.success) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}

        const userData = data.user || {
          name: fullName || contact.split('@')[0],
          email: contact,
          plan: 'Pro Plan',
          credits: 20
        };

        onAuthSuccess(userData);
        onClose();
      } else {
        setErrorMsg(data.message || 'Invalid or expired verification code.');
      }
    } catch (err) {
      setIsVerifying(false);
      setErrorMsg('Error verifying code. Please try again.');
    }
  };

  const handleResend = () => {
    setTimer(30);
    setIsTimerActive(true);
    setOtpDigits(['', '', '', '', '', '']);
    handleSendOtp();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0e0f22] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden glow-purple">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {mode === 'signup' ? 'Get Started with 20 Free Credits' : 'Welcome Back'}
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {step === 1 
              ? (mode === 'signup' ? 'Create Your Account' : 'Sign In to AI Short Ad Maker') 
              : 'Enter Verification Code'}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {step === 1 
              ? 'Generate AI Short Ads & Video Commercials instantly.' 
              : `We sent a 6-digit verification code to ${contact}`}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-indigo-500' : 'w-3 bg-slate-700'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-indigo-500' : 'w-3 bg-slate-700'}`} />
        </div>

        {/* STEP 1: Enter Name & Email */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivett"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSendingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
              >
                {mode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Get Started"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Enter OTP Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            {infoMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 text-center">
                {infoMsg}
              </div>
            )}

            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 bg-slate-900/90 border border-slate-700 text-center text-xl font-bold text-indigo-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            {errorMsg && (
              <p className="text-xs text-center text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Code & Sign In</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="hover:text-slate-200 transition-colors cursor-pointer"
              >
                ← Edit email
              </button>

              {isTimerActive ? (
                <span className="text-slate-400">Resend code in <strong className="text-indigo-400 font-mono">{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
