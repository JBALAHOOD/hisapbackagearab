import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plane, CheckCircle, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SEO from '../components/SEO';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: CheckCircle,
      title: "دقة عالية",
      description: "معلومات محدثة ودقيقة لجميع شركات الطيران"
    },
    {
      icon: Users,
      title: "سهولة الاستخدام",
      description: "واجهة بسيطة وسهلة للجميع"
    },
    {
      icon: Globe,
      title: "شركات عالمية",
      description: "تغطية شاملة لشركات الطيران المحلية والعالمية"
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to baggage checker with search query
      window.location.href = `/baggage-checker?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative overflow-hidden">
      <SEO 
        title="فاحص الأمتعة - الصفحة الرئيسية | تحقق من قوانين الأمتعة لجميع شركات الطيران"
        description="فاحص الأمتعة هو أداة مجانية شاملة للتحقق من قوانين وأبعاد الأمتعة لأكثر من 100 شركة طيران حول العالم. ابدأ البحث الآن واحصل على معلومات دقيقة حول الأمتعة المحمولة والمسجلة."
        keywords="فاحص الأمتعة, قوانين الأمتعة, شركات الطيران, الأمتعة المحمولة, الأمتعة المسجلة, سفر, طيران, الصفحة الرئيسية"
        url="https://baggage-checker.com/"
      />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-sky-500/5 to-blue-400/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo Animation */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-2xl mb-8 animate-bounce">
              <Plane className="w-10 h-10 text-white" />
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                مدقق الأمتعة
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              تحقق من سياسات الأمتعة لجميع شركات الطيران في ثوانٍ معدودة
            </p>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="ابحث عن شركة الطيران (مثال: الطيران السعودي، Emirates، Turkish Airlines)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-12 pl-6 h-14 text-lg border-0 bg-transparent focus:ring-0 placeholder:text-gray-500 text-right"
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    size="lg" 
                    className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    تحقق الآن
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link to="/baggage-checker">
                <Button variant="outline" className="rounded-full px-6 py-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  فحص الأمتعة
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full px-6 py-2 border-gray-200 text-gray-600 hover:bg-gray-50">
                الشركات الشائعة
              </Button>
              <Button variant="outline" className="rounded-full px-6 py-2 border-gray-200 text-gray-600 hover:bg-gray-50">
                نصائح السفر
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار مدقق الأمتعة؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أدق المعلومات حول سياسات الأمتعة لتسافر بثقة وراحة بال
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow border-0 bg-gradient-to-b from-gray-50 to-white">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Airlines Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              الشركات الأكثر بحثاً
            </h2>
            <p className="text-xl text-gray-600">
              تحقق من سياسات الأمتعة للشركات الأكثر شعبية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "الخطوط السعودية", code: "SV" },
              { name: "طيران الإمارات", code: "EK" },
              { name: "الخطوط القطرية", code: "QR" },
              { name: "طيران ناس", code: "XY" },
              { name: "الاتحاد للطيران", code: "EY" },
              { name: "الخطوط التركية", code: "TK" },
              { name: "مصر للطيران", code: "MS" },
              { name: "الملكية الأردنية", code: "RJ" }
            ].map((airline, index) => (
              <Link 
                key={index}
                to={`/baggage-checker?search=${encodeURIComponent(airline.name)}`}
                className="group"
              >
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-0 bg-white group-hover:bg-blue-50">
                  <CardContent className="p-0 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {airline.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {airline.code}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ابدأ فحص أمتعتك الآن
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            لا تدع الرسوم الإضافية تفسد رحلتك. تحقق من سياسات الأمتعة مسبقاً
          </p>
          <Link to="/baggage-checker">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              ابدأ الفحص المجاني
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;