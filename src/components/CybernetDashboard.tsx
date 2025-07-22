import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
}

const CybernetDashboard = () => {
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [showDevices, setShowDevices] = useState(false);
  const [showVulnerabilities, setShowVulnerabilities] = useState(false);
  const [showReports, setShowReports] = useState(false);
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
      exploitation: 'يمكن للمهاجم استخدام هجمات القوة الغاشمة للوصول للنظام'
    },
    {
      name: 'Open HTTP Service',
      port: 80,
      description: 'خدمة HTTP مكشوفة بدون تشفير',
      technicalDetails: 'خادم ويب يعمل بدون HTTPS مما يعرض البيانات للاعتراض',
      exploitation: 'اعتراض البيانات المرسلة عبر الشبكة وتعديلها'
    }
  ];

  const handleSecurityScan = async () => {
    setIsScanning(true);
    // محاكاة عملية الفحص
    setTimeout(() => {
      setDevices(mockDevices);
      setVulnerabilities(mockVulnerabilities);
      setIsScanning(false);
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
      {/* Animated Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-cybernet-red/30 to-transparent animate-[slideRight_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-0 w-full h-px bg-gradient-to-l from-transparent via-cybernet-red/20 to-transparent animate-[slideLeft_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-60 left-0 w-full h-px bg-gradient-to-r from-transparent via-cybernet-red/25 to-transparent animate-[slideRight_5s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-80 right-0 w-full h-px bg-gradient-to-l from-transparent via-cybernet-red/15 to-transparent animate-[slideLeft_7s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 left-0 w-full h-px bg-gradient-to-r from-transparent via-cybernet-red/20 to-transparent animate-[slideRight_6s_ease-in-out_infinite]" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-40 right-0 w-full h-px bg-gradient-to-l from-transparent via-cybernet-red/25 to-transparent animate-[slideLeft_5s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-cybernet-red/30 to-transparent animate-[slideRight_4s_ease-in-out_infinite]" style={{animationDelay: '1.5s'}}></div>
        
        {/* Vertical moving lines */}
        <div className="absolute left-20 top-0 w-px h-full bg-gradient-to-b from-transparent via-cybernet-red/20 to-transparent animate-[slideDown_8s_ease-in-out_infinite]"></div>
        <div className="absolute right-32 top-0 w-px h-full bg-gradient-to-b from-transparent via-cybernet-red/15 to-transparent animate-[slideDown_10s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-cybernet-red/25 to-transparent animate-[slideDown_6s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cybernet-red/20 to-transparent animate-[slideDown_9s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
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
            <CardTitle className="text-cybernet-text flex items-center gap-2">
              <FileText className="h-6 w-6 text-cybernet-red" />
              طريقة استخدام الأداة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-cybernet-red font-semibold">خطوات الاستخدام:</h3>
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
                    اعرض النتائج من خلال أزرار العرض
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-cybernet-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    أدخل بريدك الإلكتروني وأرسل التقرير
                  </li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-cybernet-red font-semibold">ميزات الأداة:</h3>
                <ul className="space-y-2 text-cybernet-text-muted">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cybernet-red rounded-full"></div>
                    اكتشاف الأجهزة المتصلة بالشبكة
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cybernet-red rounded-full"></div>
                    فحص الثغرات الأمنية المعروفة
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cybernet-red rounded-full"></div>
                    توليد تقارير مفصلة بصيغة PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cybernet-red rounded-full"></div>
                    إرسال التقارير عبر البريد الإلكتروني
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Controls */}
        <div className="grid gap-6 mb-8">
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
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

          {/* Email Report */}
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Mail className="h-6 w-6 text-cybernet-red" />
                إرسال التقرير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cybernet-bg border-cybernet-red/30 text-cybernet-text"
              />
              <Button onClick={handleSendReport} className="w-full">
                <Mail className="h-5 w-5" />
                أرسل التقرير للبريد
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button 
                variant="cybernetSecondary" 
                onClick={() => setShowDevices(!showDevices)}
                className="w-full h-20 flex flex-col gap-2"
              >
                <Users className="h-8 w-8" />
                <span className="text-sm">عرض الأجهزة المتصلة</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button 
                variant="cybernetSecondary" 
                onClick={() => setShowVulnerabilities(!showVulnerabilities)}
                className="w-full h-20 flex flex-col gap-2"
              >
                <AlertTriangle className="h-8 w-8" />
                <span className="text-sm">عرض نتائج الثغرات</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button variant="cybernetSecondary" className="w-full h-20 flex flex-col gap-2">
                <FileText className="h-8 w-8" />
                <span className="text-sm">توليد تقرير PDF جديد</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <History className="h-6 w-6 text-cybernet-red" />
                إدارة التقارير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="cybernetSecondary" 
                onClick={() => setShowReports(!showReports)}
                className="w-full"
              >
                <History className="h-5 w-5" />
                عرض التقارير السابقة
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Download className="h-5 w-5" />
                تحميل آخر تقرير
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Eye className="h-6 w-6 text-cybernet-red" />
                مراقبة الشبكة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="cybernetSecondary" className="w-full">
                <RefreshCw className="h-5 w-5" />
                فحص سريع
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Shield className="h-5 w-5" />
                مراقبة مستمرة
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Sections */}
        {showDevices && devices.length > 0 && (
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mb-6">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Users className="h-6 w-6 text-cybernet-red" />
                الأجهزة المتصلة ({devices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cybernet-red/20">
                      <th className="text-right p-3 text-cybernet-text">عنوان IP</th>
                      <th className="text-right p-3 text-cybernet-text">MAC Address</th>
                      <th className="text-right p-3 text-cybernet-text">الشركة المصنعة</th>
                      <th className="text-right p-3 text-cybernet-text">نظام التشغيل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device, index) => (
                      <tr key={index} className="border-b border-cybernet-red/10">
                        <td className="p-3 text-cybernet-text font-mono">{device.ip}</td>
                        <td className="p-3 text-cybernet-text font-mono">{device.mac}</td>
                        <td className="p-3 text-cybernet-text">{device.vendor}</td>
                        <td className="p-3">
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

        {showVulnerabilities && vulnerabilities.length > 0 && (
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mb-6">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
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
                        {vuln.cve && (
                          <Badge variant="destructive">{vuln.cve}</Badge>
                        )}
                        <Badge className="bg-cybernet-red/20 text-cybernet-text">
                          Port {vuln.port}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-cybernet-text-muted mb-2">{vuln.description}</p>
                    <details className="text-sm">
                      <summary className="text-cybernet-red cursor-pointer mb-2">التفاصيل التقنية</summary>
                      <div className="bg-cybernet-bg p-3 rounded border-r-4 border-cybernet-red">
                        <p className="mb-2"><strong>التفاصيل:</strong> {vuln.technicalDetails}</p>
                        <p><strong>طريقة الاستغلال:</strong> {vuln.exploitation}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Settings className="h-6 w-6 text-cybernet-red" />
                الإعدادات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="cybernetSecondary" className="w-full bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/50 text-blue-400 hover:text-blue-300">
                  <RefreshCw className="h-5 w-5" />
                  تحديث الأدوات
                </Button>
                <Button variant="cybernetSecondary" className="w-full bg-cybernet-red/20 hover:bg-cybernet-red/30 border-cybernet-red/50 text-cybernet-red hover:text-red-300">
                  <Power className="h-5 w-5" />
                  إعادة تشغيل الجهاز
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CybernetDashboard;