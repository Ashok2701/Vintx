import { CheckCircle, DollarSign, Camera, Package, Star } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Take Great Photos",
    description: "Use natural lighting and show your item from multiple angles. Clear photos get more views!",
    tips: ["Use natural daylight", "Show any flaws honestly", "Include size/fit photos"]
  },
  {
    icon: DollarSign,
    title: "Price Competitively",
    description: "Research similar items to price yours right. Consider the original price and condition.",
    tips: ["Check similar listings", "Factor in condition", "Leave room for negotiation"]
  },
  {
    icon: Package,
    title: "Ship Safely",
    description: "Package items carefully and ship promptly. Good shipping practices build trust.",
    tips: ["Use protective packaging", "Ship within 1-2 days", "Provide tracking info"]
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description: "Respond quickly to messages and provide excellent service to earn great reviews.",
    tips: ["Reply within 24 hours", "Be honest about condition", "Ship quickly"]
  }
];

const benefits = [
  "No listing fees",
  "Secure payments",
  "Buyer protection",
  "Easy shipping labels",
  "24/7 support"
];

export default function SellGuide() {
  return (
    <div className="space-y-8">
      {/* Benefits */}
      <div className="bg-primary/5 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Sell on VintX?</h3>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selling Tips */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Selling Tips</h3>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Success</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$127</div>
            <div className="text-sm text-gray-600">Avg. sale price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">3 days</div>
            <div className="text-sm text-gray-600">Avg. time to sell</div>
          </div>
        </div>
      </div>
    </div>
  );
}