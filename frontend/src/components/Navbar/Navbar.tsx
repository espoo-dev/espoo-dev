import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import { MdClose, MdMenu } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['blue.500', 'blue.500', 'transparent', 'transparent']}
      color={['white', 'white', 'blue.700', 'blue.700']}
    >
      <Box w="100px" color={['white', 'white', 'blue.500', 'blue.500']}>
        <Link href="/">
          <Text fontSize="lg" fontWeight="bold">
            Espoo
          </Text>
        </Link>
      </Box>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
        {isOpen ? <MdClose size="24px" /> : <MdMenu size="24px" />}
      </Box>
      <MenuLinks isOpen={isOpen} />
    </Flex>
  );
};

const MenuLinks = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
    flexBasis={{ base: '100%', md: 'auto' }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/how">How It works </MenuItem>
      <MenuItem to="/signup">
        <Button
          size="sm"
          rounded="md"
          color={['blue.500', 'blue.500', 'white', 'white']}
          bg={['white', 'white', 'blue.500', 'blue.500']}
          _hover={{
            bg: ['blue.100', 'blue.100', 'blue.600', 'blue.600'],
          }}
        >
          Create Account
        </Button>
      </MenuItem>
    </Stack>
  </Box>
);

const MenuItem = ({ children, to = '/', ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

export default Navbar;
