import { Button, Heading, Tooltip } from '@chakra-ui/react';
import { AuthContext } from 'context/auth';
import Link from 'next/link';
import React, { useContext } from 'react';
import { IconType } from 'react-icons';
import { HiAcademicCap, HiClipboardCheck } from 'react-icons/hi';
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
    <SideMenuContainer>
      <Heading as="h1" color="white" fontSize="26" m="0">
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
      </MenuList>
    </SideMenuContainer>
  );
};
