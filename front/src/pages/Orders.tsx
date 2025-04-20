import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function Orders() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 py-8 px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Your Orders</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">All orders go here</TabsContent>
        <TabsContent value="delivered">Delivered orders</TabsContent>
        <TabsContent value="pending">Pending orders</TabsContent>
      </Tabs>
    </div>
  );
}
