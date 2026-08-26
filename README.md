# PGS Parking Asset Value Calculator

Lead magnet calculator. Hosted via GitHub Pages. Embedded on WordPress pages via a two-line Custom HTML block.

---

## WordPress embed (Custom HTML block)

```html
<div id="pgs-calculator"></div>
<script src="https://YOUR-GITHUB-USERNAME.github.io/pgs-calculator/calculator.js"></script>
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username after enabling Pages (see Setup below).

---

## Setup

### 1. Enable GitHub Pages
- Go to the repo on github.com → **Settings → Pages**
- Source: **Deploy from a branch** → branch: `main`, folder: `/ (root)`
- Save. Your file will be live at `https://YOUR-GITHUB-USERNAME.github.io/pgs-calculator/calculator.js` within a minute.

### 2. Configure HubSpot

**In `calculator.js`, update the top config block:**

```js
var HUBSPOT_PORTAL_ID = '12345678';        // your HubSpot portal ID
var HUBSPOT_FORM_GUID = 'xxxxxxxx-xxxx-...'; // your HubSpot form GUID
var CTA_URL           = 'https://www.pgsparking.com/contact';  // primary bottom CTA
var SOLUTIONS_URL     = 'https://www.pgsparking.com/solutions'; // secondary bottom link
```

**Create a HubSpot form** (Marketing → Forms → Create form). The form only needs an **Email** field — that's the only input the assessment collects. Get the portal ID and form GUID from the embed code.

**Create these custom contact properties** (Settings → Properties → Contact → Create property):

| Internal name | Label | Type |
|---|---|---|
| `parking_asset_value_score` | Parking Asset Value Score (0–100) | Number |
| `pav_utilization_access_score` | PAV: Utilization & Access (0–40) | Number |
| `pav_adaptability_experience_score` | PAV: Adaptability & Experience (0–25) | Number |
| `pav_visibility_performance_score` | PAV: Visibility & Performance (0–35) | Number |
| `pav_score_tier` | PAV: Score Tier | Single-line text |
| `pav_focus_area` | PAV: Focus Area | Single-line text |

Then add all of the above field names to your HubSpot form so the API accepts them.

### 3. (Optional) HubSpot Behavioral Events

Go to **Reports → Analytics Tools → Custom Behavioral Events** and create four events:
- `assessment_started`
- `section_completed`
- `results_viewed`
- `cta_clicked`

Copy each event's internal name (e.g. `pe12345678_assessment_started`) into the `HS_EVENT_*` variables at the top of `calculator.js`.

---

## Making updates

1. Open `calculator.js` on github.com
2. Click the pencil (Edit) icon
3. Make your changes
4. Click **Commit changes**
5. Live within ~60 seconds. No need to touch WordPress.

---

## Files

| File | Purpose |
|---|---|
| `calculator.js` | The calculator — edit this to update content, scoring, or config |
| `index.html` | Local test page — open in browser to preview changes before committing |
