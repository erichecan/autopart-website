import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';

const ContactPage = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('phone'),
      details: [
        { label: 'Sales Hotline', value: '+86 138 0013 8000' },
        { label: 'WhatsApp/WeChat', value: '+86 138 0013 8000' }
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('email'),
      details: [
        { label: 'Sales Department', value: 'sales@autoparts.com' },
        { label: 'Support', value: 'support@autoparts.com' }
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('address'),
      details: [
        { label: 'Factory Address', value: 'Guangzhou Auto Parts Industrial Park' },
        { label: 'City', value: 'Guangzhou, Guangdong, China' }
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: [
        { label: 'Monday - Friday', value: '8:00 AM - 6:00 PM (CST)' },
        { label: 'Saturday', value: '9:00 AM - 5:00 PM (CST)' }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Get Product Quote',
      description: 'Request detailed pricing for specific automotive parts',
      action: 'Request Quote',
      onClick: () => setCurrentPage('quote'),
      icon: <Send className="w-6 h-6" />,
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'Technical Support',
      description: 'Get help with product specifications and compatibility',
      action: 'Contact Support',
      onClick: () => window.open('mailto:support@autoparts.com'),
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-secondary-500 hover:bg-secondary-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contactTitle')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('contactDescription')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg text-white ${action.color.split(' ')[0]}`}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <button
                    onClick={action.onClick}
                    className={`text-white px-6 py-2 rounded-lg font-medium transition-colors ${action.color}`}
                  >
                    {action.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('contactInfo')}
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-2">
                        {info.details.map((detail, detailIndex) => (
                          <div key={detailIndex}>
                            <p className="text-sm text-gray-500">{detail.label}</p>
                            <p className="font-medium text-gray-900">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Important Note
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                For urgent inquiries or immediate assistance, please contact our sales hotline. 
                Our experienced team is ready to help you find the right automotive parts for your needs.
              </p>
            </div>
          </div>

          {/* Map & Location */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Our Location
            </h2>
            
            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">Guangzhou, China</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Manufacturing Facility
                </h3>
                <p className="text-gray-600 mb-4">
                  Located in Guangzhou's automotive industrial park, our 10,000 square meter 
                  facility is equipped with modern manufacturing equipment and quality control systems.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Facility Size</p>
                    <p className="font-medium">10,000 m²</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Employees</p>
                    <p className="font-medium">200+ Staff</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Established</p>
                    <p className="font-medium">2004</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Certifications</p>
                    <p className="font-medium">ISO 9001, TS 16949</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Transportation & Logistics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance to Guangzhou Port:</span>
                  <span className="font-medium">45 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance to Baiyun Airport:</span>
                  <span className="font-medium">35 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Highway Access:</span>
                  <span className="font-medium">G4 & G15 Express</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Options:</span>
                  <span className="font-medium">Sea, Air, Express</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;