/*
  Citadel Enquiry/Form module v1.
  Owns copy-to-clipboard enquiry templates and structured contact/case enquiry form behaviour.
  This keeps form logic out of the global script and prepares Contact/Enquiry templates.
*/
(function () {
  const MODULE_NAME = 'CitadelEnquiryForm';
  if (window[MODULE_NAME]?.initialized) return;
  window[MODULE_NAME] = { initialized: true };

// Case enquiry copy-to-clipboard templates
(function () {
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  if (!copyButtons.length) {
    return;
  }

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-999px';
    textarea.style.left = '-999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    fallbackCopy(text);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget || '');
      if (!target) return;

      const originalText = button.textContent;
      const text = target.textContent.trim();

      try {
        await copyText(text);
        button.textContent = 'Copied';
        button.classList.add('is-copied');
      } catch (error) {
        button.textContent = 'Copy failed';
      }

      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('is-copied');
      }, 1600);
    });
  });
})();

// Dynamic contact enquiry form
(function () {
  const form = document.querySelector('[data-contact-dynamic-form]');
  if (!form) return;

  const emailJsConfig = {
    publicKey: 'rivGZ1UliuSkSgFdm',
    serviceId: 'chambersofak',
    templateId: 'contactformtempid'
  };

  const matterSelect = form.querySelector('[data-matter-type]');
  const matterGroups = Array.from(form.querySelectorAll('[data-matter-fields]'));
  const generateButton = form.querySelector('[data-generate-enquiry]');
  const copyButton = form.querySelector('[data-copy-enquiry]');
  const sendButton = form.querySelector('[data-emailjs-send]');
  const outputWrapper = form.querySelector('[data-form-result]');
  const output = form.querySelector('[data-enquiry-output]');
  const whatsappCompose = form.querySelector('[data-whatsapp-compose]');
  const gmailCompose = form.querySelector('[data-gmail-compose]');
  const consent = form.querySelector('[data-form-consent]');
  const statusMessages = Array.from(form.querySelectorAll('[data-emailjs-status]'));

  const matterLabels = {
    cheque: 'Cheque Bounce / Section 138',
    msme: 'MSME Recovery',
    rera: 'RERA / Builder Dispute',
    arbitration: 'Arbitration / Contract Dispute',
    commercial: 'Commercial Recovery',
    property: 'Property / Civil Suit',
    other: 'Other Legal Enquiry'
  };

  const readable = {
    name: 'Name',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    location: 'City / State',
    preferredContact: 'Preferred Contact Mode',
    matterType: 'Matter Type',
    cheque_amount: 'Cheque Amount',
    cheque_date: 'Cheque Date',
    return_memo_date: 'Return Memo Date',
    notice_status: 'Demand Notice Status',
    cheque_stage: 'Current Stage',
    udyam_status: 'Udyam Registration Status',
    invoice_amount: 'Invoice Amount',
    invoice_dates: 'Invoice Dates',
    buyer_location: 'Buyer Location',
    payment_due_date: 'Payment Due Date',
    project_location: 'Project Location',
    builder_project: 'Builder / Project Name',
    allotment_date: 'Agreement / Allotment Date',
    possession_due_date: 'Possession Due Date',
    amount_paid: 'Amount Paid',
    rera_relief: 'Relief Sought',
    contract_date: 'Contract Date',
    arbitration_clause: 'Arbitration Clause',
    seat_venue: 'Seat / Venue',
    arbitration_amount: 'Amount / Relief Involved',
    invocation_status: 'Notice / Invocation Status',
    commercial_parties: 'Parties Involved',
    commercial_amount: 'Outstanding Amount',
    commercial_docs: 'Contract / PO / Invoice Details',
    last_payment_date: 'Last Payment Date',
    commercial_notice: 'Notice Status',
    property_location: 'Property Location',
    possession_status: 'Possession Status',
    title_docs: 'Title Documents Available?',
    property_stage: 'Current Dispute Stage',
    property_relief: 'Relief Sought',
    other_area: 'Legal Area',
    other_forum: 'Forum / Court',
    summary: 'Brief Summary',
    urgency: 'Urgency'
  };

  const setStatus = (message, tone) => {
    if (!statusMessages.length) return;
    statusMessages.forEach((statusMessage) => {
      statusMessage.textContent = '';
      statusMessage.dataset.status = '';
      statusMessage.hidden = true;
    });
    const statusMessage = outputWrapper && !outputWrapper.hidden
      ? statusMessages[statusMessages.length - 1]
      : statusMessages[0];
    statusMessage.textContent = message || '';
    statusMessage.dataset.status = tone || '';
    statusMessage.hidden = !message;
  };

  const buildWhatsAppComposeUrl = (message) => {
    const params = new URLSearchParams({ text: message });
    return `https://wa.me/919471214118?${params.toString()}`;
  };

  const buildGmailComposeUrl = (message) => {
    const composeParams = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: 'chambersofakadmin@gmail.com',
      su: 'Chambers of AK - Structured Enquiry',
      body: message
    });

    const gmailComposeUrl = `https://mail.google.com/mail/?${composeParams.toString()}`;
    const chooserParams = new URLSearchParams({ continue: gmailComposeUrl });
    return `https://accounts.google.com/AccountChooser?${chooserParams.toString()}`;
  };

  const updateMatterFields = () => {
    const selected = matterSelect.value;
    matterGroups.forEach((group) => {
      group.hidden = group.dataset.matterFields !== selected;
    });
  };

  const getValue = (field) => {
    if (!field || !field.name || field.type === 'checkbox') return '';
    return (field.value || '').trim();
  };

  const getFieldValue = (name) => {
    const field = form.querySelector(`[name="${name}"]`);
    return getValue(field);
  };

  const getMatterLabel = () => {
    const selected = matterSelect.value;
    return matterLabels[selected] || selected || 'Not selected';
  };

  const generateMessage = () => {
    const selected = matterSelect.value;
    const fields = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter((field) => !field.closest('[hidden]'))
      .filter((field) => field.name && field.type !== 'checkbox');

    const lines = [
      'Chambers of AK - Structured Enquiry',
      '------------------------------------'
    ];

    fields.forEach((field) => {
      const value = getValue(field);
      if (!value) return;
      const label = field.name === 'matterType' ? 'Matter Type' : (readable[field.name] || field.name);
      const finalValue = field.name === 'matterType' ? (matterLabels[value] || value) : value;
      lines.push(`${label}: ${finalValue}`);
    });

    lines.push('');
    lines.push('Note: This is an initial enquiry summary only. I understand that no advocate-client relationship is created until formal consultation or engagement is confirmed.');

    if (!selected) {
      lines.push('');
      lines.push('Please select a matter type before sending this message.');
    }

    output.value = lines.join('\n');

    if (whatsappCompose) {
      whatsappCompose.href = buildWhatsAppComposeUrl(output.value);
    }

    if (gmailCompose) {
      gmailCompose.href = buildGmailComposeUrl(output.value);
    }

    outputWrapper.hidden = false;
    copyButton.disabled = false;
    if (sendButton) {
      sendButton.disabled = !consent || !consent.checked;
    }
    setStatus('', '');
    output.focus();
  };

  const getTemplateParams = () => {
    if (!output.value.trim()) {
      generateMessage();
    }

    return {
      from_name: getFieldValue('name') || 'Website Enquiry',
      phone: getFieldValue('phone'),
      reply_to: getFieldValue('email'),
      location: getFieldValue('location'),
      preferred_contact: getFieldValue('preferredContact'),
      matter_type: getMatterLabel(),
      urgency: getFieldValue('urgency'),
      message: output.value,
      page_url: window.location.href
    };
  };

  const sendEmailEnquiry = async () => {
    if (!consent || !consent.checked) {
      setStatus('Please accept the enquiry acknowledgement before sending.', 'error');
      return;
    }

    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      setStatus('Email service is still loading. Please try again in a few seconds, or use WhatsApp/Gmail fallback.', 'error');
      return;
    }

    const params = getTemplateParams();

    if (!params.reply_to) {
      setStatus('Please enter your email address before sending directly.', 'error');
      return;
    }

    try {
      sendButton.disabled = true;
      setStatus('Sending enquiry...', 'pending');

      await window.emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        params,
        { publicKey: emailJsConfig.publicKey }
      );

      setStatus('Enquiry sent successfully. Chambers of AK will review the message and respond as appropriate.', 'success');
    } catch (error) {
      sendButton.disabled = false;
      setStatus('Could not send directly right now. Please use WhatsApp, Gmail, or copy the prepared message.', 'error');
      console.error('EmailJS send failed:', error);
    }
  };

  const copyPreparedMessage = async () => {
    if (!output.value.trim()) return;

    try {
      await navigator.clipboard.writeText(output.value);
      copyButton.textContent = 'Copied';
    } catch (error) {
      output.select();
      document.execCommand('copy');
      copyButton.textContent = 'Copied';
    }

    window.setTimeout(() => {
      copyButton.textContent = 'Copy Prepared Message';
    }, 1600);
  };

  matterSelect.addEventListener('change', updateMatterFields);

  if (consent) {
    consent.addEventListener('change', () => {
      generateButton.disabled = !consent.checked;
      if (sendButton) {
        sendButton.disabled = !consent.checked || !output.value.trim();
      }
    });
    generateButton.disabled = !consent.checked;
  }

  if (window.emailjs && typeof window.emailjs.init === 'function') {
    window.emailjs.init({ publicKey: emailJsConfig.publicKey });
  }

  generateButton.addEventListener('click', generateMessage);
  copyButton.addEventListener('click', copyPreparedMessage);
  if (sendButton) {
    sendButton.addEventListener('click', sendEmailEnquiry);
  }

  updateMatterFields();
})();
})();
