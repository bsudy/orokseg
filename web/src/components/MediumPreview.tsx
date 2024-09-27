import { useEffect, useState } from "react";
import { MediumRef } from "../gql/graphql";
import { getCutout } from "../utils/medium";

interface MediumPreviewProps {
  mediumRef: MediumRef;
}

export const MediumPreview = ({ mediumRef }: MediumPreviewProps) => {
  const [imgUrl, setImgUrl] = useState(null as string | null);

  useEffect(() => {
    if (mediumRef.medium.mime?.startsWith("image")) {
      getCutout(mediumRef).then((url) => {
        setImgUrl(url);
      });
    }
  }, [mediumRef]);

  return (
    <div>
      {mediumRef.medium.mime?.startsWith("image") ? (
        <>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={mediumRef.medium.description || "No description"}
            />
          ) : (
            <span>Loading....</span>
          )}
        </>
      ) : (
        <a href={mediumRef?.medium?.contentUrl || ""}>
          {mediumRef?.medium?.description || ""}
        </a>
      )}
    </div>
  );
};
