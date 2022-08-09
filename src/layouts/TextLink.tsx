import { useNavigate } from "react-router-dom";

function TextLink({ paths, text }: { paths: string[], text: string }) {
  const navigate = useNavigate();
  const navigateToPath = () => {
    navigate(paths.join('/'));
  };

  return (
    <span className="u-textLink" onClick={navigateToPath}>{text}</span>
  );
}

export default TextLink;
