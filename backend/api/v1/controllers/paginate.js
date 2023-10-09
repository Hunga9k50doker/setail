const Paginate = (data, currentPage = 1, itemsPerPage = 12) => {
  try {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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
