import { Family } from "../gql/graphql";
import { FamilyTreePage } from "./photobook/FamilyTreePage";
import { PhotosPage } from "./photobook/PhotosPage";

interface PhotoBookPageProps {
  families: Family[];
}

export const PhotoBookPage = ({ families }: PhotoBookPageProps) => {
  return (
    <>
      {families.map((family, idx) => {
        return (
          <>
            <PhotosPage family={family} pageNum={idx * 2 + 1} />
            <FamilyTreePage family={family} pageNum={idx * 2 + 1 + 1} />
          </>
        );
      })}
    </>
  );
};
