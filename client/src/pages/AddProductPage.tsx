import { AddProductForm } from '@/features/products/forms/AddProductForm'
export function AddProductPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Add Product</h1>
      <p className="text-muted-foreground mt-2">Fill the form to create a product.</p>
      <div className="mt-6 max-w-2xl">
        <AddProductForm />
      </div>
    </section>
  )
}
