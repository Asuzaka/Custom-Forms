import { useParams } from "react-router";
import { NewTemplate } from "./newTemplate";

export function Template() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>Viewing form with ID: {id}</p>
      <NewTemplate Form={undefined} />
    </div>
  );
}
