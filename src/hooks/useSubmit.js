import { useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This is a custom hook that can be used to submit a form and simulate an API call
 * It uses Math.random() to simulate a random success or failure, with 50% chance of each
 */
const useSubmit = (onOpen) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (url, data) => {
    const random = Math.random();
    setLoading(true);
    try {
      await wait(2000);
      if (random < 0.5) {
        throw new Error("Something went wrong");
      }
      const successResponse = {
        type: 'success',
        message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`,
      };
      setResponse(successResponse);
      onOpen(successResponse.type, successResponse.message);
    } catch (error) {
      const errorResponse = {
        type: 'error',
        message: 'Something went wrong, please try again later!',
      };
      setResponse(errorResponse);
      onOpen(errorResponse.type, errorResponse.message);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
}

export default useSubmit;
