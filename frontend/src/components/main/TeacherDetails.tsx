import React from 'react';
import { Avatar, AvatarBadge, Button, VStack, Text } from '@chakra-ui/react';
import { User } from 'api/models/user';
import { HiOutlineX } from 'react-icons/hi';

interface TeacherDetailsProps {
  data: User;
  onClickFollow?: () => void;
  onClickClose?: () => void;
}

export const TeacherDetails = (props: TeacherDetailsProps) => {
  const { data, onClickClose, onClickFollow } = props;
  return (
    <VStack spacing="4" position="relative">
      <Button
        bg="transparent"
        position="absolute"
        colorScheme="whiteAlpha"
        right="0"
        top="0"
        size="sm"
        p={0}
        m={0}
        onClick={onClickClose}
        title="close"
      >
        <HiOutlineX />
      </Button>
      <Avatar
        border="3px solid #27C854"
        src="https://bit.ly/ryan-florence"
        size="2xl"
      >
        <AvatarBadge
          border="none"
          boxSize="30px"
          right="10px"
          bottom="10px"
          bg="#27C854"
        />
      </Avatar>

      <VStack spacing="1">
        <Text
          data-testid="user_email"
          fontWeight="bold"
          fontSize="lg"
          color="white"
        >
          {data?.email || '---'}
        </Text>
        <Text fontSize="md" color="white">
          English
        </Text>
      </VStack>

      <Button
        w="150px"
        rounded="full"
        bg="#F5C65A"
        color="black"
        onClick={onClickFollow}
      >
        Follow
      </Button>
    </VStack>
  );
};
