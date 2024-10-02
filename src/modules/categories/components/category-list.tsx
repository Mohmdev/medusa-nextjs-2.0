// import { getRegion } from '@/lib/data/regions'
// import ProductPreview from '@/modules/products/components/product-preview'
// import ProductPreviewLinkCard from '@/modules/product/components/product-preview/product-preview-LinkCard'
// import getCategoriesWithProducts from '@/lib/data/categories'

// interface CategoryTabContentProps {
//   countryCode: string
//   productsPerCategory?: number
//   categoriesToDisplay?: string
// }

// export async function CategoryTabContent({
//   countryCode,
//   productsPerCategory = 6,
//   categoriesToDisplay,
// }: CategoryTabContentProps) {
//   const categories = await getCategoriesWithProducts(
//     countryCode,
//     productsPerCategory,
//     categoriesToDisplay
//   )
//   const region = await getRegion(countryCode)

//   if (!categories || !region) {
//     return null
//   }

//   return (
//     <>
//       {categories.map((category) => (
//         // Gird
//         <ul key={category.id} className="tabs-product-grid">
//           {category.products &&
//             category.products.slice(0, productsPerCategory - 1).map((product) => (
//               <li key={product.id}>
//                 <ProductPreview productPreview={product} region={region} isFeatured />
//               </li>
//             ))}
//           <li>
//             <ProductPreviewLinkCard
//               item={category}
//               productCount={category.products?.length || 0}
//               type="category"
//             />
//           </li>
//         </ul>
//       ))}
//     </>
//   )
// }
