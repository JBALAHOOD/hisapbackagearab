import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plane, Package, Weight, Ruler, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { searchAirlines, getAirlineById } from '../data/airlines';
import { debounce } from '../utils';
import SEO from '../components/SEO';
import BaggageDimensionsChecker from '../components/BaggageDimensionsChecker';

const BaggageChecker = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      handleSearch(searchParam);
    }
  }, [location.search]);

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    if (query.trim()) {
      handleSearch(query);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, 300);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchAirlines(query);
      setSearchResults(results);
      setShowResults(true);
      setSelectedAirline(null);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAirlineSelect = async (airlineId) => {
    try {
      const airline = await getAirlineById(airlineId);
      setSelectedAirline(airline);
      setShowResults(false);
    } catch (error) {
      console.error('Error fetching airline details:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const BaggageCard = ({ title, icon: Icon, data, type }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.dimensions && (
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">الأبعاد:</span>
            <span className="font-medium">{data.dimensions}</span>
          </div>
        )}
        {data.weight && (
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">الوزن:</span>
            <span className="font-medium">{data.weight}</span>
          </div>
        )}
        {data.notes && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">{data.notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="فاحص الأمتعة | تحقق من قوانين الأمتعة لأكثر من 100 شركة طيران"
        description="ابحث عن شركة الطيران واحصل على معلومات مفصلة حول قوانين الأمتعة المحمولة والمسجلة. أبعاد وأوزان مسموحة محدثة لأكثر من 100 شركة طيران عالمية."
        keywords="فاحص الأمتعة, بحث شركات الطيران, قوانين الأمتعة, الأمتعة المحمولة, الأمتعة المسجلة, أبعاد الأمتعة, أوزان الأمتعة"
        url="https://baggage-checker.com/baggage-checker"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl shadow-lg mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            فحص سياسات الأمتعة
          </h1>
          <p className="text-lg text-gray-600">
            ابحث عن شركة الطيران واطلع على تفاصيل سياسات الأمتعة
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن شركة الطيران (مثال: الطيران السعودي، Emirates)"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="pr-10 h-12 text-right"
                />
              </div>
              <Button 
                onClick={() => handleSearch()}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
                disabled={isLoading}
              >
                {isLoading ? 'جاري البحث...' : 'بحث'}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              نتائج البحث ({searchResults.length})
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((airline) => (
                  <Card 
                    key={airline.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-0 bg-white hover:bg-blue-50"
                    onClick={() => handleAirlineSelect(airline.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {airline.airline_name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {airline.airline_name_english}
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            {airline.airline_code}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-8">
                <CardContent>
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لم يتم العثور على نتائج
                  </h3>
                  <p className="text-gray-600">
                    جرب البحث بكلمات مختلفة أو تأكد من صحة اسم شركة الطيران
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Selected Airline Details */}
        {selectedAirline && (
          <div className="max-w-6xl mx-auto">
            {/* Airline Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedAirline.airline_name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedAirline.airline_name_english}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    رمز الشركة: {selectedAirline.airline_code}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">معلومات محدثة ومؤكدة</span>
              </div>
            </div>

            {/* Baggage Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <BaggageCard
                title="الأمتعة المحمولة"
                icon={Package}
                data={{
                  dimensions: selectedAirline.carry_on_dimensions,
                  weight: selectedAirline.carry_on_weight + ' كيلو',
                  notes: 'يُسمح بحقيبة يد واحدة'
                }}
                type="carryOn"
              />
              <BaggageCard
                title="الأمتعة المسجلة"
                icon={Weight}
                data={{
                  dimensions: selectedAirline.checked_dimensions,
                  weight: selectedAirline.checked_weight + ' كيلو',
                  notes: selectedAirline.additional_info
                }}
                type="checked"
              />
            </div>

            {/* Baggage Dimensions Checker */}
            <BaggageDimensionsChecker selectedAirline={selectedAirline} />

            {/* Additional Information */}
            {selectedAirline.additional_info && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    معلومات إضافية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800">{selectedAirline.additional_info}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Button 
                onClick={() => {
                  setSelectedAirline(null);
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowResults(false);
                }}
                variant="outline"
                className="px-6"
              >
                بحث عن شركة أخرى
              </Button>
              <Button 
                onClick={() => window.print()}
                className="px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                طباعة المعلومات
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && !selectedAirline && !searchQuery && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                ابدأ بالبحث عن شركة الطيران
              </h3>
              <p className="text-gray-600 mb-6">
                أدخل اسم شركة الطيران في مربع البحث أعلاه للحصول على معلومات مفصلة حول سياسات الأمتعة
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-blue-900">الأمتعة المحمولة</p>
                  <p className="text-blue-700">الأبعاد والوزن المسموح</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Weight className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-900">الأمتعة المسجلة</p>
                  <p className="text-green-700">حدود الوزن والرسوم</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaggageChecker;