import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from '@material-ui/core/Chip';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export default function VolunteerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState([]);

  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );

  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;
  const [volunteers, setVolunteers] = useState([]);

  function handleChange(value) {
    setInputValue(value);
    debounceOnChange(value);
  }

  const contents = []
  function handleResult(data){
      for (let i = 0; i < data.length; i++) {
        const item= data[i].email;
        contents[i] = item;
      }
      console.log("Contents: ",contents)
  }

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await axios.get(
        "http://20.37.50.140:8000/api/volunteer/search.json/?q=:inputValue".replace(
          /:inputValue/gi,
          inputValue
        )
      );

      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch]);

  return (
    <div className="VolunteerSearch">
      <Autocomplete
        multiple
        filterSelectedOptions
        options={options}
        getOptionLabel={option => option.first_name+" "+option.last_name}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        autoComplete
        loading={loading}
        inputValue={inputValue}
        includeInputInList
        disableOpenOnFocus
        onChange={(event, newValue) => {setVolunteers(newValue)}}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Volunteer"
            variant="outlined"
            onChange={event => handleChange(event.target.value)}
            fullWidth
          />
        )}
        renderOption={option => {
          return <div>{option.first_name+" "+option.last_name}</div>;
        }}
      />

      <button type="button" onClick={handleResult(volunteers)}>See</button>
    </div>
  );
}
