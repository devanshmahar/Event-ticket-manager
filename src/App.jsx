import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './App.css';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/co.avevents/';

// ─── EVENT CONFIG ───────────────────────────────────────────────────────────
const EVENT = {
  name: 'Rain Affair',
  brand: 'AV Eventsz',
  tagline: 'POOL • DJ • RAIN EXPERIENCE',
  dj: 'DJ m_a_n_yo',
  description: "AV Eventsz presents an exclusive luxury pool party experience. Dive into a world of premium DJ sets by DJ m_a_n_yo, curated rain arenas, swimming pool access, gourmet food, and an unforgettable atmosphere at the iconic Mastiff Citadel RC Bhimawala.",
  date: '18 July 2026',
  day: 'Saturday',
  time: 'Entry: 5:00 PM | Gate closes: 8:00 PM',
  timeShort: '5:00 PM – 8:00 PM',
  venue: 'Mastiff Citadel RC',
  address: 'RC Bhimawala, Vikasnagar, Uttarakhand 248198',
  phone: '+918272834909',
  phoneDisplay: '+91 8272834909',
  upiId: '9997210909@ptyes',
  dressCode: 'Smart Pool Wear / Summer Casuals',
};

const NAVRANG_EVENT = {
  name: 'Navrang Dandiya Night',
  brand: 'AV Events & Co.',
  tagline: 'GARBA • DANDIYA • FESTIVE NIGHT',
  description: 'Celebrate Navrang Dandiya Night with an evening of festive music, dance, and community at The Sheela’s Farm in Dehradun.',
  date: '9 October 2026',
  day: 'Friday',
  time: '5:00 PM – 10:00 PM',
  venue: 'The Sheela’s Farm',
  address: 'Nanda Ki Chowki, Prem Nagar, Dehradun',
  dj: 'DJ Adi',
  djInstagram: 'https://www.instagram.com/djadi.in/',
  giftingPartner: 'Xoxo Patisserie',
  giftingPartnerInstagram: 'https://www.instagram.com/xoxo_patisserie/',
  bookMyShowUrl: 'https://in.bookmyshow.com/activities/navrang/ET00518074',
  sortMySceneUrl: 'https://sortmyscene.com/event/navrang-dandiya-night-oct-09-2026',
  districtUrl: 'https://link.district.in/DSTRKT/xz9lzqtv',
  pickupUrl: 'https://maps.app.goo.gl/vjEXURYW5Zsi5LYm7?g_st=ic',
  whatsappNumber: '916396930467',
  upiId: 'devanshmahar22@oksbi',
  passes: [
    { id: 'female', name: 'Female Pass', price: 249, icon: '💃' },
    { id: 'male', name: 'Male Pass', price: 349, icon: '🕺' },
    { id: 'couple', name: 'Couple Pass', price: 499, icon: '🪔' },
  ],
  menuSections: [
    { title: 'Cafe Favourites', icon: '🧇', items: ['Waffle', 'Pancake', 'Beverages', 'Unlimited Beverages', 'Sandwich', 'Water'] },
    { title: 'Indian Favourites', icon: '🍛', items: ['Biryani', 'Rumali Roti', 'Shawarma'] },
    { title: 'Pizza & Pasta', icon: '🍕', items: ['Pizza', 'Pasta'] },
    { title: 'Street Food & Snacks', icon: '🍽️', items: ['Chaat', 'Paneer Tikka', 'Aloo Kabab', 'Burger', 'Pav Bhaji', 'Vada Pav', 'Sev Puri', 'Bhel Puri', 'Chilli Potato', 'Dahi Kebab', 'Dandiya'] },
    { title: 'Momos', icon: '🥟', items: ['Maggi Momos', 'Chicken Momos'] },
    { title: 'Hot Food', icon: '🍗', items: ['Chicken', 'Smokey Chicken', 'Chilli Chicken', 'Chilly Chicken', 'Fry Chicken', 'Chaap', 'Kebab', 'Chowmein'] },
  ],
  benefits: [
    { icon: '🎧', title: 'Concert DJ Vibe', detail: 'Dance to the beats of DJ Adi', linkText: '@djadi.in', link: 'https://www.instagram.com/djadi.in/' },
    { icon: '📍', title: 'Prime Venue', detail: 'The Sheela’s Farm, Nanda Ki Chowki, Prem Nagar, Dehradun' },
    { icon: '🍴', title: 'Famous Food Stalls', detail: 'Taste the best local food brands' },
    { icon: '🎁', title: '100+ Giveaways', detail: 'Massive gifts by our official gifting partner Xoxo Patisserie', linkText: '@xoxo_patisserie', link: 'https://www.instagram.com/xoxo_patisserie/' },
    { icon: '🎯', title: 'Fun Games', detail: 'Non-stop entertainment and activities' },
    { icon: '📸', title: 'Event Photos & Videos', detail: 'See our event coverage, photos, and videos on Instagram', linkText: '@co.avevents', link: INSTAGRAM_PROFILE },
    { icon: '✨', title: '40+ Influencers', detail: 'Vibe with top creators' },
    { icon: '🛡️', title: 'Top Security', detail: '100% safety with 20+ bouncers' },
  ],
};

const createNavrangPassImage = (ticket, booking) => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 600;
  const context = canvas.getContext('2d');
  if (!context) {
    reject(new Error('Canvas is unavailable'));
    return;
  }

  const accent = booking.passId === 'female' ? '#ed3e8d' : booking.passId === 'male' ? '#3b82d0' : '#54a848';
  const qr = new Image();
  qr.onload = () => {
    context.fillStyle = '#09080c';
    context.fillRect(0, 0, canvas.width, canvas.height);
    const background = context.createLinearGradient(0, 0, 900, 600);
    background.addColorStop(0, '#26121a');
    background.addColorStop(0.55, '#121018');
    background.addColorStop(1, '#311c10');
    context.fillStyle = background;
    context.fillRect(0, 0, 900, 600);
    context.strokeStyle = '#c9a65a';
    context.lineWidth = 5;
    context.strokeRect(18, 18, 1164, 564);

    context.fillStyle = '#d9b869';
    context.font = 'bold 27px Arial';
    context.fillText('AV EVENTS & CO.', 60, 85);
    context.fillStyle = '#fff3d2';
    context.font = 'bold 76px Georgia';
    context.fillText('NAVRANG', 58, 205);
    context.font = 'bold 43px Georgia';
    context.fillText('DANDIYA NIGHT', 62, 265);
    context.fillStyle = '#d6c9aa';
    context.font = '24px Arial';
    context.fillText('A FESTIVE NIGHT TO CELEBRATE', 62, 315);
    context.fillStyle = '#ffffff';
    context.font = 'bold 34px Arial';
    context.fillText(booking.name.slice(0, 26), 62, 390);
    context.fillStyle = '#dfba6b';
    context.font = 'bold 25px Arial';
    context.fillText(`${booking.passName} · ₹${booking.price}`, 62, 435);
    context.fillStyle = '#e9e3d7';
    context.font = '22px Arial';
    context.fillText('FRIDAY, 9 OCTOBER 2026 · 5:00 PM – 10:00 PM', 62, 490);
    context.font = '20px Arial';
    context.fillText('THE SHEELA’S FARM · DEHRADUN', 62, 528);

    context.fillStyle = accent;
    context.fillRect(900, 20, 280, 560);
    context.fillStyle = '#fff';
    context.textAlign = 'center';
    context.font = 'bold 31px Arial';
    context.fillText(booking.passName.toUpperCase(), 1040, 78, 250);
    context.font = 'bold 54px Georgia';
    context.fillText(`₹${booking.price}`, 1040, 140);
    context.fillStyle = '#fff';
    context.fillRect(970, 170, 140, 140);
    context.drawImage(qr, 976, 176, 128, 128);
    context.fillStyle = '#fff';
    context.font = 'bold 19px Arial';
    context.fillText('PASS ID QR', 1040, 345);
    context.font = 'bold 20px monospace';
    context.fillText(ticket.code, 1040, 390, 250);
    context.font = '18px Arial';
    context.fillText(`${ticket.number} OF ${booking.quantity}`, 1040, 435);
    context.textAlign = 'left';

    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Could not render the pass image'));
    }, 'image/png');
  };
  qr.onerror = () => reject(new Error('Could not load the pass QR code'));
  qr.src = ticket.qrCode;
});


const TICKETS = [
  {
    id: 'silver',
    name: 'Silver Pass',
    price: 2100,
    color: '#9ca3af',
    features: [
      { icon: '🎟️', text: 'Entry for 1 Person', included: true },
      { icon: '🌊', text: 'DJ & Pool Access', included: true },
      { icon: '🍛', text: 'Unlimited Food', included: true },
      { icon: '🛏️', text: 'Stay (not included)', included: false },
      { icon: '🥃', text: 'Alcohol (not included)', included: false },
    ],
  },
  {
    id: 'gold',
    name: 'Gold Pass',
    price: 3600,
    color: '#dfba6b',
    popular: true,
    features: [
      { icon: '🎟️', text: 'Entry for 1 Person', included: true },
      { icon: '🌊', text: 'DJ & Pool Access', included: true },
      { icon: '🍛', text: 'Unlimited Food', included: true },
      { icon: '🥃', text: '6 Pegs of Premium Spirit', included: true },
      { icon: '🛏️', text: 'Stay (not included)', included: false },
    ],
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    price: 9000,
    color: '#c084fc',
    features: [
      { icon: '👥', text: 'Entry for 2 People', included: true },
      { icon: '🌊', text: 'DJ & Pool Access', included: true },
      { icon: '🍛', text: 'Unlimited Food', included: true },
      { icon: '🥃', text: '16 Pegs of Premium Spirit', included: true },
      { icon: '🛏️', text: 'Stay (not included)', included: false },
    ],
  },
  {
    id: 'vvip',
    name: 'VVIP Pass',
    price: 12500,
    color: '#f97316',
    features: [
      { icon: '👥', text: 'Entry for 2 People', included: true },
      { icon: '🏨', text: 'Suite Room Stay', included: true },
      { icon: '⭐', text: 'VVIP Lounge Access', included: true },
      { icon: '🍾', text: 'Unlimited Premium Spirit', included: true },
      { icon: '🍛', text: 'Unlimited Food', included: true },
    ],
  },
];

const MENU_SECTIONS = [
  {
    id: 'snacks',
    title: 'Snacks',
    icon: '🍢',
    color: '#dfba6b',
    items: [
      { name: 'Paneer Tikka', desc: 'Grilled cottage cheese with classic Indian spices', tag: '' },
      { name: 'Peanut Chaat', desc: 'Tangy spiced peanuts with fresh herbs', tag: '' },
      { name: 'Dry Manchurian', desc: 'Crispy veggie balls in a bold Indo-Chinese sauce', tag: '🔥 Popular' },
      { name: 'Chili Chicken', desc: 'Wok-tossed chicken in a spicy chili glaze', tag: '🔥 Popular' },
    ],
  },
  {
    id: 'mains',
    title: 'Main Course',
    icon: '🍛',
    color: '#c084fc',
    items: [
      { name: 'Shahi Paneer', desc: 'Rich, creamy royal paneer curry', tag: '🌟 Signature' },
      { name: 'Dal Makhani', desc: 'Slow-cooked black lentils in buttery tomato gravy', tag: '' },
      { name: 'Butter Chicken', desc: 'Classic tandoori chicken in velvety cream sauce', tag: '🌟 Signature' },
      { name: 'Naan & Missi Roti', desc: 'Freshly baked bread from the tandoor', tag: '' },
      { name: 'Rice', desc: 'Steamed basmati rice', tag: '' },
      { name: 'Raita', desc: 'Cool yogurt with cucumber & spices', tag: '' },
      { name: 'Achar', desc: 'Traditional Indian pickle', tag: '' },
      { name: 'Salad', desc: 'Fresh garden salad', tag: '' },
      { name: 'Papad', desc: 'Crispy lentil wafers', tag: '' },
      { name: 'Sweet Dish', desc: 'Chef\'s special dessert of the day', tag: '🍮 Dessert' },
      { name: 'Ice Cream', desc: 'Premium scoops to end on a sweet note', tag: '🍦 Dessert' },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverage Selection',
    icon: '🥃',
    color: '#38bdf8',
    subsections: [
      {
        label: 'Soft Drinks',
        icon: '🥤',
        items: [
          { name: 'Soft Drinks', desc: 'Assorted chilled aerated beverages' },
          { name: 'Cold Drink', desc: 'Refreshing cold drinks to beat the heat' },
        ],
      },
      {
        label: 'Liqueur',
        icon: '🍾',
        items: [
          { name: 'Black Label', desc: 'Johnnie Walker Black Label Scotch Whisky' },
          { name: 'Absolut Vodka', desc: 'Premium Swedish vodka' },
          { name: 'Jägermeister', desc: 'German herbal liqueur, served chilled' },
        ],
      },
    ],
    note: '🍺 Beer will be available but it will be chargeable',
  },
];


const HIGHLIGHTS = [
  { icon: '🌊', text: 'Giant Pool' },
  { icon: '🎧', text: 'DJ m_a_n_yo' },
  { icon: '🌧️', text: 'Rain Arena' },
  { icon: '🍛', text: 'Gourmet Food' },
  { icon: '🏆', text: 'VIP Cabanas' },
  { icon: '📸', text: 'Photo Zones' },
];


// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('home');
  const [activeEvent, setActiveEvent] = useState('navrang');
  const [selectedNavrangPass, setSelectedNavrangPass] = useState('female');
  const [navrangQuantity, setNavrangQuantity] = useState(1);
  const [navrangForm, setNavrangForm] = useState({ name: '', phone: '', email: '' });
  const [navrangBookingOpen, setNavrangBookingOpen] = useState(false);
  const [navrangBookingMethod, setNavrangBookingMethod] = useState('WhatsApp direct');
  const [navrangIssuedBooking, setNavrangIssuedBooking] = useState(null);
  const [navrangPassError, setNavrangPassError] = useState('');
  const [isIssuingNavrangPass, setIsIssuingNavrangPass] = useState(false);
  const [navrangQr, setNavrangQr] = useState('');
  const [navrangQrError, setNavrangQrError] = useState(false);
  const [menuCat, setMenuCat] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState('gold');
  const [qty, setQty] = useState(1);
  const [payMode, setPayMode] = useState('upi');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [booking, setBooking] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // ── Countdown timer ──
  useEffect(() => {
    const target = new Date(activeEvent === 'navrang'
      ? '2026-10-09T17:00:00+05:30'
      : '2026-07-18T17:00:00+05:30');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown({ days, hours, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeEvent]);

  useEffect(() => {
    if (!navrangBookingOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = event => {
      if (event.key === 'Escape') setNavrangBookingOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [navrangBookingOpen]);

  const ticket = TICKETS.find(t => t.id === selectedTicket);
  const total = ticket ? ticket.price * qty : 0;
  const navrangUpiPayload = `upi://pay?${new URLSearchParams({
    pa: NAVRANG_EVENT.upiId,
    pn: 'AV Events and Co',
    tn: 'Navrang Dandiya Night ticket',
    cu: 'INR',
  }).toString()}`;

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(navrangUpiPayload, { width: 240, margin: 2 })
      .then(dataUrl => {
        if (!cancelled) setNavrangQr(dataUrl);
      })
      .catch(error => {
        console.error('Failed to generate Navrang UPI QR code', error);
        if (!cancelled) setNavrangQrError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [navrangUpiPayload]);

  const upiPayload = `upi://pay?${new URLSearchParams({
    pa: EVENT.upiId,
    pn: EVENT.name,
    tn: `${EVENT.name} Ticket`,
    am: total > 0 ? total.toFixed(2) : '0',
    cu: 'INR',
  }).toString()}`;

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&format=svg&data=${encodeURIComponent(upiPayload)}`;

  const handleForm = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleCard = e => setCard(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleNavrangForm = e => setNavrangForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const openNavrangBooking = (method = 'WhatsApp direct') => {
    setNavrangBookingMethod(method);
    setNavrangBookingOpen(true);
  };

  const handleNavrangWhatsAppBooking = async e => {
    e.preventDefault();
    const pass = NAVRANG_EVENT.passes.find(item => item.id === selectedNavrangPass);
    if (!pass) return;

    setIsIssuingNavrangPass(true);
    setNavrangPassError('');
    try {
      const name = navrangForm.name.trim();
      const phone = navrangForm.phone.trim();
      const email = navrangForm.email.trim();
      const total = pass.price * navrangQuantity;
      const whatsappNumber = phone.replace(/\D/g, '');
      const recipientNumber = whatsappNumber.length === 10 ? `91${whatsappNumber}` : whatsappNumber;
      const tickets = await Promise.all(Array.from({ length: navrangQuantity }, async (_, index) => {
        const code = `NAV-${crypto.randomUUID().slice(0, 12).toUpperCase()}`;
        const qrCode = await QRCode.toDataURL(`NAVRANG:${code}`, { width: 180, margin: 1 });
        const ticket = { code, qrCode, number: index + 1 };
        const imageBlob = await createNavrangPassImage(ticket, {
          name,
          passId: pass.id,
          passName: pass.name,
          price: pass.price,
          quantity: navrangQuantity,
        });
        const shareMessage = [
          `🎟️ Your Navrang Dandiya Night ${pass.name}`,
          `Name: ${name}`,
          `Pass ID: ${code}`,
          `Friday, 9 October 2026 | ${NAVRANG_EVENT.time}`,
          `${NAVRANG_EVENT.venue}, ${NAVRANG_EVENT.address}`,
          'Please keep your payment confirmation for entry.',
        ].join('\n');
        return {
          ...ticket,
          imageBlob,
          whatsappUrl: `https://wa.me/${recipientNumber}?text=${encodeURIComponent(shareMessage)}`,
        };
      }));
      const qrImageUrl = new URL('/navrang-upi-qr.png', window.location.origin).href;
      const message = [
        '🎟️ NAVRANG DANDIYA NIGHT – BOOKING',
        '━━━━━━━━━━━━━━━━━━━━━',
        `👤 Name: ${name}`,
        `📞 Phone: ${phone}`,
        `📧 Email: ${email}`,
        `🎫 Pass: ${pass.name}`,
        `🔢 Quantity: ${navrangQuantity}`,
        `💰 Pass total: ₹${total.toLocaleString('en-IN')}`,
        `🪪 Pass IDs: ${tickets.map(ticket => ticket.code).join(', ')}`,
        '━━━━━━━━━━━━━━━━━━━━━',
        `📅 Friday, 9 October 2026 | ${NAVRANG_EVENT.time}`,
        `📍 ${NAVRANG_EVENT.venue}, ${NAVRANG_EVENT.address}`,
        `💳 UPI ID: ${NAVRANG_EVENT.upiId}`,
        `🧾 Payment QR: ${qrImageUrl}`,
        'Please confirm my payment and booking. Thank you!',
      ].join('\n');

      setNavrangIssuedBooking({
        name,
        phone,
        email,
        passName: pass.name,
        passId: pass.id,
        price: pass.price,
        quantity: navrangQuantity,
        total,
        tickets,
        whatsappUrl: `https://wa.me/${NAVRANG_EVENT.whatsappNumber}?text=${encodeURIComponent(message)}`,
      });
    } catch (error) {
      console.error('Failed to issue Navrang passes', error);
      setNavrangPassError('We could not create your passes. Please try again.');
    } finally {
      setIsIssuingNavrangPass(false);
    }
  };

  const shareNavrangPass = async ticket => {
    try {
      const file = new File([ticket.imageBlob], `${ticket.code}.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Navrang Dandiya Night Pass',
          text: `Navrang Dandiya Night pass for ${navrangIssuedBooking.name} · ${ticket.code}`,
        });
        return;
      }

      const downloadUrl = URL.createObjectURL(file);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = file.name;
      downloadLink.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setNavrangPassError('Pass image downloaded. Open its WhatsApp link below and attach the image to send it.');
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Failed to share Navrang pass', error);
      setNavrangPassError('Could not share this pass. Use Download / Print Passes instead.');
    }
  };

  const handleBooking = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return alert('Please fill all fields');
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          ticketType: selectedTicket,
          quantity: qty,
          totalPrice: total,
          paymentMethod: payMode === 'upi' ? 'UPI' : 'Card',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBooking({ ...data.booking, ticketName: ticket.name });
        setStatus('success');
      } else throw new Error('Booking failed');
    } catch {
      // Offline fallback – still show confirmation
      setBooking({
        name: form.name,
        phone: form.phone,
        email: form.email,
        ticketName: ticket.name,
        quantity: qty,
        totalPrice: total,
        txnId: 'TXN-' + Math.random().toString(36).slice(2, 11).toUpperCase(),
        paymentMethod: payMode === 'upi' ? 'UPI' : 'Card',
      });
      setStatus('success');
    }
  };

  const reset = () => {
    setForm({ name: '', phone: '', email: '' });
    setCard({ number: '', expiry: '', cvv: '' });
    setStatus('idle');
    setBooking(null);
  };

  const sendWhatsApp = () => {
    if (!booking) return;
    const waNumber = '918272834909';
    const msg = [
      '🎟️ *RAIN AFFAIR – BOOKING CONFIRMATION*',
      '━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${booking.name}`,
      `📞 *Phone:* ${booking.phone}`,
      `📧 *Email:* ${booking.email}`,
      '━━━━━━━━━━━━━━━━━━━━━',
      `🎫 *Pass:* ${booking.ticketName}`,
      `🔢 *Quantity:* ${booking.quantity}`,
      `💰 *Amount Paid:* ₹${booking.totalPrice?.toLocaleString('en-IN')}`,
      `💳 *Payment:* ${booking.paymentMethod}`,
      `🆔 *Txn ID:* ${booking.txnId}`,
      '━━━━━━━━━━━━━━━━━━━━━',
      `📅 *Event:* Rain Affair – 18 July 2026, 5:00 PM Onwards`,
      `📍 *Venue:* Mastiff Citadel RC, Dehradun`,
      '━━━━━━━━━━━━━━━━━━━━━',
      '_Please show this message at the entry gate. See you there! 🌊🎧_',
    ].join('%0A');
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
  };

  const printTicket = () => window.print();

  // ── NAV ──
  const navItems = [
    { id: 'home', label: '🏠 Home' },
    { id: 'tickets', label: '🎟️ Book Tickets' },
    { id: 'menu', label: '🍽️ Menu' },
    { id: 'venue', label: '📍 Venue' },
  ];

  return (
    <div className={`root ${activeEvent === 'navrang' ? 'navrang-theme' : ''}`}>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setTab('home')}>
          <span className="brand-av">AV</span>
          <span className="brand-rest"> EVENTSZ</span>
        </div>
        <div className="nav-events" aria-label="Choose an event">
          <button
            className={`nav-btn ${activeEvent === 'navrang' ? 'active' : ''}`}
            aria-pressed={activeEvent === 'navrang'}
            onClick={() => { setActiveEvent('navrang'); setTab('home'); setMobileMenuOpen(false); }}
          >
            🪔 Navrang Dandiya
          </button>
          <button
            className={`nav-btn ${activeEvent === 'rain' ? 'active' : ''}`}
            aria-pressed={activeEvent === 'rain'}
            onClick={() => { setActiveEvent('rain'); setTab('home'); setMobileMenuOpen(false); }}
          >
            🌊 Past Event: Rain Affair
          </button>
        </div>
        <a className="instagram-nav-link" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" aria-label="Follow AV Events on Instagram">
          <span aria-hidden="true">◎</span> Instagram
        </a>
        {activeEvent === 'rain' && (
          <>
            <div className={`nav-items ${mobileMenuOpen ? 'open' : ''}`}>
              {navItems.map(n => (
                <button
                  key={n.id}
                  className={`nav-btn ${tab === n.id ? 'active' : ''}`}
                  onClick={() => { setTab(n.id); setMobileMenuOpen(false); }}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <button className="hamburger" onClick={() => setMobileMenuOpen(p => !p)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </>
        )}
      </nav>

      {/* ── HOME ── */}
      {tab === 'home' && activeEvent === 'rain' && (
        <main className="page fade-in">
          {/* Hero */}
          <section className="hero">
            <div className="hero-posters">
              <img src="/flyer.jpg" alt="Rain Affair Poster" className="poster poster-main" />
              <img src="/flyer_pricing.jpg" alt="Ticket Pricing" className="poster poster-sub" />
            </div>
            <div className="hero-content">
              <span className="pill">PAST SUCCESSFUL EVENT</span>
              <h1 className="hero-title shine">RAIN AFFAIR</h1>
              <p className="hero-sub">{EVENT.tagline}</p>

              <div className="meta-grid">
                <div className="meta-item"><span>📅</span><div><b>{EVENT.date}, {EVENT.day}</b><p>Entry: 5:00 PM | Gate closes: 8:00 PM</p></div></div>
                <div className="meta-item"><span>📍</span><div><b>{EVENT.venue}</b><p>RC Bhimawala, Vikasnagar, UK</p></div></div>
                <div className="meta-item"><span>🎧</span><div><b>DJ m_a_n_yo</b><p>Live Performance</p></div></div>
              </div>

              <p className="hero-desc">{EVENT.description}</p>
              <p className="dress-code">👗 Dress Code: <em>{EVENT.dressCode}</em></p>

              <div className="hero-btns">
                <button className="btn-gold" onClick={() => setTab('tickets')}>Book Passes Now</button>
                <button className="btn-outline" onClick={() => setTab('menu')}>View Menu</button>
              </div>
            </div>
          </section>

          {/* Countdown */}
          <section className="countdown-section">
            <p className="countdown-label">EVENT STARTS IN</p>
            <div className="countdown-grid">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.mins, label: 'Minutes' },
                { val: countdown.secs, label: 'Seconds' },
              ].map(c => (
                <div key={c.label} className="countdown-box">
                  <span className="countdown-val">{String(c.val).padStart(2, '0')}</span>
                  <span className="countdown-unit">{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="highlights">
            {HIGHLIGHTS.map(h => (
              <div key={h.text} className="highlight-chip">
                <span>{h.icon}</span> {h.text}
              </div>
            ))}
          </section>

          {/* Ticket Preview strip */}
          <section className="ticket-strip">
            <h2 className="section-title">Choose Your Experience</h2>
            <div className="strip-grid">
              {TICKETS.map(t => (
                <div key={t.id} className="strip-card" onClick={() => { setSelectedTicket(t.id); setTab('tickets'); }}>
                  {t.popular && <span className="popular-badge">⭐ Most Popular</span>}
                  <div className="strip-name" style={{ color: t.color }}>{t.name}</div>
                  <div className="strip-price">₹{t.price.toLocaleString('en-IN')}</div>
                  <button className="btn-gold-sm">Select</button>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {tab === 'home' && activeEvent === 'navrang' && (
        <main className="page fade-in">
          <section className="countdown-section navrang-countdown-top">
            <p className="countdown-label">EVENT STARTS IN</p>
            <div className="countdown-grid">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.mins, label: 'Minutes' },
                { val: countdown.secs, label: 'Seconds' },
              ].map(c => (
                <div key={c.label} className="countdown-box">
                  <span className="countdown-val">{String(c.val).padStart(2, '0')}</span>
                  <span className="countdown-unit">{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="hero navrang-hero">
            <img
              className="navrang-art"
              src="/navrang-poster.png"
              alt="Navrang 2026 Dandiya Night poster featuring DJ Adi"
            />

            <div className="hero-content">
              <span className="pill">A FESTIVE NIGHT IN DEHRADUN</span>
              <h1 className="hero-title shine navrang-title">NAVRANG<br />DANDIYA NIGHT</h1>
              <p className="hero-sub">{NAVRANG_EVENT.tagline}</p>

              <div className="meta-grid navrang-meta-grid">
                <div className="meta-item">
                  <span>📅</span>
                  <div><b>{NAVRANG_EVENT.day}, {NAVRANG_EVENT.date}</b><p>Festivities from {NAVRANG_EVENT.time}</p></div>
                </div>
                <div className="meta-item">
                  <span>📍</span>
                  <div><b>{NAVRANG_EVENT.venue}</b><p>{NAVRANG_EVENT.address}</p></div>
                </div>
              </div>

              <p className="hero-desc">{NAVRANG_EVENT.description}</p>
              <p className="dress-code">✨ Celebrate Navrang Dandiya Night with AV Events &amp; Co.</p>

              <div className="hero-btns">
                <button className="btn-gold navrang-cta" type="button" onClick={() => openNavrangBooking()}>
                  Book Tickets
                </button>
                <a
                  className="btn-outline navrang-cta"
                  href={`https://wa.me/?text=${encodeURIComponent([
                    `🎉 ${NAVRANG_EVENT.name}`,
                    `📅 ${NAVRANG_EVENT.day}, ${NAVRANG_EVENT.date} | ${NAVRANG_EVENT.time}`,
                    `📍 ${NAVRANG_EVENT.venue}, ${NAVRANG_EVENT.address}`,
                    '🎟️ Passes: Female ₹249 | Male ₹349 | Couple ₹499',
                    `Book tickets: ${NAVRANG_EVENT.bookMyShowUrl}`,
                    `More event details and UPI QR: ${window.location.origin}`,
                  ].join('\n'))}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on WhatsApp
                </a>
                <a className="btn-outline navrang-cta" href={NAVRANG_EVENT.bookMyShowUrl} target="_blank" rel="noreferrer">
                  Book Online
                </a>
                <button className="btn-outline navrang-cta" type="button" onClick={() => openNavrangBooking('Physical pass pickup')}>
                  Get Physical Passes
                </button>
                <a className="btn-outline navrang-cta" href="#navrang-menu">
                  View Menu
                </a>
              </div>
              <p className="navrang-fee-note">Online booking on BookMyShow includes an extra platform fee. Physical passes are available at the same ticket price with no platform fee.</p>
              <div className="navrang-booking-links" aria-label="Online ticket booking websites">
                <span>BOOK ONLINE</span>
                <a href={NAVRANG_EVENT.bookMyShowUrl} target="_blank" rel="noreferrer">BookMyShow ↗</a>
                <a href={NAVRANG_EVENT.sortMySceneUrl} target="_blank" rel="noreferrer">SortMyScene ↗</a>
                <a href={NAVRANG_EVENT.districtUrl} target="_blank" rel="noreferrer">District ↗</a>
              </div>
            </div>
          </section>

          <section className="navrang-benefits" aria-labelledby="navrang-benefits-title">
            <h2 className="section-title" id="navrang-benefits-title">What You Get: Event Benefits &amp; Highlights</h2>
            <div className="navrang-benefit-grid">
              {NAVRANG_EVENT.benefits.map(benefit => (
                <article className="navrang-benefit-card" key={benefit.title}>
                  <span className="navrang-benefit-icon" aria-hidden="true">{benefit.icon}</span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.detail}</p>
                    {benefit.link && (
                      <a href={benefit.link} target="_blank" rel="noreferrer">{benefit.linkText} ↗</a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="navrang-menu" id="navrang-menu" aria-labelledby="navrang-menu-title">
            <h2 className="section-title" id="navrang-menu-title">Event Menu</h2>
            <p className="navrang-menu-intro">Explore the food and drink options available at Navrang Dandiya Night.</p>
            <div className="navrang-menu-grid">
              {NAVRANG_EVENT.menuSections.map(section => (
                <article className="navrang-menu-card" key={section.title}>
                  <div className="navrang-menu-heading">
                    <span aria-hidden="true">{section.icon}</span>
                    <h3>{section.title}</h3>
                  </div>
                  <ul>
                    {section.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="ticket-strip navrang-ticket-strip" id="passes">
            <h2 className="section-title">Choose Your Pass</h2>
            <div className="strip-grid navrang-pass-grid">
              {NAVRANG_EVENT.passes.map(pass => (
                <article
                  key={pass.id}
                  className={`strip-card navrang-pass-card ${selectedNavrangPass === pass.id ? 'selected' : ''}`}
                  aria-label={`${pass.name}, ₹${pass.price}`}
                >
                  <span className="navrang-pass-icon" aria-hidden="true">{pass.icon}</span>
                  <div className="strip-name">{pass.name}</div>
                  <div className="strip-price">₹{pass.price.toLocaleString('en-IN')}</div>
                  <button
                    className="btn-gold-sm"
                    type="button"
                    aria-pressed={selectedNavrangPass === pass.id}
                    onClick={() => {
                      setSelectedNavrangPass(pass.id);
                      openNavrangBooking();
                    }}
                  >
                    {selectedNavrangPass === pass.id ? 'Book This Pass' : 'Select Pass'}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="navrang-payment glass" aria-labelledby="navrang-payment-title">
            <div className="navrang-payment-copy">
              <span className="pill">DIRECT UPI PAYMENT</span>
              <h2 id="navrang-payment-title">Pay for your Navrang pass</h2>
              <p>Scan with any UPI app and enter the exact total for your pass. After paying, send your booking details to us on WhatsApp.</p>
              <a className="navrang-upi-link" href={navrangUpiPayload}>Pay with UPI app</a>
              <p className="navrang-upi-id">UPI ID: <strong>{NAVRANG_EVENT.upiId}</strong></p>
            </div>
            <div className="navrang-payment-qr">
              {navrangQr ? (
                <>
                  <img src={navrangQr} alt={`UPI payment QR code for ${NAVRANG_EVENT.upiId}`} />
                  <a href={navrangQr} download="navrang-upi-qr.png">Download QR code</a>
                </>
              ) : navrangQrError ? (
                <p role="alert">QR code could not be generated. You can still pay using the UPI ID shown.</p>
              ) : (
                <p>Preparing your payment QR code…</p>
              )}
            </div>
          </section>

          <section className="navrang-pickup glass">
            <div>
              <span className="pill">NO PLATFORM FEE</span>
              <h2>Pick up physical passes</h2>
              <p>Get your pass at the same ticket price, with no online platform fee. Use the map link for the pickup location.</p>
            </div>
            <div className="navrang-pickup-links">
              <a className="btn-gold" href={NAVRANG_EVENT.pickupUrl} target="_blank" rel="noreferrer">Open Pickup Location</a>
              <a className="navrang-sort-link" href={NAVRANG_EVENT.sortMySceneUrl} target="_blank" rel="noreferrer">Book on SortMyScene ↗</a>
            </div>
          </section>
        </main>
      )}

      {activeEvent === 'navrang' && navrangBookingOpen && (
        <div
          className="navrang-modal-backdrop"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setNavrangBookingOpen(false);
          }}
        >
          <section className="navrang-booking-form glass" role="dialog" aria-modal="true" aria-labelledby="navrang-booking-title">
            <button className="navrang-modal-close" type="button" aria-label="Close ticket booking" onClick={() => setNavrangBookingOpen(false)}>×</button>
            <h3 id="navrang-booking-title">{navrangIssuedBooking ? 'Your Navrang Pass' : 'Navrang Ticket Enquiry'}</h3>
            {!navrangIssuedBooking ? (
              <>
                <p className="navrang-form-note">Choose your pass and enter your details. Your named digital pass will be created immediately after you submit.</p>
                <form onSubmit={handleNavrangWhatsAppBooking}>
              <fieldset className="navrang-platform-options">
                <legend>Where would you like to book?</legend>
                {[
                  { method: 'WhatsApp direct' },
                  { method: 'BookMyShow', url: NAVRANG_EVENT.bookMyShowUrl },
                  { method: 'SortMyScene', url: NAVRANG_EVENT.sortMySceneUrl },
                  { method: 'District', url: NAVRANG_EVENT.districtUrl },
                  { method: 'Physical pass pickup', url: NAVRANG_EVENT.pickupUrl },
                ].map(({ method, url }) => (
                  <div className={`navrang-platform-option ${navrangBookingMethod === method ? 'selected' : ''}`} key={method}>
                    <label className="navrang-platform-choice">
                      <input
                        type="radio"
                        name="bookingMethod"
                        value={method}
                        checked={navrangBookingMethod === method}
                        onChange={() => setNavrangBookingMethod(method)}
                      />
                      <span>{method}</span>
                    </label>
                    {url && (
                      <a
                        className="navrang-platform-link"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={method === 'Physical pass pickup' ? 'Open physical pass pickup location' : `Open ${method} booking page`}
                        onClick={() => setNavrangBookingMethod(method)}
                      >
                        Open ↗
                      </a>
                    )}
                  </div>
                ))}
              </fieldset>
              <div className="navrang-modal-pass-grid" role="group" aria-label="Select pass type">
                {NAVRANG_EVENT.passes.map(pass => (
                  <button
                    className={`navrang-modal-pass ${selectedNavrangPass === pass.id ? 'selected' : ''}`}
                    key={pass.id}
                    type="button"
                    aria-pressed={selectedNavrangPass === pass.id}
                    onClick={() => setSelectedNavrangPass(pass.id)}
                  >
                    <span aria-hidden="true">{pass.icon}</span>
                    <strong>{pass.name}</strong>
                    <span>₹{pass.price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
              <div className="navrang-form-fields">
                <div className="field">
                  <label htmlFor="navrang-name">Full Name *</label>
                  <input id="navrang-name" name="name" value={navrangForm.name} onChange={handleNavrangForm} autoComplete="name" placeholder="Your name" required autoFocus />
                </div>
                <div className="field">
                  <label htmlFor="navrang-phone">Phone Number *</label>
                  <input id="navrang-phone" name="phone" type="tel" value={navrangForm.phone} onChange={handleNavrangForm} autoComplete="tel" placeholder="+91 9876543210" required />
                </div>
                <div className="field navrang-email-field">
                  <label htmlFor="navrang-email">Email Address *</label>
                  <input id="navrang-email" name="email" type="email" value={navrangForm.email} onChange={handleNavrangForm} autoComplete="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="navrang-order-summary">
                <span>{NAVRANG_EVENT.passes.find(pass => pass.id === selectedNavrangPass)?.name} × {navrangQuantity}</span>
                <strong>₹{((NAVRANG_EVENT.passes.find(pass => pass.id === selectedNavrangPass)?.price || 0) * navrangQuantity).toLocaleString('en-IN')}</strong>
              </div>
              <div className="navrang-quantity">
                <span>Number of passes</span>
                <div className="qty-row">
                  <button type="button" className="qty-btn" aria-label="Remove one pass" onClick={() => setNavrangQuantity(quantity => Math.max(1, quantity - 1))}>−</button>
                  <span className="qty-val" aria-live="polite">{navrangQuantity}</span>
                  <button type="button" className="qty-btn" aria-label="Add one pass" onClick={() => setNavrangQuantity(quantity => quantity + 1)}>+</button>
                </div>
              </div>
                  {navrangPassError && <p className="navrang-pass-error" role="alert">{navrangPassError}</p>}
                  <button className="btn-gold navrang-whatsapp-button" type="submit" disabled={isIssuingNavrangPass}>
                    {isIssuingNavrangPass ? 'Creating Your Passes…' : 'Generate My Named Pass'}
                  </button>
                  <p className="navrang-form-note navrang-payment-disclaimer">Passes are generated when this form is submitted. Payment is not verified by this form; keep your payment confirmation available.</p>
                </form>
              </>
            ) : (
              <div className="navrang-issued-tickets">
                <div className="navrang-issued-heading">
                  <span className="pill">PASS CREATED</span>
                  <h4>Your Navrang pass{navrangIssuedBooking.quantity > 1 ? 'es are' : ' is'} ready, {navrangIssuedBooking.name}!</h4>
                  <p>Save or print each pass and keep your payment confirmation available at entry.</p>
                </div>
                {navrangPassError && <p className="navrang-pass-error" role="status">{navrangPassError}</p>}
                <div className="navrang-issued-grid">
                  {navrangIssuedBooking.tickets.map(ticket => (
                    <article className="navrang-pass-ticket" key={ticket.code}>
                      <header className="navrang-pass-ticket-header">
                        <span>AV EVENTS &amp; CO.</span>
                        <span>NAVRANG 2026</span>
                      </header>
                      <div className="navrang-pass-ticket-body">
                        <div>
                          <span className="navrang-pass-ticket-label">ADMIT PASS {navrangIssuedBooking.quantity > 1 ? `${ticket.number} OF ${navrangIssuedBooking.quantity}` : ''}</span>
                          <h5>Navrang<br />Dandiya Night</h5>
                          <p className="navrang-ticket-holder">{navrangIssuedBooking.name}</p>
                          <p>{navrangIssuedBooking.passName} · ₹{navrangIssuedBooking.price.toLocaleString('en-IN')}</p>
                        </div>
                        <img src={ticket.qrCode} alt={`Pass ID QR for ${ticket.code}; organizer checks manually`} />
                      </div>
                      <div className="navrang-pass-ticket-details">
                        <span><b>DATE</b>Friday, 9 October 2026</span>
                        <span><b>TIME</b>{NAVRANG_EVENT.time}</span>
                        <span><b>VENUE</b>{NAVRANG_EVENT.venue}, {NAVRANG_EVENT.address}</span>
                      </div>
                      <footer className="navrang-pass-ticket-code">PASS ID: {ticket.code}</footer>
                      <div className="navrang-issued-pass-actions">
                        <button className="btn-whatsapp navrang-whatsapp-button" type="button" onClick={() => shareNavrangPass(ticket)}>
                          Share This Pass on WhatsApp
                        </button>
                        <a className="navrang-pass-whatsapp-link" href={ticket.whatsappUrl} target="_blank" rel="noreferrer">
                          Open WhatsApp for {navrangIssuedBooking.name} ↗
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="navrang-ticket-disclaimer">This form creates a pass and unique ID in this browser only; it does not record or validate bookings or verify payment. Keep your UPI payment confirmation and have the event team check the pass manually.</p>
                <p className="navrang-ticket-disclaimer">To send the ticket image, tap Share This Pass on WhatsApp, choose WhatsApp and the recipient, then confirm Send. Some browsers will download the image so you can attach it in WhatsApp.</p>
                <div className="navrang-issued-actions">
                  <button className="btn-gold" type="button" onClick={printTicket}>Download / Print Pass{navrangIssuedBooking.quantity > 1 ? 'es' : ''}</button>
                  <a className="btn-outline navrang-cta" href={navrangIssuedBooking.whatsappUrl} target="_blank" rel="noreferrer">
                    Send Booking Details to Event Team
                  </a>
                  <button className="btn-outline" type="button" onClick={() => {
                    setNavrangIssuedBooking(null);
                    setNavrangForm({ name: '', phone: '', email: '' });
                    setNavrangQuantity(1);
                  }}>
                    Book Another Pass
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ── TICKETS ── */}
      {activeEvent === 'rain' && tab === 'tickets' && (
        <main className="page fade-in">
          <h2 className="page-title">Book Your Experience</h2>

          {status !== 'success' ? (
            <div className="booking-layout">
              {/* Left: Ticket cards */}
              <div className="ticket-cards">
                {TICKETS.map(t => (
                  <div
                    key={t.id}
                    className={`ticket-card ${selectedTicket === t.id ? 'selected' : ''}`}
                    style={{ '--accent': t.color }}
                    onClick={() => setSelectedTicket(t.id)}
                  >
                    {t.popular && <span className="popular-badge">⭐ Most Popular</span>}
                    <div className="tc-header">
                      <h3 style={{ color: t.color }}>{t.name.toUpperCase()}</h3>
                      <span className="tc-price">₹{t.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="tc-divider" style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}></div>
                    <ul className="tc-features">
                      {t.features.map((f, i) => (
                        <li key={i} className={f.included ? '' : 'excluded'}>
                          <span>{f.icon}</span> {f.text}
                        </li>
                      ))}
                    </ul>
                    <div className="tc-select-btn" style={selectedTicket === t.id ? { background: `linear-gradient(135deg, ${t.color}, #9e7d3b)`, color: '#070709' } : {}}>
                      {selectedTicket === t.id ? '✓ Selected' : 'Select Pass'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Booking form */}
              <div className="form-panel glass">
                <h3 className="gold">Your Details</h3>

                <form onSubmit={handleBooking}>
                  <div className="field">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleForm} placeholder="e.g. " required />
                  </div>
                  <div className="field">
                    <label>Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleForm} placeholder="+91 9876543210" required />
                  </div>
                  <div className="field">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleForm} placeholder="devansh@email.com" required />
                  </div>

                  {/* Quantity */}
                  <div className="field">
                    <label>Number of Passes</label>
                    <div className="qty-row">
                      <button type="button" className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                      <span className="qty-val">{qty}</span>
                      <button type="button" className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="field">
                    <label>Payment Method</label>
                    <div className="pay-toggle">
                      <button type="button" className={payMode === 'upi' ? 'pay-active' : ''} onClick={() => setPayMode('upi')}>📱 UPI / QR</button>
                      <button type="button" className={payMode === 'card' ? 'pay-active' : ''} onClick={() => setPayMode('card')}>💳 Card</button>
                    </div>
                  </div>

                  {/* UPI Panel */}
                  {payMode === 'upi' && (
                    <div className="upi-panel fade-in">
                      <div className="qr-frame">
                        <div className="qr-title">SCAN TO PAY</div>
                        <div className="qr-visual">
                          <img src={upiQrUrl} alt="UPI QR Code" className="qr-image" />
                        </div>
                        <div className="qr-upi-id">UPI: {EVENT.upiId}</div>
                        <div className="qr-amount">Amount: <strong>₹{total.toLocaleString('en-IN')}</strong></div>
                      </div>
                      <p className="upi-note">Pay via GPay, PhonePe, or Paytm, then click Book Now to confirm your seat.</p>
                    </div>
                  )}

                  {/* Card Panel */}
                  {payMode === 'card' && (
                    <div className="card-panel fade-in">
                      <div className="field">
                        <label>Card Number</label>
                        <input name="number" value={card.number} onChange={handleCard} placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="two-col">
                        <div className="field">
                          <label>Expiry (MM/YY)</label>
                          <input name="expiry" value={card.expiry} onChange={handleCard} placeholder="12/28" />
                        </div>
                        <div className="field">
                          <label>CVV</label>
                          <input name="cvv" value={card.cvv} onChange={handleCard} placeholder="•••" type="password" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="summary-box">
                    <div className="sum-row"><span>{ticket?.name} × {qty}</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                    <div className="sum-row total-row"><span>Grand Total</span><span className="gold">₹{total.toLocaleString('en-IN')}</span></div>
                  </div>

                  <button className="btn-gold block" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? '⏳ Confirming Booking...' : `✓ Confirm Booking – ₹${total.toLocaleString('en-IN')}`}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // ── SUCCESS RECEIPT ──
            <div className="ticket-wrapper fade-in">
              {/* Digital Ticket */}
              <div className="digital-ticket" id="digital-ticket">
                {/* Ticket Top Band */}
                <div className="ticket-top-band">
                  <div className="ticket-brand">
                    <span className="brand-av">AV</span>
                    <span className="brand-rest"> EVENTSZ</span>
                  </div>
                  <div className="ticket-status-badge">✓ CONFIRMED</div>
                </div>

                {/* Event Title Section */}
                <div className="ticket-hero-section">
                  <div className="ticket-rain-drops">🌧️</div>
                  <h1 className="ticket-event-title shine">RAIN AFFAIR</h1>
                  <p className="ticket-event-tagline">POOL • DJ • RAIN EXPERIENCE</p>
                  <div className="ticket-event-meta">
                    <span>📅 18 July 2026 &nbsp;|&nbsp; Saturday</span>
                    <span>⏰ 5:00 PM Onwards</span>
                    <span>📍 Mastiff Citadel RC, Dehradun</span>
                  </div>
                </div>

                {/* Perforation line */}
                <div className="ticket-perforation">
                  <div className="perf-circle left"></div>
                  <div className="perf-line"></div>
                  <div className="perf-circle right"></div>
                </div>

                {/* Ticket Details */}
                <div className="ticket-details-section">
                  <div className="ticket-holder-info">
                    <div className="ticket-field">
                      <span className="tf-label">ATTENDEE</span>
                      <span className="tf-value">{booking.name}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">PASS TYPE</span>
                      <span className="tf-value pass-name" style={{ color: TICKETS.find(t => t.name === booking.ticketName)?.color || 'var(--gold)' }}>{booking.ticketName?.toUpperCase()}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">QUANTITY</span>
                      <span className="tf-value">{booking.quantity} {booking.quantity > 1 ? 'Passes' : 'Pass'}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">PHONE</span>
                      <span className="tf-value">{booking.phone}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">EMAIL</span>
                      <span className="tf-value">{booking.email}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">PAYMENT</span>
                      <span className="tf-value">{booking.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Amount + TXN */}
                  <div className="ticket-amount-block">
                    <div className="ticket-amount-label">TOTAL PAID</div>
                    <div className="ticket-amount-value">₹{booking.totalPrice?.toLocaleString('en-IN')}</div>
                    <div className="ticket-txn">TXN: {booking.txnId}</div>
                  </div>
                </div>

                {/* Barcode strip */}
                <div className="ticket-barcode-section">
                  <div className="barcode-visual">
                    {Array.from({ length: 42 }).map((_, i) => (
                      <div
                        key={i}
                        className="barcode-bar"
                        style={{ width: [1,2,1,3,1,2,1,1,2,3,1,2,1,2,1,3,2,1,1,2,3,1,2,1,1,2,3,1,2,1,2,1,3,1,2,3,1,1,2,3,1,2][i] * 2 + 'px' }}
                      />
                    ))}
                  </div>
                  <div className="barcode-txn-text">{booking.txnId}</div>
                  <div className="ticket-dress-code">👗 Smart Pool Wear / Summer Casuals</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ticket-actions">
                <button className="btn-whatsapp" onClick={sendWhatsApp}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send Ticket on WhatsApp
                </button>
                <button className="btn-print" onClick={printTicket}>
                  🖨️ Print / Save
                </button>
                <button className="btn-outline" onClick={reset}>
                  ＋ Book More Passes
                </button>
              </div>

              <p className="wa-hint">📲 Tap <strong style={{color:'var(--gold)'}}>"Send Ticket on WhatsApp"</strong> to share your booking confirmation to our team at +91 82728 34909</p>
            </div>
          )}
        </main>
      )}

      {/* ── MENU ── */}
      {activeEvent === 'rain' && tab === 'menu' && (
        <main className="page fade-in">
          <h2 className="page-title">Food &amp; Beverages</h2>
          <p className="page-sub">Curated exclusively for Rain Affair guests &nbsp;•&nbsp; All-inclusive with your pass</p>

          <div className="menu-sections">
            {MENU_SECTIONS.map(section => (
              <div key={section.id} className="menu-section-card glass">
                {/* Section Header */}
                <div className="msc-header" style={{ borderColor: section.color }}>
                  <span className="msc-icon">{section.icon}</span>
                  <h3 className="msc-title" style={{ color: section.color }}>{section.title}</h3>
                  <div className="msc-divider" style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }}></div>
                </div>

                {/* Regular items */}
                {section.items && (
                  <ul className="msc-list">
                    {section.items.map((item, i) => (
                      <li key={i} className="msc-item">
                        <div className="msc-item-left">
                          <span className="msc-dot" style={{ background: section.color }}></span>
                          <div>
                            <span className="msc-name">{item.name}</span>
                            {item.desc && <span className="msc-desc">{item.desc}</span>}
                          </div>
                        </div>
                        {item.tag && <span className="msc-tag">{item.tag}</span>}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsections (beverages) */}
                {section.subsections && (
                  <div className="msc-subsections">
                    {section.subsections.map(sub => (
                      <div key={sub.label} className="msc-subsection">
                        <div className="msc-sub-label">
                          <span>{sub.icon}</span> {sub.label}
                        </div>
                        <ul className="msc-list">
                          {sub.items.map((item, i) => (
                            <li key={i} className="msc-item">
                              <div className="msc-item-left">
                                <span className="msc-dot" style={{ background: section.color }}></span>
                                <div>
                                  <span className="msc-name">{item.name}</span>
                                  {item.desc && <span className="msc-desc">{item.desc}</span>}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Beer note */}
                {section.note && (
                  <div className="msc-note">{section.note}</div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}


      {/* ── VENUE ── */}
      {activeEvent === 'rain' && tab === 'venue' && (
        <main className="page fade-in">
          <h2 className="page-title">Venue & Location</h2>
          <div className="venue-layout">
            <div className="venue-info glass">
              <h3 className="gold">{EVENT.venue}</h3>
              <p className="venue-addr">{EVENT.address}</p>
              <div className="venue-feats">
                {[['🅿️', 'Valet Parking'], ['🛡️', 'High Security'], ['🍹', 'Premium Lounge'], ['🏊', 'Olympic Pool'], ['🎭', 'Rain Arena']].map(([icon, text]) => (
                  <div key={text} className="venue-feat"><span>{icon}</span><span>{text}</span></div>
                ))}
              </div>
              <div className="venue-contact">
                <h4>VIP Bookings & Enquiries</h4>
                <a href={`tel:${EVENT.phone}`} className="phone-link gold">{EVENT.phoneDisplay}</a>
                <p className="call-note">📲 Call or WhatsApp for cabana bookings & group packages</p>
              </div>
              <button className="btn-gold mt-16" onClick={() => setTab('tickets')}>Book Passes Now</button>
            </div>
             <div className="map-wrapper">
              <iframe
                title="Mastiff Citadel RC Location"
                src="https://maps.google.com/maps?q=Mastiff+Citadel+RC+Bhimawala+Vikasnagar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 380, borderRadius: 16 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </main>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <span className="brand-av">AV</span><span className="brand-rest"> EVENTSZ</span>
            <p>{activeEvent === 'navrang' ? `${NAVRANG_EVENT.name} – ${NAVRANG_EVENT.date}` : `Rain Affair – ${EVENT.date}`}</p>
          </div>
          {activeEvent === 'rain' ? (
            <>
              <div>
                <p>📞 <a href={`tel:${EVENT.phone}`} className="gold">{EVENT.phoneDisplay}</a></p>
                <p>📍 {EVENT.address}</p>
              </div>
              <button className="btn-gold-sm" onClick={() => setTab('tickets')}>Book Now</button>
            </>
          ) : (
            <>
              <p>📍 {NAVRANG_EVENT.venue}, {NAVRANG_EVENT.address} &nbsp;•&nbsp; <a href={NAVRANG_EVENT.pickupUrl} target="_blank" rel="noreferrer" className="gold">Physical pass pickup location</a></p>
              <button className="btn-gold-sm" onClick={() => openNavrangBooking()}>Book Tickets</button>
            </>
          )}
        </div>
        <a className="footer-instagram" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">
          ◎ Follow <strong>@co.avevents</strong> for event photos, videos &amp; updates
        </a>
        <p className="footer-copy">© 2026 AV Eventsz. All rights reserved.</p>
      </footer>
    </div>
  );
}
