export const environment = {
  production: true,
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
      getByUser: 'fleets/byUser',
    },
    vehicles: {
      countByUser: 'vehicles/count/byUser',
      getByFleet: 'vehicles/byFleet',
    },
    alerts: {
      countByUser: 'alerts/count/byUser',
      countByStatus: 'alerts/count/byStatus',
      getByUser: 'alerts/byUser',
    },
    services: {
      countByUser: 'services/count/byUser',
      getByVehicle: 'services/byVehicle',
      getByFleet: 'services/byFleet',
    },
  },
  jwt: {
    secret: 'JWT_SECRET',
  },
};
