import { Outlet } from "remix";
import { PageHeader } from "~/components/PageHeader";

export default () => {
  return (
    <div>
      <PageHeader
        title={"세트 메뉴"}
        description={"세트메뉴를 위한 정보를 입력하는 페이지 입니다."}
        url={`/set-menus`}
      />
      <Outlet />
    </div>
  );
};
