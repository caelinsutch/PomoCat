import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { RootSiblingParent } from "react-native-root-siblings";

import { ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import theme from "./src/Theme";
import apolloClient from "./src/GraphQL/apolloClient";
import NavigationAuthWrapper from "./src/NavigationAuthWrapper";

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <RootSiblingParent>
        <RecoilRoot>
          <NavigationAuthWrapper />
        </RecoilRoot>
      </RootSiblingParent>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
