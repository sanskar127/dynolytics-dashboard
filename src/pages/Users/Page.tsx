// Page.tsx

import { useState } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, deleteUser } from '../../features/Users/usersSlice';
import Navbar from '../../components/Navbar';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const dispatch: AppDispatch = useDispatch();
  const { list, details, loading, error } = useSelector((state: RootState) => state.users);

  // Filter users based on search term and selected filter
  const filteredUsers = list.filter(user => {
    if (filterBy === 'name') {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'email') {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Pagination logic
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const usersToDisplay = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Change page
  const changePage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle user delete
  const handleDelete = (userId: number): void => {
    dispatch(deleteUser(userId));  // Dispatch delete user action
  };

  const handleUserClick = (userId: string) => {
    dispatch(fetchUserDetails(userId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-4 flex flex-col">

      <Navbar
        title='Users Dashboard'
        element1={
          <select
            className="select select-bordered mr-2"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        }

        element2={
          <div className="flex-none gap-2">
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        }
      />





      <div className="mt-10 overflow-x-auto flex-1">
        <table className="table table-zebra">
          {/* Table Head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map(user => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleUserClick(user.id.toString())}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-error ml-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls aligned at the bottom-center */}
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="btn join-item"
          onClick={() => changePage(currentPage - 1)}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          className="btn join-item"
          onClick={() => changePage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Page;
