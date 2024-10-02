import PropTypes from "prop-types";
import MapaCesko from "./MapaCesko";

function KrajSelection({ onSelect }) {
  return <MapaCesko onSelect={onSelect} />;
}
KrajSelection.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default KrajSelection;
