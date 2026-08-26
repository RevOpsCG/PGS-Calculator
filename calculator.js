(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────────
  //  CONFIGURATION
  //  Fill these in before deploying. Commit the file after saving.
  // ─────────────────────────────────────────────────────────────────────────────
  var HUBSPOT_PORTAL_ID = '7185788';
  var HUBSPOT_FORM_GUID = 'c977726c-77dc-4170-9f8f-6fe034dd9167';
  var CTA_URL           = 'https://parkingguidancesystems.com/contact-pgs-sales/';
  var SOLUTIONS_URL     = 'https://parkingguidancesystems.com/parking-solutions/';

  // HubSpot Custom Behavioral Events
  // Create each event in HubSpot → Reports → Analytics Tools → Custom Behavioral Events,
  // then paste the internal name (e.g. "pe12345678_assessment_started") below.
  // Leave a value as '' to skip tracking that event.
  var HS_EVENT_STARTED  = '';   // fired when visitor clicks "Start the Assessment"
  var HS_EVENT_SECTION  = '';   // fired after each section is completed
  var HS_EVENT_RESULTS  = '';   // fired when results screen appears
  var HS_EVENT_CTA      = '';   // fired when a bottom CTA is clicked
  // ─────────────────────────────────────────────────────────────────────────────

  var ROOT_ID = 'pgs-calculator';
  var SECTION_COUNT = 3;

  var SECTIONS = [
    {
      title: 'Utilization & Access',
      subtitle: 'Can drivers find and use the parking you already have?',
      blurb: 'A parking facility can have available spaces and still feel full if drivers cannot see, trust, or act on availability. This section looks at whether your existing parking inventory is easy to find, use, and manage.',
      maxPoints: 40,
      questions: [
        { text: 'Can drivers see real-time availability before choosing where to park?', points: 10 },
        { text: 'Are drivers consistently guided toward available spaces instead of searching on their own?', points: 9 },
        { text: 'Are availability counts accurate enough for drivers and operators to trust them?', points: 8 },
        { text: 'Can your team identify which areas are underused, overused, or perceived as full too early?', points: 7 },
        { text: 'Can your team tell whether parking issues are caused by true capacity limits or poor utilization?', points: 6 },
      ],
      focus: {
        headline: 'Your biggest opportunity: Make existing parking easier to find and use.',
        copy: 'Your results suggest that drivers may not have enough visibility into where parking is available. This can make the asset feel full before it truly is, increase search time, and leave usable spaces underutilized.\n\nImproving real-time availability, driver guidance, and utilization visibility may help your facility get more value from the parking inventory it already has.',
      },
      meaning: {
        high: 'Drivers may not have enough real-time information to confidently find and use available parking. This can lead to unnecessary circling, congestion, frustration, and underused areas of the facility.',
        moderate: 'Your operation likely has some tools in place to support parking access, but there may still be gaps in availability visibility, guidance, or trust in the information drivers and operators rely on.',
        strong: 'This appears to be a strength. Drivers likely have clear access to availability information, and your team has a strong foundation for helping the asset perform closer to its true capacity.',
      },
    },
    {
      title: 'Adaptability & Experience',
      subtitle: 'Can your parking operation adapt to different users, demand patterns, and conditions?',
      blurb: 'Parking demand changes throughout the day, week, season, and year. A modern parking operation should be able to serve different parker groups, respond to changing conditions, and create a clearer experience without relying on static rules or manual workarounds.',
      maxPoints: 25,
      questions: [
        { text: 'Can different parker groups be guided, prioritized, or managed based on their needs?', example: 'Examples may include employees, tenants, visitors, permit holders, event guests, patients, residents, students, ADA parkers, EV drivers, or VIPs.', points: 7 },
        { text: 'Can signage, app content, or digital guidance be updated as conditions change?', points: 5 },
        { text: 'Can your team pre-plan and manage high-demand periods, events, closures, or unusual traffic patterns?', points: 5 },
        { text: 'Can parking rules, permits, validations, access, and messaging be managed from one place?', points: 4 },
        { text: 'Can drivers complete key parking tasks digitally, such as finding parking, paying, validating, reserving, or finding their car?', points: 4 },
      ],
      focus: {
        headline: 'Your biggest opportunity: Make the parking experience more adaptable.',
        copy: 'Your results suggest that static rules, manual updates, or disconnected processes may be limiting how well your operation responds to changing users, demand patterns, events, or access needs.\n\nImproving adaptability can help your team manage different parker groups, update communication faster, reduce friction, and create a more flexible experience for drivers and operators.',
      },
      meaning: {
        high: 'Your parking operation may be too rigid for the way the asset is actually used. Manual processes, static signage, or fixed rules may be limiting your ability to adapt to changing users, demand patterns, events, or access needs.',
        moderate: 'Your operation may be able to adapt in some situations, but there may still be opportunities to centralize control, reduce manual workarounds, or create a more dynamic driver experience.',
        strong: 'This appears to be a strength. Your operation likely has the flexibility to adjust across parker groups, demand patterns, and changing conditions without creating unnecessary friction for drivers or operators.',
      },
    },
    {
      title: 'Visibility & Performance',
      subtitle: 'Can your team measure, manage, and improve parking value over time?',
      blurb: 'Parking data is only valuable if it helps operators make better decisions. This section looks at whether your team can see what is happening, identify opportunities, connect parking data to other systems, and improve performance over time.',
      maxPoints: 35,
      questions: [
        { text: 'Can parking data help your team make better decisions about revenue, pricing, allocation, planning, or service levels?', points: 9 },
        { text: 'Can operators see real-time occupancy across facilities, levels, zones, or spaces?', points: 8 },
        { text: 'Can your team review historical trends by day, time, location, or user group?', points: 6 },
        { text: 'Can real-time parking availability data be shared with websites, apps, maps, dashboards, or third-party platforms?', points: 6 },
        { text: 'Is system health, uptime, maintenance, and performance monitoring part of the ongoing operating model?', points: 6 },
      ],
      focus: {
        headline: 'Your biggest opportunity: Turn parking data into better decisions.',
        copy: 'Your results suggest that limited visibility or disconnected systems may be making it harder to improve performance over time.\n\nConnecting parking data to reporting, planning, maintenance, customer-facing tools, and operational workflows can help your team identify trends, act faster, and manage parking as a more strategic asset.',
      },
      meaning: {
        high: 'Your team may lack the visibility needed to optimize parking over time. Without real-time and historical data, it can be difficult to identify demand patterns, improve operations, support revenue or service decisions, and monitor system performance.',
        moderate: 'Your team likely has some access to parking data, but there may still be opportunities to make insights easier to use, connect data across systems, or apply reporting more consistently to operational decisions.',
        strong: 'This appears to be a strength. Your team likely has strong visibility into parking activity and can use data to support better decisions, ongoing optimization, and long-term asset performance.',
      },
    },
  ];

  var TIERS = [
    {
      min: 0, max: 40, label: 'Significant Value Leakage', cls: 'pgsc-tier-red',
      desc: 'Your parking asset may be underperforming in ways that affect drivers, operators, and overall asset value. Existing spaces may not be fully findable or usable, and your team may lack the visibility, flexibility, or connected systems needed to manage the asset effectively.\n\nModernization opportunities may include real-time guidance, improved availability communication, better operational visibility, digital workflows, or a more connected parking management strategy.',
    },
    {
      min: 41, max: 60, label: 'Clear Optimization Opportunity', cls: 'pgsc-tier-amber',
      desc: 'Your parking operation may be functional, but several gaps are likely limiting performance. You may have enough capacity in some situations, but driver friction, static processes, limited data, or disconnected systems may prevent the asset from delivering its full value.\n\nModernization opportunities may include improving driver guidance, increasing utilization visibility, digitizing operational workflows, and connecting parking data to the systems your team already uses.',
    },
    {
      min: 61, max: 80, label: 'Strong Foundation With Room to Improve', cls: 'pgsc-tier-blue',
      desc: 'Your parking operation likely has many of the right pieces in place, but there may still be opportunities to improve utilization, adaptability, data access, or long-term performance.\n\nThe next level of value may come from using real-time and historical data more strategically, improving integrations, expanding digital tools for drivers, or applying a more proactive approach to ongoing optimization.',
    },
    {
      min: 81, max: 100, label: 'Optimized Asset', cls: 'pgsc-tier-green',
      desc: 'Your parking operation appears to be managed as a strategic asset. Drivers likely have clear access to parking information, operators have strong visibility, and the system supports ongoing improvement.\n\nThe next opportunity may be deeper business intelligence, advanced integrations, dynamic operating strategies, predictive planning, or continued optimization across facilities, user groups, and demand patterns.',
    },
  ];

  var ADVANCED_OPTIMIZATION = {
    headline: 'Your biggest opportunity: Move from strong performance to continuous optimization.',
    copy: 'Your results suggest your parking operation has a strong foundation across utilization, adaptability, and performance visibility. The next opportunity may be using deeper data, integrations, and proactive optimization to keep improving asset value over time.\n\nConsider where advanced capabilities could create additional value, such as predictive planning, dynamic operating strategies, revenue optimization, system health monitoring, cross-platform integrations, or enhanced digital experiences for different parker groups.',
    ctaLabel: 'Explore Advanced Optimization With PGS',
    ctaCopy: 'PGS can help identify where advanced guidance, data, integrations, and digital tools could create the next level of value for your operation.',
  };

  // Result level for a section, based on % of points earned
  function levelForPct(pct) {
    if (pct >= 80) return { key: 'strong', label: 'Strong', cls: 'pgsc-level-strong' };
    if (pct >= 50) return { key: 'moderate', label: 'Moderate Opportunity', cls: 'pgsc-level-moderate' };
    return { key: 'high', label: 'High Opportunity', cls: 'pgsc-level-high' };
  }

  // ── State ────────────────────────────────────────────────────────────────────
  var currentSection = 0;
  var answers = SECTIONS.map(function(s) { return s.questions.map(function() { return null; }); });

  // ── HubSpot helpers ──────────────────────────────────────────────────────────
  function hsTrack(eventName, props) {
    if (!eventName) return;
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(['trackCustomBehavioralEvent', { name: eventName, properties: props || {} }]);
  }

  function hsIdentify(email) {
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(['identify', { email: email }]);
    _hsq.push(['trackPageView']);
  }

  // ── DOM helpers ──────────────────────────────────────────────────────────────
  var root;
  function $id(id) { return root.querySelector('#pgsc-' + id); }

  function scrollToTop() {
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showScreen(name) {
    root.querySelectorAll('.pgsc-screen').forEach(function(s) { s.classList.remove('pgsc-active'); });
    $id('screen-' + name).classList.add('pgsc-active');
  }

  function updateProgress(idx) {
    var area = $id('progress-area');
    if (idx < 0 || idx >= SECTION_COUNT) { area.style.display = 'none'; return; }
    area.style.display = 'block';
    var pct = Math.round((idx / SECTION_COUNT) * 100);
    $id('progress-fill').style.width = pct + '%';
    $id('progress-text').textContent = 'Section ' + (idx + 1) + ' of ' + SECTION_COUNT;
    $id('progress-pct').textContent = pct + '%';
  }

  function getTier(score) {
    for (var i = 0; i < TIERS.length; i++) {
      if (score >= TIERS[i].min && score <= TIERS[i].max) return TIERS[i];
    }
    return TIERS[0];
  }

  function nl2p(text) {
    return text.split('\n\n').map(function(p) { return '<p>' + p + '</p>'; }).join('');
  }

  // ── Flow ─────────────────────────────────────────────────────────────────────
  function startAssessment() {
    currentSection = 0;
    renderSection(0);
    showScreen('section');
    updateProgress(0);
    scrollToTop();
    hsTrack(HS_EVENT_STARTED, { page: window.location.href });
  }

  function renderSection(idx) {
    var s = SECTIONS[idx];
    $id('sh-eyebrow').textContent = 'Section ' + (idx + 1) + ' of ' + SECTION_COUNT;
    $id('sh-title').textContent = s.title;
    $id('sh-subtitle').textContent = s.subtitle;
    $id('sh-blurb').textContent = s.blurb;

    var container = $id('questions-container');
    container.innerHTML = '';

    s.questions.forEach(function(q, qi) {
      var cur = answers[idx][qi];
      var row = document.createElement('div');
      row.className = 'pgsc-question-row' + (cur === true ? ' pgsc-answered-yes' : cur === false ? ' pgsc-answered-no' : '');
      row.id = 'pgsc-qrow-' + qi;
      row.innerHTML =
        '<div class="pgsc-question-text">' + (qi + 1) + '. ' + q.text + '</div>' +
        (q.example ? '<div class="pgsc-question-example">' + q.example + '</div>' : '') +
        '<div class="pgsc-question-buttons">' +
          '<button class="pgsc-btn-yn' + (cur === true ? ' pgsc-sel-yes' : '') + '" onclick="_pgsc.answer(' + idx + ',' + qi + ',true)">&#10003; Yes</button>' +
          '<button class="pgsc-btn-yn' + (cur === false ? ' pgsc-sel-no' : '') + '" onclick="_pgsc.answer(' + idx + ',' + qi + ',false)">&#10007; No</button>' +
        '</div>';
      container.appendChild(row);
    });

    $id('btn-next').textContent = idx === SECTION_COUNT - 1 ? 'Complete Assessment →' : 'Next →';
    $id('warn-unanswered').classList.remove('pgsc-visible');
  }

  function answer(sIdx, qIdx, value) {
    answers[sIdx][qIdx] = value;
    var row = root.querySelector('#pgsc-qrow-' + qIdx);
    row.className = 'pgsc-question-row ' + (value ? 'pgsc-answered-yes' : 'pgsc-answered-no');
    var btns = row.querySelectorAll('.pgsc-btn-yn');
    btns[0].className = 'pgsc-btn-yn' + (value === true  ? ' pgsc-sel-yes' : '');
    btns[1].className = 'pgsc-btn-yn' + (value === false ? ' pgsc-sel-no'  : '');
    $id('warn-unanswered').classList.remove('pgsc-visible');
  }

  function sectionRawScore(sIdx) {
    var s = SECTIONS[sIdx];
    var total = 0;
    answers[sIdx].forEach(function(a, qi) { if (a) total += s.questions[qi].points; });
    return total;
  }

  function goNext() {
    var unanswered = answers[currentSection].some(function(a) { return a === null; });
    if (unanswered) { $id('warn-unanswered').classList.add('pgsc-visible'); return; }

    var raw = sectionRawScore(currentSection);
    hsTrack(HS_EVENT_SECTION, {
      section_name:  SECTIONS[currentSection].title,
      section_index: currentSection + 1,
      section_score: raw,
      section_max:   SECTIONS[currentSection].maxPoints,
    });

    if (currentSection < SECTION_COUNT - 1) {
      currentSection++;
      renderSection(currentSection);
      updateProgress(currentSection);
      scrollToTop();
    } else {
      $id('progress-area').style.display = 'none';
      showScreen('gate');
      scrollToTop();
    }
  }

  function goBack() {
    if (currentSection > 0) {
      currentSection--;
      renderSection(currentSection);
      updateProgress(currentSection);
      scrollToTop();
    } else {
      // section 0 → back to intro
      showScreen('intro');
      updateProgress(-1);
      scrollToTop();
    }
  }

  function goBackFromGate() {
    currentSection = SECTION_COUNT - 1;
    renderSection(currentSection);
    updateProgress(currentSection);
    showScreen('section');
    scrollToTop();
  }

  function goBackFromResults() {
    showScreen('gate');
    scrollToTop();
  }

  // ── Email gate ───────────────────────────────────────────────────────────────
  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  }

  function submitGate() {
    var emailEl = $id('f-email');
    var email = emailEl.value.trim();
    if (!validateEmail(email)) {
      emailEl.classList.add('pgsc-error');
      $id('gate-error').classList.add('pgsc-visible');
      return;
    }
    emailEl.classList.remove('pgsc-error');
    $id('gate-error').classList.remove('pgsc-visible');

    var btn = $id('btn-submit');
    btn.disabled = true;
    $id('submit-label').textContent = 'Submitting…';
    $id('submit-spinner').style.display = 'inline-block';

    var sectionScores = SECTIONS.map(function(s, i) { return sectionRawScore(i); });
    var sectionPcts    = sectionScores.map(function(sc, i) { return Math.round((sc / SECTIONS[i].maxPoints) * 100); });
    var finalScore     = sectionScores.reduce(function(a, b) { return a + b; }, 0);
    var tier           = getTier(finalScore);

    // Identify contact in HubSpot — links this visitor's session to the contact record
    hsIdentify(email);

    var lowestIdx = 0;
    sectionPcts.forEach(function(pct, i) { if (pct < sectionPcts[lowestIdx]) lowestIdx = i; });
    var allStrong = sectionPcts.every(function(pct) { return pct >= 80; });
    var focusArea = allStrong ? 'Advanced Optimization' : SECTIONS[lowestIdx].title;

    var fields = [
      { name: 'email',                                 value: email },
      { name: 'parking_asset_value_score',             value: String(finalScore) },
    ].filter(function(f) { return f.value !== ''; });

    var payload = {
      fields: fields,
      context: { pageUri: window.location.href, pageName: document.title },
    };

    var doShow = function() {
      showResults(sectionScores, sectionPcts, finalScore, tier, lowestIdx, allStrong);
      btn.disabled = false;
      $id('submit-label').textContent = 'See My Results →';
      $id('submit-spinner').style.display = 'none';
    };

    if (HUBSPOT_PORTAL_ID !== 'YOUR_PORTAL_ID' && HUBSPOT_FORM_GUID !== 'YOUR_FORM_GUID') {
      fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/' + HUBSPOT_PORTAL_ID + '/' + HUBSPOT_FORM_GUID,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      ).catch(function(err) { console.warn('PGS Calculator: HubSpot submission error', err); }).then(doShow);
    } else {
      doShow();
    }
  }

  // ── Results ──────────────────────────────────────────────────────────────────
  function showResults(sectionScores, sectionPcts, finalScore, tier, lowestIdx, allStrong) {
    $id('result-score-num').textContent = finalScore;

    var circleEl = $id('score-circle');
    var tierColors = { 'pgsc-tier-red': '#b91c1c', 'pgsc-tier-amber': '#92400e', 'pgsc-tier-blue': '#03a5a1', 'pgsc-tier-green': '#58a97b' };
    var tierBgs    = { 'pgsc-tier-red': '#fef2f2', 'pgsc-tier-amber': '#fff8eb', 'pgsc-tier-blue': '#e0f5f5', 'pgsc-tier-green': '#eaf5ef' };
    circleEl.style.borderColor = tierColors[tier.cls] || '#005c8e';
    circleEl.style.background  = tierBgs[tier.cls]   || '#edf4f9';

    var badge = $id('result-tier-badge');
    badge.textContent = tier.label;
    badge.className = 'pgsc-tier-badge ' + tier.cls;

    $id('result-tier-desc').innerHTML = nl2p(tier.desc);

    // Section breakdown
    var levels = SECTIONS.map(function(s, i) { return levelForPct(sectionPcts[i]); });

    var tbody = $id('result-breakdown');
    tbody.innerHTML = '';
    SECTIONS.forEach(function(s, i) {
      var lvl = levels[i];
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + s.title + '</td><td><span class="pgsc-level-pill ' + lvl.cls + '">' + lvl.label + '</span> <span class="pgsc-pct">' + sectionPcts[i] + '%</span></td>';
      tbody.appendChild(tr);
    });

    // Where to focus next
    if (allStrong) {
      $id('focus-section-name').textContent = ADVANCED_OPTIMIZATION.headline;
      $id('focus-section-copy').innerHTML = nl2p(ADVANCED_OPTIMIZATION.copy);
    } else {
      $id('focus-section-name').textContent = SECTIONS[lowestIdx].focus.headline;
      $id('focus-section-copy').innerHTML = nl2p(SECTIONS[lowestIdx].focus.copy);
    }

    // What this means for your operation
    var meaningList = $id('result-meaning-list');
    meaningList.innerHTML = '';
    SECTIONS.forEach(function(s, i) {
      var lvl = levels[i];
      var div = document.createElement('div');
      div.className = 'pgsc-meaning-item';
      div.innerHTML =
        '<div class="pgsc-meaning-title">' + s.title + ' <span class="pgsc-meaning-pct">— ' + sectionPcts[i] + '%</span></div>' +
        '<div class="pgsc-meaning-copy">' + s.meaning[lvl.key] + '</div>';
      meaningList.appendChild(div);
    });

    // Bottom CTA
    if (allStrong) {
      $id('bottom-cta-copy').textContent = ADVANCED_OPTIMIZATION.ctaCopy;
      $id('btn-cta-primary').textContent = ADVANCED_OPTIMIZATION.ctaLabel + ' →';
    } else {
      $id('bottom-cta-copy').textContent = 'Use your results to identify where modernization could create the greatest impact. PGS can help you develop a roadmap tailored to your facility, users, and operational goals.';
      $id('btn-cta-primary').textContent = 'Review My Results With a PGS Expert →';
    }

    showScreen('results');
    scrollToTop();

    hsTrack(HS_EVENT_RESULTS, {
      final_score:          finalScore,
      score_tier:           tier.label,
      focus_area:           allStrong ? 'Advanced Optimization' : SECTIONS[lowestIdx].title,
      utilization_pct:      sectionPcts[0],
      adaptability_pct:     sectionPcts[1],
      visibility_pct:       sectionPcts[2],
    });
  }

  function ctaClick() {
    hsTrack(HS_EVENT_CTA, { final_score: $id('result-score-num').textContent, cta: 'primary' });
    window.open(CTA_URL, '_blank', 'noopener');
  }

  function secondaryCtaClick() {
    hsTrack(HS_EVENT_CTA, { final_score: $id('result-score-num').textContent, cta: 'secondary' });
    window.open(SOLUTIONS_URL, '_blank', 'noopener');
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  // PGS Brand: primary #005c8e · dark #2f4f66 · teal #03a5a1 · green #58a97b · near-black #1f1f1f · gray #6d6e70 · off-white #f4f5f5
  // Fonts: Bebas Neue (headings) · Raleway (body)
  var CSS = [
    '@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Raleway:wght@400;500;600;700&display=swap");',

    '#pgs-calculator{font-family:"Raleway",sans-serif;color:#1f1f1f;line-height:1.6;padding:24px 16px 48px;}',
    '#pgs-calculator *{box-sizing:border-box;margin:0;padding:0;}',
    '#pgs-calculator .pgsc-wrap{max-width:700px;margin:0 auto;}',

    /* progress */
    '#pgs-calculator .pgsc-prog-area{margin-bottom:28px;}',
    '#pgs-calculator .pgsc-prog-label{font-size:13px;color:#6d6e70;margin-bottom:8px;display:flex;justify-content:space-between;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-prog-track{height:4px;background:#dde0e3;border-radius:2px;overflow:hidden;}',
    '#pgs-calculator .pgsc-prog-fill{height:100%;background:#005c8e;border-radius:2px;transition:width 0.4s ease;}',

    /* card */
    '#pgs-calculator .pgsc-card{background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,.08),0 0 0 1px #dde0e3;overflow:hidden;}',
    '#pgs-calculator .pgsc-card-header{background:#005c8e;color:#fff;padding:32px 36px 28px;}',
    '#pgs-calculator .pgsc-eyebrow{font-family:"Raleway",sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:10px;}',
    '#pgs-calculator .pgsc-card-header h2{font-family:"Bebas Neue",sans-serif;font-size:32px;font-weight:400;letter-spacing:.04em;line-height:1.15;margin-bottom:10px;text-transform:uppercase;}',
    '#pgs-calculator .pgsc-card-header p{font-size:14px;color:rgba(255,255,255,0.8);line-height:1.6;}',
    '#pgs-calculator .pgsc-card-body{padding:32px 36px;background:#fff;}',

    /* intro */
    '#pgs-calculator .pgsc-intro-desc{font-size:14px;color:#6d6e70;margin-bottom:24px;line-height:1.75;}',
    '#pgs-calculator .pgsc-how{background:#f4f5f5;border:1px solid #dde0e3;border-radius:8px;padding:20px 24px;margin-bottom:28px;}',
    '#pgs-calculator .pgsc-how h3{font-family:"Bebas Neue",sans-serif;font-size:16px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:#6d6e70;margin-bottom:14px;}',
    '#pgs-calculator .pgsc-how ol{list-style:none;counter-reset:steps;}',
    '#pgs-calculator .pgsc-how ol li{counter-increment:steps;display:flex;align-items:flex-start;gap:12px;font-size:14px;color:#6d6e70;margin-bottom:8px;}',
    '#pgs-calculator .pgsc-how ol li::before{content:counter(steps);display:flex;align-items:center;justify-content:center;width:22px;height:22px;min-width:22px;background:#005c8e;color:#fff;border-radius:50%;font-size:11px;font-weight:700;margin-top:2px;font-family:"Raleway",sans-serif;}',

    /* section */
    '#pgs-calculator .pgsc-blurb{font-size:14px;color:#6d6e70;background:#f4f5f5;border-left:3px solid #03a5a1;padding:14px 16px;border-radius:0 6px 6px 0;margin-bottom:28px;line-height:1.7;}',
    '#pgs-calculator .pgsc-questions{display:flex;flex-direction:column;gap:14px;margin-bottom:28px;}',
    '#pgs-calculator .pgsc-question-row{border:1px solid #dde0e3;border-radius:8px;overflow:hidden;transition:border-color .2s;}',
    '#pgs-calculator .pgsc-question-row.pgsc-answered-yes{border-color:#58a97b;}',
    '#pgs-calculator .pgsc-question-row.pgsc-answered-no{border-color:#e8a0a0;}',
    '#pgs-calculator .pgsc-question-text{font-size:14px;color:#1f1f1f;padding:14px 16px 10px;line-height:1.55;}',
    '#pgs-calculator .pgsc-question-example{font-size:12px;color:#6d6e70;padding:0 16px 10px;line-height:1.55;font-style:italic;}',
    '#pgs-calculator .pgsc-question-buttons{display:flex;border-top:1px solid #dde0e3;}',
    '#pgs-calculator .pgsc-answered-yes .pgsc-question-buttons{border-top-color:#a3d4b8;}',
    '#pgs-calculator .pgsc-answered-no .pgsc-question-buttons{border-top-color:#e8a0a0;}',
    '#pgs-calculator .pgsc-btn-yn{flex:1;padding:10px;border:none;cursor:pointer;font-size:13px;font-weight:600;letter-spacing:.03em;transition:background .15s,color .15s;background:#f4f5f5;color:#6d6e70;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-btn-yn:first-child{border-right:1px solid #dde0e3;}',
    '#pgs-calculator .pgsc-btn-yn:hover{background:#ebebec;}',
    '#pgs-calculator .pgsc-btn-yn.pgsc-sel-yes{background:#eaf5ef;color:#2d6b4a;}',
    '#pgs-calculator .pgsc-btn-yn.pgsc-sel-no{background:#fef2f2;color:#b91c1c;}',
    '#pgs-calculator .pgsc-warn{font-size:13px;color:#b91c1c;margin-top:-16px;margin-bottom:16px;display:none;}',
    '#pgs-calculator .pgsc-warn.pgsc-visible{display:block;}',

    /* nav */
    '#pgs-calculator .pgsc-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;}',
    '#pgs-calculator .pgsc-btn-back{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid #dde0e3;border-radius:6px;padding:9px 18px;font-size:14px;font-weight:600;color:#6d6e70;cursor:pointer;font-family:"Raleway",sans-serif;transition:background .15s,border-color .15s;}',
    '#pgs-calculator .pgsc-btn-back:hover{background:#f4f5f5;border-color:#6d6e70;}',

    /* primary button */
    '#pgs-calculator .pgsc-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#005c8e;color:#fff;border:none;border-radius:7px;padding:13px 28px;font-size:15px;font-weight:700;letter-spacing:.02em;cursor:pointer;transition:background .15s;font-family:"Raleway",sans-serif;width:100%;}',
    '#pgs-calculator .pgsc-btn-primary:hover{background:#2f4f66;}',
    '#pgs-calculator .pgsc-btn-primary:disabled{opacity:.55;cursor:not-allowed;}',
    '#pgs-calculator .pgsc-nav .pgsc-btn-primary{width:auto;padding:10px 24px;font-size:14px;}',

    /* gate form */
    '#pgs-calculator .pgsc-gate-intro{font-size:15px;color:#6d6e70;margin-bottom:24px;line-height:1.7;}',
    '#pgs-calculator .pgsc-form-row{display:flex;gap:14px;margin-bottom:14px;}',
    '#pgs-calculator .pgsc-form-field{display:flex;flex-direction:column;flex:1;gap:5px;}',
    '#pgs-calculator .pgsc-form-field label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6d6e70;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-form-field input{border:1px solid #dde0e3;border-radius:6px;padding:10px 12px;font-size:14px;color:#1f1f1f;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-form-field input:focus{border-color:#005c8e;box-shadow:0 0 0 3px rgba(0,92,142,.12);}',
    '#pgs-calculator .pgsc-form-field input.pgsc-error{border-color:#b91c1c;}',
    '#pgs-calculator .pgsc-reassurance{font-size:12px;color:#6d6e70;margin-top:6px;margin-bottom:24px;}',
    '#pgs-calculator .pgsc-err-msg{font-size:13px;color:#b91c1c;margin-top:-8px;margin-bottom:10px;display:none;}',
    '#pgs-calculator .pgsc-err-msg.pgsc-visible{display:block;}',

    /* spinner */
    '#pgs-calculator .pgsc-spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:pgsc-spin .7s linear infinite;}',
    '@keyframes pgsc-spin{to{transform:rotate(360deg)}}',

    /* screens */
    '#pgs-calculator .pgsc-screen{display:none;}',
    '#pgs-calculator .pgsc-screen.pgsc-active{display:block;}',

    /* results */
    '#pgs-calculator .pgsc-results-hero{text-align:center;padding:8px 0 28px;border-bottom:1px solid #dde0e3;margin-bottom:28px;}',
    '#pgs-calculator .pgsc-score-circle{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:140px;height:140px;border-radius:50%;border:6px solid #005c8e;margin-bottom:16px;background:#edf4f9;}',
    '#pgs-calculator .pgsc-score-num{font-family:"Bebas Neue",sans-serif;font-size:52px;font-weight:400;color:#2f4f66;line-height:1;}',
    '#pgs-calculator .pgsc-score-denom{font-size:13px;color:#6d6e70;font-weight:600;letter-spacing:.04em;}',
    '#pgs-calculator .pgsc-tier-badge{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;padding:4px 14px;border-radius:20px;margin-bottom:12px;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-tier-red{background:#fef2f2;color:#b91c1c;}',
    '#pgs-calculator .pgsc-tier-amber{background:#fff8eb;color:#92400e;}',
    '#pgs-calculator .pgsc-tier-blue{background:#e0f5f5;color:#025e5b;}',
    '#pgs-calculator .pgsc-tier-green{background:#eaf5ef;color:#2d6b4a;}',
    '#pgs-calculator .pgsc-tier-desc{font-size:14px;color:#6d6e70;line-height:1.75;max-width:540px;margin:0 auto;text-align:left;}',
    '#pgs-calculator .pgsc-tier-desc p{margin-bottom:12px;}',
    '#pgs-calculator .pgsc-tier-desc p:last-child{margin-bottom:0;}',
    '#pgs-calculator .pgsc-section-label{font-family:"Bebas Neue",sans-serif;font-size:16px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:#6d6e70;margin-bottom:12px;}',
    '#pgs-calculator .pgsc-breakdown{width:100%;border-collapse:collapse;margin-bottom:28px;}',
    '#pgs-calculator .pgsc-breakdown th{text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6d6e70;padding:0 12px 8px 0;border-bottom:1px solid #dde0e3;}',
    '#pgs-calculator .pgsc-breakdown th:last-child{text-align:right;}',
    '#pgs-calculator .pgsc-breakdown td{padding:10px 12px 10px 0;font-size:14px;border-bottom:1px solid #f4f5f5;vertical-align:middle;color:#1f1f1f;}',
    '#pgs-calculator .pgsc-breakdown td:last-child{text-align:right;white-space:nowrap;}',
    '#pgs-calculator .pgsc-breakdown tr:last-child td{border-bottom:none;}',
    '#pgs-calculator .pgsc-level-pill{display:inline-flex;align-items:center;justify-content:center;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;font-family:"Raleway",sans-serif;}',
    '#pgs-calculator .pgsc-level-high{background:#fef2f2;color:#b91c1c;}',
    '#pgs-calculator .pgsc-level-moderate{background:#fff8eb;color:#92400e;}',
    '#pgs-calculator .pgsc-level-strong{background:#eaf5ef;color:#2d6b4a;}',
    '#pgs-calculator .pgsc-pct{font-size:12px;color:#6d6e70;font-weight:600;}',
    '#pgs-calculator .pgsc-focus-box{background:#f4f5f5;border:1px solid #03a5a1;border-left:4px solid #03a5a1;border-radius:8px;padding:18px 20px;margin-bottom:28px;}',
    '#pgs-calculator .pgsc-focus-label{font-family:"Bebas Neue",sans-serif;font-size:14px;font-weight:400;letter-spacing:.1em;text-transform:uppercase;color:#03a5a1;margin-bottom:6px;}',
    '#pgs-calculator .pgsc-focus-title{font-size:15px;font-weight:700;color:#2f4f66;margin-bottom:8px;}',
    '#pgs-calculator .pgsc-focus-box p{font-size:14px;color:#6d6e70;line-height:1.65;margin-bottom:10px;}',
    '#pgs-calculator .pgsc-focus-box p:last-child{margin-bottom:0;}',
    '#pgs-calculator .pgsc-meaning-item{margin-bottom:10px;padding:14px 16px;background:#f4f5f5;border-radius:8px;border:1px solid #dde0e3;}',
    '#pgs-calculator .pgsc-meaning-title{font-size:13px;font-weight:700;color:#2f4f66;margin-bottom:4px;}',
    '#pgs-calculator .pgsc-meaning-pct{font-weight:500;color:#6d6e70;}',
    '#pgs-calculator .pgsc-meaning-copy{font-size:13px;color:#6d6e70;line-height:1.65;}',
    '#pgs-calculator .pgsc-cta-box{background:#2f4f66;border-radius:8px;padding:28px;text-align:center;margin-top:4px;}',
    '#pgs-calculator .pgsc-cta-box h3{font-family:"Bebas Neue",sans-serif;font-size:22px;font-weight:400;letter-spacing:.03em;text-transform:uppercase;color:#fff;margin-bottom:10px;}',
    '#pgs-calculator .pgsc-cta-box p{font-size:14px;color:rgba(255,255,255,0.8);margin-bottom:20px;line-height:1.65;}',
    '#pgs-calculator .pgsc-btn-cta{display:inline-block;background:#03a5a1;color:#fff;font-weight:700;font-size:14px;letter-spacing:.02em;padding:13px 32px;border-radius:7px;text-decoration:none;transition:background .15s;font-family:"Raleway",sans-serif;border:none;cursor:pointer;margin-bottom:14px;}',
    '#pgs-calculator .pgsc-btn-cta:hover{background:#028a86;}',
    '#pgs-calculator .pgsc-cta-secondary{display:block;font-size:13px;color:rgba(255,255,255,0.75);text-decoration:underline;cursor:pointer;background:none;border:none;font-family:"Raleway",sans-serif;margin:0 auto;}',
    '#pgs-calculator .pgsc-cta-secondary:hover{color:#fff;}',
    '#pgs-calculator .pgsc-gate-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;}',
    '#pgs-calculator .pgsc-btn-inline{width:auto;padding:13px 28px;}',
    '#pgs-calculator .pgsc-results-footer{margin-top:16px;}',

    /* responsive */
    '@media(max-width:520px){#pgs-calculator .pgsc-card-header,#pgs-calculator .pgsc-card-body{padding:22px 20px;}#pgs-calculator .pgsc-form-row{flex-direction:column;}#pgs-calculator .pgsc-score-circle{width:120px;height:120px;}#pgs-calculator .pgsc-score-num{font-size:44px;}}',
  ].join('\n');

  // ── HTML ─────────────────────────────────────────────────────────────────────
  var HTML = '' +
    '<div class="pgsc-wrap">' +

    /* progress */
    '<div id="pgsc-progress-area" class="pgsc-prog-area" style="display:none;">' +
      '<div class="pgsc-prog-label"><span id="pgsc-progress-text">Section 1 of 3</span><span id="pgsc-progress-pct">0%</span></div>' +
      '<div class="pgsc-prog-track"><div id="pgsc-progress-fill" class="pgsc-prog-fill" style="width:0%"></div></div>' +
    '</div>' +

    '<div class="pgsc-card">' +

    /* ── intro ── */
    '<div id="pgsc-screen-intro" class="pgsc-screen pgsc-active">' +
      '<div class="pgsc-card-header">' +
        '<div class="pgsc-eyebrow">PGS Assessment Tool</div>' +
        '<h2>Parking Asset Value Assessment</h2>' +
        '<p>Are you getting the most from the parking spaces you already have?</p>' +
      '</div>' +
      '<div class="pgsc-card-body">' +
        '<p class="pgsc-intro-desc">Your parking asset may be leaving value on the table — even before it reaches full capacity.<br><br>This assessment helps identify where your operation may be limiting utilization, driver experience, adaptability, and long-term performance. Answer 15 quick questions to see where modernization could have the greatest impact.</p>' +
        '<div class="pgsc-how"><h3>How it works</h3><ol><li>Answer 15 quick yes/no questions.</li><li>See how your operation performs across three areas of parking asset value.</li><li>Enter your email to unlock your full score, section breakdown, and recommended focus area.</li></ol></div>' +
        '<button class="pgsc-btn-primary" onclick="_pgsc.startAssessment()">Start the Assessment &#8594;</button>' +
      '</div>' +
    '</div>' +

    /* ── section ── */
    '<div id="pgsc-screen-section" class="pgsc-screen">' +
      '<div class="pgsc-card-header">' +
        '<div id="pgsc-sh-eyebrow" class="pgsc-eyebrow">Section 1 of 3</div>' +
        '<h2 id="pgsc-sh-title"></h2>' +
        '<p id="pgsc-sh-subtitle"></p>' +
      '</div>' +
      '<div class="pgsc-card-body">' +
        '<div id="pgsc-sh-blurb" class="pgsc-blurb"></div>' +
        '<div id="pgsc-questions-container" class="pgsc-questions"></div>' +
        '<p id="pgsc-warn-unanswered" class="pgsc-warn">Please answer all five questions to continue.</p>' +
        '<div class="pgsc-nav">' +
          '<button id="pgsc-btn-back" class="pgsc-btn-back" onclick="_pgsc.goBack()">&#8592; Back</button>' +
          '<button id="pgsc-btn-next" class="pgsc-btn-primary" onclick="_pgsc.goNext()">Next &#8594;</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── gate ── */
    '<div id="pgsc-screen-gate" class="pgsc-screen">' +
      '<div class="pgsc-card-header">' +
        '<div class="pgsc-eyebrow">Almost there</div>' +
        '<h2>Your assessment is complete.</h2>' +
        '<p>Enter your email to see your Parking Asset Value Score, section breakdown, and recommended focus area.</p>' +
      '</div>' +
      '<div class="pgsc-card-body">' +
        '<div class="pgsc-form-row"><div class="pgsc-form-field"><label for="pgsc-f-email">Business Email *</label><input type="email" id="pgsc-f-email" placeholder="jane@company.com" autocomplete="email"></div></div>' +
        '<p id="pgsc-gate-error" class="pgsc-err-msg">Please enter a valid email address to continue.</p>' +
        '<p class="pgsc-reassurance">Your results will help identify where modernization could create the greatest impact for your parking operation.</p>' +
        '<div class="pgsc-gate-nav">' +
          '<button class="pgsc-btn-back" onclick="_pgsc.goBackFromGate()">&#8592; Back</button>' +
          '<button id="pgsc-btn-submit" class="pgsc-btn-primary pgsc-btn-inline" onclick="_pgsc.submitGate()">' +
            '<span id="pgsc-submit-label">See My Results &#8594;</span>' +
            '<span id="pgsc-submit-spinner" class="pgsc-spinner" style="display:none;"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* ── results ── */
    '<div id="pgsc-screen-results" class="pgsc-screen">' +
      '<div class="pgsc-card-header">' +
        '<div class="pgsc-eyebrow">Your Results</div>' +
        '<h2>Parking Asset Value Report</h2>' +
        '<p>Here is how your parking operation scored.</p>' +
      '</div>' +
      '<div class="pgsc-card-body">' +
        '<div class="pgsc-results-hero">' +
          '<div id="pgsc-score-circle" class="pgsc-score-circle"><span id="pgsc-result-score-num" class="pgsc-score-num">—</span><span class="pgsc-score-denom">/ 100</span></div>' +
          '<div><span id="pgsc-result-tier-badge" class="pgsc-tier-badge"></span></div>' +
          '<div id="pgsc-result-tier-desc" class="pgsc-tier-desc"></div>' +
        '</div>' +
        '<p class="pgsc-section-label">Section Breakdown</p>' +
        '<table class="pgsc-breakdown"><thead><tr><th>Section</th><th style="text-align:right;">Result</th></tr></thead><tbody id="pgsc-result-breakdown"></tbody></table>' +
        '<div class="pgsc-focus-box"><div class="pgsc-focus-label">Where to Focus Next</div><div id="pgsc-focus-section-name" class="pgsc-focus-title"></div><div id="pgsc-focus-section-copy"></div></div>' +
        '<p class="pgsc-section-label">What This Means for Your Operation</p>' +
        '<div id="pgsc-result-meaning-list" style="margin-bottom:28px;"></div>' +
        '<div class="pgsc-cta-box">' +
          '<h3>Ready to get more value from your parking assets?</h3>' +
          '<p id="pgsc-bottom-cta-copy"></p>' +
          '<button id="pgsc-btn-cta-primary" class="pgsc-btn-cta" onclick="_pgsc.ctaClick()">Review My Results With a PGS Expert &#8594;</button>' +
          '<button class="pgsc-cta-secondary" onclick="_pgsc.secondaryCtaClick()">Explore PGS solutions</button>' +
        '</div>' +
        '<div class="pgsc-results-footer"><button class="pgsc-btn-back" onclick="_pgsc.goBackFromResults()">&#8592; Back</button></div>' +
      '</div>' +
    '</div>' +

    '</div>' + /* /pgsc-card */
    '</div>';  /* /pgsc-wrap */

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    root = document.getElementById(ROOT_ID);
    if (!root) { console.warn('PGS Calculator: add <div id="pgs-calculator"></div> to your page.'); return; }

    var styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    root.innerHTML = HTML;

    window._pgsc = {
      startAssessment:    startAssessment,
      answer:             answer,
      goNext:             goNext,
      goBack:             goBack,
      goBackFromGate:     goBackFromGate,
      goBackFromResults:  goBackFromResults,
      submitGate:         submitGate,
      ctaClick:           ctaClick,
      secondaryCtaClick:  secondaryCtaClick,
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
