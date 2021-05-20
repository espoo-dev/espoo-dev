import styled from 'styled-components';
import Link from 'next/link';

export const Nav = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 50px;
  justify-content: space-between;
  padding: 10px 1em;
  background: #ffffff;
`;

export const NavLogo = styled.img`
  height: auto;
  width: 50px;
  margin-right: 10px;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 20px;
  gap: 1em;
  a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
  }
`;

export const StyledLink = styled(Link)``;

export const NavAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background: #b4b4b4;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
`;
