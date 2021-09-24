const contextReducer = (state, { type, payload }) => {
  switch (type) {
    case 'DELETE_TRANSACTION':
      const td = state.filter(({ id }) => id !== payload);
      localStorage.setItem('transactions', JSON.stringify(td));
      return td;
    case 'ADD_TRANSACTION':
      const ta = [payload, ...state];
      localStorage.setItem('transactions', JSON.stringify(ta));
      return ta;
    default:
      return state;
  }
};

export default contextReducer;
