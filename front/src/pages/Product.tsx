import { Button } from "../components/ui/button";
// import { useParams } from "react-router-dom";

export default function Product() {
  // const { id } = useParams();
  // Example: Fetch product by id with TanStack Query (to be implemented)
  // const { data: product, isLoading } = useProductQuery(id);
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 py-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      {/* Render product details here */}
      <Button>Add to Cart</Button>
    </div>
  );
}
