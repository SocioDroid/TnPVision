import React, { useState, useEffect } from "react";
import axios from "axios";
//import Chip from '@material-ui/core/Chip';
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

export default function CoordinatorSearch() {
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
  const [coordinators, setCoordinators] = useState([]);

  function handleChange(value) {
    setInputValue(value);
    debounceOnChange(value);
  }

  const AllCoordinators = []
  function handleResult(){
      for (let i = 0; i < coordinators.length; i++) {
        const item= coordinators[i].id;
        AllCoordinators[i] = item;
      }
      console.log("All Coordinators: ",AllCoordinators)
  }

  useEffect(() => {
    let active = true;

    (async () => {
        const response = await axios.get(
            "http://20.37.50.140:8000/api/employee/search/?q="+inputValue
          );
    

      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch]);

  return (
    <div className="CoordinatorSearch">
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
          handleChange('');
        }}
        autoComplete
        loading={loading}
        inputValue={inputValue}
        includeInputInList
        //disableOpenOnFocus
        onChange={(event, newValue) => {setCoordinators(newValue)}}
        onSelect={handleResult}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Coordinator"
            variant="outlined"
            onChange={event => handleChange(event.target.value)}
            fullWidth
          />
        )}
        renderOption={option => {
          return <div>{option.first_name+" "+option.last_name}</div>;
        }}
      />

      <button type="button" onClick={handleResult}>See</button>
    </div>
  );
}
