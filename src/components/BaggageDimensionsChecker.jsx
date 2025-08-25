import React, { useState } from 'react';
import { Ruler, CheckCircle, XCircle, AlertTriangle, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const BaggageDimensionsChecker = ({ selectedAirline }) => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });
  const [checkResult, setCheckResult] = useState(null);
  const [baggageType, setBaggageType] = useState('carryOn');

  const handleInputChange = (field, value) => {
    setDimensions(prev => ({
      ...prev,
      [field]: value
    }));
    setCheckResult(null);
  };

  const parseDimensions = (dimensionString) => {
    if (!dimensionString) return null;
    
    // Parse dimensions like "55 x 40 x 20 سم" or "55x40x20"
    const matches = dimensionString.match(/(\d+)\s*[x×]\s*(\d+)\s*[x×]\s*(\d+)/i);
    if (matches) {
      return {
        length: parseInt(matches[1]),
        width: parseInt(matches[2]),
        height: parseInt(matches[3])
      };
    }
    return null;
  };

  const parseWeight = (weightString) => {
    if (!weightString) return null;
    
    // Parse weight like "7 كيلو" or "23kg"
    const matches = weightString.match(/(\d+)/);
    if (matches) {
      return parseInt(matches[1]);
    }
    return null;
  };

  const checkDimensions = () => {
    if (!selectedAirline || !dimensions.length || !dimensions.width || !dimensions.height) {
      return;
    }

    const userLength = parseInt(dimensions.length);
    const userWidth = parseInt(dimensions.width);
    const userHeight = parseInt(dimensions.height);
    const userWeight = dimensions.weight ? parseInt(dimensions.weight) : 0;

    let allowedDimensions, allowedWeight;
    
    if (baggageType === 'carryOn') {
      allowedDimensions = parseDimensions(selectedAirline.carry_on_dimensions);
      allowedWeight = parseWeight(selectedAirline.carry_on_weight + ' كيلو');
    } else {
      allowedDimensions = parseDimensions(selectedAirline.checked_dimensions);
      allowedWeight = parseWeight(selectedAirline.checked_weight + ' كيلو');
    }

    if (!allowedDimensions) {
      setCheckResult({
        status: 'error',
        message: 'لا يمكن تحليل أبعاد شركة الطيران'
      });
      return;
    }

    const dimensionsValid = 
      userLength <= allowedDimensions.length &&
      userWidth <= allowedDimensions.width &&
      userHeight <= allowedDimensions.height;

    const weightValid = !userWeight || !allowedWeight || userWeight <= allowedWeight;

    let status, message;
    
    if (dimensionsValid && weightValid) {
      status = 'success';
      message = 'حقيبتك تتوافق مع قوانين شركة الطيران! ✅';
    } else if (!dimensionsValid && !weightValid) {
      status = 'error';
      message = 'حقيبتك تتجاوز الحد المسموح في الأبعاد والوزن ❌';
    } else if (!dimensionsValid) {
      status = 'error';
      message = 'حقيبتك تتجاوز الأبعاد المسموحة ❌';
    } else {
      status = 'error';
      message = 'حقيبتك تتجاوز الوزن المسموح ❌';
    }

    setCheckResult({
      status,
      message,
      details: {
        userDimensions: { length: userLength, width: userWidth, height: userHeight },
        allowedDimensions,
        userWeight,
        allowedWeight,
        dimensionsValid,
        weightValid
      }
    });
  };

  const resetForm = () => {
    setDimensions({
      length: '',
      width: '',
      height: '',
      weight: ''
    });
    setCheckResult(null);
  };

  if (!selectedAirline) {
    return (
      <Card className="mt-6">
        <CardContent className="text-center py-8">
          <Ruler className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">اختر شركة طيران أولاً لفحص أبعاد حقيبتك</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-purple-600" />
          </div>
          فحص أبعاد الحقيبة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Baggage Type Selection */}
        <div className="flex gap-2">
          <Button
            variant={baggageType === 'carryOn' ? 'default' : 'outline'}
            onClick={() => setBaggageType('carryOn')}
            className="flex-1"
          >
            الأمتعة المحمولة
          </Button>
          <Button
            variant={baggageType === 'checked' ? 'default' : 'outline'}
            onClick={() => setBaggageType('checked')}
            className="flex-1"
          >
            الأمتعة المسجلة
          </Button>
        </div>

        {/* Allowed Dimensions Display */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">الحد المسموح لـ {selectedAirline.airline_name}:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">الأبعاد: </span>
              <span className="font-medium">
                {baggageType === 'carryOn' ? selectedAirline.carry_on_dimensions : selectedAirline.checked_dimensions}
              </span>
            </div>
            <div>
              <span className="text-blue-700">الوزن: </span>
              <span className="font-medium">
                {baggageType === 'carryOn' ? selectedAirline.carry_on_weight : selectedAirline.checked_weight} كيلو
              </span>
            </div>
          </div>
        </div>

        {/* Dimensions Input */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">أدخل أبعاد حقيبتك (بالسنتيمتر):</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الطول</label>
              <Input
                type="number"
                placeholder="55"
                value={dimensions.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                className="text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العرض</label>
              <Input
                type="number"
                placeholder="40"
                value={dimensions.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الارتفاع</label>
              <Input
                type="number"
                placeholder="20"
                value={dimensions.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="text-center"
              />
            </div>
          </div>
          
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">الوزن (كيلو) - اختياري</label>
            <Input
              type="number"
              placeholder="7"
              value={dimensions.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="text-center"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={checkDimensions}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            disabled={!dimensions.length || !dimensions.width || !dimensions.height}
          >
            <Ruler className="w-4 h-4 mr-2" />
            فحص الأبعاد
          </Button>
          <Button 
            onClick={resetForm}
            variant="outline"
          >
            إعادة تعيين
          </Button>
        </div>

        {/* Check Result */}
        {checkResult && (
          <div className={`p-4 rounded-lg border ${
            checkResult.status === 'success' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {checkResult.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={`font-medium ${
                checkResult.status === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {checkResult.message}
              </p>
            </div>
            
            {checkResult.details && (
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">أبعاد حقيبتك:</p>
                    <p className="text-gray-600">
                      {checkResult.details.userDimensions.length} × {checkResult.details.userDimensions.width} × {checkResult.details.userDimensions.height} سم
                    </p>
                    {checkResult.details.userWeight > 0 && (
                      <p className="text-gray-600">الوزن: {checkResult.details.userWeight} كيلو</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">الحد المسموح:</p>
                    <p className="text-gray-600">
                      {checkResult.details.allowedDimensions.length} × {checkResult.details.allowedDimensions.width} × {checkResult.details.allowedDimensions.height} سم
                    </p>
                    {checkResult.details.allowedWeight && (
                      <p className="text-gray-600">الوزن: {checkResult.details.allowedWeight} كيلو</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {checkResult.details.dimensionsValid ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={checkResult.details.dimensionsValid ? 'text-green-700' : 'text-red-700'}>
                      الأبعاد
                    </span>
                  </div>
                  {checkResult.details.userWeight > 0 && checkResult.details.allowedWeight && (
                    <div className="flex items-center gap-1">
                      {checkResult.details.weightValid ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={checkResult.details.weightValid ? 'text-green-700' : 'text-red-700'}>
                        الوزن
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">نصائح مهمة:</p>
              <ul className="space-y-1 text-xs">
                <li>• تأكد من قياس الحقيبة بدقة شاملة العجلات والمقابض</li>
                <li>• قد تختلف القوانين حسب نوع التذكرة ووجهة السفر</li>
                <li>• راجع موقع شركة الطيران للحصول على أحدث المعلومات</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaggageDimensionsChecker;