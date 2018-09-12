import { CATALOG_FETCH, CATALOG_FETCH_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  catalog: {},
  categories: [],
  cat_items: [],
  selectedCategoryId: '',
  selectedCatItem: {},
  fetching: false,
}

export default (state = INITIAL_STATE, action) => {
  // console.log('CatalogReducer action.........', action)
  // console.log('CatalogReducer prevState.........', state)

  const { type, payload } = action
  // const payload =
  //   action.payload === state.selectedCategoryId ? '' : action.payload

  switch (type) {
    case CATALOG_FETCH:
      return {
        ...state,
        fetching: true,
      }
    case CATALOG_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        catalog: payload.catalog,
        categories: payload.catalog.categories,
        cat_items: payload.cat_items,
      }
    // case CATALOG_CATEGORY_SELECT:
    //   return {
    //     ...state,
    //     selectedCategoryId: payload,
    //   }
    // case CATALOG_ITEM_SELECT:
    //   return {
    //     ...state,
    //     selectedCatItem: payload,
    //   }
    default:
      return state
  }
}
