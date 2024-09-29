import styled from "styled-components";

const FormFiled = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
  &:selected {
    background-color: #007bff;
    color: white;
  }
`;
function FormKrokJedna({ register, handleSubmit, errors, onSubmit }) {
  const [selectedType, setSelectedType] = useState(null);
  return (
    <form onSubmit={onSubmit}>
      <FormFiled>
        <Label>Typ Nemovitosti</Label>
        <div>
          <IconButton type="button" className={}
        </div>
      </FormFiled>
    </form>
  );
}

export default FormKrokJedna;
