import React, { useState } from 'react';
import * as ToastPrimitives from "@radix-ui/react-toast"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils"
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
  Power,
  X
} from 'lucide-react';

// Toast functionality
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 2000

type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Auto dismiss after duration
  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      dismiss()
    }, props.duration)
  }

  return {
    id: id,
    dismiss,
    update,
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cybernet: "bg-gradient-to-r from-cybernet-red to-cybernet-red/90 text-white hover:from-cybernet-red/90 hover:to-cybernet-red/80 shadow-[var(--shadow-button)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] rounded-xl",
        cybernetSecondary: "bg-cybernet-surface text-cybernet-text border border-cybernet-red/20 hover:bg-cybernet-red/10 hover:border-cybernet-red/40 rounded-xl",
        cybernetGhost: "text-cybernet-text hover:bg-cybernet-surface/50 rounded-xl",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "cybernet",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// Card components
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

// Input component
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Badge component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Toast components
const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))

const ToastComponent = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        className
      )}
      {...props}
    />
  )
})

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <ToastComponent key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </ToastComponent>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

// Interface definitions
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
  prevention: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

// Main Dashboard Component
export const CybernetDashboard = () => {
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
        description: `تم اكتشاف ${mockDevices.length} أجهزة و ${mockVulnerabilities.length} ثغرات أمنية`,
        className: "bg-green-600/20 border-green-600/50 text-green-400",
        duration: 2000,
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

        {/* Instructions and Severity Levels Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* How to Use Tool - Left Side */}
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                <FileText className="h-6 w-6 text-cybernet-red" />
                طريقة استخدام الأداة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Vulnerability Severity Levels - Right Side */}
          <Card className="bg-cybernet-surface border-cybernet-red/20 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-cybernet-text flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-cybernet-red" />
                مستويات خطورة الثغرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

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
              <Button variant="cybernetSecondary" className="h-12 text-sm">
                <History className="h-4 w-4" />
                التقارير السابقة
              </Button>
              <Button variant="cybernetSecondary" className="h-12 text-sm bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/50 text-blue-400 hover:text-blue-300">
                <FileText className="h-4 w-4" />
                توليد تقرير
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
                    <Shield className="h-6 w-6 text-cybernet-red" />
                    الثغرات المكتشفة ({vulnerabilities.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {vulnerabilities.map((vuln, index) => (
                      <Card key={index} className="bg-cybernet-bg border-cybernet-red/10">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-cybernet-text">{vuln.name}</CardTitle>
                              {vuln.cve && (
                                <p className="text-sm text-cybernet-text-muted mt-1">{vuln.cve}</p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                              {getSeverityBadge(vuln.severity)}
                              <Badge variant="outline" className="text-xs">
                                Port {vuln.port}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-cybernet-text mb-2">الوصف:</h4>
                              <p className="text-cybernet-text-muted">{vuln.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-cybernet-text mb-2">التفاصيل التقنية:</h4>
                              <p className="text-cybernet-text-muted">{vuln.technicalDetails}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-cybernet-text mb-2">طريقة الاستغلال:</h4>
                              <p className="text-cybernet-text-muted">{vuln.exploitation}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-cybernet-text mb-2">الحماية:</h4>
                              <p className="text-cybernet-text-muted">{vuln.prevention}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};