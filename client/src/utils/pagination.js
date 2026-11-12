/* 
this function takes a window size i.e how many page buttons at maximum should be shown
it determines the first button for every group depending on the page and window size, if window size
is 3 and a number 4 is selected then the first page will be 4 since the previous was 1, 2, 3 and now it
is 4, 5, 6.
Next it identifies how many buttons are shown depending on page number i.e.
if there are 5 total pages instead of showing 4, 5, 6 it will show 4, 5 (despite window size being 3)
*/
export function paginate(windowSize, page, availablePages) {
  const PAGE_WINDOW_SIZE = windowSize;
  // If page = 1, 2, or 3 -> startPage is 1
  // If page = 4, 5, or 6 -> startPage is 4
  const startPage =
    Math.floor((page - 1) / PAGE_WINDOW_SIZE) * PAGE_WINDOW_SIZE + 1;

  // The number of page buttons that are shown, not exceeding 3.
  const visibleCount = Math.min(
    PAGE_WINDOW_SIZE,
    Math.max(0, availablePages - startPage + 1)
  );

  return(
    {startPage, visibleCount}
  )
}
