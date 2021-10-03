import React from 'react'
import { TextField, Grid } from '@material-ui/core';

const QuestionField = ({ label, autoFocus, maxRows }) => {
    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                multiline
                maxRows={maxRows}
            />
        </Grid>
    )
}

export default QuestionField