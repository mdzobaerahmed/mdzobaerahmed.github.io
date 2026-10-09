import { photographyGallery, engineeringProjects, certificationsAndAwards, certificationsData, experienceTimeline, educationList } from '../data/portfolioData';
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  PHOTOS: 'mza_gallery_photos_v1',
  PROJECTS: 'mza_academic_projects_v1',
  ORDERS: 'mza_print_orders',
  MESSAGES: 'mza_contact_messages',
  ADMIN_PASSWORD: 'mza_admin_password_hash',
  ADMIN_EMAIL: 'mza_admin_notification_email'
};

// 1. Photo Gallery Management
export function getStoredPhotos() {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    if (custom) {
      return JSON.parse(custom);
    }
  } catch (e) {
    console.error("Error reading stored photos:", e);
  }
  return photographyGallery;
}

export function saveStoredPhotos(photos) {
  try {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    window.dispatchEvent(new Event('mza_data_updated'));
  } catch (e) {
    console.error("Error saving stored photos:", e);
  }
}

export function addPhotoToGallery(newPhoto) {
  const photos = getStoredPhotos();
  const photoWithId = {
    id: `photo-custom-${Date.now()}`,
    year: new Date().getFullYear().toString(),
    ...newPhoto
  };
  const updated = [photoWithId, ...photos];
  saveStoredPhotos(updated);

  // Sync to Supabase cloud if active
  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('gallery_photos').insert([{
      id: photoWithId.id,
      title: photoWithId.title,
      category: photoWithId.category,
      location: photoWithId.location,
      aspect: photoWithId.aspect,
      image_url: photoWithId.imageUrl,
      story: photoWithId.story,
      exif: photoWithId.exif
    }]).then(({ error }) => {
      if (error) console.error("Supabase insert photo error:", error);
    });
  }

  return photoWithId;
}

export function updatePhotoInGallery(photoId, updatedData) {
  const photos = getStoredPhotos();
  let targetPhoto = null;
  const updated = photos.map(p => {
    if (p.id === photoId) {
      targetPhoto = {
        ...p,
        ...updatedData,
        exif: {
          ...(p.exif || {}),
          ...(updatedData.exif || {})
        }
      };
      return targetPhoto;
    }
    return p;
  });
  saveStoredPhotos(updated);

  // Sync to Supabase cloud if active
  const supabase = getSupabaseClient();
  if (supabase && targetPhoto) {
    supabase.from('gallery_photos').upsert([{
      id: photoId,
      title: targetPhoto.title,
      category: targetPhoto.category,
      location: targetPhoto.location,
      aspect: targetPhoto.aspect,
      image_url: targetPhoto.imageUrl,
      story: targetPhoto.story,
      exif: targetPhoto.exif
    }]).then(({ error }) => {
      if (error) console.error("Supabase update photo error:", error);
    });
  }

  return updated;
}

export function resetPhotosToDefault() {
  localStorage.removeItem(STORAGE_KEYS.PHOTOS);
  window.dispatchEvent(new Event('mza_data_updated'));
  return photographyGallery;
}

export function deletePhotoFromGallery(photoId) {
  const photos = getStoredPhotos();
  const updated = photos.filter(p => p.id !== photoId);
  saveStoredPhotos(updated);

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('gallery_photos').delete().eq('id', photoId).then(({ error }) => {
      if (error) console.error("Supabase delete photo error:", error);
    });
  }
}

// 2. Academic Projects Management
export function getStoredProjects() {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (custom) {
      return JSON.parse(custom);
    }
  } catch (e) {
    console.error("Error reading stored projects:", e);
  }
  return engineeringProjects;
}

export function saveStoredProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    window.dispatchEvent(new Event('mza_data_updated'));
  } catch (e) {
    console.error("Error saving stored projects:", e);
  }
}

export function addAcademicProject(project) {
  const current = getStoredProjects();
  const newProj = {
    id: `proj-custom-${Date.now()}`,
    stars: 10,
    forks: 2,
    ...project
  };
  const updated = [newProj, ...current];
  saveStoredProjects(updated);
  return newProj;
}

export function deleteAcademicProject(projectId) {
  const current = getStoredProjects();
  const updated = current.filter(p => p.id !== projectId);
  saveStoredProjects(updated);
}

// 3. Print Orders Management
export function getStoredPrintOrders() {
  try {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  } catch (e) {
    console.error("Error reading print orders:", e);
    return [];
  }
}

export function saveStoredPrintOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new Event('mza_data_updated'));
  } catch (e) {
    console.error("Error saving print orders:", e);
  }
}

export function addPrintOrder(newOrder) {
  const orders = getStoredPrintOrders();
  const updated = [newOrder, ...orders];
  saveStoredPrintOrders(updated);

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('print_orders').insert([{
      id: newOrder.orderId,
      contact_name: newOrder.contactName,
      phone_no: newOrder.phoneNo,
      email_address: newOrder.emailAddress,
      shipping_address: newOrder.shippingAddress,
      payment_method: newOrder.paymentMethod,
      transaction_id: newOrder.transactionId,
      total_bdt: newOrder.totalBDT,
      total_usd: newOrder.totalUSD,
      items: newOrder.items,
      special_requests: newOrder.specialRequests,
      status: newOrder.status || 'PENDING_VERIFICATION'
    }]).then(({ error }) => {
      if (error) console.error("Supabase insert order error:", error);
    });
  }
  return updated;
}

export function updatePrintOrderStatus(orderId, newStatus) {
  const orders = getStoredPrintOrders();
  const updated = orders.map(ord => ord.orderId === orderId ? { ...ord, status: newStatus } : ord);
  saveStoredPrintOrders(updated);

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('print_orders').update({ status: newStatus }).eq('id', orderId).then(({ error }) => {
      if (error) console.error("Supabase update order status error:", error);
    });
  }
}

export function deletePrintOrder(orderId) {
  const orders = getStoredPrintOrders();
  const updated = orders.filter(ord => ord.orderId !== orderId);
  saveStoredPrintOrders(updated);

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('print_orders').delete().eq('id', orderId).then(({ error }) => {
      if (error) console.error("Supabase delete order error:", error);
    });
  }
}

// 4. Contact Messages Management
export function getStoredMessages() {
  try {
    const msgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return msgs ? JSON.parse(msgs) : [];
  } catch (e) {
    console.error("Error reading contact messages:", e);
    return [];
  }
}

export function addContactMessage(messageData) {
  const existing = getStoredMessages();
  const newMsg = {
    id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...messageData
  };
  const updated = [newMsg, ...existing];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  window.dispatchEvent(new Event('mza_data_updated'));

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('contact_messages').insert([{
      id: newMsg.id,
      name: newMsg.name,
      email: newMsg.email,
      subject: newMsg.subject || '',
      message: newMsg.message
    }]).then(({ error }) => {
      if (error) console.error("Supabase insert message error:", error);
    });
  }
  return newMsg;
}

export function deleteStoredMessage(messageId) {
  const msgs = getStoredMessages();
  const updated = msgs.filter(m => m.id !== messageId);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  window.dispatchEvent(new Event('mza_data_updated'));

  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('contact_messages').delete().eq('id', messageId).then(({ error }) => {
      if (error) console.error("Supabase delete message error:", error);
    });
  }
}

// 5. Cloud Sync
export async function syncFromSupabase() {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: false, reason: "Supabase not configured" };

  try {
    const [photosRes, ordersRes, msgsRes] = await Promise.all([
      supabase.from('gallery_photos').select('*'),
      supabase.from('print_orders').select('*'),
      supabase.from('contact_messages').select('*')
    ]);

    let syncedCount = 0;

    if (!photosRes.error && photosRes.data && photosRes.data.length > 0) {
      const mappedPhotos = photosRes.data.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        aspect: p.aspect,
        imageUrl: p.image_url,
        story: p.story,
        exif: p.exif
      }));
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(mappedPhotos));
      syncedCount += mappedPhotos.length;
    }

    if (!ordersRes.error && ordersRes.data && ordersRes.data.length > 0) {
      const mappedOrders = ordersRes.data.map(o => ({
        orderId: o.id,
        contactName: o.contact_name,
        phoneNo: o.phone_no,
        emailAddress: o.email_address,
        shippingAddress: o.shipping_address,
        paymentMethod: o.payment_method,
        transactionId: o.transaction_id,
        totalBDT: o.total_bdt,
        totalUSD: o.total_usd,
        items: o.items,
        specialRequests: o.special_requests,
        status: o.status,
        timestamp: o.created_at
      }));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mappedOrders));
      syncedCount += mappedOrders.length;
    }

    if (!msgsRes.error && msgsRes.data && msgsRes.data.length > 0) {
      const mappedMsgs = msgsRes.data.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        timestamp: m.created_at
      }));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mappedMsgs));
      syncedCount += mappedMsgs.length;
    }

    window.dispatchEvent(new Event('mza_data_updated'));
    return { success: true, count: syncedCount };
  } catch (err) {
    console.error("Supabase sync exception:", err);
    return { success: false, error: err.message };
  }
}

// 6. Admin Authentication (Cryptographic SHA-256 Hash Protection)
const DEFAULT_ADMIN_HASH = '6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6';

export async function hashString(str) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

export async function verifyAdminPassword(inputPass) {
  if (!inputPass) return false;
  const inputHash = await hashString(inputPass.trim());
  const storedHash = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || DEFAULT_ADMIN_HASH;
  return inputHash === storedHash;
}

export async function setAdminPassword(newPass) {
  if (!newPass) return;
  const newHash = await hashString(newPass.trim());
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newHash);
}

export function getAdminEmail() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_EMAIL) || 'mdzobaerahmed31@gmail.com';
}

export function setAdminEmail(email) {
  localStorage.setItem(STORAGE_KEYS.ADMIN_EMAIL, email);
}

// 7. Professional PDF Generation for Orders
export async function exportOrdersToPDF(orders = []) {
  if (!orders || orders.length === 0) {
    alert("No orders available to export!");
    return;
  }

  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [217, 119, 6]; // Amber
  const darkColor = [15, 23, 42]; // Slate-900

  // Document Header
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(16);
  doc.text("MD. ZOBAER AHMED // FINE ART PRINT ORDERS", 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Official Order Summary Report • Generated on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (Dhaka)`, 14, 22);
  doc.text(`Total Orders: ${orders.length}`, 14, 27);

  let currentY = 40;

  orders.forEach((order, idx) => {
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, currentY, 182, 38, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, currentY, 182, 38, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`#${idx + 1} - ${order.orderId}`, 18, currentY + 7);

    doc.setFontSize(9);
    doc.setTextColor(217, 119, 6);
    doc.text(`Status: ${order.status || 'PENDING'}`, 140, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Customer: ${order.contactName} | Phone: ${order.phoneNo}`, 18, currentY + 13);
    doc.text(`Email: ${order.emailAddress} | Payment: ${order.paymentMethod} (TrxID: ${order.transactionId || 'N/A'})`, 18, currentY + 18);
    doc.text(`Shipping Address: ${order.shippingAddress}`, 18, currentY + 23);

    const itemsStr = (order.items || []).map(i => `${i.title} (${i.size}) x${i.quantity}`).join('; ');
    doc.setFont('helvetica', 'italic');
    doc.text(`Items: ${itemsStr || 'None'}`, 18, currentY + 28);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(`Total: BDT ${order.totalBDT} ($${order.totalUSD} USD)`, 18, currentY + 34);

    currentY += 44;
  });

  doc.save(`MZA_Print_Orders_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
