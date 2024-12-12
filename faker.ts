// Import the Faker library
import { faker } from '@faker-js/faker';
import fs from 'fs';

// Constants
const NUM_USERS = 100;
const REGIONS = ['North', 'South', 'East', 'West'];

// Helper function to generate random user data
const generateUser = (id: number) => {
  return {
    id: id.toString(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    region: faker.helpers.arrayElement(REGIONS),
    registrationDate: faker.date.past(1).toISOString().split('T')[0] // Past year
  };
};

// Generate Users
const users = Array.from({ length: NUM_USERS }, (_, i) => generateUser(i + 1));

// Overview metrics
const activeUsers = users.filter(user => user.status === 'active').length;
const inactiveUsers = users.filter(user => user.status === 'inactive').length;
const overview = {
  totalUsers: users.length,
  activeUsers,
  deletedUsers: 0 // Initial value
};

// Generate Registration Trend
const registrationTrend = Array.from({ length: 6 }, (_, i) => {
  const month = faker.date.month({ abbr: true, context: true, date: new Date(2023, i) });
  return {
    month,
    registrations: faker.datatype.number({ min: 5, max: 50 })
  };
});

// User Status (for pie chart)
const userStatus = {
  active: activeUsers,
  inactive: inactiveUsers
};

// Region Distribution
const regionDistribution = REGIONS.map(region => ({
  region,
  count: users.filter(user => user.region === region).length
}));

// Compile all data
const data = {
  users,
  overview,
  registrationTrend,
  userStatus,
  regionDistribution
};

// Write to db.json
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));

console.log('Mock data generated successfully!');
