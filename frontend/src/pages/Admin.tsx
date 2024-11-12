import { Users, FileCode, Settings, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: any) => {
    navigate(route);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium text-gray-800 mb-8 text-center">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => handleNavigation('/admin/users')}
            className="bg-white rounded-xl p-6 flex flex-col items-center cursor-pointer border-2 border-gray-100 
                     hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative 
                     group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 
                          transition-transform duration-300 origin-left"
            ></div>
            <Users
              className="h-8 w-8 text-gray-600 mb-3 relative z-10 group-hover:text-blue-500 
                           transition-colors duration-300"
            />
            <h2
              className="text-lg font-medium text-gray-800 relative z-10 group-hover:text-blue-500 
                         transition-colors duration-300"
            >
              User Data
            </h2>
          </div>

          <div
            onClick={() => handleNavigation('/admin/problems')}
            className="bg-white rounded-xl p-6 flex flex-col items-center cursor-pointer border-2 border-gray-100 
                     hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative 
                     group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 
                          transition-transform duration-300 origin-left"
            ></div>
            <FileCode
              className="h-8 w-8 text-gray-600 mb-3 relative z-10 group-hover:text-blue-500 
                              transition-colors duration-300"
            />
            <h2
              className="text-lg font-medium text-gray-800 relative z-10 group-hover:text-blue-500 
                         transition-colors duration-300"
            >
              Boilerplate
            </h2>
          </div>

          <div
            onClick={() => handleNavigation('/admin/problems')}
            className="bg-white rounded-xl p-6 flex flex-col items-center cursor-pointer border-2 border-gray-100 
                     hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative 
                     group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 
                          transition-transform duration-300 origin-left"
            ></div>
            <AlertTriangle
              className="h-8 w-8 text-gray-600 mb-3 relative z-10 group-hover:text-blue-500 
                                   transition-colors duration-300"
            />
            <h2
              className="text-lg font-medium text-gray-800 relative z-10 group-hover:text-blue-500 
                         transition-colors duration-300"
            >
              Problems
            </h2>
          </div>

          <div
            onClick={() => handleNavigation('/admin/settings')}
            className="bg-white rounded-xl p-6 flex flex-col items-center cursor-pointer border-2 border-gray-100 
                     hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative 
                     group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 
                          transition-transform duration-300 origin-left"
            ></div>
            <Settings
              className="h-8 w-8 text-gray-600 mb-3 relative z-10 group-hover:text-blue-500 
                             transition-colors duration-300"
            />
            <h2
              className="text-lg font-medium text-gray-800 relative z-10 group-hover:text-blue-500 
                         transition-colors duration-300"
            >
              Settings
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
