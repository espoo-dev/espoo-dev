import React from 'react';
import { Avatar, AvatarBadge, Button, VStack, Text } from '@chakra-ui/react';
import { User } from 'api/models/user';

interface TeacherDetailsProps {
  data: User;
  onClickFollow?: () => void;
}

export const TeacherDetails = (props: TeacherDetailsProps) => {
  const { data, onClickFollow } = props;
  return (
    <VStack spacing="4">
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
        <Text fontWeight="bold" fontSize="lg" color="white">
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
