export const origin='https://chambersofak.in';
const migrated=new Set(["about.html","case-enquiry.html","contact.html","courts.html","disclaimer.html","document-checklists.html","faq.html","privacy-policy.html","process.html","terms.html"]);
export const legacy=(path:string)=>migrated.has(path.replace(/^\//,''))?'/'+path.replace(/^\//,''):origin+'/'+path.replace(/^\//,'');
export const practices=[
 ['MSME Recovery','Delayed payments, Udyam records, MSEFC claims, buyer objections and enforcement.','msme-disputes'],
 ['Arbitration','Invocation, claims, defence, interim measures, award challenge and enforcement.','arbitration'],
 ['Commercial & Consumer Recovery','Business dues, contractual disputes, consumer claims and commercial suits.','commercial-recovery'],
 ['RERA & Property','Builder disputes, delayed possession, refund, interest and property records.','rera-property'],
 ['Cheque Bounce','Section 138 notices, complaints, defence, settlement and limitation.','cheque-bounce'],
 ['Property & Civil Suits','Property disputes, title records, injunctions and civil proceedings.','property-civil-suits']
].map(([title,description,slug],i)=>({title,description,number:String(i+1).padStart(2,'0'),href:'/practice/'+slug+'.html'}));
export const navigation=[['Home','/'],['About',legacy('about.html')],['Practice','/practice.html'],['Courts','/courts.html'],['Insights','/legal-updates.html'],['Resources','/legal-tools.html'],['Contact','/contact.html']];
export const contact={phone:'+91 94712 14118',tel:'+919471214118',email:'chambersofakadmin@gmail.com'};
