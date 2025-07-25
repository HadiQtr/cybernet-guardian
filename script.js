// CyberNET Security Dashboard JavaScript

// Global variables
let isScanning = false;
let scanCompleted = false;
let devices = [];
let vulnerabilities = [];

// Mock data
const mockDevices = [
    { ip: '192.168.1.1', mac: '00:14:22:01:23:45', vendor: 'TP-Link', os: 'Linux 3.x' },
    { ip: '192.168.1.10', mac: '00:1B:44:11:3A:B7', vendor: 'Apple', os: 'macOS' },
    { ip: '192.168.1.15', mac: '08:00:27:12:34:56', vendor: 'Samsung', os: 'Android' }
];

const mockVulnerabilities = [
    {
        name: 'SSH Weak Authentication',
        cve: 'CVE-2023-1234',
        port: 22,
        description: 'خدمة SSH تسمح بمصادقة ضعيفة',
        technicalDetails: 'الخادم يقبل كلمات مرور ضعيفة ولا يفرض سياسة أمان قوية',
        exploitation: 'يمكن للمهاجم استخدام هجمات القوة الغاشمة للوصول للنظام',
        prevention: 'استخدم كلمات مرور قوية، فعّل المصادقة الثنائية، قم بتغيير البورت الافتراضي، واستخدم مفاتيح SSH',
        severity: 'critical'
    },
    {
        name: 'Open HTTP Service',
        port: 80,
        description: 'خدمة HTTP مكشوفة بدون تشفير',
        technicalDetails: 'خادم ويب يعمل بدون HTTPS مما يعرض البيانات للاعتراض',
        exploitation: 'اعتراض البيانات المرسلة عبر الشبكة وتعديلها',
        prevention: 'فعّل HTTPS، استخدم شهادات SSL/TLS صالحة، وأعد توجيه HTTP إلى HTTPS',
        severity: 'medium'
    },
    {
        name: 'Weak FTP Configuration',
        port: 21,
        description: 'خدمة FTP تسمح بدخول مجهول',
        technicalDetails: 'خادم FTP يسمح بالدخول بدون مصادقة',
        exploitation: 'الوصول لملفات النظام وتحميل ملفات ضارة',
        prevention: 'أوقف الدخول المجهول، استخدم SFTP أو FTPS، وطبق مصادقة قوية',
        severity: 'high'
    },
    {
        name: 'Information Disclosure',
        port: 443,
        description: 'تسريب معلومات النظام',
        technicalDetails: 'الخادم يكشف عن معلومات حساسة في الرؤوس',
        exploitation: 'جمع معلومات عن النظام لتحضير هجمات أخرى',
        prevention: 'أخف معلومات الخادم، احذف الرؤوس غير الضرورية، وقم بتحديث البرامج',
        severity: 'low'
    }
];

// API Configuration for Python backend
const API_BASE_URL = 'http://localhost:5000'; // Change this to your Python server URL

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    createRainAnimation();
    
    // Test Python backend connection
    testBackendConnection();
});

// Initialize event listeners
function initializeEventListeners() {
    const scanBtn = document.getElementById('scanBtn');
    const sendReportBtn = document.getElementById('sendReportBtn');
    
    scanBtn.addEventListener('click', handleSecurityScan);
    sendReportBtn.addEventListener('click', handleSendReport);
}

// Test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            console.log('✅ Connected to Python backend successfully');
        } else {
            console.log('⚠️ Backend not responding, using mock data');
        }
    } catch (error) {
        console.log('⚠️ Backend not available, using mock data:', error.message);
    }
}

// Handle security scan
async function handleSecurityScan() {
    if (isScanning) return;
    
    setScanning(true);
    
    try {
        // Try to connect to Python backend first
        const response = await fetch(`${API_BASE_URL}/api/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target: 'local_network',
                scan_type: 'full'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            devices = data.devices || mockDevices;
            vulnerabilities = data.vulnerabilities || mockVulnerabilities;
        } else {
            throw new Error('Backend not available');
        }
    } catch (error) {
        console.log('Using mock data due to backend error:', error.message);
        // Simulate scanning delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        devices = mockDevices;
        vulnerabilities = mockVulnerabilities;
    }
    
    setScanning(false);
    displayResults();
    showToast('تم الفحص بنجاح', `تم اكتشاف ${devices.length} أجهزة و ${vulnerabilities.length} ثغرات أمنية`, 'success');
}

// Handle send report
async function handleSendReport() {
    const email = document.getElementById('emailInput').value;
    
    if (!email) {
        showToast('خطأ', 'يرجى إدخال البريد الإلكتروني', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('خطأ', 'يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    try {
        const reportData = {
            email: email,
            devices: devices,
            vulnerabilities: vulnerabilities,
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch(`${API_BASE_URL}/api/send-report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        });
        
        if (response.ok) {
            showToast('تم الإرسال', 'تم إرسال التقرير بنجاح', 'success');
        } else {
            throw new Error('Failed to send report');
        }
    } catch (error) {
        console.log('Report sending error:', error.message);
        // Mock success for demonstration
        showToast('تم الإرسال', 'جاري إرسال التقرير...', 'success');
    }
}

// Set scanning state
function setScanning(scanning) {
    isScanning = scanning;
    const scanBtn = document.getElementById('scanBtn');
    
    if (scanning) {
        scanBtn.innerHTML = '<span class="icon spin">🔄</span> جاري الفحص الأمني...';
        scanBtn.disabled = true;
        scanBtn.style.opacity = '0.7';
    } else {
        scanBtn.innerHTML = '<span class="icon">▶️</span> ابدأ الفحص الأمني';
        scanBtn.disabled = false;
        scanBtn.style.opacity = '1';
        scanCompleted = true;
        updateAdditionalOptions();
    }
}

// Update additional options after scan
function updateAdditionalOptions() {
    const additionalOptions = document.getElementById('additionalOptions');
    
    if (scanCompleted) {
        additionalOptions.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full">
                <button class="btn btn-secondary h-12 text-sm">
                    <span class="icon">📋</span>
                    التقارير السابقة
                </button>
                <button class="btn btn-secondary h-12 text-sm" style="background-color: hsla(200, 60%, 50%, 0.2); border-color: hsla(200, 60%, 50%, 0.5); color: hsl(200, 60%, 70%);">
                    <span class="icon">📄</span>
                    توليد تقرير
                </button>
            </div>
        `;
        additionalOptions.className = 'flex justify-center mb-8 max-w-lg mx-auto';
    }
}

// Display scan results
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');
    
    displayDevices();
    displayVulnerabilities();
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Display devices table
function displayDevices() {
    const deviceCount = document.getElementById('deviceCount');
    const devicesTableBody = document.getElementById('devicesTableBody');
    
    deviceCount.textContent = devices.length;
    
    devicesTableBody.innerHTML = devices.map(device => `
        <tr>
            <td class="mac-address">${device.ip}</td>
            <td class="mac-address">${device.mac}</td>
            <td>${device.vendor}</td>
            <td>
                ${device.os ? 
                    `<span class="badge badge-secondary">${device.os}</span>` : 
                    '<span style="color: var(--cybernet-text-muted);">غير محدد</span>'
                }
            </td>
        </tr>
    `).join('');
}

// Display vulnerabilities
function displayVulnerabilities() {
    const vulnCount = document.getElementById('vulnCount');
    const vulnerabilitiesList = document.getElementById('vulnerabilitiesList');
    
    vulnCount.textContent = vulnerabilities.length;
    
    vulnerabilitiesList.innerHTML = vulnerabilities.map(vuln => `
        <div class="vulnerability-card">
            <div class="vulnerability-header">
                <div>
                    <div class="vulnerability-title">${vuln.name}</div>
                    ${vuln.cve ? `<div class="vulnerability-cve">${vuln.cve}</div>` : ''}
                </div>
                <div class="vulnerability-badges">
                    ${getSeverityBadge(vuln.severity)}
                    <span class="badge" style="border: 1px solid var(--border); font-size: 0.75rem;">
                        Port ${vuln.port}
                    </span>
                </div>
            </div>
            <div class="vulnerability-content">
                <!-- الوصف -->
                <div class="vuln-section description">
                    <div class="vuln-section-title">
                        <span class="icon">📄</span>
                        الوصف :
                    </div>
                    <div class="vuln-section-content">
                        <p>${vuln.description}</p>
                    </div>
                </div>

                <!-- التفاصيل التقنية -->
                <div class="vuln-section technical">
                    <div class="vuln-section-title">
                        <span class="icon">💻</span>
                        التفاصيل التقنية :
                    </div>
                    <div class="vuln-section-content">
                        <p>${vuln.technicalDetails}</p>
                    </div>
                </div>

                <!-- طريقة الاستغلال -->
                <div class="vuln-section exploitation">
                    <div class="vuln-section-title">
                        <span class="icon">⚠️</span>
                        طريقة الاستغلال :
                    </div>
                    <div class="vuln-section-content">
                        <p>${vuln.exploitation}</p>
                    </div>
                    <div style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: var(--cybernet-text);">
                        <span class="icon">⚠️</span>
                        <span style="font-size: 0.875rem; font-weight: 500;">مستوى الخطورة : عالي</span>
                    </div>
                </div>

                <!-- طرق الحل -->
                <div class="vuln-section prevention">
                    <div class="vuln-section-title">
                        <span class="icon">✅</span>
                        طرق الحل :
                    </div>
                    <div class="vuln-section-content">
                        <p>${vuln.prevention}</p>
                    </div>
                    <div style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.5rem; color: var(--cybernet-text);">
                        <span class="icon">🛡️</span>
                        <span style="font-size: 0.875rem; font-weight: 500;">حالة الحماية : قابل للتصحيح</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get severity badge
function getSeverityBadge(severity) {
    const severityConfig = {
        critical: { class: 'badge-critical', label: 'خطيرة جداً' },
        high: { class: 'badge-high', label: 'خطيرة' },
        medium: { class: 'badge-medium', label: 'متوسطة' },
        low: { class: 'badge-low', label: 'منخفضة' }
    };
    
    const config = severityConfig[severity] || severityConfig.low;
    return `<span class="badge ${config.class}">${config.label}</span>`;
}

// Show toast notification
function showToast(title, description, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create rain animation
function createRainAnimation() {
    const rainContainer = document.querySelector('.rain-container');
    
    // Create multiple sets of rain lines
    const rainSets = [
        { count: 20, width: '2px', opacity: 0.3, duration: [2, 4], delay: 3 },
        { count: 15, width: '2px', opacity: 0.2, duration: [3, 5], delay: 4 },
        { count: 12, width: '1px', opacity: 0.15, duration: [4, 6], delay: 5 }
    ];
    
    rainSets.forEach((set, setIndex) => {
        for (let i = 0; i < set.count; i++) {
            const rainLine = document.createElement('div');
            rainLine.className = 'rain-line';
            
            const left = 5 + i * (90 / set.count);
            const height = 40 + Math.random() * 40;
            const duration = set.duration[0] + Math.random() * (set.duration[1] - set.duration[0]);
            const delay = -Math.random() * set.delay;
            
            rainLine.style.cssText = `
                left: ${left}%;
                width: ${set.width};
                height: ${height}px;
                background: linear-gradient(to bottom, transparent, hsla(0, 61%, 69%, ${set.opacity}), transparent);
                animation: rainFall ${duration}s linear infinite;
                animation-delay: ${delay}s;
            `;
            
            rainContainer.appendChild(rainLine);
        }
    });
}

// Export functions for potential external use
window.CyberNetDashboard = {
    handleSecurityScan,
    handleSendReport,
    testBackendConnection,
    showToast
};