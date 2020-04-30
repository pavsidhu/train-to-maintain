import React from "react"
import styled from "styled-components"

import { colors, size } from "../styles"
import { graphql, useStaticQuery } from "gatsby"
import InstagramIcon from "../images/icons/instagram.svg"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .       ."
    ". title   ."
    ". .       ."
    ". handle  ."
    ". .       ."
    ". content ."
    ". .       .";
  align-items: center;
  justify-items: center;
  grid-template-rows: 24px auto 8px auto 24px auto 24px;
  grid-template-columns: 24px 1fr 24px;

  @media (min-width: ${size.medium}) {
    justify-items: initial;
    grid-template-rows: 64px auto 16px auto 24px;
    grid-template-columns: 24px 1fr 1fr 24px;
    grid-template-areas:
      ". .       .       ."
      ". title   handle  ."
      ". .       .       ."
      ". content content ."
      ". .       .       .";
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  grid-area: title;
`

const TitleText = styled.h3`
  margin-left: 16px;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-size: 2.8rem;
  font-weight: 300;
  color: ${colors.black};
`

const Handle = styled.h4`
  grid-area: handle;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 2rem;
  font-weight: 300;
  color: ${colors.black};

  @media (min-width: ${size.medium}) {
    justify-self: end;
  }
`

const Posts = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${size.medium}) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const PostImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
`

export default function Instagram() {
  const getInstagramPosts = useStaticQuery(graphql`
    query GetInstagramPosts {
      allInstaNode(limit: 6, sort: { order: DESC, fields: timestamp }) {
        edges {
          node {
            id
            caption
            mediaType
            preview
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Title>
        <InstagramIcon />
        <TitleText>My Instagram</TitleText>
      </Title>

      <Handle>
        <a href="https://instagram.com/traintomaintain">@traintomaintain</a>
      </Handle>
      <Posts>
        {getInstagramPosts.allInstaNode.edges.map(({ node }) => (
          <a href={`https://instagram.com/p/${node.id}`} key={node.id}>
            <PostImage src={node.preview} alt={node.caption} />
          </a>
        ))}
      </Posts>
    </Container>
  )
}
