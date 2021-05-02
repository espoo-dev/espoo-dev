import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { HiAcademicCap } from 'react-icons/hi';
import { Container, MenuHeader, MenuLinkContainer } from './sidemenu.styles';

interface MenuLink {
  url: string;
  name: string;
  icon: IconType;
}

export const Sidemenu = () => {
  const menuLinks: MenuLink[] = [
    {
      icon: HiAcademicCap,
      name: 'Professores',
      url: '/main'
    }
  ];

  return (
    <Container>
      <MenuHeader>
        Espoolingo
      </MenuHeader>
      <MenuLinkContainer>
        {menuLinks.map((item) => {
          const { icon: Icon, name, url } = item;

          return (
            <Link href={url}>
              <Icon />
              {name}
            </Link>
          );
        })}
      </MenuLinkContainer>
    </Container>
  );
};
