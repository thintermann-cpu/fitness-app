
// WODS loaded from data/wods.json
// YT_LINKS defined below

var HS_KEY='wod_hs',FAV_KEY='wod_fav',CUSTOM_KEY='wod_custom',HISTORY_KEY='wod_history',TIMER_SETTINGS_KEY='wod_timer_settings';
var NETLIFY_TOKEN_KEY='wod_cfg_netlify_token',NETLIFY_SITE_KEY='wod_cfg_netlify_site',CLAUDE_KEY_KEY='wod_cfg_claude_key';

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

function applyFilters(q){
  return allWods.filter(function(w){
    var dur=parseInt(w.dauer)||0;
    return (filterType.size===0||filterType.has(w.typ))
      &&(filterEq.size===0||Array.from(filterEq).every(function(e){return (w.equipment||'').toLowerCase().indexOf(e.toLowerCase())>=0;}))
      &&(filterExcEq.size===0||!Array.from(filterExcEq).some(function(e){return (w.equipment||'').toLowerCase().indexOf(e.toLowerCase())>=0;}))
      &&(filterCat.size===0||Array.from(filterCat).some(function(c){return (w.kategorie||'').toLowerCase().replace(/\s/g,'')===c.toLowerCase().replace(/\s/g,'');}))
      &&(filterDur.size===0||!w.dauer||Array.from(filterDur).some(function(d){return dur<=parseInt(d);}))
      &&(filterDiff.size===0||filterDiff.has(w.schwierigkeit||''))
      &&(!q||w.name.toLowerCase().indexOf(q)>=0||(w.uebungen||'').toLowerCase().indexOf(q)>=0);
  });
}
var allWods=[],currentWod=null;
var filterType=new Set(),filterEq=new Set(),filterExcEq=new Set(),filterCat=new Set(),filterDur=new Set(),filterDiff=new Set();
var highscores={},favs=new Set(),wodHistory={};
var timerInterval=null,timerRunning=false,timerElapsed=0,timerRound=1,timerPhase='work',timerDone=false;
var params={},editingWodId=null,exFilter='all';
var timerSettings={tabataWork:20,tabataRest:10,emomInterval:60,countdownWarn:10};
var audioCtx=null,wakeLock=null;

window.onload=function(){
  try{ history.replaceState({screen:'screen-list',data:null}, ''); }catch(e){}
  // Init user system
  var saved = getCurrentUser();
  if(saved){
    currentUser = saved;
    HS_KEY = 'wod_hs_'+currentUser.id;
    FAV_KEY = 'wod_fav_'+currentUser.id;
    HISTORY_KEY = 'wod_history_'+currentUser.id;
    CUSTOM_KEY = 'wod_custom_'+currentUser.id;
  }
  loadLocal();
  loadCustomWods();
  renderList();
  var loader = document.getElementById('loading-screen');
  if(loader) loader.style.display = 'none';
  updateUserDisplay();
  // Show login if no user
  if(!currentUser){
    setTimeout(function(){ showUserScreen(); }, 200);
  } else {
    setTimeout(function(){ showToast('💪 '+allWods.length+' Workouts · '+currentUser.avatar+' '+currentUser.name); }, 100);
  }
};

function loadLocal(){
  try{highscores=JSON.parse(localStorage.getItem(HS_KEY)||'{}')}catch(e){highscores={};}
  try{favs=new Set(JSON.parse(localStorage.getItem(FAV_KEY)||'[]'))}catch(e){favs=new Set();}
  try{wodHistory=JSON.parse(localStorage.getItem(HISTORY_KEY)||'{}')}catch(e){wodHistory={};}
  try{var s=JSON.parse(localStorage.getItem(TIMER_SETTINGS_KEY)||'{}');timerSettings=Object.assign(timerSettings,s);}catch(e){}
}
function loadCustomWods(){
  try{
    var custom=JSON.parse(localStorage.getItem(CUSTOM_KEY)||'[]');
    var bids=new Set(BUILTIN_WODS.map(function(w){return w.id;}));
    var cb={};custom.forEach(function(w){cb[w.id]=w;});
    var merged=BUILTIN_WODS.map(function(w){return cb[w.id]||w;});
    custom.filter(function(w){return !bids.has(w.id);}).forEach(function(w){merged.push(w);});
    allWods=merged;
  }catch(e){allWods=BUILTIN_WODS.slice();}
}
function saveCustomWods(){
  var bids=new Set(BUILTIN_WODS.map(function(w){return w.id;}));
  var toSave=allWods.filter(function(w){
    if(!bids.has(w.id))return true;
    var orig=BUILTIN_WODS.find(function(b){return b.id===w.id;});
    return JSON.stringify(orig)!==JSON.stringify(w);
  });
  localStorage.setItem(CUSTOM_KEY,JSON.stringify(toSave));
}
function saveHistory(id,result,note){
  if(!wodHistory[id])wodHistory[id]=[];
  wodHistory[id].unshift({result:result,note:note,date:new Date().toLocaleDateString('de-DE'),ts:Date.now()});
  if(wodHistory[id].length>20)wodHistory[id]=wodHistory[id].slice(0,20);
  localStorage.setItem(HISTORY_KEY,JSON.stringify(wodHistory));
}
function getRecentWods(){
  var r=[];
  Object.entries(wodHistory).forEach(function(e){if(e[1].length>0)r.push({id:e[0],ts:e[1][0].ts});});
  r.sort(function(a,b){return b.ts-a.ts;});
  return r.slice(0,5).map(function(x){return allWods.find(function(w){return w.id===x.id;});}).filter(Boolean);
}

function setFilter(g,v,el){
  // old setFilter - replaced by setFFilter
  document.querySelectorAll('[data-g="'+g+'"]').forEach(function(c){c.classList.remove('active');});
  el.classList.add('active');renderList();
}
function toggleEq(v,el){
  if(v==='all'){filterEq=new Set();document.querySelectorAll('[data-g="eq"]').forEach(function(c){c.classList.remove('active');});el.classList.add('active');}
  else{
    document.querySelector('[data-g="eq"][data-v="all"]').classList.remove('active');
    if(filterEq.has(v)){filterEq.delete(v);el.classList.remove('active');if(filterEq.size===0)document.querySelector('[data-g="eq"][data-v="all"]').classList.add('active');}
    else{filterEq.add(v);el.classList.add('active');}
  }
  renderList();
}

function renderList(){
  var q=(document.getElementById('search-input')||{value:''}).value.toLowerCase();
  var filtered=applyFilters(q);
  document.getElementById('wod-count').textContent=filtered.length;
  var sub=document.getElementById('list-subtitle');
  if(sub)sub.textContent=filtered.length+' / '+allWods.length+' Workouts';
  updateFilterBtn();
  _lastFiltered=filtered;
  var rs=document.getElementById('recent-section');
  if(rs){
    var recent=getRecentWods().slice(0,3);
    if(recent.length&&filterType.size===0&&filterCat.size===0&&filterEq.size===0&&!q){
      var rh='<div class="sec-title" style="margin-bottom:10px;">Zuletzt gemacht</div>';
      rh+=recent.map(function(w){
        return '<div class="wod-card" data-id="'+w.id+'" onclick="openDetail(this.dataset.id)" style="margin-bottom:8px;">'
          +'<div class="type-stripe bar-'+w.typ+'"></div>'
          +'<div class="card-inner"><div class="card-top"><div class="card-name" style="font-size:18px;">'+w.name+'</div></div>'
          +'<div class="card-badges"><span class="badge b-'+w.typ+'">'+w.typ+'</span><span class="badge b-cat">'+w.kategorie+'</span></div></div></div>';
      }).join('');
      rs.innerHTML=rh;
    }else rs.innerHTML='';
  }
  var c=document.getElementById('wod-list');
  if(!filtered.length){c.innerHTML='<div class="empty"><div class="ei">🔍</div><p>Keine Workouts gefunden.<br>Filter anpassen?</p></div>';return;}
  var html='';
  filtered.forEach(function(w){
    var hs=highscores[w.id],isFav=favs.has(w.id);
    var eq=(w.equipment||'').split(',').map(function(e){return '<span class="eq-tag">'+esc(e.trim())+'</span>';}).join('');
    html+='<div class="wod-card" data-id="'+esc(w.id)+'" onclick="openDetail(this.dataset.id)">'
      +'<div class="type-stripe bar-'+esc(w.typ)+'"></div>'
      +'<div class="card-inner">'
      +'<div class="card-top"><div class="card-name">'+esc(w.name)+'</div>'
      +'<button class="fav-btn'+(isFav?' active':'')+'" onclick="event.stopPropagation();quickFav(\''+esc(w.id)+'\',this)">'+(isFav?'♥':'♡')+'</button></div>'
      +'<div class="card-badges"><span class="badge b-'+esc(w.typ)+'">'+esc(w.typ)+'</span><span class="badge b-cat">'+esc(w.kategorie)+'</span><span class="badge b-'+esc(w.schwierigkeit)+'">'+esc(w.schwierigkeit)+'</span>'+(w.dauer?'<span class="badge b-cat">⏱ '+esc(w.dauer)+'m</span>':'')+'</div>'
      +(w.equipment?'<div class="card-eq">'+eq+'</div>':'')
      +(hs?'<div class="card-hs">🏆 '+esc(hs.result)+'</div>':'')
      +'</div></div>';
  });
  c.innerHTML=html;
}

var loadedCount=30;
var _lastFiltered=[];
function loadMore(){
  var q=document.getElementById('search-input').value.toLowerCase();
  var filtered=applyFilters(q);
  loadedCount+=30;
  var c=document.getElementById('wod-list'),btn=c.querySelector('.load-more-btn');
  filtered.slice(loadedCount-30,loadedCount).forEach(function(w){
    var div=document.createElement('div');
    var hs=highscores[w.id],isFav=favs.has(w.id);
    var eq=(w.equipment||'').split(',').map(function(e){return '<span class="eq-tag">'+e.trim()+'</span>';}).join('');
    div.innerHTML='<div class="wod-card" data-id="'+w.id+'" onclick="openDetail(this.dataset.id)"><div class="type-stripe bar-'+w.typ+'"></div><div class="card-inner"><div class="card-top"><div class="card-name">'+w.name+'</div><button class="fav-btn'+(isFav?' active':'')+'" onclick="event.stopPropagation();quickFav(\''+w.id+'\',this)">'+(isFav?'♥':'♡')+'</button></div><div class="card-badges"><span class="badge b-'+w.typ+'">'+w.typ+'</span><span class="badge b-cat">'+w.kategorie+'</span><span class="badge b-'+w.schwierigkeit+'">'+w.schwierigkeit+'</span>'+(w.dauer?'<span class="badge b-cat">⏱ '+w.dauer+'m</span>':'')+'</div>'+(w.equipment?'<div class="card-eq">'+eq+'</div>':'')+(hs?'<div class="card-hs">🏆 '+hs.result+'</div>':'')+'</div></div>';
    if(btn)c.insertBefore(div.firstChild,btn);else c.appendChild(div.firstChild);
  });
  if(loadedCount>=filtered.length&&btn)btn.remove();
  else if(btn)btn.textContent='+ '+(filtered.length-loadedCount)+' weitere laden';
}

function openDetail(id, noPush){
  currentWod=allWods.find(function(w){return w.id===id;});
  if(!currentWod)return;
  if(!noPush) pushHistory('screen-detail', id);
  var w=currentWod;
  document.getElementById('d-name').textContent=w.name;
  document.getElementById('d-meta').innerHTML='<span class="badge b-'+w.typ+'">'+w.typ+'</span> <span class="badge b-cat">'+w.kategorie+'</span> <span class="badge b-'+w.schwierigkeit+'">'+w.schwierigkeit+'</span>'+(w.quelle?' <span class="badge b-cat">'+w.quelle+'</span>':'');
  document.getElementById('d-desc').textContent=w.beschreibung||'–';
  document.getElementById('d-exercises').textContent=w.uebungen||'–';
  document.getElementById('d-equipment').textContent=w.equipment||'–';
  params={dauer:parseInt(w.dauer)||20,runden:parseInt(w.runden)||3,gewicht:parseInt(w.gewicht)||0,reps:parseReps(w)};
  var ph=pbox('dauer','Dauer (Min)',params.dauer,1,1,120);
  if(w.typ==='EMOM'||w.typ==='ForTime')ph+=pbox('runden','Runden',params.runden,1,1,30);
  if(params.gewicht>0)ph+=pbox('gewicht','Gewicht kg',params.gewicht,2.5,0,200);
  if(params.reps.length){ph+='<div style="grid-column:1/-1;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;margin-top:6px;font-weight:600;">Reps</div>';params.reps.forEach(function(r,i){ph+=pbox('rep_'+i,r.name,r.val,1,0,200);});}
  document.getElementById('d-params').innerHTML=ph;
  document.getElementById('d-scale-sec').style.display=(w.skal_leicht||w.skal_schwer)?'':'none';
  document.getElementById('d-easy').textContent=w.skal_leicht||'–';
  document.getElementById('d-hard').textContent=w.skal_schwer||'–';
  var hist=wodHistory[w.id]||[];
  var hh=hist.length?hist.map(function(e,i){return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;'+(i>0?'border-top:1px solid var(--border)':'')+'"><div><div style="font-weight:600;color:var(--accent);font-size:15px;">'+e.result+'</div>'+(e.note?'<div style="font-size:12px;color:var(--muted);margin-top:2px;">'+e.note+'</div>':'')+'</div><div style="font-size:12px;color:var(--muted);">'+e.date+'</div></div>';}).join(''):'<div style="color:var(--muted);font-size:13px;padding:8px 0;">Noch kein Ergebnis gespeichert.</div>';
  document.getElementById('d-hs').innerHTML=hh;
  document.getElementById('d-fav-btn').innerHTML=favs.has(w.id)?'♥ Favorit':'♡ Favorit';
  var ytDirect=YT_LINKS[w.name];
  var ytBtn=document.getElementById('yt-btn');
  ytBtn.innerHTML=(ytDirect&&ytDirect.indexOf('results')<0?'▶ YouTube Tutorial':'🔍 YouTube Suche');
  showScreen('screen-detail');
}

function parseReps(w){
  var ex=(w.uebungen||'').split(',').map(function(e){return e.trim();}).filter(Boolean);
  if(!ex.length)return[];
  var rs=(w.reps||w.beschreibung||'').trim();if(!rs)return[];
  var re=/(\d+)\s+([A-Za-z][^,]+)/g,m,matches=[];
  while((m=re.exec(rs))!==null)matches.push(m);
  if(matches.length>=2&&matches.length<=ex.length+1)return matches.slice(0,ex.length).map(function(x,i){return{name:ex[i]?shortN(ex[i]):x[2].trim(),val:parseInt(x[1])};});
  var sp=rs.split('/').map(function(s){return parseInt(s.trim());}).filter(function(n){return !isNaN(n);});
  if(sp.length===ex.length&&ex.length>1)return ex.map(function(e,i){return{name:shortN(e),val:sp[i]};});
  var dp=rs.split('-').map(function(s){return parseInt(s.trim());}).filter(function(n){return !isNaN(n);});
  if(dp.length>=2)return dp.map(function(v,i){return{name:'Runde '+(i+1),val:v};});
  var first=parseInt((rs.match(/\d+/)||[])[0]);
  if(!isNaN(first)&&ex.length<=8)return ex.map(function(e){return{name:shortN(e),val:first};});
  return[];
}
function shortN(s){return s.length>14?s.substring(0,13)+'…':s;}
function pbox(k,l,v,step,min,max){return '<div class="param-box"><label>'+l+'</label><div class="pval" id="pv-'+k+'">'+v+'</div><div class="pctrl"><button class="pbtn" onclick="adj(\''+k+'\',-'+step+','+min+','+max+')">−</button><button class="pbtn" onclick="adj(\''+k+'\','+step+','+min+','+max+')">+</button></div></div>';}
function adj(k,d,min,max){params[k]=Math.min(max,Math.max(min,(params[k]||0)+d));var el=document.getElementById('pv-'+k);if(el)el.textContent=params[k];}

function toggleFav(){
  if(!currentWod)return;
  if(favs.has(currentWod.id))favs.delete(currentWod.id);else favs.add(currentWod.id);
  localStorage.setItem(FAV_KEY,JSON.stringify(Array.from(favs)));
  document.getElementById('d-fav-btn').innerHTML=favs.has(currentWod.id)?'♥ Favorit':'♡ Favorit';
  renderList();showToast(favs.has(currentWod.id)?'♥ Favorit gespeichert':'Entfernt');
}
function quickFav(id,btn){
  if(favs.has(id)){favs.delete(id);btn.textContent='♡';btn.classList.remove('active');}
  else{favs.add(id);btn.textContent='♥';btn.classList.add('active');}
  localStorage.setItem(FAV_KEY,JSON.stringify(Array.from(favs)));
}
function openYoutube(){
  if(!currentWod)return;
  var d=YT_LINKS[currentWod.name];
  window.open(d||'https://www.youtube.com/results?search_query='+encodeURIComponent(currentWod.name+' CrossFit WOD'),'_blank');
}
function openRandom(){
  var f=allWods.filter(function(w){return (filterType.size===0||filterType.has(w.typ))&&(filterEq.size===0||Array.from(filterEq).every(function(e){return (w.equipment||'').toLowerCase().indexOf(e.toLowerCase())>=0;}))&&(filterCat.size===0||Array.from(filterCat).some(function(c){return (w.kategorie||'').toLowerCase().replace(/\s/g,'')===c.toLowerCase().replace(/\s/g,'');}));});
  if(!f.length){showToast('Keine Workouts');return;}
  var w=f[Math.floor(Math.random()*f.length)];openDetail(w.id);showToast('🎲 '+w.name);
}

function startTimer(){
  if(!currentWod)return;
  var w=currentWod;
  document.getElementById('t-name').textContent=w.name;document.getElementById('t-type').textContent=w.typ;
  document.getElementById('t-score').value='';document.getElementById('t-note').value='';
  timerRunning=false;timerDone=false;timerRound=1;timerPhase='work';
  var ring=document.getElementById('timer-ring');ring.classList.remove('warn','done');
  document.getElementById('t-big').classList.remove('warn','done');
  document.getElementById('t-play').textContent='▶';
  if(w.typ==='AMRAP'||w.typ==='ForTime'){timerElapsed=(params.dauer||20)*60;document.getElementById('t-round').textContent='';document.getElementById('t-phase').textContent=w.typ==='AMRAP'?'AMRAP':'For Time';}
  else if(w.typ==='EMOM'){timerElapsed=timerSettings.emomInterval;document.getElementById('t-round').textContent='Runde 1 / '+(params.runden||10);document.getElementById('t-phase').textContent='EMOM';}
  else if(w.typ==='Tabata'){timerElapsed=timerSettings.tabataWork;timerPhase='work';document.getElementById('t-round').textContent='Intervall 1 / '+((params.runden||8)*4);document.getElementById('t-phase').textContent='WORK';}
  updateDisp();requestWakeLock();resetCounters();populateWodDesc();renderSmartCounter();var sa=document.getElementById('score-area');if(sa)sa.style.display='none';showScreen('screen-timer');
}
function toggleTimer(){
  if(timerDone){resetTimer();return;}
  timerRunning=!timerRunning;document.getElementById('t-play').textContent=timerRunning?'⏸':'▶';
  if(timerRunning)timerInterval=setInterval(tick,1000);else clearInterval(timerInterval);
}
function tick(){
  var w=currentWod;if(!w)return;
  timerElapsed--;updateDisp();
  var ring=document.getElementById('timer-ring'),big=document.getElementById('t-big'),warn=timerSettings.countdownWarn;
  if(w.typ==='AMRAP'||w.typ==='ForTime'){
    if(timerElapsed<=warn&&timerElapsed>0){ring.classList.add('warn');big.classList.add('warn');if(timerElapsed<=3)playBeep(660,0.15,0.3);}else{ring.classList.remove('warn');big.classList.remove('warn');}
    if(timerElapsed<=0)finish('FERTIG');
  }else if(w.typ==='EMOM'){
    if(timerElapsed<=warn&&timerElapsed>0){ring.classList.add('warn');big.classList.add('warn');if(timerElapsed<=3)playBeep(660,0.15,0.3);}else{ring.classList.remove('warn');big.classList.remove('warn');}
    if(timerElapsed<=0){timerRound++;var max=params.runden||10;if(timerRound>max){finish('FERTIG');return;}timerElapsed=timerSettings.emomInterval;playRoundEnd();ring.classList.remove('warn');big.classList.remove('warn');document.getElementById('t-round').textContent='Runde '+timerRound+' / '+max;document.getElementById('t-phase').textContent='EMOM';updateDisp();}
  }else if(w.typ==='Tabata'){
    if(timerElapsed<=5&&timerElapsed>0){ring.classList.add('warn');big.classList.add('warn');if(timerElapsed<=3)playBeep(660,0.15,0.3);}else{ring.classList.remove('warn');big.classList.remove('warn');}
    if(timerElapsed<=0){var tot=(params.runden||8)*4;if(timerRound>=tot){finish('FERTIG');return;}timerRound++;timerPhase=timerPhase==='work'?'rest':'work';timerElapsed=timerPhase==='work'?timerSettings.tabataWork:timerSettings.tabataRest;playRoundEnd();ring.classList.remove('warn');big.classList.remove('warn');document.getElementById('t-round').textContent='Intervall '+timerRound+' / '+tot;document.getElementById('t-phase').textContent=timerPhase==='work'?'WORK':'REST';updateDisp();}
  }
}
function finish(msg){
  timerDone=true;clearInterval(timerInterval);timerRunning=false;
  document.getElementById('t-play').textContent='▶';
  var ring=document.getElementById('timer-ring'),big=document.getElementById('t-big');
  ring.classList.remove('warn');ring.classList.add('done');big.classList.remove('warn');big.classList.add('done');
  document.getElementById('t-phase').textContent=msg;
  playFinish();releaseWakeLock();
  // Show score area
  var sa=document.getElementById('score-area');
  if(sa){sa.style.display='block';}
  autoFillScore();
}
function updateDisp(){var s=timerElapsed,mn=Math.floor(s/60),sc=s%60;document.getElementById('t-big').textContent=(mn<10?'0':'')+mn+':'+(sc<10?'0':'')+sc;}
function resetTimer(){clearInterval(timerInterval);timerRunning=false;document.getElementById('t-play').textContent='▶';if(currentWod)startTimer();}
function stopTimer(){clearInterval(timerInterval);timerRunning=false;document.getElementById('t-play').textContent='▶';}
function saveScore(){
  if(!currentWod)return;var result=document.getElementById('t-score').value.trim();
  if(!result){showToast('Ergebnis eingeben');return;}
  var note=document.getElementById('t-note').value.trim();
  saveHistory(currentWod.id,result,note);
  highscores[currentWod.id]={result:result,note:note,date:new Date().toLocaleDateString('de-DE')};
  localStorage.setItem(HS_KEY,JSON.stringify(highscores));
  releaseWakeLock();stopTimer();
  showPostWorkout(result);
}

function getAudioCtx(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx;}
function playBeep(freq,dur,vol){try{var ctx=getAudioCtx();var osc=ctx.createOscillator();var g=ctx.createGain();osc.connect(g);g.connect(ctx.destination);osc.frequency.value=freq;osc.type='sine';g.gain.setValueAtTime(vol,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);osc.start(ctx.currentTime);osc.stop(ctx.currentTime+dur);}catch(e){}}
function playRoundEnd(){playBeep(880,0.3,0.4);setTimeout(function(){playBeep(1100,0.4,0.4);},200);}
function playFinish(){playBeep(880,0.2,0.5);setTimeout(function(){playBeep(1100,0.2,0.5);},200);setTimeout(function(){playBeep(1320,0.5,0.5);},400);}
async function requestWakeLock(){
  try{
    if('wakeLock' in navigator){
      wakeLock=await navigator.wakeLock.request('screen');
      // Reacquire if page becomes visible again
      document.addEventListener('visibilitychange',function(){
        if(document.visibilityState==='visible'&&(timerRunning||wuRunning)){
          requestWakeLock();
        }
      },{once:false});
    }
  }catch(e){}
}
function releaseWakeLock(){if(wakeLock){wakeLock.release();wakeLock=null;}}

function showTab(tab){
  ['list','favs','hs','ex','stats','statshs','ai'].forEach(function(t){var a=document.getElementById('nav-'+t);if(a)a.classList.remove('active');var b=document.getElementById('nav-'+t+'2');if(b)b.classList.remove('active');});
  if(tab==='list'){document.getElementById('nav-list').classList.add('active');pushHistory('screen-list');showScreen('screen-list');return;}
  var n1=document.getElementById('nav-'+tab);if(n1)n1.classList.add('active');
  var n2=document.getElementById('nav-'+tab+'2');if(n2)n2.classList.add('active');
  if(tab==='stats'){document.getElementById('fh-title').textContent='Dashboard';document.getElementById('fh-sub').textContent='Dein Fortschritt';document.getElementById('fh-list').innerHTML=renderDashboard();showScreen('screen-favs');return;}
  if(tab==='statshs'){
    var n1=document.getElementById('nav-statshs');if(n1)n1.classList.add('active');
    var n2=document.getElementById('nav-statshs2');if(n2)n2.classList.add('active');
    // Remove other actives
    ['list','ex','ai','favs'].forEach(function(t){
      var a=document.getElementById('nav-'+t);if(a)a.classList.remove('active');
      var b=document.getElementById('nav-'+t+'2');if(b)b.classList.remove('active');
    });
    document.getElementById('fh-title').textContent='Stats & Scores';
    document.getElementById('fh-sub').textContent='Fortschritt & Bestleistungen';
    // Combined dashboard + highscores
    var html = renderDashboard();
    html += '<div style="height:1px;background:var(--border);margin:16px 0;"></div>';
    html += '<div style="font-family:Barlow Condensed,sans-serif;font-size:15px;letter-spacing:2px;color:var(--muted);margin-bottom:10px;text-transform:uppercase;">Highscores</div>';
    var entries=Object.entries(highscores);
    if(!entries.length){
      html += '<div class="empty"><div class="ei">🏆</div><p>Noch keine Highscores.</p></div>';
    }else{
      html += entries.map(function(e){
        var w=allWods.find(function(x){return x.id===e[0];});
        return '<div class="hs-card" data-id="'+(w?e[0]:'')+'" onclick="'+(w?'openDetail(this.dataset.id)':'')+'">'
          +'<div class="hs-name">'+(w?w.name:'WOD #'+e[0])+'</div>'
          +'<div class="hs-row"><div class="hs-result">'+e[1].result+'</div><div class="hs-meta">'+e[1].date+'</div></div>'
          +(e[1].note?'<div class="hs-note">'+e[1].note+'</div>':'')
          +'</div>';
      }).join('');
    }
    document.getElementById('fh-list').innerHTML=html;
    showScreen('screen-favs');
    return;
  }
  if(tab==='ex'){document.getElementById('fh-title').textContent='Übungen';document.getElementById('fh-sub').textContent='';document.getElementById('fh-list').innerHTML=renderEx();showScreen('screen-favs');return;}
  var isFavs=tab==='favs';
  document.getElementById('fh-title').textContent=isFavs?'Favoriten':'Highscores';
  document.getElementById('fh-sub').textContent=isFavs?'Gespeicherte Workouts':'Bestleistungen';
  var c=document.getElementById('fh-list');
  if(isFavs){
    var fw=allWods.filter(function(w){return favs.has(w.id);});
    if(!fw.length){c.innerHTML='<div class="empty"><div class="ei">♡</div><p>Noch keine Favoriten.<br>Tippe ♡ bei einem Workout.</p></div>';return;}
    c.innerHTML=fw.map(function(w){return '<div class="hs-card" data-id="'+w.id+'" onclick="openDetail(this.dataset.id)"><div class="hs-name">'+w.name+'</div><div class="hs-row"><div style="display:flex;gap:6px;"><span class="badge b-'+w.typ+'">'+w.typ+'</span><span class="badge b-cat">'+w.kategorie+'</span></div><button style="background:none;border:none;color:var(--accent);font-size:18px;cursor:pointer;" onclick="event.stopPropagation();favs.delete(\''+w.id+'\');localStorage.setItem(\''+FAV_KEY+'\',JSON.stringify(Array.from(favs)));showTab(\'favs\')">♥</button></div>'+(highscores[w.id]?'<div style="font-size:12px;color:var(--accent);margin-top:6px;">🏆 '+highscores[w.id].result+'</div>':'')+'</div>';}).join('');
  }else{
    var entries=Object.entries(highscores);
    if(!entries.length){c.innerHTML='<div class="empty"><div class="ei">🏆</div><p>Noch keine Highscores.<br>Starte ein Workout!</p></div>';return;}
    c.innerHTML=entries.map(function(e){var w=allWods.find(function(x){return x.id===e[0];});return '<div class="hs-card"'+(w?' data-id="'+e[0]+'" onclick="openDetail(this.dataset.id)"':'')+'><div class="hs-name">'+(w?w.name:'WOD #'+e[0])+'</div><div class="hs-row"><div class="hs-result">'+e[1].result+'</div><div class="hs-meta">'+e[1].date+'</div></div>'+(e[1].note?'<div class="hs-note">'+e[1].note+'</div>':'')+'</div>';}).join('');
  }
  showScreen('screen-favs');
}

function renderDashboard(){
  var total=Object.values(wodHistory).reduce(function(s,e){return s+e.length;},0);
  var now=Date.now();
  var week=Object.values(wodHistory).reduce(function(s,e){return s+e.filter(function(x){return now-x.ts<7*24*60*60*1000;}).length;},0);
  var month=Object.values(wodHistory).reduce(function(s,e){return s+e.filter(function(x){return now-x.ts<30*24*60*60*1000;}).length;},0);
  var tc={};Object.keys(wodHistory).forEach(function(id){var w=allWods.find(function(x){return x.id===id;});if(w)tc[w.typ]=(tc[w.typ]||0)+(wodHistory[id]||[]).length;});
  var ft=Object.entries(tc).sort(function(a,b){return b[1]-a[1];})[0];
  var md=Object.entries(wodHistory).sort(function(a,b){return b[1].length-a[1].length;})[0];
  var mn=md?(allWods.find(function(w){return w.id===md[0];})||{}).name||'–':'–';
  var recent=getRecentWods();
  var recentIds=new Set(recent.map(function(w){return w.id;}));
  var atypes=['ForTime','AMRAP','EMOM','Tabata'];
  var rt=recent.map(function(w){return w.typ;});
  var lu=atypes.filter(function(t){return rt.indexOf(t)<0;});
  var tt=lu.length?lu[Math.floor(Math.random()*lu.length)]:atypes[Math.floor(Math.random()*atypes.length)];
  var cands=allWods.filter(function(w){return w.typ===tt&&!recentIds.has(w.id);});
  if(!cands.length)cands=allWods.filter(function(w){return !recentIds.has(w.id);});
  if(!cands.length)cands=allWods;
  var today=cands[Math.floor(Math.random()*cands.length)];
  var html='<div class="stat-grid">'
    +'<div class="stat-card"><div class="stat-num">'+week+'</div><div class="stat-label">Diese Woche</div></div>'
    +'<div class="stat-card"><div class="stat-num">'+month+'</div><div class="stat-label">Dieser Monat</div></div>'
    +'<div class="stat-card"><div class="stat-num">'+total+'</div><div class="stat-label">Total WODs</div></div>'
    +'<div class="stat-card"><div class="stat-num" style="font-size:22px;padding-top:8px;">'+(ft?ft[0]:'–')+'</div><div class="stat-label">Lieblingstyp</div></div>'
    +'</div>';
  if(md){html+='<div class="hs-card" style="margin-bottom:16px;"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;font-weight:600;">Meistgemachtes WOD</div><div class="hs-name">'+mn+'</div><div style="font-size:12px;color:var(--muted);margin-top:4px;">'+md[1].length+'× gemacht</div></div>';}
  html+='<div class="today-card" data-id="'+today.id+'" onclick="openDetail(this.dataset.id)"><div class="today-tag">⚡ Empfohlen für heute</div><div class="hs-name">'+today.name+'</div><div class="card-badges" style="margin-top:8px;"><span class="badge b-'+today.typ+'">'+today.typ+'</span><span class="badge b-'+today.schwierigkeit+'">'+today.schwierigkeit+'</span></div></div>';
  if(recent.length){
    html+='<div class="sec-title" style="margin-top:8px;">Zuletzt gemacht</div>';
    html+=recent.map(function(w){var last=wodHistory[w.id]&&wodHistory[w.id][0];return '<div class="hs-card" data-id="'+w.id+'" onclick="openDetail(this.dataset.id)"><div class="hs-name">'+w.name+'</div><div class="hs-row"><span class="badge b-'+w.typ+'">'+w.typ+'</span>'+(last?'<span style="font-size:12px;color:var(--muted);">'+last.date+' · '+last.result+'</span>':'')+'</div></div>';}).join('');
  }
  return html;
}

function renderEx(){
  var exercises=getAllEx();
  if(exFilter!=='all')exercises=exercises.filter(function(e){return e.category===exFilter;});
  var cats={};exercises.forEach(function(e){if(!cats[e.category])cats[e.category]=[];cats[e.category].push(e);});
  var cc={'Barbell':'#f97316','Kettlebell':'#22c55e','Dumbbell':'#3b82f6','Bodyweight':'#8b5cf6','Gymnastics':'#f59e0b','Rower':'#ec4899'};
  var html='<div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;flex-shrink:0;">';
  ['all','Barbell','Kettlebell','Dumbbell','Bodyweight','Gymnastics','Rower'].forEach(function(f){html+='<div class="chip'+(exFilter===f?' active':'')+'" onclick="exFilter=\''+f+'\';document.getElementById(\'fh-list\').innerHTML=renderEx()" style="flex-shrink:0;">'+(f==='all'?'Alle':f)+'</div>';});
  html+='</div>';
  document.getElementById('fh-sub').textContent=exercises.length+' Übungen';
  Object.entries(cats).forEach(function(entry){
    var cat=entry[0],exs=entry[1];
    html+='<div style="font-family:Barlow Condensed,sans-serif;font-size:14px;font-weight:700;letter-spacing:3px;color:'+(cc[cat]||'#777')+';margin:16px 0 8px;text-transform:uppercase;">'+cat+' ('+exs.length+')</div>';
    exs.forEach(function(e){
      var wl=e.wods.filter(function(v,i,a){return a.indexOf(v)===i;}).slice(0,3).join(', ');
      html+='<div class="hs-card" data-exname="'+e.name.replace(/"/g,'&quot;')+'" onclick="filterByEx(this)" style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-family:Barlow Condensed,sans-serif;font-size:18px;font-weight:700;text-transform:uppercase;">'+e.name+'</div><div style="background:'+(cc[cat]||'#333')+';color:#000;border-radius:6px;padding:2px 10px;font-size:11px;font-weight:700;">'+e.count+'×</div></div><div style="font-size:12px;color:var(--muted);margin-top:4px;">'+wl+(e.count>3?' +'+(e.count-3):'')+'</div></div>';
    });
  });
  return html;
}
function filterByEx(el){document.getElementById('search-input').value=el.getAttribute('data-exname');showTab('list');renderList();}
function getAllEx(){
  var map={};
  allWods.forEach(function(w){(w.uebungen||'').split(',').map(function(e){return e.trim();}).filter(Boolean).forEach(function(ex){var k=ex.toLowerCase();if(!map[k])map[k]={name:ex,category:classifyEx(ex),wods:[],count:0};map[k].wods.push(w.name);map[k].count++;});});
  return Object.values(map).sort(function(a,b){return b.count-a.count;});
}
function classifyEx(name){
  var n=name.toLowerCase();
  if(['row','cal row','ski erg','assault bike'].some(function(k){return n.indexOf(k)>=0;}))return'Rower';
  if(['kettlebell','kb ','swing','goblet','gorilla'].some(function(k){return n.indexOf(k)>=0;}))return'Kettlebell';
  if(['dumbbell','db '].some(function(k){return n.indexOf(k)>=0;}))return'Dumbbell';
  if(['deadlift','clean','snatch','squat','thruster','press','jerk'].some(function(k){return n.indexOf(k)>=0;}))return'Barbell';
  if(['pull-up','push-up','muscle-up','handstand','toes-to-bar','t2b','ring','rope','burpee','sit-up','v-up','hollow','l-sit','wall walk','dip'].some(function(k){return n.indexOf(k)>=0;}))return'Gymnastics';
  return'Bodyweight';
}

function openAddScreen(){
  pushHistory('screen-add');
  editingWodId=null;document.getElementById('add-title').textContent='WOD hinzufügen';document.getElementById('add-delete-btn').style.display='none';
  ['name','beschreibung','uebungen','equipment','dauer','runden','reps','gewicht','skal-leicht','skal-schwer'].forEach(function(id){var el=document.getElementById('add-'+id);if(el)el.value='';});
  document.getElementById('add-kategorie').value='Eigenes WOD';document.getElementById('add-typ').value='ForTime';document.getElementById('add-schwierigkeit').value='Intermediate';
  showScreen('screen-add');
}
function editWod(){
  if(!currentWod){showToast('Kein Workout ausgewählt');return;}
  editingWodId = currentWod.id;
  var w = currentWod;
  document.getElementById('add-title').textContent = 'WOD bearbeiten';
  document.getElementById('add-delete-btn').style.display = 'block';
  document.getElementById('add-name').value = w.name||'';
  document.getElementById('add-kategorie').value = w.kategorie||'Eigenes WOD';
  document.getElementById('add-typ').value = w.typ||'ForTime';
  document.getElementById('add-schwierigkeit').value = w.schwierigkeit||'Intermediate';
  document.getElementById('add-beschreibung').value = w.beschreibung||'';
  document.getElementById('add-uebungen').value = w.uebungen||'';
  document.getElementById('add-equipment').value = w.equipment||'';
  document.getElementById('add-dauer').value = w.dauer||'';
  document.getElementById('add-runden').value = w.runden||'';
  document.getElementById('add-reps').value = w.reps||'';
  document.getElementById('add-gewicht').value = w.gewicht||'';
  document.getElementById('add-skal-leicht').value = w.skal_leicht||'';
  document.getElementById('add-skal-schwer').value = w.skal_schwer||'';
  showScreen('screen-add');
}
function saveWod(){
  var name=document.getElementById('add-name').value.trim();if(!name){showToast('Name ist Pflichtfeld');return;}
  var wod={id:editingWodId||'custom_'+Date.now(),name:name,kategorie:document.getElementById('add-kategorie').value,typ:document.getElementById('add-typ').value,schwierigkeit:document.getElementById('add-schwierigkeit').value,beschreibung:document.getElementById('add-beschreibung').value.trim(),uebungen:document.getElementById('add-uebungen').value.trim(),equipment:document.getElementById('add-equipment').value.trim(),dauer:document.getElementById('add-dauer').value.trim(),runden:document.getElementById('add-runden').value.trim(),reps:document.getElementById('add-reps').value.trim(),gewicht:document.getElementById('add-gewicht').value.trim(),skal_leicht:document.getElementById('add-skal-leicht').value.trim(),skal_schwer:document.getElementById('add-skal-schwer').value.trim(),quelle:'Eigene Eingabe'};
  if(editingWodId){var idx=allWods.findIndex(function(w){return w.id===editingWodId;});if(idx>=0){allWods[idx]=wod;currentWod=wod;}}else allWods.push(wod);
  saveCustomWods();renderList();showToast(editingWodId?'Aktualisiert!':'Hinzugefügt!');
  if(editingWodId){showScreen('screen-detail');openDetail(editingWodId);}else showScreen('screen-list');
}
function deleteWod(){if(!editingWodId||!confirm('Workout löschen?'))return;allWods=allWods.filter(function(w){return w.id!==editingWodId;});saveCustomWods();renderList();showToast('Gelöscht');showScreen('screen-list');}
function closeAddScreen(){showScreen(editingWodId?'screen-detail':'screen-list');}

function saveTimerSettings(){
  timerSettings.tabataWork=parseInt(document.getElementById('cfg-tabata-work').value)||20;timerSettings.tabataRest=parseInt(document.getElementById('cfg-tabata-rest').value)||10;timerSettings.emomInterval=parseInt(document.getElementById('cfg-emom-interval').value)||60;timerSettings.countdownWarn=parseInt(document.getElementById('cfg-countdown-warn').value)||10;
  localStorage.setItem(TIMER_SETTINGS_KEY,JSON.stringify(timerSettings));showToast('Timer gespeichert!');
}
function loadTimerSettingsUI(){
  document.getElementById('cfg-tabata-work').value=timerSettings.tabataWork;document.getElementById('cfg-tabata-rest').value=timerSettings.tabataRest;document.getElementById('cfg-emom-interval').value=timerSettings.emomInterval;document.getElementById('cfg-countdown-warn').value=timerSettings.countdownWarn;
  var ck=document.getElementById('cfg-claude-key');if(ck)ck.value=localStorage.getItem(CLAUDE_KEY_KEY)||'';
  var nt=document.getElementById('cfg-netlify-token');if(nt)nt.value=localStorage.getItem(NETLIFY_TOKEN_KEY)||'';
  var ns=document.getElementById('cfg-netlify-site');if(ns)ns.value=localStorage.getItem(NETLIFY_SITE_KEY)||'';
}
function saveApiSettings(){
  var ck=(document.getElementById('cfg-claude-key')||{value:''}).value.trim();
  var nt=(document.getElementById('cfg-netlify-token')||{value:''}).value.trim();
  var ns=(document.getElementById('cfg-netlify-site')||{value:''}).value.trim();
  if(ck)localStorage.setItem(CLAUDE_KEY_KEY,ck);else localStorage.removeItem(CLAUDE_KEY_KEY);
  if(nt)localStorage.setItem(NETLIFY_TOKEN_KEY,nt);else localStorage.removeItem(NETLIFY_TOKEN_KEY);
  if(ns)localStorage.setItem(NETLIFY_SITE_KEY,ns);else localStorage.removeItem(NETLIFY_SITE_KEY);
  showToast('API-Einstellungen gespeichert!');
}

async function deployToNetlify(){
  var token=localStorage.getItem(NETLIFY_TOKEN_KEY)||'';
  var siteId=localStorage.getItem(NETLIFY_SITE_KEY)||'';
  if(!token||!siteId){showToast('Netlify-Token & Site-ID in Einstellungen eintragen');return;}
  var NETLIFY_TOKEN=token,NETLIFY_SITE_ID=siteId;
  var btn=document.getElementById('deploy-btn'),status=document.getElementById('deploy-status');
  btn.textContent='Wird hochgeladen...';btn.disabled=true;
  try{
    var html=document.documentElement.outerHTML;var data=new TextEncoder().encode(html);
    var hb=await crypto.subtle.digest('SHA-1',data);var sha1=Array.from(new Uint8Array(hb)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
    status.textContent='Deploy erstellen...';
    var dr=await fetch('https://api.netlify.com/api/v1/sites/'+NETLIFY_SITE_ID+'/deploys',{method:'POST',headers:{'Authorization':'Bearer '+NETLIFY_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({files:{'/index.html':sha1}})});
    if(!dr.ok)throw new Error(dr.status);var deploy=await dr.json();
    status.textContent='Hochladen...';
    var ur=await fetch('https://api.netlify.com/api/v1/deploys/'+deploy.id+'/files/index.html',{method:'PUT',headers:{'Authorization':'Bearer '+NETLIFY_TOKEN,'Content-Type':'application/octet-stream'},body:data});
    if(!ur.ok)throw new Error(ur.status);
    status.textContent='Aktivieren...';
    for(var i=0;i<20;i++){await new Promise(function(r){setTimeout(r,2000);});var cr=await fetch('https://api.netlify.com/api/v1/deploys/'+deploy.id,{headers:{'Authorization':'Bearer '+NETLIFY_TOKEN}});var d=await cr.json();if(d.state==='ready'){btn.textContent='✅ Live!';btn.style.background='var(--success)';status.textContent=d.deploy_ssl_url;setTimeout(function(){btn.textContent='🚀 Jetzt deployen';btn.style.background='var(--accent)';btn.disabled=false;status.textContent='';},5000);return;}if(d.state==='error')throw new Error('Deploy error');}
    throw new Error('Timeout');
  }catch(e){btn.textContent='Fehler';btn.style.background='var(--danger)';btn.disabled=false;status.textContent=e.message;setTimeout(function(){btn.textContent='🚀 Jetzt deployen';btn.style.background='var(--accent)';},4000);}
}

function clearData(){if(!confirm('Alle Daten löschen?'))return;[HS_KEY,FAV_KEY,CUSTOM_KEY,HISTORY_KEY,TIMER_SETTINGS_KEY].forEach(function(k){localStorage.removeItem(k);});highscores={};favs=new Set();wodHistory={};loadCustomWods();renderList();showToast('Daten gelöscht');}

// ─── WARMUP ──────────────────────────────────────────────────────────────
var WARMUP_ROUTINES = {
  'Barbell': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'Hip Hinge',desc:'Langsam vorwärts beugen, Rücken gerade halten',sek:30},
    {name:'Shoulder Circles',desc:'Große Kreise mit beiden Armen',sek:30},
    {name:'Air Squats',desc:'Tief in die Knie, Brust hoch',sek:40},
    {name:'Inchworms',desc:'Hände zum Boden, langsam vorwärts laufen',sek:40},
    {name:'Barbell PVC Pass-Through',desc:'Leichte Stange über den Kopf, Hüfte öffnen',sek:40}
  ],
  'Kettlebell': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'Hip Circles',desc:'Hüfte in großen Kreisen drehen',sek:30},
    {name:'Arm Circles',desc:'Große Kreise mit beiden Armen',sek:30},
    {name:'Goblet Squat Hold',desc:'Knie halten, Hüfte öffnen – 3 Sek halten',sek:40},
    {name:'Good Mornings',desc:'Hände am Hinterkopf, Rücken gerade vorwärts',sek:40},
    {name:'KB Halos',desc:'Kettlebell langsam um den Kopf kreisen',sek:40}
  ],
  'Bodyweight': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'High Knees',desc:'Knie hoch ziehen, schnelles Tempo',sek:40},
    {name:'Leg Swings',desc:'Bein vor und zurück schwingen, je Seite',sek:30},
    {name:'World Greatest Stretch',desc:'Großer Ausfallschritt, Ellbogen zum Boden',sek:40},
    {name:'Burpees',desc:'Langsames Tempo – Körper aufwärmen',sek:40},
    {name:'Dynamic Plank',desc:'Plank rein und raus, Hüfte bewegen',sek:30}
  ],
  'Gymnastics': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'Arm Circles',desc:'Große Kreise, dann umgekehrt',sek:30},
    {name:'Wrist Circles',desc:'Handgelenke lockern – beide Richtungen',sek:30},
    {name:'Hollow Body Hold',desc:'Rücken flach, Beine und Arme heben',sek:30},
    {name:'Burpees',desc:'Fließende Bewegung, Körper aufwärmen',sek:40},
    {name:'Scapular Pull-ups',desc:'Schulterblätter zusammenziehen am Reck',sek:40}
  ],
  'Rower': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'Hip Hinge',desc:'Vorwärts beugen, Rücken gerade',sek:30},
    {name:'Torso Rotation',desc:'Oberkörper links und rechts drehen',sek:30},
    {name:'Leg Swings',desc:'Bein vor und zurück schwingen',sek:30},
    {name:'Easy Row',desc:'Sehr leichtes Rudern – Technik einüben',sek:60},
    {name:'Burpees',desc:'Körper aufwärmen, Puls erhöhen',sek:40}
  ],
  'Default': [
    {name:'Jumping Jacks',desc:'Arme und Beine gleichzeitig spreizen',sek:40},
    {name:'High Knees',desc:'Knie hoch ziehen, schnelles Tempo',sek:40},
    {name:'Burpees',desc:'Langsam und kontrolliert – Körper aufwärmen',sek:40},
    {name:'Leg Swings',desc:'Bein vor und zurück schwingen, je Seite',sek:30},
    {name:'Arm Circles',desc:'Große Kreise mit beiden Armen',sek:30},
    {name:'Air Squats',desc:'Tief in die Knie, Brust hoch',sek:40}
  ]
};

var wuExercises = [];
var wuCurrentIdx = 0;
var wuElapsed = 0;
var wuInterval = null;
var wuRunning = false;

function getWarmupRoutine(wod) {
  var eq = (wod.equipment||'').toLowerCase();
  if(eq.indexOf('barbell')>=0) return WARMUP_ROUTINES['Barbell'];
  if(eq.indexOf('kettlebell')>=0) return WARMUP_ROUTINES['Kettlebell'];
  if(eq.indexOf('rower')>=0||eq.indexOf('row')>=0) return WARMUP_ROUTINES['Rower'];
  if(wod.typ==='Tabata'||eq.indexOf('bodyweight')>=0||eq==='') return WARMUP_ROUTINES['Bodyweight'];
  if(wod.kategorie==='Girl WOD'||wod.kategorie==='Hero WOD') return WARMUP_ROUTINES['Gymnastics'];
  return WARMUP_ROUTINES['Default'];
}

function startWarmup() {
  if(!currentWod) return;
  wuExercises = getWarmupRoutine(currentWod);
  wuCurrentIdx = 0;
  wuRunning = false;
  clearInterval(wuInterval);
  document.getElementById('wu-subtitle').textContent = 'Vor: ' + currentWod.name;
  showWarmupExercise();
  requestWakeLock();
  showScreen('screen-warmup');
}

var wuInRest = false;

function startWarmupRest() {
  wuInRest = true;
  wuElapsed = 15;
  wuRunning = true;
  document.getElementById('wu-exercise-name').textContent = 'PAUSE';
  document.getElementById('wu-exercise-desc').textContent = 'Kurze Pause – nächste Übung gleich';
  document.getElementById('wu-time').textContent = 15;
  document.getElementById('wu-play-btn').textContent = '⏭ Überspringen';
  var ring = document.getElementById('wu-ring');
  ring.style.borderColor = 'var(--border)';
  ring.style.boxShadow = 'none';
  // Update next preview
  var next = wuExercises[wuCurrentIdx];
  document.getElementById('wu-next').textContent = next ? 'Nächste: ' + next.name : '🏁 Danach startet der WOD!';
  wuInterval = setInterval(function() {
    wuElapsed--;
    document.getElementById('wu-time').textContent = wuElapsed;
    if(wuElapsed <= 3 && wuElapsed > 0) playBeep(440, 0.1, 0.15);
    if(wuElapsed <= 0) {
      clearInterval(wuInterval);
      wuInRest = false;
      showWarmupExercise();
      // Auto-start
      setTimeout(function() {
        wuRunning = true;
        document.getElementById('wu-play-btn').textContent = '⏸ PAUSE';
        wuInterval = setInterval(tickWarmup, 1000);
      }, 500);
    }
  }, 1000);
}

function showWarmupExercise() {
  wuInRest = false;
  var ex = wuExercises[wuCurrentIdx];
  if(!ex) { finishWarmup(); return; }
  wuElapsed = ex.sek;
  document.getElementById('wu-exercise-num').textContent = 'Übung ' + (wuCurrentIdx+1) + ' von ' + wuExercises.length;
  document.getElementById('wu-exercise-name').textContent = ex.name;
  document.getElementById('wu-exercise-desc').textContent = ex.desc;
  document.getElementById('wu-time').textContent = ex.sek;
  document.getElementById('wu-play-btn').textContent = '▶ START';
  wuRunning = false;
  clearInterval(wuInterval);
  // Progress bar
  var pct = (wuCurrentIdx / wuExercises.length) * 100;
  document.getElementById('wu-progress').style.width = pct + '%';
  // Next exercise
  var next = wuExercises[wuCurrentIdx+1];
  document.getElementById('wu-next').textContent = next ? 'Nächste: ' + next.name : '🏁 Danach startet der WOD!';
  // Exercise dots
  var dots = wuExercises.map(function(e,i) {
    var active = i === wuCurrentIdx;
    var done = i < wuCurrentIdx;
    return '<div style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+(done?'var(--success)':active?'var(--accent)':'var(--border)')+'"></div>';
  }).join('');
  document.getElementById('wu-exercise-list').innerHTML = dots;
  // Ring color
  var ring = document.getElementById('wu-ring');
  ring.style.borderColor = 'var(--border)';
  ring.style.boxShadow = '0 0 30px var(--accent-glow2)';
}

function toggleWarmupTimer() {
  if(wuInRest) {
    // Skip rest immediately
    clearInterval(wuInterval);
    wuInRest = false;
    showWarmupExercise();
    setTimeout(function() {
      wuRunning = true;
      document.getElementById('wu-play-btn').textContent = '⏸ PAUSE';
      wuInterval = setInterval(tickWarmup, 1000);
    }, 300);
    return;
  }
  wuRunning = !wuRunning;
  document.getElementById('wu-play-btn').textContent = wuRunning ? '⏸ PAUSE' : '▶ WEITER';
  if(wuRunning) {
    wuInterval = setInterval(tickWarmup, 1000);
  } else {
    clearInterval(wuInterval);
  }
}

function tickWarmup() {
  wuElapsed--;
  document.getElementById('wu-time').textContent = wuElapsed;
  // Warning in last 3 sek
  if(wuElapsed <= 3 && wuElapsed > 0) {
    playBeep(660, 0.1, 0.2);
    document.getElementById('wu-ring').style.borderColor = 'var(--accent)';
    document.getElementById('wu-ring').style.boxShadow = '0 0 30px var(--accent-glow)';
  }
  if(wuElapsed <= 0) {
    playRoundEnd();
    wuCurrentIdx++;
    if(wuCurrentIdx >= wuExercises.length) {
      finishWarmup();
    } else {
      showWarmupExercise();
      // Start REST phase between exercises
      startWarmupRest();
    }
  }
}

function skipWarmupExercise() {
  clearInterval(wuInterval);
  wuRunning = false;
  wuCurrentIdx++;
  if(wuCurrentIdx >= wuExercises.length) finishWarmup();
  else showWarmupExercise();
}

function skipWarmup() {
  clearInterval(wuInterval);
  wuRunning = false;
  startTimer();
}

function finishWarmup() {
  clearInterval(wuInterval);
  wuRunning = false;
  document.getElementById('wu-progress').style.width = '100%';
  document.getElementById('wu-exercise-num').textContent = 'Aufwärmen abgeschlossen ✓';
  document.getElementById('wu-exercise-name').textContent = 'BEREIT?';
  document.getElementById('wu-exercise-desc').textContent = 'Equipment bereitstellen und WOD-Start bestätigen.';
  document.getElementById('wu-time').textContent = '✓';
  document.getElementById('wu-next').textContent = currentWod ? currentWod.name : '';
  document.getElementById('wu-ring').style.borderColor = 'var(--success)';
  document.getElementById('wu-ring').style.boxShadow = '0 0 30px rgba(34,197,94,.3)';
  document.getElementById('wu-time').style.color = 'var(--success)';
  document.getElementById('wu-play-btn').textContent = '🏋️ WOD STARTEN';
  document.getElementById('wu-play-btn').onclick = function() { startTimer(); };
  playFinish();
}


// ─── EXPORT / IMPORT ─────────────────────────────────────────────────────
function exportData(){
  var data = {
    version: '2.0',
    exportDate: new Date().toLocaleDateString('de-DE'),
    highscores: highscores,
    favs: Array.from(favs),
    wodHistory: wodHistory,
    timerSettings: timerSettings,
    customWods: JSON.parse(localStorage.getItem(CUSTOM_KEY)||'[]')
  };
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], {type:'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'wod-tracker-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ Backup exportiert!');
}

function importData(){
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e){
    var file = e.target.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(ev){
      try{
        var data = JSON.parse(ev.target.result);
        if(!data.version) throw new Error('Ungültiges Format');
        if(!confirm('Alle bestehenden Daten werden überschrieben. Fortfahren?')) return;
        // Restore all data
        if(data.highscores){highscores=data.highscores;localStorage.setItem(HS_KEY,JSON.stringify(highscores));}
        if(data.favs){favs=new Set(data.favs);localStorage.setItem(FAV_KEY,JSON.stringify(data.favs));}
        if(data.wodHistory){wodHistory=data.wodHistory;localStorage.setItem(HISTORY_KEY,JSON.stringify(wodHistory));}
        if(data.timerSettings){timerSettings=Object.assign(timerSettings,data.timerSettings);localStorage.setItem(TIMER_SETTINGS_KEY,JSON.stringify(timerSettings));}
        if(data.customWods){localStorage.setItem(CUSTOM_KEY,JSON.stringify(data.customWods));}
        loadCustomWods();
        renderList();
        showToast('✅ Backup importiert! ' + (data.exportDate||''));
      }catch(e){
        showToast('❌ Fehler: ' + e.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}


// ─── FILTER SHEET ─────────────────────────────────────────────────────────
function openFilterSheet(){
  document.getElementById('filter-overlay').style.display='block';
  document.getElementById('filter-sheet').style.display='block';
  syncFilterChips();
}
function closeFilterSheet(){
  document.getElementById('filter-overlay').style.display='none';
  document.getElementById('filter-sheet').style.display='none';
  renderList();
  updateFilterBtn();
}
function syncFilterChips(){
  // Sync multi-select filters
  ['type','cat','dur','diff'].forEach(function(g){
    var map={'type':filterType,'cat':filterCat,'dur':filterDur,'diff':filterDiff};
    var set=map[g];
    document.querySelectorAll('[data-g="'+g+'"]').forEach(function(c){
      var v=c.getAttribute('data-v');
      if(v==='all') c.classList.toggle('active',set.size===0);
      else c.classList.toggle('active',set.has(v));
    });
  });
  // Sync eq include
  document.querySelectorAll('.eq-inc').forEach(function(c){
    var v=c.getAttribute('data-v');
    c.classList.toggle('active',v==='all'?filterEq.size===0:filterEq.has(v));
  });
  // Sync eq exclude
  document.querySelectorAll('.fchip-exc').forEach(function(c){
    c.classList.toggle('active',filterExcEq.has(c.getAttribute('data-v')));
  });
}
function setFFilter(g,v,el){
  var map={'type':filterType,'cat':filterCat,'dur':filterDur,'diff':filterDiff};
  var set=map[g];
  if(!set)return;
  if(v==='all'){
    set.clear();
  }else{
    if(set.has(v))set.delete(v);
    else set.add(v);
  }
  // Update chips
  document.querySelectorAll('[data-g="'+g+'"]').forEach(function(c){
    var cv=c.getAttribute('data-v');
    if(cv==='all') c.classList.toggle('active',set.size===0);
    else c.classList.toggle('active',set.has(cv));
  });
}
function toggleIncEq(v,el){
  if(v==='all'){
    filterEq=new Set();
    document.querySelectorAll('.eq-inc').forEach(function(c){c.classList.remove('active');});
    el.classList.add('active');
  }else{
    document.querySelector('.eq-inc[data-v="all"]').classList.remove('active');
    if(filterEq.has(v)){filterEq.delete(v);el.classList.remove('active');if(filterEq.size===0)document.querySelector('.eq-inc[data-v="all"]').classList.add('active');}
    else{filterEq.add(v);el.classList.add('active');}
  }
}
function toggleExcEq(v,el){
  if(filterExcEq.has(v)){filterExcEq.delete(v);el.classList.remove('active');}
  else{filterExcEq.add(v);el.classList.add('active');}
}
function resetFilters(){
  filterType=new Set();filterCat=new Set();filterDur=new Set();filterDiff=new Set();
  filterEq=new Set();filterExcEq=new Set();
  syncFilterChips();
}
function updateFilterBtn(){
  var parts=[];
  if(filterType.size>0)parts.push(Array.from(filterType).join('/'));
  if(filterCat.size>0)parts.push(filterCat.size+' Kat.');
  if(filterDiff.size>0)parts.push(Array.from(filterDiff).join('/'));
  if(filterDur.size>0)parts.push('≤'+Math.max.apply(null,Array.from(filterDur).map(Number))+'m');
  if(filterEq.size>0)parts.push('+'+filterEq.size+' Equip.');
  if(filterExcEq.size>0)parts.push('-'+filterExcEq.size+' excl.');
  var resetBtn=document.getElementById('reset-filters-btn');
  if(resetBtn)resetBtn.style.display=parts.length?'block':'none';
  var summary=document.getElementById('filter-summary');
  var btn=document.getElementById('filter-btn');
  if(parts.length>0){
    if(summary)summary.textContent=parts.join(' · ');
    if(btn)btn.style.borderColor='var(--accent)';
  }else{
    if(summary)summary.textContent='';
    if(btn)btn.style.borderColor='var(--border)';
  }
}




// ─── SMART COUNTER ────────────────────────────────────────────────────────
function renderSmartCounter(){
  if(!currentWod) return;
  var typ = currentWod.typ;
  var html = '';

  if(typ === 'AMRAP'){
    html += '<div style="display:flex;gap:6px;">';
    html += counterCard('Runden','rounds','var(--accent)','#000',true);
    html += counterCard('Reps','reps','var(--blue)','#fff',false);
    html += '</div>';
    html += '<button onclick="nextRound()" style="width:100%;margin-top:5px;padding:6px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text2);font-family:Inter,sans-serif;font-size:11px;font-weight:500;cursor:pointer;">✓ Runde abschliessen</button>';

  }else if(typ === 'ForTime'){
    html += '<div style="display:flex;gap:6px;">';
    html += counterCard('Runden','rounds','var(--accent)','#000',true);
    html += counterCard('Reps','reps','var(--blue)','#fff',false);
    html += '</div>';

  }else if(typ === 'EMOM'){
    // EMOM: nur Reps pro Minute zählen
    html += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:8px;">';
    html += '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:6px;text-align:center;">Reps diese Minute</div>';
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:12px;">';
    html += '<button data-key="reps" data-delta="-1" onclick="adjCounterBtn(this)" style="width:40px;height:40px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--danger);font-size:20px;cursor:pointer;">−</button>';
    html += '<div id="counter-reps" style="font-family:Barlow Condensed,sans-serif;font-size:48px;font-weight:800;color:var(--blue);line-height:1;min-width:64px;text-align:center;">0</div>';
    html += '<button data-key="reps" data-delta="1" onclick="adjCounterBtn(this)" style="width:40px;height:40px;border-radius:50%;background:var(--blue);border:none;color:#fff;font-size:20px;cursor:pointer;font-weight:700;">+</button>';
    html += '</div>';
    html += '<div id="counter-rounds" style="display:none;">0</div>'; // hidden but needed
    html += '<button onclick="nextRound()" style="width:100%;margin-top:10px;padding:10px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text2);font-family:Inter,sans-serif;font-size:12px;font-weight:500;cursor:pointer;">→ Nächste Minute (Reps speichern)</button>';
    html += '</div>';

  }else if(typ === 'Tabata'){
    // Tabata: Reps pro Intervall
    html += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:8px;">';
    html += '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-bottom:6px;text-align:center;">Reps dieses Intervalls</div>';
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:12px;">';
    html += '<button data-key="reps" data-delta="-1" onclick="adjCounterBtn(this)" style="width:40px;height:40px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--danger);font-size:20px;cursor:pointer;">−</button>';
    html += '<div id="counter-reps" style="font-family:Barlow Condensed,sans-serif;font-size:48px;font-weight:800;color:#a29bfe;line-height:1;min-width:64px;text-align:center;">0</div>';
    html += '<button data-key="reps" data-delta="1" onclick="adjCounterBtn(this)" style="width:40px;height:40px;border-radius:50%;background:#a29bfe;border:none;color:#fff;font-size:20px;cursor:pointer;font-weight:700;">+</button>';
    html += '</div>';
    html += '<div id="counter-rounds" style="display:none;">0</div>';
    html += '</div>';
    html += '<div style="font-size:11px;color:var(--muted);text-align:center;">Intervalle werden automatisch gezählt</div>';
  }

  document.getElementById('smart-counter').innerHTML = html;
}

function counterCard(label, key, bg, color, showNext){
  var accentStyle = 'background:'+bg+';border:none;color:'+color+';';
  var val = counters[key]||0;
  return '<div style="flex:1;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:7px 8px;">'
    +'<div style="font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;font-weight:600;text-align:center;margin-bottom:3px;">'+label+'</div>'
    +'<div style="display:flex;align-items:center;justify-content:space-between;gap:5px;">'
    +'<button data-key="'+key+'" data-delta="-1" onclick="adjCounterBtn(this)" style="width:30px;height:30px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--danger);font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;">−</button>'
    +'<div id="counter-'+key+'" style="font-family:Barlow Condensed,sans-serif;font-size:32px;font-weight:800;color:'+bg+';line-height:1;text-align:center;flex:1;">'+val+'</div>'
    +'<button data-key="'+key+'" data-delta="1" onclick="adjCounterBtn(this)" style="width:30px;height:30px;border-radius:50%;'+accentStyle+'font-size:18px;cursor:pointer;font-weight:700;flex-shrink:0;display:flex;align-items:center;justify-content:center;">+</button>'
    +'</div>'
    +'</div>';
}

// WOD desc is always visible now
var wodDescOpen = false;
function toggleWodDesc(){}

function populateWodDesc(){
  if(!currentWod) return;
  var w = currentWod;
  var html = '';
  // Badges row
  html += '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;">';
  html += '<span class="badge b-'+w.typ+'">'+w.typ+'</span>';
  if(w.dauer) html += '<span class="badge b-cat">⏱ '+params.dauer+' Min</span>';
  if(params.runden) html += '<span class="badge b-cat">'+params.runden+' Runden</span>';
  if(params.gewicht) html += '<span class="badge b-cat">'+params.gewicht+' kg</span>';
  html += '</div>';
  // Description
  if(w.beschreibung) html += '<div style="font-size:11px;color:var(--text2);margin-bottom:5px;">'+w.beschreibung+'</div>';
  // Exercises inline
  if(w.uebungen){
    var exList = w.uebungen.split(',').map(function(e){return e.trim();}).filter(Boolean);
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px;">';
    exList.forEach(function(ex){
      html += '<span style="background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-size:10px;color:var(--text2);">'+ex+'</span>';
    });
    html += '</div>';
  }
  document.getElementById('wod-desc-full').innerHTML = html;
}

// ─── EXERCISE COUNTER TOGGLES ─────────────────────────────────────────────
function toggleExerciseCounters(){
  var el = document.getElementById('exercise-counters');
  var arrow = document.getElementById('exc-arrow');
  var open = el.style.display === 'none';
  el.style.display = open ? 'block' : 'none';
  arrow.textContent = open ? '▲' : '▼';
  if(open) renderExerciseCounters();
}
function toggleRoundHistory(){
  var el = document.getElementById('round-history');
  var arrow = document.getElementById('hist-arrow');
  var open = el.style.display === 'none';
  el.style.display = open ? 'block' : 'none';
  arrow.textContent = open ? '▲' : '▼';
  if(open) renderRoundHistory();
}

// ─── TIMER TABS (legacy) ───────────────────────────────────────────────────────────
var activeTimerTab = 'timer';
function switchTimerTab(tab){
  activeTimerTab = tab;
  ['timer','wod','count'].forEach(function(t){
    var view = document.getElementById('tview-'+t);
    var btn = document.getElementById('ttab-'+t);
    if(view) view.style.display = t===tab ? 'flex' : 'none';
    if(btn) btn.classList.toggle('active', t===tab);
  });
  if(tab==='wod') renderWodInTimer();
  if(tab==='count') renderExerciseCounters();
}

// ─── WORKOUT DISPLAY IN TIMER ─────────────────────────────────────────────
function renderWodInTimer(){
  if(!currentWod) return;
  var w = currentWod;
  var html = '<div style="font-family:Barlow Condensed,sans-serif;font-size:28px;font-weight:800;text-transform:uppercase;margin-bottom:12px;letter-spacing:1px;">'+w.name+'</div>';
  html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">';
  html += '<span class="badge b-'+w.typ+'">'+w.typ+'</span>';
  if(w.dauer) html += '<span class="badge b-cat">⏱ '+params.dauer+' Min</span>';
  if(params.runden) html += '<span class="badge b-cat">'+params.runden+' Runden</span>';
  if(params.gewicht) html += '<span class="badge b-cat">'+params.gewicht+' kg</span>';
  html += '</div>';
  if(w.beschreibung) html += '<div style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.6;">'+w.beschreibung+'</div>';
  // Exercises as checklist
  if(w.uebungen){
    html += '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:8px;">Übungen</div>';
    var exList = w.uebungen.split(',').map(function(e){return e.trim();}).filter(Boolean);
    exList.forEach(function(ex){
      html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">';
      html += '<div style="width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0;"></div>';
      html += '<div style="font-size:14px;font-weight:500;">'+ex+'</div>';
      html += '</div>';
    });
  }
  // Reps per exercise from params
  if(params.reps && params.reps.length){
    html += '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-weight:600;margin:14px 0 8px;">Reps Schema</div>';
    params.reps.forEach(function(r){
      html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">';
      html += '<span style="font-size:13px;color:var(--text2);">'+r.name+'</span>';
      html += '<span style="font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;color:var(--accent);">'+r.val+'</span>';
      html += '</div>';
    });
  }
  if(w.skal_leicht||w.skal_schwer){
    html += '<div style="display:flex;gap:10px;margin-top:14px;">';
    if(w.skal_leicht) html += '<div style="flex:1;background:var(--surface2);border-radius:var(--radius-sm);padding:10px;"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">Leichter</div><div style="font-size:12px;color:var(--text2);">'+w.skal_leicht+'</div></div>';
    if(w.skal_schwer) html += '<div style="flex:1;background:var(--surface2);border-radius:var(--radius-sm);padding:10px;"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">Schwerer</div><div style="font-size:12px;color:var(--text2);">'+w.skal_schwer+'</div></div>';
    html += '</div>';
  }
  document.getElementById('t-wod-content').innerHTML = html;
}

// ─── REP/ROUND COUNTER ────────────────────────────────────────────────────
var counters = {rounds:0, reps:0};
var exCounters = {};
var roundHistory = [];

function resetCounters(){
  counters = {rounds:0, reps:0};
  exCounters = {};
  roundHistory = [];
  updateCounterDisplay();
}

function adjCounterBtn(btn){
  adjCounter(btn.getAttribute('data-key'), parseInt(btn.getAttribute('data-delta')));
}
function adjCounter(key, delta){
  counters[key] = Math.max(0, (counters[key]||0) + delta);
  var el = document.getElementById('counter-'+key);
  if(el) el.textContent = counters[key]||0;
  renderRoundHistory();
}

function adjExCounter(btn){
  var name = btn.getAttribute('data-ex');
  var delta = parseInt(btn.getAttribute('data-delta'));
  exCounters[name] = Math.max(0, (exCounters[name]||0) + delta);
  var el = document.getElementById('exc-'+name.replace(/[^a-z0-9]/gi,'_'));
  if(el) el.textContent = exCounters[name]||0;
}

function nextRound(){
  var reps = counters.reps;
  roundHistory.push({round: counters.rounds+1, reps: reps, ex: Object.assign({},exCounters)});
  counters.rounds++;
  counters.reps = 0;
  // Reset exercise counters
  Object.keys(exCounters).forEach(function(k){exCounters[k]=0;});
  renderExerciseCounters();
  updateCounterDisplay();
  renderRoundHistory();
}

function updateCounterDisplay(){
  var r = document.getElementById('counter-rounds');
  var rp = document.getElementById('counter-reps');
  if(r) r.textContent = counters.rounds||0;
  if(rp) rp.textContent = counters.reps||0;
  renderRoundHistory();
}

function renderExerciseCounters(){
  if(!currentWod) return;
  var exList = (currentWod.uebungen||'').split(',').map(function(e){return e.trim();}).filter(Boolean);
  if(!exList.length) return;
  var html = '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;">';
  html += '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:10px;">Reps pro Übung</div>';
  exList.forEach(function(ex){
    var safeId = 'exc-'+ex.replace(/[^a-z0-9]/gi,'_');
    var val = exCounters[ex]||0;
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">';
    html += '<div style="font-size:13px;font-weight:500;flex:1;">'+ex+'</div>';
    html += '<div style="display:flex;align-items:center;gap:10px;">';
    var safeEx = ex.replace(/"/g,'&quot;');
    html += '<button onclick="adjExCounter(this)" data-ex="'+safeEx+'" data-delta="-1" style="width:32px;height:32px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--text);font-size:18px;cursor:pointer;">−</button>';
    html += '<span id="'+safeId+'" style="font-family:Barlow Condensed,sans-serif;font-size:28px;font-weight:700;color:var(--blue);min-width:36px;text-align:center;">'+val+'</span>';
    html += '<button onclick="adjExCounter(this)" data-ex="'+safeEx+'" data-delta="1" style="width:32px;height:32px;border-radius:50%;background:var(--blue);border:none;color:#fff;font-size:18px;cursor:pointer;">+</button>';
    html += '</div></div>';
  });
  html += '</div>';
  document.getElementById('exercise-counters').innerHTML = html;
}

function renderRoundHistory(){
  if(!roundHistory.length) return;
  var c = document.getElementById('round-history');
  if(!c) return;
  var html = '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:8px;">Verlauf</div>';
  roundHistory.slice().reverse().forEach(function(r){
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">';
    html += '<span style="font-size:12px;color:var(--muted);">Runde '+r.round+'</span>';
    html += '<span style="font-family:Barlow Condensed,sans-serif;font-size:18px;color:var(--accent);">'+r.reps+' Reps</span>';
    html += '</div>';
  });
  c.innerHTML = html;
}

function autoFillScore(){
  var parts = [];
  if(counters.rounds > 0) parts.push(counters.rounds+' Runden');
  if(counters.reps > 0) parts.push(counters.reps+' Reps');
  // Add round history summary
  if(roundHistory.length > 0){
    var totalReps = roundHistory.reduce(function(s,r){return s+r.reps;},0) + counters.reps;
    parts = [counters.rounds+' Runden + '+counters.reps+' Reps ('+totalReps+' total)'];
  }
  if(parts.length){
    document.getElementById('t-score').value = parts.join(' / ');
  }
}


// ─── BROWSER HISTORY API ──────────────────────────────────────────────────
function pushHistory(screen, data){
  try{
    var state = {screen: screen, data: data||null};
    history.pushState(state, '');
  }catch(e){}
}

window.addEventListener('popstate', function(e){
  var state = e.state;
  if(!state){
    // Back to list
    showScreen('screen-list');
    return;
  }
  if(state.screen === 'screen-post'){
    if(lastSavedWodId) showPostWorkout(lastSavedResult||'');
    else showTab('list');
  } else if(state.screen === 'screen-detail' && state.data){
    openDetail(state.data, true);
  } else if(state.screen === 'screen-list'){
    showScreen('screen-list');
  } else if(state.screen === 'screen-favs'){
    showScreen('screen-favs');
  } else if(state.screen === 'screen-config'){
    showScreen('screen-config');
  } else if(state.screen === 'screen-add'){
    showScreen('screen-add');
  } else {
    showScreen('screen-list');
  }
});


// ─── POST WORKOUT ─────────────────────────────────────────────────────────
var lastSavedWodId = null;
var lastSavedResult = null;

function showPostWorkout(result){
  lastSavedWodId = currentWod ? currentWod.id : null;
  lastSavedResult = result;
  var w = currentWod;
  document.getElementById('post-wod-name').textContent = w ? w.name : '';
  document.getElementById('post-result').textContent = result;
  // Show improvement vs previous best
  var hist = wodHistory[w.id]||[];
  if(hist.length > 1){
    document.getElementById('post-comparison').textContent = 'Vorheriges Ergebnis: ' + hist[1].result;
  } else {
    document.getElementById('post-comparison').textContent = 'Erstes Ergebnis gespeichert!';
  }
  // Animate emoji
  setTimeout(function(){
    var el = document.querySelector('#screen-post div:first-child div:first-child');
  }, 100);
  pushHistory('screen-post');
  showScreen('screen-post');
  // Confetti-like toast
  setTimeout(function(){ showToast('🏆 Gespeichert!'); }, 300);
}

function showPostDetail(){
  if(lastSavedWodId) openDetail(lastSavedWodId);
  else showTab('list');
}

function appendWorkout(){
  // Go back to list with filter preserved so user can pick next WOD
  showTab('list');
  showToast('💪 Wähle dein nächstes Workout!');
}


// ═══════════════════════════════════════════════════════════════════
// USER SYSTEM
// ═══════════════════════════════════════════════════════════════════
var USERS_KEY = 'wod_users';
var CURRENT_USER_KEY = 'wod_current_user';
var currentUser = null;

function loadUsers(){
  try{ return JSON.parse(localStorage.getItem(USERS_KEY)||'{}'); }catch(e){ return {}; }
}
function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getCurrentUser(){
  var uid = localStorage.getItem(CURRENT_USER_KEY);
  if(!uid) return null;
  var users = loadUsers();
  return users[uid]||null;
}
function registerUser(name, pin){
  if(!name||name.trim().length<2){ showToast('Name muss mind. 2 Zeichen haben'); return false; }
  var users = loadUsers();
  // Check if name exists
  var exists = Object.values(users).some(function(u){ return u.name.toLowerCase()===name.toLowerCase(); });
  if(exists){ showToast('Name bereits vergeben'); return false; }
  var uid = 'user_'+Date.now();
  users[uid] = {id:uid, name:name.trim(), pin:pin||'', created:new Date().toLocaleDateString('de-DE'), avatar:getAvatar(name)};
  saveUsers(users);
  switchUser(uid);
  return true;
}
function switchUser(uid){
  var users = loadUsers();
  if(!users[uid]) return;
  currentUser = users[uid];
  localStorage.setItem(CURRENT_USER_KEY, uid);
  // Load user-specific data
  HS_KEY = 'wod_hs_'+uid;
  FAV_KEY = 'wod_fav_'+uid;
  HISTORY_KEY = 'wod_history_'+uid;
  CUSTOM_KEY = 'wod_custom_'+uid;
  loadLocal();
  loadCustomWods();
  renderList();
  updateUserDisplay();
  showToast('👋 Hallo, '+currentUser.name+'!');
}
function getAvatar(name){
  var emojis = ['🦁','🐯','🦊','🐺','🦅','🐻','🦈','🦁','🐆','🦏'];
  var idx = name.charCodeAt(0) % emojis.length;
  return emojis[idx];
}
function updateUserDisplay(){
  var el = document.getElementById('user-display');
  if(el && currentUser) el.textContent = currentUser.avatar+' '+currentUser.name;
}
function deleteUser(uid){
  if(!confirm('Nutzer und alle Daten löschen?')) return;
  var users = loadUsers();
  delete users[uid];
  saveUsers(users);
  // Clear user data
  ['wod_hs_','wod_fav_','wod_history_','wod_custom_'].forEach(function(k){
    localStorage.removeItem(k+uid);
  });
  if(localStorage.getItem(CURRENT_USER_KEY)===uid){
    localStorage.removeItem(CURRENT_USER_KEY);
    currentUser = null;
  }
  renderUserScreen();
}

function showUserScreen(){
  renderUserScreen();
  pushHistory('screen-users');
  showScreen('screen-users');
}
function renderUserScreen(){
  var users = loadUsers();
  var list = document.getElementById('user-list');
  if(!list) return;
  var userArr = Object.values(users);
  if(!userArr.length){
    list.innerHTML = '<div class="empty"><div class="ei">👤</div><p>Noch keine Nutzer.<br>Erstelle einen neuen Nutzer!</p></div>';
    return;
  }
  list.innerHTML = userArr.map(function(u){
    var isActive = currentUser && currentUser.id===u.id;
    return '<div class="hs-card" style="'+(isActive?'border-color:var(--accent);':'')+'">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;">'
      +'<div style="display:flex;align-items:center;gap:12px;">'
      +'<div style="font-size:32px;">'+u.avatar+'</div>'
      +'<div><div style="font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;">'+u.name+'</div>'
      +'<div style="font-size:11px;color:var(--muted);">Seit '+u.created+(isActive?' · Aktiv':'')+'</div></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;">'
      +(isActive?'<span style="color:var(--accent);font-size:12px;font-weight:600;">✓ Aktiv</span>':
        '<button class="switch-user-btn" style="padding:6px 14px;background:var(--accent);border:none;border-radius:8px;color:#000;font-family:Barlow Condensed,sans-serif;font-size:14px;font-weight:700;cursor:pointer;">Wechseln</button>')
      +'<button class="delete-user-btn" style="padding:6px 10px;background:none;border:1px solid var(--border);border-radius:8px;color:var(--danger);font-size:14px;cursor:pointer;">🗑</button>'
      +'</div>'
      +'</div>'
      +'</div>';
  }).join('');
}
function checkPinAndSwitch(uid){
  var users = loadUsers();
  var u = users[uid];
  if(!u) return;
  if(u.pin){
    var entered = prompt('PIN für '+u.name+' eingeben:');
    if(entered !== u.pin){ showToast('Falscher PIN'); return; }
  }
  switchUser(uid);
  showScreen('screen-list');
}

// ═══════════════════════════════════════════════════════════════════
// KI-GENERIERTE WODS
// ═══════════════════════════════════════════════════════════════════
var AI_WOD_LOADING = false;

// AI filter state
var aiFilters = {type:'any', dur:'any', diff:'any'};
var aiEquipment = ['Kettlebell','Dumbbell','Pull-up Bar','Sandbag','Gewichtsweste','Bodyweight'];

function openRandomFromAi(){
  // Use AI filter settings for random pick
  var candidates = allWods.filter(function(w){
    var matchType = aiFilters.type==='any' || w.typ===aiFilters.type;
    var matchDiff = aiFilters.diff==='any' || w.schwierigkeit===aiFilters.diff;
    var matchDur = aiFilters.dur==='any' || !w.dauer || parseInt(w.dauer)<=parseInt(aiFilters.dur);
    var matchEq = aiEquipment.length===0 || aiEquipment.some(function(e){return (w.equipment||'').toLowerCase().indexOf(e.toLowerCase())>=0;});
    return matchType && matchDiff && matchDur && matchEq;
  });
  if(!candidates.length){ showToast('Keine Workouts mit diesen Filtern'); return; }
  var w = candidates[Math.floor(Math.random()*candidates.length)];
  openDetail(w.id);
  showToast('🎲 '+w.name);
}
function setAiFilter(g, v, el){
  if(g==='ai-type') aiFilters.type = v;
  if(g==='ai-dur') aiFilters.dur = v;
  if(g==='ai-diff') aiFilters.diff = v;
  document.querySelectorAll('[data-g="'+g+'"]').forEach(function(c){c.classList.remove('active');});
  el.classList.add('active');
}
function toggleAiEq(el){
  var eq = el.getAttribute('data-eq');
  if(el.classList.contains('active')){
    el.classList.remove('active');
    aiEquipment = aiEquipment.filter(function(e){return e!==eq;});
  } else {
    el.classList.add('active');
    if(aiEquipment.indexOf(eq)<0) aiEquipment.push(eq);
  }
}

async function generateAiWod(){
  if(AI_WOD_LOADING){ showToast('KI arbeitet noch...'); return; }
  AI_WOD_LOADING = true;
  var btn = document.getElementById('ai-wod-btn');
  if(btn){ btn.textContent='⏳ KI generiert...'; btn.disabled=true; }

  var recentWods = getRecentWods().slice(0,5).map(function(w){return w.name+' ('+w.typ+')';}).join(', ');
  var userEq = aiEquipment.length ? aiEquipment.join(', ') : 'Bodyweight';
  var focus = (document.getElementById('ai-focus')||{value:''}).value.trim();
  var typeStr = aiFilters.type==='any' ? 'AMRAP, EMOM, ForTime oder Tabata (wähle selbst)' : aiFilters.type;
  var durStr = aiFilters.dur==='any' ? 'beliebig' : aiFilters.dur+' Minuten';
  var diffStr = aiFilters.diff==='any' ? 'Intermediate' : aiFilters.diff;
  // Randomization seeds to prevent same output
  var seeds = [
    'Fokus auf Explosivität','Fokus auf Ausdauer','Viele kleine Sets','Wenige grosse Sets',
    'Ascending Reps','Descending Reps','Couplet','Triplet','Chipper','EMOM-Stil',
    'Klassisch CrossFit','Ungewöhnliche Kombination','Militär-inspiriert','Gymnastic-lastig',
    'Kraftausdauer','Metabolic Conditioning','Kurze Intervalle','Lange Grind-Sets'
  ];
  var seed = seeds[Math.floor(Math.random()*seeds.length)];
  var repSchemes = ['21-15-9','15-12-9','10-8-6-4','5-4-3-2-1','20-15-10-5','7-7-7','50-40-30-20-10','3 Rounds','5 Rounds','AMRAP in time'];
  var repScheme = repSchemes[Math.floor(Math.random()*repSchemes.length)];
  var randomSeed = Math.floor(Math.random()*10000);

  var prompt = 'Generiere ein EINZIGARTIGES CrossFit WOD (Seed: '+randomSeed+') mit folgenden Vorgaben:'
    +' Typ: '+typeStr+'.'
    +' Dauer: '+durStr+'.'
    +' Schwierigkeit: '+diffStr+'.'
    +' Equipment: '+userEq+'.'
    +' Stil-Hinweis: '+seed+'.'
    +' Rep-Schema-Inspiration: '+repScheme+'.'
    +(focus?' Fokus: '+focus+'.':'')
    +' NICHT vorschlagen: '+(recentWods||'nichts')+'.'
    +' Sei kreativ mit dem Namen. Antworte NUR mit JSON (kein Markdown):'
    +' {"name":"...","typ":"AMRAP|EMOM|ForTime|Tabata","beschreibung":"...","uebungen":"Uebung1, Uebung2",'
    +'"equipment":"...","dauer":"20","runden":"5","reps":"21-15-9","gewicht":"24",'
    +'"schwierigkeit":"Intermediate","skal_leicht":"...","skal_schwer":"..."}';

  var apiKey=localStorage.getItem(CLAUDE_KEY_KEY)||'';
  if(!apiKey){showToast('Claude API-Key in Einstellungen eintragen');AI_WOD_LOADING=false;if(btn){btn.textContent='🤖 Neues KI-WOD';btn.disabled=false;}return;}
  try{
    var resp = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key':apiKey,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:600,
        messages:[{role:'user',content:prompt}]
      })
    });
    var data = await resp.json();
    var text = data.content && data.content[0] && data.content[0].text || '';
    // Parse JSON from response
    var jsonMatch = text.match(/\{[\s\S]*\}/);
    if(!jsonMatch) throw new Error('Kein JSON gefunden');
    var wod = JSON.parse(jsonMatch[0]);
    wod.id = 'ai_'+Date.now();
    wod.kategorie = 'Eigenes WOD';
    wod.quelle = 'KI-generiert';
    // Show preview
    showAiWodPreview(wod);
  }catch(e){
    showToast('❌ KI-Fehler: '+e.message);
    console.error(e);
  }finally{
    AI_WOD_LOADING = false;
    if(btn){ btn.textContent='🤖 Neues KI-WOD'; btn.disabled=false; }
  }
}

function showAiWodPreview(wod){
  var preview = document.getElementById('ai-wod-preview');
  if(!preview) return;
  preview.style.display = 'block';
  window._pendingAiWod = wod;

  // Editable preview – user adjusts BEFORE saving
  preview.innerHTML =
    '<div style="font-size:9px;color:var(--accent);text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:10px;">🤖 KI-generiertes WOD – Anpassen vor dem Speichern</div>'

    // Name
    +'<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Name</div>'
    +'<input id="ai-edit-name" value="'+wod.name+'" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;padding:8px 12px;outline:none;margin-bottom:10px;">'

    // Typ + Schwierigkeit row
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">'
    +'<div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Typ</div>'
    +'<select id="ai-edit-typ" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Inter,sans-serif;font-size:13px;padding:8px 10px;outline:none;">'
    +'<option value="ForTime"'+(wod.typ==='ForTime'?' selected':'')+'>For Time</option>'
    +'<option value="AMRAP"'+(wod.typ==='AMRAP'?' selected':'')+'>AMRAP</option>'
    +'<option value="EMOM"'+(wod.typ==='EMOM'?' selected':'')+'>EMOM</option>'
    +'<option value="Tabata"'+(wod.typ==='Tabata'?' selected':'')+'>Tabata</option>'
    +'</select></div>'
    +'<div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Schwierigkeit</div>'
    +'<select id="ai-edit-diff" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Inter,sans-serif;font-size:13px;padding:8px 10px;outline:none;">'
    +'<option value="Beginner"'+(wod.schwierigkeit==='Beginner'?' selected':'')+'>Beginner</option>'
    +'<option value="Intermediate"'+((wod.schwierigkeit==='Intermediate'||!wod.schwierigkeit)?' selected':'')+'>Intermediate</option>'
    +'<option value="Advanced"'+(wod.schwierigkeit==='Advanced'?' selected':'')+'>Advanced</option>'
    +'</select></div>'
    +'</div>'

    // Dauer + Runden row
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">'
    +'<div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Dauer (Min)</div>'
    +'<input id="ai-edit-dauer" type="number" value="'+(wod.dauer||20)+'" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--accent);font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;padding:8px 10px;outline:none;text-align:center;"></div>'
    +'<div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Runden</div>'
    +'<input id="ai-edit-runden" type="number" value="'+(wod.runden||'')+'" placeholder="–" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;padding:8px 10px;outline:none;text-align:center;"></div>'
    +'<div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Gewicht kg</div>'
    +'<input id="ai-edit-gewicht" type="number" value="'+(wod.gewicht||'')+'" placeholder="–" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Barlow Condensed,sans-serif;font-size:20px;font-weight:700;padding:8px 10px;outline:none;text-align:center;"></div>'
    +'</div>'

    // Reps
    +'<div style="margin-bottom:10px;"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Reps Schema</div>'
    +'<input id="ai-edit-reps" value="'+(wod.reps||'')+'" placeholder="z.B. 21-15-9" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:Inter,sans-serif;font-size:13px;padding:8px 12px;outline:none;"></div>'

    // Beschreibung
    +'<div style="margin-bottom:10px;"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Beschreibung</div>'
    +'<textarea id="ai-edit-beschreibung" rows="2" style="width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text2);font-family:Inter,sans-serif;font-size:12px;padding:8px 12px;outline:none;resize:none;line-height:1.5;">'+wod.beschreibung+'</textarea></div>'

    // Exercises (read-only display)
    +'<div style="margin-bottom:12px;"><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Übungen</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:4px;">'
    +(wod.uebungen||'').split(',').map(function(e){return '<span style="background:var(--surface2);border:1px solid var(--border);border-radius:5px;padding:3px 8px;font-size:11px;color:var(--text2);">'+e.trim()+'</span>';}).join('')
    +'</div></div>'

    // Skalierung
    +(wod.skal_leicht?'<div style="font-size:11px;color:var(--muted);margin-bottom:4px;">↓ '+wod.skal_leicht+'</div>':'')
    +(wod.skal_schwer?'<div style="font-size:11px;color:var(--muted);margin-bottom:12px;">↑ '+wod.skal_schwer+'</div>':'')

    // Buttons
    +'<div style="display:flex;gap:8px;margin-top:4px;">'
    +'<button id="save-ai-btn" style="flex:1;padding:12px;background:var(--accent);border:none;border-radius:var(--radius);color:#000;font-family:Barlow Condensed,sans-serif;font-size:16px;font-weight:700;cursor:pointer;text-transform:uppercase;">✅ Speichern</button>'
    +'<button id="start-ai-btn" style="flex:1;padding:12px;background:var(--success);border:none;border-radius:var(--radius);color:#fff;font-family:Barlow Condensed,sans-serif;font-size:16px;font-weight:700;cursor:pointer;text-transform:uppercase;">▶ Starten</button>'
    +'</div>'
    +'<button id="regen-ai-btn" style="width:100%;margin-top:8px;padding:10px;background:transparent;border:1px solid var(--border);border-radius:var(--radius);color:var(--muted);font-family:Inter,sans-serif;font-size:12px;cursor:pointer;">🔄 Neu generieren</button>';

  // Read edited values before saving
  function getEditedWod(){
    return Object.assign({}, window._pendingAiWod, {
      name: document.getElementById('ai-edit-name').value.trim() || window._pendingAiWod.name,
      typ: document.getElementById('ai-edit-typ').value,
      schwierigkeit: document.getElementById('ai-edit-diff').value,
      dauer: document.getElementById('ai-edit-dauer').value,
      runden: document.getElementById('ai-edit-runden').value,
      gewicht: document.getElementById('ai-edit-gewicht').value,
      reps: document.getElementById('ai-edit-reps').value,
      beschreibung: document.getElementById('ai-edit-beschreibung').value.trim()
    });
  }

  document.getElementById('save-ai-btn').addEventListener('click', function(){
    window._pendingAiWod = getEditedWod();
    saveAiWod();
  });
  document.getElementById('start-ai-btn').addEventListener('click', function(){
    window._pendingAiWod = getEditedWod();
    saveAiWod();
    openDetail(window._pendingAiWod.id);
  });
  document.getElementById('regen-ai-btn').addEventListener('click', generateAiWod);
}
function saveAiWod(){
  if(!window._pendingAiWod) return;
  var wod = window._pendingAiWod;
  // Check if already saved
  if(!allWods.find(function(w){return w.id===wod.id;})){
    allWods.push(wod);
    saveCustomWods();
    renderList();
  }
  showToast('✅ KI-WOD gespeichert!');
  // Show "open detail" button
  var previewDiv = document.getElementById('ai-wod-preview');
  if(previewDiv){
    var openBtn = document.getElementById('open-ai-detail-btn');
    if(!openBtn){
      var row = document.createElement('div');
      row.style.marginTop = '8px';
      row.innerHTML = '<button id="open-ai-detail-btn" style="width:100%;padding:12px;background:var(--surface2);border:1px solid var(--accent);border-radius:var(--radius);color:var(--accent);font-family:Barlow Condensed,sans-serif;font-size:17px;font-weight:700;letter-spacing:1px;cursor:pointer;text-transform:uppercase;">✏️ Workout öffnen & anpassen</button>';
      previewDiv.appendChild(row);
      row.querySelector('button').addEventListener('click', openAiWodDetail);
    }
  }
}
function openAiWodDetail(){
  if(!window._pendingAiWod) return;
  saveAiWod();
  openDetail(window._pendingAiWod.id);
}
function startAiWod(){
  if(!window._pendingAiWod) return;
  saveAiWod();
  openDetail(window._pendingAiWod.id);
}

// ═══════════════════════════════════════════════════════════════════
// PWA SERVICE WORKER
// ═══════════════════════════════════════════════════════════════════
if('serviceWorker' in navigator){
  var swCode = 'self.addEventListener("install",function(e){e.waitUntil(caches.open("wod-v1").then(function(c){return c.addAll(["."]);}))});'
    +'self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}))});';
  var swBlob = new Blob([swCode],{type:'application/javascript'});
  var swUrl = URL.createObjectURL(swBlob);
  navigator.serviceWorker.register(swUrl).catch(function(){});
}

function showScreen(id){document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});document.getElementById(id).classList.add('active');if(id==='screen-config')loadTimerSettingsUI();}
function showToast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2500);}

