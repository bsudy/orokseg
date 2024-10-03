import { useMemo } from "react";
import { Family } from "../gql/graphql";
import { FamilyTreePage } from "./photobook/FamilyTreePage";
import { PhotosPage } from "./photobook/PhotosPage";

interface PhotoBookPageProps {
  families: Family[];
}

export const PhotoBookPage = ({ families }: PhotoBookPageProps) => {
  // In order to link other families we will need the pagenumbers of the families.
  const pages = useMemo(() => {
    const pages = [] as JSX.Element[];

    let i = 0;
    let pageNum = 1;
    while (i < families.length) {
      const currentFamily = families[i];
      const currentFamilyNoImages = !(
        currentFamily.mediumRefs && currentFamily.mediumRefs?.length > 0
      );
      const nextFamily = i + 1 < families.length ? families[i + 1] : null;
      const nextFamilyNoImages =
        !nextFamily ||
        !(nextFamily.mediumRefs && nextFamily.mediumRefs?.length > 0);
      if (nextFamily && currentFamilyNoImages && nextFamilyNoImages) {
        // Put them on the same pages facing each other.
        pages.push(
          <FamilyTreePage family={currentFamily} pageNum={pageNum++} />,
        );
        pages.push(<FamilyTreePage family={nextFamily} pageNum={pageNum++} />);
        i += 2;
      } else if (currentFamilyNoImages && nextFamily == null) {
        // Last family without images
        pages.push(
          <FamilyTreePage family={currentFamily} pageNum={pageNum++} />,
        );
        i += 1;
      } else {
        // Put them on separate pages
        pages.push(<PhotosPage family={currentFamily} pageNum={pageNum++} />);
        pages.push(
          <FamilyTreePage family={currentFamily} pageNum={pageNum++} />,
        );
        i += 1;
      }
    }
    return pages;
  }, [families]);

  return <>{pages}</>;
};
