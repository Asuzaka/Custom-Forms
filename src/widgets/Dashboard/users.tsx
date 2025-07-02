import { useEffect, useState } from "react";
import {
  useBlockUsersMutation,
  useChangeToAdminMutation,
  useChangeToUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUnBlockUsersMutation,
} from "../../shared/api/usersApi";
import type { User } from "../../entities";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  type Selection,
  Button,
  Tooltip,
  Spinner,
} from "@heroui/react";
import {
  Ban,
  Search,
  ShieldCheck,
  ShieldUser,
  Trash2,
  User as UserIcon,
} from "lucide-react";

function getSelectedUserIds(
  selectedKeys: Selection,
  allUsers: User[],
): string[] {
  if (selectedKeys === "all") {
    return allUsers.map((user) => user._id);
  }
  return Array.from(selectedKeys as Set<string>);
}

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "role", label: "Role" },
];

export function UsersTable() {
  const [query, setQuery] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const { data, isLoading } = useGetAllUsersQuery();
  const [blockUsers] = useBlockUsersMutation();
  const [unBlockUsers] = useUnBlockUsersMutation();
  const [changeToAdmin] = useChangeToAdminMutation();
  const [changeToUser] = useChangeToUserMutation();
  const [deleteUsers] = useDeleteUserMutation();
  const [rows, setRows] = useState<User[]>([]);

  function handleBlock() {
    const userIds = getSelectedUserIds(selectedKeys, rows);
    if (userIds.length === 0) return;
    blockUsers({ users: userIds });
    setSelectedKeys(new Set([]));
  }

  function handleUnblock() {
    const userIds = getSelectedUserIds(selectedKeys, rows);
    if (userIds.length === 0) return;
    unBlockUsers({ users: userIds });
    setSelectedKeys(new Set([]));
  }

  function handleAdmin() {
    const userIds = getSelectedUserIds(selectedKeys, rows);
    if (userIds.length === 0) return;
    changeToAdmin({ users: userIds });
    setSelectedKeys(new Set([]));
  }

  function handleUser() {
    const userIds = getSelectedUserIds(selectedKeys, rows);
    if (userIds.length === 0) return;
    changeToUser({ users: userIds });
    setSelectedKeys(new Set([]));
  }

  function handleDelete() {
    const userIds = getSelectedUserIds(selectedKeys, rows);
    if (userIds.length === 0) return;
    deleteUsers({ users: userIds });
    setSelectedKeys(new Set([]));
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    const timeout = setTimeout(() => {
      // Replace this with your real API call
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!data) return;
    setRows(data?.data.users);
  }, [data]);

  return (
    <>
      <div className="flex gap-2 px-2 py-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startContent={<Search />}
          placeholder="Search"
        ></Input>
      </div>

      <div className="flex items-center justify-between px-3 py-3">
        <h1 className="text-lg font-bold">Actions</h1>
        <div className="flex gap-1">
          <Tooltip content="Unblock user">
            <Button onPress={handleUnblock} size="sm" color="success">
              <ShieldCheck color="white" />
            </Button>
          </Tooltip>
          <Tooltip content="Change role to Admin">
            <Button onPress={handleAdmin} size="sm" color="warning">
              <ShieldUser color="white" />
            </Button>
          </Tooltip>
          <Tooltip content="Change role to User">
            <Button onPress={handleUser} size="sm" color="warning">
              <UserIcon color="white" />
            </Button>
          </Tooltip>
          <Tooltip content="Delete user">
            <Button onPress={handleDelete} size="sm" color="danger">
              <Trash2 />
            </Button>
          </Tooltip>
          <Tooltip content="Block user">
            <Button onPress={handleBlock} size="sm" color="danger">
              <Ban />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table
        aria-label="Controlled table example with dynamic content"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No users to display."}
          isLoading={isLoading}
          items={rows}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: User) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
