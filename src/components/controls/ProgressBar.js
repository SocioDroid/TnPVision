import React from 'react'
import {CircularProgress, Box} from '@material-ui/core';

export default function ProgressBar() {
    return(
        <Box display="flex" alignItems="center" justifyContent="center" css={{ height: "100%" }}>          
          <Box>
          <CircularProgress/>
          </Box>
      </Box>
    )
}

