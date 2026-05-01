type Props = {
  errors?: string[];
};

export function FieldError({ errors }: Props) {
  if (!errors?.length) return null;

  return (
    <ul className="mt-1 space-y-0.5">
      {errors.map((error) => (
        <li key={error} className="text-xs text-red-500">
          {error}
        </li>
      ))}
    </ul>
  );
}
