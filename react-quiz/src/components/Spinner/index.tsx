import { Spinner } from '@chakra-ui/react';

interface AppSpinnerProps {
  thickness: string;
  speed: string;
  color: string;
  emptyColor: string;
  size: string;
}

const AppSpinner = ({
  thickness,
  speed,
  color,
  emptyColor,
  size,
}: AppSpinnerProps) => {
  return (
    <Spinner
      thickness={thickness}
      speed={speed}
      color={color}
      emptyColor={emptyColor}
      size={size}
    />
  );
};
export default AppSpinner;
