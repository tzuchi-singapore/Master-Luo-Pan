# Luo Pan Master 罗盘大师

**Classical Feng Shui by Master Pan 潘芃名** — a public guide to the tools of Feng Shui, with a private reading desk for the Master.

**Live site:** https://tzuchi-singapore.github.io/Master-Luo-Pan/

---

## What's in the site

| Page | Who it's for | What it does |
|---|---|---|
| `index.html` — front page | Everyone | Explains the nine tools (Luo Pan, Form School, Flying Stars, Eight Mansions, Ba Zi, Five Elements, Lu Ban ruler, Tong Shu, design), the history, documented real-world cases, and a reading-request form that opens WhatsApp. |
| `app.html` — reading desk | Master Pan (admin) | The full calculation app: Ba Zi with true solar time and luck pillars, Kua / Eight Mansions, Xuan Kong Flying Stars (Period 7–9, annual and monthly stars), Luo Pan with live phone compass, floor-plan overlay, camera and photo review, Lu Ban / Ding Lan ruler, Tong Shu calendar, and PDF / HTML / JSON export. |

### Reading requests (WhatsApp)
The form on the front page asks for the client's Chinese name, English name, gender, English (Gregorian) date of birth, time of birth (or "not sure"), place of birth, optional Ba Zi, the purpose of the reading, the property address, and any partners' birthdays. It then opens WhatsApp to **+65 9816 3603** with the message filled in. The client attaches the floor plan (PDF) and design mock-ups in the chat. **Nothing is stored on the website.**

To change the number, edit `const WA = '6598163603'` near the bottom of `index.html`, and the number shown in the "What Master Pan needs" card and footer.

### Admin access
Triple-tap the Luo Pan logo at the top left of the front page, then enter the password. You go straight to the reading desk. Opening `app.html` directly also asks for the password. The sign-in lasts until the browser tab is closed.

To change the password, compute its SHA-256 hash and replace `HASH` in `assets/admin.js` **and** the same hash in the small script at the top of `app.html`:

```bash
printf '%s' 'NewPassword' | sha256sum
```

> **Important:** this is a convenience lock for a static website, not real security. GitHub Pages cannot check passwords on a server, so anyone who reads the page source can find their way into `app.html`. Do not keep confidential client data inside the published files. Client readings entered in the app stay in that browser only, unless exported.

### Live compass and camera
These work on the published https site in Safari or Chrome on a phone. Tap **Allow compass** on the Luo Pan tab and choose Allow. The AI reading and in-app Higgsfield generation work only when the app is opened inside Claude.

---

## Files

```
index.html            Front page (public)
app.html              Reading desk (password; marked noindex for search engines)
assets/admin.js       Triple-tap sign-in and password check (hash only)
assets/favicon.svg    Site icon
assets/img/           Front-page images (AI-generated for this site)
404.html              Not-found page
.nojekyll             Serve files as-is on GitHub Pages
LICENSE               All rights reserved
NOTICE.md             Third-party software, fonts and sources
```

No build step. Edit the HTML and push to `main`; GitHub Pages republishes in a minute or two.

## Methods
Xuan Kong Flying Stars (沈氏玄空), Eight Mansions (八宅明镜), Four Pillars / Zi Ping Ba Zi with true solar time, Form School (峦头), Lu Ban and Ding Lan rulers, and the Tong Shu twelve day officers (建除十二神). Solar terms are computed astronomically (Meeus); Singapore's historical time zones are applied for births before 1982.

## Disclaimer
Feng Shui is a traditional Chinese practice, not a science. Readings are guidance to be used together with sound design, daylight, ventilation and professional building advice.

## License
© 2026 Master Pan 潘芃名. All rights reserved — see [LICENSE](LICENSE). Third-party components keep their own licences — see [NOTICE.md](NOTICE.md).
