import styled from 'styled-components';

const AddButton = styled.button`
  padding: .5rem;
  font-size: 1.5rem;
  background-color: inherit;
  border: 1px solid ${props => props.disable ? 'grey' : 'black'};
  color: ${props => props.disable ? 'grey' : 'black'};
  border-radius: 5px;
  display: block;
`

export default AddButton;