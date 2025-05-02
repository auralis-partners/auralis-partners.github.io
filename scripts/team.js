import { annotate } from 'rough-notation';

document.querySelectorAll('#content h1').forEach((header) => {
  const annotation = annotate(header, { type: 'highlight', color: '#96C5F7' });
  annotation.show();
});