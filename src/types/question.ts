export default interface IQuestion {
  title?: string
  accepted_answer_id?: number
  link: string
  is_answered?: boolean
  question_id: number
  tags: string[]
  creation_date: number
  answer_count: number
  view_count: number
}
