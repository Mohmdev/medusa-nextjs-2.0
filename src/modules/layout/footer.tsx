import { getCategoriesList } from '@/lib/data/categories'
import { getCollectionsList } from '@/lib/data/collections'
import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import ModeToggleDropdown from '@/ui/mode-toggle/dropdown'
import MedusaCTA from './components-shared/medusa-cta'
// import MedusaCTA from '../../components-shared/medusa-cta'

const { collections } = await getCollectionsList(0, 6)
const { product_categories } = await getCategoriesList(0, 6)
const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Medusa Store'

export default async function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('flex-start flex w-full flex-col flex-nowrap', 'bg-card', className)}>
      <div className="border-y border-border-subtle shadow-inner-overlay-md">
        {/* Top-level Grid */}
        <div
          className={cn(
            'content-container !px-10',
            'grid grid-cols-1 md:grid-cols-[14rem,_max-content]',
            'justify-between gap-x-8 gap-y-12 py-10 md:py-16'
          )}
        >
          <FooterCTA devices="desktop" />
          <FooterLinks />
          <FooterCTA devices="mobile" />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  )
}

const FooterLinks = async ({ className }: { className?: string }) => {
  return (
    // Link groups grid
    <div
      className={cn(
        'grid gap-10',
        // 'grid-cols-[repeat(2,_max-content)] md:grid-cols-[repeat(3,_max-content)]',
        'grid-cols-[repeat(2,_max-content)] md:grid-cols-3',
        'justify-between justify-items-stretch',
        'text-small-regular',
        className
      )}
    >
      <FooterCategoriesLinks />
      <FooterCollectionsLinks />
      <FooterQuickLinks displayHeader={true} devices="all" />
      <FooterMedusaLinks displayHeader={true} devices="mobile" />
    </div>
  )
}

const FooterCategoriesLinks = async ({ className }: { className?: string }) => {
  return (
    <>
      {product_categories && product_categories?.length > 0 && (
        <div className={cn('flex flex-col gap-y-2', className)}>
          <span className="txt-ui-fg-base txt-small-plus">Categories</span>
          <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
            {product_categories?.slice(0, 6).map((c) => {
              if (c.parent_category) {
                return
              }
              const children =
                c.category_children?.map((child) => ({
                  name: child.name,
                  handle: child.handle,
                  id: child.id,
                })) || null
              return (
                <li className="txt-small flex flex-col gap-2 text-ui-fg-subtle" key={c.id}>
                  <LocalizedClientLink
                    className={cn('hover:text-ui-fg-base', children && 'txt-small-plus')}
                    href={`/categories/${c.handle}`}
                    data-testid="category-link"
                  >
                    {c.name}
                  </LocalizedClientLink>
                  {children && children.length > 0 && (
                    <ul
                      className={cn('ml-3 grid grid-cols-1 gap-2', {
                        'grid-cols-2': (children?.length || 0) > 6,
                      })}
                    >
                      {children &&
                        children.map((child) => (
                          <li key={child.id}>
                            <LocalizedClientLink
                              className="hover:text-ui-fg-base"
                              href={`/categories/${child.handle}`}
                              data-testid="category-link"
                            >
                              {child.name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

const FooterCollectionsLinks = async ({ className }: { className?: string }) => {
  return (
    <>
      {collections && collections.length > 0 && (
        <div className={cn('flex flex-col gap-y-2', className)}>
          <span className="txt-ui-fg-base txt-small-plus">Collections</span>
          <ul
            className={cn('txt-small grid grid-cols-1 gap-2 text-ui-fg-subtle', {
              'grid-cols-2': (collections?.length || 0) > 6,
            })}
          >
            {collections?.slice(0, 6).map((c) => (
              <li key={c.id}>
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href={`/collections/${c.handle}`}
                >
                  {c.title}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

const FooterMedusaLinks = ({
  className,
  displayHeader = true,
  devices = 'all',
}: {
  className?: string
  displayHeader?: boolean
  devices?: 'mobile' | 'desktop' | 'all'
}) => {
  const deviceClasses =
    devices === 'mobile' ? 'flex md:hidden' : devices === 'desktop' ? 'md:flex hidden' : 'flex'
  return (
    <div className={cn('flex flex-col gap-y-2', deviceClasses, className)}>
      {displayHeader && <span className="txt-ui-fg-base txt-small-plus">Medusa</span>}
      <ul className="txt-small grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
        <li>
          <a
            href="https://github.com/medusajs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://docs.medusajs.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            Documentation
          </a>
        </li>
        <li>
          <a
            href="https://github.com/medusajs/nextjs-starter-medusa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            Source code
          </a>
        </li>
      </ul>
    </div>
  )
}

const FooterQuickLinks = ({
  className,
  displayHeader = true,
  devices = 'all',
}: {
  className?: string
  displayHeader?: boolean
  devices?: 'mobile' | 'desktop' | 'all'
}) => {
  const deviceClasses =
    devices === 'mobile' ? 'flex md:hidden' : devices === 'desktop' ? 'md:flex hidden' : 'flex'

  return (
    <div className={cn('flex-col gap-y-2', deviceClasses, className)}>
      {displayHeader && <span className="txt-ui-fg-base txt-small-plus">Links</span>}
      <ul className="txt-small grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
        <li>
          <LocalizedClientLink href="/about" className="hover:text-ui-fg-base">
            About
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink href="/about/contact" className="hover:text-ui-fg-base">
            Contact
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink href="/about/privacy-policy" className="hover:text-ui-fg-base">
            Privacy Policy
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink href="/about/terms-of-service" className="hover:text-ui-fg-base">
            Terms of Service
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink href="/about/customer-service" className="hover:text-ui-fg-base">
            Customer Service
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

const FooterCTA = ({ devices = 'desktop' }: { devices?: 'mobile' | 'desktop' }) => {
  return (
    <>
      {devices === 'desktop' && (
        <div className={cn('hidden flex-col justify-between gap-8 md:flex')}>
          <div className="flex flex-col items-start justify-start gap-4">
            <LocalizedClientLink
              href="/"
              className="txt-ui-fg-base txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
            >
              {storeName}
            </LocalizedClientLink>
            {/* <FooterQuickLinks displayHeader={false} devices="desktop" /> */}
            <FooterMedusaLinks displayHeader={false} />
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <MedusaCTA />
            <ModeToggleDropdown size="icon" align="start" />
          </div>
        </div>
      )}
      {devices === 'mobile' && (
        <div className="flex flex-row justify-between gap-2 md:hidden">
          <ModeToggleDropdown size="icon" align="start" />
          <MedusaCTA />
        </div>
      )}
    </>
  )
}

const FooterCopyright = ({ className }: { className?: string }) => {
  return (
    <div className={cn('txt-compact-small bg-background text-center text-ui-fg-muted', className)}>
      <div className="content-container py-2">
        <p>
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>
      </div>
    </div>
  )
}
