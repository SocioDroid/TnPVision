import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function CompanySearch() {
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );

  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;
  const [company, setCompany] = useState({});

  function handleChange(value) {
    setInputValue(value);
    debounceOnChange(value);
  }

  var AllComapnies = ""
  function handleResult(){
    AllComapnies = company.id
      console.log("All Comapnies: ",AllComapnies)
  }

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await axios.get(
        "http://20.37.50.140:8000/api/company/search/?q="+inputValue
      );

      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch, inputValue]);

  return (
    <div className="CompanySearch">
      <Autocomplete
        //multiple
        filterSelectedOptions
        options={options}
        getOptionLabel={option => option.name}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
          handleChange('');
        }}
        autoComplete = {false}
        loading={loading}
        //inputValue={inputValue}
        //includeInputInList
        //disableOpenOnFocus
        onChange={(event, newValue) => {setCompany(newValue); console.log(newValue)}}
        //onSelect={handleResult}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Company"
            variant="outlined"
            onChange={event => handleChange(event.target.value)}
            fullWidth
            autoComplete = "false"
          />
        )}
        renderOption={option => {
          return <div>{option.name}</div>;
        }}
      />

      <button type="button" onClick={handleResult}>See</button>
    </div>
  );
}
