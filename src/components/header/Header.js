import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #babfc5ff 0%, #dbe9f8ff 100%);
  color: white;
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
  top: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  color: black;
  box-shadow: 0 -2px 12px rgba(30, 41, 59, 0.07);
  align-items: center;
  justify-content: space-evenly;
`;

const HeaderTitle = styled.h1`
  font-size: 23px;
  font-weight: bold;
  font-family: 'Segoe UI', sans-serif;
`;

const Input = styled.input`
width: 300px;
height: 20px;
border-radius: 8px;
padding: 10px;
`

function Header() {

  return (
    <HeaderContainer>
      <HeaderTitle>Welcome to system</HeaderTitle>
      <Input placeholder='Filtrar recado'></Input>
    </HeaderContainer>
  )
}

export default Header;
