import { useParams } from "react-router";
import { NewForm } from "./formNew";

export function Form() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>Viewing form with ID: {id}</p>
      <NewForm Form={undefined} />
    </div>
  );
}
