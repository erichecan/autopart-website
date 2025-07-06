import { Factory, Award, Users, Globe, CheckCircle, Calendar } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';

const AboutPage = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <Calendar className="w-8 h-8" />, number: '20+', label: 'Years Experience' },
    { icon: <Factory className="w-8 h-8" />, number: '1000+', label: 'Products' },
    { icon: <Globe className="w-8 h-8" />, number: '50+', label: 'Countries Served' },
    { icon: <Users className="w-8 h-8" />, number: '500+', label: 'Happy Customers' }
  ];

  const features = [
    {
      icon: <Factory className="w-12 h-12 text-primary-600" />,
      title: 'China Source Factory',
      description: 'Direct manufacturer located in Guangzhou, China\'s automotive manufacturing hub'
    },
    {
      icon: <Award className="w-12 h-12 text-primary-600" />,
      title: 'Quality Assurance',
      description: 'ISO certified manufacturing processes with strict quality control standards'
    },
    {
      icon: <Globe className="w-12 h-12 text-primary-600" />,
      title: 'Global Export',
      description: 'Serving customers worldwide with reliable shipping and logistics solutions'
    }
  ];

  const advantages = [
    'ISO 9001:2015 Quality Management System',
    'TS 16949 Automotive Quality Standard',
    'Advanced Manufacturing Equipment',
    'Professional R&D Team',
    'Competitive Factory Pricing',
    'Flexible MOQ Requirements',
    'Fast Production & Delivery',
    '24/7 Customer Support',
    'OEM & ODM Services Available',
    'Quality Warranty Guarantee'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional automotive parts manufacturer with 20 years of experience in producing high-quality components for global markets
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('factoryTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('aboutDescription')}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Located in Guangzhou, China's automotive manufacturing hub, we have built strong relationships with leading automotive brands worldwide. Our state-of-the-art facility covers 10,000 square meters and employs over 200 skilled workers and engineers.
              </p>
              
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  Our Mission
                </h3>
                <p className="text-primary-800">
                  To provide reliable, high-quality automotive parts that meet international standards while maintaining competitive pricing and exceptional customer service.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=400&fit=crop"
                alt="Manufacturing Facility"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('ourAdvantages')}
            </h2>
            <p className="text-lg text-gray-600">
              What makes us your trusted automotive parts partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Advantages List */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our Factory?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get in touch today to discuss your automotive parts requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Request Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;