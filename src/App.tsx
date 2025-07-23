import { Toaster } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components";
import { useToast } from "./utils";
import cybernetLogo from "./assets/cybernet-logo.png";

const queryClient = new QueryClient();

// Types
interface Device {
  ip: string;
  mac: string;
  vendor: string;
  os: string;
}

interface Vulnerability {
  name: string;
  cve: string;
  port: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  remediation: string;
}

// Main Dashboard Component
function CybernetDashboard() {
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const mockDevices: Device[] = [
    { ip: "192.168.1.1", mac: "AA:BB:CC:DD:EE:FF", vendor: "TP-Link", os: "Linux" },
    { ip: "192.168.1.10", mac: "11:22:33:44:55:66", vendor: "Samsung", os: "Android" },
    { ip: "192.168.1.15", mac: "FF:EE:DD:CC:BB:AA", vendor: "Apple", os: "iOS" },
    { ip: "192.168.1.20", mac: "99:88:77:66:55:44", vendor: "Dell", os: "Windows" },
  ];

  const mockVulnerabilities: Vulnerability[] = [
    {
      name: "SQL Injection",
      cve: "CVE-2023-1234",
      port: "80",
      description: "ثغرة حقن SQL في تطبيق الويب",
      severity: "Critical",
      remediation: "تحديث النظام وتطبيق الحماية ضد حقن SQL"
    },
    {
      name: "Buffer Overflow",
      cve: "CVE-2023-5678",
      port: "22",
      description: "ثغرة تجاوز المخزن المؤقت في خدمة SSH",
      severity: "High",
      remediation: "تحديث خدمة SSH إلى أحدث إصدار"
    },
    {
      name: "Cross-Site Scripting",
      cve: "CVE-2023-9012",
      port: "443",
      description: "ثغرة XSS في موقع الويب",
      severity: "Medium",
      remediation: "تنظيف وتصفية المدخلات من المستخدمين"
    },
    {
      name: "Weak Password Policy",
      cve: "CVE-2023-3456",
      port: "21",
      description: "سياسة كلمات مرور ضعيفة في خدمة FTP",
      severity: "Low",
      remediation: "تطبيق سياسة كلمات مرور قوية"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      Critical: "destructive",
      High: "destructive", 
      Medium: "default",
      Low: "secondary"
    };
    return <Badge variant={variants[severity as keyof typeof variants] as any}>{severity}</Badge>;
  };

  const handleSecurityScan = async () => {
    setIsScanning(true);
    setDevices([]);
    setVulnerabilities([]);
    setScanCompleted(false);

    await new Promise(resolve => setTimeout(resolve, 3000));

    setDevices(mockDevices);
    setVulnerabilities(mockVulnerabilities);
    setScanCompleted(true);
    setIsScanning(false);

    toast({
      title: "تم الفحص بنجاح",
      description: `تم اكتشاف ${mockDevices.length} أجهزة و ${mockVulnerabilities.length} ثغرات`,
      duration: 2000
    });
  };

  const handleSendReport = () => {
    if (!email.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان البريد الإلكتروني",
        duration: 2000
      });
      return;
    }

    toast({
      title: "تم إرسال التقرير",
      description: `تم إرسال التقرير إلى ${email}`,
      duration: 2000
    });
  };

  const scrollToSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src={cybernetLogo} alt="Cybernet Logo" className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Cybernet Security Scanner
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            أداة فحص الأمان المتقدمة لاكتشاف الثغرات الأمنية في الشبكة
          </p>
        </div>

        {/* Instructions */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">تعليمات الاستخدام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">خطوات الفحص:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>اضغط على زر "بدء فحص الأمان" لبدء عملية الفحص</li>
                  <li>انتظر حتى انتهاء عملية الفحص (حوالي 3 ثوان)</li>
                  <li>سيتم عرض الأجهزة المكتشفة والثغرات الأمنية</li>
                  <li>أدخل بريدك الإلكتروني لإرسال التقرير</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">مستويات الخطورة:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Critical</Badge>
                    <span className="text-gray-300">- خطر بالغ يتطلب إصلاح فوري</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">High</Badge>
                    <span className="text-gray-300">- خطر عالي يتطلب إصلاح سريع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Medium</Badge>
                    <span className="text-gray-300">- خطر متوسط</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Low</Badge>
                    <span className="text-gray-300">- خطر منخفض</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <Button
            onClick={handleSecurityScan}
            disabled={isScanning}
            size="lg"
            className="text-lg px-8 py-3"
          >
            {isScanning ? "جاري الفحص..." : "بدء فحص الأمان"}
          </Button>
          
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white"
            />
            <Button onClick={handleSendReport} variant="secondary" size="lg">
              إرسال التقرير
            </Button>
          </div>
          
          <Button onClick={scrollToSettings} variant="outline" size="lg">
            الإعدادات
          </Button>
        </div>

        {/* Results */}
        {scanCompleted && (
          <div className="space-y-8">
            {/* Devices */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">الأجهزة المكتشفة ({devices.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-300">عنوان IP</TableHead>
                      <TableHead className="text-gray-300">عنوان MAC</TableHead>
                      <TableHead className="text-gray-300">المصنع</TableHead>
                      <TableHead className="text-gray-300">نظام التشغيل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.map((device, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-cyan-400">{device.ip}</TableCell>
                        <TableCell className="font-mono text-gray-300">{device.mac}</TableCell>
                        <TableCell className="text-gray-300">{device.vendor}</TableCell>
                        <TableCell className="text-gray-300">{device.os}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Vulnerabilities */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-red-400">الثغرات الأمنية المكتشفة ({vulnerabilities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vulnerabilities.map((vuln, index) => (
                    <div key={index} className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{vuln.name}</h3>
                        {getSeverityBadge(vuln.severity)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-300"><strong>CVE:</strong> {vuln.cve}</p>
                          <p className="text-gray-300"><strong>المنفذ:</strong> {vuln.port}</p>
                          <p className="text-gray-300"><strong>الوصف:</strong> {vuln.description}</p>
                        </div>
                        <div>
                          <p className="text-gray-300"><strong>الحل المقترح:</strong></p>
                          <p className="text-green-400">{vuln.remediation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <Card className="mt-8 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">الإعدادات المتقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">إعدادات الفحص</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">فحص شامل</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">فحص المنافذ</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">اكتشاف نظام التشغيل</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">إعدادات التقرير</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">تقرير مفصل</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">تضمين الحلول</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">إرسال تلقائي</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400">
          <div className="border-t border-slate-700 pt-8">
            <div className="flex justify-center items-center space-x-8 mb-4">
              <div className="text-sm">
                <p className="font-semibold">فريق التطوير:</p>
                <p>أحمد محمد - مطور رئيسي</p>
                <p>سارة أحمد - متخصص أمان</p>
                <p>محمد علي - مصمم واجهات</p>
              </div>
            </div>
            <p className="text-xs">&copy; 2024 Cybernet Security Scanner. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">الصفحة غير موجودة</p>
        <Button onClick={() => window.location.href = "/"}>العودة للصفحة الرئيسية</Button>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CybernetDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;