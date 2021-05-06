import React from 'react';
import { User } from 'api/models/user';
import { Avatar, Flex, HStack, List, ListItem, Text } from '@chakra-ui/react';

interface TeacherListProps {
  data: User[];
  onSelect: (user: User) => void;
}

export const TeachersList = (props: TeacherListProps) => {
  const { data, onSelect } = props;
  return (
    <List mt="10">
      {data.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => onSelect(item)}
          cursor="pointer"
          mb="4"
        >
          <HStack spacing="4">
            <Avatar
              border="3px solid #27C854"
              src="https://bit.ly/ryan-florence"
              size="md"
            />
            <Flex flexDirection="column" alignItems="unset" spacing="1">
              <Text color="white">{item.email}</Text>
              <Text as="small" color="white">
                English
              </Text>
            </Flex>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
