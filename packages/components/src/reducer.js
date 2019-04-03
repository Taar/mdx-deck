import { next, previous, recalculate } from './actionHandlers'

export default function reducer(state, action) {
  const { type, payload } = action

  if (type === 'NEXT') {
    return {
      ...state,
      ...next(state),
    }
  } else if (type === 'PREVIOUS') {
    return {
      ...state,
      ...previous(state),
    }
  } else if (type === 'CHANGE_MODE') {
    return {
      ...state,
      mode: payload.mode,
    }
  } else if (type === 'REGISTER_STEP_COUNT') {
    const currentSlideMeta = state.slideMeta[payload.index]
    const steps = payload.steps

    const modifiedState = {
      ...state,
      slideMeta: {
        ...state.slideMeta,
        [payload.index]: {
          ...currentSlideMeta,
          steps,
        },
      },
    }
    return {
      ...modifiedState,
      ...recalculate(state, modifiedState),
    }
  } else if (type === 'REGISTER_NOTES') {
    const slideMeta = state.slideMeta[payload.index]

    return {
      ...state,
      slideMeta: {
        ...state.slideMeta,
        [payload.index]: {
          ...slideMeta,
          notes: payload.notes,
        },
      },
    }
  }
}
