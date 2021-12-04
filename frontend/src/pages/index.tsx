import Link from 'next/link';
import { Container } from '@styles/home.styles';
import { FlexColumn } from '@styles/utils';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Select } from '@chakra-ui/select';
import { FormSelect } from '@components/form-select/form-select';

const Home = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  const animalsOptions = [
    { value: '', label: 'Select animal' },
    { value: '1', label: 'Dog' },
    { value: '2', label: 'Cat' },
  ];

  return (
    <Container>
      <FlexColumn>
        <h1>Landing page bonita aqui</h1>
        <Link href="/login">Login</Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            register={register}
            keyRegister="animal"
            label="Animal"
            options={animalsOptions}
            errors={errors}
            validations={{ required: 'animal is required!' }}
          />

          <FormSelect
            register={register}
            keyRegister="test"
            label="teste"
            options={animalsOptions}
            errors={errors}
          />

          {/* <FormControl isInvalid={errors.animal}>
            <FormLabel htmlFor="animal">animal</FormLabel>
            <Select
              {...register('animal', {
                required: 'Animal is required!',
              })}
            >
              {animalsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.animal?.message}</FormErrorMessage>
          </FormControl> */}

          {/* <FormControl isInvalid={errors.animal}>
            <FormLabel htmlFor="animal">animal</FormLabel>
            <Select
              {...register('animal', {
                required: 'select option',
              })}
              mt={20}
              mb={20}
            >
              {animalsOptions.map((animal) => {
                return (
                  <option key={animal.value} value={animal.value}>
                    {animal.label}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>a{errors}b</FormErrorMessage>
          </FormControl> */}

          {/* <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl> */}
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </FlexColumn>
    </Container>
  );
};

export default Home;
