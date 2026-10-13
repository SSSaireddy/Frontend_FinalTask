export const initialContactState = {
  values: { name: "", email: "", message: "" },
  errors: {},
  submitted: false
};

export function contactReducer(state, action) {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
        submitted: false
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors, submitted: false };
    case "SUBMIT_SUCCESS":
      return { ...initialContactState, submitted: true };
    default:
      return state;
  }
}
