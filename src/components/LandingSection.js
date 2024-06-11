import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <Avatar 
    src= "i.pravatar.cc/150?img=7" 
    boxSize="200px"
    alt="Avatar"
    marginBottom="2rem"
    />
    <VStack spacing="0.5rem" align="center">
      <Text fontSize="2xl" fontWeight="bold" paddingBottom={50}>
        {greeting}
      </Text>
      <Heading>
        {bio1}
      </Heading>
      <Heading>
        {bio2}
      </Heading>
    </VStack>
    
    
  </FullScreenSection>
);

export default LandingSection;
