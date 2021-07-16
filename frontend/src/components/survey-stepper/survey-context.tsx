import { createContext, useState } from 'react';

interface Answer {
  id: number;
  answer: any;
}

interface SurveyContextProps {
  answers: Record<number, string>;
  updateAnswers: (answer: Answer) => void;
}

export const SurveyContext = createContext({} as SurveyContextProps);

export const SurveyContextProvider = ({ children }) => {
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const updateAnswers = ({ id, answer }: Answer) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  return (
    <SurveyContext.Provider value={{ answers, updateAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};
