import { useColorMode, Flex, Box, useEditable } from "@chakra-ui/react";
import { CodeEditorProvider } from "src/contexts/CodeEditorContext";
import { CodeEditor } from "src/components/CodeEditor";
import { NavBar } from "src/components/NavBar";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const { pasteId } = context.query;
  const res = await fetch(`${process.env.BACKEND_URL}/api/collections/paste/records/${pasteId}`);
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}



export default function Home({data}) {
  const { colorMode } = useColorMode();
  
  return (
    <CodeEditorProvider>
      <Flex h="100vh" w="100vw">
        <NavBar/>
        <Box
          flex={1}
          style={{
            overflow: "auto",
          }}
        >
          <CodeEditor editable={false} data={data?.field} width="100%" height="100vh" viewMode={colorMode} />
        </Box>
      </Flex>
    </CodeEditorProvider>
  );
}
