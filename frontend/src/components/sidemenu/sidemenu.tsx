import { Button, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import { colors } from '@styles/colors';
import { AuthContext } from 'context/auth';
import Link from 'next/link';
import React, { useContext } from 'react';
import { IconType } from 'react-icons';
import { HiClipboardCheck, HiHome, HiLogout } from 'react-icons/hi';
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
        <Flex alignItems="center">
          <Image src="/assets/logo.png" alt="main_logo" h="40px" w="40px" />
          <Heading
            display={{
              md: 'block',
              sm: 'none',
              xs: 'none',
            }}
            as="h1"
            fontSize="20"
            ml="4"
            color={colors.primaryTxt}
          >
            Espoolingo
          </Heading>
        </Flex>

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
          rounded="lg"
          p={{
            base: 0,
            md: '5px 10px',
            sm: 0,
          }}
          bg="teal.400"
          colorScheme="teal"
          w={{
            base: 'full',
            md: 'full',
            sm: '30px',
            xs: '30px',
          }}
          onClick={logout}
          data-testid="logout_button"
        >
          <HiLogout color="white" />
          <Text
            w="full"
            as="span"
            display={{
              base: 'block',
              md: 'block',
              sm: 'none',
              xs: 'none',
            }}
          >
            Log out
          </Text>
        </Button>
      </Tooltip>
    </SideMenuContainer>
  );
};
