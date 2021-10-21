// import React, { useState } from 'react'
// import {
//     Paper, Typography, Button, Grid,
//     Container, CssBaseline, AppBar, Toolbar,
//     Divider,
// } from '@material-ui/core';
// import useStyles from './examStyles';

// const Exam = () => {
//     const [num, setNum] = useState(1);

//     const incrementNum = () => {
//         setNum(num + 1);
//     }

//     const handleNext = () => {
//         incrementNum();
//     }

//     const handleUpdate = () => {
//         document.getElementById('nextButton').disabled = 0;
//         document.getElementById('updateButton').disabled = 1;
//     }

//     const classes = useStyles();

//     return (
//         <React.Fragment>
//             <main>
//                 <CssBaseline />
//                 <AppBar position="relative">
//                     <Toolbar>
//                         <Typography variant="h2">
//                             AdapTest
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <Container sx={{ marginTop: 2, marginBottom: 2 }}>
//                     <Typography variant="h1" align="center" fontFamily="fantasy" color="black">
//                         Math Test
//                     </Typography>
//                 </Container>

//                 <Divider sx={{ marginTop: 2, marginBottom: 1 }} />

//                 <div className={classes.paper} >
//                     <Paper elevation={10} >
//                         <Container>
//                             <Grid container sx={{ marginLeft: 2 }}>
//                                 <Grid item >
//                                     <Toolbar>
//                                         <Typography variant="h1">
//                                             Question
//                                         </Typography>
//                                     </Toolbar>
//                                 </Grid>
//                                 <Grid item sx={{ marginLeft: -4 }}>
//                                     <Toolbar>
//                                         <Typography variant="h1">
//                                             {num}
//                                         </Typography>
//                                     </Toolbar>
//                                 </Grid>

//                                 <Grid item  >
//                                     <Toolbar>
//                                         <Typography variant="h1" sx={{ marginLeft: 90 }}>
//                                             {num}
//                                         </Typography>
//                                     </Toolbar>
//                                 </Grid>

//                                 <Grid item  >
//                                     <Toolbar>
//                                         <Typography variant="h1" sx={{ marginLeft: -3 }}>
//                                             /
//                                         </Typography>
//                                     </Toolbar>
//                                 </Grid>

//                                 <Grid item  >
//                                     <Toolbar>
//                                         <Typography variant="h1" sx={{ marginLeft: -5 }}>
//                                             2
//                                         </Typography>
//                                     </Toolbar>
//                                 </Grid>
//                             </Grid>
//                         </Container>

//                         <Divider />

//                         <div>
//                             <Typography variant="h1" sx={{ marginLeft: 8, marginTop: 2, marginRight: 3 }}>
//                                 {questionData.content}
//                             </Typography>
//                         </div>
//                     </Paper>
//                 </div>
//                 <div className={classes.answer} >
//                     <Paper elevation={10} align="center">
//                         <Grid container>
//                             <Grid item xs={8}>
//                                 <Toolbar>
//                                     <Typography variant="h1" sx={{ marginLeft: 5 }}>
//                                         Multiple Choice
//                                     </Typography>
//                                 </Toolbar>
//                             </Grid>
//                         </Grid>
//                         {/* End of Multiple Choice title, should not change */}
//                         <Divider />
//                         {/* 4 answer buttons */}
//                         <div className={classes.answer}>
//                             <Grid container >
//                                 <Grid item xs={6} sx={{ marginTop: 1 }}>
//                                     <Button>
//                                         <Typography variant="h1">
//                                             {questionData.correctAnswer}
//                                         </Typography>
//                                     </Button>
//                                 </Grid>
//                                 {questionData.wrongAnswers.map((wrongAnswer) => (
//                                     <Grid key={wrongAnswer} item xs={6} sx={{ marginTop: 1 }}>
//                                         <Button>
//                                             <Typography variant="h1">
//                                                 {wrongAnswer}
//                                             </Typography>
//                                         </Button>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </div>
//                     </Paper>
//                 </div>

//                 <Container align="center">
//                     {/* UPDATE SCORE BUTTON */}
//                     <Button id="updateButton" variant="contained" color="primary"
//                         sx={{ marginTop: 2, marginRight: 6 }}
//                         onClick={handleUpdate}

//                     >
//                         Update score
//                     </Button>

//                     {/* NEXT BUTTON */}
//                     <Button id="nextButton" variant="contained" color="primary"
//                         sx={{ marginTop: 2 }}
//                         onClick={handleNext}
//                         disabled={true}
//                     >
//                         Next
//                     </Button>
//                 </Container>
//             </main>
//         </React.Fragment>
//     );
// }

// export default Exam;
