import { useState } from 'react'
import Typography from '../Typography'
import './index.css'
import Block from '../Block'
import { ReactComponent as Check } from '../../assets/check.svg'
import { ReactComponent as Link } from '../../assets/redirect.svg'
import { ReactComponent as Chevron } from '../../assets/chevron.svg'
import { ReactComponent as Comment } from '../../assets/comment.svg'
import { ReactComponent as View } from '../../assets/view.svg'
import IQuestion from '../../types/question'
import Markdown from 'react-markdown'

export default function QuestionTab({
  question,
}: {
  question: IQuestion
}) {
  const [isOpen, setOpen] = useState(false)
  const openQuestion = () => {
    setOpen(!isOpen)
  }

  return (
    <div className='tab' onClick={openQuestion}>
      <Block className='w-full h-fit p-2'>
        <div className='w-full flex justify-between'>
          {question.is_answered ? (
            <Check
              className='icon !opacity-100'
              title='Answer exists'
            />
          ) : (
            <></>
          )}
          <Typography className='h5'>
            <Markdown>{question.title}</Markdown>
          </Typography>
          <div className='flex ml-auto'>
            <Link
              className='icon'
              title='Open link'
              onClick={() =>
                window.open(question.link, '_blank')
              }
            />
            <Chevron
              className='icon'
              title='Read more'
              onClick={openQuestion}
              style={{
                transform: `rotate(${200 * +isOpen}grad)`,
              }}
            />
          </div>
        </div>
        <div
          className='w-full h-fit flex flex-col duration-500 overflow-hidden'
          style={{
            maxHeight: isOpen ? '200px' : '0px',
            marginTop: isOpen ? '8px' : '',
          }}
        >
          <div className='flex'>
            {question.tags.map(tag => (
              <Block className='px-1 mr-1'>
                <Typography>{tag}</Typography>
              </Block>
            ))}
          </div>
          <Typography className='mt-2'>
            Created:{' '}
            {new Date(
              question.creation_date * 1000
            ).toLocaleDateString('ru')}
          </Typography>
          <div className='flex w-full justify-between'>
            <div className='flex'>
              <Comment className='w-[20px] mr-2 my-auto' />
              <Typography>
                {question.answer_count}
              </Typography>
            </div>
            <div className='flex'>
              <View className='w-[20px] mr-2 my-auto' />
              <Typography>{question.view_count}</Typography>
            </div>
          </div>
        </div>
      </Block>
    </div>
  )
}
