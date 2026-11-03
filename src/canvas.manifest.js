export const manifest = {
  screens: {
    scr_pqa2zp: { name: "Welcome", route: "/", position: { "x": 75.05, "y": 1401.59 }, width: 1961, height: 1214 },
    scr_rfiyl6: { name: "How It Works", route: "/", state: { "helpOpen": true }, position: { "x": -2474.88, "y": 1499.86 }, width: 1959, height: 1219 },
    scr_nelkzd: { name: "Your Details", route: "/details", position: { "x": -2542.03, "y": 3076.96 }, width: 1977, height: 1220 },
    scr_huh1sq: { name: "Your Details – Errors", route: "/details", state: { "submitted": true }, position: { "x": 1560, "y": 3800 } },
    scr_1zkb89: { name: "Measurements", route: "/measurements", position: { "x": -1852.11, "y": 5094.14 } },
    scr_scfbuk: { name: "Blood Pressure", route: "/measure/blood-pressure", position: { "x": 160, "y": 7760 } },
    scr_5of2fl: { name: "Heart Rate", route: "/measure/heart-rate", position: { "x": 1560, "y": 7760 } },
    scr_8q9kg7: { name: "Body Temperature", route: "/measure/body-temperature", position: { "x": 2960, "y": 7760 } },
    scr_zheu05: { name: "Height", route: "/measure/height", position: { "x": 4360, "y": 7760 } },
    scr_nxpr9c: { name: "Weight", route: "/measure/weight", position: { "x": 5760, "y": 7760 } },
    scr_ozd7fc: { name: "Measurement Complete", route: "/measure/heart-rate", state: { "phase": "complete" }, position: { "x": 7160, "y": 7760 } },
    scr_wx3sa7: { name: "Results", route: "/results", position: { "x": 160, "y": 9740 } },
    scr_n8og72: { name: "Results – Single Measurement", route: "/results", state: { "completedCount": 1 }, position: { "x": 1560, "y": 9740 } },
    scr_525mtw: { name: "Health Summary", route: "/summary", position: { "x": 2960, "y": 9740 } },
    scr_jredny: { name: "Print Report", route: "/print", position: { "x": 160, "y": 11720 } },
    scr_oer3n2: { name: "End Session Confirmation", route: "/print", state: { "endRequest": "exit" }, position: { "x": 1560, "y": 11720 } },
    scr_uowgr7: { name: "Inactivity Warning", route: "/measurements", state: { "idleWarning": true }, position: { "x": 0, "y": 0 }, width: 1961, height: 1195, isDefaultRow: true }
  },
  sections: {
    sec_sqc86a: { name: "Onboarding", x: 3103.48, y: 1552.5, width: 2920, height: 1180 },
    sec_nz3dc1: { name: "User Details", x: 0, y: 3580, width: 2920, height: 1180 },
    sec_jgtzz7: { name: "Measurement Hub", x: 0, y: 5560, width: 1520, height: 1180 },
    sec_sittk8: { name: "Individual Measurements", x: 0, y: 7540, width: 8520, height: 1180 },
    sec_i4p2ax: { name: "Results & Summary", x: 0, y: 9520, width: 4320, height: 1180 },
    sec_k35z55: { name: "End Session", x: 0, y: 11500, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "screen", id: "scr_1zkb89" },
  { kind: "screen", id: "scr_nelkzd" },
  { kind: "screen", id: "scr_rfiyl6" },
  { kind: "screen", id: "scr_pqa2zp" },
  { kind: "screen", id: "scr_uowgr7" },
  { kind: "section", id: "sec_sqc86a", children: [] },
  { kind: "section", id: "sec_nz3dc1", children: [
    { kind: "screen", id: "scr_huh1sq" }]
  },
  { kind: "section", id: "sec_jgtzz7", children: [] },
  { kind: "section", id: "sec_sittk8", children: [
    { kind: "screen", id: "scr_scfbuk" },
    { kind: "screen", id: "scr_5of2fl" },
    { kind: "screen", id: "scr_8q9kg7" },
    { kind: "screen", id: "scr_zheu05" },
    { kind: "screen", id: "scr_nxpr9c" },
    { kind: "screen", id: "scr_ozd7fc" }]
  },
  { kind: "section", id: "sec_i4p2ax", children: [
    { kind: "screen", id: "scr_wx3sa7" },
    { kind: "screen", id: "scr_n8og72" },
    { kind: "screen", id: "scr_525mtw" }]
  },
  { kind: "section", id: "sec_k35z55", children: [
    { kind: "screen", id: "scr_jredny" },
    { kind: "screen", id: "scr_oer3n2" }]
  }]

};