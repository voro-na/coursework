
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { ICollectionItem } from '@/types/module';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

type IListItemProps = ICollectionItem;

export const ListItem: FC<IListItemProps> = ({ termin: title, description, isLiked }) => {

    return (
        <Box sx={{ minWidth: 275, mb: 2 }} >
            <Card variant="elevation" >
                <CardContent sx={{ display: 'flex', p: 2}} >
                    <Typography variant="body1" component="div" sx={{ mr: 1.5, display: 'flex', alignItems: 'center',  }}>
                        {title}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body1" component="div" sx={{ ml: 1.5, display: 'flex', alignItems: 'center', flex: 1  }}>
                        {description}
                    </Typography>
                    <IconButton aria-label="next">
                        {isLiked ? <StarIcon/> : <StarBorderIcon/>}
                    </IconButton>
                    <IconButton aria-label="next">
                        <DeleteIcon/>
                    </IconButton>
                </CardContent>
            </Card>
        </Box>
    );
}