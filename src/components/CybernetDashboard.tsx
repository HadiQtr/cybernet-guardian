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

  return (
    <div className="min-h-screen bg-cybernet-bg text-cybernet-text p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/lovable-uploads/f4abe8d3-1647-4a63-9c36-7c8a1d224a5c.png" 
              alt="Secu-PI Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-cybernet-red">منصة الأمان الذكية للشركات</h2>
          <p className="text-cybernet-text-muted text-lg max-w-3xl mx-auto leading-relaxed">
            حلول أمنية متطورة لاختبار الاختراق وتحليل الشبكات المؤسسية - اكتشف الثغرات قبل المخترقين
          </p>
        </div>

        {/* Enterprise Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-cybernet-surface to-cybernet-surface/80 border-cybernet-red/30 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-cybernet-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-cybernet-text mb-2">اختبار الاختراق</h3>
              <p className="text-cybernet-text-muted">فحص شامل للثغرات الأمنية وتقييم مستوى الحماية</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-cybernet-surface to-cybernet-surface/80 border-cybernet-red/30 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-cybernet-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-cybernet-text mb-2">مراقبة الشبكة</h3>
              <p className="text-cybernet-text-muted">رصد مستمر للأجهزة والاتصالات المشبوهة</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-cybernet-surface to-cybernet-surface/80 border-cybernet-red/30 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-cybernet-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-cybernet-text mb-2">تقارير تفصيلية</h3>
              <p className="text-cybernet-text-muted">تحليلات مفصلة وتوصيات لتحسين الأمان</p>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Section */}
        <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mb-8">
          <CardHeader>
            <CardTitle className="text-cybernet-text flex items-center gap-2">
              <Play className="h-6 w-6 text-cybernet-red" />
              دليل الاستخدام للشركات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-cybernet-red font-semibold text-lg">خطوات التقييم الأمني:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-cybernet-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h4 className="text-cybernet-text font-medium">فحص البنية التحتية</h4>
                      <p className="text-cybernet-text-muted text-sm">اكتشاف جميع الأجهزة والخدمات المتصلة</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-cybernet-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h4 className="text-cybernet-text font-medium">تحليل الثغرات</h4>
                      <p className="text-cybernet-text-muted text-sm">فحص متقدم للثغرات المعروفة وغير المعروفة</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-cybernet-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h4 className="text-cybernet-text font-medium">تقييم المخاطر</h4>
                      <p className="text-cybernet-text-muted text-sm">تصنيف التهديدات حسب الأولوية والخطورة</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-cybernet-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
                    <div>
                      <h4 className="text-cybernet-text font-medium">التوثيق والتقارير</h4>
                      <p className="text-cybernet-text-muted text-sm">تقارير شاملة مع خطة المعالجة</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-cybernet-red font-semibold text-lg">المزايا المتقدمة:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">فحص الثغرات Zero-Day</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">محاكاة هجمات APT متقدمة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">تحليل حركة البيانات المشفرة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">اختبار هندسة اجتماعية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">فحص تطبيقات الويب والAPI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">تقييم أمان Active Directory</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">مراقبة السلوك الشاذ للموظفين</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cybernet-red rounded-full"></div>
                    <span className="text-cybernet-text-muted">تقارير GDPR و ISO 27001</span>
                  </div>
                </div>
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
                فحص شامل للمؤسسة
              </CardTitle>
              <CardDescription className="text-cybernet-text-muted">
                تقييم أمني متكامل للبنية التحتية والتطبيقات والشبكات المؤسسية
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
                    جاري الفحص الأمني المتقدم...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    ابدأ التقييم الأمني الشامل
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Executive Report */}
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Mail className="h-6 w-6 text-cybernet-red" />
                تقرير تنفيذي للإدارة
              </CardTitle>
              <CardDescription className="text-cybernet-text-muted">
                إرسال تقرير مفصل للإدارة العليا مع تقييم المخاطر والتوصيات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="البريد الإلكتروني للإدارة التنفيذية"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cybernet-bg border-cybernet-red/30 text-cybernet-text"
              />
              <Button onClick={handleSendReport} className="w-full">
                <Mail className="h-5 w-5" />
                إرسال التقرير التنفيذي
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Security Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button 
                variant="cybernetSecondary" 
                onClick={() => setShowDevices(!showDevices)}
                className="w-full h-20 flex flex-col gap-2"
              >
                <Users className="h-8 w-8" />
                <span className="text-sm">بيانات الشبكة والأجهزة</span>
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
                <span className="text-sm">تحليل التهديدات</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button variant="cybernetSecondary" className="w-full h-20 flex flex-col gap-2">
                <FileText className="h-8 w-8" />
                <span className="text-sm">تقرير الامتثال</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <CardContent className="p-6">
              <Button variant="cybernetSecondary" className="w-full h-20 flex flex-col gap-2">
                <Shield className="h-8 w-8" />
                <span className="text-sm">خطة المعالجة</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Enterprise Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <History className="h-6 w-6 text-cybernet-red" />
                إدارة التقارير والسجلات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="cybernetSecondary" 
                onClick={() => setShowReports(!showReports)}
                className="w-full"
              >
                <History className="h-5 w-5" />
                أرشيف التقارير
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Download className="h-5 w-5" />
                تصدير البيانات
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <FileText className="h-5 w-5" />
                تقرير الامتثال
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Eye className="h-6 w-6 text-cybernet-red" />
                مراقبة وتحليل متقدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="cybernetSecondary" className="w-full">
                <RefreshCw className="h-5 w-5" />
                مراقبة فورية
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Shield className="h-5 w-5" />
                فحص السلوك الشاذ
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <AlertTriangle className="h-5 w-5" />
                إنذار التهديدات
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Settings className="h-6 w-6 text-cybernet-red" />
                أدوات المؤسسة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="cybernetSecondary" className="w-full">
                <Users className="h-5 w-5" />
                إدارة الفرق
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Mail className="h-5 w-5" />
                إشعارات تلقائية
              </Button>
              <Button variant="cybernetSecondary" className="w-full">
                <Shield className="h-5 w-5" />
                سياسات الأمان
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
            onClick={() => setShowSettings(!showSettings)}
            size="lg"
          >
            <Settings className="h-5 w-5" />
            إعدادات متقدمة
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)] mt-6">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center gap-2">
                <Settings className="h-6 w-6 text-cybernet-red" />
                الإعدادات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="cybernetSecondary" className="w-full">
                  <RefreshCw className="h-5 w-5" />
                  تحديث الأدوات
                </Button>
                <Button variant="cybernetSecondary" className="w-full bg-cybernet-red/20 hover:bg-cybernet-red/30 border-cybernet-red/50">
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