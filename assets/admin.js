/* Luo Pan Master — hidden admin entry.
   Triple-tap any element with [data-admin-tap] to open the sign-in panel.
   Only a SHA-256 hash of the password is stored here. This is a convenience lock for a
   static site, not real security: anyone who knows the address of app.html can read its source. */
(function () {
  const HASH = '1b4f45a6888bad85d642f520b3bba65e73109ab3dea3eea84af748bc8fd88865';
  const KEY = 'lpm-admin';
  const APP = 'app.html';

  async function sha256(t) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  function isAdmin() { try { return sessionStorage.getItem(KEY) === HASH; } catch (e) { return false; } }
  function setAdmin() { try { sessionStorage.setItem(KEY, HASH); } catch (e) { } }

  const css = `
  .adm-back{position:fixed;inset:0;z-index:1000;background:rgba(8,12,10,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:grid;place-items:center;padding:16px}
  .adm{width:min(380px,100%);background:#F8F6EF;color:#16201B;border-radius:16px;padding:26px 24px 22px;display:grid;gap:14px;box-shadow:0 30px 80px rgba(0,0,0,.35);font-family:Figtree,system-ui,sans-serif}
  .adm h2{margin:0;font-family:"Noto Serif SC",Georgia,serif;font-size:22px}
  .adm p{margin:0;font-size:14px;color:#55615A}
  .adm input{font:inherit;font-size:16px;padding:12px 14px;border-radius:10px;border:1px solid #C9CFC4;background:#fff;color:#16201B}
  .adm input:focus{outline:2px solid #AE3820;outline-offset:1px}
  .adm .row{display:flex;gap:10px;justify-content:flex-end}
  .adm button{font:inherit;font-weight:600;font-size:15px;padding:11px 16px;border-radius:10px;border:1px solid #C9CFC4;background:#fff;color:#16201B;cursor:pointer}
  .adm button.go{background:#AE3820;border-color:#AE3820;color:#fff}
  .adm .err{color:#B23A2A;font-size:13.5px;min-height:18px}
  .adm .sh{animation:admsh .35s}
  @keyframes admsh{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
  @media (prefers-reduced-motion:reduce){.adm .sh{animation:none}}`;

  function open(opts) {
    opts = opts || {};
    if (!document.getElementById('adm-css')) { const s = document.createElement('style'); s.id = 'adm-css'; s.textContent = css; document.head.appendChild(s); }
    if (document.querySelector('.adm-back')) return;
    const back = document.createElement('div');
    back.className = 'adm-back';
    back.innerHTML = `<form class="adm" role="dialog" aria-modal="true" aria-labelledby="adm-t">
      <h2 id="adm-t">Master's desk</h2>
      <p>${opts.gate ? 'This area is for Master Pan’s readings. Sign in to continue.' : 'Sign in to open the reading tools.'}</p>
      <input type="password" id="adm-pw" autocomplete="current-password" placeholder="Password" aria-label="Password" required>
      <div class="err" id="adm-err" role="alert"></div>
      <div class="row">${opts.gate ? '<button type="button" id="adm-home">Back to home</button>' : '<button type="button" id="adm-x">Cancel</button>'}<button class="go" type="submit">Sign in</button></div>
    </form>`;
    document.body.appendChild(back);
    const f = back.querySelector('form'), pw = back.querySelector('#adm-pw'), err = back.querySelector('#adm-err');
    setTimeout(() => pw.focus(), 30);
    const close = () => back.remove();
    back.querySelector('#adm-x') && (back.querySelector('#adm-x').onclick = close);
    back.querySelector('#adm-home') && (back.querySelector('#adm-home').onclick = () => location.href = './');
    if (!opts.gate) { back.addEventListener('click', e => { if (e.target === back) close(); }); addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', k); } }); }
    f.onsubmit = async e => {
      e.preventDefault();
      let ok = false;
      try { ok = (await sha256(pw.value)) === HASH; } catch (er) { err.textContent = 'Sign-in needs a secure (https) page.'; return; }
      if (ok) { setAdmin(); if (opts.gate) { close(); opts.onOk && opts.onOk(); } else location.href = APP; }
      else { err.textContent = 'That password is not right.'; pw.value = ''; f.classList.remove('sh'); void f.offsetWidth; f.classList.add('sh'); pw.focus(); }
    };
  }

  function bindTaps() {
    document.querySelectorAll('[data-admin-tap]').forEach(el => {
      let taps = [];
      el.addEventListener('click', e => {
        const now = Date.now();
        taps = taps.filter(t => now - t < 700); taps.push(now);
        if (taps.length >= 3) { taps = []; e.preventDefault(); if (isAdmin() && !el.hasAttribute('data-admin-stay')) location.href = APP; else open(); }
      });
    });
  }

  window.LPMAdmin = { open, isAdmin, bindTaps };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindTaps); else bindTaps();
})();
