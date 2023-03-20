import styled from "styled-components";

interface NButtonInterface {
    fonstSize?: string;
    width?: number;
    padding?: string;
    backgroundColor?: string;
}

const Nbutton = styled.button<NButtonInterface>`
    font-size: 1rem;
    color: skyblue;
    background-color: white;
    border-radius: 5px;
    width: 40%;
`

export default Nbutton;