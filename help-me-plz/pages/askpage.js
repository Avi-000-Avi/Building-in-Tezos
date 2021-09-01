import styled from "styled-components";

const GridStyles = styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(420px,1fr));
    grid-gap:2rem;
`;


export default function ask(){
    return <GridStyles>
        Questions adfasdf
    </GridStyles>
}