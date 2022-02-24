import { Outlet } from "remix";
import { PageHeader } from "~/components/PageHeader";

export default () => {
  return (
    <div>
      <PageHeader
        title={"재료"}
        description={"원재료를 위한 정보를 입력하는 페이지 입니다."}
        url={`/ingredients`}
      />
      <Outlet />
    </div>
  );
};
