import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  height: 48px; // altura fixa
  background: linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 12px rgba(30, 41, 59, 0.07);
  padding: 0 16px;
  position: fixed;
  bottom: 0px;
`;

const FooterText = styled.p`
  font-size: 15px;
  color: #334155;
  margin: 0;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText>© 2025 - Sistema de Recados by Willy 🚀</FooterText>
    </FooterContainer>
  );
}
