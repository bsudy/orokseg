import { useEffect, useState } from "react";
import { MediumRef } from "../gql/graphql";
import { getCutout } from "../utils/medium";
import { Box, Modal, Typography } from "@mui/material";
import { max } from "d3-array";

interface MediumPreviewProps {
  mediumRef: MediumRef;
  full?: boolean;
  style?: React.CSSProperties;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const MediumPreview = ({
  mediumRef,
  style,
  full,
}: MediumPreviewProps) => {
  const [imgUrl, setImgUrl] = useState(null as string | null);
  const [selectedMedium, selectMedium] = useState(null as MediumRef | null);

  useEffect(() => {
    if (mediumRef.medium.mime?.startsWith("image")) {
      if (!full) {
        getCutout(mediumRef).then((url) => {
          setImgUrl(url);
        });
      } else {
        console.log("full", mediumRef.medium.contentUrl);
        setImgUrl(mediumRef.medium.contentUrl);
      }
    }
  }, [mediumRef, full]);

  return (
    <>
      {mediumRef.medium.mime?.startsWith("image") ? (
        <>
          {imgUrl ? (
            <img
              onClick={() => selectMedium(mediumRef)}
              style={{ ...style }}
              src={imgUrl}
              alt={mediumRef.medium.description || "No description"}
            />
          ) : (
            <span style={{ ...style }}>Loading....</span>
          )}
        </>
      ) : (
        <a style={{ ...style }} href={mediumRef?.medium?.contentUrl || ""}>
          {mediumRef?.medium?.description || ""}
        </a>
      )}
      <div>
        <Modal
          open={selectedMedium !== null}
          sx={{ height: "100vh", width: "100vw" }}
          onClose={() => selectMedium(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <img
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
              src={selectedMedium?.medium.contentUrl}
              alt={selectedMedium?.medium.description || "No description"}
            ></img>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedMedium?.medium.description}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
