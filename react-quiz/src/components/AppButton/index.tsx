import { Button } from '@chakra-ui/react';

interface AppButtonProps {
  value: string;
  colorScheme: string;
  variant: string;
  className?: string;
  disabled?: boolean;
  width?: string;
  onClick: (e?: React.MouseEvent) => void;
}

const AppButton: React.FC<AppButtonProps> = ({
  value,
  colorScheme,
  variant,
  className,
  disabled,
  width,
  onClick,
}) => {
  return (
    <Button
      colorScheme={colorScheme}
      variant={variant}
      className={className}
      isDisabled={disabled}
      w={width}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default AppButton;
