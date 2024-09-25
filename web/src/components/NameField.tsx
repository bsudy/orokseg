import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  InputLabel,
} from "@mui/material";
import { ChangeEvent, FocusEventHandler, useState } from "react";
import { Name, Surname } from "../gql/graphql";
import {
  Edit,
  Delete as DeleteIcon,
  SaveAlt as SaveIcon,
  Restore,
} from "@mui/icons-material";
import { FormikErrors, FormikTouched } from "formik";

export type NameFieldProps = {
  name?: string;
  value: Name;
  onSave?: (name: Name) => Promise<void> | void;
  onReset?: () => Promise<void> | void;
  onRemove?: (name: Name) => Promise<void> | void;
  onChange?: (event: ChangeEvent) => Promise<void> | void;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  touched?: FormikTouched<Name>;
  errors?: FormikErrors<Name>;
  editing?: boolean;
};

export const NameField = (props: NameFieldProps) => {
  const {
    name: nameFieldName,
    value,
    onSave,
    onRemove,
    onReset,
    disabled,
    onChange,
    onBlur,
    touched,
    errors,
    editing,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const disabledFlag = disabled || saving || removing;

  const onRemoveInternal = async () => {
    console.log("Remove");
    setRemoving(true);
    try {
      await onRemove?.(value);
    } finally {
      setRemoving(false);
    }
  };

  const save = async () => {
    console.log("Save");
    setSaving(true);
    try {
      await onSave?.(value);
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    onReset?.();
    setEditMode(false);
  };

  const fieldname = (name: string) =>
    nameFieldName ? `${nameFieldName}.${name}` : props.name;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {(!editMode && !editing) || disabled ? (
          <FormControl>
            <InputLabel htmlFor="default-surname">Name</InputLabel>

            <OutlinedInput
              id="default-surname"
              name="default-surname"
              label="Name"
              defaultValue={`${value.surnames?.map((surname) => (surname.prefix || "") + (surname.surname || ""))?.join(" ")}, ${value.givenName} ${value.suffix}`}
              endAdornment={
                onSave &&
                !disabled && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Edit name"
                      onClick={() => setEditMode(true)}
                      edge="end"
                    >
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                )
              }
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </FormControl>
        ) : (
          <>
            {value.surnames?.map((surname, idx) => (
              <span key={idx}>
                <TextField
                  name={fieldname(`surnames.${idx}.prefix`)}
                  label="Prefix"
                  value={surname.prefix}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={disabledFlag}
                  error={
                    touched?.surnames?.[idx]?.prefix &&
                    Boolean(
                      (errors?.surnames?.[idx] as FormikErrors<Surname>)
                        ?.prefix,
                    )
                  }
                  helperText={
                    touched?.surnames?.[idx]?.prefix &&
                    (errors?.surnames?.[idx] as FormikErrors<Surname>)?.prefix
                  }
                />
                <TextField
                  name={fieldname(`surnames.${idx}.surname`)}
                  label="Surname"
                  value={surname.surname}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={disabledFlag}
                  error={
                    touched?.surnames?.[idx]?.surname &&
                    Boolean(
                      (errors?.surnames?.[idx] as FormikErrors<Surname>)
                        ?.surname,
                    )
                  }
                  helperText={
                    touched?.surnames?.[idx]?.surname &&
                    (errors?.surnames?.[idx] as FormikErrors<Surname>)?.surname
                  }
                />
              </span>
            ))}
            <TextField
              name={fieldname("givenName")}
              label="Given Name"
              value={value.givenName}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabledFlag}
              error={touched?.givenName && Boolean(errors?.givenName)}
              helperText={touched?.givenName && errors?.givenName}
            />
            <TextField
              name={fieldname("suffix")}
              label="Suffix"
              value={value.suffix}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabledFlag}
              error={touched?.suffix && Boolean(errors?.suffix)}
              helperText={touched?.suffix && errors?.suffix}
            />
            {onReset && (
              <IconButton
                aria-label="cancel"
                onClick={cancel}
                disabled={disabledFlag}
              >
                <Restore />
              </IconButton>
            )}
            {onSave && (
              <Box sx={{ m: 1, position: "relative" }} display="inline-block">
                <IconButton
                  aria-label="save"
                  color="primary"
                  onClick={save}
                  disabled={disabledFlag}
                >
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
            )}
          </>
        )}
        {onRemove && !editMode && (
          <IconButton
            aria-label="remove"
            onClick={onRemoveInternal}
            disabled={disabledFlag}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
