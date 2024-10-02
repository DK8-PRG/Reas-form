import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import KrajPath from "./KrajPath";
import KrajLabel from "./KrajLabel";
import { DataContext } from "../context/DataContext";
import Heading from "../ui/Heading";

const StyledSvg = styled.svg`
  width: 100%;
  height: 34vh; /* Výška mapy nastavena na 40% výšky viewportu */
  max-width: 100%;
  margin: 4rem;
  padding: 0rem;
  display: block;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); /* Přidání animace */
`;

const MapContainer = styled.div`
  width: 100%;
  padding: 1rem;
  position: relative;
`;

function MapaCesko() {
  const { kraje, selectedKraj, setSelectedKraj } = useContext(DataContext);
  const [viewBox, setViewBox] = useState("0 0 800 600");
  const [hoveredKraj, setHoveredKraj] = useState(null);
  const svgRef = useRef(null);
  const originalViewBox = "0 0 800 600";

  function handleSelectedKraj(kraj) {
    if (selectedKraj === kraj) {
      // Pokud je kraj znovu vybrán, vrátíme mapu do původního zobrazení
      setSelectedKraj(null);
      setViewBox(originalViewBox); // Vrátíme původní viewBox
    } else {
      setSelectedKraj(kraj);

      // Použijeme přímo labelPosition kraje pro výpočet viewBoxu
      const krajCenterX = kraj.labelPosition.x;
      const krajCenterY = kraj.labelPosition.y;

      // Nastavíme velikost viewBoxu pro zoom, např. šířka 500, výška 300
      const zoomWidth = 600;
      const zoomHeight = 400;

      // Centrovat na kraj: Posuneme viewBox tak, aby kraj byl ve středu
      const newViewBoxX = krajCenterX - zoomWidth / 2;
      const newViewBoxY = krajCenterY - zoomHeight / 2;

      // Nastavíme nový viewBox
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
      <Heading level={2}>Vyberte kraj</Heading>
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
