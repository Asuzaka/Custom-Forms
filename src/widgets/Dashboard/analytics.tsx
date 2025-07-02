import { BarChart3Icon } from "lucide-react";

export function Analytics() {
  return (
    <div className="py-12 text-center">
      <BarChart3Icon
        size={48}
        className="mx-auto mb-4 text-gray-400 dark:text-gray-600"
      />
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        Analytics Coming Soon
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Detailed analytics and reporting features will be available soon.
      </p>
    </div>
  );
}
