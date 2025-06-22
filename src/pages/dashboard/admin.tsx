import { useState } from "react";
import { UserDashboard } from "./user";
import { Card, Input, Tab, Tabs } from "@heroui/react";
import { BarChart3Icon, Search } from "lucide-react";

const mockTemplates = [
  {
    id: "1",
    title: "Customer Feedback Form",
    author: "John Doe",
    created: "2023-08-01",
    status: "active",
    submissions: 156,
  },
  {
    id: "2",
    title: "Event Registration",
    author: "Jane Smith",
    created: "2023-08-02",
    status: "active",
    submissions: 89,
  },
  // Add more mock templates as needed
];

type DashRoles = "admin" | "user";
type AdminTab = "overview" | "templates" | "users" | "analytics";

export function AdminDashboard() {
  const [tab, setTab] = useState<DashRoles>("admin");
  const [admintab, setAdminTab] = useState<AdminTab>("analytics");

  return (
    <>
      <div className="flex w-full flex-col py-3">
        <h1 className="flex px-1 py-4 text-3xl">Control Panel</h1>
        <Tabs
          aria-label="Options"
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as DashRoles)}
        >
          <Tab key="user" title="User Dashboard">
            <UserDashboard />
          </Tab>
          <Tab key="admin" title="Admin Dashboard">
            <Card>
              <div className="gap- flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <Tabs
                    aria-label="Tabs variants"
                    variant="underlined"
                    selectedKey={admintab}
                    onSelectionChange={(key) => setAdminTab(key as AdminTab)}
                  >
                    <Tab key="overview" title="Overview" />
                    <Tab key="templates" title="Templates" />
                    <Tab key="users" title="Users" />
                    <Tab key="analytics" title="Analytics" />
                  </Tabs>
                </div>
                <div className="flex gap-2 px-2 py-2">
                  <Input startContent={<Search />} placeholder="Search"></Input>
                </div>

                <div>
                  {admintab === "overview" && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Total Templates
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {mockTemplates.length}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Total Users
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {5}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Active Admins
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {2}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Total Submissions
                        </h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {mockTemplates.reduce(
                            (acc, t) => acc + t.submissions,
                            0,
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {admintab === "analytics" && (
                    <div className="py-12 text-center">
                      <BarChart3Icon
                        size={48}
                        className="mx-auto mb-4 text-gray-400 dark:text-gray-600"
                      />
                      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        Analytics Coming Soon
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Detailed analytics and reporting features will be
                        available soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
