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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-cybernet-red" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cybernet-red to-cybernet-red/80 bg-clip-text text-transparent">
              CyberNET
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2">لوحة التحكم الأمنية</h2>
          <p className="text-cybernet-text-muted text-lg">
            جهاز ذكي لفحص أمان الشبكات واكتشاف التهديدات تلقائياً
          </p>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="cybernetSecondary" 
            onClick={() => setShowDevices(!showDevices)}
            className="h-16"
          >
            <Users className="h-6 w-6" />
            عرض الأجهزة المتصلة
          </Button>
          
          <Button 
            variant="cybernetSecondary" 
            onClick={() => setShowVulnerabilities(!showVulnerabilities)}
            className="h-16"
          >
            <AlertTriangle className="h-6 w-6" />
            عرض نتائج الثغرات
          </Button>
          
          <Button variant="cybernetSecondary" className="h-16">
            <FileText className="h-6 w-6" />
            توليد تقرير PDF جديد
          </Button>
          
          <Button 
            variant="cybernetSecondary" 
            onClick={() => setShowReports(!showReports)}
            className="h-16"
          >
            <History className="h-6 w-6" />
            عرض التقارير السابقة
          </Button>
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
                <Button variant="cybernetSecondary">
                  <RefreshCw className="h-5 w-5" />
                  تحديث الأدوات
                </Button>
                <Button variant="destructive">
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