import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Search, ShoppingBag, Megaphone } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Set document language and direction for Arabic
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.title = 'مدقق الأمتعة | تحقق من سياسات أمتعة الطيران';

    // Remove old meta tags to prevent duplicates
    const existingDescription = document.querySelector('meta[name="description"]');
    const existingKeywords = document.querySelector('meta[name="keywords"]');
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    
    if (existingDescription) existingDescription.remove();
    if (existingKeywords) existingKeywords.remove();
    if (existingSchema) existingSchema.remove();

    // Add meta description
    const description = document.createElement('meta');
    description.name = 'description';
    description.content = 'مدقق الأمتعة هو أداة مجانية للتحقق من سياسات أبعاد ووزن الحقائب المحمولة والمسجلة لجميع شركات الطيران. سافر بثقة وتجنب الرسوم الإضافية في المطار.';
    document.head.appendChild(description);

    // Add meta keywords
    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = 'مدقق الأمتعة, سياسات الطيران, حجم الحقيبة, وزن الحقيبة, أمتعة الطائرة, حقيبة يد, أمتعة مسجلة, الخطوط السعودية, طيران الإمارات, طيران ناس, فحص الامتعة, سياسة الحقائب';
    document.head.appendChild(keywords);

    // Add structured data
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "مدقق الأمتعة",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/baggage-checker?airline={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(schema);

    // Cleanup function
    return () => {
      if (description.parentNode) description.remove();
      if (keywords.parentNode) keywords.remove();
      if (schema.parentNode) schema.remove();
    };
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                مدقق الأمتعة
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Search className="w-4 h-4" />
                الرئيسية
              </Link>
              
              <Link 
                to="/baggage-checker" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/baggage-checker') 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                فحص الأمتعة
              </Link>
              
              <Link 
                to="/marketing" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/marketing') 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                التسويق
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">مدقق الأمتعة</span>
            </div>
            <p className="text-gray-600 mb-4">
              أداة مجانية للتحقق من سياسات أمتعة شركات الطيران
            </p>
            <p className="text-sm text-gray-500">
              © 2024 مدقق الأمتعة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;