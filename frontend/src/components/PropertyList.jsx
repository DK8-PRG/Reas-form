import PropTypes from "prop-types";
import {
  HomeIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import PropertyTypeOption from "./PropertyOption";
import styled from "styled-components";

function getIconComponent(type) {
  switch (type) {
    case "Byt":
      return BuildingOfficeIcon;
    case "Celý dům":
      return HomeModernIcon;
    case "Pozemek":
      return MapIcon;
    default:
      return HomeIcon;
  }
}

const PropertieList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  height: 10rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    height: 8rem;
    gap: 0.5rem;

    & > button {
      transform: scale(0.8);
    }
  }

  @media (max-width: 480px) {
    height: 6rem;
    gap: 0.25rem;

    & > button {
      transform: scale(0.6);
    }
  }
`;

function PropertyList({ propertyTypes, onSelectType, selectedType }) {
  return (
    <PropertieList>
      {propertyTypes.map((type) => {
        const IconComponent = getIconComponent(type);
        return (
          <PropertyTypeOption
            key={type}
            type={type}
            IconComponent={IconComponent}
            onClick={onSelectType}
            isSelected={selectedType === type}
          />
        );
      })}
    </PropertieList>
  );
}

PropertyList.propTypes = {
  propertyTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectType: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
};

export default PropertyList;
