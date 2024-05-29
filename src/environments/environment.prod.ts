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
  },
  jwt: {
    secret: 'JWT_SECRET',
  },
};
