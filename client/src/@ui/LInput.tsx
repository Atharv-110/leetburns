import { Input } from "pixel-retroui";
import React from "react";

interface LInputProps {
  icon?: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LInput = ({
  icon,
  placeholder,
  className,
  onChange,
  onIconClick,
  onKeyDown,
}: LInputProps) => {
  return (
    <Input
      icon={icon}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      borderColor="#1f2937"
      onIconClick={onIconClick}
      onKeyDown={onKeyDown}
    />
  );
};

const MemoizedLInput = React.memo(LInput);
export default MemoizedLInput;
