// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shadcn/tabs'
// import { CategoryTabContent } from './category-tab-content'
// import { cn } from '@/lib/util/cn'

// interface CollectionsTemplateProps {
//   countryCode: string
// }

// const tabsData = [
//   { value: 'women', label: "Women's Fashion" },
//   { value: 'men', label: "Men's Fashion" },
// ]

// export default function CategoriesTabs({ countryCode }: CollectionsTemplateProps) {
//   return (
//     <div className={cn('mx-auto flex w-full flex-col items-stretch gap-8')}>
//       <Tabs defaultValue="women" className="flex h-fit flex-col gap-2">
//         <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
//           <h2
//             className={cn(
//               'justify-center self-center',
//               'text-wrap text-3xl font-semibold !leading-normal',
//               // 'text-gradient-1',
//               'text-start md:p-0'
//             )}
//           >
//             Start exploring.
//           </h2>
//           {/* Tabs row */}
//           <TabsList
//             className={cn(
//               'relative self-center rounded-lg',
//               'flex h-fit w-max flex-row gap-1',
//               'left-0',
//               'flex-start justify-start',
//               'bg-transparent',
//               'p-0'
//             )}
//           >
//             <div className="flex flex-row gap-2">
//               {tabsData.map((tab, index) => (
//                 <TabsTrigger
//                   key={index}
//                   value={tab.value}
//                   className={cn(
//                     'h-full w-max rounded-lg px-4 py-2 md:px-8',
//                     'font-medium hover:text-white',
//                     'border border-[var(--border-primary)] bg-ui-button-neutral shadow-lg',
//                     'data-[state=active]:bg-ui-button-inverted'
//                   )}
//                 >
//                   {tab.label}
//                 </TabsTrigger>
//               ))}
//             </div>
//           </TabsList>
//         </div>

//         {/* Tabs Content */}
//         {tabsData.map((tab, index) => (
//           <TabsContent key={index} value={tab.value}>
//             <CategoryTabContent
//               countryCode={countryCode}
//               categoriesToDisplay={tab.value}
//               productsPerCategory={6}
//             />
//             {/* <Card>
//             </Card> */}
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }
