import ToggleSVG from './toggle-svg'
import ToggleText from './toggle-text'

const ToggleButton = ({
  menuState,
  toggleMenuState,
  variant = 'text',
}: {
  menuState: boolean
  toggleMenuState: () => void
  variant?: 'text' | 'svg'
}) => {
  return variant === 'text' ? (
    <ToggleText menuState={menuState} toggleMenuState={toggleMenuState} />
  ) : (
    <ToggleSVG menuState={menuState} toggleMenuState={toggleMenuState} />
  )
}

export default ToggleButton
