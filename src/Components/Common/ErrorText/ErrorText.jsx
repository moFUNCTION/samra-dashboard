import { Box, Text } from "@chakra-ui/react";
import styles from "./styles.module.css";
export const ErrorText = ({ errors, path, ...rest }) => {
  const errorBoundary = errors && errors[path];
  return (
    errorBoundary && (
      <Box h="fit-content" overflow="hidden" {...rest}>
        <Text
          key={errorBoundary}
          className={styles["error-text"]}
          color="red.600"
        >
          {errorBoundary?.message}
        </Text>
      </Box>
    )
  );
};
