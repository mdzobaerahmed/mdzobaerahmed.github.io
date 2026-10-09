import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Lock, Key, Shield, Image, Plus, Trash2, Download, 
  FileText, Mail, CheckCircle2, AlertCircle, ShoppingBag, Eye,
  LogOut, RefreshCw, Upload, Sparkles, Phone, MapPin, Tag, ExternalLink,
  Edit3, X, Save, RotateCcw, Database, Cloud, Send, Copy, Check
} from 'lucide-react';
import { 
  getStoredPhotos, addPhotoToGallery, updatePhotoInGallery, deletePhotoFromGallery, resetPhotosToDefault,
  getStoredProjects, addAcademicProject, deleteAcademicProject,
  getStoredPrintOrders, updatePrintOrderStatus, deletePrintOrder, exportOrdersToPDF,
  getStoredMessages, deleteStoredMessage,
  verifyAdminPassword, setAdminPassword, getAdminEmail, setAdminEmail,
  syncFromSupabase
} from '../services/dataService';
import { getWeb3FormsKey, setWeb3FormsKey, sendTestEmailNotification } from '../services/emailService';
import { getSupabaseConfig, saveSupabaseConfig, isSupabaseConfigured } from '../services/supabaseClient';

export function AdminPage({ darkMode, onBack }) {
  // Auth state (session-based)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('mza_admin_logged_in') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'photos' | 'messages' | 'projects' | 'settings'

  // Data state
  const [photos, setPhotos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  // New Photo Form
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'Street',
    location: 'Dhaka, Bangladesh',
    aspect: 'vertical',
    imageUrl: '',
    camera: 'Fujifilm X-T5',
    lens: 'Fujinon XF 35mm f/1.4 R',
    focalLength: '35mm',
    aperture: 'f/2.0',
    shutterSpeed: '1/250s',
    iso: '200',
    filmSimulation: 'Classic Chrome',
    story: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  // Editing Photo State
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: 'Street',
    location: '',
    aspect: 'horizontal',
    imageUrl: '',
    camera: '',
    lens: '',
    focalLength: '',
    aperture: '',
    shutterSpeed: '',
    iso: '',
    filmSimulation: '',
    story: ''
  });
  const [editPreviewImage, setEditPreviewImage] = useState('');

  // Settings State
  const [newPassword, setNewPassword] = useState('');
  const [adminEmail, setAdminEmailState] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Web3Forms & Supabase Settings
  const [web3FormsKey, setWeb3FormsKeyState] = useState(() => getWeb3FormsKey());
  const [testEmailStatus, setTestEmailStatus] = useState('');
  const [testEmailLoading, setTestEmailLoading] = useState(false);

  const [supabaseUrl, setSupabaseUrlState] = useState(() => getSupabaseConfig().url);
  const [supabaseAnonKey, setSupabaseAnonKeyState] = useState(() => getSupabaseConfig().anonKey);
  const [syncStatus, setSyncStatus] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadAllData = () => {
    setPhotos(getStoredPhotos());
    setOrders(getStoredPrintOrders());
    setMessages(getStoredMessages());
    setProjects(getStoredProjects());
    setAdminEmailState(getAdminEmail());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      sessionStorage.setItem('mza_admin_logged_in', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Default is "admin2026"');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mza_admin_logged_in');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Image file upload handler (converts to base64 data URL)
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setPhotoForm(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.imageUrl) {
      alert("Please provide at least a Title and an Image (Upload file or enter URL).");
      return;
    }

    addPhotoToGallery({
      title: photoForm.title,
      category: photoForm.category,
      location: photoForm.location,
      aspect: photoForm.aspect,
      imageUrl: photoForm.imageUrl,
      story: photoForm.story || "Visual study documented on Fujifilm sensor.",
      exif: {
        camera: photoForm.camera,
        lens: photoForm.lens,
        focalLength: photoForm.focalLength,
        aperture: photoForm.aperture,
        shutterSpeed: photoForm.shutterSpeed,
        iso: photoForm.iso,
        filmSimulation: photoForm.filmSimulation
      }
    });

    setPhotos(getStoredPhotos());
    setPhotoForm({
      title: '',
      category: 'Street',
      location: 'Dhaka, Bangladesh',
      aspect: 'vertical',
      imageUrl: '',
      camera: 'Fujifilm X-T5',
      lens: 'Fujinon XF 35mm f/1.4 R',
      focalLength: '35mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/250s',
      iso: '200',
      filmSimulation: 'Classic Chrome',
      story: ''
    });
    setPreviewImage('');
    alert("Photo successfully added to Portfolio and Exhibition Gallery!");
  };

  const handleDeletePhoto = (photoId, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deletePhotoFromGallery(photoId);
      setPhotos(getStoredPhotos());
    }
  };

  const handleStartEdit = (photo) => {
    setEditingPhoto(photo);
    setEditForm({
      title: photo.title || '',
      category: photo.category || 'Street',
      location: photo.location || 'Dhaka, Bangladesh',
      aspect: photo.aspect || 'horizontal',
      imageUrl: photo.imageUrl || '',
      camera: photo.exif?.camera || 'Fujifilm X-T5',
      lens: photo.exif?.lens || 'Fujinon XF 35mm f/1.4 R',
      focalLength: photo.exif?.focalLength || '35mm',
      aperture: photo.exif?.aperture || 'f/2.0',
      shutterSpeed: photo.exif?.shutterSpeed || '1/250s',
      iso: photo.exif?.iso || '200',
      filmSimulation: photo.exif?.filmSimulation || 'Classic Chrome',
      story: photo.story || ''
    });
    setEditPreviewImage(photo.imageUrl || '');
  };

  const handleEditImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPreviewImage(reader.result);
        setEditForm(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.title || !editForm.imageUrl) {
      alert("Please provide at least a Title and an Image URL or uploaded file.");
      return;
    }

    updatePhotoInGallery(editingPhoto.id, {
      title: editForm.title,
      category: editForm.category,
      location: editForm.location,
      aspect: editForm.aspect,
      imageUrl: editForm.imageUrl,
      story: editForm.story,
      exif: {
        camera: editForm.camera,
        lens: editForm.lens,
        focalLength: editForm.focalLength,
        aperture: editForm.aperture,
        shutterSpeed: editForm.shutterSpeed,
        iso: editForm.iso,
        filmSimulation: editForm.filmSimulation
      }
    });

    setPhotos(getStoredPhotos());
    setEditingPhoto(null);
    alert(`Photograph "${editForm.title}" updated successfully!`);
  };

  const handleResetPhotos = () => {
    if (window.confirm("Restore gallery photographs to default set? Any custom edits or added photos will be reset.")) {
      resetPhotosToDefault();
      setPhotos(getStoredPhotos());
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updatePrintOrderStatus(orderId, newStatus);
    setOrders(getStoredPrintOrders());
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Delete order ${orderId}?`)) {
      deletePrintOrder(orderId);
      setOrders(getStoredPrintOrders());
    }
  };

  const handleDeleteMsg = (id) => {
    deleteStoredMessage(id);
    setMessages(getStoredMessages());
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (newPassword.trim()) {
      setAdminPassword(newPassword.trim());
      setNewPassword('');
    }
    if (adminEmail.trim()) {
      setAdminEmail(adminEmail.trim());
    }
    setWeb3FormsKey(web3FormsKey.trim());
    saveSupabaseConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    setSaveSuccessMsg("All Settings (Email, Password, Web3Forms Key & Supabase) saved successfully!");
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleSendTestEmail = async () => {
    if (!web3FormsKey.trim()) {
      alert("Please enter and save your Web3Forms Access Key first!");
      return;
    }
    setTestEmailLoading(true);
    setTestEmailStatus("Sending test notification to " + adminEmail + "...");
    try {
      const res = await sendTestEmailNotification(web3FormsKey);
      if (res.success) {
        setTestEmailStatus("✅ Test email sent! Check your inbox/spam at " + adminEmail);
      } else {
        setTestEmailStatus("❌ " + (res.message || "Failed to send test email"));
      }
    } catch (err) {
      setTestEmailStatus("❌ Error: " + err.message);
    } finally {
      setTestEmailLoading(false);
    }
  };

  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    setSyncStatus("Connecting & syncing data with Supabase...");
    try {
      const res = await syncFromSupabase();
      if (res.success) {
        loadAllData();
        setSyncStatus(`✅ Successfully synced ${res.count || 0} items from Supabase cloud!`);
      } else {
        setSyncStatus(`❌ Sync error: ${res.error || res.reason || 'Check table names in SQL editor'}`);
      }
    } catch (err) {
      setSyncStatus(`❌ Exception: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopySql = () => {
    const sqlCode = `-- 1. Gallery Photos Table
create table if not exists gallery_photos (
  id text primary key,
  title text not null,
  category text,
  location text,
  aspect text,
  image_url text not null,
  story text,
  exif jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Print Orders Table
create table if not exists print_orders (
  id text primary key,
  contact_name text not null,
  phone_no text not null,
  email_address text not null,
  shipping_address text not null,
  payment_method text not null,
  transaction_id text,
  total_bdt numeric,
  total_usd numeric,
  items jsonb,
  special_requests text,
  status text default 'PENDING_VERIFICATION',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Contact Messages Table
create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table gallery_photos enable row level security;
alter table print_orders enable row level security;
alter table contact_messages enable row level security;

create policy "Allow all photos access" on gallery_photos for all using (true) with check (true);
create policy "Allow all orders access" on print_orders for all using (true) with check (true);
create policy "Allow all messages access" on contact_messages for all using (true) with check (true);`;

    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen py-24 flex items-center justify-center px-4 ${
        darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}>
        <div className={`w-full max-w-md p-8 rounded-2xl border transition-all shadow-2xl ${
          darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-500 hover:text-amber-400"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
            <span className="font-mono text-[10px] text-slate-500">MZA // PORTAL</span>
          </div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Protected console for photo uploads & order management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                    darkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-600' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {loginError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Access Dashboard
            </button>

            <p className="text-[11px] text-slate-500 text-center font-mono pt-2">
              Default password: <span className="text-amber-500 font-bold">admin2026</span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  const totalRevenueBDT = orders.reduce((sum, o) => sum + (o.totalBDT || 0), 0);
  const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalUSD || 0), 0);

  return (
    <div className={`min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans ${
      darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-800 hover:border-amber-500/40 text-amber-500 transition-colors cursor-pointer"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>COMMAND CENTER // VERIFIED SESSION</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Zobaer Ahmed — Admin Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportOrdersToPDF(orders)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Orders PDF</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl border border-slate-800 hover:border-red-500/40 hover:text-red-400 text-slate-400 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Metric Badges Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0E1524]/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-slate-500 text-[11px]">PRINT ORDERS</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">{orders.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">৳{totalRevenueBDT.toLocaleString()} BDT Total</div>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0E1524]/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-slate-500 text-[11px]">PORTFOLIO PHOTOS</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{photos.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Exhibition & Gallery</div>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0E1524]/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-slate-500 text-[11px]">CONTACT INQUIRIES</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{messages.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Direct Messages</div>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0E1524]/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-slate-500 text-[11px]">ACADEMIC PROJECTS</div>
            <div className="text-2xl font-bold text-slate-200 mt-1">{projects.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Workly, Sockets, etc.</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders' 
                ? 'bg-amber-500 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Print Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'photos' 
                ? 'bg-amber-500 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Manage Photos ({photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'messages' 
                ? 'bg-amber-500 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings' 
                ? 'bg-amber-500 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

        {/* TAB 1: PRINT ORDERS & PDF EXPORT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Customer Print Orders</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Orders submitted through the Fine Art Print Shop with bKash/Nagad verification
                </p>
              </div>

              <button
                onClick={() => exportOrdersToPDF(orders)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer w-fit"
              >
                <Download className="w-4 h-4" />
                <span>Download All Orders (PDF)</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border font-mono text-xs text-slate-500 ${
                darkMode ? 'bg-[#0E1524]/40 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                No print orders received yet. Once customers place orders in the Print Shop, they will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <div
                    key={order.orderId || idx}
                    className={`p-6 rounded-2xl border transition-all ${
                      darkMode ? 'bg-[#0E1524]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/60">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs mb-1">
                          <span className="text-amber-500 font-bold">{order.orderId}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400">{new Date(order.timestamp).toLocaleString()}</span>
                        </div>
                        <h3 className="text-lg font-bold">{order.contactName}</h3>
                        <p className="text-xs text-slate-400 font-mono flex items-center gap-3 mt-1">
                          <span>Phone: {order.phoneNo}</span>
                          <span>Email: {order.emailAddress}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={order.status || 'PENDING_VERIFICATION'}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs border cursor-pointer ${
                            order.status === 'COMPLETED' 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                              : order.status === 'CONFIRMED'
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          }`}
                        >
                          <option value="PENDING_VERIFICATION" className="bg-slate-900 text-white">Pending Verification</option>
                          <option value="CONFIRMED" className="bg-slate-900 text-white">Payment Confirmed</option>
                          <option value="SHIPPED" className="bg-slate-900 text-white">Shipped / In Transit</option>
                          <option value="COMPLETED" className="bg-slate-900 text-white">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteOrder(order.orderId)}
                          className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <div className="text-slate-500 uppercase text-[10px] mb-1">SHIPPING ADDRESS</div>
                        <p className="text-slate-300 font-sans">{order.shippingAddress || 'Not specified'}</p>
                        {order.specialRequests && (
                          <p className="text-slate-400 mt-2 text-[11px] italic">Note: "{order.specialRequests}"</p>
                        )}
                      </div>

                      <div>
                        <div className="text-slate-500 uppercase text-[10px] mb-1">PAYMENT AUDIT</div>
                        <p className="text-slate-300">
                          Method: <strong className="text-amber-400">{order.paymentMethod}</strong>
                        </p>
                        <p className="text-slate-300">
                          Transaction ID: <code className="bg-black/40 px-2 py-0.5 rounded text-amber-400 font-bold">{order.transactionId}</code>
                        </p>
                        <p className="text-slate-300 mt-1 font-bold">
                          Total: ৳{order.totalBDT?.toLocaleString()} BDT (${order.totalUSD} USD)
                        </p>
                      </div>
                    </div>

                    {/* Ordered items breakdown */}
                    <div className="mt-4 pt-3 border-t border-slate-800/40 font-mono text-xs">
                      <div className="text-slate-500 text-[10px] uppercase mb-1">ORDERED ITEMS:</div>
                      <div className="space-y-1">
                        {order.items?.map((item, iIdx) => (
                          <div key={iIdx} className="flex justify-between items-center text-slate-300">
                            <span>• {item.title} ({item.paper} {item.size}) x {item.quantity}</span>
                            <span className="text-amber-400 font-bold">${item.itemTotal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE PHOTOS (UPLOAD / DELETE) */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            
            {/* Upload New Photo Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                <span>Upload / Add New Photograph</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Uploaded images immediately appear in your Portfolio and Exhibition Gallery
              </p>

              <form onSubmit={handleAddPhoto} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Image file upload / URL */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Upload Image File (From Computer)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer ${
                          darkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Or Image URL
                      </label>
                      <input
                        type="url"
                        value={photoForm.imageUrl}
                        onChange={(e) => {
                          setPhotoForm(prev => ({ ...prev, imageUrl: e.target.value }));
                          setPreviewImage(e.target.value);
                        }}
                        placeholder="https://... or paste image URL"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    {/* Preview box */}
                    {previewImage && (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400">
                          Ready to Publish
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Meta Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Photo Title *</label>
                      <input
                        type="text"
                        required
                        value={photoForm.title}
                        onChange={(e) => setPhotoForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Quiet Alleyway at Midnight"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">Category</label>
                        <select
                          value={photoForm.category}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, category: e.target.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Street">Street</option>
                          <option value="Architecture">Architecture</option>
                          <option value="Landscape">Landscape</option>
                          <option value="Portrait">Portrait</option>
                          <option value="Documentary">Documentary</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">Location</label>
                        <input
                          type="text"
                          value={photoForm.location}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Dhaka, Bangladesh"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10.5px] font-mono text-slate-400 mb-1">Camera</label>
                        <input
                          type="text"
                          value={photoForm.camera}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, camera: e.target.value }))}
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono text-slate-400 mb-1">Aperture</label>
                        <input
                          type="text"
                          value={photoForm.aperture}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, aperture: e.target.value }))}
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono text-slate-400 mb-1">Shutter</label>
                        <input
                          type="text"
                          value={photoForm.shutterSpeed}
                          onChange={(e) => setPhotoForm(prev => ({ ...prev, shutterSpeed: e.target.value }))}
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Story / Curatorial Description</label>
                      <textarea
                        rows={2}
                        value={photoForm.story}
                        onChange={(e) => setPhotoForm(prev => ({ ...prev, story: e.target.value }))}
                        placeholder="Short story or notes about this capture..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono ${
                          darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                        }`}
                      ></textarea>
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Photo to Gallery</span>
                </button>
              </form>
            </div>

            {/* Existing Photos Grid with Edit and Delete options */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-bold font-mono">
                  Existing Photographs in Gallery ({photos.length})
                </h3>
                <button
                  onClick={handleResetPhotos}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                  title="Reset gallery photographs to original default set"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Default Photos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${
                      darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="relative aspect-4/3 bg-slate-950">
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-amber-400">
                        {photo.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm truncate" title={photo.title}>{photo.title}</h4>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{photo.location}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/50 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-500 truncate max-w-[80px]" title={photo.exif?.camera}>
                          {photo.exif?.camera || 'Fujifilm'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleStartEdit(photo)}
                            className="px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Edit photo image and information"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id, photo.title)}
                            className="px-2 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Photo Interactive Modal */}
            {editingPhoto && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div 
                  className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 sm:p-8 ${
                    darkMode ? 'bg-[#0E1524] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                    <div>
                      <span className="font-mono text-[10px] text-amber-500 tracking-wider uppercase font-semibold">
                        EDIT PHOTOGRAPH // ID: {editingPhoto.id}
                      </span>
                      <h3 className="text-xl font-bold mt-0.5">Edit Photo: {editingPhoto.title}</h3>
                    </div>
                    <button
                      onClick={() => setEditingPhoto(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Edit Form */}
                  <form onSubmit={handleSaveEdit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Image Replacement */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                            Photo Preview
                          </label>
                          <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                            <img 
                              src={editPreviewImage || editForm.imageUrl} 
                              alt="Edit preview" 
                              className="w-full h-full object-cover" 
                            />
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400">
                              Aspect: {editForm.aspect}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            Change Image File (Upload from Computer)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditImageFileUpload}
                            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer ${
                              darkMode ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1.5">
                            Or New Image URL
                          </label>
                          <input
                            type="url"
                            value={editForm.imageUrl}
                            onChange={(e) => {
                              setEditForm(prev => ({ ...prev, imageUrl: e.target.value }));
                              setEditPreviewImage(e.target.value);
                            }}
                            placeholder="https://... image link"
                            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                              className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
                                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                              }`}
                            >
                              <option value="Street">Street</option>
                              <option value="Architecture">Architecture</option>
                              <option value="Landscape">Landscape</option>
                              <option value="Portrait">Portrait</option>
                              <option value="Documentary">Documentary</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-400 mb-1">Aspect Ratio</label>
                            <select
                              value={editForm.aspect}
                              onChange={(e) => setEditForm(prev => ({ ...prev, aspect: e.target.value }))}
                              className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
                                darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                              }`}
                            >
                              <option value="vertical">Vertical (3:4)</option>
                              <option value="horizontal">Horizontal (4:3)</option>
                              <option value="square">Square (1:1)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Right: Title, Location & EXIF */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Photo Title *</label>
                          <input
                            type="text"
                            required
                            value={editForm.title}
                            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                          <input
                            type="text"
                            value={editForm.location}
                            onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                            }`}
                          />
                        </div>

                        <div className="pt-2 border-t border-slate-800/60">
                          <div className="text-[11px] font-mono text-amber-500 font-bold uppercase mb-2">Camera & EXIF Data</div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Camera Body</label>
                              <input
                                type="text"
                                value={editForm.camera}
                                onChange={(e) => setEditForm(prev => ({ ...prev, camera: e.target.value }))}
                                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Lens</label>
                              <input
                                type="text"
                                value={editForm.lens}
                                onChange={(e) => setEditForm(prev => ({ ...prev, lens: e.target.value }))}
                                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Aperture</label>
                              <input
                                type="text"
                                value={editForm.aperture}
                                onChange={(e) => setEditForm(prev => ({ ...prev, aperture: e.target.value }))}
                                className={`w-full px-2 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Shutter Speed</label>
                              <input
                                type="text"
                                value={editForm.shutterSpeed}
                                onChange={(e) => setEditForm(prev => ({ ...prev, shutterSpeed: e.target.value }))}
                                className={`w-full px-2 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">ISO</label>
                              <input
                                type="text"
                                value={editForm.iso}
                                onChange={(e) => setEditForm(prev => ({ ...prev, iso: e.target.value }))}
                                className={`w-full px-2 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Focal Length</label>
                              <input
                                type="text"
                                value={editForm.focalLength}
                                onChange={(e) => setEditForm(prev => ({ ...prev, focalLength: e.target.value }))}
                                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">Film Simulation</label>
                              <input
                                type="text"
                                value={editForm.filmSimulation}
                                onChange={(e) => setEditForm(prev => ({ ...prev, filmSimulation: e.target.value }))}
                                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Story / Description</label>
                          <textarea
                            rows={2}
                            value={editForm.story}
                            onChange={(e) => setEditForm(prev => ({ ...prev, story: e.target.value }))}
                            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
                              darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                            }`}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingPhoto(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-mono text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: CONTACT INQUIRIES & MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Contact Messages Received</h2>

            {messages.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border font-mono text-xs text-slate-500 ${
                darkMode ? 'bg-[#0E1524]/40 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                No contact messages yet. Messages sent via the portfolio footer will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className={`p-6 rounded-2xl border ${
                      darkMode ? 'bg-[#0E1524]/80 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div>
                        <span className="font-bold text-base">{msg.name}</span>
                        <span className="text-slate-500 text-xs font-mono ml-2">({msg.email})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-amber-500">
                          {new Date(msg.timestamp || Date.now()).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {msg.subject && (
                      <p className="font-mono text-xs text-amber-400/90 mb-2 font-semibold">
                        Subject: {msg.subject}
                      </p>
                    )}

                    <p className={`text-sm leading-relaxed p-3 rounded-xl ${
                      darkMode ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-50 text-slate-700'
                    }`}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS (WEB3FORMS EMAIL, SUPABASE CLOUD & SECURITY) */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">

            {/* SECTION 1: DIRECT EMAIL NOTIFICATION (WEB3FORMS) */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-500" />
                    <span>Direct Gmail Notification Setup</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Receive instant emails when customers place print orders or submit contact messages
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {web3FormsKey ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Email Delivery Active</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Key Required</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 font-mono text-xs text-amber-300/90 leading-relaxed">
                <span className="font-bold">💡 How to get your free key (Takes 10 seconds):</span>
                <ol className="list-decimal list-inside mt-1.5 space-y-1 text-slate-300">
                  <li>Visit <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold inline-flex items-center gap-0.5">web3forms.com <ExternalLink className="w-3 h-3 inline" /></a></li>
                  <li>Enter your email: <span className="text-white font-semibold">{adminEmail}</span></li>
                  <li>Check your inbox for the Access Key and paste it below. (100% Free, no credit card, no password).</li>
                </ol>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Web3Forms Access Key
                  </label>
                  <input
                    type="text"
                    value={web3FormsKey}
                    onChange={(e) => setWeb3FormsKeyState(e.target.value)}
                    placeholder="e.g. 524a87b1-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={testEmailLoading}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{testEmailLoading ? "Sending..." : "Send Test Email to My Inbox"}</span>
                  </button>

                  {testEmailStatus && (
                    <span className="text-xs font-mono text-slate-300">{testEmailStatus}</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: SUPABASE CLOUD DATABASE INTEGRATION */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span>Supabase Cloud Database Sync</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Persist all photographs, print orders, and messages in a permanent PostgreSQL cloud database
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isSupabaseConfigured() ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Connected (Cloud Active)</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[11px] font-mono flex items-center gap-1.5">
                      <span>Local Storage Mode</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrlState(e.target.value)}
                    placeholder="https://your-project-id.supabase.co"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKeyState(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleSyncSupabase}
                  disabled={isSyncing || !isSupabaseConfigured()}
                  className="px-4 py-2 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? "Syncing..." : "Sync Cloud Data Now"}</span>
                </button>

                {syncStatus && (
                  <span className="text-xs font-mono text-slate-300">{syncStatus}</span>
                )}
              </div>

              {/* Collapsible / Copyable SQL Schema */}
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    📋 Supabase Table Setup (Run once in Supabase SQL Editor):
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto max-h-36 p-3 rounded-lg bg-black/50 border border-slate-800/80">
{`-- 1. Gallery Photos Table
create table if not exists gallery_photos (
  id text primary key,
  title text not null,
  category text,
  location text,
  aspect text,
  image_url text not null,
  story text,
  exif jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Print Orders Table
create table if not exists print_orders (
  id text primary key,
  contact_name text not null,
  phone_no text not null,
  email_address text not null,
  shipping_address text not null,
  payment_method text not null,
  transaction_id text,
  total_bdt numeric,
  total_usd numeric,
  items jsonb,
  special_requests text,
  status text default 'PENDING_VERIFICATION',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Contact Messages Table
create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);`}
                </pre>
              </div>
            </div>

            {/* SECTION 3: CREDENTIALS & SAVE BUTTON */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              darkMode ? 'bg-[#0E1524] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h2 className="text-xl font-bold mb-4 font-mono flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-500" />
                <span>Admin Credentials & Security</span>
              </h2>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Admin Notification Email
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmailState(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Change Admin Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (leave blank to keep current)..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                {saveSuccessMsg && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{saveSuccessMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;
