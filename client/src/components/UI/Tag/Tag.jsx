import './Tag.css';

const Tag = ({ label, value }) => (
  <span className={`tag ${label}`}>{value}</span>
);

export default Tag;
