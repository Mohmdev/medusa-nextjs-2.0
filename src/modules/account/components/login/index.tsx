import { useFormState } from 'react-dom'

import { login } from '@/lib/data/customer'
import { LOGIN_VIEW } from '@/modules/account/templates/login-template'
import ErrorMessage from '@/modules/checkout/components/error-message'
import { SubmitButton } from '@/modules/checkout/components/submit-button'
import Input from '@/modules/common/components/input'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">Welcome back</h1>
      <p className="text-base-regular mb-8 text-center text-ui-fg-base">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="mt-6 w-full">
          Sign in
        </SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
