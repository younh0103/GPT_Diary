import { useState } from 'react';
import { CallGPT } from './api/gpt';
import DiaryInput from './components/DiaryInput';
import styled from 'styled-components';
import logo from './assets/logo.png';
import DiaryDisplay from './components/DiaryDisplay';
import { message } from "antd";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async(userInput) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  }

  return (
    <AppContainer>
      {contextHolder}
      <AppTitle>
        심리상담사 GPT, AI 회고록 <img width={"100px"} src={logo}/> 
      </AppTitle>
      <DiaryInput messageApi={messageApi} isLoading={isLoading} onSubmit={handleSubmit} />
      <div id='capture'>
        {data?.title != null ? (<DiaryDisplay data={data} />) : ("")}
      </div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Serif KR";
`;
