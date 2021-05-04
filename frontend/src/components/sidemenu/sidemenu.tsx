import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { HiAcademicCap } from 'react-icons/hi';
import {
  Container,
  MenuHeader,
  MenuLinkContainer,
  MenuLinkOption,
} from './sidemenu.styles';

interface MenuLink {
  url: string;
  name: string;
  icon: IconType;
}

export const Sidemenu = () => {
  const menuLinks: MenuLink[] = [
    {
      icon: HiAcademicCap,
      name: 'Teachers',
      url: '/main',
    },
  ];

  return (
    <Container>
      <MenuHeader>
        <h1>Espoolingo</h1>
      </MenuHeader>
      <MenuLinkContainer>
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
      </MenuLinkContainer>
    </Container>
  );
};
