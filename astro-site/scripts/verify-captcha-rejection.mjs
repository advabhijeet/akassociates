import assert from 'node:assert/strict';
// One explicitly authorized negative test against the firm's own existing template.
if(process.env.AK_CAPTCHA_NEGATIVE_TEST!=='YES')throw Error('Explicit test gate required');
const r=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json','Origin':'https://chambersofak.in','Referer':'https://chambersofak.in/contact.html'},body:JSON.stringify({service_id:'chambersofak',template_id:'contactformtempid',user_id:'rivGZ1UliuSkSgFdm',template_params:{from_name:'AK security test',reply_to:'test@example.invalid',phone:'',location:'',preferred_contact:'Email',matter_type:'Security validation',urgency:'',message:'Synthetic authorized security test: invalid CAPTCHA token. No client data. Ignore if delivered.',page_url:'https://chambersofak.in/contact.html','g-recaptcha-response':'invalid-test-token'}}),signal:AbortSignal.timeout(20000)});
const response=await r.text();
const captcha=/captcha/i.test(response);
console.log(JSON.stringify({status:r.status,captchaSpecificRejection:!r.ok&&captcha,response:response.slice(0,300)}));
assert.ok(!r.ok,'Unexpected acceptance; stop and inspect template enforcement');
assert.ok(r.status>=400&&r.status<500&&captcha,'Request rejected, but CAPTCHA enforcement not independently established');
console.log('Invalid CAPTCHA token rejected by EmailJS.');
