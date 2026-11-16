export const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function normalizePhoneES(value){
 let p=String(value||'').replace(/[\s().-]/g,'');
 if(p.startsWith('0034'))p='+'+p.slice(2);
 if(/^34[67]\d{8}$/.test(p))p='+'+p;
 if(/^[67]\d{8}$/.test(p))p='+34'+p;
 if(!/^\+34[67]\d{8}$/.test(p))throw Error('Escribe un móvil español de nueve dígitos.');
 return p;
}
export const cleanName=value=>String(value||'').normalize('NFC').replace(/\s+/g,' ').trim();
export function validName(value){const n=cleanName(value);return n.length>=2&&n.length<=50&&!/[\u0000-\u001f\u007f]/.test(n);}
export async function phoneKey(phone){
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(phone));
 return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');
}
export function summarizeVotes(plans,ballots){
 const allowed=new Set(plans.map(p=>p.id)),tallies=new Map(plans.map(p=>[p.id,[]]));
 for(const b of ballots){
  for(const id of new Set(b.planIds||[]))if(allowed.has(id))tallies.get(id).push({name:b.name,suffix:b.suffix,key:b.key});
 }
 return plans.map((plan,index)=>({plan,index,voters:tallies.get(plan.id)})).sort((a,b)=>b.voters.length-a.voters.length||a.index-b.index);
}
export function authError(error){
 const code=error?.code||'';
 const messages={
  'auth/invalid-phone-number':'Revisa el número de móvil.',
  'auth/invalid-verification-code':'El código no es correcto.',
  'auth/code-expired':'El código ha caducado. Pide otro SMS.',
  'auth/session-expired':'El código ha caducado. Pide otro SMS.',
  'auth/too-many-requests':'Demasiados intentos. Espera unos minutos.',
  'auth/quota-exceeded':'Google ha alcanzado el límite de SMS. Inténtalo más tarde.',
  'auth/network-request-failed':'Comprueba la conexión y vuelve a intentarlo.',
  'auth/captcha-check-failed':'No se pudo completar reCAPTCHA. Inténtalo de nuevo.',
  'auth/invalid-app-credential':'No se pudo completar reCAPTCHA. Inténtalo de nuevo.',
  'auth/unauthorized-domain':'Este dominio todavía no tiene acceso al SMS.',
  'auth/operation-not-allowed':'El acceso por SMS no está disponible ahora.',
  'auth/billing-not-enabled':'El acceso por SMS no está disponible ahora.',
  'permission-denied':'No tienes permiso para esta votación.',
  'unavailable':'No se pudo conectar. Tu voto no se ha confirmado.',
 };
 return messages[code]||(!code&&error instanceof Error?error.message:'No se pudo completar. Inténtalo de nuevo.');
}
