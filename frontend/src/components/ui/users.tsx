import React, { useState } from 'react';
import { Eye, EyeOff, Edit, Trash, ArrowUpDown } from 'lucide-react';
import Navbar from '../Navbar';

const UserPage = () => {
  // Sample user data - replace with your actual data source
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'pawan pandey',
      password: 'apwandiwnb',
      submissions: ['sumofnumbers', 'panlindrome'],
      role: 'admin',
      totalSubmissions: 2,
    },
    {
      id: '2',
      name: 'siddhu acharya',
      password: 'siddhu232',
      submissions: ['subarray'],
      role: 'user',
      totalSubmissions: 1,
    },
    {
      id: '3',
      name: 'avash neupane',
      password: 'avash1332',
      submissions: [],
      role: 'user',
      totalSubmissions: 0,
    },
  ]);

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                  User Management
                </h1>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Password
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center gap-2">
                        Role
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('totalSubmissions')}
                    >
                      <div className="flex items-center gap-2">
                        Total Submissions
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500">
                            {showPasswordId === user.id
                              ? user.password
                              : '••••••••'}
                          </span>
                          <button
                            onClick={() =>
                              setShowPasswordId(
                                // @ts-expect-error
                                showPasswordId === user.id ? null : user.id
                              )
                            }
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswordId === user.id ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.totalSubmissions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
