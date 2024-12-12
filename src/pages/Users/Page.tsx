import { useState } from 'react';

const Page = () => {
  // State for the user data, search term, and pagination
  const [users, setUsers] = useState([
    { id: 1, name: "Cy Ganderton", email: "cy.ganderton@example.com" },
    { id: 2, name: "Hart Hagerty", email: "hart.hagerty@example.com" },
    { id: 3, name: "Brice Swyre", email: "brice.swyre@example.com" },
    { id: 4, name: "Brianna Wyman", email: "brianna.wyman@example.com" },
    { id: 5, name: "Kelley Schmidt", email: "kelley.schmidt@example.com" },
    { id: 6, name: "Maxime Nowak", email: "maxime.nowak@example.com" },
    { id: 7, name: "Hannah Stevens", email: "hannah.stevens@example.com" },
    { id: 8, name: "Mason Taylor", email: "mason.taylor@example.com" },
    { id: 9, name: "Walter Lee", email: "walter.lee@example.com" },
    { id: 10, name: "Kimberly Harris", email: "kimberly.harris@example.com" },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');  // 'name' or 'email' filter
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on search term and selected filter
  const filteredUsers = users.filter(user => {
    if (filterBy === 'name') {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'email') {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true; // Return true if no filter is applied
  });

  // Pagination logic
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const usersToDisplay = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Change page
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle user delete (for now, just log the user to delete)
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="flex flex-col">
      <div className="navbar bg-base-300 rounded-box">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder={`Search by ${filterBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        
        <select
          className="select select-bordered"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className="overflow-x-auto flex-1">
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
                    onClick={() => alert(`View details for ${user.name}`)}
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
