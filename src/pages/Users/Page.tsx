import { useState } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, deleteUser } from '../../features/Users/usersSlice';
import Navbar from '../../components/Navbar';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility
  const [, setSelectedUserId] = useState<string | null>(null); // To store the selected user ID
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

  // Handle View button click - open modal and fetch user details
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    dispatch(fetchUserDetails(userId));  // Fetch user details from API or store
    setIsModalOpen(true);  // Open the modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);  // Reset the selected user ID
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col">

      <Navbar
        title='Users Dashboard'
        element1={
          <select
            className="select mr-2"
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
              <input type="text" placeholder="Search" className="input w-24 md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        }
      />

      <div className="mt-10 overflow-x-auto flex-1">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map(user => (
              <tr key={user.id}>
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

      <footer>
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
      </footer>

      {/* Modal */}
      {isModalOpen && details && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box relative">
              <h2 className="text-xl font-semibold">User Details</h2>
              <div className="my-4">
                <p><strong>Name: </strong> {details.name}</p>
                <p><strong>Email: </strong> {details.email}</p>
                <p><strong>Status: </strong> {details.status}</p>
                <p><strong>Region: </strong> {details.region}</p>
                <p><strong>Registration Date: </strong> {details.registrationDate}</p>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
