import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {initializeTestEnvironment,assertFails,assertSucceeds} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,getDocs,collection,deleteDoc,serverTimestamp,runTransaction,setLogLevel} from 'firebase/firestore';
setLogLevel('silent');
const projectId='demo-esqui-voting',base=['skiTrips','diciembre-2026'];
const key=p=>createHash('sha256').update(p).digest('hex');
const alice='+15555550101',bob='+15555550102',outsider='+15555550103';
const akey=key(alice),bkey=key(bob),okey=key(outsider);
test('Firestore enforces verified group membership, ownership and multiple choices',async t=>{
 assert.equal(projectId.startsWith('demo-'),true);
 const env=await initializeTestEnvironment({projectId,firestore:{host:'127.0.0.1',port:19763,rules:await readFile(new URL('../firestore.rules',import.meta.url),'utf8')}});
 try{
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async context=>{
   for(const p of [alice,bob])await setDoc(doc(context.firestore(),...base,'members',key(p)),{enabled:true});
  });
  const context=(uid,phone,provider='phone')=>env.authenticatedContext(uid,{phone_number:phone,firebase:{sign_in_provider:provider,identities:{phone:[phone]}}}).firestore();
  const a=context('alice',alice),b=context('bob',bob),o=context('outsider',outsider),anon=env.unauthenticatedContext().firestore();
  const ballot=(name,ids,suffix='0101')=>({name,suffix,planIds:ids,updatedAt:serverTimestamp()});
  await t.test('any verified phone can register its own profile',async()=>{
   for(const [db,k,name] of [[a,akey,'Ana'],[b,bkey,'Bea'],[o,okey,'Otra']])await assertSucceeds(setDoc(doc(db,...base,'profiles',k),{name,updatedAt:serverTimestamp()}));
   await assertFails(setDoc(doc(anon,...base,'profiles','anonymous'),{name:'Anon',updatedAt:serverTimestamp()}));
  });
  await t.test('membership list is private and cannot be self-granted',async()=>{
   await assertSucceeds(getDoc(doc(a,...base,'members',akey)));
   await assertFails(getDoc(doc(a,...base,'members',bkey)));
   await assertFails(getDocs(collection(a,...base,'members')));
   await assertFails(setDoc(doc(o,...base,'members',okey),{enabled:true}));
  });
  await t.test('members can select several plans; every other actor is denied',async()=>{
   await assertSucceeds(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',['chalet','loft'])));
   await assertSucceeds(getDocs(collection(b,...base,'ballots')));
   await assertFails(getDocs(collection(o,...base,'ballots')));
   await assertFails(getDocs(collection(anon,...base,'ballots')));
   await assertFails(setDoc(doc(o,...base,'ballots',okey),ballot('Otra',['loft'],'0103')));
   await assertFails(setDoc(doc(b,...base,'ballots',akey),ballot('Bea',['loft'],'0102')));
   const wrongProvider=context('unverified',alice,'anonymous');
   await assertFails(getDoc(doc(wrongProvider,...base,'ballots',akey)));
  });
  await t.test('unsupported, duplicate, blank and spoofed ballots cannot be written',async()=>{
   for(const ids of [['chalet-inicio'],['ancolie'],['loft','loft'],[],['invented']])await assertFails(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',ids)));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),ballot('Bea',['loft'])));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),{...ballot('Ana',['loft']),phone:alice}));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',['loft'],'9999')));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),{...ballot('Ana',['loft']),updatedAt:new Date(0)}));
  });
  await t.test('publisher may append one verified suggestion and cannot access ballots',async()=>{
   const catalogue=['skiTrips','diciembre-2026','catalogue','suggestions'];
   const publisher=env.authenticatedContext('esqui-suggestions-publisher-v1',{firebase:{sign_in_provider:'custom'}}).firestore();
   const id='suggestion-abcdef01234567890000';
   const entry={id,title:"Chalet d'Avoriaz",station:'Avoriaz',kind:'lodging',url:'https://www.booking.com/hotel/fr/chalet.html',priceCents:18400,checkedOn:'2026-11-16'};
   const next={ids:[id],items:[entry]};
   await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),...catalogue),{ids:[],items:[]}));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',[id])));
   await assertFails(setDoc(doc(a,...catalogue),next));
   await assertFails(getDoc(doc(anon,...catalogue)));
   await assertSucceeds(getDoc(doc(o,...catalogue)));
   await assertFails(getDocs(collection(publisher,...base,'ballots')));
   await assertFails(setDoc(doc(publisher,...base,'ballots',akey),ballot('Ana',['loft'])));
   await assertFails(setDoc(doc(publisher,...catalogue),{ids:[id],items:[{...entry,url:'https://example.org/offer'}]}));
   await assertSucceeds(setDoc(doc(publisher,...catalogue),next));
   await assertFails(setDoc(doc(publisher,...catalogue),{ids:[],items:[]}));
   await assertFails(setDoc(doc(publisher,...catalogue),{ids:[id,id],items:[entry,entry]}));
   await assertFails(deleteDoc(doc(publisher,...catalogue)));
   await assertSucceeds(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',['loft',id])));
   await assertFails(setDoc(doc(o,...base,'ballots',okey),ballot('Otra',[id],'0103')));
  });
  await t.test('recreated Firebase identity for one phone still has one ballot',async()=>{
   const restored=context('new-uid-same-phone',alice);
   await assertSucceeds(setDoc(doc(restored,...base,'ballots',akey),ballot('Ana',['chalet'])));
   const votes=await getDocs(collection(b,...base,'ballots'));assert.equal(votes.size,1);
  });
  await t.test('simultaneous edits preserve multiple choices through transactions',async()=>{
   const other=context('another-tab',alice);
   const add=async(db,id)=>runTransaction(db,async tx=>{const ref=doc(db,...base,'ballots',akey);const current=await tx.get(ref);const ids=[...new Set([...(current.data()?.planIds||[]),id])];tx.set(ref,ballot('Ana',ids));});
   await Promise.all([add(a,'loft'),add(other,'turche')]);
   const vote=await getDoc(doc(a,...base,'ballots',akey));assert.deepEqual(new Set(vote.data().planIds),new Set(['chalet','loft','turche']));
  });
  await t.test('revocation blocks existing members; owner can remove a ballot before revocation',async()=>{
   await assertSucceeds(deleteDoc(doc(a,...base,'ballots',akey)));
   await assertSucceeds(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',['chalet'])));
   await env.withSecurityRulesDisabled(async c=>setDoc(doc(c.firestore(),...base,'members',akey),{enabled:false}));
   await assertFails(setDoc(doc(a,...base,'ballots',akey),ballot('Ana',['loft'])));
   await assertFails(getDocs(collection(a,...base,'ballots')));
  });
 }finally{await env.cleanup();}
});
