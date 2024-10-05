import { useNavigate } from "react-router-dom";
import PageContainer from "../ui/PageContainer";
import { PrimaryButton } from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80vh;
  margin-top: 14rem;
  margin-bottom: 4rem;
  gap: 0;
`;
function HomePage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <HomeContainer>
        <Heading>Zadejte svou poptávku</Heading>
        <PrimaryButton
          onClick={() => {
            navigate("/chci-nabidku");
          }}
        >
          Chci nabídku
        </PrimaryButton>
      </HomeContainer>
    </PageContainer>
  );
}

export default HomePage;
