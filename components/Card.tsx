import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import AvatarIcon from './AvatarIcons';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const CenteredContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledCard = styled(Card)({
  margin: '16px',
});

interface RecipeReviewCardProps {
  title: string;
  subHeader: string;
}

export default function RecipeReviewCard(props: RecipeReviewCardProps) {
  const [thumbUp, setThumbUp] = React.useState<boolean | undefined>(undefined);

  const handleThumbUpClick = () => {
    setThumbUp(true);
  };

  const handleThumbDownClick = () => {
    setThumbUp(false);
  };

  return (
    <CenteredContainer>
      <StyledCard sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<AvatarIcon name={props.title} />}
          title={props.title}
          subheader={props.subHeader}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup
            of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleThumbUpClick}>
            <ThumbUpAltIcon color={thumbUp === true ? 'primary' : 'inherit'} />
          </IconButton>
          <IconButton aria-label="share" onClick={handleThumbDownClick}>
            <ThumbDownAltIcon color={thumbUp === false ? 'error' : 'inherit'} />
          </IconButton>
        </CardActions>
      </StyledCard>
    </CenteredContainer>
  );
}
