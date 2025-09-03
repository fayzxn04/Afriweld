import { useState } from "react";
import HeaderExport from "../common/HeaderExport";

function BannerTablePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <HeaderExport
        data={[]}
        page={"Banner"}
        link={"/banners/addBanner"}
        setShowModal={setShowModal}
        showDeleteBtn={length > 0}
        hasButtonAccess={true}
      />
      BannerTablePage
    </div>
  );
}

export default BannerTablePage;
