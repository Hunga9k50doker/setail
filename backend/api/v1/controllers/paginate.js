const Paginate = (data, currentPage, itemsPerPage, preData = false) => {
  if (!currentPage) currentPage = 1;
  if (!itemsPerPage) itemsPerPage = 12;
  try {
    let startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (preData) {
      startIndex = 0;
    }
    const items = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
      items,
      totalPages,
      currentPage: +currentPage,
      totalCount: data.length,
    };
  } catch (error) {
    throw new Error("Pagination error");
  }
};

export default Paginate;
