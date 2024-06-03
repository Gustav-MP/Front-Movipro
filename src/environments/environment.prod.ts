export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.movipro.cl/',
    auth: {
      getUser: 'auth/byUserId/',
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
    secret: 'JWT_SECRET',
  },
};
