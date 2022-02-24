import { Outlet } from "remix";
import { PageHeader } from "~/components/PageHeader";

export default () => {
  return (
    <div>
      <PageHeader
        title={"레시피"}
        description={"레시피를 위한 정보를 입력하는 페이지 입니다."}
        url={`/recipes`}
      />
      <Outlet />
    </div>
  );
};
