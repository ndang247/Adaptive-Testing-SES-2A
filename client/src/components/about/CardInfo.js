import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from './AboutCardStyles';

const CardInfo = ({ info }) => {
    const classes = useStyles();
    return (
        <Card className={classes.cardRoot}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="http://p5.itc.cn/images01/20200825/48701ab3d64b4aada25f4e55a5b695d2.jpeg"
                    title="Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        {info.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.role}>
                        {info.role}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardInfo
