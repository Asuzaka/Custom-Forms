import { useState } from "react";
import { UserDashboard } from "./User";
import { Card, Tab, Tabs } from "@heroui/react";
import { Analytics, Overview, TemplateTable, UsersTable } from "../../widgets";

type DashRoles = "admin" | "user";
type AdminTab = "overview" | "templates" | "users" | "analytics";

export function AdminDashboard() {
  const [tab, setTab] = useState<DashRoles>("admin");
  const [admintab, setAdminTab] = useState<AdminTab>("overview");

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

                <div>{admintab === "overview" && <Overview />}</div>

                <div>{admintab === "analytics" && <Analytics />}</div>

                <div>{admintab === "users" && <UsersTable />}</div>

                <div>{admintab === "templates" && <TemplateTable />}</div>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
