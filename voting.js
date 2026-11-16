import {escapeHtml as esc,normalizePhoneES,cleanName,validName,phoneKey,summarizeVotes,authError} from './voting-core.mjs';
const state={ready:false,user:null,key:null,member:false,profile:null,ballots:[],saving:false,error:'',phase:'loading',busy:false,draftName:'',phone:'',confirmation:null,cooldown:0};
let sdk,auth,db,config,recaptcha,recaptchaNode,stopMember,stopBallots,authVersion=0,booting=false;
const root=()=>['skiTrips',config.tripId];
const allPlans=()=>window.PLANS.filter(window.SKI_PLAN_ALLOWED);
const ownBallot=()=>state.ballots.find(b=>b.key===state.key);
const selected=id=>(ownBallot()?.planIds||[]).includes(id);
function notify(){document.dispatchEvent(new Event('ski-voting-updated'));updateAccount();}
function updateAccount(){const b=document.querySelector('#account-trigger');if(b)b.textContent=state.profile?.name||'Tu cuenta';const n=document.querySelector('#voting-notice');if(n){n.textContent=state.error||state.message||'';n.hidden=!n.textContent||!state.profile;n.classList.toggle('is-error',!!state.error);}}
function button(id){
 const count=state.ballots.filter(b=>(b.planIds||[]).includes(id)).length;
 return '<button class="vote-button" data-vote="'+esc(id)+'" aria-pressed="'+selected(id)+'" '+(!state.ready||!state.member||state.saving?'disabled':'')+'>'+(selected(id)?'✓ Votado':'Votar')+(count?' <span class="vote-count">'+count+'</span>':'')+'</button>';
}
function page(){
 let out='<div class="heading"><h1>Votaciones</h1><p>Marca varios planes. Puedes cambiar tus votos.</p></div>';
 if(!state.ready)return out+'<p class="fine">Cargando votos…</p>';
 if(!state.member)return out+'<p class="fine">Tu teléfono no está en el grupo de esquí. Puedes consultar los planes; solo los miembros pueden votar y ver los resultados.</p><a class="entrylink" href="#planes">Ver planes →</a>';
 const ranked=summarizeVotes(allPlans(),state.ballots),voted=ranked.filter(r=>r.voters.length),empty=ranked.filter(r=>!r.voters.length);
 out+='<div class="vote-summary"><strong>'+state.ballots.filter(b=>b.planIds?.length).length+' / '+config.electorate+'</strong><span>personas han votado</span></div>';
 if(state.error)out+='<p class="vote-error" role="alert">'+esc(state.error)+'</p>';
 const row=({plan,voters})=>'<article class="vote-result"><div class="vote-result-top"><a href="#plan/'+esc(plan.id)+'"><span class="minor">'+esc(plan.area)+'</span><h2>'+esc(plan.title)+'</h2></a><div>'+button(plan.id)+'</div></div><div class="vote-meter" role="meter" aria-label="Votos para '+esc(plan.title)+'" aria-valuemin="0" aria-valuemax="'+config.electorate+'" aria-valuenow="'+voters.length+'"><span style="width:'+Math.min(100,voters.length/config.electorate*100)+'%"></span></div>'+(voters.length?'<div class="vote-people">'+voters.map(v=>'<span class="vote-person" title="Móvil terminado en '+esc(v.suffix)+'">'+esc(v.name)+'</span>').join('')+'</div>':'<p class="vote-empty">Sin votos</p>')+'</article>';
 if(!voted.length)out+='<p class="fine">Todavía no hay votos. Elige tus favoritos.</p>';
 out+='<div class="vote-results">'+voted.map(row).join('')+'</div>';
 if(empty.length)out+='<details class="vote-more" '+(!voted.length?'open':'')+'><summary>Planes sin votos · '+empty.length+'</summary>'+empty.map(row).join('')+'</details>';
 return out;
}
window.SKI_VOTING={button,page};
function clearCaptcha(){try{recaptcha?.clear();}catch{}recaptcha=null;recaptchaNode?.remove();recaptchaNode=null;}
function renderGate(){
 const gate=document.querySelector('#auth-gate');
 if(state.user&&state.profile){gate.hidden=true;document.querySelector('#shell').hidden=false;return;}
 gate.hidden=false;document.querySelector('#shell').hidden=true;
 const loading=state.phase==='loading',code=state.phase==='code',profile=state.phase==='profile',failed=state.phase==='failed';
 let body;
 if(loading)body='<p role="status">Recuperando tu sesión…</p>';
 else if(failed)body='<p class="auth-error" role="alert">'+esc(state.error)+'</p><button class="auth-primary" data-auth-retry>Reintentar</button>';
 else if(profile)body='<p>Un nombre para que el grupo reconozca tus votos.</p><form id="profile-first"><label for="first-name">Tu nombre</label><input id="first-name" name="name" autocomplete="given-name" maxlength="50" required value="'+esc(state.draftName)+'"><p class="auth-error" role="alert">'+esc(state.error)+'</p><button class="auth-primary" '+(state.busy?'disabled':'')+'>Guardar y entrar</button></form>';
 else if(code)body='<p>Introduce el código enviado a <strong>'+esc(state.phone)+'</strong>.</p><form id="sms-confirm"><label for="sms-code">Código del SMS</label><input id="sms-code" class="auth-code" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required autofocus><p class="auth-error" role="alert">'+esc(state.error)+'</p><button class="auth-primary" '+(state.busy?'disabled':'')+'>'+(state.busy?'Verificando…':'Verificar y entrar')+'</button></form><button class="auth-edit" data-auth-edit '+(state.busy?'disabled':'')+'>Cambiar número o pedir otro SMS</button>';
 else body='<p>Entra con tu móvil. La sesión se recuerda en este navegador.</p><form id="sms-send"><label for="auth-name">Tu nombre</label><input id="auth-name" name="name" autocomplete="given-name" maxlength="50" required value="'+esc(state.draftName)+'"><label for="auth-phone">Móvil</label><div class="phone-field"><span>+34</span><input id="auth-phone" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" placeholder="600 000 000" required value="'+esc(state.phone.replace(/^\+34/,''))+'"></div><p class="auth-error" role="alert">'+esc(state.error)+'</p><button class="auth-primary" '+(state.busy?'disabled':'')+'>'+(state.busy?'Preparando SMS…':'Recibir código por SMS')+'</button></form><div id="auth-captcha" class="auth-captcha"></div><p class="auth-note">Cualquier móvil español puede entrar. Solo el grupo puede votar.<br>Se aplican la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacidad</a> y las <a href="https://policies.google.com/terms" target="_blank" rel="noopener">condiciones de Google</a>.</p>';
 gate.innerHTML='<div class="auth-panel"><div class="auth-brand"><img src="icon.svg" width="27" height="27" alt="">Esquí · diciembre</div><h1>'+(profile?'¿Cómo te llamas?':code?'Verifica tu móvil':'Vamos a la nieve.')+'</h1>'+body+'</div>';
 if(code)document.querySelector('#sms-code')?.focus();
}
async function saveProfile(name){
 name=cleanName(name);if(!validName(name))throw Error('Escribe un nombre de 2 a 50 caracteres.');
 const profile={name,updatedAt:sdk.serverTimestamp()};
 await sdk.setDoc(sdk.doc(db,...root(),'profiles',state.key),profile);
 state.profile={name};state.draftName=name;
 if(ownBallot())await sdk.updateDoc(sdk.doc(db,...root(),'ballots',state.key),{name,updatedAt:sdk.serverTimestamp()});
 updateAccount();
}
function watchMembership(){
 stopMember?.();stopBallots?.();stopBallots=null;
 stopMember=sdk.onSnapshot(sdk.doc(db,...root(),'members',state.key),snapshot=>{
  const member=snapshot.exists()&&snapshot.data().enabled===true;
  if(member===state.member&&stopBallots)return;
  state.member=member;state.ready=true;state.error='';
  stopBallots?.();stopBallots=null;state.ballots=[];
  if(member)stopBallots=sdk.onSnapshot(sdk.collection(db,...root(),'ballots'),snap=>{
   state.ballots=snap.docs.map(d=>({key:d.id,...d.data()}));state.error='';notify();
  },error=>{state.ballots=[];state.error=authError(error);notify();});
  notify();
 },error=>{state.ready=true;state.member=false;state.ballots=[];state.error=authError(error);notify();});
}
async function acceptedUser(user){
 const ticket=++authVersion;stopMember?.();stopBallots?.();state.ballots=[];state.member=false;state.ready=false;state.user=user;state.profile=null;
 if(!user){state.key=null;state.phase='phone';state.error='';renderGate();notify();return;}
 try{
  const key=await phoneKey(user.phoneNumber);if(ticket!==authVersion)return;state.key=key;
  const profile=await sdk.getDoc(sdk.doc(db,...root(),'profiles',key));if(ticket!==authVersion)return;
  if(profile.exists())state.profile={name:profile.data().name};
  else if(validName(state.draftName))await saveProfile(state.draftName);
  else {state.phase='profile';state.error='';renderGate();return;}
  state.phase='done';state.error='';state.busy=false;renderGate();watchMembership();notify();
 }catch(error){state.phase='failed';state.error=authError(error);state.busy=false;renderGate();}
}
async function boot(){
 if(booting)return;booting=true;state.phase='loading';state.error='';renderGate();
 try{
  const result=await fetch(new URL('./firebase-config.json',import.meta.url),{cache:'no-store',signal:AbortSignal.timeout(12000)});
  if(!result.ok)throw Error('No se pudo cargar el acceso por SMS.');config=await result.json();
  const [appModule,authModule,dbModule]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js'),
   import('https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js'),
   import('https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js'),
  ]);
  sdk={...authModule,...dbModule};const app=appModule.getApps().find(a=>a.name==='esqui-diciembre')||appModule.initializeApp(config,'esqui-diciembre');
  auth=sdk.getAuth(app);auth.languageCode='es';
  await sdk.setPersistence(auth,sdk.browserLocalPersistence);
  db=sdk.getFirestore(app,config.databaseId);
  sdk.onAuthStateChanged(auth,user=>void acceptedUser(user));
 }catch(error){state.phase='failed';state.error=authError(error);renderGate();}
 finally{booting=false;}
}
async function sendSms(form){
 if(state.busy)return;
 try{
  state.draftName=cleanName(form.elements.name.value);if(!validName(state.draftName))throw Error('Escribe tu nombre, de 2 a 50 caracteres.');
  state.phone=form.elements.phone.value;
  state.phone=normalizePhoneES(state.phone);
  if(Date.now()<state.cooldown)throw Error('Espera '+Math.ceil((state.cooldown-Date.now())/1000)+' s antes de pedir otro SMS.');
  clearCaptcha();state.busy=true;state.error='';renderGate();
  recaptchaNode=document.createElement('div');document.querySelector('#auth-captcha').append(recaptchaNode);
  recaptcha=new sdk.RecaptchaVerifier(auth,recaptchaNode,{size:'normal'});
  await recaptcha.render();
  state.confirmation=await sdk.signInWithPhoneNumber(auth,state.phone,recaptcha);
  state.cooldown=Date.now()+60000;state.phase='code';clearCaptcha();
 }catch(error){state.error=authError(error);clearCaptcha();}
 finally{state.busy=false;renderGate();}
}
async function confirmSms(form){
 if(state.busy)return;const code=form.elements.code.value.trim();
 if(!/^\d{6}$/.test(code)){state.error='Introduce los seis dígitos del SMS.';renderGate();return;}
 state.busy=true;state.error='';form.querySelector('button').disabled=true;
 try{await state.confirmation.confirm(code);}catch(error){state.error=authError(error);state.busy=false;renderGate();}
}
async function vote(id){
 if(!state.member||state.saving||!allPlans().some(p=>p.id===id))return;
 const include=!selected(id);state.saving=true;state.error='';notify();
 try{
  const ref=sdk.doc(db,...root(),'ballots',state.key);
  await sdk.runTransaction(db,async tx=>{
   const snap=await tx.get(ref),ids=new Set(snap.exists()?snap.data().planIds:[]);
   if(include)ids.add(id);else ids.delete(id);
   if(!ids.size){tx.delete(ref);return;}
   tx.set(ref,{name:state.profile.name,suffix:state.user.phoneNumber.slice(-4),planIds:[...ids],updatedAt:sdk.serverTimestamp()});
  });
  state.message='Voto guardado.';setTimeout(()=>{state.message='';updateAccount();},3000);
 }catch(error){state.error=authError(error);}
 finally{state.saving=false;notify();}
}
function showProfile(){
 const dialog=document.querySelector('#profile-dialog');
 dialog.innerHTML='<div class="profile-head"><h2>Tu cuenta</h2><button class="close" data-profile-close aria-label="Cerrar cuenta">×</button></div><div class="auth-panel"><p>'+esc(state.user.phoneNumber)+'</p><form id="profile-edit"><label for="profile-name">Tu nombre en los votos</label><input id="profile-name" name="name" maxlength="50" required value="'+esc(state.profile.name)+'"><p class="auth-error" role="alert"></p><button class="auth-primary">Guardar</button></form><p class="auth-note">La sesión se recuerda aquí. Borrar los datos del navegador puede requerir otro SMS.</p></div>';dialog.showModal();
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.vote){event.preventDefault();void vote(button.dataset.vote);}
 if(button.hasAttribute('data-auth-retry')){if(state.user)void acceptedUser(state.user);else void boot();}
 if(button.hasAttribute('data-auth-edit')){state.phase='phone';state.confirmation=null;state.error='';renderGate();}
 if(button.id==='account-trigger'&&state.profile)showProfile();
 if(button.hasAttribute('data-profile-close'))document.querySelector('#profile-dialog').close();
});
document.addEventListener('submit',async event=>{
 const form=event.target;if(!['sms-send','sms-confirm','profile-first','profile-edit'].includes(form.id))return;event.preventDefault();
 if(form.id==='sms-send')void sendSms(form);
 else if(form.id==='sms-confirm')void confirmSms(form);
 else{
  const button=form.querySelector('button');button.disabled=true;
  try{await saveProfile(form.elements.name.value);if(form.id==='profile-first'){state.phase='done';renderGate();watchMembership();}else document.querySelector('#profile-dialog').close();notify();}
  catch(error){form.querySelector('.auth-error').textContent=authError(error);button.disabled=false;}
 }
});
void boot();
