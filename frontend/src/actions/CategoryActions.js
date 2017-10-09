import * as API from '../utils/api'
import * as Types from './index.js';

export const fetchCategories = () => {
  return (dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({ type: Types.FETCH_CATEGORY, res })
    })
  }
}
