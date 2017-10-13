import * as API from '../utils/api'
import * as Types from './type';

export const fetchCategories = () => {
  return (dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({ type: Types.FETCH_CATEGORY, res })
    })
  }
}
