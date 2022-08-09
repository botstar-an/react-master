import { Breadcrumb } from '@ahaui/react';
import { useNavigate } from 'react-router-dom';

export interface BreadCrumbPath {
  name: string,
  url?: string
}

export default function UiBreadcrumb({ paths }: { paths: BreadCrumbPath[] }) {
  const navigate = useNavigate();
  const goToPath = (url: string) => {
    navigate(url);
  };

  return (
    <Breadcrumb>
    {
      paths.map(path => (
        <Breadcrumb.Item key={'path-' + path.name} onClick={() => goToPath(path.url)}>{path.name}</Breadcrumb.Item>
      ))
    }
    </Breadcrumb>
  );
}