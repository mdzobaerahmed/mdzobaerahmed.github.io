import { getAdminEmail } from './dataService';

const STORAGE_KEYS = {
  WEB3FORMS_KEY: 'mza_web3forms_key'
};

export function getWeb3FormsKey() {
  return import.meta.env.VITE_WEB3FORMS_KEY || localStorage.getItem(STORAGE_KEYS.WEB3FORMS_KEY) || 'c68f1052-c75a-40a2-a79f-87168a0a8338';
}

export function setWeb3FormsKey(key) {
  if (key) localStorage.setItem(STORAGE_KEYS.WEB3FORMS_KEY, key.trim());
  else localStorage.removeItem(STORAGE_KEYS.WEB3FORMS_KEY);
  window.dispatchEvent(new Event('mza_data_updated'));
}

/**
 * Robust dispatcher: tries Web3Forms first, with FormSubmit as automatic reliable fallback.
 */
async function dispatchEmail(payload) {
  const adminEmail = getAdminEmail();
  const accessKey = payload.access_key || getWeb3FormsKey();

  // 1. Try Web3Forms if key is provided
  if (accessKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          to_email: adminEmail,
          ...payload
        })
      });
      const data = await response.json();
      if (data && data.success) {
        return { success: true, service: 'Web3Forms', message: data.message };
      }
    } catch (e) {
      console.warn("Web3Forms dispatch failed, falling back to FormSubmit:", e);
    }
  }

  // 2. Reliable Fallback via FormSubmit (Direct to Gmail, no key needed)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(adminEmail)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: payload.subject || "New Portfolio Notification",
        _template: "table",
        ...payload
      })
    });
    const data = await res.json();
    return { success: true, service: 'FormSubmit', message: data.message || "Email delivered via FormSubmit!" };
  } catch (err) {
    console.error("All email providers failed:", err);
    return { success: false, message: err.message };
  }
}

export async function sendOrderNotificationEmail(order) {
  const adminEmail = getAdminEmail();
  const itemsSummary = (order.items || [])
    .map(i => `• ${i.title} (${i.size}, ${i.paper}) x${i.quantity} = $${i.itemTotal}`)
    .join('\n');

  const emailSubject = `[NEW PRINT ORDER] ${order.orderId} - ৳${order.totalBDT} from ${order.contactName}`;
  const emailMessage = `
🎨 NEW FINE ART PRINT ORDER RECEIVED!
=======================================
Order ID: ${order.orderId}
Timestamp: ${new Date(order.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (Dhaka)

👤 CUSTOMER INFORMATION:
Name: ${order.contactName}
Phone / WhatsApp: ${order.phoneNo}
Email: ${order.emailAddress}
Shipping Address: ${order.shippingAddress}

💳 PAYMENT & VERIFICATION:
Payment Method: ${order.paymentMethod}
TrxID (Transaction ID): ${order.transactionId}
Total Amount: ৳${order.totalBDT} ($${order.totalUSD} USD)

🖼️ ORDERED PRINTS:
${itemsSummary}

📝 SPECIAL REQUESTS / FRAMING NOTES:
${order.specialRequests || 'None provided'}
=======================================
Notification sent via Md. Zobaer Ahmed Portfolio System.
`;

  return await dispatchEmail({
    subject: emailSubject,
    from_name: "Portfolio Print Shop",
    name: order.contactName,
    email: order.emailAddress,
    phone: order.phoneNo,
    message: emailMessage,
    order_id: order.orderId,
    total_bdt: order.totalBDT
  });
}

export async function sendMessageNotificationEmail(formState) {
  const emailSubject = `[PORTFOLIO CONTACT] ${formState.subject || 'New Inquiry'} from ${formState.name}`;
  const emailMessage = `
📬 NEW CONTACT MESSAGE FROM PORTFOLIO
=======================================
Sender Name: ${formState.name}
Sender Email: ${formState.email}
Subject: ${formState.subject || 'Portfolio Inquiry'}
Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (Dhaka)

💬 MESSAGE:
${formState.message}
=======================================
Direct Reply Email: ${formState.email}
`;

  return await dispatchEmail({
    subject: emailSubject,
    from_name: formState.name,
    name: formState.name,
    email: formState.email,
    message: emailMessage
  });
}

export async function sendTestEmailNotification(customKey) {
  const adminEmail = getAdminEmail();
  const accessKey = customKey || getWeb3FormsKey();

  if (customKey) {
    setWeb3FormsKey(customKey);
  }

  const result = await dispatchEmail({
    access_key: accessKey,
    subject: `[TEST SUCCESS] Portfolio Email System is Active!`,
    from_name: "Md. Zobaer Ahmed Portfolio",
    name: "Portfolio Admin Test",
    email: adminEmail,
    message: `Hello Zobaer! 🎉\n\nYour portfolio email notification system is working perfectly. From now on, whenever someone orders a fine art print or sends you a contact message, you will receive an instant email right here at ${adminEmail}.\n\nTime: ${new Date().toLocaleString()}`
  });

  return result;
}
