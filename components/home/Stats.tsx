import { Users, Package, Recycle, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2M+",
    label: "Active Users",
    color: "text-blue-600"
  },
  {
    icon: Package,
    value: "500K+",
    label: "Items Sold",
    color: "text-green-600"
  },
  {
    icon: Recycle,
    value: "1M+",
    label: "Items Saved from Waste",
    color: "text-purple-600"
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Average Rating",
    color: "text-yellow-600"
  }
];

export default function Stats() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of people are already buying and selling sustainably
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}