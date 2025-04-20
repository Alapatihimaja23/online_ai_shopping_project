import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/./ui/./card";

const mockSuggestions = [
  
  {
    id: 2,
    name: "Smart Fitness Band",
    description: "Track your health metrics, workouts, and get real-time alerts.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    description: "Bring the theatre home with a stunning 55-inch 4K display and smart features.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AISuggest() {
  const [suggestions, setSuggestions] = useState(mockSuggestions);

  const getNewSuggestions = () => {
    alert("Fetching suggestions from AI...");
    // Replace with Gemini API or backend integration
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          ✨ AI Product Suggestions
        </h1>
        <div className="flex justify-center mb-6">
          <Button onClick={getNewSuggestions}>Get New Suggestions</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((product) => (
            <Card key={product.id} className="rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
