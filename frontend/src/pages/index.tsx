import Link from 'next/link';
import { MainPage, BodyIndex, Header, ButtonLoginHeader,MainTextIndex, SubtitleIndex, LeftContainerIndex, RightContainerIndex, ButtonLogin, ContainerImg, ImgButtonLogin, LoginIndex, BottomIndex, MainTextBottom, ContainerBottom, MainTextContainer ,SubtitleContainer  } from '@styles/index.styles';
import { flexbox } from '@chakra-ui/styled-system';
import { FiSend, FiArrowUpCircle, FiRefreshCw, FiGithub } from 'react-icons/fi';
import { GiLaurelsTrophy } from 'react-icons/gi'

const Home = () => (
  <MainPage>
    <Header>
      <img src="/assets/logo.png" alt="" />
      <Link href='/login'>
        <button>
          <ButtonLoginHeader>
            <span>Login/Sign Up</span>
          </ButtonLoginHeader>
        </button>
      </Link>
    </Header>
    <BodyIndex>
      <LeftContainerIndex>
        <MainTextIndex>
          <span>DARE <br /> TO REACH <br />HIGHER</span>
        </MainTextIndex>
        <SubtitleIndex>
          <span>At expoolingo we drive your growth through knowledge.<br /> Get access to exclusive content for free.</span>
        </SubtitleIndex>
        <Link href="/login">
         <button>
          <LoginIndex>
            <ImgButtonLogin>
              <FiSend />
            </ImgButtonLogin>
            <ButtonLogin>
            <span>Start Now</span>
            </ButtonLogin>
          </LoginIndex>
          </button> 
        </Link>
      </LeftContainerIndex>
      <RightContainerIndex>
        <ContainerImg>
          <img src="assets/img-index.png" alt="" />
        </ContainerImg>
      </RightContainerIndex>
    </BodyIndex>
    <BottomIndex>
        <MainTextBottom>
          Core <br/>Values <br/>We Live By
          < GiLaurelsTrophy />
        </MainTextBottom>
        <ContainerBottom>
          <MainTextContainer>
            Upgrade your Skills
            < FiArrowUpCircle />
          </MainTextContainer>
          <SubtitleContainer>
            You can answer surveys of all teacher of world
          </SubtitleContainer>
        </ContainerBottom>
        <ContainerBottom>
          <MainTextContainer>
            Updated Surveys
            < FiRefreshCw />
          </MainTextContainer>
          <SubtitleContainer>
            The platform is updated constantly
          </SubtitleContainer>
        </ContainerBottom>
        <ContainerBottom>
          <MainTextContainer>
            Open Source
            < FiGithub />
          </MainTextContainer>
          <SubtitleContainer>
          This projects is free and you can improve the plataform with only your feedbacks.
          <Link href= "https://github.com/espoo-dev/espoo-dev/issues/new">
            <button style={{color: '#33b6a6', fontWeight: 'bold'}}> 
              Click here and contribute! 
            </button>
          </Link>
          </SubtitleContainer>
        </ContainerBottom>
    </BottomIndex>
  </MainPage>
);

export default Home;
