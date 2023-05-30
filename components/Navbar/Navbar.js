import Link from "next/link";
import { useRouter } from "next/router";
import { SidebarData } from "./SidebarData";
import styled from "styled-components";
import { theme } from "../../styles/defaultTheme";
import Image from "next/image";

import { useAuth } from "../../useAuth";

const Navbar = () => {
  const logo = require("./logo.png");
  const location = useRouter();
  const user = useAuth();

  return (
    <>
      <Container className="navbarContainer">
        <div className="navbar">
          <TopSection>
            <Link href="/">
              <Image src={logo} width={230} height={70} alt="personIcon" />
            </Link>
          </TopSection>
          <NavMenuItems>
            {SidebarData.map((item, index) => {
              if (item.title === "Lists" && !user) {
                return null; // Skip rendering "Lists" item when user is not logged in
              }

              return (
                <NavLink
                  key={index}
                  className={
                    location.pathname === item.path
                      ? "active-link"
                      : "nonactive-link"
                  }
                >
                  <Link href={item.path}>
                    <MenuText>{item.title}</MenuText>
                  </Link>
                </NavLink>
              );
            })}
          </NavMenuItems>
        </div>
      </Container>
    </>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  align-items: center;
  overflow: hidden;
  width: 600px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 ${theme.spacings.px20};
`;

const NavMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 ${theme.spacings.px20};
  width: 300px;
  align-items: start;
`;

const NavLink = styled.li`
  padding: ${theme.spacings.px10} 0;
  transition: all 0.3s;
`;

const MenuText = styled.span`
  font-weight: ${theme.fontWeight.w500};
  font-size: ${theme.fontSizes.px36};
  transition: all 0.3s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);

  &:hover {
  }
`;
