let roles = {
    ADMIN: 'ADMIN',
    SOCIETY_ADMIN: 'SOCIETY_ADMIN',
    AUTHORITY: 'AUTHORITY',
    SECURITY: 'SECURITY',
    OWNER: 'OWNER',
    TENANT: 'TENANT',
  }

  let constants = {
    JWT_SECRET: 'QUICK_ORDER',
    ORDER_STATUS: {
      Finished: "Finished",
      Pending: "Pending",
      Unpaid: "Unpaid"
    }
  }

  const ORDER_SOCKET = "ORDER-RECIEVED"

  module.exports = {
      roles,
      constants,
      ORDER_SOCKET
  }