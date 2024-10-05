import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import KrajPath from "./KrajPath";
import KrajLabel from "./KrajLabel";
import { DataContext } from "../context/DataContext";
import Heading from "../ui/Heading";

const StyledSvg = styled.svg`
  width: 100%;
  height: 40vh;
  max-width: 100%;
  margin: 4rem;
  padding: 0rem;
  display: block;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    height: 30vh;
    margin: 2rem;
  }

  @media (max-width: 480px) {
    height: 25vh;
    margin: 1rem;
  }

  @media (orientation: landscape) and (max-width: 844px) and (max-height: 390px) {
    height: 60vw;
    margin: 1rem;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  padding: 1rem;
  position: relative;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

function MapaCesko() {
  const { kraje, selectedKraj, setSelectedKraj } = useContext(DataContext);
  const [viewBox, setViewBox] = useState("0 0 800 600");
  const [hoveredKraj, setHoveredKraj] = useState(null);
  const svgRef = useRef(null);
  const originalViewBox = "0 0 800 600";

  function handleSelectedKraj(kraj) {
    if (selectedKraj === kraj) {
      setSelectedKraj(null);
      setViewBox(originalViewBox);
    } else {
      setSelectedKraj(kraj);

      const krajCenterX = kraj.labelPosition.x;
      const krajCenterY = kraj.labelPosition.y;

      const zoomWidth = 600;
      const zoomHeight = 400;

      const newViewBoxX = krajCenterX - zoomWidth / 2;
      const newViewBoxY = krajCenterY - zoomHeight / 2;

      const newViewBox = `${newViewBoxX} ${newViewBoxY} ${zoomWidth} ${zoomHeight}`;
      setViewBox(newViewBox);
    }
  }

  function handleClickOutsideKraj() {
    setSelectedKraj(null);
    setViewBox(originalViewBox);
  }

  return (
    <>
      <Heading marginTop={"3rem"}>Ve kterém kraji vás to zajímá?</Heading>
      <MapContainer>
        <StyledSvg
          ref={svgRef}
          viewBox={viewBox}
          onClick={handleClickOutsideKraj}
        >
          {kraje.map((region) => (
            <g key={region.slug}>
              <KrajPath
                key={region.slug}
                kraj={region}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectedKraj(region);
                }}
                isSelected={selectedKraj === region}
                isHovered={hoveredKraj === region}
                onMouseEnter={() => setHoveredKraj(region)}
                onMouseLeave={() => setHoveredKraj(null)}
              />
              <KrajLabel
                key={`label-${region.slug}`}
                kraj={region}
                isSelected={selectedKraj === region}
                isHovered={hoveredKraj === region}
              />
            </g>
          ))}
        </StyledSvg>
      </MapContainer>
    </>
  );
}

export default MapaCesko;
