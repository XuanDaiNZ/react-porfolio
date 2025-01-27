
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { onOpen } = useAlertContext();
  const { isLoading, response, submit } = useSubmit(onOpen);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Gửi dữ liệu form qua hàm submit từ custom hook useSubmit
      await submit('api/submit', values);
      setHasSubmitted(true);
      setSubmitting(false);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      type: Yup.string().required('Type of enquiry is required'),
      comment: Yup.string().required('Comment is required'),
    }),
  });

  // Đặt lại form nếu phản hồi thành công
  useEffect(() => {
    if (response && response.type === 'success' && hasSubmitted) {
      formik.resetForm();
      setHasSubmitted(false);
    }
  }, [response, hasSubmitted, formik]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={formik.touched.type && formik.errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps('type')}>
                  <option value="" label="Select type" />
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  placeholder="Please enter at least 10 characters"
                  {...formik.getFieldProps('comment')}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
