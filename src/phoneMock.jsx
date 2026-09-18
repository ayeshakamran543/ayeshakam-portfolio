/* ── PHONE MOCKUPS ──────────────────────────────────────────────────────── */
export function PhoneMock({ accent, type }) {
  const bg = "#2C2C2A";
  const wrap = { width: 114, height: 198, background: "#444441", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" };
  const body = { flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 7 };
  const Hdr  = () => <div style={{ height: 22, background: accent, opacity: .3 }} />;
  const Cta  = () => <div style={{ marginTop: "auto", height: 24, background: accent, borderRadius: 5 }} />;

  if (type === "cards") return (
    <div style={wrap}><Hdr /><div style={body}>
      {[accent, "#888780"].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
          <div style={{ width: 3, background: c, borderRadius: 2, marginRight: 7, opacity: i ? .35 : 1 }} />
          <div style={{ flex: 1, height: 42, background: bg, borderRadius: 5 }} />
        </div>
      ))}<Cta /></div></div>
  );
  if (type === "stream") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ flex: 1, background: bg, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${accent}`, opacity: .5 }} />
      </div>
      <div style={{ display: "flex", gap: 4 }}>{[...Array(4)].map((_, i) => <div key={i} style={{ flex: 1, height: 15, background: bg, borderRadius: 4 }} />)}</div>
      <Cta /></div></div>
  );
  if (type === "wallet") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ height: 38, background: bg, borderRadius: 6, padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: 36, height: 3, background: "#888780", opacity: .3, borderRadius: 1, marginBottom: 5 }} />
        <div style={{ width: 62, height: 8, background: accent, opacity: .75, borderRadius: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 36 }}>
        {[55,40,80,50,70,45,65].map((h, i) => <div key={i} style={{ flex:1, height:`${h}%`, background:accent, opacity:.35+i*.04, borderRadius:"2px 2px 0 0" }} />)}
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <div style={{ flex:1, height:22, background:accent, borderRadius:5 }} />
        <div style={{ flex:1, height:22, background:bg, borderRadius:5 }} />
      </div></div></div>
  );
  if (type === "health") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 66 }}>
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "5px solid rgba(255,255,255,.07)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `5px solid ${accent}`, borderRightColor: "transparent", borderBottomColor: "transparent", transform: "rotate(-45deg)", opacity: .85 }} />
        </div>
      </div>
      {[75,60,88].map((w,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:3, height:12, background:accent, opacity:.5+i*.15, borderRadius:1 }} />
          <div style={{ flex:1, height:5, background:bg, borderRadius:3 }}>
            <div style={{ width:`${w}%`, height:"100%", background:accent, opacity:.45+i*.1, borderRadius:3 }} />
          </div>
        </div>
      ))}<Cta /></div></div>
  );
  if (type === "social") return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, height:78 }}>
        {[.55,.38,.42,.62].map((op,i) => <div key={i} style={{ background:accent, opacity:op, borderRadius:4 }} />)}
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#888780", opacity:.45 }} />
          <div style={{ flex:1, height:4, background:bg, borderRadius:2 }} />
          <div style={{ width:7, height:7, borderRadius:"50%", background:accent, opacity:.4 }} />
        </div>
      ))}<Cta /></div></div>
  );
  return (
    <div style={wrap}><Hdr /><div style={body}>
      <div style={{ display:"flex", gap:3, justifyContent:"center" }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ width:12, height:12, borderRadius:"50%", flexShrink:0, background:i===3?accent:bg, border:`1px solid ${i===3?accent:"rgba(255,255,255,.1)"}` }} />
        ))}
      </div>
      {[1,0,1,0].map((done,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:11, height:11, borderRadius:"50%", flexShrink:0, background:done?accent:"transparent", border:`1.5px solid ${done?accent:"rgba(255,255,255,.2)"}` }} />
          <div style={{ flex:1, height:5, background:bg, borderRadius:2 }}>
            <div style={{ width:done?`${70+i*10}%`:"30%", height:"100%", background:accent, opacity:done?.4:.15, borderRadius:2 }} />
          </div>
        </div>
      ))}<Cta /></div></div>
  );
}