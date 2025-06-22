import { useParams } from "react-router";

export function Form() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Form Detail</h1>
      <p>Viewing form with ID: {id}</p>
    </div>
  );
}
