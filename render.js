/* ── Wedding Invitation Renderer ──
   Reads WEDDING_CONFIG (from config.js) and renders all content.
   No editing needed — change config.js instead.
*/
(function(){
  var C = window.WEDDING_CONFIG;
  if (!C) return;

  /* ══ RENDER: fill all text content from config ══ */
  (function render(){
    document.title = C.labels.pageTitle || (C.couple.groom + ' & ' + C.couple.bride);
    document.querySelector('.env-loader-text').textContent = C.labels.loader;

    // Intro
    document.getElementById('basmala').textContent = C.labels.basmala;
    var orn = document.getElementById('divider-ornament');
    if (orn) orn.textContent = C.labels.divider;
    document.getElementById('invite-prefix').textContent = C.labels.invitePrefix;
    document.getElementById('invite-suffix').textContent = C.labels.inviteSuffix;
    document.getElementById('groom-name').textContent = C.couple.groom;
    document.getElementById('bride-name').textContent = C.couple.bride;
    document.getElementById('scroll-hint-text').textContent = C.labels.scrollHint;

    // Families
    var fc = document.getElementById('families-container');
    if (fc && C.couple.families) {
      fc.innerHTML = C.couple.families.map(function(f, i){
        var h = '<div class="family-block">' +
          '<div class="family-label">' + f[0].role + '</div><div class="family-name">' + f[0].name + '</div>' +
          '<div class="family-label" style="margin-top:6px;">' + f[1].role + '</div><div class="family-name">' + f[1].name + '</div>' +
          '</div>';
        if (i < C.couple.families.length - 1) h += '<div class="and-symbol">' + C.labels.andSymbol + '</div>';
        return h;
      }).join('');
    }

    // Countdown
    document.getElementById('cd-title').textContent = C.labels.countdownTitle;
    document.getElementById('cd-subtitle').textContent = C.labels.countdownSubtitle;
    var cdLabels = document.querySelectorAll('.cd-label');
    if (cdLabels[0]) cdLabels[0].textContent = C.labels.timeUnits.seconds;
    if (cdLabels[1]) cdLabels[1].textContent = C.labels.timeUnits.minutes;
    if (cdLabels[2]) cdLabels[2].textContent = C.labels.timeUnits.hours;
    if (cdLabels[3]) cdLabels[3].textContent = C.labels.timeUnits.days;
    var sh2 = document.getElementById('scroll-hint-2-text');
    if (sh2) sh2.textContent = C.labels.scrollHint;

    // Program
    document.getElementById('program-title').textContent = C.labels.programTitle;

    // Timeline (generated from config)
    var tl = document.getElementById('timeline');
    if (tl && C.events) {
      tl.innerHTML = C.events.map(function(ev, i){
        var isLeft = i % 2 === 0;
        var txtSide = isLeft ? 'left' : 'right';
        var iconSide = isLeft ? 'right' : 'left';

        var txtBlock =
          '<span class="tl-date">' + ev.date + '</span>' +
          '<div class="tl-event">' + ev.title + '</div>' +
          '<div class="tl-location">' + ev.location + '</div>' +
          '<div class="tl-time">' + ev.time + ' <span class="tl-ampm">' + ev.ampm + '</span></div>' +
          '<button class="tl-location-btn" onclick="window.openMap(this)"><img src="' + C.assets.locationIcon + '" class="loc-icon" alt=""><span>' + C.labels.locationBtn + '</span></button>';

        var iconBlock =
          '<img src="assets/' + ev.icon + '" class="tl-icon" alt="" style="object-fit:contain;' +
          (txtSide === 'right' ? 'margin-right:0;margin-left:auto;' : '') + '">';

        var leftCell  = txtSide === 'left'  ? txtBlock : iconBlock;
        var rightCell = txtSide === 'right' ? txtBlock : iconBlock;

        return '<div class="timeline-item" data-location="' + ev.location + '" data-lat="' + ev.lat + '" data-lng="' + ev.lng + '">' +
          '<div class="tl-left-cell">' + leftCell + '</div>' +
          '<div class="tl-dot-wrapper"><div class="tl-dot"></div></div>' +
          '<div class="tl-right-cell">' + rightCell + '</div>' +
          '</div>';
      }).join('');
    }

    // Closing
    document.getElementById('closing-names').innerHTML = C.couple.groom + ' &amp; ' + C.couple.bride;
    document.getElementById('closing-tagline').textContent = C.labels.closingTagline;

    // Envelope seal text
    var sealPath = document.querySelector('#sealText textPath');
    if (sealPath) sealPath.textContent = C.labels.seal;

    // Map modal
    document.getElementById('modal-event-title').textContent = C.labels.map.title;
    var noCoordsP = document.querySelector('#map-no-coords p');
    if (noCoordsP) noCoordsP.textContent = C.labels.map.noCoords;
    document.getElementById('open-maps-btn').textContent = C.labels.map.openMaps;

    // Assets
    var lp = document.getElementById('leftPanel');
    var rp = document.getElementById('rightPanel');
    var sl = document.getElementById('seal');
    if (lp) lp.src = C.assets.envelope.left;
    if (rp) rp.src = C.assets.envelope.right;
    if (sl) sl.src = C.assets.envelope.seal;

    var fav = document.querySelector('link[rel="icon"]');
    if (fav && C.assets.favicon) fav.href = C.assets.favicon;
    var ci = document.getElementById('closing-icon');
    if (ci && C.assets.closingIcon) ci.src = C.assets.closingIcon;
  })();


  /* ══ ENVELOPE LOGIC ══ */
  (function(){
    var inv = document.getElementById('invitation');
    var loader = document.getElementById('env-loader');
    var lp = document.getElementById('leftPanel');
    var rp = document.getElementById('rightPanel');
    var sl = document.getElementById('seal');
    if (!lp || !rp || !sl) return;
    var loaded = 0, total = 3;
    function done(){ loaded++; if (loaded >= total) {
      setTimeout(function(){
        loader.style.opacity = '0';
        setTimeout(function(){ loader.style.display = 'none'; inv.classList.add('loaded'); }, 600);
      }, 400);
    }}
    [lp, rp, sl].forEach(function(img){ img.onload = done; img.onerror = done; });
    sl.addEventListener('click', function(){
      inv.classList.add('open');
      setTimeout(function(){
        var wc = document.getElementById('wedding-content');
        if (wc) wc.style.opacity = '1';
      }, 800);
    });
  })();


  /* ══ PAGE 1 PETALS ══ */
  (function(){
    var colors = ['#FFF9F2','#F8EEDB','#EFD8A5','#D8B36A','#FFF5E8','#F3E3C8'];
    var layer = document.getElementById('petals');
    if (!layer) return;
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div'); p.className = 'petal';
      var size = Math.random() * 7 + 5;
      p.style.cssText = 'width:' + size + 'px;height:' + (size * 1.5) + 'px;left:' + (Math.random() * 100) + '%;background:' + colors[Math.floor(Math.random() * colors.length)] + ';animation-duration:' + (Math.random() * 8 + 7) + 's;animation-delay:' + (Math.random() * 10) + 's;border-radius:' + (Math.random() * 40 + 30) + '% 0 ' + (Math.random() * 40 + 30) + '% 0;opacity:0;';
      layer.appendChild(p);
    }
  })();


  /* ══ HEART CLOCK ══ */
  (function(){
    var cx = 130, cy = 122, r = 64;
    var tg = document.getElementById('hcTicks');
    var hg = document.getElementById('hcDots');
    if (!tg || !hg) return;
    for (var i = 0; i < 60; i++) {
      var ang = (i / 60) * 2 * Math.PI - Math.PI / 2, isH = i % 5 === 0, r1 = isH ? r - 11 : r - 6;
      var x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang), x2 = cx + r1 * Math.cos(ang), y2 = cy + r1 * Math.sin(ang);
      var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', x1.toFixed(2)); ln.setAttribute('y1', y1.toFixed(2));
      ln.setAttribute('x2', x2.toFixed(2)); ln.setAttribute('y2', y2.toFixed(2));
      ln.setAttribute('stroke-width', isH ? '2.2' : '1'); ln.setAttribute('opacity', isH ? '1' : '0.4');
      tg.appendChild(ln);
    }
    for (var j = 0; j < 12; j++) {
      var ang2 = (j / 12) * 2 * Math.PI - Math.PI / 2, rd = r - 20;
      var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', (cx + rd * Math.cos(ang2)).toFixed(2));
      dot.setAttribute('cy', (cy + rd * Math.sin(ang2)).toFixed(2));
      dot.setAttribute('r', '2.8'); dot.setAttribute('fill', '#b8b4ae');
      hg.appendChild(dot);
    }
    function rot(id, deg) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('transform', 'rotate(' + deg + ' ' + cx + ' ' + cy + ')');
    }
    function live() {
      var now = new Date(), ms = now.getMilliseconds(), s = now.getSeconds() + ms / 1000, m = now.getMinutes() + s / 60, h = now.getHours() % 12 + m / 60;
      rot('hcSHand', s * 6); rot('hcMHand', m * 6); rot('hcHHand', h * 30);
    }
    var anim = false;
    function entry() {
      if (anim) return; anim = true;
      var now = new Date(), ms = now.getMilliseconds(), s = now.getSeconds() + ms / 1000, m = now.getMinutes() + s / 60, h = now.getHours() % 12 + m / 60;
      var tS = s * 6, tM = m * 6, tH = h * 30, dur = 1800, t0 = performance.now();
      (function step(ts) {
        var pr = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - pr, 3);
        rot('hcSHand', e * tS); rot('hcMHand', e * tM); rot('hcHHand', e * tH);
        if (pr < 1) requestAnimationFrame(step); else setInterval(live, 50);
      })(t0);
    }
    var sec = document.getElementById('countdown-section');
    if (!sec) { setInterval(live, 50); return; }
    new IntersectionObserver(function(es) { if (es[0].isIntersecting) entry(); }, { threshold: 0.3 }).observe(sec);
  })();


  /* ══ PAGE 2 PETALS ══ */
  (function(){
    var colors = ['#ffffff','#f0ebe5','#e8e4df','#ddd8d2','#f8f5f2'];
    var c = document.getElementById('cdPetals');
    if (!c) return;
    var s = false;
    new IntersectionObserver(function(es) {
      if (es[0].isIntersecting && !s) {
        s = true;
        for (var i = 0; i < 24; i++) {
          var p = document.createElement('div'); p.className = 'cd-petal';
          var sz = 6 + Math.random() * 9;
          p.style.cssText = 'width:' + sz + 'px;height:' + (sz * 1.5) + 'px;left:' + (Math.random() * 100) + '%;top:-5%;background:' + colors[Math.floor(Math.random() * colors.length)] + ';animation-duration:' + (6 + Math.random() * 8) + 's;animation-delay:' + (Math.random() * 8) + 's;border-radius:' + (40 + Math.random() * 30) + '% 0 ' + (40 + Math.random() * 30) + '% 0;';
          c.appendChild(p);
        }
      }
    }, { threshold: 0.1 }).observe(document.getElementById('countdown-section'));
  })();


  /* ══ COUNTDOWN TIMER ══ */
  (function(){
    var wd = new Date(C.countdown.targetDate);
    var els = {
      d: document.getElementById('cd-days'),
      h: document.getElementById('cd-hours'),
      m: document.getElementById('cd-mins'),
      s: document.getElementById('cd-secs')
    };
    function pad(n) { return String(n).padStart(2, '0'); }
    function flip(el, val) {
      var nv = pad(val);
      if (el.textContent !== nv) {
        el.classList.remove('flip'); void el.offsetWidth;
        el.classList.add('flip'); el.textContent = nv;
      }
    }
    function tick() {
      var diff = Math.max(0, wd.getTime() - Date.now());
      var d = Math.floor(diff / 86400000); diff -= d * 86400000;
      var h = Math.floor(diff / 3600000); diff -= h * 3600000;
      var m = Math.floor(diff / 60000); diff -= m * 60000;
      var s = Math.floor(diff / 1000);
      flip(els.d, d); flip(els.h, h); flip(els.m, m); flip(els.s, s);
    }
    tick(); setInterval(tick, 1000);
  })();


  /* ══ TIMELINE REVEAL ══ */
  (function(){
    var items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item){
      new IntersectionObserver(function(es){
        if (es[0].isIntersecting) es[0].target.classList.add('visible');
      }, { threshold: 0.18 }).observe(item);
    });
  })();


  /* ══ LEAFLET MAP ══ */
  var leafMap = null, leafMarker = null, currentLat = null, currentLng = null;

  window.openMap = function(btn) {
    var item = btn.closest('.timeline-item');
    var addr = item.dataset.location || '';
    var lat = item.dataset.lat;
    var lng = item.dataset.lng;
    var eventName = item.querySelector('.tl-event').textContent;

    currentLat = lat ? parseFloat(lat) : null;
    currentLng = lng ? parseFloat(lng) : null;

    document.getElementById('modal-event-title').textContent = eventName;
    document.getElementById('modal-address').textContent = addr;
    document.getElementById('map-modal').classList.add('open');
    document.body.style.overflow = 'hidden';

    var mapEl = document.getElementById('leaflet-map'),
        noEl = document.getElementById('map-no-coords'),
        btn2 = document.getElementById('open-maps-btn');

    if (!currentLat || !currentLng) {
      mapEl.style.display = 'none';
      noEl.style.display = 'flex';
      btn2.style.display = 'none';
      return;
    }

    noEl.style.display = 'none';
    mapEl.style.display = 'block';
    btn2.style.display = 'block';

    setTimeout(function(){
      if (!leafMap) {
        leafMap = L.map('leaflet-map', { zoomControl: true, scrollWheelZoom: false });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap', maxZoom: 19
        }).addTo(leafMap);
      }
      leafMap.setView([currentLat, currentLng], 17);
      if (leafMarker) leafMap.removeLayer(leafMarker);
      var icon = L.divIcon({
        html: '<div style="font-size:32px;line-height:1;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5));">📍</div>',
        className: '', iconSize: [32, 32], iconAnchor: [16, 32]
      });
      leafMarker = L.marker([currentLat, currentLng], { icon }).addTo(leafMap);
      leafMarker.bindPopup('<strong>' + eventName + '</strong><br><small>' + addr + '</small>').openPopup();
      leafMap.invalidateSize();
    }, 120);
  };

  window.closeMap = function() {
    document.getElementById('map-modal').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.openInMaps = function() {
    if (currentLat && currentLng) window.open('https://maps.google.com/?q=' + currentLat + ',' + currentLng, '_blank');
  };

  (function(){
    var sh = document.querySelector('.map-sheet');
    var sy = 0;
    if (!sh) return;
    sh.addEventListener('touchstart', function(e){ sy = e.touches[0].clientY; }, { passive: true });
    sh.addEventListener('touchend', function(e){
      if (e.changedTouches[0].clientY - sy > 80) window.closeMap();
    }, { passive: true });
  })();


  /* ══ PROGRAM SECTION HEIGHT FIT ══ */
  (function(){
    function fit() {
      var sec = document.getElementById('program-section'),
          cont = sec && sec.querySelector('.program-content'),
          bg = document.getElementById('programBgImg');
      if (!sec || !cont || !bg) return;
      var h = Math.max(cont.scrollHeight + 120, document.getElementById('envelope-section').clientHeight);
      sec.style.minHeight = h + 'px';
      bg.style.height = h + 'px';
    }
    window.addEventListener('load', fit);
    window.addEventListener('resize', fit);
    setTimeout(fit, 400);
  })();


  /* ══ BACKGROUND IMAGES ══ */
  (function(){
    function tryImg(url, onOk) {
      var i = new Image();
      i.onload = function(){ onOk(url); };
      i.onerror = function(){
        if (url.match(/\.png$/i)) tryImg(url.replace(/\.png$/i, '.jpg'), onOk);
      };
      i.src = url;
    }
    if (C.assets.backgrounds.intro) {
      tryImg(C.assets.backgrounds.intro, function(u){
        var el = document.getElementById('bg-image');
        if (el) el.style.backgroundImage = "url('" + u + "')";
      });
    }
    if (C.assets.backgrounds.countdown) {
      tryImg(C.assets.backgrounds.countdown, function(u){
        var el = document.getElementById('countdown-bg-image');
        if (el) el.style.backgroundImage = "url('" + u + "')";
      });
    }
    var bg = document.getElementById('programBgImg');
    if (bg && C.assets.backgrounds.program) {
      bg.onerror = function(){
        if (this.src.match(/\.png$/i)) {
          var j = this.src.replace(/\.png$/i, '.jpg');
          this.onerror = null;
          this.src = j;
        }
      };
      bg.src = C.assets.backgrounds.program;
    }
  })();

})();
