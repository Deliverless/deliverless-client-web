import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DataCard({title, mainValue, CTA }) {
  return (
    <>
      <Card sx={{ minWidth: 200, margin: 1, maxHeight: 150, display: 'inline-block' }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {mainValue}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{CTA}</Button>
        </CardActions>
      </Card>
    </>
  );
}
