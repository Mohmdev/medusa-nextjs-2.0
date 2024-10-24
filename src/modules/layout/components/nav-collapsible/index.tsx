import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/shadcn/accordion'
//
// import { getCategoriesList, getCollectionsList } from '@lib/data'
import { getCategoriesList } from '@/lib/data/categories'
import { getCollectionsList } from '@/lib/data/collections'
import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'

const NavCollapsible = async () => {
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
    <Accordion type="single" collapsible className="h-min w-full">
      <nav>
        <ul className="flex flex-col gap-3 text-secondary-foreground/90">
          {/* Collections */}
          {collections && collections.length > 0 && (
            <AccordionItem value="item-1" className="border-0 pb-2" asChild>
              <li>
                <AccordionTrigger className="hover-text-full p-0 text-[1rem] font-normal">
                  Collections
                </AccordionTrigger>
                <AccordionContent>
                  <ul
                    className={cn(
                      'grid grid-flow-row',
                      'gap-x-4 gap-y-2 p-3 pb-0',
                      'h-min w-max'
                    )}
                  >
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className={cn(
                            'hover-text-full',
                            'flex select-none justify-start space-y-1 rounded-sm p-1 leading-none no-underline outline-none'
                          )}
                          href={`/collections/${c.handle}`}
                          data-testid="collection-link"
                        >
                          <h4 className="text-sm font-normal leading-none">
                            {c.title}
                          </h4>
                          {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p> */}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </li>
            </AccordionItem>
          )}
          {/* Men */}
          <AccordionItem value="item-2" className="border-0 pb-2" asChild>
            <li>
              <AccordionTrigger className="hover-text-full p-0 text-[1rem] font-normal">
                Men&apos;s Fashion
              </AccordionTrigger>
              <AccordionContent className="h-fit p-0">
                <ul
                  className={cn(
                    'grid grid-flow-col grid-rows-[repeat(10,_max-content)]',
                    'gap-x-4 gap-y-2 p-3 pb-0',
                    'h-min w-max'
                  )}
                >
                  {menChildren.map((child) => (
                    <li key={child.id}>
                      <LocalizedClientLink
                        className={cn(
                          'hover-text-full',
                          'flex select-none justify-start space-y-1 rounded-sm p-1 leading-none no-underline outline-none'
                        )}
                        href={`/categories/${child.handle}`}
                        data-testid="men-category-link"
                      >
                        <h4 className="text-sm font-normal leading-none">
                          {child.name}
                        </h4>
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </li>
          </AccordionItem>
          {/* Women */}
          <AccordionItem value="item-3" className="border-0 pb-2" asChild>
            <li>
              <AccordionTrigger className="hover-text-full p-0 text-[1rem] font-normal">
                Women&apos;s Fashion
              </AccordionTrigger>
              <AccordionContent>
                <ul
                  className={cn(
                    'grid grid-flow-col grid-rows-[repeat(10,_max-content)]',
                    'gap-x-4 gap-y-2 p-3 pb-0',
                    'h-min w-max'
                  )}
                >
                  {womenChildren.map((child) => (
                    <li key={child.id}>
                      <LocalizedClientLink
                        className={cn(
                          'hover-text-full',
                          'flex select-none justify-start space-y-1 rounded-sm p-1 leading-none no-underline outline-none'
                        )}
                        href={`/categories/${child.handle}`}
                        data-testid="women-category-link"
                      >
                        <h4 className="text-sm font-normal leading-none">
                          {child.name}
                        </h4>
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </li>
          </AccordionItem>

          {/* Cart */}
          <li className="hover-text-full w-full pb-2">
            <LocalizedClientLink
              href="/cart"
              className="text-[1rem] font-normal"
              prefetch={false}
            >
              Cart
            </LocalizedClientLink>
          </li>

          {/* Account */}
          <li className="hover-text-full w-full pb-2">
            <LocalizedClientLink
              href="/account"
              className="text-[1rem] font-normal"
              prefetch={false}
            >
              Account
            </LocalizedClientLink>
          </li>

          {/* Contact */}
          <li className="hover-text-full w-full pb-2">
            <LocalizedClientLink
              href="/contact"
              className="hover-text-full text-[1rem] font-normal"
              prefetch={false}
            >
              Contact
            </LocalizedClientLink>
          </li>
        </ul>
      </nav>
    </Accordion>
  )
}

export default NavCollapsible
