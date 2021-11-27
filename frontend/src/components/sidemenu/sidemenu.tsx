import React, { useContext } from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, List, Tooltip } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { HiAcademicCap, HiClipboardCheck } from 'react-icons/hi';
import { AuthContext } from 'context/auth';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { MenuLinkOption } from './sidemenu.styles';

interface MenuLink {
  url: string;
  name: string;
  icon: IconType;
}

export const Sidemenu = () => {
  const context = useContext(AuthContext);
  const { logout } = context;

  const menuLinks: MenuLink[] = [
    {
      icon: HiAcademicCap,
      name: 'Teachers',
      url: '/main',
    },
    {
      icon: HiClipboardCheck,
      name: 'Surveys',
      url: '/surveys',
    },
  ];

  return (
    <Flex
      flexDirection="column"
      h="100vh"
      w="250px"
      p="2em"
      borderRight="1px solid"
    >
      <Heading as="h1" color="white" fontSize="26" m="0">
        Espoolingo
      </Heading>

      <Flex h="full" flexDirection="column" justifyContent="space-between">
        <List marginY="20">
          {menuLinks.map((item) => {
            const { icon: Icon, name, url } = item;

            return (
              <Link href={url} passHref key={url}>
                <MenuLinkOption>
                  <Icon size={20} />
                  {name}
                </MenuLinkOption>
              </Link>
            );
          })}
        </List>

        <Tooltip label="Logout">
          <Button
            p={0}
            m={0}
            rounded="lg"
            bg="teal.400"
            colorScheme="teal"
            w="30px"
            onClick={logout}
            data-testid="logout-button"
          >
            <RiLogoutCircleLine color="white" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
