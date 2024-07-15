import { Input } from "pixel-retroui";

interface LInputProps {
  icon?: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LInput = ({ icon, placeholder, className, onChange }: LInputProps) => {
  return (
    <Input
      icon={icon}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  );
};

export default LInput;
