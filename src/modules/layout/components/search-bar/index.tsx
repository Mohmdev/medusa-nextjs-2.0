'use client'
// import classes from './index.module.scss'
import { SEARCH_INDEX_NAME, searchClient } from '@/lib/search-client'
import { clx } from '@medusajs/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import SearchHit from './search-hit'
import SearchInput from './search-input'
import SearchResults from './search-results'

const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter()
  const searchRef = useRef(null)

  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
    // cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disable scroll on body when modal is open
  // useEffect(() => {
  //   document.body.style.overflowX = "hidden"
  //   return () => {
  //     document.body.style.overflow = "unset"
  //   }
  // }, [])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleEsc)

    // cleanup
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={searchRef}
      className={clx(
        'relative z-[9000] flex h-fit max-h-[75vh] w-full transform flex-col items-center justify-start text-left align-middle shadow-none transition-all',
        className
      )}
    >
      <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
        <div className="relative w-full">
          <SearchInput />
          <div className="z-200 absolute inset-x-0 top-[2.825rem] flex h-fit w-full flex-col">
            <SearchResults hitComponent={SearchHit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}

export default SearchBar
