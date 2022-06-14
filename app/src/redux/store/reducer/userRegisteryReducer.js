const initialState = {};

export default function userRegisteryReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_USER_DATA':
      console.warn('payload SAVE_USER_DATA ', action.payload);
      return {...state, ...action.payload};

    default:
      return state;
  }
}
