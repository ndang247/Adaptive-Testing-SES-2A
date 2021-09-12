import React from 'react'
import { TextField, Grid } from '@material-ui/core';

const QuestionField = ({ label, autoFocus, rowsMax }) => {
    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                multiline
                rowsMax={rowsMax}
            />
        </Grid>
    )
}

export default QuestionField