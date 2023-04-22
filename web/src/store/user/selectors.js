export const userSelectors = {
  confirmed: state => state.user.confirmed,
  errors: state => state.user.errors,
  info: state => state.user.info,
  registered: state => state.user.registered,
  role: state => state.user.role,
}
