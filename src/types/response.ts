import IAnswer from './answer'
import IQuestion from './question'

interface IItemsResponse {
  has_more: boolean
  quota_max: number
  quota_remaining: number
}

export interface IAnswerResponse extends IItemsResponse {
  items: IAnswer[]
}

export interface ISearchResponse extends IItemsResponse {
  items: IQuestion[]
}
