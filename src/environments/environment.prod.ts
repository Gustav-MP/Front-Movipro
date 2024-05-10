export const environment = {
  production: true,
  baseUrl: 'https://api.movipro.cl/',
  api: {
    auth: {
      getUser: 'auth/byUserId/',
    },
    admin: {
      getAllAccounts: 'admin/accounts/all',
      getInvoicingByAccount: 'admin/invoicing/byAccount',
    },
  },
};
