import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { Button, Heading, Text } from '@medusajs/ui'

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Already have an account?
        </Heading>
        <Text className="txt-medium mt-2 text-ui-fg-subtle">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
