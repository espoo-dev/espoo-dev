import { Button, Flex, Heading, Tooltip } from '@chakra-ui/react';
import { colors } from '@styles/colors';
import { AuthContext } from 'context/auth';
import Link from 'next/link';
import React, { useContext } from 'react';
import { IconType } from 'react-icons';
import { HiClipboardCheck, HiHome } from 'react-icons/hi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import {
  ItemMenu,
  MenuLinkOption,
  MenuList,
  SideMenuContainer,
} from './sidemenu.styles';

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
      icon: HiHome,
      name: 'Home',
      url: '/surveys',
    },
    {
      icon: HiClipboardCheck,
      name: 'Trails',
      url: '/trails',
    },
  ];

  return (
    <SideMenuContainer>
      <Flex
        alignItems="center"
        direction={{
          md: 'column',
          sm: 'row',
        }}
        flex={1}
      >
        <Heading as="h1" fontSize="26" m="0" color={colors.primaryTxt}>
          Espoolingo
        </Heading>

        <MenuList>
          <ItemMenu>
            {menuLinks.map((item) => {
              const { icon: Icon, name, url } = item;

              return (
                <Link href={url} passHref key={url}>
                  <MenuLinkOption>
                    <Icon size={20} />
                    <span>{name}</span>
                  </MenuLinkOption>
                </Link>
              );
            })}
          </ItemMenu>
        </MenuList>
      </Flex>

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
    </SideMenuContainer>
  );
};
