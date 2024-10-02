import ModeToggle from '@/ui/mode-toggle/toggle'

const NavCopyright = () => {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between gap-4">
      <p className="txt-compact-small flex justify-between">
        © {new Date().getFullYear()} Medusa Store. All rights reserved.
      </p>
      <ModeToggle size={18} />
    </div>
  )
}

export default NavCopyright
