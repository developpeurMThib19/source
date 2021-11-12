import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink
} from "@apollo/client";


const token = "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"

const link = createHttpLink({
  uri: " https://api.github.com/graphql",
  headers: { authorization : `Bearer ${ token }` }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
      query { 
        viewer { 
          login
          avatarUrl(size: 10)
          bio
          commitComments{
            totalCount
          }
          followers {
            totalCount
          }
        }
      }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return(
    <div>
      <div>
        <img src = { data.viewer.avatarUrl }/>
      </div> { data.viewer.login }, { data.viewer.commitComments.totalCount}, { data.viewer.followers.totalCount}
      
  
      
      { data.viewer.bio }
    </div>
  )
}
function App() {
  return (
    <div>
      <h2>Majdi Toumi</h2>
      <ExchangeRates />
    </div>
  );
}

const Hero = () =>{
  return(
      <HeroContainer>
        <HeroBg>
          <VideoBg src="" type="video/mp4" />
        </HeroBg>
        <HeroContent>
          <HeroItems>
            <HeroH1>Nouvelle Destination</HeroH1>
            <HeroP>Nouveau Monde</HeroP>
            
          </HeroItems>
        </HeroContent>
      </HeroContainer>
  )
}
export default Hero

const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
  position: relative;
  margin-top:-100px;
  color: #fff;
`
const HeroBg = styled.div``
const VideoBg = styled.video``
const HeroContent = styled.div``
const HeroItems = styled.div``
const HeroH1 = styled.h1``
const HeroP = styled.p``


render(
  <ApolloProvider client={client}>
    <App />

  </ApolloProvider>,
  document.getElementById("root")
);
if (module.hot) module.hot.accept();