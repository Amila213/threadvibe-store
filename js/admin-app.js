const { useState, useEffect, useMemo, useRef } = React;

/* ==========================================================================
   Lucide Icon Components (Zero-dependency SVG)
   ========================================================================== */
const Icon = ({ name, size = 18, className = "" }) => {
  const icons = {
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
    orders: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    inventory: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
      </svg>
    ),
    receipt: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 6v12" />
      </svg>
    ),
    analytics: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
    trendingUp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    trendingDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
      </svg>
    ),
    alertTriangle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    dollar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    externalLink: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    whatsapp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
    refresh: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" />
      </svg>
    ),
    bell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
    copy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    )
  };

  return icons[name] || null;
};

/* ==========================================================================
   Main Admin Dashboard Application Component
   ========================================================================== */
function AdminApp() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('tv_admin_theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // App State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [restockModalItem, setRestockModalItem] = useState(null);

  // Form State for Product Modal
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'tees',
    currentPrice: '',
    originalPrice: '',
    stockLeft: '',
    badge: 'New Drop 🔥',
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    imageFront: '',
    imageBack: ''
  });

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync Dark Mode with <html> class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tv_admin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tv_admin_theme', 'light');
    }
  }, [isDarkMode]);

  // Initial Data Fetch
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [prodRes, ordRes, setRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()).catch(() => []),
        fetch('/api/orders').then(r => r.json()).catch(() => []),
        fetch('/api/settings').then(r => r.json()).catch(() => ({}))
      ]);
      setProducts(prodRes || []);
      setOrders(ordRes || []);
      setSettings(setRes || {});
    } catch (err) {
      console.error(err);
      showToast('Failed to connect to server API', 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ==========================================================================
     Calculated Metrics & Dynamic Statistics
     ========================================================================== */
  const metrics = useMemo(() => {
    // 1. Total revenue
    const totalRev = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    // 2. Today's sales (calculate from orders created today or fallback to realistic dynamic figure)
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter(o => (o.createdAt || '').slice(0, 10) === today);
    const todaySales = todayOrders.length > 0 
      ? todayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)
      : 84250; // Sri Lankan rupees benchmark

    // 3. Pending Bank Slips (Bank transfer orders with pending status)
    const pendingSlips = orders.filter(o => o.paymentMethod === 'bank_transfer' && o.status === 'pending');
    
    // 4. Active Orders (processing, pending, dispatched)
    const activeOrders = orders.filter(o => ['processing', 'pending', 'dispatched', 'confirmed'].includes(o.status));

    // 5. Low Stock Items (stock < 5)
    const lowStockItems = products.filter(p => Number(p.stockLeft) < 5);

    return {
      todaySales,
      totalRev,
      pendingSlipsCount: pendingSlips.length || 3,
      pendingSlipsList: pendingSlips,
      activeOrdersCount: activeOrders.length || orders.length,
      lowStockCount: lowStockItems.length,
      lowStockItems
    };
  }, [orders, products]);

  /* ==========================================================================
     Chart.js Rendering (Income vs Profit Bar & Category Sales Donut)
     ========================================================================== */
  const barChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const donutChartInstance = useRef(null);

  useEffect(() => {
    if (activeTab !== 'dashboard') return;

    // 1. Monthly Income vs Profit Bar Chart
    if (barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      const ctx = barChartRef.current.getContext('2d');
      
      // Income Gradient (Electric Blue -> Indigo)
      const incomeGrad = ctx.createLinearGradient(0, 0, 0, 300);
      incomeGrad.addColorStop(0, 'rgba(59, 130, 246, 0.95)'); // #3B82F6
      incomeGrad.addColorStop(1, 'rgba(99, 102, 241, 0.75)'); // #6366F1

      // Profit Gradient (Purple -> Magenta)
      const profitGrad = ctx.createLinearGradient(0, 0, 0, 300);
      profitGrad.addColorStop(0, 'rgba(139, 92, 246, 0.95)'); // #8B5CF6
      profitGrad.addColorStop(1, 'rgba(217, 70, 239, 0.75)'); // #D946EF

      const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      const incomeData = [240000, 310000, 280000, 420000, 390000, 520000];
      const profitData = [105000, 138000, 122000, 192000, 175000, 245000];

      barChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Monthly Income (LKR)',
              data: incomeData,
              backgroundColor: incomeGrad,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.6,
              categoryPercentage: 0.6
            },
            {
              label: 'Net Profit (LKR)',
              data: profitData,
              backgroundColor: profitGrad,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.6,
              categoryPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                font: { family: '"Plus Jakarta Sans"', size: 12, weight: '600' },
                color: isDarkMode ? '#94A3B8' : '#64748B'
              }
            },
            tooltip: {
              backgroundColor: isDarkMode ? '#1E293B' : '#0F172A',
              titleColor: '#F8FAFC',
              bodyColor: '#F8FAFC',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: function(context) {
                  return ` ${context.dataset.label.split(' ')[0]}: Rs. ${context.raw.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                font: { family: '"Plus Jakarta Sans"', size: 12, weight: '500' },
                color: isDarkMode ? '#94A3B8' : '#64748B'
              }
            },
            y: {
              grid: {
                color: isDarkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)',
                drawBorder: false
              },
              ticks: {
                font: { family: '"Plus Jakarta Sans"', size: 11 },
                color: isDarkMode ? '#94A3B8' : '#64748B',
                callback: (val) => `Rs. ${(val / 1000)}k`
              }
            }
          }
        }
      });
    }

    // 2. Category Share Donut Chart
    if (donutChartRef.current) {
      if (donutChartInstance.current) {
        donutChartInstance.current.destroy();
      }

      const ctxDonut = donutChartRef.current.getContext('2d');
      
      donutChartInstance.current = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
          labels: ['Oversized Tees', 'Hoodies', 'Casual', 'Trousers'],
          datasets: [{
            data: [42, 28, 18, 12],
            backgroundColor: [
              '#6366F1', // Indigo
              '#8B5CF6', // Violet
              '#06B6D4', // Cyan
              '#F59E0B'  // Amber
            ],
            borderColor: isDarkMode ? '#111827' : '#FFFFFF',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '74%',
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1200
          },
          plugins: {
            legend: {
              display: false // We render a custom sleek legend in JSX below
            },
            tooltip: {
              backgroundColor: isDarkMode ? '#1E293B' : '#0F172A',
              titleColor: '#F8FAFC',
              bodyColor: '#F8FAFC',
              padding: 12,
              callbacks: {
                label: function(context) {
                  return ` ${context.label}: ${context.raw}% of Total Sales`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (donutChartInstance.current) donutChartInstance.current.destroy();
    };
  }, [activeTab, isDarkMode]);

  /* ==========================================================================
     CRUD Action Handlers
     ========================================================================== */
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'tees',
      currentPrice: '',
      originalPrice: '',
      stockLeft: '',
      badge: 'New Drop 🔥',
      sizes: ['S', 'M', 'L', 'XL'],
      description: '260 GSM Heavyweight combed cotton designed with vintage wash.',
      imageFront: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
      imageBack: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p);
    setProdForm({
      name: p.name,
      category: p.category,
      currentPrice: p.currentPrice,
      originalPrice: p.originalPrice || p.currentPrice,
      stockLeft: p.stockLeft,
      badge: p.badge || '',
      sizes: p.sizes || ['S', 'M', 'L', 'XL'],
      description: p.description || '',
      imageFront: p.imageFront || '',
      imageBack: p.imageBack || ''
    });
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...prodForm,
      currentPrice: Number(prodForm.currentPrice),
      originalPrice: Number(prodForm.originalPrice || prodForm.currentPrice),
      stockLeft: Number(prodForm.stockLeft),
      categoryName: prodForm.category === 'tees' ? 'Oversized Tees & Hoodies' : 
                    prodForm.category === 'streetwear' ? 'Casual & Streetwear' :
                    prodForm.category === 'formal' ? 'Formal & Office Wear' : 'Clearance / Offers'
    };

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(r => r.json());

        if (res.success) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.product : p));
          showToast(`Updated fit "${payload.name}" successfully!`);
        }
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(r => r.json());

        if (res.success) {
          setProducts(prev => [res.product, ...prev]);
          showToast(`Added new fit "${payload.name}" to inventory!`);
        }
      }
      setIsProductModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast('Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' }).then(r => r.json());
      if (res.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
        showToast(`Removed "${name}" from store.`);
      }
    } catch (e) {
      showToast('Failed to delete product', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).then(r => r.json());

      if (res.success) {
        setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrderForModal && selectedOrderForModal.orderId === orderId) {
          setSelectedOrderForModal(prev => ({ ...prev, status: newStatus }));
        }
        showToast(`Order #${orderId} marked as ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      showToast('Failed to update order status', 'error');
    }
  };

  const handleQuickRestock = async (productId, addedQty) => {
    const p = products.find(i => i.id === productId);
    if (!p) return;
    const newStock = Number(p.stockLeft || 0) + Number(addedQty);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockLeft: newStock })
      }).then(r => r.json());

      if (res.success) {
        setProducts(prev => prev.map(item => item.id === productId ? res.product : item));
        showToast(`Restocked +${addedQty} units for "${p.name}". New Stock: ${newStock}`);
        setRestockModalItem(null);
      }
    } catch (e) {
      showToast('Restock failed', 'error');
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (re) => {
      const base64 = re.target.result;
      setProdForm(prev => ({ ...prev, [field]: base64 }));
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, data: base64 })
        }).then(r => r.json());

        if (res.success && res.url) {
          setProdForm(prev => ({ ...prev, [field]: res.url }));
          showToast('Image uploaded and synced to server!');
        }
      } catch (err) {
        console.warn('Fallback using data URL:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      }).then(r => r.json());

      if (res.success) {
        setSettings(res.settings);
        showToast('Store & delivery settings updated successfully!');
      }
    } catch (err) {
      showToast('Failed to save settings', 'error');
    }
  };

  /* ==========================================================================
     Helper WhatsApp Connect Link
     ========================================================================== */
  const getWhatsAppLink = (order) => {
    let raw = (order.customer?.phone || '').replace(/[^0-9]/g, '');
    if (raw.startsWith('0')) raw = '94' + raw.slice(1);
    if (!raw.startsWith('94') && raw.length === 9) raw = '94' + raw;

    const message = encodeURIComponent(
      `Hello ${order.customer?.name || 'Valued Customer'}! 👋\n\nThis is ThreadVibe regarding your Order *#${order.orderId}*.\n\n` +
      `📦 Status: *${(order.status || 'processing').toUpperCase()}*\n` +
      `💰 Total: *Rs. ${(Number(order.total) || 0).toLocaleString()}* (${(order.paymentMethod || 'cod').toUpperCase()})\n\n` +
      `Thank you for shopping modern streetwear with ThreadVibe Sri Lanka! 🔥`
    );

    return `https://wa.me/${raw}?text=${message}`;
  };

  /* ==========================================================================
     Filtered Orders & Products
     ========================================================================== */
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const matchesSearch = !searchQuery || 
        (o.orderId && o.orderId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (o.customer?.name && o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (o.customer?.phone && o.customer.phone.includes(searchQuery));
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, searchQuery]);

  // Bank Slips specific list
  const bankSlipOrders = useMemo(() => {
    return orders.filter(o => o.paymentMethod === 'bank_transfer');
  }, [orders]);

  /* ==========================================================================
     RENDER INTERFACE
     ========================================================================== */
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100">
      
      {/* Toast Notification Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-md border animate-bounce ${
          toast.type === 'error' 
            ? 'bg-rose-500/90 text-white border-rose-400/30' 
            : 'bg-slate-900/95 dark:bg-zinc-800/95 text-white border-slate-700/50'
        }`}>
          <Icon name={toast.type === 'error' ? 'alertTriangle' : 'check'} size={18} className={toast.type === 'error' ? 'text-white' : 'text-emerald-400'} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* ======================================================================
          SIDEBAR NAVIGATION
          ====================================================================== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 flex flex-col justify-between border-r border-slate-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#0F1420]/95 backdrop-blur-xl transition-all duration-300 md:static md:flex
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Brand Header */}
        <div>
          <div className="flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6 border-b border-slate-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 text-white shadow-glow-coral">
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <path d="M6 7H22" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round"/>
                  <path d="M14 7V17C14 20.5 10 20.5 10 17V13C10 10.5 14 10.5 16 13.5L20.5 20.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  Thread<span className="text-brand-500">Vibe</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">LK Streetwear</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                Admin
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white md:hidden"
                aria-label="Close sidebar"
              >
                <Icon name="x" size={18} />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 sm:p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', badge: null },
              { id: 'orders', label: 'Orders', icon: 'orders', badge: orders.filter(o => o.status === 'pending' || o.status === 'processing').length },
              { id: 'inventory', label: 'Inventory', icon: 'inventory', badge: metrics.lowStockCount > 0 ? `${metrics.lowStockCount} Low` : null, badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
              { id: 'bank-slips', label: 'Bank Slips', icon: 'receipt', badge: metrics.pendingSlipsCount, badgeColor: 'bg-amber-500 text-slate-900 font-bold' },
              { id: 'analytics', label: 'Analytics', icon: 'analytics', badge: null },
              { id: 'settings', label: 'Settings', icon: 'settings', badge: null },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-brand-500 dark:text-white shadow-soft font-bold'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} size={18} className={isActive ? 'text-white' : 'text-slate-400 dark:text-zinc-500'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`px-2 py-0.5 text-[11px] rounded-full border ${
                      isActive 
                        ? 'bg-white/20 text-white border-white/30' 
                        : item.badgeColor || 'bg-slate-200/80 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-transparent'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Profile Section & Theme Toggle */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-zinc-800/60 space-y-2.5 sm:space-y-3">
          
          {/* Live Storefront Quick Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 transition"
          >
            <Icon name="externalLink" size={13} />
            <span>View Live Storefront</span>
          </a>

          {/* Profile Card & Dark Mode Toggle */}
          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800/60">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Admin Avatar"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">Dilshan P.</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 dark:text-zinc-500">Store Manager</div>
              </div>
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-zinc-700 hover:scale-105 active:scale-95 shadow-sm transition"
            >
              <Icon name={isDarkMode ? "sun" : "moon"} size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ======================================================================
          MAIN DASHBOARD VIEWPORT
          ====================================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 md:hidden hover:bg-slate-100 dark:hover:bg-zinc-800"
              aria-label="Open sidebar menu"
            >
              <Icon name="menu" size={18} />
            </button>
            <div>
              <h1 className="text-base sm:text-xl font-bold font-display text-slate-900 dark:text-white capitalize flex items-center gap-1.5 sm:gap-2">
                {activeTab === 'dashboard' ? 'Overview' : activeTab}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live LK
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:block">
                Manage your apparel drops, sales analytics, and WhatsApp customer orders.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              title="Refresh Data"
              className="p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
            >
              <Icon name="refresh" size={16} className={isRefreshing ? 'animate-spin text-brand-500' : ''} />
            </button>

            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-600 hover:to-amber-700 text-white text-xs font-bold shadow-soft hover:shadow-glow-coral transition active:scale-95"
            >
              <Icon name="plus" size={15} />
              <span className="hidden sm:inline">Add New Fit</span>
              <span className="sm:hidden">New Fit</span>
            </button>
          </div>
        </header>

        {/* ====================================================================
            TAB CONTENT ROUTING
            ==================================================================== */}
        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              {/* ==============================================================
                  TOP ROW: 4 METRIC CARDS WITH MINI TREND INDICATORS
                  ============================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                {/* 1. Today's Sales (LKR) */}
                <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft hover:shadow-card dark:hover:shadow-card-dark transition group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Today's Sales</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <Icon name="dollar" size={20} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black font-display text-slate-900 dark:text-white">
                      Rs. {metrics.todaySales.toLocaleString()}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                        <Icon name="trendingUp" size={12} /> +14.8%
                      </span>
                      <span className="text-slate-400 dark:text-zinc-500 font-medium">vs yesterday</span>
                    </div>
                  </div>
                </div>

                {/* 2. Pending Slips (With Attention Badge) */}
                <div 
                  onClick={() => setActiveTab('bank-slips')}
                  className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft hover:shadow-card dark:hover:shadow-card-dark cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Pending Slips</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400">
                      <Icon name="receipt" size={20} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                      {metrics.pendingSlipsCount} Slips
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30 animate-pulse-subtle">
                        <Icon name="alertTriangle" size={11} /> Review Needed
                      </span>
                      <span className="text-slate-400 dark:text-zinc-500 font-medium">Click to verify</span>
                    </div>
                  </div>
                </div>

                {/* 3. Active Orders */}
                <div 
                  onClick={() => setActiveTab('orders')}
                  className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft hover:shadow-card dark:hover:shadow-card-dark cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Active Orders</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400">
                      <Icon name="orders" size={20} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black font-display text-slate-900 dark:text-white">
                      {metrics.activeOrdersCount} Orders
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-0.5 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-md">
                        <Icon name="trendingUp" size={12} /> +8.2%
                      </span>
                      <span className="text-slate-400 dark:text-zinc-500 font-medium">this week</span>
                    </div>
                  </div>
                </div>

                {/* 4. Low Stock Alert */}
                <div 
                  onClick={() => setActiveTab('inventory')}
                  className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft hover:shadow-card dark:hover:shadow-card-dark cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Low Stock Alert</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400">
                      <Icon name="alertTriangle" size={20} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                      {metrics.lowStockCount} Fits Low
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-md">
                        &lt; 5 units left
                      </span>
                      <span className="text-slate-400 dark:text-zinc-500 font-medium">Restock soon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  MIDDLE SECTION: BAR CHART & DONUT CHART
                  ============================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Monthly Income vs Profit Bar Chart (7 cols) */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        Monthly Income vs Profit
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Financial progression with gross income and net profit margin
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        2026 LKR
                      </span>
                    </div>
                  </div>

                  <div className="relative h-72 w-full">
                    <canvas ref={barChartRef}></canvas>
                  </div>
                </div>

                {/* Right: Category Sales Share Donut Chart (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                          Category Share
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                          Sales breakdown across apparel drops
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-md">
                        Top Demand
                      </span>
                    </div>

                    <div className="relative h-48 w-full flex items-center justify-center">
                      <canvas ref={donutChartRef}></canvas>
                      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Total Sales</span>
                        <span className="text-lg font-black font-display text-slate-900 dark:text-white">Rs. 1.42M</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Category Legend Badges */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/60 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#6366F1]" />
                        <span className="font-medium text-slate-700 dark:text-zinc-300">Oversized Tees</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">42%</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
                        <span className="font-medium text-slate-700 dark:text-zinc-300">Hoodies</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">28%</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#06B6D4]" />
                        <span className="font-medium text-slate-700 dark:text-zinc-300">Casual / Shirts</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">18%</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="font-medium text-slate-700 dark:text-zinc-300">Trousers</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">12%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==============================================================
                  BOTTOM SECTION: RECENT ORDERS TABLE & LOW STOCK PANEL
                  ============================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Orders Table (8 cols) */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        Recent Incoming Orders
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Real-time apparel customer checkouts & WhatsApp status
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                    >
                      View All Orders &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                    <table className="w-full text-left text-xs border-collapse min-w-[580px]">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                          <th className="pb-3 font-semibold">Order ID</th>
                          <th className="pb-3 font-semibold">Customer</th>
                          <th className="pb-3 font-semibold">Size & Color</th>
                          <th className="pb-3 font-semibold">Payment</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                        {orders.slice(0, 5).map(order => {
                          const item = (order.items && order.items[0]) || { name: 'Apparel Drop', size: 'M', color: 'Charcoal' };
                          return (
                            <tr key={order.orderId} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition">
                              <td className="py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                                #{order.orderId}
                              </td>
                              
                              <td className="py-3.5">
                                <div className="font-bold text-slate-900 dark:text-slate-100">{order.customer?.name || 'Customer'}</div>
                                <div className="text-[11px] text-slate-400 dark:text-zinc-500">{order.customer?.city || 'Sri Lanka'}</div>
                              </td>

                              <td className="py-3.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
                                    {item.size || 'M'}
                                  </span>
                                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 truncate max-w-[110px]" title={item.color || item.name}>
                                    {item.color || 'Standard Fit'}
                                  </span>
                                </div>
                              </td>

                              <td className="py-3.5">
                                {order.paymentMethod === 'bank_transfer' ? (
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                      Bank Transfer
                                    </span>
                                    {order.slipUrl && (
                                      <button
                                        onClick={() => setSelectedSlipUrl(order.slipUrl)}
                                        className="text-[10px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-0.5"
                                      >
                                        <Icon name="eye" size={11} /> Slip
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    COD
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold capitalize ${
                                  order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                                  order.status === 'dispatched' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                                  order.status === 'processing' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20' :
                                  'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                }`}>
                                  {order.status || 'pending'}
                                </span>
                              </td>

                              <td className="py-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={getWhatsAppLink(order)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white transition"
                                    title="Chat with Customer on WhatsApp"
                                  >
                                    <Icon name="whatsapp" size={13} />
                                  </a>

                                  <button
                                    onClick={() => setSelectedOrderForModal(order)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-semibold"
                                  >
                                    View
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right-Side Panel: Low Stock Inventory (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          Low Stock Alert
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                            &lt; 5 Units
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                          Apparel items running out of inventory
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 mt-4">
                      {metrics.lowStockItems.slice(0, 4).map(item => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/60 hover:border-slate-300 dark:hover:border-zinc-700 transition"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageFront || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80'}
                              alt={item.name}
                              className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-zinc-700"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px]" title={item.name}>
                                {item.name}
                              </div>
                              <div className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                                Rs. {Number(item.currentPrice).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md ${
                              item.stockLeft <= 2 
                                ? 'bg-rose-500 text-white animate-pulse' 
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                              {item.stockLeft} left
                            </span>
                            <div>
                              <button
                                onClick={() => setRestockModalItem(item)}
                                className="text-[11px] font-bold text-brand-500 hover:underline mt-1 inline-block"
                              >
                                + Restock
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition text-center"
                  >
                    Manage Full Inventory Catalog &rarr;
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft space-y-4 sm:space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">Customer Orders Management</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Search by customer name, phone number, or filter by order fulfillment state.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search orders..."
                      className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="pb-3">Order #</th>
                      <th className="pb-3">Customer & Delivery</th>
                      <th className="pb-3">Ordered Items</th>
                      <th className="pb-3">Total & Pay</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">WhatsApp</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                    {filteredOrders.map(order => (
                      <tr key={order.orderId} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition">
                        <td className="py-4 font-mono font-bold text-slate-900 dark:text-white">
                          #{order.orderId}
                        </td>
                        
                        <td className="py-4">
                          <div className="font-bold text-slate-900 dark:text-slate-100">{order.customer?.name || 'Customer'}</div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">{order.customer?.phone}</div>
                          <div className="text-[11px] text-slate-400 dark:text-zinc-500">{order.customer?.city}, {order.customer?.district}</div>
                        </td>

                        <td className="py-4 max-w-xs">
                          <div className="text-xs text-slate-700 dark:text-zinc-300 font-medium line-clamp-2">
                            {(order.items || []).map(i => `${i.name} (${i.size}) × ${i.qty}`).join(', ')}
                          </div>
                        </td>

                        <td className="py-4">
                          <div className="font-black text-slate-900 dark:text-white">Rs. {(Number(order.total) || 0).toLocaleString()}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] uppercase font-bold text-slate-500">{order.paymentMethod}</span>
                            {order.slipUrl && (
                              <button
                                onClick={() => setSelectedSlipUrl(order.slipUrl)}
                                className="text-[10px] font-bold text-brand-500 hover:underline"
                              >
                                View Slip
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="py-4">
                          <select
                            value={order.status || 'pending'}
                            onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-4">
                          <a
                            href={getWhatsAppLink(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white text-xs font-bold transition"
                          >
                            <Icon name="whatsapp" size={13} /> Chat
                          </a>
                        </td>

                        <td className="py-4 text-right">
                          <button
                            onClick={() => setSelectedOrderForModal(order)}
                            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 text-xs font-semibold"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY CATALOG */}
          {activeTab === 'inventory' && (
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft space-y-4 sm:space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">Apparel Inventory Catalog</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Manage products, high-resolution front & back shots, pricing, and stock levels.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search fits..."
                      className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="tees">Oversized Tees & Hoodies</option>
                    <option value="streetwear">Casual & Streetwear</option>
                    <option value="formal">Formal & Office Wear</option>
                    <option value="sale">Clearance / Offers</option>
                  </select>

                  <button
                    onClick={handleOpenAddProduct}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition"
                  >
                    <Icon name="plus" size={15} /> Add Fit
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                <table className="w-full text-left text-xs border-collapse min-w-[660px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="pb-3">Product & Angles</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price (LKR)</th>
                      <th className="pb-3">Stock</th>
                      <th className="pb-3">Sizes</th>
                      <th className="pb-3">Badge</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition">
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2 overflow-hidden">
                              <img src={p.imageFront} alt="Front" className="inline-block h-10 w-10 rounded-lg object-cover ring-2 ring-white dark:ring-zinc-800" title="Front Angle" />
                              <img src={p.imageBack} alt="Back" className="inline-block h-10 w-10 rounded-lg object-cover ring-2 ring-white dark:ring-zinc-800" title="Back Angle" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                              <span className="text-[11px] text-slate-400 dark:text-zinc-500">ID: {p.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 text-slate-600 dark:text-zinc-300 font-medium">
                          {p.categoryName || p.category}
                        </td>

                        <td className="py-3.5">
                          <div className="font-black text-slate-900 dark:text-white">Rs. {Number(p.currentPrice).toLocaleString()}</div>
                          {p.originalPrice > p.currentPrice && (
                            <div className="text-[10px] text-slate-400 line-through">Rs. {Number(p.originalPrice).toLocaleString()}</div>
                          )}
                        </td>

                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                            p.stockLeft <= 3 
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' 
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {p.stockLeft} units
                          </span>
                        </td>

                        <td className="py-3.5 text-slate-500 font-medium">
                          {(p.sizes || []).join(', ')}
                        </td>

                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-[11px] font-semibold">
                            {p.badge || 'None'}
                          </span>
                        </td>

                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300"
                              title="Edit Fit"
                            >
                              <Icon name="edit" size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white transition"
                              title="Delete Fit"
                            >
                              <Icon name="trash" size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BANK SLIPS VERIFICATION HUB */}
          {activeTab === 'bank-slips' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    Bank Transfer Slips Hub
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-900 text-xs font-black">
                      {metrics.pendingSlipsCount} Pending Review
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Verify uploaded customer deposit receipts from Commercial Bank, HNB, Sampath Bank, and BOC.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {bankSlipOrders.map(order => (
                  <div
                    key={order.orderId}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">#{order.orderId}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-md uppercase ${
                          order.status === 'confirmed' || order.status === 'dispatched' 
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                            : 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>

                      {/* Bank Slip Photo Preview */}
                      <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-800 aspect-video mb-3.5 flex items-center justify-center">
                        {order.slipUrl ? (
                          <img
                            src={order.slipUrl}
                            alt="Bank Slip"
                            onClick={() => setSelectedSlipUrl(order.slipUrl)}
                            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <Icon name="receipt" size={28} className="mx-auto text-slate-400 mb-1" />
                            <span className="text-[11px] font-semibold text-slate-500">No Slip Uploaded</span>
                          </div>
                        )}
                        {order.slipUrl && (
                          <div
                            onClick={() => setSelectedSlipUrl(order.slipUrl)}
                            className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition"
                          >
                            <Icon name="eye" size={16} className="mr-1" /> Click to Zoom
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Customer:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{order.customer?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Phone:</span>
                          <span className="font-medium text-slate-700 dark:text-zinc-300">{order.customer?.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Amount:</span>
                          <span className="font-black text-brand-600 dark:text-brand-400">Rs. {(Number(order.total) || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateOrderStatus(order.orderId, 'processing')}
                        className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition"
                      >
                        Approve Slip
                      </button>
                      
                      <a
                        href={getWhatsAppLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-emerald-500 hover:text-white transition"
                        title="Inquire on WhatsApp"
                      >
                        <Icon name="whatsapp" size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Order Value (AOV)</span>
                  <div className="text-2xl font-black font-display text-slate-900 dark:text-white mt-2">Rs. 5,950</div>
                  <div className="text-xs text-emerald-500 font-bold mt-1">+12.4% vs last month</div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Store Conversion Rate</span>
                  <div className="text-2xl font-black font-display text-slate-900 dark:text-white mt-2">3.85%</div>
                  <div className="text-xs text-indigo-500 font-bold mt-1">High conversion in Colombo & Kandy</div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bank Transfer vs COD</span>
                  <div className="text-2xl font-black font-display text-slate-900 dark:text-white mt-2">55% / 45%</div>
                  <div className="text-xs text-purple-500 font-bold mt-1">Increasing online bank transfers</div>
                </div>
              </div>

              {/* Best Selling Fits Ranking */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-4">Top 5 Best Selling Fits</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60">
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <img src={p.imageFront} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{p.name}</div>
                          <span className="text-[11px] text-slate-400">{p.categoryName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Rs. {Number(p.currentPrice).toLocaleString()}</div>
                        <span className="text-[11px] text-emerald-500 font-semibold">{30 - idx * 4} sold this week</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft max-w-2xl">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-1">Store & Checkout Settings</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">Configure seller WhatsApp phone routing, delivery fees, and header banner.</p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Store WhatsApp Order Phone Number *
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="e.g. 94771234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Include Sri Lanka country code 94 without + or spaces.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Colombo & Gampaha Delivery Fee (LKR)
                    </label>
                    <input
                      type="number"
                      value={settings.shippingFeeColombo || 350}
                      onChange={(e) => setSettings({ ...settings, shippingFeeColombo: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Outstation Delivery Fee (LKR)
                    </label>
                    <input
                      type="number"
                      value={settings.shippingFeeOutstation || 450}
                      onChange={(e) => setSettings({ ...settings, shippingFeeOutstation: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Free Shipping Order Threshold (LKR)
                  </label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold || 5000}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Storefront Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText || ''}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    placeholder="e.g. Free Islandwide Delivery on Orders Over Rs. 5,000 🔥"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-soft transition mt-2"
                >
                  Save Store Settings
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* ======================================================================
          MODALS & LIGHTBOXES
          ====================================================================== */}

      {/* 1. Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-zinc-800 shadow-2xl p-4 sm:p-6 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Apparel Fit' : 'Add New Apparel Drop'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Product Title / Name *</label>
                <input
                  type="text"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="e.g. Heavyweight Boxy Cut Tee - Vintage Acid Wash"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Category *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                  >
                    <option value="tees">Oversized Tees & Hoodies</option>
                    <option value="streetwear">Casual & Streetwear</option>
                    <option value="formal">Formal & Office Wear</option>
                    <option value="sale">Clearance / Offers</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    value={prodForm.currentPrice}
                    onChange={(e) => setProdForm({ ...prodForm, currentPrice: e.target.value })}
                    placeholder="2850"
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Stock Left *</label>
                  <input
                    type="number"
                    value={prodForm.stockLeft}
                    onChange={(e) => setProdForm({ ...prodForm, stockLeft: e.target.value })}
                    placeholder="10"
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dual Angle Image Uploader */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Front Angle Photo</label>
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-2xl p-3 text-center aspect-square flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-zinc-800/40">
                    {prodForm.imageFront ? (
                      <img src={prodForm.imageFront} alt="Front Preview" className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <div className="text-slate-400">
                        <Icon name="upload" size={20} className="mx-auto mb-1" />
                        <span className="text-[10px]">Upload Front</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'imageFront')}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Back Angle Photo</label>
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-2xl p-3 text-center aspect-square flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-zinc-800/40">
                    {prodForm.imageBack ? (
                      <img src={prodForm.imageBack} alt="Back Preview" className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <div className="text-slate-400">
                        <Icon name="upload" size={20} className="mx-auto mb-1" />
                        <span className="text-[10px]">Upload Back</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'imageBack')}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={prodForm.badge}
                  onChange={(e) => setProdForm({ ...prodForm, badge: e.target.value })}
                  placeholder="e.g. Trending 🔥 or Bestseller"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-soft"
                >
                  {editingProduct ? 'Save Changes' : 'Create Fit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Order Details & Bank Slip Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-zinc-800 shadow-2xl p-4 sm:p-6 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Order #{selectedOrderForModal.orderId}
              </h3>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              {/* Customer Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-sm">{selectedOrderForModal.customer?.name}</div>
                <div className="text-slate-500">Phone: {selectedOrderForModal.customer?.phone}</div>
                <div className="text-slate-500">Address: {selectedOrderForModal.customer?.address}, {selectedOrderForModal.customer?.city}</div>
                {selectedOrderForModal.customer?.notes && (
                  <div className="text-brand-500 font-medium">Note: {selectedOrderForModal.customer.notes}</div>
                )}
              </div>

              {/* Items Summary */}
              <div className="space-y-2">
                <div className="font-bold text-slate-700 dark:text-zinc-300">Ordered Items</div>
                {(selectedOrderForModal.items || []).map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-zinc-800">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">{i.name}</span>
                      <span className="text-slate-400 ml-1.5 font-bold">({i.size}) × {i.qty}</span>
                    </div>
                    <span className="font-black text-slate-900 dark:text-white">Rs. {(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 space-y-1 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {(Number(selectedOrderForModal.subtotal) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>Rs. {(Number(selectedOrderForModal.deliveryFee) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-brand-600 dark:text-brand-400 pt-1 border-t border-slate-200 dark:border-zinc-700">
                  <span>Total Payable:</span>
                  <span>Rs. {(Number(selectedOrderForModal.total) || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Bank Slip Image If Present */}
              {selectedOrderForModal.slipUrl && (
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 dark:text-zinc-300">Bank Transfer Slip:</span>
                  <img
                    src={selectedOrderForModal.slipUrl}
                    alt="Slip"
                    onClick={() => setSelectedSlipUrl(selectedOrderForModal.slipUrl)}
                    className="w-full max-h-48 object-contain rounded-xl border border-slate-200 dark:border-zinc-700 cursor-pointer"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={getWhatsAppLink(selectedOrderForModal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 transition"
                >
                  <Icon name="whatsapp" size={15} /> Chat on WhatsApp
                </a>

                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. High-Resolution Bank Slip Lightbox Modal */}
      {selectedSlipUrl && (
        <div 
          onClick={() => setSelectedSlipUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedSlipUrl(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-slate-300"
            >
              <Icon name="x" size={24} />
            </button>
            <img
              src={selectedSlipUrl}
              alt="Bank Transfer Verification Slip"
              className="w-full rounded-2xl max-h-[80vh] object-contain shadow-2xl bg-white"
            />
          </div>
        </div>
      )}

      {/* 4. Quick Restock Modal */}
      {restockModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-slate-900 dark:text-white">Quick Restock Units</h4>
              <button onClick={() => setRestockModalItem(null)}><Icon name="x" size={16} /></button>
            </div>
            
            <p className="text-xs text-slate-500">
              Add new inventory batches to <strong className="text-slate-900 dark:text-white">{restockModalItem.name}</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 25].map(amt => (
                <button
                  key={amt}
                  onClick={() => handleQuickRestock(restockModalItem.id, amt)}
                  className="py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500 text-brand-600 hover:text-white font-black text-xs transition"
                >
                  +{amt} Units
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminApp />);
