import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function Admin() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 py-8 px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="products">Product management here</TabsContent>
        <TabsContent value="orders">Order management here</TabsContent>
      </Tabs>
    </div>
  );
}
