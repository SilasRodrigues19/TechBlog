import { useEffect, useState } from 'react';

export const useTitle = (title) => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle];
};
