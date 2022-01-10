export const filterAriaProps = (
  props: Record<string, string>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(props).filter(([key]) => key.startsWith('aria-'))
  );
