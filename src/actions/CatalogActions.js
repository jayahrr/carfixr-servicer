import {
  CATALOG_FETCH,
  CATALOG_FETCH_SUCCESS,
  // CATALOG_CATEGORY_SELECT,
  // CATALOG_ITEM_SELECT,
} from './types'
import URI from '../config/db'

/*
 * actions
 */

const fetchFullCatalogSuccess = (dispatch, catalog) =>
  dispatch({
    type: CATALOG_FETCH_SUCCESS,
    payload: catalog,
  })

/*
 * action creators
 */

export const fetchFullCatalog = () => (dispatch) => {
  const URL = `${URI}/api/v1/catalog/full`
  dispatch({
    type: CATALOG_FETCH,
  })
  return fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Full catalog API response was not ok.')
      }
      // console.log('fetchFullCatalog res.........', JSON.parse(res._bodyText))
      return res.json()
    })
    .then(json => fetchFullCatalogSuccess(dispatch, json))
    .catch((e) => {
      throw new Error(e)
    })
}

// const fetchCatalogSuccess = (dispatch, catalog_object) => {
//   dispatch({
//     type: CATALOG_FETCH_SUCCESS,
//     payload: catalog_object,
//   })
// }

// const fetchCatalog = (dispatch) => {
//   // let heroku = 'https://tranquil-chamber-80954.herokuapp.com'
//   const url = `${URI}/api/v1/catalog/`

//   const fetchConfig = {
//     method: 'GET',
//   }

//   fetch(url, fetchConfig)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Catalog API response was not ok.')
//       }
//       console.log('fetchCatalog res.........', JSON.parse(res._bodyText))
//       return fetchCatalogSuccess(dispatch, JSON.parse(res._bodyText))
//     })
//     .catch((e) => {
//       throw new Error(e)
//     })
// }

// const selectCategory = id => ({
//   type: CATALOG_CATEGORY_SELECT,
//   payload: id,
// })

// const selectCatItem = catItem => ({
//   type: CATALOG_ITEM_SELECT,
//   payload: catItem,
// })
