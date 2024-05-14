export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/',
    auth: {
      getUser: 'auth/byUserId',
    },
    admin: {
      getAllAccounts: 'admin/accounts/all',
      getInvoicingByAccount: 'admin/invoicing/byAccount',
    },
    gps: {
      getLastStatus: 'gps/last-status',
    },
  },
};
