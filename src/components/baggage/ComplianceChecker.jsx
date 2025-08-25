import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Ruler, Info, Check, X, Sparkles, Calculator, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const commonSizes = [
  { name: "حقيبة شخصية صغيرة", dimensions: { w: 40, h: 30, l: 15 }, unit: 'cm' },
  { name: "حقيبة يد قياسية", dimensions: { w: 55, h: 35, l: 20 }, unit: 'cm' },
  { name: "حقيبة يد دولية", dimensions: { w: 55, h: 40, l: 23 }, unit: 'cm' },
  { name: "الحد الأقصى المحلي (الولايات المتحدة)", dimensions: { w: 22, h: 14, l: 9 }, unit: 'in' },
];

export default function ComplianceChecker({ airline }) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [bagType, setBagType] = useState("carry_on");
  const [result, setResult] = useState(null);

  const setDimensions = (dims, newUnit) => {
    setLength(dims.l);
    setWidth(dims.w);
    setHeight(dims.h);
    setUnit(newUnit);
  };

  const handleCheck = () => {
    if (!length || !width || !height) {
      setResult({ status: "error", message: "الرجاء إدخال جميع الأبعاد." });
      return;
    }

    let airlineLimitsStr = bagType === 'carry_on' 
      ? airline.carry_on_dimensions 
      : airline.personal_item_dimensions;

    if (!airlineLimitsStr) {
      setResult({ status: "error", message: "لا توجد معلومات أبعاد متاحة لهذا النوع من الحقائب لهذه الشركة." });
      return;
    }

    const airlineLimits = airlineLimitsStr.split('×').map(d => parseFloat(d.trim())).sort((a, b) => b - a);
    
    let userLength = parseFloat(length);
    let userWidth = parseFloat(width);
    let userHeight = parseFloat(height);

    if (unit === 'in') {
      userLength *= 2.54;
      userWidth *= 2.54;
      userHeight *= 2.54;
    }

    const userDims = [userLength, userWidth, userHeight].sort((a, b) => b - a);

    // حساب النسب المئوية لكل بعد
    const percentages = userDims.map((userDim, index) => {
      return Math.min(100, (userDim / airlineLimits[index]) * 100);
    });

    // حساب النتيجة الإجمالية
    const overallScore = Math.round(Math.min(...percentages));
    
    // حساب الحجم الإجمالي
    const userVolume = userDims[0] * userDims[1] * userDims[2];
    const allowedVolume = airlineLimits[0] * airlineLimits[1] * airlineLimits[2];
    const volumePercentage = Math.round((userVolume / allowedVolume) * 100);

    // تحديد المطابقة
    const isCompliant = overallScore <= 100;
    
    // تحديد الفئة
    let category = "";
    let categoryColor = "";
    if (overallScore <= 80) {
      category = "مثالي";
      categoryColor = "bg-green-100 text-green-800 border-green-200";
    } else if (overallScore <= 95) {
      category = "جيد";
      categoryColor = "bg-blue-100 text-blue-800 border-blue-200";
    } else if (overallScore <= 100) {
      category = "مقبول";
      categoryColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      category = "غير مطابق";
      categoryColor = "bg-red-100 text-red-800 border-red-200";
    }

    setResult({
      status: isCompliant ? "success" : "failure",
      score: overallScore,
      category: category,
      categoryColor: categoryColor,
      volumePercentage: volumePercentage,
      percentages: percentages,
      userDims: userDims,
      allowedDims: airlineLimits,
      details: {
        length: { user: userDims[0], allowed: airlineLimits[0], percentage: percentages[0] },
        width: { user: userDims[1], allowed: airlineLimits[1], percentage: percentages[1] },
        height: { user: userDims[2], allowed: airlineLimits[2], percentage: percentages[2] }
      }
    });
  };

  return (
    <Card className="glass-effect border-0 shadow-lg hover-lift slide-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Ruler className="w-5 h-5" />
          أدخل أبعاد حقيبتك
        </CardTitle>
        <CardDescription>
          أدخل جميع أجزاء حقيبتك (العجلات، المقابض، الجيوب، إلخ) في القياسات للحصول على نتائج دقيقة.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="length">الطول</Label>
            <Input 
              id="length" 
              type="number" 
              placeholder={`الطول (${unit})`} 
              value={length} 
              onChange={e => setLength(e.target.value)} 
            />
            <p className="text-xs text-gray-500 mt-1">أدخل طول حقيبتك، شاملاً المقابض والعجلات</p>
          </div>
          <div>
            <Label htmlFor="width">العرض</Label>
            <Input 
              id="width" 
              type="number" 
              placeholder={`العرض (${unit})`} 
              value={width} 
              onChange={e => setWidth(e.target.value)} 
            />
            <p className="text-xs text-gray-500 mt-1">أدخل عرض حقيبتك، شاملاً الجيوب الجانبية</p>
          </div>
          <div>
            <Label htmlFor="height">الارتفاع</Label>
            <Input 
              id="height" 
              type="number" 
              placeholder={`الارتفاع (${unit})`} 
              value={height} 
              onChange={e => setHeight(e.target.value)} 
            />
            <p className="text-xs text-gray-500 mt-1">أدخل ارتفاع حقيبتك، شاملاً العجلات</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Label className="mb-2 block">اختر الوحدة</Label>
              <Tabs defaultValue="cm" value={unit} onValueChange={setUnit} dir="ltr">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cm">سنتيمتر</TabsTrigger>
                    <TabsTrigger value="in">بوصة</TabsTrigger>
                  </TabsList>
              </Tabs>
            </div>
            <div>
              <Label className="mb-2 block">اختر نوع الحقيبة</Label>
              <RadioGroup defaultValue="carry_on" value={bagType} onValueChange={setBagType} className="flex gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="carry_on" id="r1" />
                  <Label htmlFor="r1">حقيبة مقصورة</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="personal_item" id="r2" />
                  <Label htmlFor="r2">حقيبة شخصية</Label>
                </div>
              </RadioGroup>
            </div>
        </div>
        
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center text-sm text-gray-600 bg-blue-50/50 p-3 rounded-lg">
                        <Info className="w-4 h-4 ml-2 text-blue-500"/>
                        <span>نصيحة: الترتيب غير مهم، فنحن نتحقق من جميع الاتجاهات المحتملة.</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>نقارن أكبر بعد في حقيبتك بأكبر بعد مسموح به، وهكذا.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <Button onClick={handleCheck} className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg hover-lift">
          التحقق من المطابقة
        </Button>
        
        {result && result.status !== 'error' && (
          <div className="space-y-4">
            {/* النتيجة الرئيسية */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">{result.score}%</h3>
                  <Badge className={result.categoryColor}>
                    {result.category}
                  </Badge>
                </div>
              </div>
              
              <Progress 
                value={result.score} 
                className="h-3 mb-2" 
              />
              
              <p className="text-sm text-gray-600">
                {result.status === 'success' 
                  ? `حقيبتك تستخدم ${result.score}% من الحد المسموح به` 
                  : `حقيبتك تتجاوز الحد المسموح بـ ${result.score - 100}%`
                }
              </p>
            </div>

            {/* تفاصيل الأبعاد */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">الطول</span>
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round(result.details.length.percentage)}%
                  </span>
                </div>
                <Progress value={result.details.length.percentage} className="h-2 mb-2" />
                <div className="text-xs text-gray-500">
                  {result.details.length.user.toFixed(1)} / {result.details.length.allowed} سم
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">العرض</span>
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round(result.details.width.percentage)}%
                  </span>
                </div>
                <Progress value={result.details.width.percentage} className="h-2 mb-2" />
                <div className="text-xs text-gray-500">
                  {result.details.width.user.toFixed(1)} / {result.details.width.allowed} سم
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">الارتفاع</span>
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round(result.details.height.percentage)}%
                  </span>
                </div>
                <Progress value={result.details.height.percentage} className="h-2 mb-2" />
                <div className="text-xs text-gray-500">
                  {result.details.height.user.toFixed(1)} / {result.details.height.allowed} سم
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-900">تحليل الحجم الإجمالي</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">حجم حقيبتك:</span>
                  <span className="font-bold text-gray-900 mr-2">
                    {Math.round(result.userDims[0] * result.userDims[1] * result.userDims[2] / 1000)} لتر
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">نسبة الحجم:</span>
                  <span className="font-bold text-gray-900 mr-2">
                    {result.volumePercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* رسالة النتيجة */}
            <Alert variant={result.status === 'success' ? 'default' : 'destructive'} 
                   className={`${result.status === 'success' ? 'bg-green-50 border-green-200' : ''}`}>
              {result.status === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              <AlertTitle className="font-bold">
                {result.status === 'success' ? 'متوافق مع السياسة' : 'غير متوافق مع السياسة'}
              </AlertTitle>
              <AlertDescription>
                {result.status === 'success' 
                  ? `حقيبتك تتوافق مع سياسة ${airline.airline_name}. يمكنك السفر بها دون مشاكل.`
                  : `حقيبتك تتجاوز الحدود المسموح بها لدى ${airline.airline_name}. قد تحتاج لدفع رسوم إضافية أو استخدام حقيبة أصغر.`
                }
              </AlertDescription>
            </Alert>
          </div>
        )}

        {result && result.status === 'error' && (
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500"/> 
              أحجام الحقائب الشائعة:
            </h4>
            <div className="flex flex-wrap gap-2">
                {commonSizes.map(size => (
                    <Button key={size.name} variant="outline" size="sm" onClick={() => setDimensions(size.dimensions, size.unit)}>
                        {size.name}
                    </Button>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}