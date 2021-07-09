import React from 'react';
import { User } from 'api/models/user';
import { Avatar, Flex, HStack, List, ListItem, Text } from '@chakra-ui/react';

interface TeacherListProps {
  data: User[];
  onSelect: (user: User) => void;
}

export const TeachersList = (props: TeacherListProps) => {
  const { data, onSelect } = props;
  if (!data) {
    throw new Error('data is required');
  }

  if (!onSelect) {
    throw new Error('onSelect is required');
  }

  return (
    <List mt="10" h="full">
      {data && data.length ? (
        data.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => onSelect(item)}
            data-testid={item.email}
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
        ))
      ) : (
        <Flex
          h="full"
          w="full"
          alignItems="center"
          justifyContent="center"
          p="4"
        >
          <Text color="whiteAlpha.700">No data to display...</Text>
        </Flex>
      )}
    </List>
  );
};
