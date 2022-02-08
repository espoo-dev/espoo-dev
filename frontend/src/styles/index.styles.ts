import styled from 'styled-components';

export const MainPage = styled.div`
    background-color: #edece5;
    padding: 10px 70px 0px 70px;
    font-family:  -apple-system, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    
`;
export const BodyIndex = styled.div`
    height:auto;
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
`;
export const LeftContainerIndex = styled.div`
    width: 50%;
`; 
export const RightContainerIndex = styled.div`
    width: 50%;
`; 
export const ContainerImg = styled.div`
    height: 400px;
    background-color: #e2d8ce;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    img{
        height: 400px;
        padding-bottom: 17px;
    }
`;
export const Header = styled.div`
    height: auto;
    border-bottom: solid 2px #f5f5f1;
    display: flex;
    justify-content: space-between;
    img{
        height: 90px;
        margin-left: -32px;
    }
`;
export const ButtonLoginHeader = styled.div`
    background-color: #33b6a6;
    border-radius: 9px;
    padding: 10px 20px 10px 20px;
    color: #fff;

`;
export const MainTextIndex = styled.div`
    color: #202229;
    font-size: 90px;
    text-align: left;
    line-height: 1.1;
`;
export const SubtitleIndex = styled.div`
    color: #202229;
    font-size: 20px;
    margin-top: 30px;
`;
export const LoginIndex = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
    height: 45px;
    margin-top: 35px;
`;
export const ButtonLogin = styled.div`
    color: black;
    background-color: white;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 9px 9px 0px;
    font-size: 20px;
`;
export const ImgButtonLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    background-color: #24c7d7;
    border-radius: 9px 0px 0px 9px;
    color: #fff;
    svg{
        width: 50%;
        height: 50%;
    }
`;
export const BottomIndex = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    margin-top: 50px;
    padding: 25px;
    border-radius: 13px 13px 0px 0px;
`;
export const MainTextBottom = styled.div`
    width: 25%;
    font-weight: bold;
    font-size: 25px;
    display: flex;
    svg {
        margin-left: 10%;
        height: 50%;
        width: 50%;
        color: #33b6a6;

    };
`;
export const ContainerBottom = styled.div`
    padding: 20px;
    border-right: solid #edece5 2.5px;
    width: 25%;
    :last-child{
        border-right: none;
    }

`;
export const MainTextContainer = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    svg{
        margin-left:45%;
        color: #33b6a6;
        width: 9%;
        height: 9%;
    }
`;
export const SubtitleContainer = styled.div`
    padding-top: 10px;
    font-size: 12px;
`;

