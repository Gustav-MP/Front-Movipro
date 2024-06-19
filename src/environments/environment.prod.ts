export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.movipro.cl/',
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
      getByFleet: 'vehicles/byFleet',
      countByUser: 'vehicles/count/byUser',
    },
    alerts: {
      countByUser: 'alerts/count/byUser',
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
