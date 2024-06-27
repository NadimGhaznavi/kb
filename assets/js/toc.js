// Select all headings in the document
const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// Create a list item for each heading
const tableOfContents = document.createElement('ol');
headings.forEach(heading => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  
  // Generate a link using the heading's id attribute
  link.href = `#${heading.id}`;
  link.textContent = heading.textContent;
  
  listItem.appendChild(link);
  tableOfContents.appendChild(listItem);
});

// Update the TOC as the user scrolls
window.addEventListener('scroll', () => {
  const activeHeading = document.querySelector('.active');
  
  if (activeHeading) {
    const link = document.querySelector(`a[href="#${activeHeading.id}"]`);
    if (link) {
      link.classList.add('active');
    }
  }
});