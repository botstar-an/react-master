import { Button, Pagination } from '@ahaui/react';
import { useEffect, useState } from 'react';
import { createSearchParams, ParamKeyValuePair, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function UiPagination({ total }: {
  total?: number,
}) {
  const [pages, setPages] = useState({
    total: [],
    current: 0,
    limit: 0,
    page: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const limit = +searchParams.get('limit') || 10;
  const page = +searchParams.get('page') || 1;

  useEffect(() => {
    const totalPages = Math.ceil(total / limit);

    const pagesNumber = [];

    for (let i = 1; i <= totalPages; i++) {
      pagesNumber.push(i);
    }


    setPages({
      total: pagesNumber,
      current: page,
      limit,
      page
    });
  }, [total, page]);

  const navigatePage = (page: number) => {
    if (page > pages.total.length || page < 1) {
      return;
    }

    navigate({
      pathname: '',
      search: createSearchParams({ page: [`${page}`], limit: [`${pages.limit}`] }).toString()
    });
  };

  return (
    <>
      <div className="pagination u-textCenter">
          <Pagination>
            <Pagination.Prev
              disabled={pages.current === 1}
              onClick={() => navigatePage(pages.current - 1)}
            />
            {
              pages.total.map(page => (
                <Pagination.Item
                  active={page === pages.current}
                  key={page}
                  onClick={() => navigatePage(page)}
                >{page}</Pagination.Item>
              ))
            }
            <Pagination.Next
              disabled={pages.current === pages.total.length}
              onClick={() => navigatePage(pages.current + 1)}
            />
          </Pagination>
      </div>
    </>
  );
}

export default UiPagination;
