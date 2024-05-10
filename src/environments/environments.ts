export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/',
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
