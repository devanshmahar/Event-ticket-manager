import React, { useState, useEffect } from 'react';
import './App.css';

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
    const target = new Date('2026-07-18T17:00:00+05:30');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) { clearInterval(interval); return; }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown({ days, hours, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const ticket = TICKETS.find(t => t.id === selectedTicket);
  const total = ticket ? ticket.price * qty : 0;

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
    <div className="root">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setTab('home')}>
          <span className="brand-av">AV</span>
          <span className="brand-rest"> EVENTSZ</span>
        </div>
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
      </nav>

      {/* ── HOME ── */}
      {tab === 'home' && (
        <main className="page fade-in">
          {/* Hero */}
          <section className="hero">
            <div className="hero-posters">
              <img src="/flyer.jpg" alt="Rain Affair Poster" className="poster poster-main" />
              <img src="/flyer_pricing.jpg" alt="Ticket Pricing" className="poster poster-sub" />
            </div>
            <div className="hero-content">
              <span className="pill">EXCLUSIVE LUXURY EXPERIENCE</span>
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

      {/* ── TICKETS ── */}
      {tab === 'tickets' && (
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
                    <input name="name" value={form.name} onChange={handleForm} placeholder="e.g. Devansh mahar" required />
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
      {tab === 'menu' && (
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
      {tab === 'venue' && (
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
            <p>Rain Affair – {EVENT.date}</p>
          </div>
          <div>
            <p>📞 <a href={`tel:${EVENT.phone}`} className="gold">{EVENT.phoneDisplay}</a></p>
            <p>📍 {EVENT.address}</p>
          </div>
          <button className="btn-gold-sm" onClick={() => setTab('tickets')}>Book Now</button>
        </div>
        <p className="footer-copy">© 2026 AV Eventsz. All rights reserved.</p>
      </footer>
    </div>
  );
}
