import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Scan, 
  Mail, 
  Users, 
  AlertTriangle, 
  FileText, 
  History, 
  Settings,
  Play,
  Eye,
  Download,
  RefreshCw,
  Power
} from 'lucide-react';

interface Device {
  ip: string;
  mac: string;
  vendor: string;
  os?: string;
}

interface Vulnerability {
  name: string;
  cve?: string;
  port: number;
  description: string;
  technicalDetails: string;
  exploitation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const CybernetDashboard = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock data للعرض التوضيحي
  const mockDevices: Device[] = [
    { ip: '192.168.1.1', mac: '00:14:22:01:23:45', vendor: 'TP-Link', os: 'Linux 3.x' },
    { ip: '192.168.1.10', mac: '00:1B:44:11:3A:B7', vendor: 'Apple', os: 'macOS' },
    { ip: '192.168.1.15', mac: '08:00:27:12:34:56', vendor: 'Samsung', os: 'Android' }
  ];

  const mockVulnerabilities: Vulnerability[] = [
    {
      name: 'SSH Weak Authentication',
      cve: 'CVE-2023-1234',
      port: 22,
      description: 'خدمة SSH تسمح بمصادقة ضعيفة',
      technicalDetails: 'الخادم يقبل كلمات مرور ضعيفة ولا يفرض سياسة أمان قوية',
      exploitation: 'يمكن للمهاجم استخدام هجمات القوة الغاشمة للوصول للنظام',
      severity: 'critical'
    },
    {
      name: 'Open HTTP Service',
      port: 80,
      description: 'خدمة HTTP مكشوفة بدون تشفير',
      technicalDetails: 'خادم ويب يعمل بدون HTTPS مما يعرض البيانات للاعتراض',
      exploitation: 'اعتراض البيانات المرسلة عبر الشبكة وتعديلها',
      severity: 'medium'
    },
    {
      name: 'Weak FTP Configuration',
      port: 21,
      description: 'خدمة FTP تسمح بدخول مجهول',
      technicalDetails: 'خادم FTP يسمح بالدخول بدون مصادقة',
      exploitation: 'الوصول لملفات النظام وتحميل ملفات ضارة',
      severity: 'high'
    },
    {
      name: 'Information Disclosure',
      port: 443,
      description: 'تسريب معلومات النظام',
      technicalDetails: 'الخادم يكشف عن معلومات حساسة في الرؤوس',
      exploitation: 'جمع معلومات عن النظام لتحضير هجمات أخرى',
      severity: 'low'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      critical: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-600/50', label: 'خطيرة جداً' },
      high: { bg: 'bg-orange-600/20', text: 'text-orange-400', border: 'border-orange-600/50', label: 'خطيرة' },
      medium: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-600/50', label: 'متوسطة' },
      low: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-600/50', label: 'منخفضة' }
    };
    const config = severityConfig[severity as keyof typeof severityConfig];
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border}`}>
        {config.label}
      </Badge>
    );
  };

  const handleSecurityScan = async () => {
    setIsScanning(true);
    setScanCompleted(false);
    // محاكاة عملية الفحص
    setTimeout(() => {
      setDevices(mockDevices);
      setVulnerabilities(mockVulnerabilities);
      setIsScanning(false);
      setScanCompleted(true);
      
      // إشعار النجاح
      toast({
        title: "تم الفحص بنجاح",
        description: `تم اكتشاف ${mockDevices.length} جهاز و ${mockVulnerabilities.length} ثغرة أمنية`,
        className: "bg-green-600/20 border-green-600/50 text-green-400",
      });
    }, 3000);
  };

  const handleSendReport = () => {
    if (!email) {
      alert('يرجى إدخال البريد الإلكتروني');
      return;
    }
    alert('جاري إرسال التقرير...');
    // هنا سيتم إرسال التقرير فعلياً
  };

  const scrollToSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) {
      setTimeout(() => {
        document.getElementById('settings-panel')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-cybernet-bg text-cybernet-text p-6 relative overflow-hidden">
      {/* Rain-like animated background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multiple short rain lines at different positions */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-cybernet-red/30 to-transparent animate-[rain_3s_linear_infinite]"
            style={{
              left: `${5 + i * 4.5}%`,
              height: '60px',
              animationDelay: `${-Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`second-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-cybernet-red/20 to-transparent animate-[rain_4s_linear_infinite]"
            style={{
              left: `${10 + i * 5.2}%`,
              height: '40px',
              animationDelay: `${-Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`third-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-cybernet-red/15 to-transparent animate-[rain_5s_linear_infinite]"
            style={{
              left: `${7 + i * 7.5}%`,
              height: '80px',
              animationDelay: `${-Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/lovable-uploads/f4abe8d3-1647-4a63-9c36-7c8a1d224a5c.png" 
              alt="Security Dashboard Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-cybernet-red">لوحة التحكم الأمنية</h2>
          <p className="text-cybernet-text-muted text-lg max-w-2xl mx-auto text-center">
            جهاز ذكي لفحص أمان الشبكات واكتشاف التهديدات تلقائياً باستخدام Raspberry Pi
          </p>
        </div>

        {/* How to Use Section */}
        <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mb-8">
          <CardHeader>
            <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-cybernet-red" />
              طريقة استخدام الأداة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-cybernet-red font-semibold text-center">خطوات الاستخدام:</h3>
                <ol className="space-y-2 text-cybernet-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="bg-cybernet-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    اضغط على "ابدأ الفحص الأمني" لبدء مسح الشبكة
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-cybernet-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    انتظر انتهاء الفحص (يستغرق 2-3 دقائق)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-cybernet-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    ستظهر النتائج تلقائياً بعد انتهاء الفحص
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-cybernet-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    أدخل بريدك الإلكتروني وأرسل التقرير
                  </li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-cybernet-red font-semibold text-center">مستويات خطورة الثغرات:</h3>
                <ul className="space-y-3 text-cybernet-text-muted">
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    <span className="text-red-400 font-semibold">خطيرة جداً</span> - تتطلب تدخل فوري
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                    <span className="text-orange-400 font-semibold">خطيرة</span> - تحتاج إصلاح سريع
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                    <span className="text-yellow-400 font-semibold">متوسطة</span> - يُنصح بالإصلاح
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    <span className="text-green-400 font-semibold">منخفضة</span> - معلومات إضافية
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Controls - Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Scan Section - Takes 2 columns (wider) */}
          <div className="md:col-span-2">
            <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                  <Scan className="h-6 w-6 text-cybernet-red" />
                  فحص الشبكة
                </CardTitle>
                <CardDescription className="text-cybernet-text-muted">
                  ابدأ فحص شامل للشبكة واكتشاف الأجهزة والثغرات الأمنية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleSecurityScan} 
                  disabled={isScanning}
                  size="lg"
                  className="w-full"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      جاري الفحص الأمني...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      ابدأ الفحص الأمني
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Email Report Section - Takes 1 column (narrower) */}
          <div className="md:col-span-1">
            <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-cybernet-text flex items-center justify-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-cybernet-red" />
                  إرسال التقرير
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-cybernet-bg border-cybernet-red/30 text-cybernet-text h-10"
                />
                <Button onClick={handleSendReport} className="w-full h-10">
                  <Mail className="h-4 w-4" />
                  أرسل التقرير
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Options - Centered layout */}
        <div className="flex justify-center mb-8">
          {scanCompleted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full">
              <Button variant="cybernetSecondary" className="h-12 text-sm bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/50 text-blue-400 hover:text-blue-300">
                <FileText className="h-4 w-4" />
                توليد تقرير
              </Button>
              <Button variant="cybernetSecondary" className="h-12 text-sm">
                <History className="h-4 w-4" />
                التقارير السابقة
              </Button>
            </div>
          ) : (
            <Button variant="cybernetSecondary" className="h-12 text-sm w-64">
              <History className="h-4 w-4" />
              التقارير السابقة
            </Button>
          )}
        </div>

        {/* Results Section - Only show after scan completion */}
        {scanCompleted && (
          <div className="space-y-6">
            {/* Devices Section */}
            {devices.length > 0 && (
              <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                    <Users className="h-6 w-6 text-cybernet-red" />
                    الأجهزة المتصلة ({devices.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cybernet-red/20">
                          <th className="text-center p-3 text-cybernet-text">عنوان IP</th>
                          <th className="text-center p-3 text-cybernet-text">MAC Address</th>
                          <th className="text-center p-3 text-cybernet-text">الشركة المصنعة</th>
                          <th className="text-center p-3 text-cybernet-text">نظام التشغيل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {devices.map((device, index) => (
                          <tr key={index} className="border-b border-cybernet-red/10">
                            <td className="p-3 text-cybernet-text font-mono text-center">{device.ip}</td>
                            <td className="p-3 text-cybernet-text font-mono text-center">{device.mac}</td>
                            <td className="p-3 text-cybernet-text text-center">{device.vendor}</td>
                            <td className="p-3 text-center">
                              {device.os ? (
                                <Badge variant="secondary" className="bg-cybernet-red/20 text-cybernet-text">
                                  {device.os}
                                </Badge>
                              ) : (
                                <span className="text-cybernet-text-muted">غير محدد</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vulnerabilities Section */}
            {vulnerabilities.length > 0 && (
              <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-cybernet-red" />
                    الثغرات المكتشفة ({vulnerabilities.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vulnerabilities.map((vuln, index) => (
                      <div key={index} className="border border-cybernet-red/20 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-cybernet-text font-semibold">{vuln.name}</h4>
                          <div className="flex gap-2">
                            {getSeverityBadge(vuln.severity)}
                            {vuln.cve && (
                              <Badge variant="destructive">{vuln.cve}</Badge>
                            )}
                            <Badge className="bg-cybernet-red/20 text-cybernet-text">
                              Port {vuln.port}
                            </Badge>
                          </div>
                        </div>
                         <p className="text-cybernet-text-muted mb-2 text-right">{vuln.description}</p>
                         <details className="text-sm">
                           <summary className="text-cybernet-red cursor-pointer mb-2 text-right">التفاصيل التقنية</summary>
                           <div className="bg-cybernet-bg p-3 rounded border-r-4 border-cybernet-red">
                             <p className="mb-2 text-right"><strong>التفاصيل:</strong> {vuln.technicalDetails}</p>
                             <p className="text-right"><strong>طريقة الاستغلال:</strong> {vuln.exploitation}</p>
                           </div>
                         </details>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Settings Button */}
        <div className="text-center">
          <Button 
            variant="cybernetGhost" 
            onClick={scrollToSettings}
            size="lg"
          >
            <Settings className="h-5 w-5" />
            إعدادات متقدمة
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card id="settings-panel" className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mt-6">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                <Settings className="h-6 w-6 text-cybernet-red" />
                الإعدادات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full">
                  <Button variant="cybernetSecondary" className="h-12 bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/50 text-blue-400 hover:text-blue-300">
                    <RefreshCw className="h-4 w-4" />
                    تحديث الأدوات
                  </Button>
                  <Button variant="cybernetSecondary" className="h-12 bg-cybernet-red/20 hover:bg-cybernet-red/30 border-cybernet-red/50 text-cybernet-red hover:text-red-300">
                    <Power className="h-4 w-4" />
                    إعادة تشغيل الجهاز
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CybernetDashboard;