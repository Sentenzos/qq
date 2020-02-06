const DIALOG_MESSAGE_SENT = "reduxFormReducer/DIALOG_MESSAGE_SENT";
const SEARCH_IS_ENDED = "reduxFormReducer/SEARCH_IS_ENDED";

export const reduxFormReducer = {
  "dialogChat": (state, action) => {
    switch (action.type) {
      case DIALOG_MESSAGE_SENT:
        return undefined;
      default:
        return state
    }
  },
  "userSearcher": (state, action) => {
    switch (action.type) {
      case SEARCH_IS_ENDED:
        return undefined;
      default:
        return state
    }
  }
};


export const dialogMessageSent = () => ({type: DIALOG_MESSAGE_SENT});
export const searchIsEnded = () => ({type: SEARCH_IS_ENDED});


