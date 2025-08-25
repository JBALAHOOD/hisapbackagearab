import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'فاحص الأمتعة - تحقق من قوانين الأمتعة لجميع شركات الطيران',
  description = 'فاحص الأمتعة هو أداة مجانية للتحقق من قوانين وأبعاد الأمتعة لأكثر من 100 شركة طيران حول العالم. احصل على معلومات دقيقة حول الأمتعة المحمولة والمسجلة.',
  keywords = 'فاحص الأمتعة, قوانين الأمتعة, شركات الطيران, الأمتعة المحمولة, الأمتعة المسجلة, سفر, طيران',
  image = '/og-image.svg',
  url = 'https://baggage-checker.com',
  type = 'website',
  locale = 'ar_SA'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "فاحص الأمتعة",
    "alternateName": "Baggage Checker",
    "description": description,
    "url": url,
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "فاحص الأمتعة"
    },
    "inLanguage": "ar",
    "audience": {
      "@type": "Audience",
      "audienceType": "Travelers"
    },
    "featureList": [
      "فحص قوانين الأمتعة لأكثر من 100 شركة طيران",
      "معلومات دقيقة حول الأبعاد والأوزان المسموحة",
      "واجهة سهلة الاستخدام باللغة العربية",
      "بحث سريع عن شركات الطيران",
      "معلومات محدثة باستمرار"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="فاحص الأمتعة" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Arabic" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="فاحص الأمتعة" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="فاحص الأمتعة" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="ar" href={url} />
      <link rel="alternate" hrefLang="en" href={`${url}/en`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};

export default SEO;