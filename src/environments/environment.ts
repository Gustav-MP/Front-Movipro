export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/',
    auth: {
      getUser: 'auth/byUserId',
      login: 'auth/login',
    },
    admin: {
      getAllAccounts: 'admin/accounts/all',
      getInvoicingByAccount: 'admin/invoicing/byAccount',
    },
    gps: {
      getLastStatus: 'gps/last-status',
    },
    fleets: {
      getAllFleets: 'fleets/all',
    },
    vehicles: {
      getByFleet: 'vehicles/byFleetId',
    },
  },
  jwt: {
    secret: 'AITfjVuLVa6P7KNw8SzT1tHu6PI7Ne0c',
  },
};
