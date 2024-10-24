import { Input } from '@/ui/shadcn/input'
import { XMarkMini } from '@medusajs/icons'
import { Search } from 'lucide-react'
import { FormEvent } from 'react'
import SearchBoxWrapper, {
  type ControlledSearchBoxProps,
} from '../search-box-wrapper'
// import { useRouter } from "next/navigation"

const ControlledSearchInput = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur() // Remove focus after submit (mobile keyboard)
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    // if (inputRef.current) {
    //   inputRef.current.focus() // Refocus the input after reset
    // }
  }

  return (
    <div {...props} className="w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="relative ml-auto flex flex-1 items-center">
          <Search className="absolute left-[0.75rem] top-[0.75rem] h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="h-min w-full rounded-lg bg-background pl-9 pr-8"
          />

          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="txt-compact-large absolute right-0 top-auto flex items-center justify-center gap-x-2 px-2 text-ui-fg-on-color focus:outline-none"
            >
              <XMarkMini />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchInput = () => {
  // const router = useRouter()

  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchInput {...props} />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}

export default SearchInput
