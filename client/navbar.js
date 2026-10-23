import React from "react";
import styled from "styled-components";

import tpLogo from "../src/images/logo-trepogen.png";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 10px 10px;
`;

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    opacity: 0.85;
  }
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
`;

const BrandText = styled.div`
  min-width: 0;
  flex: 1;
`;

const BrandTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
`;

export default function TrepoGenNavBar({
  narrativeTitle,
  sidebar,
  width,
  theme
}) {
  if (!sidebar) return null;

  const textColor = theme?.color || "#333";

  return (
    <Container
      style={{
        color: textColor,
        maxWidth: width || "100%"
      }}
    >
      <BrandLink href="/" title="Home">
        <Logo src={tpLogo} alt="tpallidum.org logo" />

        <BrandText>
          <BrandTitle>tpallidum.org</BrandTitle>
        </BrandText>
      </BrandLink>
    </Container>
  );
}
