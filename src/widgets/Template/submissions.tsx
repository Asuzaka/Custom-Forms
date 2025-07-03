import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useGetTemplateFormsQuery } from "../../shared/api/formsApi";
import { useNavigate } from "react-router";

export function Submissions({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTemplateFormsQuery(id);

  return (
    <div className="mt-2 flex flex-col gap-3 pb-10">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="No submissions found<"
          isLoading={isLoading}
          loadingContent={<Spinner>Loading...</Spinner>}
        >
          {data?.data
            ? data.data.map((each) => (
                <TableRow onClick={() => navigate("/")} key={each._id}>
                  <TableCell>{each.user?.name}</TableCell>
                  <TableCell>
                    {new Date(each.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </div>
  );
}
