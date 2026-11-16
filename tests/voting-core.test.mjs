import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizePhoneES,validName,summarizeVotes,escapeHtml,phoneKey} from '../voting-core.mjs';
test('Spanish mobiles normalize without changing foreign numbers into Spanish ones',()=>{
 for(const s of ['600 000 001','+34 600-000-001','0034600000001','34600000001'])assert.equal(normalizePhoneES(s),'+34600000001');
 for(const s of ['123','+41600000001','+346000000011','foo600000001','910000001'])assert.throws(()=>normalizePhoneES(s));
});
test('multi-selection counts people once per plan and ignores obsolete options',()=>{
 const r=summarizeVotes([{id:'chalet'},{id:'loft'}],[{key:'a',name:'Ana',planIds:['chalet','chalet','loft','removed']},{key:'b',name:'Bea',planIds:['loft']}]);
 assert.deepEqual(r.map(x=>[x.plan.id,x.voters.length]),[['loft',2],['chalet',1]]);
});
test('verified phone gives the same private document key across accounts and browsers',async()=>{
 assert.match(await phoneKey('+34600000001'),/^[a-f0-9]{64}$/);
 assert.equal(await phoneKey('+34600000001'),await phoneKey('+34600000001'));
 assert.notEqual(await phoneKey('+34600000001'),await phoneKey('+34600000002'));
});
test('participant text is escaped and names are bounded',()=>{
 assert.equal(escapeHtml('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;');
 assert.equal(validName('  Ana  '),true);assert.equal(validName('A'),false);assert.equal(validName('A'.repeat(51)),false);
});
