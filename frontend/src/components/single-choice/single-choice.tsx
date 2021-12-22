export interface SingleChoiceProps {
  options: {
    id: number;
    name: string;
  }[];
}

const SingleChoice = (props: SingleChoiceProps) => {
  const { options } = props;
  return (
    <div>
      {options &&
        options.map((option) => {
          return (
            <div>
              <span>{option.name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default SingleChoice;
