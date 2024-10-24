import { cn } from '@/lib/util/cn'
import InteractiveLink from '@/modules/common/components/interactive-link'
import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/ui/shadcn/card'
import { clx } from '@medusajs/ui'
import React from 'react'
import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from 'react-instantsearch-hooks-web'
import { ProductHit } from '../search-hit'

type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const SearchResults = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { hits } = useHits(props)
  const width = typeof window !== 'undefined' ? window.innerWidth : 0

  if (!query) {
    return null // Don't render the component if the query is empty
  }

  return (
    <Card
      className={cn(
        'w-full rounded-md bg-[var(--bg-primary)] shadow-elevation-card-rest',
        className,
        {
          'max-h-full opacity-100 transition-all': !!query,
          'max-h-0 opacity-0': !query && !hits.length,
        }
      )}
    >
      <CardHeader>
        <CardDescription data-testid="no-search-results-container">
          <span className="font-semibold text-secondary-foreground">
            {hits.length}
          </span>{' '}
          results.
        </CardDescription>

        {hits.length === 0 ? (
          <CardDescription data-testid="no-search-results-container">
            No results found.
          </CardDescription>
        ) : hits.length > 6 ? (
          <CardDescription>
            Showing the first {width > 640 ? 6 : 3}.
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent
        className="overflow grid h-max scroll-m-0 grid-cols-2 gap-x-4 gap-y-2"
        data-testid="search-results"
      >
        {hits.slice(0, 6).map((hit, index) => (
          <li
            key={index}
            className={clx('list-none', {
              'hidden sm:block': index > 2,
            })}
          >
            <Hit hit={hit as unknown as ProductHit} />
          </li>
        ))}
      </CardContent>
      {hits.length > 6 ? (
        <CardFooter>
          <Button variant="secondary" className="w-full">
            <InteractiveLink href={`/results/${query}`}>
              View more results
            </InteractiveLink>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default SearchResults
