import { Spinner } from "@heroui/react";
import { useGetStatisticsQuery } from "../../shared/api/searchApi";

export function Overview() {
  const { data, isLoading } = useGetStatisticsQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  const array = [
    { name: "Total templates", number: data?.data.totalTemplates || 0 },
    { name: "Users", number: data?.data.totalUsers || 0 },
    { name: "Admins", number: data?.data.totalAdmins || 0 },
    { name: "Total submissions", number: data?.data.totalSubmissions || 0 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 px-2 py-2 md:grid-cols-2 lg:grid-cols-4">
      {array.map((each) => (
        <div
          key={each.name}
          className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
        >
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {each.name}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {each.number}
          </p>
        </div>
      ))}
    </div>
  );
}
