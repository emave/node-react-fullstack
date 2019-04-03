import {TextField} from "@material-ui/core";
import React from "react";

export default (field) => (
  <TextField
    {...field}
    {...field.input}
    type={field.type}
    error={field.meta.touched && field.meta.error && true}
    label={field.meta.touched && field.meta.error ? <span className="error">{`${field.label} - ${field.meta.error}`}</span> : field.label}
    style={{width: '100%', margin: '10px auto'}}
  />
);