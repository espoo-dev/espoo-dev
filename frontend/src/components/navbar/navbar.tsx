import React, { useContext } from 'react';
import { FlexRow } from '@styles/utils';
import { AuthContext } from 'context/auth';
import { MdPerson } from 'react-icons/md';
import { Nav, NavLogo, NavLinks, NavAvatar, StyledLink } from './navbar.styles';

export const Navbar = () => {
  const context = useContext(AuthContext);
  const { logout } = context;

  const handleLogout = () => {
    logout();
  };

  return (
    <Nav>
      <FlexRow aligment="center">
        <NavLogo src="/vercel.svg" />
        <NavLinks>
          <StyledLink href="/main">Home</StyledLink>
        </NavLinks>
      </FlexRow>

      <NavAvatar onClick={handleLogout} data-testid="logout_btn">
        <MdPerson size={18} color="#fff" />
      </NavAvatar>
    </Nav>
  );
};
