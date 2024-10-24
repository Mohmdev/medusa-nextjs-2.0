import { getCategoriesList } from '@/lib/data/categories'
import { getCollectionsList } from '@/lib/data/collections'
import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/ui/shadcn/navigation-menu'
import SiteLogo from '@/ui/site-logo'
import Image from 'next/image'

type NavDropdownProps = {
  className?: string
}

const NavDropdown = async ({ className }: NavDropdownProps) => {
  const { product_categories } = await getCategoriesList(0, 60)
  const { collections } = await getCollectionsList(0, 10)

  // Find the 'Men' category
  const menCategory = product_categories.find(
    (category) => category.handle === 'men'
  )
  const menChildren = menCategory?.category_children || []
  // Find the 'Women' category
  const womenCategory = product_categories.find(
    (category) => category.handle === 'women'
  )
  const womenChildren = womenCategory?.category_children || []

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex-row items-center justify-center space-x-4">
        {/* Men */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="min-w-16 p-2 px-3">
            Men
            <span className="sr-only">Men&apos;s Category</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-[200px_1fr] grid-rows-[18rem] items-start justify-between gap-4 p-4">
              {/* Image */}
              <div className="relative h-full w-full select-none">
                <Image
                  src="https://res.cloudinary.com/raverclub-cloud-storage/image/upload/v1718624078/oyys2bz4xzebuqmga4yn.jpg"
                  alt="Men Category"
                  priority
                  loading="eager"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md border border-[var(--border-primary)] shadow-md"
                />
                <div className="absolute bottom-3 left-3 w-max">
                  <SiteLogo />
                </div>
              </div>

              {/* Nav */}

              <ul
                className={cn(
                  'h-full w-max',
                  'flex flex-col flex-wrap gap-1 p-0'
                )}
              >
                {menChildren.map((child) => (
                  <li key={child.id}>
                    <LocalizedClientLink
                      className={cn(
                        'hover-green-300',
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                      href={`/categories/${child.handle}`}
                      data-testid="men-category-link"
                    >
                      <h4 className="text-sm font-medium leading-none">
                        {child.name}
                      </h4>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Women */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="min-w-16 p-2 px-3">
            Women
            <span className="sr-only">Women&apos;s Category</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-[200px_1fr] grid-rows-[18rem] items-start justify-between gap-4 p-4">
              {/* Image */}
              <div className="relative h-full w-full select-none">
                <Image
                  src="https://res.cloudinary.com/raverclub-cloud-storage/image/upload/v1718624066/dt73x5qinvpmpv7ztd50.jpg"
                  alt="Women Category"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md border border-[var(--border-primary)] shadow-md"
                />
                <div className="absolute bottom-3 left-3 w-max">
                  <SiteLogo />
                </div>
              </div>

              {/* Nav */}

              <ul
                className={cn(
                  'h-full w-max',
                  'flex flex-col flex-wrap gap-1 p-0'
                )}
              >
                {womenChildren.map((child) => (
                  <li key={child.id}>
                    <LocalizedClientLink
                      className={cn(
                        'hover-green-300',
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                      href={`/categories/${child.handle}`}
                      data-testid="women-category-link"
                    >
                      <h4 className="text-sm font-medium leading-none">
                        {child.name}
                      </h4>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Collections */}
        {collections && collections.length > 0 && (
          <NavigationMenuItem
            className={cn('flex', {
              hidden: !collections || collections.length === 0,
            })}
          >
            <NavigationMenuTrigger className="min-w-16 p-2 px-3">
              Collections
              <span className="sr-only">Collections</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-[200px_1fr] grid-rows-[18rem] items-start justify-between gap-4 p-4">
                {/* Image */}
                <div className="relative h-full w-full select-none">
                  <Image
                    src="https://res.cloudinary.com/raverclub-cloud-storage/image/upload/v1718624070/qwmwpx5sev2ciruxw24u.webp"
                    alt="Collections"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md border border-[var(--border-primary)] shadow-md"
                  />
                  <div className="absolute bottom-3 left-3 w-max">
                    <SiteLogo />
                  </div>
                </div>

                {/* Nav */}

                <ul
                  className={cn(
                    'h-full w-max',
                    'flex flex-col flex-wrap gap-1 p-0'
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className={cn(
                          'hover-green-300',
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                        )}
                        href={`/collections/${c.handle}`}
                        data-testid="collection-link"
                      >
                        <h4 className="text-sm font-medium leading-none">
                          {c.title}
                        </h4>
                        {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {child.description}
                          </p> */}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// const ListItem = React.forwardRef<
//   React.ElementRef<'a'>,
//   React.ComponentPropsWithoutRef<'a'>
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <LocalizedClientLink
//           href={`/categories/${children.handle}`}
//           className="hover-green-300 h-full w-full"
//         >
//           <a
//             ref={ref}
//             className={cn(
//               'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//               {children}
//             </p>
//           </a>
//         </LocalizedClientLink>

//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = 'ListItem'

export default NavDropdown
