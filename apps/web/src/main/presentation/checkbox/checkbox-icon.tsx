import { CheckSquare, Square } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type CheckboxIconProps = InputHTMLAttributes<HTMLInputElement>;

export function CheckboxIcon({
  checked,
  className,
  ...props
}: CheckboxIconProps) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only"
        {...props}
      />
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted ${className ?? ""}`}
      >
        {checked ? <CheckSquare size={24} /> : <Square size={24} />}
      </span>
    </label>
  );
}
