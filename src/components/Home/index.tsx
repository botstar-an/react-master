/* eslint-disable react/display-name */
import Header from "../../layouts/Header";
import { useEffect } from "react";
import { useCategory, useCategoryAction } from "../../hooks/useCategory";
import Loading from "../../layouts/Loading";
import UiPagination from "../../layouts/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonAdd from "../../layouts/ButtonAdd";
import React from "react";
import ModalContainer from "../../layouts/Modal/ModalContainer";
import { useModalActions } from "../../hooks/useModal";
import { Icon } from '@ahaui/react';
import UiBreadcrumb, { BreadCrumbPath } from "../../layouts/Breadcrumb";

function Home() {
  const { categories, isProcessing, total } = useCategory();
  const actions = useCategoryAction();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showModal } = useModalActions();
  const navigate = useNavigate();

  const limit = +searchParams.get('limit') || 10;
  const page = +searchParams.get('page') || 1;

  const breadCrumbPaths: BreadCrumbPath[] = [
    {
      name: 'Admin',
    }
  ];

  useEffect(() => {
    const offset = (page - 1) * limit;

    actions.getAll({
      offset,
      limit
    });
  }, [page]);

  const goToIndividualCategory = (categoryId: string) => {
    navigate(`./categories/${categoryId}`);
  };

  const CategoriesTable = React.memo(() => (
    <>
      <table className="categories-table Table Table--hoverable u-backgroundWhite u-textDark u-text200">
        <thead>
          <tr>
            <th scope="col" style={{ width: '200px'}}>ID</th>
            <th scope="col" style={{ width: '300px'}}>Name</th>
            <th scope="col" style={{ width: '400px'}}>Description</th>
            <th scope="col" style={{ width: '50px'}}>View</th>
          </tr>
        </thead>
          {
            !isProcessing && (
              <>
                  <tbody>
                  {(categories || []).map(category => (
                      <tr key={category?.id}>
                        <td>{category?.id}</td>
                        <td>{category?.name}</td>
                        <td>{category?.description}</td>
                        <td><Icon size="small" name="search" onClick={() => goToIndividualCategory(category?.id)} /></td>
                      </tr>
                  ))}
                  </tbody>
              </>
            )
          }
      </table>
      { isProcessing && <Loading/> }
    </>
  ));

  return (
    <>
      <ModalContainer/>
      <UiBreadcrumb paths={breadCrumbPaths}></UiBreadcrumb>
      <Header title="Admin" description="All users"></Header>
      <div className="categories">
        <ButtonAdd handleOnClick={() => showModal('createCategory', { title: 'Create new category' })}></ButtonAdd>
        <CategoriesTable/>
      </div>
      <UiPagination total={total}></UiPagination>
    </>
  );
}

export default Home;
