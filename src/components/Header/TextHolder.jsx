const TextHolder = ({ tag, text, color, fontSize, position }) => {
  const Tag = tag || 'span';
  return (
    <Tag
      style={{
        fontSize: `${fontSize}`,
        color: `${color}`,
        textAlign: `${position}`,
      }}
    >
      {text}
    </Tag>
  );
};

export default TextHolder;
