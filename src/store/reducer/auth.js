const inistialState = {
  idUser: "",
  isError: false,
  isLoading: false,
  message: "",
};

export default function auth(state = inistialState, action) {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        message: action.payload.data.message,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        message: action.payload.response.data.message,
      };
    }
    case "REGISTER_PENDING": {
      return {
        ...state,
        isError: false,
        isLoading: true,
        message: "",
      };
    }
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        isError: false,
        isLoading: false,
        message: action.payload.data.message,
      };
    }
    case "REGISTER_REJECTED": {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
