import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, CheckCircle2, ShieldCheck, Mail, Sparkles, X, Plus, Minus, Copy, Check, ArrowRight, CreditCard, ChevronDown } from 'lucide-react';
import { sendOrderNotificationEmail } from '../services/emailService';
import { addPrintOrder } from '../services/dataService';

export function PrintSalePage({ darkMode, onBack }) {
  // Sizing & format options matching user screenshot
  const formatOptions = [
    { label: 'Hahnemühle Matte - 8×12" ($100.00)', size: '8×12"', paper: 'Hahnemühle Matte', price: 100 },
    { label: 'Hahnemühle Matte - 12×18" ($140.00)', size: '12×18"', paper: 'Hahnemühle Matte', price: 140 },
    { label: 'Canson Baryta - 8×12" ($110.00)', size: '8×12"', paper: 'Canson Baryta Prestige', price: 110 },
    { label: 'Canson Baryta - 12×18" ($160.00)', size: '12×18"', paper: 'Canson Baryta Prestige', price: 160 },
    { label: 'Museum Master - 16×24" ($220.00)', size: '16×24"', paper: '100% Cotton Rag Ultra', price: 220 }
  ];

  // Print Catalog
  const printCatalog = [
    {
      id: "print-1",
      title: "Street Story I — Acros Monochrome",
      edition: "Limited Run of 15 (Signed & Numbered)",
      location: "Dhaka, Bangladesh",
      aspectRatio: "3:4 Vertical",
      imageUrl: "/photos/street_01.jpg",
      description: "Exhibited internationally in Greece. Printed with 12-color archival pigment inks on 100% cotton rag. Deep monochromatic tonal range."
    },
    {
      id: "print-2",
      title: "Architectural Form I — Brutalist Concrete",
      edition: "Limited Run of 10 (Signed & Numbered)",
      location: "Dhaka, Bangladesh",
      aspectRatio: "3:4 Vertical",
      imageUrl: "/photos/arch_01.jpg",
      description: "Award-winning geometric study of brutalist verticality. Crisp angular shadows and pristine highlights rendered without gloss reflection."
    },
    {
      id: "print-3",
      title: "Natural Elements I — Coastal Horizon",
      edition: "Limited Run of 15 (Signed & Numbered)",
      location: "Riverine Bengal, Bangladesh",
      aspectRatio: "3:4 Vertical",
      imageUrl: "/photos/nature_01.jpg",
      description: "Atmospheric delta waters and mist gradient. Rich velvety tones on heavy cotton texture with archival certificate of authenticity."
    },
    {
      id: "print-4",
      title: "Street Story II — Evening Transit",
      edition: "Limited Run of 20 (Signed & Numbered)",
      location: "Dhaka, Bangladesh",
      aspectRatio: "16:9 Horizontal",
      imageUrl: "/photos/street_02.jpg",
      description: "Curated depiction of evening commute silhouette and urban movement. Warm cinematic tonal gradation."
    }
  ];

  // Card-specific selector state: mapping printId -> { selectedFormatIndex, quantity }
  const [cardSelections, setCardSelections] = useState({
    "print-1": { formatIndex: 0, quantity: 1 },
    "print-2": { formatIndex: 0, quantity: 1 },
    "print-3": { formatIndex: 0, quantity: 1 },
    "print-4": { formatIndex: 0, quantity: 1 }
  });

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: REVIEW LIST, 2: CHECKOUT QUERY, 3: SUCCESS

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    contactName: '',
    emailAddress: '',
    phoneNo: '',
    shippingAddress: '',
    specialRequests: '',
    paymentMethod: 'bKash', // 'bKash' | 'Nagad' | 'Rocket'
    transactionId: ''
  });

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const paymentNumber = "01783503006";

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleFormatChange = (printId, newIndex) => {
    setCardSelections(prev => ({
      ...prev,
      [printId]: {
        ...prev[printId],
        formatIndex: newIndex
      }
    }));
  };

  const handleQuantityChange = (printId, delta) => {
    setCardSelections(prev => {
      const current = prev[printId]?.quantity || 1;
      const next = Math.max(1, current + delta);
      return {
        ...prev,
        [printId]: {
          ...prev[printId],
          quantity: next
        }
      };
    });
  };

  const handleAddToCart = (print) => {
    const selection = cardSelections[print.id] || { formatIndex: 0, quantity: 1 };
    const chosenFormat = formatOptions[selection.formatIndex];

    const newItem = {
      cartItemId: `${print.id}-${chosenFormat.label}-${Date.now()}`,
      printId: print.id,
      title: print.title,
      imageUrl: print.imageUrl,
      edition: print.edition,
      formatLabel: chosenFormat.label,
      size: chosenFormat.size,
      paper: chosenFormat.paper,
      unitPrice: chosenFormat.price,
      quantity: selection.quantity,
      itemTotal: chosenFormat.price * selection.quantity
    };

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.printId === print.id && item.formatLabel === chosenFormat.label);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += selection.quantity;
        updated[existingIdx].itemTotal = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      }
      return [...prev, newItem];
    });

    setIsCartOpen(true);
    setCheckoutStep(1);
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleUpdateCartQuantity = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const nextQ = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: nextQ,
          itemTotal: nextQ * item.unitPrice
        };
      }
      return item;
    }));
  };

  const cartTotalUSD = cartItems.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const cartTotalBDT = cartTotalUSD * 122; // Approximate exchange rate

  const handleSendOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.transactionId.trim()) {
      alert("Please enter your bKash / Nagad / Rocket Transaction ID (TrxID) so Zobaer can verify payment.");
      return;
    }

    const orderId = `MZA-PRNT-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderRecord = {
      orderId,
      timestamp: new Date().toISOString(),
      items: cartItems,
      totalUSD: cartTotalUSD,
      totalBDT: cartTotalBDT,
      contactName: checkoutForm.contactName,
      emailAddress: checkoutForm.emailAddress,
      phoneNo: checkoutForm.phoneNo,
      shippingAddress: checkoutForm.shippingAddress,
      specialRequests: checkoutForm.specialRequests,
      paymentMethod: checkoutForm.paymentMethod,
      transactionId: checkoutForm.transactionId,
      status: "PENDING_VERIFICATION"
    };

    try {
      addPrintOrder(orderRecord);
      await sendOrderNotificationEmail(orderRecord);
    } catch (err) {
      console.error("Order processing error:", err);
    }

    setLastOrderDetails(orderRecord);
    setCartItems([]);
    setCheckoutStep(3); // Go to SUCCESS step
  };

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Floating Cart Button */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all ${
              darkMode 
                ? 'border-slate-800 bg-[#0E1524]/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 shadow-sm' 
                : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-amber-500/50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← Back to Portfolio</span>
          </button>

          {/* Cart Opener Button */}
          <button
            onClick={() => {
              setIsCartOpen(true);
              if (cartItems.length > 0 && checkoutStep === 3) setCheckoutStep(1);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
              cartItems.length > 0 
                ? 'border-amber-500/60 bg-amber-500/15 text-amber-400 shadow-lg shadow-amber-500/10'
                : (darkMode ? 'border-slate-800 bg-[#0E1524]/80 text-slate-400 hover:text-slate-200' : 'border-slate-200 bg-white text-slate-600')
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span>Your Cart ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>LIMITED EDITION MUSEUM ARCHIVAL EDITIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Fine Art Print Sale
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Museum-grade archival cotton rag prints. Hand-signed, strictly numbered, and accompanied by an embossed Certificate of Authenticity (CoA). bKash, Nagad, and Rocket instant checkout supported.
          </p>
        </div>

        {/* Payment Banner Notification */}
        <div className={`p-4 sm:p-5 rounded-2xl border mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs ${
          darkMode ? 'bg-[#0E1524]/90 border-amber-500/30 text-slate-200' : 'bg-amber-50 border-amber-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Direct Payment Available: <strong>bKash / Nagad / Rocket: 01783503006</strong></span>
          </div>
          <button
            onClick={handleCopyNumber}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors w-fit text-[11px]"
          >
            {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedNumber ? 'Copied Number!' : 'Copy 01783503006'}</span>
          </button>
        </div>

        {/* Print Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {printCatalog.map((print) => {
            const selection = cardSelections[print.id] || { formatIndex: 0, quantity: 1 };

            return (
              <div
                key={print.id}
                className={`p-6 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between group ${
                  darkMode 
                    ? 'bg-[#0E1524]/80 border-slate-800/80 hover:border-amber-500/40 shadow-xl shadow-black/20' 
                    : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
                }`}
              >
                <div>
                  {/* Photo Preview Frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 mb-6 border border-slate-800/80">
                    <img
                      src={print.imageUrl}
                      alt={print.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 font-mono text-[10px] px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                      {print.edition}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-xs text-amber-500">
                    <span>{print.location}</span>
                    <span className="text-slate-500">{print.aspectRatio}</span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2 ${
                    darkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {print.title}
                  </h3>

                  <p className={`text-xs sm:text-sm font-sans leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {print.description}
                  </p>
                </div>

                {/* Interactive Purchase Controls Matching User's Screenshot */}
                <div className="pt-6 border-t border-slate-800/50 space-y-4">
                  {/* Format & Sizing Selector */}
                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                      SELECT FORMAT & SIZING
                    </label>
                    <div className="relative">
                      <select
                        value={selection.formatIndex}
                        onChange={(e) => handleFormatChange(print.id, parseInt(e.target.value))}
                        className={`w-full py-3 px-4 pr-10 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all appearance-none cursor-pointer ${
                          darkMode 
                            ? 'bg-[#090D14] border-amber-500/50 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm' 
                            : 'bg-white border-amber-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm'
                        }`}
                      >
                        {formatOptions.map((opt, oIdx) => (
                          <option key={oIdx} value={oIdx} className="bg-[#090D14] text-white py-2">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Quantity Selector Matching Screenshot */}
                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                      QUANTITY
                    </label>
                    <div className={`inline-flex items-center rounded-xl border px-2 py-1 font-mono text-sm ${
                      darkMode ? 'bg-[#121927] border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}>
                      <button
                        onClick={() => handleQuantityChange(print.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800/60 transition-colors text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold">
                        {selection.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(print.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800/60 transition-colors text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add To Cart Button Matching Screenshot */}
                  <button
                    onClick={() => handleAddToCart(print)}
                    className="w-full py-3.5 px-6 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all bg-white text-black hover:bg-slate-200 active:scale-[0.99] shadow-lg cursor-pointer"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal / Drawer Cart and Multi-Step Checkout Workflow */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl flex flex-col justify-between ${
              darkMode ? 'bg-[#0E1524] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Drawer Header Matching User Screenshot */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-6">
                  <div className="flex items-center gap-2.5 font-sans font-bold text-lg sm:text-xl">
                    <ShoppingBag className="w-5 h-5 text-amber-500" />
                    <span>Your Cart ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})</span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition-colors cursor-pointer"
                    aria-label="Close cart"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* 3 Step Breadcrumb Tracker Matching Screenshot */}
                <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs mb-6 pb-4 border-b border-slate-800/40 overflow-x-auto">
                  <span className={`tracking-wider ${checkoutStep === 1 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    1. REVIEW LIST
                  </span>
                  <span className="text-slate-600">→</span>
                  <span className={`tracking-wider ${checkoutStep === 2 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    2. CHECKOUT QUERY
                  </span>
                  <span className="text-slate-600">→</span>
                  <span className={`tracking-wider ${checkoutStep === 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                    3. SUCCESS
                  </span>
                </div>
              </div>

              {/* STEP 1: REVIEW LIST */}
              {checkoutStep === 1 && (
                <div>
                  {cartItems.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="font-mono text-xs text-slate-400">Your cart is currently empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-xs"
                      >
                        Explore Available Prints
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className={`p-4 rounded-xl border flex items-center justify-between gap-4 font-sans ${
                            darkMode ? 'bg-[#121927]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg border border-slate-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-sm truncate">{item.title}</h4>
                              <p className="font-mono text-[11px] text-amber-500/90">{item.formatLabel}</p>
                              <span className="font-mono text-xs text-slate-400">${item.unitPrice}.00 USD each</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Quantity Adjuster */}
                            <div className={`flex items-center rounded-lg border font-mono text-xs ${
                              darkMode ? 'bg-black/60 border-slate-800' : 'bg-white border-slate-300'
                            }`}>
                              <button
                                onClick={() => handleUpdateCartQuantity(item.cartItemId, -1)}
                                className="px-2 py-1 text-slate-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateCartQuantity(item.cartItemId, 1)}
                                className="px-2 py-1 text-slate-400 hover:text-white"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold min-w-[70px] text-right">
                              ${item.itemTotal}.00
                            </span>

                            <button
                              onClick={() => handleRemoveFromCart(item.cartItemId)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                              title="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Total Bar */}
                      <div className="pt-4 border-t border-slate-800/60 flex items-baseline justify-between font-mono">
                        <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">ITEMS TOTAL</span>
                        <div className="text-right">
                          <span className="text-xl font-bold text-amber-400 font-sans">${cartTotalUSD}.00 USD</span>
                          <span className="block text-xs text-slate-400">≈ ৳{cartTotalBDT.toLocaleString()} BDT</span>
                        </div>
                      </div>

                      {/* Proceed to checkout button */}
                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => setCheckoutStep(2)}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all bg-white text-black hover:bg-slate-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: CHECKOUT QUERY MATCHING EXACT USER SCREENSHOT */}
              {checkoutStep === 2 && (
                <form onSubmit={handleSendOrder} className="space-y-4 font-mono text-xs">
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Please insert your shipping details below to submit a print purchase order to Zobaer's desk directly.
                  </p>

                  {/* CONTACT NAME */}
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                      CONTACT NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full signature name"
                      value={checkoutForm.contactName}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, contactName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none transition-colors ${
                        darkMode ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  {/* EMAIL ADDRESS */}
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="active@mailbox.com"
                      value={checkoutForm.emailAddress}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, emailAddress: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none transition-colors ${
                        darkMode ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  {/* PHONE / MOBILE NO */}
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                      PHONE / MOBILE NO
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Country prefix + Number"
                      value={checkoutForm.phoneNo}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phoneNo: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none transition-colors ${
                        darkMode ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  {/* FULL SHIPPING / DELIVERY ADDRESS */}
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                      FULL SHIPPING / DELIVERY ADDRESS
                    </label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Street, City, State, ZIP, Country"
                      value={checkoutForm.shippingAddress}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, shippingAddress: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none transition-colors ${
                        darkMode ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    ></textarea>
                  </div>

                  {/* SPECIAL REQUESTS / FRAMING NOTES (OPTIONAL) */}
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                      SPECIAL REQUESTS / FRAMING NOTES (OPTIONAL)
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. customized white box framing, special dedication signature on border back..."
                      value={checkoutForm.specialRequests}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, specialRequests: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans focus:outline-none transition-colors ${
                        darkMode ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    ></textarea>
                  </div>

                  {/* PAYMENT SECTION WITH BKASH / NAGAD / ROCKET AS REQUESTED */}
                  <div className={`p-5 rounded-2xl border my-4 space-y-3 ${
                    darkMode ? 'bg-[#121927] border-amber-500/40' : 'bg-amber-50/70 border-amber-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        <span>SELECT PAYMENT METHOD</span>
                      </span>
                      <span className="text-emerald-400 text-[11px]">Instant Verification</span>
                    </div>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2">
                      {['bKash', 'Nagad', 'Rocket'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: m })}
                          className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                            checkoutForm.paymentMethod === m
                              ? (m === 'bKash' 
                                  ? 'bg-[#E2136E] text-white border-[#E2136E]' 
                                  : m === 'Nagad' 
                                    ? 'bg-[#F7941D] text-white border-[#F7941D]' 
                                    : 'bg-[#8C3494] text-white border-[#8C3494]')
                              : (darkMode ? 'bg-black/40 border-slate-800 text-slate-400' : 'bg-white border-slate-300 text-slate-600')
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    {/* Number Box with Copy Action */}
                    <div className="p-3 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Personal / Send Money No:</span>
                        <strong className="text-white text-sm tracking-widest">{paymentNumber}</strong>
                        <span className="text-amber-400 text-[10px] block">({checkoutForm.paymentMethod} Personal)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[11px] font-bold flex items-center gap-1"
                      >
                        {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* TRANSACTION ID INPUT (REQUIRED AS USER ASKED) */}
                    <div>
                      <label className="block text-amber-400 uppercase tracking-wider text-[11px] mb-1 font-bold">
                        TRANSACTION ID (TRXID) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BL92XK84Q1 (from your payment SMS)"
                        value={checkoutForm.transactionId}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, transactionId: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-mono tracking-wider focus:outline-none uppercase ${
                          darkMode ? 'bg-[#090D14] border-amber-500/60 text-white focus:border-amber-400' : 'bg-white border-amber-500 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Please insert the TrxID after sending money so Zobaer can verify and confirm the order.
                      </span>
                    </div>
                  </div>

                  {/* ITEMS TOTAL BAR */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-baseline justify-between font-mono">
                    <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">ITEMS TOTAL</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-amber-400 font-sans">${cartTotalUSD}.00 USD</span>
                      <span className="block text-xs text-slate-400 font-mono">≈ ৳{cartTotalBDT.toLocaleString()} BDT</span>
                    </div>
                  </div>

                  {/* Footer Actions: Back and Send Order Matching Screenshot */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className={`px-8 py-3 rounded-xl border font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                        darkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-800/60' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all bg-white text-black hover:bg-slate-200 active:scale-[0.99] shadow-lg cursor-pointer flex items-center gap-2"
                    >
                      <span>Send Order</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: SUCCESS CONFIRMATION RECEIPT */}
              {checkoutStep === 3 && lastOrderDetails && (
                <div className="py-8 space-y-6 text-center font-mono text-xs">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-sans text-slate-100">
                      Print Order Received!
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Order ID: <strong className="text-amber-400">{lastOrderDetails.orderId}</strong>
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border text-left space-y-2.5 ${
                    darkMode ? 'bg-[#090D14] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex justify-between pb-2 border-b border-slate-800/60 font-semibold text-slate-100">
                      <span>Recipient:</span>
                      <span>{lastOrderDetails.contactName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span>{lastOrderDetails.phoneNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payment Channel:</span>
                      <span className="text-amber-400 font-bold">{lastOrderDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Transaction ID (TrxID):</span>
                      <span className="text-emerald-400 font-bold tracking-wider">{lastOrderDetails.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Billed:</span>
                      <span className="font-bold text-slate-100">${lastOrderDetails.totalUSD}.00 USD (৳{lastOrderDetails.totalBDT.toLocaleString()} BDT)</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                      <strong>Delivery Destination:</strong> {lastOrderDetails.shippingAddress}
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-xs font-sans">
                    Zobaer will verify the payment using your TrxID <strong>{lastOrderDetails.transactionId}</strong> on <strong>01783503006</strong>, sign the Certificate of Authenticity, and contact you directly via phone/email before dispatch.
                  </p>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep(1);
                      }}
                      className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all bg-white text-black hover:bg-slate-200 shadow-md cursor-pointer"
                    >
                      Done / Continue Browsing
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PrintSalePage;
