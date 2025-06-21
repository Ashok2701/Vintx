import { Search, MessageCircle, Package, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Find unique pre-loved items from thousands of sellers worldwide",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: MessageCircle,
    title: "Connect & Chat",
    description: "Message sellers directly to ask questions or negotiate prices",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Package,
    title: "Buy Securely",
    description: "Complete your purchase with buyer protection and secure payment",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Star,
    title: "Rate & Review",
    description: "Share your experience and help build our trusted community",
    color: "bg-yellow-100 text-yellow-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shopping sustainably has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}