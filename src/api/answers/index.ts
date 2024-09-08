import { AxiosPromise } from 'axios'
import http from '../axios'
import { IAnswerResponse } from '../../types/response'

export default class AnswerApi {
  private static base = '/answers'

  public static getById(
    id: number
  ): AxiosPromise<IAnswerResponse> {
    return http.get(`${this.base}/${id}`)
  }
}
