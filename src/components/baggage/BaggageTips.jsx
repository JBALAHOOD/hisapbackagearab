import React from "react";
import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BaggageTips() {
  const tips = [
    {
      icon: CheckCircle,
      title: "قِس أمتعتك مسبقاً",
      description: "تأكد من قياس حقيبتك بالمسطرة قبل التوجه للمطار",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: AlertTriangle,
      title: "انتبه للوزن الإضافي",
      description: "الأوزان الزائدة قد تكلفك رسوماً باهظة في المطار",
      color: "text-amber-600 bg-amber-100"
    },
    {
      icon: Lightbulb,
      title: "احزم بذكاء",
      description: "ضع الأشياء الثقيلة في الأمتعة المسجلة والخفيفة في المحمولة",
      color: "text-blue-600 bg-blue-100"
    }
  ];

  return (
    <Card className="glass-effect border-0 shadow-lg hover-lift slide-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Lightbulb className="w-5 h-5" />
          نصائح مهمة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tip.color}`}>
              <tip.icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{tip.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}