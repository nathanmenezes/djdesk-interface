type Props = {
  errors?: string[];
};

export function FieldError({ errors }: Props) {
  if (!errors?.length) return null;

  return (
    <ul className="mt-1 space-y-0.5">
      {errors.map((error) => (
        <li
          key={error}
          className="text-xs"
          style={{ color: "oklch(0.72 0.18 25)" }}
        >
          {error}
        </li>
      ))}
    </ul>
  );
}
