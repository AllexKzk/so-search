import { AxiosPromise } from 'axios'
import http from '../axios'
import { ISearchResponse } from '../../types/response'

export interface SearchParams {
  intitle: string
  page?: number
}

export default class SearchApi {
  private static base = '/search'

  public static get(
    params: SearchParams
  ): AxiosPromise<ISearchResponse> {
    return http.get(`${this.base}/`, { params })
  }
}
