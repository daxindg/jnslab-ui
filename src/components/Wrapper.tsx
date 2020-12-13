import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  varient?: 'small' | 'regular' | 'large';
}

export const Wrapper: React.FC<WrapperProps> = ({children, varient='large'}) => {
  return (
    <Box mt={8} mx="auto" maxW={varient === 'large' ? '1300px' : varient === 'regular' ? '800px' : '450px'} w="100%">
      {children}
    </Box>
  );
}