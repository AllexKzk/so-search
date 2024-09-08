import { useEffect, useRef, useState } from 'react'
import Block from '../Block'
import Input from '../Input'
import './index.css'
import { ReactComponent as Logo } from '../../assets/SO.svg'
import Typography from '../Typography'
import QuestionTab from '../QuestionTab'
import SearchApi from '../../api/questions'
import IQuestion from '../../types/question'
import Loader from '../Loader'

interface ISearchProps {
  className?: string
}
interface ISearchState {
  search: string
  hasMore: boolean
  page: number
}

export default function Search({
  className,
}: ISearchProps) {
  const [isExpanded, setExpanded] = useState(false)
  const expand = () => {
    if (!isExpanded) {
      setExpanded(true)
    }
  }

  const [searchState, setSearchState] =
    useState<ISearchState>({
      page: 1,
      search: '',
      hasMore: false,
    })
  const [results, setResults] = useState<IQuestion[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const loadResults = (intitle: string) => {
    setIsFetching(true)
    const page = searchState.page
    const isNew = intitle !== searchState.search
    SearchApi.get({ intitle, page }).then(({ data }) => {
      const questions = [...( results && !isNew ? results : []), ...data.items]
      setResults(questions)
      setIsFetching(false)
      setSearchState({
        page: 1 + (page * +!isNew),
        search: intitle,
        hasMore: data.has_more,
      })
    })
  }

  const loadRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetching) {
        loadResults(searchState.search)
      }
    })

    if (loadRef.current) {
      observer.observe(loadRef.current)
    }

    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current)
      }
    }
  }, [searchState])

  return (
    <div
      className={`m-auto max-h-full  flex flex-col ${className} duration-500`}
      style={{
        minHeight: isExpanded ? '80%' : '0',
      }}
    >
      <div className='w-fit mx-auto flex justify-start'>
        <Logo className='w-[50px] h-[50px] m-auto' />
        <Typography className='h1 text-white mx-auto'>
          <span className='text-primary'>SO</span>
          Searcher
        </Typography>
      </div>
      <Block className='flex flex-col max-h-[90%]'>
        <Input
          className='w-full min-h-[40px] rounded-l-lg'
          placeholder='Type your question...'
          onFocus={expand}
          request={loadResults}
        />
        <div
          className='flex flex-col overflow-scroll duration-500 w-full'
          style={{
            maxHeight: isExpanded ? '1000px' : '0px',
          }}
        >
          {isExpanded ? (
            <div className='w-full h-fit flex flex-col'>
              {
                results
                ? results.map((res, i) => (
                  <QuestionTab
                    key={i + res.link}
                    question={res}
                  />
                ))
                : Array.isArray(results)
                ? <Typography className='text-disabled m-auto py-2'>
                    Unfortunately, nothing was found.
                  </Typography>
                : <></>
              }
            </div>
          ) : (
            <></>
          )}
          {searchState.hasMore || isFetching ? (
            <div ref={loadRef}>
              {' '}
              <Loader />{' '}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Block>
    </div>
  )
}
