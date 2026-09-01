// ============================================================
// app.js - كامل منطق التطبيق (نسخة مع Realtime Sync & Shift History)
// ============================================================

// ============================================================
// استيراد الـ supabaseClient من window
// ============================================================
const supabaseClient = window.supabaseClient;

if (!supabaseClient) {
    console.error('❌ supabaseClient is not defined! Check config.js loading order.');
    document.addEventListener('DOMContentLoaded', function() {
        const errEl = document.getElementById('setupError');
        if (errEl) errEl.textContent = '⚠️ خطأ في تحميل الاتصال بقاعدة البيانات. تأكد من اتصال الإنترنت.';
    });
} else {
    console.log('✅ supabaseClient is ready in app.js');
}

// ============================================================
// TRANSLATIONS - النسخة الكاملة
// ============================================================
let currentLang = 'ar';

const translations = {
    ar: {
        'platepro': '✦ PLATE PRO ✦',
        'welcome': 'مرحباً بك',
        'business_code': 'كود النشاط التجاري',
        'continue': 'متابعة',
        'back': 'رجوع',
        'save': 'حفظ',
        'cancel': 'إلغاء',
        'close': 'إغلاق',
        'delete': 'حذف',
        'edit': 'تعديل',
        'add': 'إضافة',
        'today_performance': '📊 أداء اليوم',
        'today_revenue': '💰 إيراد اليوم',
        'active_orders': '📋 الطلبات النشطة',
        'occupied_tables': '🪑 طاولات مشغولة',
        'available_tables': '🟢 طاولات متاحة',
        'quick_actions': '⚡ إجراءات سريعة',
        'add_expense': 'إضافة مصروف',
        'close_shift': 'إقفال الشيفت',
        'open_new_shift': 'فتح شيفت جديد',
        'scan_order': '📱 امسح واطلب من مكانك',
        'all': '🍽️ الكل',
        'cart': '🛒 سلة الطلبات',
        'empty_cart': 'السلة فارغة',
        'subtotal': 'المجموع',
        'service_fee': 'رسوم الخدمة',
        'vat': 'ضريبة القيمة المضافة',
        'total': 'الإجمالي',
        'confirm_order': 'تأكيد الطلب',
        'pending': '⏳ قيد الانتظار',
        'preparing': '🔪 قيد التحضير',
        'ready': '✅ جاهز للتسليم',
        'paid': '💳 مدفوع',
        'cancelled': '❌ ملغي',
        'order': 'طلب',
        'table': 'طاولة',
        'print_receipt': '🖨️ طباعة الوصل',
        'print': 'طباعة',
        'payment': '💳 الدفع',
        'select_payment': 'اختر طريقة الدفع',
        'available': '🟢 متاحة',
        'occupied': '🟡 مشغولة',
        'reserved': '🔵 محجوزة',
        'active': '✅ نشط',
        'inactive': '⛔ موقف',
        'waiter': 'نادل',
        'chef': 'طباخ',
        'cashier': 'كاشير',
        'admin': 'أدمن',
        'settings': '⚙️ الإعدادات',
        'appearance': '🎨 المظهر',
        'dark': '🌙 داكن',
        'light': '☀️ فاتح',
        'logo': '🖼️ الشعار',
        'fees': '💰 الرسوم والضرائب',
        'service_fee_label': 'رسوم الخدمة',
        'vat_label': 'ضريبة القيمة المضافة (VAT)',
        'payment_methods': '💳 طرق الدفع',
        'employees': '👥 الموظفين',
        'switch_business': '🔄 تبديل النشاط',
        'edit_fees': 'تعديل الرسوم',
        'edit_logo': 'تعديل الشعار',
        'no_logo': 'لا يوجد شعار',
        'remove_logo': 'حذف الشعار',
        'save_logo': 'حفظ الشعار',
        'upload_logo': 'اختر صورة الشعار',
        'menu': '🍽️ المنيو',
        'manage_menu': '⚙️ إدارة المنيو',
        'add_item': 'إضافة صنف',
        'add_category': 'إضافة تصنيف',
        'item_name': 'اسم الصنف',
        'item_price': 'السعر',
        'item_desc': 'الوصف',
        'item_image': 'صورة الصنف',
        'category': 'التصنيف',
        'no_items': 'مفيش أصناف',
        'no_categories': 'مفيش تصنيفات',
        'qr_code': '📱 طلب من العميل',
        'qr_label': 'QR Code الطاولات',
        'qr_sub': 'امسح للطلب من المنيو مباشرة',
        'show_qr': 'عرض QR',
        'download_qr': 'تحميل QR',
        'scan_qr': 'امسح الكود لفتح منيو العميل',
        'expense_desc': 'الوصف',
        'expense_amount': 'المبلغ',
        'add_expense_title': 'إضافة مصروف',
        'close_shift_title': 'تأكيد إقفال الشيفت',
        'shift_revenue': 'الإيراد',
        'shift_expenses': 'المصروفات',
        'today_expenses': '💸 مصروفات اليوم',
        'no_expenses': 'لا يوجد مصروفات في هذا الشيفت',
        'shift_profit': 'الصافي',
        'confirm_close': 'تأكيد الإقفال',
        'no_open_shift': 'لا يوجد شيفت مفتوح',
        'permissions': '🔐 الصلاحيات',
        'perm_dashboard': '👀 الرئيسية',
        'perm_tables': '🪑 الطاولات',
        'perm_orders': '📋 الطلبات',
        'perm_menu': '🍽️ المنيو',
        'perm_settings': '⚙️ الإعدادات',
        'perm_create_orders': '🛒 إنشاء طلبات',
        'perm_add_expense': '💰 إضافة مصروف',
        'perm_close_shift': '🔒 إقفال الشيفت',
        'perm_print_receipt': '🧾 طباعة الفواتير',
        'perm_manage_menu': '📝 إدارة المنيو',
        'perm_view_revenue': '💰 مشاهدة الإيراد',
        'perm_view_expenses': '📊 مشاهدة المصروفات',
        'employee_name': 'الاسم',
        'employee_pin': 'PIN (4 أرقام)',
        'employee_role': 'الدور',
        'add_employee': 'إضافة موظف',
        'edit_employee': 'تعديل موظف',
        'payment_method_name': 'اسم طريقة الدفع',
        'payment_method_icon': 'الأيقونة',
        'add_payment_method': 'إضافة طريقة دفع',
        'edit_payment_method': 'تعديل طريقة دفع',
        'cash': 'كاش',
        'card': 'بطاقة',
        'wallet': 'محفظة',
        'mobile_wallet': 'محفظة إلكترونية',
        'bank_transfer': 'تحويل بنكي',
        'category_name': 'اسم التصنيف',
        'category_icon': 'الأيقونة',
        'add_category_title': 'إضافة تصنيف',
        'order_created': '✅ تم إنشاء الطلب بنجاح!',
        'order_updated': '✅ تم تحديث حالة الطلب',
        'payment_success': '✅ تم الدفع بنجاح!',
        'payment_failed': '❌ فشل الدفع',
        'expense_added': '✅ تم تسجيل المصروف',
        'shift_closed': '✅ تم إقفال الشيفت',
        'shift_close_failed': '❌ فشل إقفال الشيفت',
        'item_added': '✅ تم إضافة الصنف',
        'item_updated': '✅ تم تحديث الصنف',
        'item_deleted': '✅ تم حذف الصنف',
        'category_added': '✅ تم إضافة التصنيف',
        'payment_method_added': '✅ تم إضافة طريقة الدفع',
        'employee_added': '✅ تم إضافة الموظف',
        'employee_updated': '✅ تم تحديث الموظف',
        'employee_deleted': '✅ تم حذف الموظف',
        'logo_saved': '✅ تم حفظ الشعار',
        'logo_deleted': '✅ تم حذف الشعار',
        'fees_saved': '✅ تم حفظ الإعدادات',
        'error_general': '⚠️ حدث خطأ، حاول تاني',
        'error_connection': '⚠️ حصل خطأ في الاتصال',
        'error_invalid_code': '⚠️ كود النشاط غير صحيح',
        'error_invalid_pin': '⚠️ PIN غير صحيح',
        'error_no_items': '⚠️ أضف صنف واحد على الأقل',
        'error_no_tables': '⚠️ مفيش طاولات متاحة',
        'error_permission': '⛔ ليس لديك صلاحية',
        'error_upload': '⚠️ فشل رفع الصورة',
        'recent_orders': '📜 آخر الطلبات',
        'order_details': 'تفاصيل الطلب',
        'tables': '🪑 الطاولات',
        'kitchen': '👨‍🍳 الأوردرات',
        'kitchen_orders': '📋 الأوردرات النشطة',
        'no_kitchen_orders': 'مفيش أوردرات نشطة',
        'items': 'أصناف',
        'more': 'أكثر',
        'ready_to_serve': '🛎️ جاهز للتسليم',
        'dashboard': 'الرئيسية',
        'activate': 'تفعيل',
        'qr_generated': '✅ تم توليد QR Code',
        'start_preparing': '🔪 بدء التحضير',
        'ready_for_delivery': '✅ جاهز للتسليم',
        'deliver': '🚚 تسليم',
        'delivered': '✅ تم التوصيل',
        'chef_view': '👨‍🍳 عرض المطبخ',
        'persons': 'أشخاص',
        'manage_tables': '🪑 إدارة الطاولات',
        'add_table': 'إضافة طاولة',
        'edit_table': 'تعديل طاولة',
        'delete_table': 'حذف طاولة',
        'no_tables': 'مفيش طاولات',
        'table_added': '✅ تم إضافة الطاولة',
        'table_updated': '✅ تم تحديث الطاولة',
        'table_deleted': '✅ تم حذف الطاولة',
        'delete_table_confirm': 'متأكد من حذف الطاولة؟',
        'shift_history': '📋 سجل الشيفتات',
        'no_shift_history': 'مفيش شيفتات مقفولة',
        'preparing_started': '🔪 جاري التحضير...',
        'order_ready_notification': '✅ الطلب جاهز! إشعار للويتر',
        'order_delivered': '✅ تم توصيل الطلب للعميل',
        'table_number': 'رقم الطاولة',
        'capacity': 'السعة (أشخاص)',
        'status': 'الحالة',
        'device_activated': '✅ تم تفعيل الجهاز بنجاح',
        'item_added_to_order': '✅ تم إضافة {name}',
        'loading': 'جاري التحميل...',
        'default_item': 'صنف',
        'no_open_shift': 'لا يوجد شيفت مفتوح',
        'orders': '📋 الطلبات',
        'generate': 'توليد',
        'shift_open': '✅ شيفت مفتوح',
        'shift_closed': '🔴 شيفت مقفول',
        'menu_categories': '📂 التصنيفات',
        'import_pdf': 'استيراد من PDF',
        'import_pdf_title': 'استيراد المنيو من PDF',
        'import_pdf_hint': 'ارفع ملف PDF فيه المنيو، والنظام هيحاول يقرأ الأصناف والتصنيفات تلقائياً. هتقدر تراجع وتعدل قبل الإضافة النهائية.',
        'import_pdf_file': 'ملف المنيو (PDF)',
        'import_pdf_analyze': 'تحليل الملف',
        'import_pdf_review_hint': 'راجع الأصناف اللي اتقرأت من الملف. الغي أي صنف مش مضبوط، عدّل الاسم/السعر/التصنيف، أو ضيف تصنيف جديد بايدك. الأصناف المحددة فقط هتتضاف للمنيو.',
        'import_pdf_confirm': 'إضافة المحدد للمنيو',
        'pdf_status_reading': '⏳ جاري قراءة الملف...',
        'pdf_status_parsing': '⏳ جاري تحليل الأصناف والتصنيفات...',
        'pdf_no_items_found': '⚠️ معرفناش نقرأ أي أصناف من الملف. جرب ملف تاني أو أضف الأصناف يدوياً.',
        'pdf_items_found': '✅ تم العثور على {count} صنف',
        'pdf_new_category': 'تصنيف جديد',
        'pdf_uncategorized': 'بدون تصنيف',
        'pdf_add_new_category': '+ تصنيف جديد',
        'pdf_new_category_placeholder': 'اسم التصنيف الجديد',
        'pdf_import_success': '✅ تم إضافة الأصناف للمنيو بنجاح',
        'pdf_import_error': '⚠️ حصل خطأ أثناء إضافة بعض الأصناف',
        'pdf_select_all': 'تحديد الكل',
        'pdf_deselect_all': 'إلغاء تحديد الكل',
        'pdf_error_no_file': '⚠️ اختار ملف PDF الأول',
        'pdf_error_read_fail': '⚠️ مقدرناش نقرا الملف ده، جرب ملف تاني'
    },
    en: {
        'platepro': '✦ PLATE PRO ✦',
        'welcome': 'Welcome',
        'business_code': 'Business Code',
        'continue': 'Continue',
        'back': 'Back',
        'save': 'Save',
        'cancel': 'Cancel',
        'close': 'Close',
        'delete': 'Delete',
        'edit': 'Edit',
        'add': 'Add',
        'today_performance': '📊 Today\'s Performance',
        'today_revenue': '💰 Today\'s Revenue',
        'active_orders': '📋 Active Orders',
        'occupied_tables': '🪑 Occupied Tables',
        'available_tables': '🟢 Available Tables',
        'quick_actions': '⚡ Quick Actions',
        'add_expense': 'Add Expense',
        'close_shift': 'Close Shift',
        'open_new_shift': 'Open New Shift',
        'scan_order': '📱 Scan & Order from your table',
        'all': '🍽️ All',
        'cart': '🛒 Cart',
        'empty_cart': 'Cart is empty',
        'subtotal': 'Subtotal',
        'service_fee': 'Service Fee',
        'vat': 'VAT',
        'total': 'Total',
        'confirm_order': 'Confirm Order',
        'pending': '⏳ Pending',
        'preparing': '🔪 Preparing',
        'ready': '✅ Ready for Delivery',
        'paid': '💳 Paid',
        'cancelled': '❌ Cancelled',
        'order': 'Order',
        'table': 'Table',
        'print_receipt': '🖨️ Print Receipt',
        'print': 'Print',
        'payment': '💳 Payment',
        'select_payment': 'Select Payment Method',
        'available': '🟢 Available',
        'occupied': '🟡 Occupied',
        'reserved': '🔵 Reserved',
        'active': '✅ Active',
        'inactive': '⛔ Inactive',
        'waiter': 'Waiter',
        'chef': 'Chef',
        'cashier': 'Cashier',
        'admin': 'Admin',
        'settings': '⚙️ Settings',
        'appearance': '🎨 Appearance',
        'dark': '🌙 Dark',
        'light': '☀️ Light',
        'logo': '🖼️ Logo',
        'fees': '💰 Fees & Taxes',
        'service_fee_label': 'Service Fee',
        'vat_label': 'VAT',
        'payment_methods': '💳 Payment Methods',
        'employees': '👥 Employees',
        'switch_business': '🔄 Switch Business',
        'edit_fees': 'Edit Fees',
        'edit_logo': 'Edit Logo',
        'no_logo': 'No Logo',
        'remove_logo': 'Remove Logo',
        'save_logo': 'Save Logo',
        'upload_logo': 'Upload Logo Image',
        'menu': '🍽️ Menu',
        'manage_menu': '⚙️ Manage Menu',
        'add_item': 'Add Item',
        'add_category': 'Add Category',
        'item_name': 'Item Name',
        'item_price': 'Price',
        'item_desc': 'Description',
        'item_image': 'Item Image',
        'category': 'Category',
        'no_items': 'No items',
        'no_categories': 'No categories',
        'qr_code': '📱 Customer Order',
        'qr_label': 'Tables QR Code',
        'qr_sub': 'Scan to order directly from menu',
        'show_qr': 'Show QR',
        'download_qr': 'Download QR',
        'scan_qr': 'Scan code to open customer menu',
        'expense_desc': 'Description',
        'expense_amount': 'Amount',
        'add_expense_title': 'Add Expense',
        'close_shift_title': 'Confirm Close Shift',
        'shift_revenue': 'Revenue',
        'shift_expenses': 'Expenses',
        'today_expenses': '💸 Today\'s Expenses',
        'no_expenses': 'No expenses recorded this shift',
        'shift_profit': 'Net Profit',
        'confirm_close': 'Confirm Close',
        'no_open_shift': 'No open shift',
        'permissions': '🔐 Permissions',
        'perm_dashboard': '👀 Dashboard',
        'perm_tables': '🪑 Tables',
        'perm_orders': '📋 Orders',
        'perm_menu': '🍽️ Menu',
        'perm_settings': '⚙️ Settings',
        'perm_create_orders': '🛒 Create Orders',
        'perm_add_expense': '💰 Add Expense',
        'perm_close_shift': '🔒 Close Shift',
        'perm_print_receipt': '🧾 Print Receipt',
        'perm_manage_menu': '📝 Manage Menu',
        'perm_view_revenue': '💰 View Revenue',
        'perm_view_expenses': '📊 View Expenses',
        'employee_name': 'Name',
        'employee_pin': 'PIN (4 digits)',
        'employee_role': 'Role',
        'add_employee': 'Add Employee',
        'edit_employee': 'Edit Employee',
        'payment_method_name': 'Payment Method Name',
        'payment_method_icon': 'Icon',
        'add_payment_method': 'Add Payment Method',
        'edit_payment_method': 'Edit Payment Method',
        'cash': 'Cash',
        'card': 'Card',
        'wallet': 'Wallet',
        'mobile_wallet': 'Mobile Wallet',
        'bank_transfer': 'Bank Transfer',
        'category_name': 'Category Name',
        'category_icon': 'Icon',
        'add_category_title': 'Add Category',
        'order_created': '✅ Order created successfully!',
        'order_updated': '✅ Order status updated',
        'payment_success': '✅ Payment successful!',
        'payment_failed': '❌ Payment failed',
        'expense_added': '✅ Expense recorded',
        'shift_closed': '✅ Shift closed',
        'shift_close_failed': '❌ Failed to close shift',
        'item_added': '✅ Item added',
        'item_updated': '✅ Item updated',
        'item_deleted': '✅ Item deleted',
        'category_added': '✅ Category added',
        'payment_method_added': '✅ Payment method added',
        'employee_added': '✅ Employee added',
        'employee_updated': '✅ Employee updated',
        'employee_deleted': '✅ Employee deleted',
        'logo_saved': '✅ Logo saved',
        'logo_deleted': '✅ Logo deleted',
        'fees_saved': '✅ Settings saved',
        'error_general': '⚠️ An error occurred, please try again',
        'error_connection': '⚠️ Connection error',
        'error_invalid_code': '⚠️ Invalid business code',
        'error_invalid_pin': '⚠️ Incorrect PIN',
        'error_no_items': '⚠️ Add at least one item',
        'error_no_tables': '⚠️ No tables available',
        'error_permission': '⛔ You don\'t have permission',
        'error_upload': '⚠️ Image upload failed',
        'recent_orders': '📜 Recent Orders',
        'order_details': 'Order Details',
        'tables': '🪑 Tables',
        'kitchen': '👨‍🍳 Orders',
        'kitchen_orders': '📋 Active Orders',
        'no_kitchen_orders': 'No active orders',
        'items': 'items',
        'more': 'more',
        'ready_to_serve': '🛎️ Ready to Serve',
        'dashboard': 'Dashboard',
        'activate': 'Activate',
        'qr_generated': '✅ QR Code generated',
        'start_preparing': '🔪 Start Preparing',
        'ready_for_delivery': '✅ Ready for Delivery',
        'deliver': '🚚 Deliver',
        'delivered': '✅ Delivered',
        'chef_view': '👨‍🍳 Kitchen View',
        'persons': 'persons',
        'manage_tables': '🪑 Manage Tables',
        'add_table': 'Add Table',
        'edit_table': 'Edit Table',
        'delete_table': 'Delete Table',
        'no_tables': 'No tables',
        'table_added': '✅ Table added',
        'table_updated': '✅ Table updated',
        'table_deleted': '✅ Table deleted',
        'delete_table_confirm': 'Delete this table?',
        'shift_history': '📋 Shift History',
        'no_shift_history': 'No closed shifts',
        'preparing_started': '🔪 Preparing...',
        'order_ready_notification': '✅ Order ready! Notifying waiter',
        'order_delivered': '✅ Order delivered to customer',
        'table_number': 'Table Number',
        'capacity': 'Capacity (persons)',
        'status': 'Status',
        'device_activated': '✅ Device activated successfully',
        'item_added_to_order': '✅ {name} added',
        'loading': 'Loading...',
        'default_item': 'Item',
        'no_open_shift': 'No open shift',
        'orders': '📋 Orders',
        'generate': 'Generate',
        'shift_open': '✅ Shift Open',
        'shift_closed': '🔴 Shift Closed',
        'menu_categories': '📂 Categories',
        'import_pdf': 'Import from PDF',
        'import_pdf_title': 'Import Menu from PDF',
        'import_pdf_hint': 'Upload a PDF file with your menu, and the system will try to automatically read the items and categories. You can review and edit before the final import.',
        'import_pdf_file': 'Menu File (PDF)',
        'import_pdf_analyze': 'Analyze File',
        'import_pdf_review_hint': 'Review the items detected from the file. Uncheck anything wrong, edit the name/price/category, or add a new category yourself. Only checked items will be added to the menu.',
        'import_pdf_confirm': 'Add Selected to Menu',
        'pdf_status_reading': '⏳ Reading file...',
        'pdf_status_parsing': '⏳ Analyzing items and categories...',
        'pdf_no_items_found': '⚠️ Couldn\'t read any items from this file. Try another file or add items manually.',
        'pdf_items_found': '✅ Found {count} items',
        'pdf_new_category': 'New category',
        'pdf_uncategorized': 'No category',
        'pdf_add_new_category': '+ New category',
        'pdf_new_category_placeholder': 'New category name',
        'pdf_import_success': '✅ Items added to the menu successfully',
        'pdf_import_error': '⚠️ Something went wrong adding some items',
        'pdf_select_all': 'Select all',
        'pdf_deselect_all': 'Deselect all',
        'pdf_error_no_file': '⚠️ Choose a PDF file first',
        'pdf_error_read_fail': '⚠️ Couldn\'t read this file, try another one'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    document.getElementById('langToggleLabel').textContent = currentLang === 'ar' ? 'English' : 'العربية';
    applyTranslations();
}

function t(key, replace = null) {
    let text = translations[currentLang][key] || key;
    if (replace) {
        for (const [k, v] of Object.entries(replace)) {
            text = text.replace(`{${k}}`, v);
        }
    }
    return text;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (key) {
            const translation = t(key);
            if (translation && translation !== key) {
                el.textContent = translation;
            }
        }
    });
    renderDashboard();
    renderTables();
    renderKitchenOrders();
    renderMenuView();
    renderSettings();
    updateShiftIndicator();
}

// ============================================================
// FEES STATE
// ============================================================
let serviceFeePercent = 10;
let vatPercent = 14;
let businessLogo = null;

function loadFeesSettings() {
    const saved = localStorage.getItem('platepro_service_fee');
    if (saved) serviceFeePercent = parseFloat(saved) || 10;
    const savedVat = localStorage.getItem('platepro_vat');
    if (savedVat) vatPercent = parseFloat(savedVat) || 14;
}

function saveFeesSettings() {
    const serviceInput = document.getElementById('serviceFeeInput');
    const vatInput = document.getElementById('vatInput');
    const errEl = document.getElementById('feesError');

    const service = parseFloat(serviceInput.value);
    const vat = parseFloat(vatInput.value);

    if (isNaN(service) || service < 0) { errEl.textContent = t('error_general'); return; }
    if (isNaN(vat) || vat < 0) { errEl.textContent = t('error_general'); return; }

    serviceFeePercent = service;
    vatPercent = vat;
    localStorage.setItem('platepro_service_fee', service.toString());
    localStorage.setItem('platepro_vat', vat.toString());

    closeSheet('settingsFeesOverlay');
    showToast(t('fees_saved'), 'success');
    renderSettings();
    updateCustomerCartUI();
}

function openFeesSettings() {
    document.getElementById('serviceFeeInput').value = serviceFeePercent;
    document.getElementById('vatInput').value = vatPercent;
    document.getElementById('feesError').textContent = '';
    openSheet('settingsFeesOverlay');
}

// ============================================================
// LOGO MANAGEMENT
// ============================================================
function loadLogo() {
    const saved = localStorage.getItem('platepro_logo');
    if (saved) {
        businessLogo = saved;
        updateLogoUI();
    }
}

function updateLogoUI() {
    const container = document.getElementById('bizLogoContainer');
    const customerContainer = document.getElementById('customerLogoContainer');
    if (businessLogo) {
        container.innerHTML = `<img src="${businessLogo}" class="logo-img" alt="Logo">`;
        customerContainer.innerHTML = `<img src="${businessLogo}" class="logo-img" alt="Logo">`;
    } else {
        container.innerHTML = '';
        customerContainer.innerHTML = '';
    }
}

function openLogoSettings() {
    document.getElementById('logoInput').value = '';
    document.getElementById('logoPreview').style.display = 'none';
    document.getElementById('removeLogoBtn').style.display = businessLogo ? 'inline-flex' : 'none';
    document.getElementById('logoError').textContent = '';
    if (businessLogo) {
        document.getElementById('logoPreviewImg').src = businessLogo;
        document.getElementById('logoPreview').style.display = 'block';
    }
    openSheet('settingsLogoOverlay');
}

document.addEventListener('DOMContentLoaded', function() {
    const logoInput = document.getElementById('logoInput');
    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('logoPreviewImg').src = event.target.result;
                    document.getElementById('logoPreview').style.display = 'block';
                    document.getElementById('removeLogoBtn').style.display = 'inline-flex';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const menuImageInput = document.getElementById('menuItemImageInput');
    if (menuImageInput) {
        menuImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('menuItemImagePreviewImg').src = event.target.result;
                    document.getElementById('menuItemImagePreview').style.display = 'block';
                    document.getElementById('menuItemImageData').value = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function saveLogo() {
    const fileInput = document.getElementById('logoInput');
    const errEl = document.getElementById('logoError');

    if (fileInput.files.length === 0) {
        errEl.textContent = t('error_general');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        businessLogo = event.target.result;
        localStorage.setItem('platepro_logo', businessLogo);
        updateLogoUI();
        closeSheet('settingsLogoOverlay');
        showToast(t('logo_saved'), 'success');
        renderSettings();
    };
    reader.onerror = function() {
        errEl.textContent = t('error_upload');
    };
    reader.readAsDataURL(file);
}

function removeLogo() {
    if (!confirm(t('remove_logo') + '؟')) return;
    businessLogo = null;
    localStorage.removeItem('platepro_logo');
    updateLogoUI();
    document.getElementById('logoPreview').style.display = 'none';
    document.getElementById('removeLogoBtn').style.display = 'none';
    document.getElementById('logoInput').value = '';
    showToast(t('logo_deleted'), 'success');
    renderSettings();
}

// ============================================================
// THEME SYSTEM
// ============================================================
function toggleTheme() {
    const currentTheme = localStorage.getItem('platepro_theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('platepro_theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('platepro_theme', 'dark');
    }
    updateThemeToggle();
}

function loadTheme() {
    const saved = localStorage.getItem('platepro_theme') || 'dark';
    applyTheme(saved);
}

function updateThemeToggle() {
    const currentTheme = localStorage.getItem('platepro_theme') || 'dark';
    const toggle = document.getElementById('themeToggle');
    const label = document.getElementById('themeToggleLabel');
    if (toggle) {
        toggle.classList.toggle('active', currentTheme === 'light');
    }
    if (label) {
        label.textContent = currentTheme === 'dark' ? t('dark') : t('light');
    }
}

// ============================================================
// STATE
// ============================================================
let business = null;
let deviceRecord = null;
let currentUser = null;
let tables = [];
let orders = {};
let menuItems = [];
let menuCategories = [];
let employees = [];
let paymentMethods = [];
let currentShift = null;
let shiftManuallyClosed = false;
let _orderItems = [];
let selectedPaymentMethod = null;
let orderStatus = {};
let qrGenerated = false;
let editingTableId = null;
let realtimeSubscription = null;
let shiftFilter = 'daily';

// ============================================================
// CUSTOMER PAGE STATE
// ============================================================
let customerCart = [];
let customerBusiness = null;
let customerMenuItems = [];
let customerCategories = [];
let currentCustomerFilter = 'all';
let customerBusinessId = null;

// ============================================================
// UTILITIES
// ============================================================
function showToast(msg, type = 'success') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast ' + type;
    el.style.display = 'block';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.display = 'none'; }, 2800);
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function openSheet(id) { document.getElementById(id).classList.add('show'); }

function closeSheet(id) { document.getElementById(id).classList.remove('show'); }

function navigateTo(viewId) {
    if (currentUser && currentUser.type !== 'owner') {
        const perms = currentUser.permissions || {};
        const viewMap = {
            'view-dashboard': 'dashboard',
            'view-tables': 'tables',
            'view-kitchen': 'orders',
            'view-menu': 'menu',
            'view-settings': 'settings',
            'view-qr': 'dashboard',
            'view-shift-history': 'dashboard',
            'view-shift-detail': 'dashboard'
        };
        const permKey = viewMap[viewId];
        if (permKey && !perms[permKey] && viewId !== 'view-qr' && viewId !== 'view-shift-history' && viewId !== 'view-shift-detail') {
            showToast(t('error_permission'), 'error');
            return;
        }
    }

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));

    updateUIByPermissions();

    if (viewId === 'view-dashboard') renderDashboard();
    if (viewId === 'view-tables') renderTables();
    if (viewId === 'view-kitchen') renderKitchenOrders();
    if (viewId === 'view-menu') { renderMenuView(); renderMenuManagement(); }
    if (viewId === 'view-settings') renderSettings();
    if (viewId === 'view-qr') generateQRCodePage();
    if (viewId === 'view-shift-history') renderShiftHistoryPage(shiftFilter);
}

function getDeviceId() {
    let id = localStorage.getItem('platepro_device_id');
    if (!id) {
        id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('platepro_device_id', id);
    }
    return id;
}

function money(n) {
    return (Number(n) || 0).toLocaleString('ar-EG', { maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ============================================================
// HAMBURGER MENU
// ============================================================
function toggleHamburgerMenu() {
    const dropdown = document.getElementById('hamburgerDropdown');
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains('show');
    if (isOpen) {
        closeHamburgerMenu();
        return;
    }

    // نحسب مكان الزر على الشاشة الفعلية ونمنع القائمة من الخروج برا حدود الشاشة
    const btn = document.querySelector('.hamburger-btn');
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const margin = 10;
        const dropdownWidth = Math.min(200, window.innerWidth - margin * 2);

        let left = rect.left;
        // منع الخروج من الجهة اليمين
        if (left + dropdownWidth > window.innerWidth - margin) {
            left = window.innerWidth - margin - dropdownWidth;
        }
        // منع الخروج من الجهة الشمال
        if (left < margin) {
            left = margin;
        }

        let top = rect.bottom + 6;
        if (top + 250 > window.innerHeight) {
            top = Math.max(margin, rect.top - 6 - 250);
        }

        dropdown.style.left = left + 'px';
        dropdown.style.top = top + 'px';
    }

    dropdown.classList.add('show');
}

function closeHamburgerMenu() {
    const dropdown = document.getElementById('hamburgerDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

window.addEventListener('resize', closeHamburgerMenu);

document.addEventListener('click', function(e) {
    const menu = document.querySelector('.hamburger-menu');
    if (menu && !menu.contains(e.target)) {
        closeHamburgerMenu();
    }
});

// ============================================================
// RING NOTIFICATION
// ============================================================
let audioContext = null;
let ringTimeout = null;

function initAudio() {
    try {
        audioContext = new(window.AudioContext || window.webkitAudioContext)();
        console.log('🎵 Audio initialized');
    } catch (e) {
        console.warn('⚠️ Audio not supported');
    }
}

function playRingSound(type = 'new_order') {
    try {
        if (!audioContext) { initAudio(); }
        if (!audioContext) return;
        if (audioContext.state === 'suspended') { audioContext.resume(); }

        const now = audioContext.currentTime;

        if (type === 'new_order') {
            const frequencies = [800, 1000, 1200, 1000, 800];
            const durations = [0.15, 0.15, 0.15, 0.15, 0.2];
            let time = now;
            frequencies.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.setValueAtTime(freq, time);
                gain.gain.setValueAtTime(0.25, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);
                osc.start(time);
                osc.stop(time + durations[i]);
                time += durations[i] + 0.05;
            });
            if (navigator.vibrate) { navigator.vibrate([200, 100, 200, 100, 200]); }
        } else if (type === 'order_ready') {
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            osc1.frequency.setValueAtTime(1000, now);
            osc1.frequency.setValueAtTime(1200, now + 0.1);
            osc1.frequency.setValueAtTime(1000, now + 0.2);
            gain1.gain.setValueAtTime(0.3, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc1.start(now);
            osc1.stop(now + 0.3);

            setTimeout(() => {
                if (!audioContext) return;
                const now2 = audioContext.currentTime;
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.setValueAtTime(1200, now2);
                osc2.frequency.setValueAtTime(1500, now2 + 0.1);
                osc2.frequency.setValueAtTime(1200, now2 + 0.2);
                gain2.gain.setValueAtTime(0.3, now2);
                gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.3);
                osc2.start(now2);
                osc2.stop(now2 + 0.3);
            }, 400);
            if (navigator.vibrate) { navigator.vibrate([300, 150, 300]); }
        }
    } catch (e) {
        console.warn('⚠️ Could not play sound:', e);
    }
}

function showRingNotification(title, message, type = 'new_order') {
    playRingSound(type);
    const el = document.getElementById('ringNotification');
    if (!el) {
        showToast(`🔔 ${title}: ${message}`, 'info');
        return;
    }
    document.getElementById('ringTitle').textContent = title;
    document.getElementById('ringSub').textContent = message;
    el.classList.add('show');
    clearTimeout(ringTimeout);
    ringTimeout = setTimeout(() => { el.classList.remove('show'); }, 5000);
    el.onclick = function() { el.classList.remove('show');
        clearTimeout(ringTimeout); };
}

// ============================================================
// PERMISSIONS
// ============================================================
function hasPermission(perm) {
    if (!currentUser) return false;
    if (currentUser.type === 'owner') return true;

    if (currentUser.role === 'chef') {
        const chefPerms = ['orders', 'kitchen'];
        return chefPerms.includes(perm);
    }
    if (currentUser.role === 'waiter') {
        const waiterPerms = ['orders', 'tables', 'create_orders', 'print_receipt'];
        return waiterPerms.includes(perm);
    }
    if (currentUser.role === 'cashier') {
        const cashierPerms = ['dashboard', 'tables', 'orders', 'payment', 'add_expense', 'print_receipt', 'view_revenue', 'view_expenses'];
        return cashierPerms.includes(perm) || (currentUser.permissions && currentUser.permissions[perm] === true);
    }

    return currentUser.permissions && currentUser.permissions[perm] === true;
}

function updateUIByPermissions() {
    const expenseBtn = document.getElementById('dashExpenseBtn');
    const closeShiftBtn = document.getElementById('dashCloseShiftBtn');
    const revenueCard = document.querySelector('.stat-card.revenue');

    if (expenseBtn) expenseBtn.style.display = hasPermission('add_expense') ? 'flex' : 'none';
    if (closeShiftBtn) closeShiftBtn.style.display = hasPermission('close_shift') ? 'flex' : 'none';

    if (revenueCard) {
        const canViewRevenue = hasPermission('view_revenue') || currentUser?.type === 'owner';
        revenueCard.style.display = canViewRevenue ? 'block' : 'none';
    }

    const menuManageBtns = document.querySelectorAll('#view-menu .btn-primary, #view-menu .btn-outline');
    menuManageBtns.forEach(btn => {
        btn.style.display = hasPermission('manage_menu') ? 'inline-flex' : 'none';
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        const view = btn.dataset.view;
        const viewMap = {
            'view-dashboard': 'dashboard',
            'view-tables': 'tables',
            'view-kitchen': 'orders',
            'view-menu': 'menu',
            'view-settings': 'settings'
        };
        const permKey = viewMap[view];
        if (permKey) {
            btn.style.display = hasPermission(permKey) ? 'flex' : 'none';
        }
    });

    const qrBtn = document.querySelector('[onclick*="view-qr"]');
    if (qrBtn) {
        qrBtn.style.display = hasPermission('dashboard') ? 'flex' : 'none';
    }
}

async function openNewShift() {
    shiftManuallyClosed = false;
    await loadOrOpenShift();
    updateShiftIndicator();
    renderDashboard();
    renderSettings();
    if (currentShift && !currentShift.id.toString().startsWith('temp_')) {
        showToast('✅ تم فتح شيفت جديد', 'success');
    }
}

// ============================================================
// SHIFT INDICATOR
// ============================================================
function updateShiftIndicator() {
    const indicator = document.getElementById('shiftIndicator');
    const label = document.getElementById('shiftStatusLabel');
    const closeShiftBtn = document.getElementById('dashCloseShiftBtn');

    if (currentShift && currentShift.status === 'open') {
        if (indicator) {
            indicator.className = 'shift-indicator';
            label.textContent = t('shift_open');
            label.style.color = 'var(--success)';
            const time = new Date(currentShift.opened_at).toLocaleTimeString();
            indicator.title = `فتح في: ${time}`;
        }
        if (closeShiftBtn) {
            closeShiftBtn.className = 'btn btn-danger btn-block';
            closeShiftBtn.innerHTML = `<i class="fa-solid fa-lock"></i> <span data-i18n="close_shift">${t('close_shift')}</span>`;
            closeShiftBtn.onclick = openCloseShiftSheet;
        }
    } else {
        if (indicator) {
            indicator.className = 'shift-indicator closed';
            label.textContent = t('shift_closed');
            label.style.color = 'var(--danger)';
        }
        if (closeShiftBtn) {
            closeShiftBtn.className = 'btn btn-primary btn-block';
            closeShiftBtn.innerHTML = `<i class="fa-solid fa-unlock"></i> <span data-i18n="open_new_shift">${t('open_new_shift')}</span>`;
            closeShiftBtn.onclick = openNewShift;
        }
    }
}

// ============================================================
// QR CODE
// ============================================================
function generateQRCodePage() {
    if (!business) {
        showToast('⚠️ لا يوجد نشاط تجاري', 'error');
        return;
    }
    const bizId = business.id;
    const baseUrl = window.location.origin + window.location.pathname;
    const customerUrl = baseUrl + '?customer=true&biz=' + bizId;
    const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(customerUrl);
    document.getElementById('qrCodeImagePage').src = qrApiUrl;
    qrGenerated = true;
    localStorage.setItem('platepro_customer_url', customerUrl);
    localStorage.setItem('platepro_business_id', bizId);
    showToast(t('qr_generated'), 'success');
}

function downloadQRPage() {
    const link = document.createElement('a');
    link.download = 'QR_' + (business ? business.code : 'cafe') + '.png';
    link.href = document.getElementById('qrCodeImagePage').src;
    link.click();
}

// ============================================================
// REALTIME SYNC
// ============================================================
function getTableLabel(tableId) {
    const table = tables.find(t => t.id === tableId);
    return table ? table.number : '?';
}

function startRealtimeSync() {
    if (!supabaseClient || !business) {
        console.warn('⚠️ Cannot start realtime sync: missing client or business');
        return;
    }

    if (realtimeSubscription) {
        realtimeSubscription.unsubscribe();
        realtimeSubscription = null;
    }

    console.log('🔄 Starting realtime sync for orders...');

    realtimeSubscription = supabaseClient
        .channel('orders-changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'orders',
                filter: `business_id=eq.${business.id}`
            },
            async (payload) => {
                console.log('📡 Realtime update received:', payload);
                
                const { eventType, new: newRecord, old: oldRecord } = payload;
                
                if (eventType === 'INSERT') {
                    orders[newRecord.id] = newRecord;
                    if (!orderStatus[newRecord.id]) {
                        orderStatus[newRecord.id] = newRecord.status || 'pending';
                    }
                    showRingNotification(
                        '🔔 طلب جديد!',
                        `طاولة ${getTableLabel(newRecord.table_id)} - ${newRecord.status || 'جديد'}`,
                        'new_order'
                    );
                } else if (eventType === 'UPDATE') {
                    if (orders[oldRecord.id]) {
                        const oldStatus = oldRecord.status;
                        const newStatus = newRecord.status;
                        if (oldStatus !== newStatus) {
                            if (newStatus === 'ready') {
                                showRingNotification(
                                    '🛎️ طلب جاهز للتسليم!',
                                    `طاولة ${getTableLabel(newRecord.table_id)} - انتظر الويتر`,
                                    'order_ready'
                                );
                            }
                        }
                        orders[newRecord.id] = newRecord;
                        orderStatus[newRecord.id] = newRecord.status || 'pending';
                    }
                } else if (eventType === 'DELETE') {
                    delete orders[oldRecord.id];
                    delete orderStatus[oldRecord.id];
                }
                
                renderDashboard();
                renderTables();
                renderKitchenOrders();
            }
        )
        .subscribe((status) => {
            console.log('📡 Realtime subscription status:', status);
        });

    supabaseClient
        .channel('tables-changes')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'tables',
                filter: `business_id=eq.${business.id}`
            },
            async (payload) => {
                console.log('📡 Table update received:', payload);
                await loadTables();
                renderTables();
                renderDashboard();
            }
        )
        .subscribe();
}

function stopRealtimeSync() {
    if (realtimeSubscription) {
        realtimeSubscription.unsubscribe();
        realtimeSubscription = null;
        console.log('🔄 Realtime sync stopped');
    }
}

// ============================================================
// CUSTOMER PAGE
// ============================================================
function initCustomerPage() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('customer') === 'true') {
        document.getElementById('setupScreen').classList.remove('active');
        document.getElementById('mainApp').classList.remove('active');
        document.getElementById('customerPage').classList.add('active');
        loadCustomerData();
    }
}

async function loadCustomerData() {
    const params = new URLSearchParams(window.location.search);
    let bizId = params.get('biz');
    
    if (!bizId) {
        bizId = localStorage.getItem('platepro_business_id');
    }
    
    if (!bizId) {
        document.getElementById('customerBizName').textContent = '❌ مطعم غير موجود';
        document.getElementById('customerMenuItems').innerHTML = `
            <div class="empty" style="padding:40px 16px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size:40px;color:var(--danger);"></i>
                <div style="font-size:16px; font-weight:700; margin-top:8px;">رابط غير صحيح</div>
                <div style="font-size:13px; color:var(--text-muted);">تأكد من الرابط المستخدم</div>
            </div>
        `;
        return;
    }

    customerBusinessId = bizId;

    if (!supabaseClient) {
        document.getElementById('customerBizName').textContent = '⚠️ خطأ في الاتصال';
        document.getElementById('customerMenuItems').innerHTML = `
            <div class="empty" style="padding:40px 16px;">
                <i class="fa-solid fa-wifi" style="font-size:40px;color:var(--warning);"></i>
                <div style="font-size:16px; font-weight:700; margin-top:8px;">خطأ في الاتصال</div>
                <div style="font-size:13px; color:var(--text-muted);">تأكد من اتصال الإنترنت</div>
            </div>
        `;
        return;
    }

    try {
        const { data: biz, error: bizError } = await supabaseClient
            .from('businesses')
            .select('*')
            .eq('id', bizId)
            .maybeSingle();

        if (bizError || !biz) {
            document.getElementById('customerBizName').textContent = '❌ مطعم غير موجود';
            document.getElementById('customerMenuItems').innerHTML = `
                <div class="empty" style="padding:40px 16px;">
                    <i class="fa-solid fa-store-slash" style="font-size:40px;color:var(--danger);"></i>
                    <div style="font-size:16px; font-weight:700; margin-top:8px;">المطعم غير موجود</div>
                    <div style="font-size:13px; color:var(--text-muted);">تأكد من الكود المستخدم</div>
                </div>
            `;
            return;
        }

        customerBusiness = biz;
        document.getElementById('customerBizName').textContent = biz.name;
        document.title = biz.name + ' - Menu';

        const savedLogo = localStorage.getItem('platepro_logo');
        if (savedLogo) {
            const logoContainer = document.getElementById('customerLogoContainer');
            logoContainer.innerHTML = `<img src="${savedLogo}" class="logo-img" alt="Logo">`;
        }

        const [itemsRes, catsRes] = await Promise.all([
            supabaseClient.from('menu_items')
                .select('*')
                .eq('business_id', bizId)
                .eq('is_active', true)
                .order('sort_order'),
            supabaseClient.from('menu_categories')
                .select('*')
                .eq('business_id', bizId)
                .eq('is_active', true)
                .order('sort_order')
        ]);

        customerMenuItems = itemsRes.data || [];
        customerCategories = catsRes.data || [];

        await renderCustomerTables();
        renderCustomerCategories();
        renderCustomerItems();
        loadFeesSettings();

        console.log('✅ Customer data loaded successfully');

    } catch (e) {
        console.error('Error loading customer data:', e);
        document.getElementById('customerBizName').textContent = '⚠️ خطأ في التحميل';
        document.getElementById('customerMenuItems').innerHTML = `
            <div class="empty" style="padding:40px 16px;">
                <i class="fa-solid fa-circle-exclamation" style="font-size:40px;color:var(--danger);"></i>
                <div style="font-size:16px; font-weight:700; margin-top:8px;">⚠️ حدث خطأ</div>
                <div style="font-size:13px; color:var(--text-muted);">حاول تحديث الصفحة</div>
            </div>
        `;
    }
}

async function renderCustomerTables() {
    if (!customerBusiness) return;
    const bizId = customerBusiness.id;
    try {
        const { data: tablesData } = await supabaseClient
            .from('tables')
            .select('*')
            .eq('business_id', bizId)
            .order('number');

        const tableSelect = document.getElementById('customerTableSelect');
        if (tablesData && tablesData.length > 0) {
            const availableTables = tablesData.filter(t => t.status === 'available');
            if (availableTables.length > 0) {
                tableSelect.innerHTML = `<option value="">-- اختر طاولة --</option>
                            ${availableTables.map(t => `<option value="${t.id}">طاولة ${t.number} (${t.capacity || 4} أشخاص)</option>`).join('')}`;
            } else {
                tableSelect.innerHTML = `<option value="">⚠️ مفيش طاولات متاحة حالياً</option>`;
            }
        } else {
            tableSelect.innerHTML = `<option value="">⚠️ مفيش طاولات متاحة حالياً</option>`;
        }
    } catch (e) {
        console.error('Error loading tables:', e);
    }
}

function renderCustomerCategories() {
    const container = document.getElementById('customerCategories');
    if (!container) return;
    container.innerHTML = `<button class="btn active" onclick="filterCustomerItems('all')">${t('all')}</button>
                ${customerCategories.map(cat => `<button class="btn" onclick="filterCustomerItems('${cat.id}')"><i class="fa-solid ${cat.icon || 'fa-utensils'}"></i> ${escapeHtml(cat.name)}</button>`).join('')}`;
}

function filterCustomerItems(categoryId) {
    currentCustomerFilter = categoryId;
    document.querySelectorAll('#customerCategories .btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('#customerCategories .btn');
    const idx = categoryId === 'all' ? 0 : customerCategories.findIndex(c => c.id === categoryId) + 1;
    if (btns[idx]) btns[idx].classList.add('active');
    renderCustomerItems(categoryId);
}

function renderCustomerItems(categoryId) {
    const container = document.getElementById('customerMenuItems');
    if (!container) return;
    let items = customerMenuItems;
    if (categoryId && categoryId !== 'all') {
        items = items.filter(item => item.category_id === categoryId);
    }
    if (!items || items.length === 0) {
        container.innerHTML = `<div class="empty" style="padding:40px 16px;"><i class="fa-solid fa-utensils" style="font-size:40px;"></i><div style="font-size:16px; font-weight:700; margin-top:8px;">${t('no_items')}</div><div style="font-size:13px; color:var(--text-muted);">جاري تحديث المنيو</div></div>`;
        return;
    }
    container.innerHTML = items.map(item => {
        let imageHtml = '🍽️';
        if (item.image_url) {
            imageHtml = `<img src="${item.image_url}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none';this.parentElement.innerHTML='🍽️'">`;
        }
        return `<div class="customer-menu-card">
                        <div class="item-image">${imageHtml}</div>
                        <div class="item-info">
                            <div class="item-name">${escapeHtml(item.name)}</div>
                            ${item.description ? `<div class="item-desc">${escapeHtml(item.description)}</div>` : ''}
                            <div class="item-price">${money(item.price)} ج.م</div>
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-primary btn-xs" onclick="addToCustomerCart('${item.id}')"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>`;
    }).join('');
}

// ============================================================
// CUSTOMER CART
// ============================================================
function addToCustomerCart(itemId) {
    const item = customerMenuItems.find(i => i.id === itemId);
    if (!item) return;
    const existing = customerCart.find(i => i.id === itemId);
    if (existing) { existing.quantity += 1; } else { customerCart.push({ ...item, quantity: 1 }); }
    updateCustomerCartUI();
    showCustomerToast('✅ تم إضافة ' + item.name);
}

function updateCustomerCartUI() {
    const cart = document.getElementById('customerCart');
    const count = customerCart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = customerCart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const serviceFee = subtotal * (serviceFeePercent / 100);
    const vat = (subtotal + serviceFee) * (vatPercent / 100);
    const total = subtotal + serviceFee + vat;

    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = money(total);
    if (cart) cart.style.display = count > 0 ? 'block' : 'none';
}

function showCustomerCart() {
    const container = document.getElementById('customerCartItems');
    if (customerCart.length === 0) {
        container.innerHTML = `<div class="empty">${t('empty_cart')}</div>`;
        document.getElementById('customerCartTotal').textContent = '0';
        openSheet('customerCartOverlay');
        return;
    }
    container.innerHTML = customerCart.map((item, index) =>
        `<div class="order-item">
                        <div>
                            <div class="item-name">${escapeHtml(item.name)}</div>
                            <div class="item-details">${item.quantity} × ${money(item.price)}
                                <button class="btn btn-xs" style="background:var(--danger);color:#fff;border:none;border-radius:4px;cursor:pointer;margin-right:8px;" onclick="removeFromCustomerCart(${index})"><i class="fa-solid fa-minus"></i></button>
                            </div>
                        </div>
                        <div class="item-price">${money(item.price * item.quantity)}</div>
                    </div>`
    ).join('');

    const subtotal = customerCart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const serviceFee = subtotal * (serviceFeePercent / 100);
    const vat = (subtotal + serviceFee) * (vatPercent / 100);
    const total = subtotal + serviceFee + vat;

    document.getElementById('cartSubtotal').textContent = money(subtotal);
    document.getElementById('serviceFeePercent').textContent = serviceFeePercent;
    document.getElementById('cartServiceFee').textContent = money(serviceFee);
    document.getElementById('vatPercent').textContent = vatPercent;
    document.getElementById('cartVat').textContent = money(vat);
    document.getElementById('customerCartTotal').textContent = money(total);

    openSheet('customerCartOverlay');
}

function removeFromCustomerCart(index) {
    customerCart.splice(index, 1);
    updateCustomerCartUI();
    showCustomerCart();
}

function showCustomerToast(msg) {
    const el = document.getElementById('customerToast');
    el.textContent = msg;
    el.className = 'toast success';
    el.style.display = 'block';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.display = 'none'; }, 2000);
}

// ============================================================
// SUBMIT CUSTOMER ORDER
// ============================================================
async function submitCustomerOrder() {
    if (customerCart.length === 0) {
        document.getElementById('customerCartError').textContent = t('error_no_items');
        return;
    }
    const tableSelect = document.getElementById('customerTableSelect');
    const tableId = tableSelect.value;
    if (!tableId) {
        document.getElementById('customerCartError').textContent = '⚠️ اختر رقم الطاولة أولاً';
        return;
    }
    if (!customerBusiness) {
        document.getElementById('customerCartError').textContent = t('error_general');
        return;
    }

    try {
        const { data: tableData } = await supabaseClient
            .from('tables')
            .select('*')
            .eq('id', tableId)
            .single();

        if (!tableData || tableData.status !== 'available') {
            document.getElementById('customerCartError').textContent = '⚠️ الطاولة أصبحت مشغولة، اختر طاولة أخرى';
            loadCustomerData();
            return;
        }

        await supabaseClient.from('tables').update({ status: 'occupied' }).eq('id', tableId);

        const subtotal = customerCart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        const serviceFee = subtotal * (serviceFeePercent / 100);
        const vat = (subtotal + serviceFee) * (vatPercent / 100);
        const total = subtotal + serviceFee + vat;

        const { data: order, error } = await supabaseClient.from('orders').insert({
            business_id: customerBusiness.id,
            table_id: tableId,
            order_type: 'dine_in',
            status: 'pending',
            subtotal: subtotal,
            total: total,
            notes: '📱 طلب من العميل عبر QR\n' +
                'رسوم الخدمة: ' + money(serviceFee) + '\n' +
                'ضريبة القيمة المضافة: ' + money(vat)
        }).select().single();

        if (error) throw error;

        const orderItems = customerCart.map(item => ({
            order_id: order.id,
            menu_item_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            total: item.price * item.quantity,
            status: 'pending'
        }));

        await supabaseClient.from('order_items').insert(orderItems);

        customerCart = [];
        updateCustomerCartUI();
        closeSheet('customerCartOverlay');
        showCustomerToast(t('order_created'));
        document.getElementById('customerCartError').textContent = '';
        await loadCustomerData();
        localStorage.setItem('platepro_need_refresh', 'true');
        localStorage.setItem('platepro_last_order_time', Date.now().toString());

    } catch (e) {
        console.error('Error submitting order:', e);
        document.getElementById('customerCartError').textContent = t('error_general');
    }
}

// ============================================================
// SETUP / ACTIVATION / LOCK
// ============================================================
async function handleSetupContinue() {
    const code = document.getElementById('setupBusinessCode').value.trim().toUpperCase();
    const errEl = document.getElementById('setupError');
    errEl.textContent = '';
    if (!code) { errEl.textContent = t('error_invalid_code'); return; }

    const btn = document.getElementById('setupContinueBtn');
    btn.disabled = true;

    try {
        if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }
        const { data: biz, error } = await supabaseClient.from('businesses').select('*').eq('code', code).single();
        if (error || !biz) { errEl.textContent = t('error_invalid_code'); return; }
        business = biz;
        localStorage.setItem('platepro_business_code', code);

        loadLogo();

        const deviceId = getDeviceId();
        const { data: dev } = await supabaseClient.from('devices').select('*').eq('business_id', biz.id).eq('device_id', deviceId).maybeSingle();

        if (!dev) {
            document.getElementById('activationBizName').textContent = biz.name;
            showScreen('activationScreen');
            return;
        }
        deviceRecord = dev;
        proceedToLock();
    } catch (e) {
        console.error(e);
        errEl.textContent = t('error_connection');
    } finally { btn.disabled = false; }
}

async function handleActivateDevice() {
    const code = document.getElementById('activationCodeInput').value.trim().toUpperCase();
    const errEl = document.getElementById('activationError');
    errEl.textContent = '';
    if (!code) { errEl.textContent = t('error_general'); return; }

    try {
        if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }
        const { data: actCode, error } = await supabaseClient.from('activation_codes').select('*').eq('business_id', business.id).eq('code', code).eq('used', false).single();
        if (error || !actCode) { errEl.textContent = 'الكود غير صحيح أو مستخدم قبل كده.'; return; }

        const deviceId = getDeviceId();
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        const { data: newDev, error: devErr } = await supabaseClient.from('devices').insert({
            business_id: business.id,
            device_id: deviceId,
            device_label: 'جهاز جديد',
            is_active: true,
            revoked: false,
            expiry_date: expiry.toISOString()
        }).select().single();

        if (devErr) { errEl.textContent = t('error_general'); return; }

        await supabaseClient.from('activation_codes').update({ used: true, used_at: new Date().toISOString() }).eq('id', actCode.id);
        deviceRecord = newDev;
        showToast(t('device_activated'), 'success');
        proceedToLock();
    } catch (e) {
        console.error(e);
        errEl.textContent = t('error_connection');
    }
}

function proceedToLock() {
    document.getElementById('lockBizCode').textContent = business.code;
    document.getElementById('lockBizName').textContent = business.name;

    const expiry = deviceRecord.expiry_date ? new Date(deviceRecord.expiry_date) : null;
    const subLine = document.getElementById('subStatusLine');
    if (deviceRecord.revoked || !deviceRecord.is_active) {
        subLine.textContent = 'الجهاز موقوف — تواصل مع الإدارة';
    } else if (expiry && expiry < new Date()) {
        subLine.textContent = 'الاشتراك منتهي — تواصل مع الإدارة';
    } else if (expiry) {
        const days = Math.ceil((expiry - new Date()) / 86400000);
        subLine.textContent = `متبقي ${days} يوم على الاشتراك`;
    }
    resetLockRole();
    showScreen('lockScreen');
}

function selectLockRole(role) {
    document.getElementById('lockError').textContent = '';
    document.getElementById('lockRoleChoice').style.display = 'none';
    document.getElementById('lockOwnerForm').style.display = role === 'owner' ? 'block' : 'none';
    document.getElementById('lockEmployeeForm').style.display = role === 'employee' ? 'block' : 'none';
}

function resetLockRole() {
    document.getElementById('lockError').textContent = '';
    document.getElementById('lockPinInput').value = '';
    document.getElementById('lockEmpName').value = '';
    document.getElementById('lockEmpPin').value = '';
    document.getElementById('lockOwnerForm').style.display = 'none';
    document.getElementById('lockEmployeeForm').style.display = 'none';
    document.getElementById('lockRoleChoice').style.display = 'block';
}

async function handleEmployeeUnlock() {
    const name = document.getElementById('lockEmpName').value.trim();
    const pin = document.getElementById('lockEmpPin').value.trim();
    const errEl = document.getElementById('lockError');
    errEl.textContent = '';

    if (deviceRecord.revoked || !deviceRecord.is_active) { errEl.textContent = t('error_general'); return; }
    if (deviceRecord.expiry_date && new Date(deviceRecord.expiry_date) < new Date()) { errEl.textContent = 'الاشتراك منتهي.'; return; }
    if (!name || !pin) { errEl.textContent = t('error_general'); return; }

    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }
    const { data: emps, error } = await supabaseClient.from('employees').select('*').eq('business_id', business.id).eq('is_active', true);
    if (error) { errEl.textContent = t('error_general'); return; }

    const emp = (emps || []).find(e => e.name && e.name.trim().toLowerCase() === name.toLowerCase() && String(e.pin) === pin);
    if (emp) {
        currentUser = { type: 'employee', ...emp };
        enterMainApp();
        return;
    }
    errEl.textContent = t('error_invalid_pin');
}

async function handleUnlock() {
    const pin = document.getElementById('lockPinInput').value.trim();
    const errEl = document.getElementById('lockError');
    errEl.textContent = '';

    if (deviceRecord.revoked || !deviceRecord.is_active) { errEl.textContent = t('error_general'); return; }
    if (deviceRecord.expiry_date && new Date(deviceRecord.expiry_date) < new Date()) { errEl.textContent = 'الاشتراك منتهي.'; return; }
    if (!pin) { errEl.textContent = t('error_general'); return; }

    if (pin === business.owner_pin) {
        currentUser = { type: 'owner', name: 'المالك' };
        enterMainApp();
        return;
    }

    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }
    const { data: emp } = await supabaseClient.from('employees').select('*').eq('business_id', business.id).eq('pin', pin).eq('is_active', true).maybeSingle();
    if (emp) {
        currentUser = { type: 'employee', ...emp };
        enterMainApp();
        return;
    }
    errEl.textContent = t('error_invalid_pin');
}

function lockApp() {
    currentUser = null;
    stopRealtimeSync();
    document.getElementById('lockPinInput').value = '';
    proceedToLock();
}

// ============================================================
// MAIN APP
// ============================================================
async function enterMainApp() {
    document.getElementById('headerBizName').textContent = business.name;
    document.getElementById('headerBizCode').textContent = business.code;
    showScreen('mainApp');

    loadTheme();
    loadFeesSettings();
    loadLogo();
    await loadAllData();

    await loadOrOpenShift();

    startRealtimeSync();

    document.getElementById('dashBizName').textContent = business.name;
    updateLogoUI();

    if (currentUser.type === 'owner') {
        currentUser.permissions = {
            dashboard: true, tables: true, orders: true, menu: true, settings: true,
            create_orders: true, add_expense: true, close_shift: true, print_receipt: true,
            manage_menu: true, view_revenue: true, view_expenses: true
        };
    }

    updateUIByPermissions();
    applyTranslations();
    renderDashboard();
    renderTables();
    renderKitchenOrders();
    renderMenuView();
    renderMenuManagement();
    renderSettings();
    updateShiftIndicator();

    setInterval(async () => {
        if (!shiftManuallyClosed && (!currentShift || currentShift.status !== 'open')) {
            await loadOrOpenShift();
        }
        updateShiftIndicator();
    }, 10000);

    startAutoRefresh();
}

// ============================================================
// SHIFT MANAGEMENT
// ============================================================
async function loadOrOpenShift() {
    if (!supabaseClient || !business) {
        console.warn('⚠️ Cannot load shift: missing client or business');
        return null;
    }

    try {
        let { data: shift, error } = await supabaseClient
            .from('shifts')
            .select('*')
            .eq('business_id', business.id)
            .eq('status', 'open')
            .maybeSingle();

        if (error) {
            console.error('Error fetching shift:', error);
        }

        if (!shift) {
            console.log('🔄 No open shift found, creating new one...');
            try {
                const { data: newShift, error: createError } = await supabaseClient
                    .from('shifts')
                    .insert({
                        business_id: business.id,
                        opened_at: new Date().toISOString(),
                        status: 'open',
                        total_revenue: 0,
                        total_expenses: 0,
                        total_profit: 0,
                        opened_by: currentUser?.name || 'نظام'
                    })
                    .select()
                    .single();

                if (!createError && newShift) {
                    shift = newShift;
                    console.log(`✅ New shift opened for business: ${business.name}`);
                    showToast('✅ تم فتح شيفت جديد', 'success');
                } else {
                    console.error('Error creating shift:', createError);
                }
            } catch (e) {
                console.error('Error in shift creation:', e);
            }
        } else {
            console.log(`✅ Shift already open since: ${new Date(shift.opened_at).toLocaleString()}`);
        }

        if (shift) {
            currentShift = shift;
            shiftManuallyClosed = false;
            updateShiftIndicator();
            return shift;
        } else {
            currentShift = {
                id: 'temp_' + Date.now(),
                business_id: business.id,
                status: 'open',
                opened_at: new Date().toISOString(),
                opened_by: currentUser?.name || 'نظام',
                total_revenue: 0,
                total_expenses: 0,
                total_profit: 0
            };
            console.log('⚠️ Using temporary shift in memory');
            updateShiftIndicator();
            return currentShift;
        }

    } catch (e) {
        console.error('Error in loadOrOpenShift:', e);
        currentShift = {
            id: 'temp_' + Date.now(),
            business_id: business.id,
            status: 'open',
            opened_at: new Date().toISOString(),
            opened_by: currentUser?.name || 'نظام',
            total_revenue: 0,
            total_expenses: 0,
            total_profit: 0
        };
        updateShiftIndicator();
        return currentShift;
    }
}

async function closeShift() {
    if (!supabaseClient || !currentShift) {
        showToast('⚠️ لا يوجد شيفت مفتوح', 'warning');
        return null;
    }

    if (!hasPermission('close_shift') && currentUser?.type !== 'owner') {
        showToast(t('error_permission'), 'error');
        return null;
    }

    if (currentShift.id && currentShift.id.toString().startsWith('temp_')) {
        showToast('⚠️ هذا شيفت مؤقت، سيتم إنشاء شيفت جديد تلقائياً', 'warning');
        currentShift = null;
        shiftManuallyClosed = true;
        updateShiftIndicator();
        return { revenue: 0, totalExpenses: 0, profit: 0 };
    }

    try {
        const { data: completedOrders, error: ordersError } = await supabaseClient
            .from('orders')
            .select('total')
            .eq('business_id', business.id)
            .eq('status', 'paid')
            .gte('created_at', currentShift.opened_at);

        if (ordersError) throw ordersError;

        const revenue = (completedOrders || []).reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        const { data: expenses, error: expensesError } = await supabaseClient
            .from('expenses')
            .select('amount')
            .eq('shift_id', currentShift.id);

        if (expensesError) throw expensesError;

        const totalExpenses = (expenses || []).reduce((sum, e) => sum + Number(e.amount), 0);

        const profit = revenue - totalExpenses;

        const { error: updateError } = await supabaseClient
            .from('shifts')
            .update({
                status: 'closed',
                closed_at: new Date().toISOString(),
                closed_by: currentUser?.name || 'نظام',
                total_revenue: revenue,
                total_expenses: totalExpenses,
                total_profit: profit
            })
            .eq('id', currentShift.id);

        if (updateError) throw updateError;

        showToast(`✅ تم إقفال الشيفت - الإيراد: ${money(revenue)}`, 'success');
        currentShift = null;
        shiftManuallyClosed = true;
        updateShiftIndicator();
        renderDashboard();
        renderSettings();

        return { revenue, totalExpenses, profit };

    } catch (e) {
        console.error('Error closing shift:', e);
        showToast(t('shift_close_failed'), 'error');
        throw e;
    }
}

async function openCloseShiftSheet() {
    if (!hasPermission('close_shift') && currentUser?.type !== 'owner') {
        showToast(t('error_permission'), 'error');
        return;
    }

    if (!currentShift) {
        await loadOrOpenShift();
        if (!currentShift) {
            showToast(t('no_open_shift'), 'warning');
            return;
        }
    }

    if (!supabaseClient) return;

    try {
        const { data: completedOrders } = await supabaseClient
            .from('orders')
            .select('total')
            .eq('business_id', business.id)
            .eq('status', 'paid')
            .gte('created_at', currentShift.opened_at);

        const revenue = (completedOrders || []).reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        const { data: expenses } = await supabaseClient
            .from('expenses')
            .select('amount')
            .eq('shift_id', currentShift.id);

        const totalExpenses = (expenses || []).reduce((sum, e) => sum + Number(e.amount), 0);

        const profit = revenue - totalExpenses;

        document.getElementById('closeShiftSummary').innerHTML = `
            <div class="list-row">
                <div class="row-title">📅 تاريخ الفتح</div>
                <div class="row-value mono">${new Date(currentShift.opened_at).toLocaleString()}</div>
            </div>
            <div class="list-row">
                <div class="row-title">👤 فتح بواسطة</div>
                <div class="row-value mono">${currentShift.opened_by || 'نظام'}</div>
            </div>
            <div class="list-row">
                <div class="row-title">📋 الطلبات المدفوعة</div>
                <div class="row-value mono">${completedOrders?.length || 0}</div>
            </div>
            <div class="list-row">
                <div class="row-title">${t('shift_revenue')}</div>
                <div class="row-value mono" style="color:var(--success);">${money(revenue)}</div>
            </div>
            <div class="list-row">
                <div class="row-title">${t('shift_expenses')}</div>
                <div class="row-value mono" style="color:var(--danger);">${money(totalExpenses)}</div>
            </div>
            <div class="list-row" style="border-bottom: 2px solid var(--primary); padding-bottom: 12px;">
                <div class="row-title" style="font-size:16px; font-weight:800;">${t('shift_profit')}</div>
                <div class="row-value mono" style="font-size:18px; color:var(--primary-dark);">${money(profit)}</div>
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:8px; text-align:center;">
                ⚠️ تأكد من تحصيل جميع المدفوعات قبل الإقفال
            </div>
        `;

        document.getElementById('confirmCloseShiftBtn').onclick = async function() {
            const btn = this;
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإقفال...';
            
            try {
                await closeShift();
                closeSheet('closeShiftOverlay');
                renderDashboard();
                renderSettings();
                updateShiftIndicator();
            } catch (e) {
                showToast(t('shift_close_failed'), 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<span data-i18n="confirm_close">تأكيد الإقفال</span>';
            }
        };

        openSheet('closeShiftOverlay');
    } catch (e) {
        console.error('Error in openCloseShiftSheet:', e);
        showToast(t('error_general'), 'error');
    }
}

// ============================================================
// SHIFT HISTORY - سجل الشيفتات (صفحة منفصلة)
// ============================================================
async function renderShiftHistoryPage(filter = 'daily') {
    const container = document.getElementById('shiftHistoryListPage');
    if (!container) return;
    
    if (!supabaseClient || !business) {
        container.innerHTML = `<div class="empty">${t('loading')}</div>`;
        return;
    }
    
    try {
        let startDate;
        const now = new Date();
        
        if (filter === 'daily') {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
        } else if (filter === 'weekly') {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
        } else if (filter === 'monthly') {
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
        }
        
        const { data: shifts, error } = await supabaseClient
            .from('shifts')
            .select('*')
            .eq('business_id', business.id)
            .eq('status', 'closed')
            .gte('closed_at', startDate.toISOString())
            .order('closed_at', { ascending: false });
        
        if (error) throw error;
        
        if (!shifts || shifts.length === 0) {
            container.innerHTML = `<div class="empty"><i class="fa-solid fa-clock"></i> لا توجد شيفتات ${filter === 'daily' ? 'اليوم' : filter === 'weekly' ? 'هذا الأسبوع' : 'هذا الشهر'}</div>`;
            return;
        }
        
        container.innerHTML = shifts.map(shift => `
            <div class="shift-card" onclick="viewShiftDetail('${shift.id}')">
                <div class="shift-card-header">
                    <div class="shift-card-date">${new Date(shift.closed_at).toLocaleDateString('ar-EG')}</div>
                    <span class="badge badge-gold">${new Date(shift.closed_at).toLocaleTimeString('ar-EG')}</span>
                </div>
                <div class="shift-card-stats">
                    <span>💰 <span class="revenue">${money(shift.total_revenue || 0)}</span></span>
                    <span>📈 ${money(shift.total_profit || 0)}</span>
                    <span>👤 ${shift.closed_by || 'نظام'}</span>
                </div>
            </div>
        `).join('');
        
    } catch (e) {
        console.error('Error loading shift history:', e);
        container.innerHTML = `<div class="empty">⚠️ حدث خطأ في تحميل السجل</div>`;
    }
}

function filterShiftHistory(filter) {
    shiftFilter = filter;
    document.querySelectorAll('#shiftFilterTabs .btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderShiftHistoryPage(filter);
}

// ============================================================
// SHIFT DETAIL - تفاصيل الشيفت
// ============================================================
async function viewShiftDetail(shiftId) {
    if (!supabaseClient || !business) return;
    
    try {
        // جلب بيانات الشيفت
        const { data: shift, error: shiftError } = await supabaseClient
            .from('shifts')
            .select('*')
            .eq('id', shiftId)
            .single();
        
        if (shiftError) throw shiftError;
        
        // جلب الطلبات في هذا الشيفت
        const { data: ordersData, error: ordersError } = await supabaseClient
            .from('orders')
            .select('*, order_items(*, menu_items(*))')
            .eq('business_id', business.id)
            .gte('created_at', shift.opened_at)
            .lte('created_at', shift.closed_at || new Date().toISOString())
            .order('created_at', { ascending: true });
        
        if (ordersError) throw ordersError;
        
        // عرض تفاصيل الشيفت
        document.getElementById('shiftDetailDate').textContent = new Date(shift.closed_at).toLocaleDateString('ar-EG');
        document.getElementById('shiftDetailMeta').textContent = 
            `🕐 ${new Date(shift.opened_at).toLocaleTimeString('ar-EG')} - ${new Date(shift.closed_at).toLocaleTimeString('ar-EG')} · 👤 ${shift.closed_by || 'نظام'}`;
        
        document.getElementById('detailRevenue').textContent = money(shift.total_revenue || 0);
        document.getElementById('detailOrders').textContent = ordersData?.length || 0;
        
        // حساب عدد الطاولات المستخدمة
        const uniqueTables = new Set(ordersData?.map(o => o.table_id) || []);
        document.getElementById('detailTables').textContent = uniqueTables.size || 0;
        
        // عرض الطلبات
        const ordersContainer = document.getElementById('shiftDetailOrders');
        
        if (!ordersData || ordersData.length === 0) {
            ordersContainer.innerHTML = `<div class="empty">لا توجد طلبات في هذا الشيفت</div>`;
        } else {
            // تجميع الطلبات حسب الطاولة
            const tableOrders = {};
            ordersData.forEach(order => {
                if (!tableOrders[order.table_id]) {
                    tableOrders[order.table_id] = [];
                }
                tableOrders[order.table_id].push(order);
            });
            
            // جلب بيانات الطاولات
            const tableIds = Object.keys(tableOrders);
            const { data: tablesData } = await supabaseClient
                .from('tables')
                .select('*')
                .in('id', tableIds);
            
            const tableMap = {};
            (tablesData || []).forEach(t => { tableMap[t.id] = t; });
            
            // عرض الطاولات مع طلباتها
            ordersContainer.innerHTML = Object.entries(tableOrders).map(([tableId, orders]) => {
                const table = tableMap[tableId];
                const tableNumber = table?.number || '?';
                const totalForTable = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
                
                // تجميع الطلبات حسب الوقت (كل ساعة)
                const timeGroups = {};
                orders.forEach(order => {
                    const hour = new Date(order.created_at).getHours();
                    const timeKey = `${hour}:00 - ${hour + 1}:00`;
                    if (!timeGroups[timeKey]) {
                        timeGroups[timeKey] = [];
                    }
                    timeGroups[timeKey].push(order);
                });
                
                let timeHtml = '';
                Object.entries(timeGroups).forEach(([timeKey, timeOrders]) => {
                    const items = timeOrders.map(o => {
                        const orderItems = o.order_items || [];
                        return orderItems.map(item => 
                            `${item.quantity}× ${item.menu_items?.name || 'صنف'}`
                        ).join('، ');
                    }).join(' | ');
                    
                    timeHtml += `
                        <div style="background:var(--bg-input); border-radius:var(--radius-sm); padding:8px 12px; margin-bottom:6px;">
                            <div style="display:flex; justify-content:space-between; font-size:13px;">
                                <span style="font-weight:700;">🕐 ${timeKey}</span>
                                <span style="color:var(--text-muted);">${timeOrders.length} طلبات</span>
                            </div>
                            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                                ${items || 'لا توجد تفاصيل'}
                            </div>
                        </div>
                    `;
                });
                
                return `
                    <div class="table-order-item">
                        <div class="order-header">
                            <div>
                                <div class="order-table">🪑 طاولة ${tableNumber}</div>
                                <div class="order-time">${orders.length} طلبات · ${money(totalForTable)}</div>
                            </div>
                            <div class="order-total">${money(totalForTable)}</div>
                        </div>
                        <div style="margin-top:8px;">
                            ${timeHtml}
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        navigateTo('view-shift-detail');
        
    } catch (e) {
        console.error('Error loading shift detail:', e);
        showToast('⚠️ حدث خطأ في تحميل التفاصيل', 'error');
    }
}

// ============================================================
// AUTO REFRESH
// ============================================================
let refreshInterval = null;

function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(async () => {
        const needRefresh = localStorage.getItem('platepro_need_refresh');
        if (needRefresh === 'true') {
            console.log('🔄 New order detected, refreshing data...');
            try {
                await loadActiveOrders();
                await loadTables();
                renderTables();
                renderKitchenOrders();
                renderDashboard();
                localStorage.removeItem('platepro_need_refresh');
                showToast('📱 طلب جديد من العميل!', 'info');
            } catch (e) {
                console.error('Error refreshing data:', e);
            }
        }
    }, 3000);
}

// ============================================================
// LOAD ALL DATA
// ============================================================
async function loadAllData() {
    await loadTables();
    await loadActiveOrders();
    await Promise.all([
        loadMenuItems(),
        loadMenuCategories(),
        loadEmployees(),
        loadPaymentMethods()
    ]);
}

// ============================================================
// DATA LOADERS
// ============================================================
async function loadTables() {
    if (!supabaseClient || !business) return;
    let { data } = await supabaseClient.from('tables').select('*').eq('business_id', business.id).order('number');
    if (!data || data.length === 0) {
        const seed = Array.from({ length: 8 }, (_, i) => ({
            business_id: business.id,
            number: i + 1,
            capacity: 4,
            status: 'available'
        }));
        const { data: created } = await supabaseClient.from('tables').insert(seed).select();
        data = created || [];
    }
    tables = data;
}

async function loadMenuItems() {
    if (!supabaseClient || !business) return;
    const { data } = await supabaseClient.from('menu_items').select('*').eq('business_id', business.id).eq('is_active', true).order('sort_order');
    menuItems = data || [];
}

async function loadMenuCategories() {
    if (!supabaseClient || !business) return;
    const { data } = await supabaseClient.from('menu_categories').select('*').eq('business_id', business.id).eq('is_active', true).order('sort_order');
    menuCategories = data || [];
}

async function loadEmployees() {
    if (!supabaseClient || !business) return;
    const { data } = await supabaseClient.from('employees').select('*').eq('business_id', business.id).order('created_at');
    employees = data || [];
}

async function loadPaymentMethods() {
    if (!supabaseClient || !business) return;
    const { data } = await supabaseClient.from('payment_methods').select('*').eq('business_id', business.id).eq('is_active', true);
    if (data && data.length > 0) {
        paymentMethods = data;
        return;
    }
    const defaults = [
        { business_id: business.id, name: 'كاش', icon: 'fa-money-bill-wave', color: 'badge-success' },
        { business_id: business.id, name: 'بطاقة ائتمان', icon: 'fa-credit-card', color: 'badge-gold' },
        { business_id: business.id, name: 'محفظة إلكترونية', icon: 'fa-wallet', color: 'badge-info' }
    ];
    const { data: created } = await supabaseClient.from('payment_methods').insert(defaults).select();
    paymentMethods = created || defaults;
}

async function loadActiveOrders() {
    if (!supabaseClient || !business) return;
    const { data } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('business_id', business.id)
        .in('status', ['pending', 'preparing', 'ready', 'paid'])
        .order('created_at', { ascending: false });

    orders = {};
    (data || []).forEach(order => {
        orders[order.id] = order;
        if (!orderStatus[order.id]) {
            orderStatus[order.id] = order.status || 'pending';
        }
    });
    return data || [];
}

// ============================================================
// DASHBOARD
// ============================================================
async function renderDashboard() {
    const activeOrders = Object.values(orders).filter(o => o.status !== 'completed' && o.status !== 'cancelled' && o.status !== 'paid');
    const occupiedTables = tables.filter(t => t.status === 'occupied' || t.status === 'ready_to_serve');
    const availableTables = tables.filter(t => t.status === 'available');

    let revenue = 0;
    let totalExpenses = 0;
    let expensesList = [];

    if (supabaseClient && currentShift && !currentShift.id.toString().startsWith('temp_')) {
        const { data: completedOrders, error: revenueError } = await supabaseClient
            .from('orders')
            .select('total')
            .eq('business_id', business.id)
            .eq('status', 'paid')
            .gte('created_at', currentShift.opened_at);

        if (revenueError) {
            console.error('❌ Error loading revenue:', revenueError.message || revenueError);
        } else {
            revenue = (completedOrders || []).reduce((sum, o) => sum + (Number(o.total) || 0), 0);
        }

        const { data: expenses, error: expensesError } = await supabaseClient
            .from('expenses')
            .select('description, amount, created_at')
            .eq('shift_id', currentShift.id)
            .order('created_at', { ascending: false });

        if (expensesError) {
            console.error('❌ Error loading expenses:', expensesError.message || expensesError);
        } else {
            expensesList = expenses || [];
            totalExpenses = expensesList.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
        }
    } else if (currentShift && currentShift.id.toString().startsWith('temp_')) {
        console.warn('⚠️ الشيفت لسه مش متسجل في قاعدة البيانات (temp shift) - الإيراد والمصروفات مش هتتحسب لحد ما يتحل سبب فشل فتح الشيفت في Supabase.');
    }

    const canViewRevenue = hasPermission('view_revenue') || currentUser?.type === 'owner';
    const revenueCard = document.querySelector('.stat-card.revenue');
    if (revenueCard) {
        revenueCard.style.display = canViewRevenue ? 'block' : 'none';
    }

    const canViewExpenses = hasPermission('view_expenses') || currentUser?.type === 'owner';
    const expensesCard = document.getElementById('dashExpensesCard');
    const expensesListEl = document.getElementById('dashExpensesList');
    if (expensesCard) {
        expensesCard.style.display = canViewExpenses ? 'block' : 'none';
    }
    if (expensesListEl) {
        const expensesSectionTitle = expensesListEl.previousElementSibling;
        if (!canViewExpenses) {
            expensesListEl.style.display = 'none';
            if (expensesSectionTitle) expensesSectionTitle.style.display = 'none';
        } else {
            expensesListEl.style.display = 'block';
            if (expensesSectionTitle) expensesSectionTitle.style.display = 'block';
            expensesListEl.innerHTML = expensesList.length
                ? expensesList.map(e => `
                    <div class="list-row">
                        <div class="row-title">${escapeHtml(e.description || '-')}</div>
                        <div class="row-value mono" style="color:var(--danger);">${money(Number(e.amount) || 0)}</div>
                    </div>
                `).join('')
                : `<div class="empty" style="padding:12px;">${t('no_expenses')}</div>`;
        }
    }

    document.getElementById('dashRevenue').textContent = money(revenue);
    document.getElementById('dashExpenses').textContent = money(totalExpenses);
    document.getElementById('dashActiveOrders').textContent = activeOrders.length;
    document.getElementById('dashOccupiedTables').textContent = occupiedTables.length;
    document.getElementById('dashAvailableTables').textContent = availableTables.length;
}

// ============================================================
// TABLES
// ============================================================
async function renderTables() {
    const grid = document.getElementById('tablesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    for (const table of tables) {
        try {
            const activeOrder = Object.values(orders).find(o =>
                o.table_id === table.id &&
                o.status !== 'completed' &&
                o.status !== 'cancelled' &&
                o.status !== 'paid'
            );

            let finalStatus = table.status;

            if (activeOrder) {
                if (activeOrder.status === 'ready') {
                    finalStatus = 'ready_to_serve';
                } else {
                    finalStatus = 'occupied';
                }
                if (table.status !== finalStatus) {
                    await supabaseClient.from('tables').update({ status: finalStatus }).eq('id', table.id);
                    table.status = finalStatus;
                }
            } else if (table.status === 'occupied' || table.status === 'ready_to_serve') {
                finalStatus = 'available';
                await supabaseClient.from('tables').update({ status: 'available' }).eq('id', table.id);
                table.status = 'available';
            } else if (table.status === 'reserved') {
                finalStatus = 'reserved';
            }

            const statusMap = {
                available: { label: t('available'), class: 'available' },
                occupied: { label: t('occupied'), class: 'occupied' },
                reserved: { label: t('reserved'), class: 'reserved' },
                ready_to_serve: { label: t('ready_to_serve'), class: 'ready_to_serve' }
            };

            const s = statusMap[finalStatus] || statusMap.available;

            const card = document.createElement('div');
            card.className = `table-card ${s.class}`;
            card.onclick = () => openTableSheet(table.id);

            const badge = finalStatus !== 'available' ?
                `<span class="table-badge ${finalStatus === 'ready_to_serve' ? 'badge-ready-table' : ''}">${s.label}</span>` :
                '';

            card.innerHTML = `${badge}<div class="table-num">${table.number}</div><div class="table-status">${s.label}</div><div class="table-capacity">${table.capacity || 4} ${t('persons')}</div>`;
            grid.appendChild(card);
        } catch (error) {
            console.error('Error rendering table:', error);
        }
    }
}

// ============================================================
// KITCHEN
// ============================================================
function renderKitchenOrders() {
    const isChef = currentUser?.role === 'chef' || currentUser?.type === 'owner' || hasPermission('orders');

    if (!isChef) {
        document.getElementById('kitchenOrdersList').innerHTML = `<div class="empty"><i class="fa-solid fa-lock"></i>${t('error_permission')}</div>`;
        return;
    }

    const kitchenOrders = Object.values(orders).filter(o =>
        o.status === 'pending' || o.status === 'preparing'
    );

    const el = document.getElementById('kitchenOrdersList');

    if (kitchenOrders.length === 0) {
        el.innerHTML = `<div class="empty"><i class="fa-solid fa-utensils"></i>${t('no_kitchen_orders')}</div>`;
        return;
    }

    el.innerHTML = kitchenOrders.map(order => {
        const table = tables.find(t => t.id === order.table_id);
        const orderItems = order.order_items || [];
        const itemCount = orderItems.reduce((sum, i) => sum + (i.quantity || 0), 0);

        let itemsPreview = '';
        if (orderItems.length > 0) {
            itemsPreview = orderItems.slice(0, 3).map(item =>
                `${item.quantity}× ${item.menu_items?.name || t('default_item')}`
            ).join('، ');
            if (orderItems.length > 3) {
                itemsPreview += ` +${orderItems.length - 3} ${t('more')}`;
            }
        }

        const statusLabelMap = {
            pending: t('pending'),
            preparing: t('preparing')
        };

        return `<div class="list-row" onclick="viewKitchenOrder('${order.id}')" style="cursor:pointer; border-bottom:2px solid var(--border); padding:14px 4px;">
                            <div>
                                <div class="row-title" style="font-size:16px;">${t('table')} ${table?.number || '?'}</div>
                                <div class="row-sub">${itemCount} ${t('items')} · ${itemsPreview}</div>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                                <span class="badge ${order.status === 'pending' ? 'badge-warning' : 'badge-info'}">${statusLabelMap[order.status] || order.status}</span>
                                <span style="font-size:11px; color:var(--text-muted);">${new Date(order.created_at).toLocaleTimeString()}</span>
                            </div>
                        </div>`;
    }).join('');
}

// ============================================================
// VIEW KITCHEN ORDER
// ============================================================
async function viewKitchenOrder(orderId) {
    window._activeKitchenOrderId = orderId;
    const order = Object.values(orders).find(o => o.id === orderId);
    if (!order) return;

    const { data: items } = await supabaseClient
        .from('order_items')
        .select('*, menu_items(*)')
        .eq('order_id', orderId);

    const table = tables.find(t => t.id === order.table_id);
    const body = document.getElementById('kitchenOrderBody');

    let itemsHtml = '';
    if (items && items.length > 0) {
        itemsHtml = items.map(item =>
            `<div class="order-item" style="padding:8px 0;">
                                <div>
                                    <div class="item-name" style="font-size:16px;">${escapeHtml(item.menu_items?.name || t('default_item'))}</div>
                                    <div class="item-details" style="font-size:14px; color:var(--text-secondary);">${item.quantity} ×</div>
                                </div>
                            </div>`
        ).join('');
    }

    let actionButtons = '';
    if (order.status === 'pending') {
        actionButtons = `<button class="btn btn-primary btn-block" onclick="startPreparing('${orderId}')"><i class="fa-solid fa-utensils"></i> ${t('start_preparing')}</button>`;
    } else if (order.status === 'preparing') {
        actionButtons = `<button class="btn btn-success btn-block" onclick="markAsReady('${orderId}')"><i class="fa-solid fa-check"></i> ${t('ready_for_delivery')}</button>`;
    }

    body.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                            <span class="badge badge-gold" style="font-size:14px;">${t('table')} ${table?.number || '?'}</span>
                            <span class="badge ${order.status === 'pending' ? 'badge-warning' : 'badge-info'}" style="font-size:14px;">${order.status === 'pending' ? t('pending') : t('preparing')}</span>
                        </div>
                        <div style="background:var(--bg-input);border-radius:var(--radius-sm);padding:12px;margin-bottom:12px;">${itemsHtml}</div>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            ${actionButtons}
                            <button class="btn btn-ghost" style="flex:1;" onclick="closeSheet('kitchenOrderOverlay')">${t('close')}</button>
                        </div>`;

    openSheet('kitchenOrderOverlay');
}

// ============================================================
// ORDER WORKFLOW
// ============================================================
async function startPreparing(orderId) {
    if (currentUser?.role !== 'chef' && currentUser?.type !== 'owner' && !hasPermission('orders')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    try {
        await supabaseClient.from('orders').update({ status: 'preparing' }).eq('id', orderId);
        orderStatus[orderId] = 'preparing';
        showToast(t('preparing_started'), 'info');
        await loadActiveOrders();
        renderKitchenOrders();
        renderTables();
        renderDashboard();
        closeSheet('kitchenOrderOverlay');
    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

async function markAsReady(orderId) {
    if (currentUser?.role !== 'chef' && currentUser?.type !== 'owner' && !hasPermission('orders')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    try {
        await supabaseClient.from('orders').update({ status: 'ready' }).eq('id', orderId);
        orderStatus[orderId] = 'ready';

        const order = Object.values(orders).find(o => o.id === orderId);
        const table = tables.find(t => t.id === order?.table_id);
        
        // ✅ فقط إشعار نصي للشيف
        showToast(`✅ تم تجهيز طلب طاولة ${table?.number || '?'}`, 'success');

        await loadActiveOrders();
        renderKitchenOrders();
        renderTables();
        renderDashboard();
        closeSheet('kitchenOrderOverlay');

    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

// ============================================================
// TABLE SHEET
// ============================================================
function openTableSheet(tableId) {
    window._activeTableId = tableId;
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    const activeOrder = Object.values(orders).find(o =>
        o.table_id === tableId &&
        o.status !== 'completed' &&
        o.status !== 'cancelled' &&
        o.status !== 'paid'
    );

    if (!activeOrder) {
        if (!hasPermission('create_orders')) {
            showToast(t('error_permission'), 'error');
            return;
        }

        if (table.status === 'occupied' || table.status === 'ready_to_serve') {
            supabaseClient.from('tables').update({ status: 'available' }).eq('id', tableId).catch(() => {});
            table.status = 'available';
        }

        document.getElementById('tableSheetTitle').textContent = `${t('table')} ${table.number} (${table.capacity || 4} ${t('persons')})`;
        const body = document.getElementById('tableSheetBody');

        body.innerHTML = `<div class="section-title">${t('menu')}</div>
                            <div class="menu-quick-add" id="menuItemsForTable">
                                ${menuItems.length === 0 ? '<div class="empty" style="padding:10px;">' + t('no_items') + '</div>' : ''}
                            </div>
                            <div id="tableOrderItems"></div>
                            <div style="display:flex;gap:8px;margin-top:12px;">
                                <button class="btn btn-primary" style="flex:1;" onclick="createOrder('${tableId}')"><i class="fa-solid fa-check"></i> ${t('confirm_order')}</button>
                                <button class="btn btn-ghost" style="flex:1;" onclick="closeSheet('tableOverlay')">${t('cancel')}</button>
                            </div>
                            <div class="error-text" id="tableSheetError"></div>`;

        const menuContainer = document.getElementById('menuItemsForTable');
        if (menuItems.length > 0) {
            menuItems.slice(0, 12).forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-outline btn-sm';
                btn.innerHTML = `${escapeHtml(item.name)} ${money(item.price)}`;
                btn.onclick = () => addItemToOrder(item);
                menuContainer.appendChild(btn);
            });
        }

        _orderItems = [];
        renderTableOrderItems();
        openSheet('tableOverlay');
        return;
    }

    const status = orderStatus[activeOrder.id] || activeOrder.status || 'pending';
    const isReady = status === 'ready';
    const isPaid = status === 'paid';

    const subtotal = activeOrder.subtotal || activeOrder.total || 0;
    const serviceFee = subtotal * (serviceFeePercent / 100);
    const vat = (subtotal + serviceFee) * (vatPercent / 100);
    const total = subtotal + serviceFee + vat;

    let actionButtons = '';
    const isCashier = currentUser?.role === 'cashier' || currentUser?.type === 'owner' || hasPermission('payment');

    if (isReady && !isPaid && isCashier) {
        if (hasPermission('print_receipt')) {
            actionButtons = `<button class="btn btn-success" style="flex:1;" onclick="printReceipt('${activeOrder.id}')"><i class="fa-solid fa-print"></i> ${t('print_receipt')}</button>
                                    <button class="btn btn-primary" style="flex:1;" onclick="showPaymentSheet('${activeOrder.id}')"><i class="fa-solid fa-credit-card"></i> ${t('payment')}</button>`;
        } else {
            actionButtons = `<button class="btn btn-ghost" style="flex:1;" disabled><i class="fa-solid fa-print"></i> ${t('error_permission')}</button>
                                    <button class="btn btn-primary" style="flex:1;" onclick="showPaymentSheet('${activeOrder.id}')"><i class="fa-solid fa-credit-card"></i> ${t('payment')}</button>`;
        }
    } else if (isPaid) {
        actionButtons = `<button class="btn btn-success" style="flex:1;" disabled><i class="fa-solid fa-check"></i> ${t('paid')}</button>`;
    } else if (!isReady && !isPaid) {
        if (currentUser?.role === 'chef' || currentUser?.type === 'owner' || hasPermission('orders')) {
            actionButtons = `<button class="btn btn-primary" style="flex:1;" onclick="startPreparing('${activeOrder.id}')"><i class="fa-solid fa-utensils"></i> ${t('start_preparing')}</button>`;
        } else {
            actionButtons = `<button class="btn btn-ghost" style="flex:1;" disabled><i class="fa-solid fa-clock"></i> ${t('pending')}</button>`;
        }
    }

    const statusBadgeMap = {
        pending: 'badge-warning',
        preparing: 'badge-info',
        ready: 'badge-ready-table',
        paid: 'badge-paid',
        cancelled: 'badge-cancelled'
    };
    const statusLabelMap = {
        pending: t('pending'),
        preparing: t('preparing'),
        ready: t('ready_to_serve'),
        paid: t('paid'),
        cancelled: t('cancelled')
    };

    document.getElementById('tableSheetTitle').textContent = `${t('table')} ${table.number} (${table.capacity || 4} ${t('persons')})`;
    const body = document.getElementById('tableSheetBody');

    body.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                            <span class="badge badge-gold">${t('order')} #${activeOrder.id.slice(0, 8)}</span>
                            <span class="badge ${statusBadgeMap[status] || 'badge-warning'}">${statusLabelMap[status] || status}</span>
                        </div>
                        <div id="orderItemsList"><div class="empty" style="padding:10px;">${t('loading')}</div></div>
                        
                        <div style="background:var(--bg-input);border-radius:var(--radius-sm);padding:10px 14px;margin:8px 0;">
                            <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:var(--text-secondary);">
                                <span>${t('subtotal')}</span>
                                <span>${money(subtotal)}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:var(--text-secondary);">
                                <span>${t('service_fee')} (${serviceFeePercent}%)</span>
                                <span>${money(serviceFee)}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:var(--text-secondary);">
                                <span>${t('vat')} (${vatPercent}%)</span>
                                <span>${money(vat)}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:6px 0 0 0;border-top:2px solid var(--border);font-weight:700;font-size:16px;color:var(--text-primary);">
                                <span>${t('total')}</span>
                                <span style="color:var(--primary-dark);">${money(total)}</span>
                            </div>
                        </div>
                        
                        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
                            ${actionButtons}
                            <button class="btn btn-ghost" style="flex:1;" onclick="closeSheet('tableOverlay')">${t('back')}</button>
                        </div>
                        <div class="error-text" id="tableSheetError"></div>`;

    loadOrderItems(activeOrder.id);
    openSheet('tableOverlay');
}

// ============================================================
// ORDER CREATION
// ============================================================
function addItemToOrder(item) {
    const existing = _orderItems.find(i => i.menu_item_id === item.id);
    if (existing) {
        existing.quantity += 1;
        existing.total = existing.quantity * existing.unit_price;
    } else {
        _orderItems.push({
            menu_item_id: item.id,
            name: item.name,
            unit_price: item.price,
            quantity: 1,
            total: item.price
        });
    }
    renderTableOrderItems();
    showToast(t('item_added_to_order', { name: item.name }), 'success');
}

function renderTableOrderItems() {
    const container = document.getElementById('tableOrderItems');
    if (!container) return;

    if (_orderItems.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:12px;">لم يتم إضافة أي صنف</div>';
        return;
    }

    const total = _orderItems.reduce((sum, i) => sum + i.total, 0);
    container.innerHTML = `${_orderItems.map((item, index) =>
                    `<div class="order-item">
                                <div>
                                    <div class="item-name">${escapeHtml(item.name)}</div>
                                    <div class="item-details">
                                        ${item.quantity} × ${money(item.unit_price)}
                                        <button class="btn btn-xs" style="background:var(--danger);color:#fff;border:none;border-radius:6px;cursor:pointer;margin-right:8px;" onclick="removeTableOrderItem(${index})"><i class="fa-solid fa-minus"></i></button>
                                        <button class="btn btn-xs" style="background:var(--success);color:#fff;border:none;border-radius:6px;cursor:pointer;margin-right:4px;" onclick="addTableOrderItem(${index})"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="item-price">${money(item.total)}</div>
                            </div>`
                ).join('')}
                        <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid var(--border-light);font-weight:700;">
                            <span>${t('total')}</span>
                            <span style="color:var(--primary-dark);">${money(total)}</span>
                        </div>`;
}

function removeTableOrderItem(index) {
    const item = _orderItems[index];
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.quantity * item.unit_price;
    } else {
        _orderItems.splice(index, 1);
    }
    renderTableOrderItems();
}

function addTableOrderItem(index) {
    const item = _orderItems[index];
    if (!item) return;
    item.quantity += 1;
    item.total = item.quantity * item.unit_price;
    renderTableOrderItems();
}

async function createOrder(tableId) {
    if (_orderItems.length === 0) {
        document.getElementById('tableSheetError').textContent = t('error_no_items');
        return;
    }

    if (!supabaseClient) {
        document.getElementById('tableSheetError').textContent = t('error_connection');
        return;
    }

    const subtotal = _orderItems.reduce((sum, i) => sum + i.total, 0);

    try {
        const { data: order, error } = await supabaseClient.from('orders').insert({
            business_id: business.id,
            table_id: tableId,
            waiter_id: currentUser?.id || null,
            order_type: 'dine_in',
            status: 'pending',
            subtotal: subtotal,
            total: subtotal
        }).select().single();

        if (error) throw error;

        const orderItems = _orderItems.map(item => ({
            order_id: order.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total: item.total
        }));

        await supabaseClient.from('order_items').insert(orderItems);
        await supabaseClient.from('tables').update({ status: 'occupied' }).eq('id', tableId);

        orderStatus[order.id] = 'pending';
        _orderItems = [];
        closeSheet('tableOverlay');
        showToast(t('order_created'), 'success');

        await loadActiveOrders();
        renderTables();
        renderKitchenOrders();
        renderDashboard();
    } catch (e) {
        console.error('Error creating order:', e);
        document.getElementById('tableSheetError').textContent = t('error_general');
    }
}

async function loadOrderItems(orderId) {
    if (!supabaseClient) return;
    const { data: items } = await supabaseClient
        .from('order_items')
        .select('*, menu_items(*)')
        .eq('order_id', orderId);

    const listEl = document.getElementById('orderItemsList');

    if (!items || items.length === 0) {
        listEl.innerHTML = '<div class="empty" style="padding:10px;">' + t('no_items') + '</div>';
        return;
    }

    listEl.innerHTML = items.map(item =>
        `<div class="order-item">
                            <div>
                                <div class="item-name">${escapeHtml(item.menu_items?.name || t('default_item'))}</div>
                                <div class="item-details">${item.quantity} × ${money(item.unit_price)}</div>
                            </div>
                            <div class="item-price">${money(item.total)}</div>
                        </div>`
    ).join('');
}

function showPaymentSheet(orderId) {
    const order = Object.values(orders).find(o => o.id === orderId);
    if (!order) return;

    const subtotal = order.subtotal || order.total || 0;
    const serviceFee = subtotal * (serviceFeePercent / 100);
    const vat = (subtotal + serviceFee) * (vatPercent / 100);
    const total = subtotal + serviceFee + vat;

    const body = document.getElementById('tableSheetBody');
    body.innerHTML = `<div style="text-align:center;margin:12px 0;">
                            <div style="font-size:32px;font-weight:900;color:var(--primary-dark);">${money(total)}</div>
                            <div style="font-size:13px;color:var(--text-muted);">${t('total')}</div>
                        </div>
                        <div class="section-title">${t('select_payment')}</div>
                        <div class="payment-options" id="paymentOptions">
                            ${paymentMethods.map(pm => `<div class="payment-option" onclick="selectPaymentMethod('${pm.id}')" data-id="${pm.id}"><i class="fa-solid ${pm.icon}"></i><span>${escapeHtml(pm.name)}</span></div>`).join('')}
                        </div>
                        <div style="display:flex;gap:8px;margin-top:12px;">
                            <button class="btn btn-primary" style="flex:1;" id="confirmPaymentBtn" onclick="confirmPaymentAndClose('${orderId}')" disabled><i class="fa-solid fa-check"></i> ${t('payment')}</button>
                            <button class="btn btn-ghost" style="flex:1;" onclick="closeSheet('tableOverlay')">${t('back')}</button>
                        </div>
                        <div class="error-text" id="paymentError"></div>`;
}

function selectPaymentMethod(pmId) {
    selectedPaymentMethod = pmId;
    document.querySelectorAll('.payment-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.id === pmId);
    });
    document.getElementById('confirmPaymentBtn').disabled = false;
}

async function printReceipt(orderId) {
    if (!hasPermission('print_receipt')) {
        showToast(t('error_permission'), 'error');
        return;
    }

    const order = Object.values(orders).find(o => o.id === orderId);
    if (!order) return;

    const subtotal = order.subtotal || order.total || 0;
    const serviceFee = subtotal * (serviceFeePercent / 100);
    const vat = (subtotal + serviceFee) * (vatPercent / 100);
    const total = subtotal + serviceFee + vat;

    const { data: items } = await supabaseClient
        .from('order_items')
        .select('*, menu_items(*)')
        .eq('order_id', orderId);

    const table = tables.find(t => t.id === order.table_id);

    let itemsHtml = '';
    if (items && items.length > 0) {
        itemsHtml = items.map(item =>
            `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px;border-bottom:1px solid #eee;">
                                <span>${escapeHtml(item.menu_items?.name || t('default_item'))} × ${item.quantity}</span>
                                <span>${money(item.unit_price * item.quantity)}</span>
                            </div>`
        ).join('');
    }

    const receiptHTML = `<div style="font-family:var(--font);max-width:320px;margin:0 auto;padding:16px;background:#fff;color:#1A1A2E;border-radius:8px;direction:rtl;">
                            <div style="text-align:center;border-bottom:2px dashed #ddd;padding-bottom:10px;">
                                <div style="font-size:20px;font-weight:900;color:var(--primary-dark);">${escapeHtml(business.name)}</div>
                                <div style="font-size:11px;color:#888;">${escapeHtml(business.code)}</div>
                                <div style="font-size:11px;color:#888;">${t('order')} #${order.id.slice(0, 8)}</div>
                                <div style="font-size:11px;color:#888;">${t('table')} ${table?.number || '?'}</div>
                            </div>
                            <div style="padding:10px 0;border-bottom:1px dashed #ddd;">${itemsHtml}</div>
                            <div style="padding:8px 0;">
                                <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:14px;">
                                    <span>${t('subtotal')}</span>
                                    <span>${money(subtotal)}</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#666;">
                                    <span>${t('service_fee')} (${serviceFeePercent}%)</span>
                                    <span>${money(serviceFee)}</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#666;">
                                    <span>${t('vat')} (${vatPercent}%)</span>
                                    <span>${money(vat)}</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;padding:6px 0 0 0;border-top:2px solid var(--primary);font-weight:700;font-size:18px;color:var(--primary-dark);">
                                    <span>${t('total')}</span>
                                    <span>${money(total)}</span>
                                </div>
                            </div>
                            <div style="text-align:center;border-top:2px dashed #ddd;padding-top:10px;font-size:12px;color:#888;">شكراً لزيارتكم 🌟</div>
                        </div>`;

    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (printWindow) {
        printWindow.document.write(`<html><head><title>${t('print_receipt')}</title>
                            <style>body{font-family:'Cairo',sans-serif;margin:0;padding:20px;background:#f5f5f5;}</style>
                            </head><body>${receiptHTML}
                            <div style="text-align:center;margin-top:12px;">
                                <button onclick="window.print()" style="padding:10px 30px;background:#E8B84B;border:none;border-radius:8px;font-weight:700;cursor:pointer;">🖨️ ${t('print')}</button>
                                <button onclick="window.close()" style="padding:10px 30px;background:#eee;border:none;border-radius:8px;font-weight:700;cursor:pointer;margin-right:8px;">${t('close')}</button>
                            </div>
                            <script>setTimeout(() => { window.print(); }, 600);<\/script>
                            </body></html>`);
        printWindow.document.close();
    } else {
        showToast(t('error_general'), 'error');
    }
}

async function confirmPaymentAndClose(orderId) {
    const paymentId = document.querySelector('.payment-option.selected')?.dataset.id;
    if (!paymentId) {
        document.getElementById('paymentError').textContent = t('error_general');
        return;
    }

    if (!supabaseClient) return;

    try {
        const order = Object.values(orders).find(o => o.id === orderId);
        if (!order) throw new Error('Order not found');

        const subtotal = order.subtotal || order.total || 0;
        const serviceFee = subtotal * (serviceFeePercent / 100);
        const vat = (subtotal + serviceFee) * (vatPercent / 100);
        const total = subtotal + serviceFee + vat;

        const { error: paymentInsertError } = await supabaseClient.from('payments').insert({
            order_id: orderId,
            amount: total,
            method_id: paymentId,
            status: 'completed'
        });
        if (paymentInsertError) {
            console.error('❌ Payment insert failed:', paymentInsertError.message || paymentInsertError);
            document.getElementById('paymentError').textContent = t('payment_failed');
            return;
        }

        const { error: orderUpdateError } = await supabaseClient.from('orders').update({
            status: 'paid',
            total: total
        }).eq('id', orderId);
        if (orderUpdateError) {
            console.error('❌ Order status update to paid failed:', orderUpdateError.message || orderUpdateError);
            document.getElementById('paymentError').textContent = t('payment_failed');
            return;
        }

        await supabaseClient.from('tables').update({ status: 'available' }).eq('id', order.table_id);

        orderStatus[orderId] = 'paid';
        closeSheet('tableOverlay');
        showToast(t('payment_success'), 'success');

        await loadActiveOrders();
        renderTables();
        renderKitchenOrders();
        renderDashboard();
    } catch (e) {
        document.getElementById('paymentError').textContent = t('payment_failed');
    }
}

// ============================================================
// MENU MANAGEMENT
// ============================================================
function renderMenuView() {
    const el = document.getElementById('menuView');
    if (menuItems.length === 0) {
        el.innerHTML = `<div class="empty"><i class="fa-solid fa-utensils"></i>${t('no_items')}</div>`;
        return;
    }
    let html = '';
    if (menuCategories.length === 0) {
        menuItems.forEach(item => {
            const imageHtml = item.image_url ?
                `<img src="${item.image_url}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;" onerror="this.style.display='none'">` :
                '';
            html += `<div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md);padding:14px;margin-bottom:8px;display:flex;gap:14px;align-items:center;">
                                    ${imageHtml ? `<div style="flex-shrink:0;">${imageHtml}</div>` : ''}
                                    <div style="flex:1;">
                                        <div style="font-weight:700;">${escapeHtml(item.name)}</div>
                                        ${item.description ? `<div style="font-size:12px;color:var(--text-muted);">${escapeHtml(item.description)}</div>` : ''}
                                    </div>
                                    <div style="font-weight:700;color:var(--primary-dark);">${money(item.price)}</div>
                                </div>`;
        });
    } else {
        menuCategories.forEach(cat => {
            const items = menuItems.filter(item => item.category_id === cat.id);
            if (items.length === 0) return;
            html += `<div style="margin-bottom:16px;">
                                    <div style="font-weight:700;font-size:16px;color:var(--primary-dark);margin-bottom:8px;">
                                        <i class="fa-solid ${cat.icon || 'fa-utensils'}"></i> ${escapeHtml(cat.name)}
                                    </div>
                                    ${items.map(item => {
                                        const imageHtml = item.image_url ?
                                            `<img src="${item.image_url}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;" onerror="this.style.display='none'">` :
                                            '';
                                        return `<div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:12px 16px;margin-bottom:6px;display:flex;gap:12px;align-items:center;">
                                                    ${imageHtml ? `<div style="flex-shrink:0;">${imageHtml}</div>` : ''}
                                                    <div style="flex:1;">
                                                        <div style="font-weight:600;">${escapeHtml(item.name)}</div>
                                                        ${item.description ? `<div style="font-size:11px;color:var(--text-muted);">${escapeHtml(item.description)}</div>` : ''}
                                                    </div>
                                                    <div style="font-weight:700;color:var(--primary-dark);">${money(item.price)}</div>
                                                </div>`;
                                    }).join('')}
                                </div>`;
        });
    }
    el.innerHTML = html;
}

function renderMenuManagement() {
    const el = document.getElementById('menuManagementList');
    if (menuItems.length === 0) {
        el.innerHTML = `<div class="empty" style="padding:12px;">${t('no_items')}</div>`;
        return;
    }
    el.innerHTML = menuItems.map(item => {
        const cat = menuCategories.find(c => c.id === item.category_id);
        return `<div class="list-row">
                            <div>
                                <div class="row-title">${escapeHtml(item.name)}</div>
                                <div class="row-sub">${money(item.price)} ${cat ? '· ' + escapeHtml(cat.name) : ''} ${item.image_url ? '🖼️' : ''}</div>
                            </div>
                            <div class="row-actions">
                                <button class="btn btn-ghost btn-xs" onclick="editMenuItem('${item.id}')"><i class="fa-solid fa-pen"></i></button>
                                <button class="btn btn-danger btn-xs" onclick="deleteMenuItem('${item.id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
    }).join('');
}

function openMenuItemSheet() {
    if (!hasPermission('manage_menu')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    document.getElementById('editMenuItemId').value = '';
    document.getElementById('menuItemName').value = '';
    document.getElementById('menuItemPrice').value = '';
    document.getElementById('menuItemDesc').value = '';
    document.getElementById('menuItemImageInput').value = '';
    document.getElementById('menuItemImagePreview').style.display = 'none';
    document.getElementById('menuItemImageData').value = '';
    document.getElementById('menuItemActive').checked = true;
    document.getElementById('menuItemSheetTitle').textContent = t('add_item');
    document.getElementById('deleteMenuItemBtn').style.display = 'none';
    document.getElementById('menuItemError').textContent = '';

    const catSelect = document.getElementById('menuItemCategory');
    catSelect.innerHTML = '<option value="">' + t('no_categories') + '</option>';
    menuCategories.forEach(cat => {
        catSelect.innerHTML += `<option value="${cat.id}">${escapeHtml(cat.name)}</option>`;
    });

    document.getElementById('saveMenuItemBtn').onclick = saveMenuItem;
    openSheet('menuItemOverlay');
}

function editMenuItem(itemId) {
    if (!hasPermission('manage_menu')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    document.getElementById('editMenuItemId').value = item.id;
    document.getElementById('menuItemName').value = item.name;
    document.getElementById('menuItemPrice').value = item.price;
    document.getElementById('menuItemDesc').value = item.description || '';
    document.getElementById('menuItemImageData').value = item.image_url || '';
    if (item.image_url) {
        document.getElementById('menuItemImagePreviewImg').src = item.image_url;
        document.getElementById('menuItemImagePreview').style.display = 'block';
    } else {
        document.getElementById('menuItemImagePreview').style.display = 'none';
    }
    document.getElementById('menuItemActive').checked = item.is_active !== false;
    document.getElementById('menuItemSheetTitle').textContent = t('edit');
    document.getElementById('deleteMenuItemBtn').style.display = 'flex';
    document.getElementById('menuItemError').textContent = '';

    const catSelect = document.getElementById('menuItemCategory');
    catSelect.innerHTML = '<option value="">' + t('no_categories') + '</option>';
    menuCategories.forEach(cat => {
        const selected = cat.id === item.category_id ? 'selected' : '';
        catSelect.innerHTML += `<option value="${cat.id}" ${selected}>${escapeHtml(cat.name)}</option>`;
    });

    document.getElementById('saveMenuItemBtn').onclick = saveMenuItem;
    document.getElementById('deleteMenuItemBtn').onclick = () => deleteMenuItem(itemId);
    openSheet('menuItemOverlay');
}

async function saveMenuItem() {
    const id = document.getElementById('editMenuItemId').value;
    const name = document.getElementById('menuItemName').value.trim();
    const price = parseFloat(document.getElementById('menuItemPrice').value);
    const description = document.getElementById('menuItemDesc').value.trim();
    const image_data = document.getElementById('menuItemImageData').value;
    const category_id = document.getElementById('menuItemCategory').value || null;
    const is_active = document.getElementById('menuItemActive').checked;
    const errEl = document.getElementById('menuItemError');

    if (!name || isNaN(price) || price < 0) { errEl.textContent = t('error_general'); return; }
    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }

    try {
        const data = { name, price, description, image_url: image_data || null, category_id, is_active };
        if (id) {
            await supabaseClient.from('menu_items').update(data).eq('id', id);
            showToast(t('item_updated'), 'success');
        } else {
            data.business_id = business.id;
            await supabaseClient.from('menu_items').insert(data);
            showToast(t('item_added'), 'success');
        }
        closeSheet('menuItemOverlay');
        await loadMenuItems();
        renderMenuView();
        renderMenuManagement();
        renderSettings();
    } catch (e) {
        errEl.textContent = t('error_general');
    }
}

async function deleteMenuItem(itemId) {
    if (!hasPermission('manage_menu')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    if (!confirm(t('delete') + '؟')) return;
    if (!supabaseClient) return;
    try {
        await supabaseClient.from('menu_items').delete().eq('id', itemId);
        showToast(t('item_deleted'), 'success');
        closeSheet('menuItemOverlay');
        await loadMenuItems();
        renderMenuView();
        renderMenuManagement();
        renderSettings();
    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

function openCategorySheet() {
    if (!hasPermission('manage_menu')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryIcon').value = 'fa-utensils';
    document.getElementById('categoryError').textContent = '';
    document.getElementById('saveCategoryBtn').onclick = saveCategory;
    openSheet('categoryOverlay');
}

async function saveCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const icon = document.getElementById('categoryIcon').value;
    const errEl = document.getElementById('categoryError');
    
    if (!name) { 
        errEl.textContent = '⚠️ أدخل اسم التصنيف';
        return; 
    }
    
    if (!supabaseClient) { 
        errEl.textContent = t('error_connection');
        return; 
    }
    
    try {
        const { data, error } = await supabaseClient.from('menu_categories').insert({
            business_id: business.id,
            name: name,
            icon: icon,
            is_active: true,
            sort_order: menuCategories.length + 1
        }).select();
        
        if (error) throw error;
        
        showToast('✅ تم إضافة التصنيف بنجاح!', 'success');
        closeSheet('categoryOverlay');
        await loadMenuCategories();
        renderMenuView();
        renderMenuManagement();
        renderSettings();
        renderMenuCategoriesList();
    } catch (e) { 
        errEl.textContent = t('error_general');
        console.error(e);
    }
}

function renderMenuCategoriesList() {
    const container = document.getElementById('settingsCategoriesList');
    if (!container) return;
    
    if (menuCategories.length === 0) {
        container.innerHTML = `<div class="empty" style="padding:12px;">${t('no_categories')}</div>`;
        return;
    }
    
    container.innerHTML = menuCategories.map(cat => `
        <div class="list-row">
            <div>
                <div class="row-title"><i class="fa-solid ${cat.icon || 'fa-utensils'}"></i> ${escapeHtml(cat.name)}</div>
                <div class="row-sub">${cat.is_active ? '✅ نشط' : '⛔ موقف'}</div>
            </div>
            <div class="row-actions">
                <button class="btn btn-danger btn-xs" onclick="deleteCategory('${cat.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

async function deleteCategory(categoryId) {
    if (!confirm('متأكد من حذف هذا التصنيف؟')) return;
    if (!supabaseClient) return;
    
    try {
        await supabaseClient.from('menu_categories').delete().eq('id', categoryId);
        showToast('✅ تم حذف التصنيف', 'success');
        await loadMenuCategories();
        renderMenuView();
        renderMenuManagement();
        renderSettings();
        renderMenuCategoriesList();
    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

// ============================================================
// PDF MENU IMPORT
// ============================================================
let pdfImportParsedData = null; // [{ name: string|null, items: [{tempId, name, price, include}] }]

function openPdfImportSheet() {
    if (!hasPermission('manage_menu')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    document.getElementById('pdfImportFileInput').value = '';
    document.getElementById('pdfImportStatus').textContent = '';
    document.getElementById('pdfImportError').textContent = '';
    document.getElementById('pdfImportAnalyzeBtn').disabled = false;
    document.getElementById('pdfImportAnalyzeBtn').innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> <span data-i18n="import_pdf_analyze">' + t('import_pdf_analyze') + '</span>';
    document.getElementById('pdfImportUploadStep').style.display = 'block';
    document.getElementById('pdfImportReviewStep').style.display = 'none';
    pdfImportParsedData = null;
    openSheet('pdfImportOverlay');
}

function cancelPdfImportReview() {
    closeSheet('pdfImportOverlay');
    pdfImportParsedData = null;
}

// Groups raw pdf.js text items (from getTextContent) into visual lines using their Y position,
// and keeps the max font size per line (used later to tell category headers from item lines).
function groupPdfTextIntoLines(items) {
    const rows = [];
    items.forEach(item => {
        if (!item.str || !item.str.trim()) return;
        const fontSize = Math.abs(item.transform[3]) || Math.abs(item.transform[0]) || 10;
        const y = Math.round(item.transform[5]);
        const x = item.transform[4];
        let row = rows.find(r => Math.abs(r.y - y) < 3);
        if (!row) {
            row = { y, parts: [] };
            rows.push(row);
        }
        row.parts.push({ x, str: item.str, fontSize });
    });
    rows.sort((a, b) => b.y - a.y);
    return rows.map(row => {
        row.parts.sort((a, b) => a.x - b.x);
        const text = row.parts.map(p => p.str).join(' ').replace(/\s+/g, ' ').trim();
        const maxFontSize = Math.max(...row.parts.map(p => p.fontSize));
        return { text, fontSize: maxFontSize };
    }).filter(l => l.text);
}

// Tries to pull a trailing price (with optional dot-leaders and currency word) off the end of a line.
function extractPriceFromPdfLine(text) {
    const regex = /([.\-_·•\s]{2,}|\s)(\d+(?:[.,]\d{1,2})?)\s*(ج\.?م\.?|جنيه(?:اً|ا)?|جنيه مصري|EGP|LE|L\.E\.?|\$|USD|EUR|€)?\s*$/i;
    const match = text.match(regex);
    if (!match) return null;
    const price = parseFloat(match[2].replace(',', '.'));
    if (isNaN(price) || price <= 0 || price > 100000) return null;
    const name = text.slice(0, match.index).replace(/[.\-_·•\s]+$/, '').trim();
    if (!name || name.length > 80) return null;
    return { name, price };
}

// Heuristic parser: lines ending in a price become items; short lines in a noticeably bigger
// font (and with no price) become category headers that group the items under them.
function parseMenuLinesIntoGroups(lines) {
    const withPrice = lines.map(l => ({ ...l, priceInfo: extractPriceFromPdfLine(l.text) }));
    const itemFontSizes = withPrice.filter(l => l.priceInfo).map(l => l.fontSize);
    const avgItemFontSize = itemFontSizes.length ? itemFontSizes.reduce((a, b) => a + b, 0) / itemFontSizes.length : 12;

    const groups = [];
    let currentGroup = { name: null, items: [] };
    let itemCounter = 0;

    const pushCurrentGroup = () => { if (currentGroup.items.length > 0) groups.push(currentGroup); };

    withPrice.forEach(line => {
        const text = line.text.trim();
        if (!text) return;
        if (line.priceInfo) {
            itemCounter++;
            currentGroup.items.push({
                tempId: 'pdfitem_' + itemCounter,
                name: line.priceInfo.name,
                price: line.priceInfo.price,
                include: true
            });
        } else {
            const wordCount = text.split(/\s+/).length;
            const isBigger = line.fontSize >= avgItemFontSize * 1.12;
            if (wordCount <= 6 && text.length <= 40 && isBigger) {
                pushCurrentGroup();
                currentGroup = { name: text, items: [] };
            }
            // otherwise treat as noise/description and ignore it
        }
    });
    pushCurrentGroup();

    // merge groups that share the same header text (e.g. repeated across pages)
    const merged = [];
    groups.forEach(g => {
        const existing = merged.find(m => (m.name || '').trim().toLowerCase() === (g.name || '').trim().toLowerCase());
        if (existing) existing.items.push(...g.items);
        else merged.push(g);
    });
    return merged;
}

async function analyzePdfMenu() {
    const fileInput = document.getElementById('pdfImportFileInput');
    const statusEl = document.getElementById('pdfImportStatus');
    const errEl = document.getElementById('pdfImportError');
    const btn = document.getElementById('pdfImportAnalyzeBtn');
    errEl.textContent = '';

    if (!fileInput.files || fileInput.files.length === 0) {
        errEl.textContent = t('pdf_error_no_file');
        return;
    }
    if (typeof pdfjsLib === 'undefined') {
        errEl.textContent = t('pdf_error_read_fail');
        return;
    }

    const file = fileInput.files[0];
    btn.disabled = true;
    statusEl.textContent = t('pdf_status_reading');

    try {
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
        }
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        const allLines = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            allLines.push(...groupPdfTextIntoLines(textContent.items));
        }

        statusEl.textContent = t('pdf_status_parsing');
        const parsed = parseMenuLinesIntoGroups(allLines);

        if (!parsed.length || parsed.every(g => g.items.length === 0)) {
            statusEl.textContent = '';
            errEl.textContent = t('pdf_no_items_found');
            btn.disabled = false;
            return;
        }

        pdfImportParsedData = parsed;
        statusEl.textContent = '';
        btn.disabled = false;
        renderPdfImportReview();
        document.getElementById('pdfImportUploadStep').style.display = 'none';
        document.getElementById('pdfImportReviewStep').style.display = 'block';
    } catch (e) {
        console.error('PDF import error:', e);
        statusEl.textContent = '';
        errEl.textContent = t('pdf_error_read_fail');
        btn.disabled = false;
    }
}

function renderPdfImportReview() {
    const container = document.getElementById('pdfImportPreviewList');
    if (!pdfImportParsedData || pdfImportParsedData.length === 0) {
        container.innerHTML = `<div class="empty">${t('pdf_no_items_found')}</div>`;
        return;
    }

    const totalItems = pdfImportParsedData.reduce((sum, g) => sum + g.items.length, 0);
    let html = `<div style="font-size:13px;font-weight:700;color:var(--primary-dark);margin-bottom:10px;">${t('pdf_items_found', { count: totalItems })}</div>`;

    pdfImportParsedData.forEach((group, gIdx) => {
        const matchExisting = group.name ? menuCategories.find(c => c.name.trim().toLowerCase() === group.name.trim().toLowerCase()) : null;
        const showNewCatInput = !!group.name && !matchExisting;

        html += `<div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md);padding:12px;margin-bottom:10px;">`;
        html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
                    <i class="fa-solid fa-tags" style="color:var(--primary);flex-shrink:0;"></i>
                    <select id="pdfGroupCat_${gIdx}" onchange="onPdfGroupCategoryChange(${gIdx})" style="flex:1;min-width:130px;padding:8px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font);font-size:13px;">
                        <option value="">${t('pdf_uncategorized')}</option>
                        ${menuCategories.map(cat => `<option value="${cat.id}" ${matchExisting && matchExisting.id === cat.id ? 'selected' : ''}>${escapeHtml(cat.name)}</option>`).join('')}
                        ${group.name ? `<option value="__new__" ${showNewCatInput ? 'selected' : ''}>${escapeHtml(group.name)} (${t('pdf_new_category')})</option>` : ''}
                        <option value="__addnew__">${t('pdf_add_new_category')}</option>
                    </select>
                    <input type="text" id="pdfGroupNewCatName_${gIdx}" placeholder="${t('pdf_new_category_placeholder')}" value="${showNewCatInput ? escapeHtml(group.name) : ''}" style="display:${showNewCatInput ? 'block' : 'none'};flex:1;min-width:130px;padding:8px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font);font-size:13px;">
                </div>`;

        group.items.forEach(item => {
            html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid var(--border-light);flex-wrap:wrap;">
                        <input type="checkbox" id="pdfItemInclude_${item.tempId}" ${item.include ? 'checked' : ''} style="width:auto;flex-shrink:0;">
                        <input type="text" id="pdfItemName_${item.tempId}" value="${escapeHtml(item.name)}" style="flex:2;min-width:110px;padding:7px 8px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font);font-size:13px;">
                        <input type="number" id="pdfItemPrice_${item.tempId}" value="${item.price}" class="mono" style="width:78px;flex-shrink:0;padding:7px 8px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-primary);font-family:var(--font);font-size:13px;">
                    </div>`;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
}

function onPdfGroupCategoryChange(gIdx) {
    const sel = document.getElementById(`pdfGroupCat_${gIdx}`);
    const nameInput = document.getElementById(`pdfGroupNewCatName_${gIdx}`);
    if (sel.value === '__new__' || sel.value === '__addnew__') {
        if (sel.value === '__addnew__') nameInput.value = '';
        nameInput.style.display = 'block';
        nameInput.focus();
    } else {
        nameInput.style.display = 'none';
    }
}

async function confirmPdfImport() {
    if (!pdfImportParsedData) return;
    const errEl = document.getElementById('pdfImportReviewError');
    const btn = document.getElementById('pdfImportConfirmBtn');
    errEl.textContent = '';

    if (!supabaseClient) {
        errEl.textContent = t('error_connection');
        return;
    }

    btn.disabled = true;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + t('loading');

    try {
        let addedCount = 0;
        let hadError = false;

        for (let gIdx = 0; gIdx < pdfImportParsedData.length; gIdx++) {
            const group = pdfImportParsedData[gIdx];
            const includedItems = group.items.filter(item => document.getElementById(`pdfItemInclude_${item.tempId}`)?.checked);
            if (includedItems.length === 0) continue;

            const catSelect = document.getElementById(`pdfGroupCat_${gIdx}`);
            let categoryId = null;

            if (catSelect.value === '__new__' || catSelect.value === '__addnew__') {
                const newCatName = (document.getElementById(`pdfGroupNewCatName_${gIdx}`).value || '').trim();
                if (newCatName) {
                    const existingCat = menuCategories.find(c => c.name.trim().toLowerCase() === newCatName.toLowerCase());
                    if (existingCat) {
                        categoryId = existingCat.id;
                    } else {
                        const { data, error } = await supabaseClient.from('menu_categories').insert({
                            business_id: business.id,
                            name: newCatName,
                            icon: 'fa-utensils',
                            is_active: true,
                            sort_order: menuCategories.length + 1
                        }).select();
                        if (error) throw error;
                        if (data && data[0]) {
                            menuCategories.push(data[0]);
                            categoryId = data[0].id;
                        }
                    }
                }
            } else if (catSelect.value) {
                categoryId = catSelect.value;
            }

            for (const item of includedItems) {
                const nameVal = document.getElementById(`pdfItemName_${item.tempId}`).value.trim();
                const priceVal = parseFloat(document.getElementById(`pdfItemPrice_${item.tempId}`).value);
                if (!nameVal || isNaN(priceVal) || priceVal < 0) { hadError = true; continue; }
                try {
                    const { error } = await supabaseClient.from('menu_items').insert({
                        business_id: business.id,
                        name: nameVal,
                        price: priceVal,
                        description: '',
                        image_url: null,
                        category_id: categoryId,
                        is_active: true
                    });
                    if (error) throw error;
                    addedCount++;
                } catch (e) {
                    hadError = true;
                }
            }
        }

        await loadMenuCategories();
        await loadMenuItems();
        renderMenuView();
        renderMenuManagement();
        renderMenuCategoriesList();
        renderSettings();

        closeSheet('pdfImportOverlay');
        pdfImportParsedData = null;

        if (addedCount > 0) {
            showToast(hadError ? t('pdf_import_error') : t('pdf_import_success'), hadError ? 'error' : 'success');
        } else {
            errEl.textContent = t('pdf_import_error');
        }
    } catch (e) {
        console.error('PDF import confirm error:', e);
        errEl.textContent = t('error_general');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
    }
}

// ============================================================
// EXPENSE
// ============================================================
function openExpenseSheet() {
    if (!hasPermission('add_expense')) {
        showToast(t('error_permission'), 'error');
        return;
    }
    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseError').textContent = '';
    document.getElementById('saveExpenseBtn').onclick = saveExpense;
    openSheet('expenseOverlay');
}

async function saveExpense() {
    const description = document.getElementById('expenseDesc').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const errEl = document.getElementById('expenseError');
    if (!description || isNaN(amount) || amount <= 0) { errEl.textContent = t('error_general'); return; }
    if (!supabaseClient || !currentShift) { errEl.textContent = t('error_general'); return; }
    try {
        const { error } = await supabaseClient.from('expenses').insert({
            business_id: business.id,
            shift_id: currentShift.id,
            description,
            amount
        });
        if (error) {
            console.error('❌ Expense insert failed:', error.message || error);
            errEl.textContent = t('error_general');
            return;
        }
        showToast(t('expense_added'), 'success');
        closeSheet('expenseOverlay');
        renderDashboard();
        document.getElementById('expenseDesc').value = '';
        document.getElementById('expenseAmount').value = '';
    } catch (e) {
        console.error('❌ Expense insert exception:', e);
        errEl.textContent = t('error_general');
    }
}

// ============================================================
// PAYMENT METHOD
// ============================================================
function openPaymentMethodSheet() {
    document.getElementById('editPaymentMethodId').value = '';
    document.getElementById('paymentMethodName').value = '';
    document.getElementById('paymentMethodIcon').value = 'fa-money-bill-wave';
    document.getElementById('paymentMethodSheetTitle').textContent = t('add_payment_method');
    document.getElementById('deletePaymentMethodBtn').style.display = 'none';
    document.getElementById('paymentMethodError').textContent = '';
    document.getElementById('savePaymentMethodBtn').onclick = savePaymentMethod;
    openSheet('paymentMethodOverlay');
}

async function savePaymentMethod() {
    const name = document.getElementById('paymentMethodName').value.trim();
    const icon = document.getElementById('paymentMethodIcon').value;
    const errEl = document.getElementById('paymentMethodError');
    if (!name) { errEl.textContent = t('error_general'); return; }
    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }
    try {
        await supabaseClient.from('payment_methods').insert({
            business_id: business.id,
            name: name,
            icon: icon,
            is_active: true
        });
        showToast(t('payment_method_added'), 'success');
        closeSheet('paymentMethodOverlay');
        await loadPaymentMethods();
        renderSettings();
    } catch (e) { errEl.textContent = t('error_general'); }
}

// ============================================================
// EMPLOYEE MANAGEMENT
// ============================================================
function openEmployeeSheet() {
    document.getElementById('editEmployeeId').value = '';
    document.getElementById('employeeName').value = '';
    document.getElementById('employeePin').value = '';
    document.getElementById('employeeRole').value = 'waiter';
    document.getElementById('deleteEmployeeBtn').style.display = 'none';
    document.getElementById('employeeError').textContent = '';

    setDefaultPermissions('waiter');

    document.getElementById('saveEmployeeBtn').onclick = saveEmployee;
    openSheet('employeeOverlay');
}

function setDefaultPermissions(role) {
    const defaults = {
        waiter: {
            dashboard: false, tables: true, orders: false, menu: false, settings: false,
            create_orders: true, add_expense: false, close_shift: false, print_receipt: true,
            manage_menu: false, view_revenue: false, view_expenses: false
        },
        chef: {
            dashboard: false, tables: false, orders: true, menu: false, settings: false,
            create_orders: false, add_expense: false, close_shift: false, print_receipt: false,
            manage_menu: false, view_revenue: false, view_expenses: false
        },
        cashier: {
            dashboard: true, tables: true, orders: true, menu: false, settings: false,
            create_orders: true, add_expense: true, close_shift: true, print_receipt: true,
            manage_menu: false, view_revenue: true, view_expenses: true
        },
        admin: {
            dashboard: true, tables: true, orders: true, menu: true, settings: true,
            create_orders: true, add_expense: true, close_shift: true, print_receipt: true,
            manage_menu: true, view_revenue: true, view_expenses: true
        }
    };

    const perms = defaults[role] || defaults.waiter;
    document.getElementById('permDashboard').checked = perms.dashboard;
    document.getElementById('permTables').checked = perms.tables;
    document.getElementById('permOrders').checked = perms.orders;
    document.getElementById('permMenu').checked = perms.menu;
    document.getElementById('permSettings').checked = perms.settings;
    document.getElementById('permCreateOrders').checked = perms.create_orders;
    document.getElementById('permAddExpense').checked = perms.add_expense;
    document.getElementById('permCloseShift').checked = perms.close_shift;
    document.getElementById('permPrintReceipt').checked = perms.print_receipt;
    document.getElementById('permManageMenu').checked = perms.manage_menu;
    document.getElementById('permViewRevenue').checked = perms.view_revenue;
    document.getElementById('permViewExpenses').checked = perms.view_expenses;
}

document.addEventListener('DOMContentLoaded', function() {
    const roleSelect = document.getElementById('employeeRole');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            const isEdit = document.getElementById('editEmployeeId').value !== '';
            if (!isEdit) {
                setDefaultPermissions(this.value);
            }
        });
    }
});

function editEmployee(empId) {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;

    document.getElementById('editEmployeeId').value = emp.id;
    document.getElementById('employeeName').value = emp.name;
    document.getElementById('employeePin').value = emp.pin;
    document.getElementById('employeeRole').value = emp.role || 'waiter';
    document.getElementById('deleteEmployeeBtn').style.display = 'flex';
    document.getElementById('employeeError').textContent = '';

    const perms = emp.permissions || {};
    document.getElementById('permDashboard').checked = perms.dashboard !== false;
    document.getElementById('permTables').checked = perms.tables !== false;
    document.getElementById('permOrders').checked = perms.orders !== false;
    document.getElementById('permMenu').checked = perms.menu !== false;
    document.getElementById('permSettings').checked = perms.settings === true;
    document.getElementById('permCreateOrders').checked = perms.create_orders !== false;
    document.getElementById('permAddExpense').checked = perms.add_expense === true;
    document.getElementById('permCloseShift').checked = perms.close_shift === true;
    document.getElementById('permPrintReceipt').checked = perms.print_receipt !== false;
    document.getElementById('permManageMenu').checked = perms.manage_menu === true;
    document.getElementById('permViewRevenue').checked = perms.view_revenue === true;
    document.getElementById('permViewExpenses').checked = perms.view_expenses === true;

    document.getElementById('saveEmployeeBtn').onclick = saveEmployee;
    document.getElementById('deleteEmployeeBtn').onclick = () => deleteEmployee(empId);
    openSheet('employeeOverlay');
}

async function saveEmployee() {
    const id = document.getElementById('editEmployeeId').value;
    const name = document.getElementById('employeeName').value.trim();
    const pin = document.getElementById('employeePin').value.trim();
    const role = document.getElementById('employeeRole').value;
    const errEl = document.getElementById('employeeError');

    const permissions = {
        dashboard: document.getElementById('permDashboard').checked,
        tables: document.getElementById('permTables').checked,
        orders: document.getElementById('permOrders').checked,
        menu: document.getElementById('permMenu').checked,
        settings: document.getElementById('permSettings').checked,
        create_orders: document.getElementById('permCreateOrders').checked,
        add_expense: document.getElementById('permAddExpense').checked,
        close_shift: document.getElementById('permCloseShift').checked,
        print_receipt: document.getElementById('permPrintReceipt').checked,
        manage_menu: document.getElementById('permManageMenu').checked,
        view_revenue: document.getElementById('permViewRevenue').checked,
        view_expenses: document.getElementById('permViewExpenses').checked
    };

    if (!name || !pin || !/^\d{4,6}$/.test(pin)) { errEl.textContent = t('error_general'); return; }
    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }

    try {
        const data = { name, pin, role, is_active: true, permissions: permissions };

        if (id) {
            await supabaseClient.from('employees').update(data).eq('id', id);
            showToast(t('employee_updated'), 'success');
        } else {
            data.business_id = business.id;
            await supabaseClient.from('employees').insert(data);
            showToast(t('employee_added'), 'success');
        }
        closeSheet('employeeOverlay');
        await loadEmployees();
        renderSettings();
    } catch (e) {
        errEl.textContent = t('error_general');
    }
}

async function deleteEmployee(empId) {
    if (!confirm(t('delete') + '؟')) return;
    if (!supabaseClient) return;
    try {
        await supabaseClient.from('employees').delete().eq('id', empId);
        showToast(t('employee_deleted'), 'success');
        closeSheet('employeeOverlay');
        await loadEmployees();
        renderSettings();
    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

// ============================================================
// SETTINGS
// ============================================================
function renderSettings() {
    const el = document.getElementById('settingsContent');
    const currentTheme = localStorage.getItem('platepro_theme') || 'dark';
    const isDark = currentTheme === 'dark';

    el.innerHTML = `<div class="section-title" data-i18n="appearance">🎨 المظهر</div>
                        <div class="theme-toggle">
                            <div class="toggle-icons">
                                <span class="icon-moon">🌙</span>
                                <span class="icon-sun">☀️</span>
                            </div>
                            <div class="toggle-switch ${!isDark ? 'active' : ''}" id="themeToggle" onclick="toggleTheme()">
                                <div class="toggle-slider"></div>
                            </div>
                            <span class="toggle-label" id="themeToggleLabel">${isDark ? t('dark') : t('light')}</span>
                        </div>
                        
                        <div class="section-title" data-i18n="logo">🖼️ الشعار</div>
                        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                            ${businessLogo ? `<img src="${businessLogo}" style="width:60px;height:60px;border-radius:50%;border:2px solid var(--primary);object-fit:cover;">` : '<span style="color:var(--text-muted);">' + t('no_logo') + '</span>'}
                            <button class="btn btn-primary btn-sm" onclick="openLogoSettings()"><i class="fa-solid fa-pen"></i> ${t('edit_logo')}</button>
                        </div>
                        
                        <div class="section-title" data-i18n="fees">💰 الرسوم والضرائب</div>
                        <div class="list-row"><div class="row-title" data-i18n="service_fee_label">رسوم الخدمة</div><div class="row-value mono">${serviceFeePercent}%</div></div>
                        <div class="list-row"><div class="row-title" data-i18n="vat_label">ضريبة القيمة المضافة (VAT)</div><div class="row-value mono">${vatPercent}%</div></div>
                        <button class="btn btn-primary btn-sm btn-block" onclick="openFeesSettings()"><i class="fa-solid fa-pen"></i> ${t('edit_fees')}</button>
                        
                        <div class="section-title" data-i18n="menu_categories">📂 التصنيفات</div>
                        <button class="btn btn-primary btn-sm" onclick="openCategorySheet()"><i class="fa-solid fa-plus"></i> إضافة تصنيف</button>
                        <div class="panel" id="settingsCategoriesList"></div>
                        
                        <div class="section-title" data-i18n="manage_tables">🪑 إدارة الطاولات</div>
                        <button class="btn btn-primary btn-sm" onclick="openTableManagementSheet()"><i class="fa-solid fa-plus"></i> ${t('add_table')}</button>
                        <div class="panel" id="settingsTablesList"></div>
                        
                        <div class="section-title" data-i18n="payment_methods">💳 طرق الدفع</div>
                        <button class="btn btn-primary btn-sm" onclick="openPaymentMethodSheet()"><i class="fa-solid fa-plus"></i> ${t('add')}</button>
                        <div class="panel" id="settingsPaymentMethods"></div>
                        
                        <div class="section-title" data-i18n="employees">👥 الموظفين</div>
                        <button class="btn btn-primary btn-sm" onclick="openEmployeeSheet()"><i class="fa-solid fa-plus"></i> ${t('add')}</button>
                        <div class="panel" id="settingsEmployees"></div>
                        
                        <button class="btn btn-ghost btn-block" style="margin-top:16px;" onclick="switchBusiness()"><i class="fa-solid fa-right-left"></i> ${t('switch_business')}</button>`;

    renderSettingsTables();
    renderSettingsPaymentMethods();
    renderSettingsEmployees();
    renderMenuCategoriesList();
}

function renderSettingsTables() {
    const el = document.getElementById('settingsTablesList');
    if (tables.length === 0) {
        el.innerHTML = `<div class="empty" style="padding:12px;">${t('no_tables')}</div>`;
        return;
    }
    el.innerHTML = tables.map(table =>
        `<div class="list-row">
                            <div>
                                <div class="row-title">${t('table')} #${table.number}</div>
                                <div class="row-sub">${table.capacity || 4} ${t('persons')} · ${t(table.status)}</div>
                            </div>
                            <div class="row-actions">
                                <button class="btn btn-ghost btn-xs" onclick="editTable('${table.id}')"><i class="fa-solid fa-pen"></i></button>
                                <button class="btn btn-danger btn-xs" onclick="deleteTable('${table.id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`
    ).join('');
}

function renderSettingsPaymentMethods() {
    const el = document.getElementById('settingsPaymentMethods');
    if (paymentMethods.length === 0) {
        el.innerHTML = `<div class="empty" style="padding:12px;">${t('no_items')}</div>`;
        return;
    }
    el.innerHTML = paymentMethods.slice(0, 3).map(pm =>
        `<div class="list-row"><div><div class="row-title"><i class="fa-solid ${pm.icon}"></i> ${escapeHtml(pm.name)}</div></div></div>`
    ).join('');
}

function renderSettingsEmployees() {
    const el = document.getElementById('settingsEmployees');
    if (employees.length === 0) {
        el.innerHTML = `<div class="empty" style="padding:12px;">${t('no_items')}</div>`;
        return;
    }
    el.innerHTML = employees.map(emp => {
        const roleMap = { 'waiter': t('waiter'), 'chef': t('chef'), 'cashier': t('cashier'), 'admin': t('admin') };
        const statusBadge = emp.is_active !== false ?
            `<span class="badge badge-success">✅ ${t('active')}</span>` :
            `<span class="badge badge-inactive">⛔ ${t('inactive')}</span>`;
        return `<div class="list-row">
                            <div>
                                <div class="row-title">${escapeHtml(emp.name)}</div>
                                <div class="row-sub">${roleMap[emp.role] || emp.role}</div>
                            </div>
                            <div class="row-actions">
                                ${statusBadge}
                                <button class="btn btn-ghost btn-xs" onclick="editEmployee('${emp.id}')"><i class="fa-solid fa-pen"></i></button>
                                <button class="btn btn-danger btn-xs" onclick="deleteEmployee('${emp.id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
    }).join('');
}

// ============================================================
// SHIFT HISTORY (في الإعدادات)
// ============================================================
function renderShiftHistory() {
    const el = document.getElementById('settingsShiftHistory');
    if (!el) return;

    if (!supabaseClient || !business) {
        el.innerHTML = `<div class="empty" style="padding:12px;">${t('loading')}</div>`;
        return;
    }

    try {
        supabaseClient
            .from('shifts')
            .select('*')
            .eq('business_id', business.id)
            .eq('status', 'closed')
            .order('closed_at', { ascending: false })
            .limit(5)
            .then(({ data: shifts, error }) => {
                if (error) {
                    console.error('Error fetching shift history:', error);
                    el.innerHTML = `<div class="empty" style="padding:12px;">⚠️ حدث خطأ في تحميل سجل الشيفتات</div>`;
                    return;
                }

                if (!shifts || shifts.length === 0) {
                    el.innerHTML = `<div class="empty" style="padding:12px;">${t('no_shift_history')}</div>`;
                    return;
                }

                el.innerHTML = shifts.map(shift => `
                    <div class="list-row">
                        <div>
                            <div class="row-title">${new Date(shift.closed_at).toLocaleDateString('ar-EG')}</div>
                            <div class="row-sub">${new Date(shift.closed_at).toLocaleTimeString('ar-EG')} · ${shift.closed_by || 'نظام'}</div>
                        </div>
                        <div>
                            <div class="row-sub" style="color:var(--success);">💰 ${money(shift.total_revenue || 0)}</div>
                            <div class="row-sub" style="color:var(--primary-dark);">📈 ${money(shift.total_profit || 0)}</div>
                        </div>
                    </div>
                `).join('');
            });
    } catch (e) {
        console.error('Error in renderShiftHistory:', e);
        el.innerHTML = `<div class="empty" style="padding:12px;">⚠️ حدث خطأ في تحميل السجل</div>`;
    }
}

// ============================================================
// TABLE MANAGEMENT
// ============================================================
function openTableManagementSheet() {
    document.getElementById('editTableId').value = '';
    document.getElementById('editTableNumber').value = tables.length + 1;
    document.getElementById('editTableCapacity').value = 4;
    document.getElementById('editTableStatus').value = 'available';
    document.getElementById('tableManagementTitle').textContent = t('add_table');
    document.getElementById('deleteTableBtn').style.display = 'none';
    document.getElementById('tableManagementError').textContent = '';
    openSheet('tableManagementOverlay');
}

function editTable(tableId) {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    document.getElementById('editTableId').value = table.id;
    document.getElementById('editTableNumber').value = table.number;
    document.getElementById('editTableCapacity').value = table.capacity || 4;
    document.getElementById('editTableStatus').value = table.status || 'available';
    document.getElementById('tableManagementTitle').textContent = t('edit_table');
    document.getElementById('deleteTableBtn').style.display = 'flex';
    document.getElementById('tableManagementError').textContent = '';
    openSheet('tableManagementOverlay');
}

async function saveTableManagement() {
    const id = document.getElementById('editTableId').value;
    const number = parseInt(document.getElementById('editTableNumber').value);
    const capacity = parseInt(document.getElementById('editTableCapacity').value);
    const status = document.getElementById('editTableStatus').value;
    const errEl = document.getElementById('tableManagementError');

    if (!number || number < 1) { errEl.textContent = t('error_general'); return; }
    if (!supabaseClient) { errEl.textContent = t('error_connection'); return; }

    try {
        const data = { number, capacity, status };
        if (id) {
            await supabaseClient.from('tables').update(data).eq('id', id);
            showToast(t('table_updated'), 'success');
        } else {
            data.business_id = business.id;
            await supabaseClient.from('tables').insert(data);
            showToast(t('table_added'), 'success');
        }
        closeSheet('tableManagementOverlay');
        await loadTables();
        renderTables();
        renderSettings();
        renderDashboard();
    } catch (e) {
        errEl.textContent = t('error_general');
    }
}

async function deleteTableFromSheet() {
    const id = document.getElementById('editTableId').value;
    if (!id) return;
    closeSheet('tableManagementOverlay');
    await deleteTable(id);
}

async function deleteTable(tableId) {
    if (!confirm(t('delete_table_confirm'))) return;
    if (!supabaseClient) return;
    try {
        await supabaseClient.from('tables').delete().eq('id', tableId);
        showToast(t('table_deleted'), 'success');
        await loadTables();
        renderTables();
        renderSettings();
        renderDashboard();
    } catch (e) {
        showToast(t('error_general'), 'error');
    }
}

// ============================================================
// SWITCH BUSINESS
// ============================================================
function switchBusiness() {
    stopRealtimeSync();
    localStorage.removeItem('platepro_business_code');
    localStorage.removeItem('platepro_logo');
    business = null;
    deviceRecord = null;
    currentUser = null;
    document.getElementById('setupBusinessCode').value = '';
    showScreen('setupScreen');
}

// ============================================================
// BIND EVENTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('setupContinueBtn').addEventListener('click', handleSetupContinue);
    document.getElementById('activateBtn').addEventListener('click', handleActivateDevice);
    document.getElementById('backToSetupBtn').addEventListener('click', function() { showScreen('setupScreen'); });

    document.getElementById('lockOwnerBtn').addEventListener('click', function() { selectLockRole('owner'); });
    document.getElementById('lockEmployeeBtn').addEventListener('click', function() { selectLockRole('employee'); });
    document.getElementById('unlockOwnerBtn').addEventListener('click', handleUnlock);
    document.getElementById('unlockEmpBtn').addEventListener('click', handleEmployeeUnlock);
    document.getElementById('resetLockBtn').addEventListener('click', resetLockRole);
    document.getElementById('resetLockEmpBtn').addEventListener('click', resetLockRole);
    document.getElementById('lockAppBtn').addEventListener('click', lockApp);

    loadTheme();
    loadFeesSettings();
    loadLogo();
    initCustomerPage();
    tryAutoResume();
});

async function tryAutoResume() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('customer') === 'true') return; // رابط منيو العميل (QR) - متعملش auto-resume للمالك/الموظف

    const code = localStorage.getItem('platepro_business_code');
    if (!code) return;
    try {
        if (!supabaseClient) return;
        const { data: biz } = await supabaseClient.from('businesses').select('*').eq('code', code).single();
        if (!biz) return;
        business = biz;
        const { data: dev } = await supabaseClient.from('devices').select('*').eq('business_id', biz.id).eq('device_id', getDeviceId()).maybeSingle();
        if (!dev) return;
        deviceRecord = dev;
        proceedToLock();
    } catch (e) {
        console.warn('auto-resume failed', e);
        localStorage.removeItem('platepro_business_code');
    }
}

console.log('🍽️ Plate Pro — Full System with Realtime Sync & Advanced Shift History!');
console.log('✅ Real-time synchronization between devices');
console.log('✅ Advanced shift history with daily/weekly/monthly views');
console.log('✅ Detailed shift view with table and time analysis');
console.log('✅ One shift for the entire restaurant');
console.log('✅ Granular permissions per role');
console.log('✅ Notifications only for waiters when order is ready');
console.log('✅ Kitchen orders for chef');
console.log('✅ Ring notifications for new & ready orders');
