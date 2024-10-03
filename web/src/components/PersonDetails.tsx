import React, { useState } from "react";
import { Gender, Person } from "../gql/graphql";
import { NameField } from "./NameField";
import { sleep } from "../utils";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Edit, Restore, Save as SaveIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import { displayName } from "../utils/name";
import { MediumPreview } from "./MediumPreview";
import { Navigate } from "react-router-dom";

interface PersonDetailsProps {
  person: Person;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ person }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const formik = useFormik<Person>({
    initialValues: {
      ...person,
    },
    onSubmit: async (values) => {
      setSaving(true);
      try {
        console.log(values);
        await sleep(3000);
        // TODO saving
        setEditing(false);
      } finally {
        setSaving(false);
      }
    },
  });

  const reset = () => {
    formik.resetForm();
    setEditing(false);
  };

  const disabled = saving || !editing;

  const [showFullImage, setShowFulllImages] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ flexDirection: "column", display: "flex" }}>
        <Typography variant="h2" component="h2">
          {displayName(formik.values.name)}
          {editing ? (
            <>
              <Box sx={{ m: 1, position: "relative", display: "inline-block" }}>
                <IconButton type="submit" aria-label="save person" edge="end">
                  <SaveIcon />
                </IconButton>
                {saving && (
                  <CircularProgress
                    size={40}
                    sx={{
                      color: "green",
                      position: "absolute",
                      top: 2,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              <IconButton
                aria-label="cancel"
                onClick={reset}
                disabled={disabled}
              >
                <Restore />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => setEditing(true)}
              aria-label="save person"
              edge="end"
            >
              <Edit />
            </IconButton>
          )}
        </Typography>
        <hr />
        <FormControl disabled={disabled} sx={{ width: "max-content" }}>
          <TextField
            name="grampsId"
            label="Gramps ID"
            value={formik.values.grampsId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
            variant="outlined"
          />
        </FormControl>

        <hr />
        <FormControl sx={{ width: "max-content" }}>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            name="gender"
            defaultValue={Gender.Unknown}
            value={formik.values.gender || Gender.Unknown}
            label="Gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
            variant="outlined"
          >
            <MenuItem value={Gender.Male}>Male</MenuItem>
            <MenuItem value={Gender.Female}>Female</MenuItem>
            <MenuItem value={Gender.Unknown}>Unknown</MenuItem>
          </Select>
        </FormControl>

        <hr />
        {person.name ? (
          <NameField
            name="name"
            value={formik.values.name!}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            editing={editing}
            disabled={disabled}
            // error={formik.errors.name}
            // touched={formik.touched.na}
          />
        ) : null}
        {/* <IconButton onAbort={addName} aria-label="add name" edge="end"> */}
      </Box>
      <h2>Media</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={showFullImage}
              onChange={() => {
                console.log("Toggle", showFullImage);
                setShowFulllImages(!showFullImage);
              }}
            />
          }
          label="Show full image"
        />
      </FormGroup>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          overflowY: "scroll",
        }}
      >
        {(person.mediumRefs || [])
          .filter((mediumRef) => mediumRef !== undefined)
          .map((mediumRef) => (
            <MediumPreview
              mediumRef={mediumRef}
              style={{ maxHeight: "300px" }}
              key={mediumRef.handle}
              full={showFullImage}
            />
          ))}
      </div>

      <div>
        <h2>Families</h2>
        {(person.families || []).map((family) => (
          <div key={family.grampsId}>
            <h3>{`${family.father?.displayName} - ${family.mother?.displayName}`}</h3>
            <a href={`/families/${family.grampsId}/book/`}>Photo book</a>
            <ul>
              {(family.children || []).map((child) => (
                <li key={child.person!.grampsId}>
                  {displayName(child.person?.name)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Notes</h2>
      <ul>
        {person.notes?.map((note) => (
          <li key={note?.grampsId}>{note?.text?.text || ""}</li>
        ))}
      </ul>
    </form>
  );
};

export default PersonDetails;
