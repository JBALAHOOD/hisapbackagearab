import React from 'react';
import { ExternalLink, TrendingUp, Users, Globe, Search, Share2, Target, BarChart3, Megaphone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const Marketing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="استراتيجيات التسويق | فاحص الأمتعة - خطة شاملة للنمو والوصول"
        description="اكتشف استراتيجيات التسويق الشاملة لموقع فاحص الأمتعة. خطة مدروسة تشمل SEO، التسويق بالمحتوى، وسائل التواصل الاجتماعي، والشراكات الاستراتيجية لزيادة عدد المستخدمين."
        keywords="استراتيجيات التسويق, تسويق المواقع, SEO, التسويق بالمحتوى, وسائل التواصل الاجتماعي, الشراكات الاستراتيجية, تسويق السفر"
        url="https://baggage-checker.com/marketing"
      />
      <MarketingContent />
    </div>
  );
};

const MarketingContent = () => {
  const marketingStrategies = [
    {
      id: 1,
      title: "بناء الروابط الخلفية",
      description: "إنشاء روابط عالية الجودة من مواقع موثوقة لتحسين ترتيب الموقع في محركات البحث",
      icon: ExternalLink,
      color: "blue",
      actions: [
        "التواصل مع مواقع السفر والطيران",
        "كتابة مقالات ضيف في المدونات المتخصصة",
        "المشاركة في منتديات السفر",
        "إنشاء محتوى قابل للمشاركة"
      ],
      metrics: "زيادة 40% في الترافيك العضوي"
    },
    {
      id: 2,
      title: "تسويق المحتوى",
      description: "إنشاء محتوى قيم ومفيد يجذب الجمهور المستهدف ويبني الثقة في العلامة التجارية",
      icon: TrendingUp,
      color: "green",
      actions: [
        "كتابة أدلة شاملة عن سياسات الأمتعة",
        "إنشاء مقاطع فيديو تعليمية",
        "تطوير انفوجرافيك مفيد",
        "نشر نصائح السفر الأسبوعية"
      ],
      metrics: "زيادة 60% في المشاركة"
    },
    {
      id: 3,
      title: "وسائل التواصل الاجتماعي",
      description: "بناء حضور قوي على منصات التواصل الاجتماعي للوصول إلى جمهور أوسع",
      icon: Share2,
      color: "purple",
      actions: [
        "إنشاء حسابات على تويتر وإنستغرام",
        "مشاركة نصائح السفر اليومية",
        "التفاعل مع المسافرين والمؤثرين",
        "إنشاء هاشتاجات مخصصة"
      ],
      metrics: "50,000 متابع في 6 أشهر"
    },
    {
      id: 4,
      title: "تحسين محركات البحث (SEO)",
      description: "تحسين الموقع ليظهر في النتائج الأولى عند البحث عن معلومات الأمتعة",
      icon: Search,
      color: "orange",
      actions: [
        "البحث عن الكلمات المفتاحية المناسبة",
        "تحسين سرعة تحميل الموقع",
        "إنشاء صفحات مخصصة لكل شركة طيران",
        "تحسين تجربة المستخدم على الهاتف"
      ],
      metrics: "ترتيب في الصفحة الأولى"
    },
    {
      id: 5,
      title: "الشراكات الاستراتيجية",
      description: "بناء شراكات مع شركات السفر ووكالات الطيران لتوسيع نطاق الوصول",
      icon: Users,
      color: "teal",
      actions: [
        "التعاون مع وكالات السفر",
        "الشراكة مع تطبيقات السفر",
        "التعاون مع المؤثرين في مجال السفر",
        "إنشاء برنامج إحالة"
      ],
      metrics: "20 شراكة استراتيجية"
    },
    {
      id: 6,
      title: "الإعلانات المدفوعة",
      description: "استخدام الإعلانات المستهدفة للوصول السريع إلى الجمهور المهتم",
      icon: Target,
      color: "red",
      actions: [
        "إعلانات جوجل للكلمات المفتاحية",
        "إعلانات فيسبوك وإنستغرام",
        "إعلانات يوتيوب للمحتوى المرئي",
        "ريتارجتنج للزوار السابقين"
      ],
      metrics: "ROI 300% على الإعلانات"
    },
    {
      id: 7,
      title: "التسويق عبر البريد الإلكتروني",
      description: "بناء قائمة بريدية وإرسال محتوى قيم للمشتركين بانتظام",
      icon: Mail,
      color: "indigo",
      actions: [
        "إنشاء نشرة إخبارية أسبوعية",
        "إرسال تحديثات سياسات الطيران",
        "تقديم نصائح حصرية للمشتركين",
        "حملات ترحيبية للمشتركين الجدد"
      ],
      metrics: "معدل فتح 25%"
    },
    {
      id: 8,
      title: "تحليل البيانات والتحسين",
      description: "مراقبة الأداء وتحليل البيانات لتحسين الاستراتيجيات التسويقية باستمرار",
      icon: BarChart3,
      color: "gray",
      actions: [
        "تتبع زيارات الموقع وسلوك المستخدمين",
        "تحليل أداء الحملات التسويقية",
        "اختبار A/B للصفحات والإعلانات",
        "تقارير شهرية مفصلة"
      ],
      metrics: "تحسين 35% في التحويلات"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        gradient: 'from-green-500 to-green-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-500 to-purple-600'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        gradient: 'from-orange-500 to-orange-600'
      },
      teal: {
        bg: 'bg-teal-100',
        text: 'text-teal-600',
        border: 'border-teal-200',
        gradient: 'from-teal-500 to-teal-600'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        border: 'border-red-200',
        gradient: 'from-red-500 to-red-600'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        gradient: 'from-indigo-500 to-indigo-600'
      },
      gray: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-200',
        gradient: 'from-gray-500 to-gray-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6">
            <Megaphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            استراتيجيات التسويق
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            خطة شاملة لتسويق موقع مدقق الأمتعة وزيادة عدد المستخدمين والوصول إلى جمهور أوسع
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
              <div className="text-sm text-gray-600">استراتيجيات رئيسية</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-green-600 mb-1">6</div>
              <div className="text-sm text-gray-600">أشهر للتنفيذ</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-purple-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600">مستخدم مستهدف</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-orange-600 mb-1">300%</div>
              <div className="text-sm text-gray-600">عائد متوقع</div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Strategies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {marketingStrategies.map((strategy) => {
            const IconComponent = strategy.icon;
            const colorClasses = getColorClasses(strategy.color);
            
            return (
              <Card key={strategy.id} className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">
                        {strategy.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">الإجراءات المطلوبة:</h4>
                      <ul className="space-y-2">
                        {strategy.actions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 ${colorClasses.bg} rounded-full mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-3`}>
                      <div className="flex items-center gap-2">
                        <BarChart3 className={`w-4 h-4 ${colorClasses.text}`} />
                        <span className="text-sm font-medium text-gray-900">الهدف المتوقع:</span>
                      </div>
                      <p className={`text-sm ${colorClasses.text} font-medium mt-1`}>
                        {strategy.metrics}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Implementation Timeline */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">الجدول الزمني للتنفيذ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1-2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">الشهر الأول والثاني</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• تحسين محركات البحث</li>
                  <li>• إنشاء المحتوى الأساسي</li>
                  <li>• إطلاق وسائل التواصل</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3-4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">الشهر الثالث والرابع</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• بناء الروابط الخلفية</li>
                  <li>• الشراكات الاستراتيجية</li>
                  <li>• الإعلانات المدفوعة</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">5-6</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">الشهر الخامس والسادس</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• التسويق عبر البريد</li>
                  <li>• تحليل وتحسين الأداء</li>
                  <li>• توسيع النطاق</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-8">
              <Globe className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">
                ابدأ رحلة النجاح التسويقي
              </h2>
              <p className="text-xl mb-6 opacity-90">
                مع هذه الاستراتيجيات المدروسة، ستصل إلى آلاف المسافرين وتصبح المرجع الأول لمعلومات الأمتعة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8"
                >
                  ابدأ التنفيذ الآن
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8"
                >
                  تحميل الخطة كاملة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Marketing;