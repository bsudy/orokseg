import { useMemo } from "react";
import { Family } from "../gql/graphql";
import { FamilyTreePage } from "./photobook/FamilyTreePage";
import { PhotosPage } from "./photobook/PhotosPage";
import { TitlePage } from "./photobook/TitlePage";

interface PhotoBookPageProps {
  families: Family[];
  title?: string;
}

const pageStyle = { backgroundImage: "url(/images/background.webp)" };

enum PageTypeEnum {
  PHOTO,
  TREE,
}

export const PhotoBook = ({ families, title }: PhotoBookPageProps) => {
  // In order to link other families we will need the pagenumbers of the families.
  const pages = useMemo(() => {
    const pageNumbers = {} as Record<string, number>;
    const pageConfig = [] as {
      family: Family;
      pageNum: number;
      pageType: PageTypeEnum;
    }[];

    const pages = [] as JSX.Element[];

    let i = 0;
    let pageNum = 1;

    if (title && title.length > 0 && families.length > 0) {
      pages.push(
        <TitlePage
          key="title"
          text={title}
          pageNum={pageNum++}
          pageStyle={pageStyle}
        />,
      );
    }

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
        pageNumbers[currentFamily.grampsId] = pageNum;
        pageConfig.push({
          family: currentFamily,
          pageNum: pageNum++,
          pageType: PageTypeEnum.TREE,
        });
        pageNumbers[nextFamily.grampsId] = pageNum;
        pageConfig.push({
          family: nextFamily,
          pageNum: pageNum++,
          pageType: PageTypeEnum.TREE,
        });
        i += 2;
      } else if (currentFamilyNoImages && nextFamily == null) {
        // Last family without images
        pageNumbers[currentFamily.grampsId] = pageNum;
        pageConfig.push({
          family: currentFamily,
          pageNum: pageNum++,
          pageType: PageTypeEnum.TREE,
        });
        i += 1;
      } else {
        // Put them on separate pages
        pageConfig.push({
          family: currentFamily,
          pageNum: pageNum++,
          pageType: PageTypeEnum.PHOTO,
        });
        pageNumbers[currentFamily.grampsId] = pageNum;
        pageConfig.push({
          family: currentFamily,
          pageNum: pageNum++,
          pageType: PageTypeEnum.TREE,
        });
        i += 1;
      }
    }

    pageConfig.forEach(({ family, pageNum, pageType }) => {
      switch (pageType) {
        case PageTypeEnum.PHOTO:
          pages.push(
            <PhotosPage
              key={`photos-${family.grampsId}`}
              family={family}
              pageNum={pageNum}
              pageStyle={pageStyle}
            />,
          );
          break;
        case PageTypeEnum.TREE:
          pages.push(
            <FamilyTreePage
              key={`tree-${family.grampsId}`}
              family={family}
              pageNum={pageNum}
              pageStyle={pageStyle}
              pages={pageNumbers}
            />,
          );
          break;
      }
    });

    return pages;
  }, [families]);

  return <>{pages}</>;
};
