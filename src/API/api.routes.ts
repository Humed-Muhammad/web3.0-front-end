/**
 * Routes file to backend endpoints, always fnish routes with out slash symbol
 */

const microServiceBases = {
  fieldOfficer: '/field-officer',
};

const bases = {
  user: `${microServiceBases.fieldOfficer}/user`,
  samples: `${microServiceBases.fieldOfficer}/samples`,
  farmers: `${microServiceBases.fieldOfficer}/farmers`,
  orders: `${microServiceBases.fieldOfficer}/orders`,
  upload: `${microServiceBases.fieldOfficer}/upload`,
  download: `${microServiceBases.fieldOfficer}/download`,
  landing: `${microServiceBases.fieldOfficer}/landing`,
  leads: `${microServiceBases.fieldOfficer}/leads`,
  homeContents: `${microServiceBases.fieldOfficer}/homeContents`,
  coffeeProperties: `${microServiceBases.fieldOfficer}/coffeeProperties`,
  stats: `${microServiceBases.fieldOfficer}/stats`,
  notification: `${microServiceBases.fieldOfficer}/notification`,
  carts: `${microServiceBases.fieldOfficer}/carts`,
};

const user = {
  login: `${bases.user}/login/customer`,
  getAccount: `${bases.user}/account`,
  activateAccount: `${bases.user}/activate-account`,
  updateAccount: `${bases.user}/update-account`,
  forgetPassword: `${bases.user}/forget-password`,
};

const samples = {
  get: `${bases.samples}/`,
};
const farmers = {
  get: `${bases.farmers}/`,
};

const orders = {
  create: `${bases.orders}/`,
  get: `${bases.orders}/`,
  getOrderItem: `${bases.orders}/orderItem/`,
};

const upload = {
  base: `${bases.upload}`,
  public: `${bases.upload}/public`,
};

const download = {
  base: `${bases.download}/`,
  public: `${bases.download}/public`,
};

const landing = {
  get: `${bases.landing}`,
  popular: `${bases.landing}/popular`,
  requestAccount: `${bases.leads}`,
};

const homeContents = {
  get: `${bases.homeContents}`,
};

const coffeeProperties = {
  get: `${bases.coffeeProperties}/`,
};

const stats = {
  get: `${bases.stats}/`,
};

const carts = {
  get: `${bases.carts}/`,
};
const notification = {
  get: `${bases.notification}/`,
  seen: `${bases.notification}/seen`,
  clicked: `${bases.notification}/clicked`,
};

const routes = {
  user,
  samples,
  upload,
  farmers,
  orders,
  download,
  landing,
  homeContents,
  coffeeProperties,
  stats,
  notification,
  carts,
};

export default routes;
